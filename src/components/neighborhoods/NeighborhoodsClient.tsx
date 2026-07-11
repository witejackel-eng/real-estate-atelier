'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/shared/Container';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { Reveal } from '@/components/shared/Reveal';
import { AnimatedText } from '@/components/shared/AnimatedText';
import { neighborhoods, type Neighborhood } from '@/data/neighborhoods';

const comparisonData = [
  {
    label: 'Best for Families',
    neighborhoods: ['Delhi NCR', 'Pune'],
  },
  {
    label: 'Best for Investors',
    neighborhoods: ['Mumbai', 'Hyderabad'],
  },
  {
    label: 'Best for Luxury Lifestyle',
    neighborhoods: ['Mumbai', 'Goa'],
  },
  {
    label: 'Best for Weekend Homes',
    neighborhoods: ['Goa', 'Alibaug'],
  },
];

function NeighborhoodCard({ neighborhood }: { neighborhood: Neighborhood }) {
  return (
    <Reveal>
      <article className="bg-offwhite border border-espresso/5 overflow-hidden group">
        <div className="relative aspect-[3/2] overflow-hidden">
          <Image
            src={neighborhood.image}
            alt={neighborhood.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="p-6 sm:p-8">
          <h3 className="font-display text-2xl sm:text-3xl text-espresso">{neighborhood.name}</h3>
          <p className="font-body text-lg text-espresso/60 mt-1">{neighborhood.tagline}</p>
          <p className="font-body text-sm text-espresso/50 leading-relaxed mt-4 line-clamp-3">
            {neighborhood.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {neighborhood.bestFor.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-ivory border border-espresso/5 font-mono text-xs text-espresso/60 px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {neighborhood.propertyTypes.map((type) => (
              <span
                key={type}
                className="inline-block font-mono text-xs text-gold/80"
              >
                {type}
              </span>
            ))}
          </div>

          <div className="mt-5 pt-5 border-t border-espresso/5 flex items-center justify-between">
            <span className="font-mono text-sm text-gold">{neighborhood.priceRange}</span>
            <Link
              href={`/properties?city=${encodeURIComponent(neighborhood.name)}`}
              className="inline-flex items-center gap-1.5 font-body text-sm text-espresso hover:text-gold transition-colors duration-300"
            >
              Explore
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function NeighborhoodsClient() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="py-24 sm:py-32 pt-28 sm:pt-36">
        <Container>
          <Reveal>
            <SectionLabel label="Guides" />
          </Reveal>
          <AnimatedText
            text="Know the place before you choose the home."
            as="h1"
            className="font-display text-4xl sm:text-5xl lg:text-6xl mt-3 tracking-tight leading-tight"
          />
          <Reveal delay={0.2}>
            <p className="font-body text-espresso/60 mt-4 max-w-xl text-base sm:text-lg leading-relaxed">
              Our neighborhood guides go beyond property listings — they help you understand the lifestyle, community, and context of each area before you make a decision.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Neighborhood Cards */}
      <section className="pb-16 sm:pb-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {neighborhoods.map((neighborhood) => (
              <NeighborhoodCard key={neighborhood.slug} neighborhood={neighborhood} />
            ))}
          </div>
        </Container>
      </section>

      {/* Comparison Section */}
      <section className="py-16 sm:py-20 bg-offwhite editorial-line">
        <Container>
          <Reveal>
            <SectionLabel label="Compare" />
            <h2 className="font-display text-3xl sm:text-4xl text-espresso mt-2 mb-12 tracking-tight">
              Best neighborhoods by priority
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {comparisonData.map((item, index) => (
              <Reveal key={item.label} delay={index * 0.08}>
                <div className="bg-ivory border border-espresso/5 p-6 h-full">
                  <p className="font-mono text-xs uppercase tracking-wider text-gold mb-4">
                    {item.label}
                  </p>
                  <div className="space-y-3">
                    {item.neighborhoods.map((name) => (
                      <div key={name} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                        <span className="font-display text-lg text-espresso">{name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}