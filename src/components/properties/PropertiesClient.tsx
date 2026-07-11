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
  ArrowRight,
  ChevronDown,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  properties,
  cities,
  propertyTypes,
  type Property,
  type PropertyType,
} from '@/data/properties';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface PropertiesClientProps {
  initialSearchParams?: { [key: string]: string | string[] | undefined };
}

type SortOption = 'newest' | 'price-asc' | 'price-desc';

interface Filters {
  city: string;
  type: string;
  beds: number;
  q: string;
  sort: SortOption;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const FAVORITES_KEY = 'casa-aurelia-favorites';

const DEFAULT_FILTERS: Filters = {
  city: '',
  type: '',
  beds: 0,
  q: '',
  sort: 'newest',
};

/* ------------------------------------------------------------------ */
/*  useFavorites (preserved from existing)                              */
/* ------------------------------------------------------------------ */

function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      try {
        const raw = localStorage.getItem(FAVORITES_KEY);
        if (raw) setFavorites(JSON.parse(raw));
      } catch { /* ignore */ }
    });

    const onStorage = () => {
      try {
        const raw = localStorage.getItem(FAVORITES_KEY);
        setFavorites(raw ? JSON.parse(raw) : []);
      } catch { /* ignore */ }
    };
    window.addEventListener('storage', onStorage);
    return () => {
      active = false;
      window.removeEventListener('storage', onStorage);
    };
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
/*  Filter helpers (preserved from existing)                            */
/* ------------------------------------------------------------------ */

