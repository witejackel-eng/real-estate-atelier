'use client';

import { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Bed, Bath, Maximize2, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Container } from '@/components/shared/Container';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { Reveal } from '@/components/shared/Reveal';
import { filterProperties, cities, propertyTypes, type Property } from '@/data/properties';

const allCities = ['All', ...cities];
const allTypes = ['All', ...propertyTypes];
const bedroomOptions = ['Any', '1+', '2+', '3+', '4+', '5+'];
const sortOptions = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price Low-High' },
  { value: 'price-desc', label: 'Price High-Low' },
];

function PropertyCard({ property, index }: { property: Property; index: number }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      try {
        const stored = JSON.parse(localStorage.getItem('casaaurelia_favorites') || '[]');
        if (isFavorite) {
          const updated = stored.filter((id: string) => id !== property.id);
          localStorage.setItem('casaaurelia_favorites', JSON.stringify(updated));
        } else {
          localStorage.setItem('casaaurelia_favorites', JSON.stringify([...stored, property.id]));
        }
        setIsFavorite(!isFavorite);
      } catch {
        // localStorage not available
      }
    },
    [isFavorite, property.id]
  );

  return (
    <Reveal delay={index * 0.08}>
      <Link href={`/properties/${property.slug}`} className="group block">
        <article className="bg-offwhite border border-espresso/5 overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-espresso/5">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={property.heroImage}
              alt={property.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <button
              onClick={toggleFavorite}
              className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-offwhite/80 backdrop-blur-sm rounded-full transition-colors hover:bg-offwhite"
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart
                size={16}
                className={`transition-colors ${
                  isFavorite ? 'fill-terracotta text-terracotta' : 'text-espresso/60'
                }`}
              />
            </button>
            <div className="absolute bottom-3 left-3">
              <span className="inline-block bg-espresso/70 backdrop-blur-sm text-offwhite font-mono text-xs px-3 py-1">
                {property.type}
              </span>
            </div>
          </div>

          <div className="p-4 sm:p-5">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-display text-lg text-espresso leading-tight group-hover:text-gold transition-colors duration-300">
                {property.title}
              </h3>
              <span className="font-display text-lg text-gold whitespace-nowrap">
                {property.price}
              </span>
            </div>

            <div className="flex items-center gap-1 mb-3">
              <MapPin size={13} className="text-espresso/40" />
              <span className="font-mono text-xs text-espresso/50">{property.location}</span>
            </div>

            <p className="font-body text-sm text-espresso/60 leading-relaxed line-clamp-2 mb-4">
              {property.shortDescription}
            </p>

            <div className="flex items-center gap-4 pt-3 border-t border-espresso/5">
              <div className="flex items-center gap-1.5">
                <Bed size={14} className="text-espresso/40" />
                <span className="font-mono text-xs text-espresso/60">{property.bedrooms} Bed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Bath size={14} className="text-espresso/40" />
                <span className="font-mono text-xs text-espresso/60">{property.bathrooms} Bath</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Maximize2 size={14} className="text-espresso/40" />
                <span className="font-mono text-xs text-espresso/60">{property.area}</span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </Reveal>
  );
}

export function PropertiesClient() {
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('All');
  const [type, setType] = useState('All');
  const [bedrooms, setBedrooms] = useState('Any');
  const [sort, setSort] = useState('default');

  const filteredProperties = useMemo(() => {
    const bedroomNum = bedrooms === 'Any' ? undefined : parseInt(bedrooms);
    return filterProperties({
      city: city === 'All' ? undefined : city,
      type: type === 'All' ? undefined : type,
      bedrooms: bedroomNum,
      search: search.trim() || undefined,
      sort: sort === 'default' ? undefined : (sort as 'price-asc' | 'price-desc'),
    });
  }, [search, city, type, bedrooms, sort]);

  const resetFilters = () => {
    setSearch('');
    setCity('All');
    setType('All');
    setBedrooms('Any');
    setSort('default');
  };

  const selectStyles =
    'bg-offwhite border border-espresso/10 px-3 py-2.5 font-body text-sm text-espresso focus:outline-none focus:border-gold/50 transition-colors appearance-none cursor-pointer pr-8';

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-espresso text-offwhite py-24 sm:py-32 pt-28 sm:pt-36">
        <Container>
          <SectionLabel label="Browse" className="text-offwhite/50 [&_span]:text-offwhite/30" />
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl mt-3 tracking-tight leading-tight">
            Find your next home.
          </h1>
          <p className="font-body text-offwhite/60 mt-4 max-w-xl text-base sm:text-lg leading-relaxed">
            A curated selection of premium properties across India&apos;s most sought-after cities and neighborhoods.
          </p>
        </Container>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-16 sm:top-20 z-30 bg-ivory/95 backdrop-blur-md border-b border-espresso/5 shadow-sm">
        <Container className="py-3">
          <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
            <input
              type="text"
              placeholder="Search properties..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 min-w-[140px] bg-offwhite border border-espresso/10 px-3 py-2.5 font-body text-sm text-espresso placeholder:text-espresso/40 focus:outline-none focus:border-gold/50 transition-colors"
            />
            <select value={city} onChange={(e) => setCity(e.target.value)} className={selectStyles}>
              {allCities.map((c) => (
                <option key={c} value={c}>{c === 'All' ? 'All Cities' : c}</option>
              ))}
            </select>
            <select value={type} onChange={(e) => setType(e.target.value)} className={selectStyles}>
              {allTypes.map((t) => (
                <option key={t} value={t}>{t === 'All' ? 'All Types' : t}</option>
              ))}
            </select>
            <select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} className={selectStyles}>
              {bedroomOptions.map((b) => (
                <option key={b} value={b}>
                  {b === 'Any' ? 'Any Beds' : `${b} Bedrooms`}
                </option>
              ))}
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className={selectStyles}>
              {sortOptions.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
        </Container>
      </div>

      {/* Property Grid */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <p className="font-mono text-xs text-espresso/50 uppercase tracking-wider">
              {filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'}
            </p>
            {(search || city !== 'All' || type !== 'All' || bedrooms !== 'Any' || sort !== 'default') && (
              <button
                onClick={resetFilters}
                className="font-mono text-xs text-gold hover:text-terracotta transition-colors"
              >
                Reset Filters
              </button>
            )}
          </div>

          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProperties.map((property, index) => (
                <PropertyCard key={property.id} property={property} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="font-display text-2xl text-espresso mb-2">No properties match your filters.</p>
              <p className="font-body text-sm text-espresso/50 mb-6">
                Try adjusting your search criteria or browse all properties.
              </p>
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-2 font-mono text-sm text-gold hover:text-terracotta transition-colors border-b border-gold/30 hover:border-terracotta/30 pb-0.5"
              >
                Clear All Filters
              </button>
            </motion.div>
          )}
        </Container>
      </section>
    </main>
  );
}