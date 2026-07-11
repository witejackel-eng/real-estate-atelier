'use client';

import { useCallback, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ArrowUpRight } from 'lucide-react';
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
      <div className="relative border-t border-espresso/20 pt-3">
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
            <div className="relative aspect-[4/3] overflow-hidden mb-4">
              <Image
                src={property.heroImage}
                alt={property.title}
                fill
                className="object-cover grayscale-[18%] transition-all duration-700 group-hover:scale-[1.035] group-hover:grayscale-0"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="font-display text-xl tracking-[-0.02em] mb-1 group-hover:text-cobalt transition-colors truncate">
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
    <section className="bg-paper py-24 lg:py-36" aria-label="Featured properties">
      <Container variant="main">
        <div className="mb-14 grid gap-8 border-t border-espresso/30 pt-4 lg:grid-cols-12 lg:mb-20">
          <Reveal className="lg:col-span-3">
            <SectionLabel className="text-espresso">N° 002 / The collection</SectionLabel>
          </Reveal>
          <Reveal className="lg:col-span-9" delay={0.06}>
            <h2 className="max-w-5xl font-display text-[clamp(3.25rem,7.2vw,7.5rem)] leading-[0.92] tracking-[-0.055em]">
              Homes with a point of view.
            </h2>
            <p className="mt-8 max-w-xl body-text text-espresso/65">
              Not everything makes the edit. Each residence is visited, studied, and selected for the details that cannot be reduced to a checklist.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              isFav={favorites.includes(property.slug)}
              onToggle={toggleFavorite}
            />
          ))}
        </div>

        <div className="flex justify-end mt-14 border-t border-espresso/20 pt-5">
          <Button variant="ghost" href="/properties" className="no-underline">
            View the full collection
            <ArrowUpRight size={15} className="ml-2" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
