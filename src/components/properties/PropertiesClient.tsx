'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Search,
  SlidersHorizontal,
  X,
  SearchX,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { Container } from '@/components/shared/Container';
import { Button } from '@/components/shared/Button';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { getAllProperties, cities, propertyTypes, type Property, type PropertyType } from '@/data/properties';

interface PropertiesClientProps {
  initialSearchParams?: { [key: string]: string | string[] | undefined };
}

/* ------------------------------------------------------------------ */
/*  Favorites (localStorage)                                           */
/* ------------------------------------------------------------------ */

const FAVORITES_KEY = 'casa-aurelia-favorites';

function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(FAVORITES_KEY);
      if (raw) setFavorites(JSON.parse(raw));
    } catch { /* ignore */ }

    const onStorage = () => {
      try {
        const raw = localStorage.getItem(FAVORITES_KEY);
        setFavorites(raw ? JSON.parse(raw) : []);
      } catch { /* ignore */ }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const toggle = useCallback((slug: string) => {
    setFavorites((prev) => {
      const next = prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : [...prev, slug];
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
      } catch { /* storage unavailable */ }
      return next;
    });
  }, []);

  return { favorites, toggleFavorite: toggle };
}

/* ------------------------------------------------------------------ */
/*  Filter types & helpers                                             */
/* ------------------------------------------------------------------ */

type SortOption = 'newest' | 'price-asc' | 'price-desc';

interface Filters {
  city: string;
  type: string;
  beds: number;
  q: string;
  sort: SortOption;
}

const DEFAULT_FILTERS: Filters = {
  city: '',
  type: '',
  beds: 0,
  q: '',
  sort: 'newest',
};

function parseFiltersFromParams(params: Record<string, string | string[] | undefined> = {}): Filters {
  const get = (key: string) => {
    const val = params[key];
    return typeof val === 'string' ? val : '';
  };

  const city = cities.includes(get('city')) ? get('city') : '';
  const type = propertyTypes.includes(get('type') as PropertyType) ? (get('type') as PropertyType) : '';
  const bedsRaw = get('beds');
  const beds = bedsRaw ? parseInt(bedsRaw, 10) : 0;
  const q = get('q');
  const sortRaw = get('sort');
  const sort: SortOption =
    sortRaw === 'price-asc' || sortRaw === 'price-desc' || sortRaw === 'newest'
      ? sortRaw
      : 'newest';

  return { city, type, beds: isNaN(beds) ? 0 : beds, q, sort };
}

function pushFiltersToURL(filters: Filters) {
  const params = new URLSearchParams();
  if (filters.city) params.set('city', filters.city);
  if (filters.type) params.set('type', filters.type);
  if (filters.beds > 0) params.set('beds', String(filters.beds));
  if (filters.q) params.set('q', filters.q);
  if (filters.sort !== 'newest') params.set('sort', filters.sort);

  const qs = params.toString();
  const url = qs ? `/properties?${qs}` : '/properties';
  window.history.replaceState(null, '', url);
}

/* ------------------------------------------------------------------ */
/*  Filtering logic                                                    */
/* ------------------------------------------------------------------ */

function applyFilters(properties: Property[], filters: Filters): Property[] {
  let result = [...properties];

  if (filters.q) {
    const s = filters.q.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(s) ||
        p.location.toLowerCase().includes(s) ||
        p.city.toLowerCase().includes(s) ||
        p.type.toLowerCase().includes(s) ||
        p.shortDescription.toLowerCase().includes(s),
    );
  }

  if (filters.city) {
    result = result.filter((p) => p.city === filters.city);
  }

  if (filters.type) {
    result = result.filter((p) => p.type === filters.type);
  }

  if (filters.beds > 0) {
    result = result.filter((p) => p.bedrooms >= filters.beds);
  }

  if (filters.sort === 'price-asc') {
    result.sort((a, b) => a.priceNumber - b.priceNumber);
  } else if (filters.sort === 'price-desc') {
    result.sort((a, b) => b.priceNumber - a.priceNumber);
  } else {
    result.sort((a, b) => a.id.localeCompare(b.id));
  }

  return result;
}

/* ------------------------------------------------------------------ */
/*  Active filter count                                                */
/* ------------------------------------------------------------------ */

function countActiveFilters(filters: Filters): number {
  let count = 0;
  if (filters.city) count++;
  if (filters.type) count++;
  if (filters.beds > 0) count++;
  if (filters.q) count++;
  if (filters.sort !== 'newest') count++;
  return count;
}

/* ------------------------------------------------------------------ */
/*  Shared select styles                                               */
/* ------------------------------------------------------------------ */

