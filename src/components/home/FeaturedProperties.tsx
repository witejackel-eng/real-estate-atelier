'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { Container } from '@/components/shared/Container';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { Reveal } from '@/components/shared/Reveal';
import { AnimatedText } from '@/components/shared/AnimatedText';
import { getFeaturedProperties } from '@/data/properties';
import type { Property } from '@/data/properties';

function PropertyCard({ property, index }: { property: Property; index: number }) {
  const [isSaved, setIsSaved] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      const stored = localStorage.getItem('casaaurelia_favorites');
      if (stored) {
        const favorites: string[] = JSON.parse(stored);
        return favorites.includes(property.slug);
      }
    } catch {
      // ignore
    }
    return false;
  });

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const stored = localStorage.getItem('casaaurelia_favorites');
      const favorites: string[] = stored ? JSON.parse(stored) : [];
      if (isSaved) {
        const updated = favorites.filter((s) => s !== property.slug);
        localStorage.setItem('casaaurelia_favorites', JSON.stringify(updated));
        setIsSaved(false);
      } else {
        favorites.push(property.slug);
        localStorage.setItem('casaaurelia_favorites', JSON.stringify(favorites));
        setIsSaved(true);
      }
    } catch {
      // ignore
    }
  };

  return (
    <Reveal delay={index * 0.1}>
      <Link href={`/properties/${property.slug}`} className="group block">
        <article className="bg-offwhite border border-espresso/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-espresso/5">
          {/* Image */}
          <div className="relative aspect-[4/3] img-zoom">
            <Image
              src={property.heroImage}
              alt={property.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <button
              onClick={toggleFavorite}
              className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center bg-offwhite/80 backdrop-blur-sm rounded-full transition-all duration-300 hover:bg-offwhite hover:scale-110"
              aria-label={isSaved ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart
                size={16}
                className={isSaved ? 'fill-terracotta text-terracotta' : 'text-espresso/60'}
              />
            </button>
          </div>

          {/* Content */}
          <div className="p-5 md:p-6">
            <h3 className="font-display text-xl text-espresso mb-1 group-hover:text-gold transition-colors duration-300">
              {property.title}
            </h3>
            <p className="font-mono text-xs text-gold mb-3 tracking-wider">
              {property.location}
            </p>
            <p className="font-body text-lg font-medium text-espresso mb-4">
              {property.price}
            </p>

            {/* Specs */}
            <div className="flex items-center gap-3 text-espresso/60 mb-4">
              <span className="font-body text-sm">{property.bedrooms} Bed</span>
              <span className="w-px h-3 bg-espresso/15" />
              <span className="font-body text-sm">{property.bathrooms} Bath</span>
              <span className="w-px h-3 bg-espresso/15" />
              <span className="font-body text-sm">{property.area}</span>
            </div>

            <span className="font-mono text-xs text-gold tracking-wider group-hover:text-terracotta transition-colors duration-300">
              View Residence →
            </span>
          </div>
        </article>
      </Link>
    </Reveal>
  );
}

export function FeaturedProperties() {
  const featured = getFeaturedProperties();

  return (
    <section className="py-20 md:py-28 bg-ivory">
      <Container>
        <Reveal>
          <SectionLabel label="/ FEATURED PROPERTIES" />
        </Reveal>
        <Reveal delay={0.1}>
          <AnimatedText
            text="Homes we've curated for you."
            as="h2"
            className="font-display text-4xl md:text-5xl text-espresso mb-12 md:mb-16"
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featured.map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}