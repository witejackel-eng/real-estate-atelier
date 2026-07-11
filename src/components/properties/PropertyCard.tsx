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
    <div className="relative group">
      {/* Favorite button — sibling of the link, positioned over the image area */}
      {onToggleFavorite && (
        <button
          type="button"
          aria-label={
            isFavorited
              ? `Remove ${property.title} from favorites`
              : `Save ${property.title} to favorites`
          }
          onClick={() => onToggleFavorite(property.slug)}
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

      {/* Card link */}
      <Link href={`/properties/${property.slug}`} className="group/block block">
        <article>
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-4">
            <Image
              src={property.heroImage}
              alt={property.title}
              fill
              className="object-cover transition-transform duration-500 group-hover/block:scale-[1.03]"
              sizes={sizes}
            />
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="font-display text-lg group-hover/block:text-gold transition-colors truncate">
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
  );
}