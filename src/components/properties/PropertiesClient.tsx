'use client';

import { useState, useEffect, useMemo, useCallback, useRef, useSyncExternalStore } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Search, SlidersHorizontal } from 'lucide-react';
import { properties, cities, propertyTypes, filterProperties, type Property } from '@/data/properties';
import { Reveal } from '@/components/shared/Reveal';

/* ── Favorites helpers ── */
function setFavorites(slugs: string[]) {
  localStorage.setItem('casa-aurelia-favorites', JSON.stringify(slugs));
  window.dispatchEvent(new Event('casa-fav'));
}

function subscribeFavorites(cb: () => void) {
  window.addEventListener('casa-fav', cb);
  return () => window.removeEventListener('casa-fav', cb);
}

function getFavSnapshot(): string[] {
  try { return JSON.parse(localStorage.getItem('casa-aurelia-favorites') || '[]'); } catch { return []; }
}

/* ── Filter state ── */
type Filters = {
  search: string;
  city: string;
  type: string;
  bedrooms: string;
  sort: string;
};

const defaultFilters: Filters = {
  search: '',
  city: '',
  type: '',
  bedrooms: '',
  sort: '',
};

const bedroomOptions = [
  { label: 'Any', value: '' },
  { label: '1+', value: '1' },
  { label: '2+', value: '2' },
  { label: '3+', value: '3' },
  { label: '4+', value: '4' },
  { label: '5+', value: '5' },
];

const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price Low\u2192High', value: 'price-asc' },
  { label: 'Price High\u2192Low', value: 'price-desc' },
];

