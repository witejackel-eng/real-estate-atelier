'use client';

import { useCallback, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';
import { Container } from '@/components/shared/Container';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { Button } from '@/components/shared/Button';
import { Reveal } from '@/components/shared/Reveal';
import { getFeaturedProperties, type Property } from '@/data/properties';

const FAVORITES_KEY = 'casaaurelia_favorites';

function PropertyCard({ property, isFav, onToggle }: {
  property: Property;
  isFav: boolean;
  onToggle: (slug: string) => void;
}) {
  return (
    <Reveal>
      <div className="relative">
        {/* Favorite button — sibling of the link */}
        <button
          type="button"
          aria-label={`Save ${property.title} to favorites`}
          onClick={() => onToggle(property.slug)}
          className={
            isFav
              ? 'absolute top-3 right-3 z-10 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full p-2'
              : 'absolute top-3 right-3 z-10 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-charcoal/30 backdrop-blur-sm p-2'
          }
        >
          <Heart
            size={18}
            className={
              isFav
                ? 'fill-gold stroke-gold'
                : 'fill-none stroke-offwhite'
            }
            strokeWidth={isFav ? 0 : 2}
          />
        </button>

        {/* Card link */}
        <Link href={`/properties/${property.slug}`} className="group block">
          <article>
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-4">
              <Image
                src={property.heroImage}
                alt={property.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="font-display text-lg mb-1 group-hover:text-gold transition-colors truncate">
                  {property.title}
                </h3>
                <p className="text-sm text-espresso/60 truncate">{property.location}</p>
              </div>
              <p className="font-mono text-sm text-espresso whitespace-nowrap">
                {property.price}
              </p>
            </div>
            <div className="flex items-center gap-3 mt-2 text-xs text-espresso/50 font-mono">
              <span>{property.bedrooms} Bed</span>
              <span className="text-espresso/20" aria-hidden="true">·</span>
              <span>{property.area}</span>
              <span className="text-espresso/20" aria-hidden="true">·</span>
              <span>{property.type}</span>
            </div>
          </article>
        </Link>
      </div>
    </Reveal>
  );
}

export function FeaturedProperties() {
  // Use useState + useEffect instead of useSyncExternalStore to avoid hydration issues
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

  const toggleFavorite = useCallback((slug: string) => {
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

  const properties = getFeaturedProperties().slice(0, 6);

  return (
    <section className="section-py" aria-label="Featured properties">
      <Container variant="main">
        <Reveal>
          <SectionLabel>Featured Properties</SectionLabel>
          <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] mb-3">
            Curated Residences
          </h2>
          <p className="text-espresso/60 body-text mb-10">
            A selection of homes chosen for their design, location, and character.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              isFav={favorites.includes(property.slug)}
              onToggle={toggleFavorite}
            />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button variant="ghost" href="/properties">
            View All Properties
            <ArrowRight size={14} className="ml-2" />
          </Button>
        </div>
      </Container>
    </section>
  );
}