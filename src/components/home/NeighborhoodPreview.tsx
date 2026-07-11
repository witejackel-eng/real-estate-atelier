'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/shared/Container';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { Reveal } from '@/components/shared/Reveal';
import { AnimatedText } from '@/components/shared/AnimatedText';
import { neighborhoods } from '@/data/neighborhoods';

export function NeighborhoodPreview() {
  const featured = neighborhoods.slice(0, 4);

  return (
    <section className="py-20 md:py-28 bg-ivory">
      <Container>
        <Reveal>
          <SectionLabel label="/ NEIGHBORHOODS" />
        </Reveal>
        <Reveal delay={0.1}>
          <AnimatedText
            text="Six cities, six ways to live."
            as="h2"
            className="font-display text-4xl text-espresso mb-12 md:mb-16"
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {featured.map((neighborhood, index) => (
            <Reveal key={neighborhood.slug} delay={index * 0.1}>
              <Link href="/neighborhoods" className="group block">
                <article className="overflow-hidden">
                  {/* Image */}
                  <div className="relative aspect-[3/2] img-zoom">
                    <Image
                      src={neighborhood.image}
                      alt={neighborhood.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-espresso/20 to-transparent" />
                    <h3 className="absolute bottom-4 left-5 md:bottom-6 md:left-6 font-display text-2xl md:text-3xl text-offwhite">
                      {neighborhood.name}
                    </h3>
                  </div>

                  {/* Content */}
                  <div className="p-5 md:p-6 bg-offwhite border border-t-0 border-espresso/5">
                    <p className="font-body text-sm text-espresso/70 mb-3 leading-relaxed">
                      {neighborhood.tagline}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {neighborhood.lifestyleTags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[0.65rem] tracking-wider uppercase text-espresso/40 border border-espresso/10 px-2 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm text-gold tracking-wider">
                        {neighborhood.priceRange}
                      </span>
                      <span className="font-mono text-xs text-gold tracking-wider group-hover:text-terracotta transition-colors duration-300">
                        Explore Area →
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}