/* ── Filter Bar (shared between desktop sticky & mobile overlay) ── */
function FilterControls({
  filters,
  onChange,
}: {
  filters: Filters;
  onChange: (next: Filters) => void;
}) {
  const selectClass =
    'input-light text-sm py-2 px-3 appearance-none pr-8 bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23756D64%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E")] bg-no-repeat bg-[right_0.5rem_center]';

  return (
    <div className="flex flex-col gap-3">
      {/* Search */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
        />
        <input
          type="text"
          placeholder="Search by name, location..."
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className="input-light pl-9 text-sm py-2"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* City */}
        <select
          value={filters.city}
          onChange={(e) => onChange({ ...filters, city: e.target.value })}
          className={selectClass}
          aria-label="City"
        >
          <option value="">All Cities</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Type */}
        <select
          value={filters.type}
          onChange={(e) => onChange({ ...filters, type: e.target.value })}
          className={selectClass}
          aria-label="Property type"
        >
          <option value="">All Types</option>
          {propertyTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        {/* Bedrooms */}
        <select
          value={filters.bedrooms}
          onChange={(e) => onChange({ ...filters, bedrooms: e.target.value })}
          className={selectClass}
          aria-label="Bedrooms"
        >
          {bedroomOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label} Beds
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={filters.sort}
          onChange={(e) => onChange({ ...filters, sort: e.target.value })}
          className={selectClass}
          aria-label="Sort by"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════ */
export function PropertiesClient() {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const favorites = useSyncExternalStore(subscribeFavorites, getFavSnapshot, () => [] as string[]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [mobileFilters, setMobileFilters] = useState<Filters>(defaultFilters);

  const filterBarRef = useRef<HTMLDivElement>(null);
  const [filterStuck, setFilterStuck] = useState(false);

  /* Sticky filter observer */
  useEffect(() => {
    const el = filterBarRef.current;
    if (!el) return;
    const sentinel = document.getElementById('filter-sentinel');
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setFilterStuck(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  /* Filtered properties */
  const filtered = useMemo(() => {
    const minBedrooms = filters.bedrooms ? parseInt(filters.bedrooms) : undefined;
    return filterProperties({
      city: filters.city || undefined,
      type: filters.type || undefined,
      bedrooms: minBedrooms,
      search: filters.search || undefined,
      sort: (filters.sort as 'price-asc' | 'price-desc' | 'newest') || undefined,
    });
  }, [filters]);

  /* Toggle favorite */
  const toggleFavorite = useCallback((slug: string) => {
    const current = getFavSnapshot();
    const next = current.includes(slug)
      ? current.filter((s) => s !== slug)
      : [...current, slug];
    setFavorites(next);
  }, []);

  /* Reset filters */
  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  /* Mobile: open filters with current state */
  const openMobileFilters = useCallback(() => {
    setMobileFilters({ ...filters });
    setMobileFiltersOpen(true);
  }, [filters]);

  /* Mobile: apply filters */
  const applyMobileFilters = useCallback(() => {
    setFilters({ ...mobileFilters });
    setMobileFiltersOpen(false);
  }, [mobileFilters]);

  /* Mobile: reset mobile filters */
  const resetMobileFilters = useCallback(() => {
    setMobileFilters(defaultFilters);
  }, []);

  /* Lock body scroll when mobile filters open */
  useEffect(() => {
    if (mobileFiltersOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileFiltersOpen]);

  return (
    <main>
      {/* ═══ Hero Area ═══ */}
      <section className="pt-[calc(var(--header-h)+3rem)] pb-8 md:pb-12">
        <div className="container-site">
          <Reveal>
            <p className="section-number mb-4">N&deg;001</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="display-page mb-6">The Collection.</h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="body-copy max-w-2xl">
              A curated selection of premium residential properties across India,
              each chosen for its design integrity, location, and quality of life.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ Sentinel for sticky detection ═══ */}
      <div id="filter-sentinel" className="h-0" aria-hidden="true" />

      {/* ═══ Sticky Filter Bar (desktop) ═══ */}
      <div
        ref={filterBarRef}
        className={`sticky top-[var(--header-h)] z-[100] transition-shadow duration-300 ${
          filterStuck ? 'shadow-[0_1px_0_var(--color-line)]' : ''
        }`}
        style={{ backgroundColor: 'var(--color-paper)' }}
      >
        <div className="container-site py-4">
          {/* Desktop filters */}
          <div className="hidden md:block">
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <FilterControls filters={filters} onChange={setFilters} />
              </div>
              <button
                onClick={resetFilters}
                className="btn-ghost text-muted hover:text-brass shrink-0 pb-1"
                type="button"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Mobile filter button + count */}
          <div className="flex md:hidden items-center justify-between gap-3">
            <button
              onClick={openMobileFilters}
              className="btn-outline-dark gap-2"
              type="button"
              aria-label="Open filters"
            >
              <SlidersHorizontal size={14} />
              Filters
            </button>
            <p className="label-micro text-muted">
              {filtered.length} {filtered.length === 1 ? 'property' : 'properties'}
            </p>
          </div>
        </div>
      </div>

      {/* ═══ Mobile Filter Overlay ═══ */}
      {mobileFiltersOpen && (
        <div
          className="fixed inset-0 z-[300] bg-ink"
          style={{ animation: 'fadeIn 0.25s var(--ease-out-expo)' }}
        >
          <div className="h-full flex flex-col container-site py-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <p className="label-interface text-white">Filters</p>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="label-interface text-white/50 hover:text-white transition-colors"
                type="button"
                aria-label="Close filters"
              >
                Close
              </button>
            </div>

            <div className="flex-1">
              <div className="space-y-5">
                {/* Search */}
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
                  />
                  <input
                    type="text"
                    placeholder="Search by name, location..."
                    value={mobileFilters.search}
                    onChange={(e) =>
                      setMobileFilters({ ...mobileFilters, search: e.target.value })
                    }
                    className="input-premium pl-9 text-sm py-2.5"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="label-micro text-white/40 block mb-2">City</label>
                  <select
                    value={mobileFilters.city}
                    onChange={(e) =>
                      setMobileFilters({ ...mobileFilters, city: e.target.value })
                    }
                    className="input-premium text-sm py-2.5 appearance-none pr-8 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22rgba(244%2C240%2C232%2C0.4)%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_0.5rem_center]"
                    aria-label="City"
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
                <div>
                  <label className="label-micro text-white/40 block mb-2">Type</label>
                  <select
                    value={mobileFilters.type}
                    onChange={(e) =>
                      setMobileFilters({ ...mobileFilters, type: e.target.value })
                    }
                    className="input-premium text-sm py-2.5 appearance-none pr-8 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22rgba(244%2C240%2C232%2C0.4)%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_0.5rem_center]"
                    aria-label="Property type"
                  >
                    <option value="">All Types</option>
                    {propertyTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Bedrooms */}
                <div>
                  <label className="label-micro text-white/40 block mb-2">Bedrooms</label>
                  <select
                    value={mobileFilters.bedrooms}
                    onChange={(e) =>
                      setMobileFilters({ ...mobileFilters, bedrooms: e.target.value })
                    }
                    className="input-premium text-sm py-2.5 appearance-none pr-8 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22rgba(244%2C240%2C232%2C0.4)%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_0.5rem_center]"
                    aria-label="Bedrooms"
                  >
                    {bedroomOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label} Beds
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort */}
                <div>
                  <label className="label-micro text-white/40 block mb-2">Sort</label>
                  <select
                    value={mobileFilters.sort}
                    onChange={(e) =>
                      setMobileFilters({ ...mobileFilters, sort: e.target.value })
                    }
                    className="input-premium text-sm py-2.5 appearance-none pr-8 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22rgba(244%2C240%2C232%2C0.4)%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_0.5rem_center]"
                    aria-label="Sort by"
                  >
                    {sortOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Mobile filter actions */}
            <div className="flex gap-3 mt-8 pb-4">
              <button
                onClick={resetMobileFilters}
                className="btn-outline flex-1"
                type="button"
              >
                Reset
              </button>
              <button
                onClick={applyMobileFilters}
                className="btn-primary flex-1"
                type="button"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ Results Count (desktop) ═══ */}
      <div className="container-site pb-6 hidden md:block">
        <Reveal>
          <p className="label-micro text-muted">
            {filtered.length} {filtered.length === 1 ? 'property' : 'properties'}
          </p>
        </Reveal>
      </div>

      {/* ═══ Property Grid ═══ */}
      <section className="container-site pb-[clamp(4rem,8vw,8rem)]">
        {filtered.length === 0 ? (
          <Reveal>
            <div className="text-center py-20">
              <p className="body-copy-muted mb-4">
                No properties match your current filters.
              </p>
              <button onClick={resetFilters} className="btn-ghost" type="button">
                Clear all filters
              </button>
            </div>
          </Reveal>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filtered.map((property, i) => (
              <PropertyCard
                key={property.slug}
                property={property}
                isFavorited={favorites.includes(property.slug)}
                onToggleFavorite={toggleFavorite}
                delay={i < 6 ? i * 80 : 0}
              />
            ))}
          </div>
        )}
      </section>

      {/* Inline keyframe for mobile filter overlay fade */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </main>
  );
}

/* ═══════════════════════════════════════════════════
   PROPERTY CARD
   ═══════════════════════════════════════════════════ */
function PropertyCard({
  property,
  isFavorited,
  onToggleFavorite,
  delay,
}: {
  property: Property;
  isFavorited: boolean;
  onToggleFavorite: (slug: string) => void;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="relative group card-line-anim border-b border-ink/[0.06] pb-5">
        {/* Favorite button */}
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
          className="absolute top-3 right-3 z-10 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full p-2 bg-charcoal/20 backdrop-blur-sm hover:bg-charcoal/40 transition-colors"
        >
          <Heart
            size={16}
            className={
              isFavorited
                ? 'fill-brass stroke-brass'
                : 'fill-none stroke-white'
            }
            strokeWidth={isFavorited ? 0 : 2}
          />
        </button>

        {/* Card link */}
        <Link href={`/properties/${property.slug}`} className="block">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-4">
            <Image
              src={property.heroImage}
              alt={property.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <h3 className="heading-property mb-1">{property.title}</h3>

          <p className="label-micro text-muted mb-4">
            {property.location} &middot; {property.type}
          </p>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <p className="font-mono font-medium text-sm">{property.price}</p>
            </div>
            <div>
              <p className="text-sm text-muted">
                {property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted">{property.area}</p>
            </div>
          </div>
        </Link>
      </div>
    </Reveal>
  );
}