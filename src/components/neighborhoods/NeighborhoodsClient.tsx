'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/shared/Container';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { Reveal } from '@/components/shared/Reveal';
import { getAllNeighborhoods } from '@/data/neighborhoods';
import { properties } from '@/data/properties';
import { formatPrice } from '@/lib/utils';

const neighborhoods = getAllNeighborhoods();

function getNeighborhoodData(neighborhoodName: string) {
  const matching = properties.filter((p) => p.city === neighborhoodName);

  if (matching.length === 0) {
    return { count: 0, priceRange: null };
  }

  const min = Math.min(...matching.map((p) => p.priceNumber));
  const max = Math.max(...matching.map((p) => p.priceNumber));

  return {
    count: matching.length,
    priceRange: {
      min,
      max,
      label: min === max
        ? formatPrice(min)
        : `${formatPrice(min)} — ${formatPrice(max)}`,
    },
  };
}

export function NeighborhoodsClient() {
  return (
    <section className="section-py" aria-label="Neighborhoods">
      <Container variant="main">
        {/* ── Header ──────────────────────────── */}
        <Reveal>
          <SectionLabel>Neighborhoods</SectionLabel>
          <h1 className="font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.1] text-espresso mt-4 mb-4 text-balance">
            Explore by Location
          </h1>
          <p className="body-text text-espresso/70 max-w-2xl mb-12">
            Each of these cities has a distinct character and property market. Browse our
            curated neighborhoods to find the one that fits how you want to live.
          </p>
        </Reveal>

        {/* ── Grid ───────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {neighborhoods.map((neighborhood, i) => {
            const data = getNeighborhoodData(neighborhood.name);
            const href = `/properties?city=${encodeURIComponent(neighborhood.name)}`;

            return (
              <Reveal key={neighborhood.slug} delay={i * 0.06}>
                <Link
                  href={href}
                  className="group block relative rounded-sm overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative aspect-[3/4] md:aspect-[4/3]">
                    <Image
                      src={neighborhood.image}
                      alt={neighborhood.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/30 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
                      {/* Lifestyle tags */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {neighborhood.lifestyleTags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[10px] uppercase tracking-[0.08em] text-offwhite/70 bg-offwhite/10 backdrop-blur-sm px-2.5 py-1 rounded-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Name */}
                      <h2 className="font-display text-2xl sm:text-3xl text-offwhite mb-1">
                        {neighborhood.name}
                      </h2>

                      {/* Tagline */}
                      <p className="text-sm text-offwhite/70 mb-3 line-clamp-2">
                        {neighborhood.tagline}
                      </p>

                      {/* Meta row */}
                      <div className="flex items-center gap-4 text-xs font-mono text-offwhite/50">
                        {data.count > 0 ? (
                          <>
                            <span>
                              {data.count} {data.count === 1 ? 'property' : 'properties'}
                            </span>
                            <span className="w-px h-3 bg-offwhite/20" aria-hidden />
                            <span>{data.priceRange?.label}</span>
                          </>
                        ) : (
                          <span>Enquire for availability</span>
                        )}
                        <ArrowUpRight
                          size={14}
                          className="ml-auto text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          aria-hidden
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}