const selectClass =
  'text-sm border border-espresso/15 rounded-sm px-3 py-2 bg-offwhite focus:ring-2 focus:ring-gold/30 focus:border-gold appearance-none cursor-pointer';

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function PropertiesClient({ initialSearchParams }: PropertiesClientProps) {
  const [filters, setFilters] = useState<Filters>(() =>
    parseFiltersFromParams(initialSearchParams),
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const { favorites, toggleFavorite } = useFavorites();
  const allProperties = useMemo(() => getAllProperties(), []);

  /* Sync state → URL on filter change */
  useEffect(() => {
    pushFiltersToURL(filters);
  }, [filters]);

  /* Filtered results */
  const results = useMemo(() => applyFilters(allProperties, filters), [allProperties, filters]);
  const activeCount = countActiveFilters(filters);

  /* Filter change helper */
  const updateFilter = useCallback(
    <K extends keyof Filters>(key: K, value: Filters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const clearAll = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  /* Drawer keyboard handling */
  useEffect(() => {
    if (!drawerOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDrawerOpen(false);
        return;
      }
      if (e.key === 'Tab' && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      previousFocusRef.current?.focus();
    };
  }, [drawerOpen]);

  /* Drawer open: auto-focus first input */
  useEffect(() => {
    if (drawerOpen && drawerRef.current) {
      const firstInput = drawerRef.current.querySelector<HTMLInputElement>('input');
      firstInput?.focus();
    }
  }, [drawerOpen]);

  /* Filter chips data */
  const chips = useMemo(() => {
    const items: { key: string; label: string }[] = [];
    if (filters.city) items.push({ key: 'city', label: filters.city });
    if (filters.type) items.push({ key: 'type', label: filters.type });
    if (filters.beds > 0) items.push({ key: 'beds', label: `${filters.beds}+ Beds` });
    if (filters.q) items.push({ key: 'q', label: `"${filters.q}"` });
    if (filters.sort !== 'newest') {
      const sortLabel =
        filters.sort === 'price-asc' ? 'Price: Low → High' : 'Price: High → Low';
      items.push({ key: 'sort', label: sortLabel });
    }
    return items;
  }, [filters]);

  const removeChip = useCallback(
    (key: string) => {
      if (key === 'city') updateFilter('city', '');
      else if (key === 'type') updateFilter('type', '');
      else if (key === 'beds') updateFilter('beds', 0);
      else if (key === 'q') updateFilter('q', '');
      else if (key === 'sort') updateFilter('sort', 'newest');
    },
    [updateFilter],
  );

  /* Drawer form submit */
  const handleApply = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  return (
    <>
      {/* Page Header */}
      <div className="pt-32 pb-8">
        <Container variant="main">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-1.5 text-xs text-espresso/50">
              <li>
                <Link href="/" className="hover:text-espresso transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight size={12} className="text-espresso/30" />
              </li>
              <li aria-current="page" className="text-espresso">
                Properties
              </li>
            </ol>
          </nav>

          <h1 className="font-display text-[clamp(1.75rem,4vw,2.75rem)]">
            Properties
          </h1>
          <p className="text-espresso/60 body-text mt-2">
            Browse our collection of residential properties across India.
          </p>
        </Container>
      </div>

      <Container variant="main" className="pb-24">
        {/* Desktop Filter Bar */}
        <div className="hidden lg:flex flex-wrap items-center gap-3 mb-4">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-espresso/40 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search properties..."
              value={filters.q}
              onChange={(e) => updateFilter('q', e.target.value)}
              className="text-sm border border-espresso/15 rounded-sm pl-9 pr-3 py-2 bg-offwhite focus:ring-2 focus:ring-gold/30 focus:border-gold w-48 focus:w-64 transition-all"
            />
          </div>

          <select
            value={filters.city}
            onChange={(e) => updateFilter('city', e.target.value)}
            aria-label="Filter by city"
            className={selectClass}
          >
            <option value="">All Cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={filters.type}
            onChange={(e) => updateFilter('type', e.target.value)}
            aria-label="Filter by type"
            className={selectClass}
          >
            <option value="">All Types</option>
            {propertyTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <select
            value={filters.beds || ''}
            onChange={(e) => updateFilter('beds', e.target.value ? Number(e.target.value) : 0)}
            aria-label="Filter by bedrooms"
            className={selectClass}
          >
            <option value="">Any Beds</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>

          <select
            value={filters.sort}
            onChange={(e) => updateFilter('sort', e.target.value as SortOption)}
            aria-label="Sort by"
            className={selectClass}
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>

          <span className="text-sm text-espresso/50 ml-auto">
            {results.length} {results.length === 1 ? 'property' : 'properties'}
          </span>
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-2 text-sm border border-espresso/15 rounded-sm px-3 py-2 bg-offwhite hover:bg-sand/30 transition-colors"
            aria-label="Open filters"
          >
            <SlidersHorizontal size={16} />
            Filters
            {activeCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-[20px] h-5 rounded-full bg-gold text-offwhite text-[10px] font-mono px-1.5">
                {activeCount}
              </span>
            )}
          </button>

          <span className="text-sm text-espresso/50">
            {results.length} {results.length === 1 ? 'property' : 'properties'}
          </span>
        </div>

        {/* Filter Chips */}
        {chips.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {chips.map((chip) => (
              <span
                key={chip.key}
                className="flex items-center gap-1.5 bg-sand/50 rounded-full px-3 py-1 text-xs font-mono"
              >
                {chip.label}
                <button
                  type="button"
                  onClick={() => removeChip(chip.key)}
                  aria-label={`Remove ${chip.label} filter`}
                  className="min-h-[24px] min-w-[24px] flex items-center justify-center"
                >
                  <X size={12} className="text-espresso/60" />
                </button>
              </span>
            ))}
            <button
              type="button"
              onClick={clearAll}
              className="text-xs font-mono text-espresso/50 hover:text-espresso transition-colors ml-1"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Property Grid */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isFavorited={favorites.includes(property.slug)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <SearchX size={48} className="text-espresso/20 mb-6" />
            <h2 className="font-display text-xl mb-2">No properties found</h2>
            <p className="text-sm text-espresso/60 mb-6">
              Try adjusting your filters or search terms.
            </p>
            <Button variant="secondary" size="sm" onClick={clearAll}>
              Clear all filters
            </Button>
          </div>
        )}
      </Container>

      {/* Mobile Filter Drawer */}
      {/* Spacer for bottom padding on mobile */}
      <div className="h-8 lg:hidden" aria-hidden="true" />
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
          aria-label="Property filters"
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-espresso/40 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />

          {/* Bottom Sheet */}
          <div
            ref={drawerRef}
            className="absolute bottom-0 left-0 right-0 bg-ivory rounded-t-lg max-h-[85vh] overflow-y-auto flex flex-col"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-espresso/10">
              <div>
                <h2 className="font-display text-lg">Filters</h2>
                <p className="text-xs text-espresso/50 mt-0.5">
                  {results.length} {results.length === 1 ? 'property' : 'properties'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close filters"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X size={20} className="text-espresso/60" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="px-6 py-5 space-y-5 flex-1">
              {/* Search */}
              <div className="space-y-2">
                <label htmlFor="drawer-search" className="text-xs font-mono tracking-[0.05em] text-espresso/60">
                  Search
                </label>
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-espresso/40 pointer-events-none"
                  />
                  <input
                    id="drawer-search"
                    type="text"
                    placeholder="Search properties..."
                    value={filters.q}
                    onChange={(e) => updateFilter('q', e.target.value)}
                    className="w-full text-sm border border-espresso/15 rounded-sm pl-9 pr-3 py-2.5 bg-offwhite focus:ring-2 focus:ring-gold/30 focus:border-gold"
                  />
                </div>
              </div>

              {/* City */}
              <div className="space-y-2">
                <label htmlFor="drawer-city" className="text-xs font-mono tracking-[0.05em] text-espresso/60">
                  City
                </label>
                <select
                  id="drawer-city"
                  value={filters.city}
                  onChange={(e) => updateFilter('city', e.target.value)}
                  className={`w-full ${selectClass} py-2.5`}
                >
                  <option value="">All Cities</option>
                  {cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Type */}
              <div className="space-y-2">
                <label htmlFor="drawer-type" className="text-xs font-mono tracking-[0.05em] text-espresso/60">
                  Type
                </label>
                <select
                  id="drawer-type"
                  value={filters.type}
                  onChange={(e) => updateFilter('type', e.target.value)}
                  className={`w-full ${selectClass} py-2.5`}
                >
                  <option value="">All Types</option>
                  {propertyTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Beds */}
              <div className="space-y-2">
                <label htmlFor="drawer-beds" className="text-xs font-mono tracking-[0.05em] text-espresso/60">
                  Bedrooms
                </label>
                <select
                  id="drawer-beds"
                  value={filters.beds || ''}
                  onChange={(e) => updateFilter('beds', e.target.value ? Number(e.target.value) : 0)}
                  className={`w-full ${selectClass} py-2.5`}
                >
                  <option value="">Any Beds</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>

              {/* Sort */}
              <div className="space-y-2">
                <label htmlFor="drawer-sort" className="text-xs font-mono tracking-[0.05em] text-espresso/60">
                  Sort
                </label>
                <select
                  id="drawer-sort"
                  value={filters.sort}
                  onChange={(e) => updateFilter('sort', e.target.value as SortOption)}
                  className={`w-full ${selectClass} py-2.5`}
                >
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="sticky bottom-0 bg-ivory border-t border-espresso/10 px-6 py-4 flex items-center gap-4">
              <button
                type="button"
                onClick={clearAll}
                className="text-sm text-espresso/50 hover:text-espresso transition-colors font-mono"
              >
                Clear All
              </button>
              <button
                type="button"
                onClick={handleApply}
                className="flex-1 bg-espresso text-offwhite text-sm font-mono uppercase tracking-[0.15em] px-6 py-3 hover:bg-charcoal transition-colors rounded-sm"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}