function parseFiltersFromParams(
  params: Record<string, string | string[] | undefined> = {},
): Filters {
  const get = (key: string) => {
    const val = params[key];
    return typeof val === 'string' ? val : '';
  };

  const city = cities.includes(get('city')) ? get('city') : '';
  const type = propertyTypes.includes(get('type') as PropertyType)
    ? (get('type') as PropertyType)
    : '';
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
/*  RevealDiv — inline IntersectionObserver component                   */
/* ------------------------------------------------------------------ */

function RevealDiv({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: '-40px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(16px)',
        transition: `opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PropertyCard — inline card for the grid                            */
/* ------------------------------------------------------------------ */

function PropertyCardInline({
  property,
  index,
  isLarge,
  reversed,
  isFavorited,
  onToggleFavorite,
}: {
  property: Property;
  index: number;
  isLarge: boolean;
  reversed: boolean;
  isFavorited: boolean;
  onToggleFavorite: (slug: string) => void;
}) {
  const number = `#${String(index + 1).padStart(3, '0')}`;

  if (isLarge) {
    return (
      <article className="card-line-anim lg:col-span-2 group/card relative">
        {/* Favorite button */}
        {onToggleFavorite && (
          <button
            type="button"
            aria-label={
              isFavorited
                ? `Remove ${property.title} from favorites`
                : `Save ${property.title} to favorites`
            }
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite(property.slug);
            }}
            className="absolute top-4 right-4 z-10 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full p-2.5 bg-espresso/20 backdrop-blur-sm hover:bg-espresso/40 transition-colors"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={isFavorited ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth={isFavorited ? 0 : 1.5}
              className={isFavorited ? 'text-gold' : 'text-offwhite'}
              aria-hidden="true"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        )}

        <Link
          href={`/properties/${property.slug}`}
          className="cursor-view block"
        >
          <div
            className={`flex flex-col lg:flex-row ${
              reversed ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Image */}
            <div className="relative lg:w-1/2 aspect-[4/3] lg:aspect-auto lg:min-h-[420px] overflow-hidden">
              <Image
                src={property.heroImage}
                alt={`${property.title} — ${property.location}`}
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-[1.04]"
              />
            </div>

            {/* Info */}
            <div
              className={`lg:w-1/2 flex flex-col justify-center p-6 sm:p-8 lg:p-12 xl:p-16 ${
                reversed ? 'lg:pl-12 xl:pl-16' : 'lg:pr-12 xl:pr-16'
              }`}
            >
              <span className="label-micro text-warm-grey">{number}</span>
              <h3 className="heading-property mt-3 text-espresso">
                {property.title}
              </h3>
              <p className="label-micro text-warm-grey mt-2">
                {property.location}
              </p>
              <p className="font-mono text-xl sm:text-2xl text-espresso mt-5">
                {property.price}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-5 label-micro text-warm-grey">
                <span>{property.type}</span>
                <span aria-hidden="true" className="text-espresso/20">
                  ·
                </span>
                <span>{property.bedrooms} Bed</span>
                <span aria-hidden="true" className="text-espresso/20">
                  ·
                </span>
                <span>{property.area}</span>
              </div>
              <span className="mt-8 label-interface text-espresso inline-flex items-center gap-2 group-hover/card:gap-3 transition-all duration-300">
                View
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover/card:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  /* Half-width card */
  return (
    <article className="card-line-anim lg:col-span-1 group/card relative">
      {/* Favorite button */}
      {onToggleFavorite && (
        <button
          type="button"
          aria-label={
            isFavorited
              ? `Remove ${property.title} from favorites`
              : `Save ${property.title} to favorites`
          }
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite(property.slug);
          }}
          className="absolute top-3 right-3 z-10 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full p-2.5 bg-espresso/20 backdrop-blur-sm hover:bg-espresso/40 transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={isFavorited ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={isFavorited ? 0 : 1.5}
            className={isFavorited ? 'text-gold' : 'text-offwhite'}
            aria-hidden="true"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      )}

      <Link
        href={`/properties/${property.slug}`}
        className="cursor-view block"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={property.heroImage}
            alt={`${property.title} — ${property.location}`}
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-[1.04]"
          />
        </div>
        <div className="p-4 sm:p-5 lg:p-6">
          <span className="label-micro text-warm-grey">{number}</span>
          <h3 className="heading-property mt-2 text-espresso">
            {property.title}
          </h3>
          <p className="label-micro text-warm-grey mt-1.5">
            {property.location}
          </p>
          <p className="font-mono text-base sm:text-lg text-espresso mt-3">
            {property.price}
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3 label-micro text-warm-grey">
            <span>{property.type}</span>
            <span aria-hidden="true" className="text-espresso/20">
              ·
            </span>
            <span>{property.bedrooms} Bed</span>
            <span aria-hidden="true" className="text-espresso/20">
              ·
            </span>
            <span>{property.area}</span>
          </div>
          <span className="mt-5 label-interface text-espresso inline-flex items-center gap-2 group-hover/card:gap-3 transition-all duration-300">
            View
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover/card:translate-x-1"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Select field with custom wrapper                                    */
/* ------------------------------------------------------------------ */

function FilterSelect({
  id,
  value,
  onChange,
  label,
  children,
  className = '',
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className="input-light appearance-none pr-9 cursor-pointer bg-transparent"
      >
        {children}
      </select>
      <ChevronDown
        size={14}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-grey pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export function PropertiesClient({
  initialSearchParams,
}: PropertiesClientProps) {
  const [filters, setFilters] = useState<Filters>(() =>
    parseFiltersFromParams(initialSearchParams),
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const mobileRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const transitionTimerRef = useRef<number>(0);

  const { favorites, toggleFavorite } = useFavorites();

  /* Sync state → URL on filter change */
  useEffect(() => {
    pushFiltersToURL(filters);
  }, [filters]);

  /* Filtered results */
  const results = useMemo(
    () => applyFilters(properties, filters),
    [filters],
  );
  const activeCount = countActiveFilters(filters);

  /* Trigger fade transition when user changes filters */
  const triggerTransition = useCallback(() => {
    setTransitioning(true);
    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    transitionTimerRef.current = window.setTimeout(
      () => setTransitioning(false),
      180,
    );
  }, []);

  /* Filter change helper */
  const updateFilter = useCallback(
    <K extends keyof Filters>(key: K, value: Filters[K]) => {
      triggerTransition();
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    [triggerTransition],
  );

  const clearAll = useCallback(() => {
    triggerTransition();
    setFilters(DEFAULT_FILTERS);
  }, [triggerTransition]);

  /* Mobile overlay keyboard / scroll lock */
  useEffect(() => {
    if (!mobileOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        return;
      }
      if (e.key === 'Tab' && mobileRef.current) {
        const focusable = mobileRef.current.querySelectorAll<HTMLElement>(
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
  }, [mobileOpen]);

  /* Auto-focus search when mobile overlay opens */
  useEffect(() => {
    if (mobileOpen && mobileRef.current) {
      const firstInput = mobileRef.current.querySelector<HTMLInputElement>(
        'input',
      );
      firstInput?.focus();
    }
  }, [mobileOpen]);

  /* Filter chips data */
  const chips = useMemo(() => {
    const items: { key: string; label: string }[] = [];
    if (filters.city) items.push({ key: 'city', label: filters.city });
    if (filters.type) items.push({ key: 'type', label: filters.type });
    if (filters.beds > 0)
      items.push({ key: 'beds', label: `${filters.beds}+ Beds` });
    if (filters.q) items.push({ key: 'q', label: `"${filters.q}"` });
    if (filters.sort !== 'newest') {
      const sortLabel =
        filters.sort === 'price-asc'
          ? 'Price: Low → High'
          : 'Price: High → Low';
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

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <main>
      {/* ── Opening Section ── */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-end overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/property-glass-villa-1.jpg"
          alt="Architectural detail of a luxury residence"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark overlay */}
        <div
          className="absolute inset-0 bg-espresso/70"
          aria-hidden="true"
        />

        {/* Content */}
        <div className="container-site relative z-10 pb-16 sm:pb-20 lg:pb-24 pt-40 sm:pt-48 lg:pt-56">
          <RevealDiv>
            <span className="section-number text-offwhite/60">
              N°001
            </span>
          </RevealDiv>
          <RevealDiv delay={0.1}>
            <h1 className="display-page text-offwhite mt-4">
              The Collection
            </h1>
          </RevealDiv>
          <RevealDiv delay={0.2}>
            <p className="body-copy-light mt-6 max-w-xl text-offwhite/80">
              A considered selection of residential properties across
              India&rsquo;s most compelling cities.
            </p>
          </RevealDiv>
          <RevealDiv delay={0.3}>
            <p className="label-micro text-offwhite/50 mt-6">
              {results.length} properties
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* ── Desktop Sticky Filter Bar ── */}
      <div
        className="hidden lg:block sticky top-20 z-30 bg-ivory/92 backdrop-blur-md border-b border-espresso/8"
        role="search"
        aria-label="Property filters"
      >
        <div className="container-site py-3.5">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative w-48">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-grey pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="text"
                placeholder="Search..."
                value={filters.q}
                onChange={(e) => updateFilter('q', e.target.value)}
                aria-label="Search properties"
                className="input-light pl-9 pr-3 !w-full"
              />
            </div>

            {/* City */}
            <FilterSelect
              id="filter-city"
              value={filters.city}
              onChange={(v) => updateFilter('city', v)}
              label="Filter by city"
              className="w-36"
            >
              <option value="">All Cities</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </FilterSelect>

            {/* Type */}
            <FilterSelect
              id="filter-type"
              value={filters.type}
              onChange={(v) => updateFilter('type', v)}
              label="Filter by type"
              className="w-40"
            >
              <option value="">All Types</option>
              {propertyTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </FilterSelect>

            {/* Bedrooms */}
            <FilterSelect
              id="filter-beds"
              value={filters.beds ? String(filters.beds) : ''}
              onChange={(v) =>
                updateFilter('beds', v ? Number(v) : 0)
              }
              label="Filter by bedrooms"
              className="w-32"
            >
              <option value="">Beds</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </FilterSelect>

            {/* Sort */}
            <FilterSelect
              id="filter-sort"
              value={filters.sort}
              onChange={(v) => updateFilter('sort', v as SortOption)}
              label="Sort properties"
              className="w-44"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low–High</option>
              <option value="price-desc">Price: High–Low</option>
            </FilterSelect>

            {/* Clear */}
            {activeCount > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="btn-ghost text-sm"
              >
                Clear
              </button>
            )}

            {/* Count */}
            <span className="label-micro text-warm-grey ml-auto">
              {results.length} {results.length === 1 ? 'property' : 'properties'}
            </span>
          </div>

          {/* Active filter chips */}
          {chips.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-3">
              {chips.map((chip) => (
                <span
                  key={chip.key}
                  className="inline-flex items-center gap-1.5 bg-paper rounded-full px-3 py-1 text-xs font-mono text-espresso/80"
                >
                  {chip.label}
                  <button
                    type="button"
                    onClick={() => removeChip(chip.key)}
                    aria-label={`Remove ${chip.label} filter`}
                    className="min-h-[24px] min-w-[24px] flex items-center justify-center rounded-full hover:bg-espresso/10 transition-colors"
                  >
                    <X size={12} className="text-espresso/50" />
                  </button>
                </span>
              ))}
              <button
                type="button"
                onClick={clearAll}
                className="label-micro text-warm-grey hover:text-espresso transition-colors ml-1"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile Filter Button + Count ── */}
      <div className="lg:hidden container-site py-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="inline-flex items-center gap-2 border border-espresso/16 rounded-sm px-4 py-2.5 text-sm font-mono uppercase tracking-[0.06em] text-espresso hover:border-espresso/40 transition-colors"
          aria-label={`Open filters${activeCount > 0 ? `, ${activeCount} active` : ''}`}
        >
          <SlidersHorizontal size={16} aria-hidden="true" />
          Filters
          {activeCount > 0 && (
            <span className="inline-flex items-center justify-center min-w-[20px] h-5 rounded-full bg-sand text-espresso text-[10px] font-mono px-1.5">
              {activeCount}
            </span>
          )}
        </button>

        <span className="label-micro text-warm-grey">
          {results.length} {results.length === 1 ? 'property' : 'properties'}
        </span>
      </div>

      {/* ── Mobile Filter Chips ── */}
      {chips.length > 0 && (
        <div className="lg:hidden container-site pb-4">
          <div className="flex flex-wrap items-center gap-2">
            {chips.map((chip) => (
              <span
                key={chip.key}
                className="inline-flex items-center gap-1.5 bg-paper rounded-full px-3 py-1 text-xs font-mono text-espresso/80"
              >
                {chip.label}
                <button
                  type="button"
                  onClick={() => removeChip(chip.key)}
                  aria-label={`Remove ${chip.label} filter`}
                  className="min-h-[24px] min-w-[24px] flex items-center justify-center rounded-full hover:bg-espresso/10 transition-colors"
                >
                  <X size={12} className="text-espresso/50" />
                </button>
              </span>
            ))}
            <button
              type="button"
              onClick={clearAll}
              className="label-micro text-warm-grey hover:text-espresso transition-colors ml-1"
            >
              Clear all
            </button>
          </div>
        </div>
      )}

      {/* ── Property Grid ── */}
      <section aria-label="Property listings" className="container-site pb-20 lg:pb-32">
        {results.length > 0 ? (
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 transition-opacity duration-150 ${
              transitioning ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {results.map((property, index) => {
              const cyclePos = index % 3;
              const cycleNum = Math.floor(index / 3);
              const isLarge = cyclePos === 0;
              const reversed = isLarge && cycleNum % 2 === 1;

              return (
                <PropertyCardInline
                  key={property.id}
                  property={property}
                  index={index}
                  isLarge={isLarge}
                  reversed={reversed}
                  isFavorited={favorites.includes(property.slug)}
                  onToggleFavorite={toggleFavorite}
                />
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div
              className="w-16 h-16 rounded-full border border-espresso/10 flex items-center justify-center mb-6"
              aria-hidden="true"
            >
              <Search size={24} className="text-warm-grey" />
            </div>
            <h2 className="heading-property text-espresso mb-2">
              No properties match your filters.
            </h2>
            <p className="body-copy-light text-warm-grey mb-8 max-w-md">
              Try adjusting your search criteria or clearing all filters to
              see the full collection.
            </p>
            <Link
              href="/contact"
              className="btn-outline-dark"
            >
              Start a private brief
            </Link>
          </div>
        )}
      </section>

      {/* ── Editorial Rule ── */}
      <div className="container-site" aria-hidden="true">
        <hr className="editorial-rule" />
      </div>

      {/* ── Closing Section ── */}
      <section className="container-site py-20 lg:py-32 text-center">
        <RevealDiv>
          <h2 className="heading-property text-espresso">
            Nothing here quite fits?
          </h2>
        </RevealDiv>
        <RevealDiv delay={0.15}>
          <p className="body-copy text-warm-grey mt-4 max-w-md mx-auto">
            Tell us what you are looking for and we&rsquo;ll curate something
            personally.
          </p>
        </RevealDiv>
        <RevealDiv delay={0.25}>
          <Link
            href="/contact"
            className="btn-outline-dark inline-flex mt-8"
          >
            Get in touch
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </RevealDiv>
      </section>

      {/* ── Mobile Filter Overlay ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
          aria-label="Property filters"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-espresso/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          {/* Panel */}
          <div
            ref={mobileRef}
            className="absolute inset-0 bg-ivory flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-espresso/10">
              <div>
                <h2 className="font-display text-xl text-espresso">
                  Filters
                </h2>
                <p className="label-micro text-warm-grey mt-0.5">
                  {results.length}{' '}
                  {results.length === 1 ? 'property' : 'properties'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close filters"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-espresso/5 transition-colors"
              >
                <X size={20} className="text-espresso/60" />
              </button>
            </div>

            {/* Filter controls */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              {/* Search */}
              <div className="space-y-2.5">
                <label
                  htmlFor="mobile-search"
                  className="label-micro text-warm-grey block"
                >
                  Search
                </label>
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-grey pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    id="mobile-search"
                    type="text"
                    placeholder="Search properties..."
                    value={filters.q}
                    onChange={(e) => updateFilter('q', e.target.value)}
                    className="input-light pl-9 !w-full"
                  />
                </div>
              </div>

              {/* City */}
              <div className="space-y-2.5">
                <label
                  htmlFor="mobile-city"
                  className="label-micro text-warm-grey block"
                >
                  City
                </label>
                <FilterSelect
                  id="mobile-city"
                  value={filters.city}
                  onChange={(v) => updateFilter('city', v)}
                  label="Filter by city"
                  className="!w-full"
                >
                  <option value="">All Cities</option>
                  {cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </FilterSelect>
              </div>

              {/* Type */}
              <div className="space-y-2.5">
                <label
                  htmlFor="mobile-type"
                  className="label-micro text-warm-grey block"
                >
                  Type
                </label>
                <FilterSelect
                  id="mobile-type"
                  value={filters.type}
                  onChange={(v) => updateFilter('type', v)}
                  label="Filter by type"
                  className="!w-full"
                >
                  <option value="">All Types</option>
                  {propertyTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </FilterSelect>
              </div>

              {/* Bedrooms */}
              <div className="space-y-2.5">
                <label
                  htmlFor="mobile-beds"
                  className="label-micro text-warm-grey block"
                >
                  Bedrooms
                </label>
                <FilterSelect
                  id="mobile-beds"
                  value={filters.beds ? String(filters.beds) : ''}
                  onChange={(v) =>
                    updateFilter('beds', v ? Number(v) : 0)
                  }
                  label="Filter by bedrooms"
                  className="!w-full"
                >
                  <option value="">Any Bedrooms</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </FilterSelect>
              </div>

              {/* Sort */}
              <div className="space-y-2.5">
                <label
                  htmlFor="mobile-sort"
                  className="label-micro text-warm-grey block"
                >
                  Sort
                </label>
                <FilterSelect
                  id="mobile-sort"
                  value={filters.sort}
                  onChange={(v) => updateFilter('sort', v as SortOption)}
                  label="Sort properties"
                  className="!w-full"
                >
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: Low–High</option>
                  <option value="price-desc">Price: High–Low</option>
                </FilterSelect>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-espresso/10 px-6 py-5 flex items-center gap-4 bg-ivory">
              <button
                type="button"
                onClick={clearAll}
                className="label-interface text-warm-grey hover:text-espresso transition-colors py-3"
              >
                Clear All
              </button>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="flex-1 bg-espresso text-offwhite text-sm font-mono uppercase tracking-[0.12em] px-6 py-3.5 hover:bg-espresso/90 transition-colors rounded-sm"
              >
                View {results.length} {results.length === 1 ? 'property' : 'properties'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}