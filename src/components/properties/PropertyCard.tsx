'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import type { Property } from '@/data/properties';

interface PropertyCardProps {
  property: Property;
  isFavorited?: boolean;
  onToggleFavorite?: (slug: string) => void;
  sizes?: string;
}

export function PropertyCard({
  property,
  isFavorited,
  onToggleFavorite,
  sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
}: PropertyCardProps) {
  return (
    <Link href={`/properties/${property.slug}`} className="group block">
      <article>
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-4">
          <Image
            src={property.heroImage}
            alt={property.title}
            fill
            className="object-cover"
            sizes={sizes}
          />

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
                e.stopPropagation();
                onToggleFavorite(property.slug);
              }}
              className="absolute top-3 right-3 z-10 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full p-2 bg-charcoal/30 backdrop-blur-sm hover:bg-charcoal/50 transition-colors"
            >
              <Heart
                size={18}
                className={
                  isFavorited
                    ? 'fill-gold stroke-gold'
                    : 'fill-none stroke-offwhite'
                }
                strokeWidth={isFavorited ? 0 : 2}
              />
            </button>
          )}
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-lg group-hover:text-gold transition-colors">
              {property.title}
            </h3>
            <p className="text-sm text-espresso/60">{property.location}</p>
          </div>
          <p className="font-mono text-sm text-espresso whitespace-nowrap">
            {property.price}
          </p>
        </div>

        <div className="flex items-center gap-3 mt-2 text-xs text-espresso/50 font-mono">
          <span>{property.bedrooms} Bed</span>
          <span className="text-espresso/20">·</span>
          <span>{property.area}</span>
          <span className="text-espresso/20">·</span>
          <span>{property.type}</span>
        </div>
      </article>
    </Link>
  );
}