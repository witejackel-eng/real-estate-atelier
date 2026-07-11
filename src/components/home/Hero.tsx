'use client';

import Image from 'next/image';
import { Container } from '@/components/shared/Container';
import { Button } from '@/components/shared/Button';
import { Reveal } from '@/components/shared/Reveal';

export function Hero() {
  return (
    <section aria-label="Homepage hero">
      <Container variant="main">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* RIGHT — Image (first on mobile) */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <Reveal direction="right" delay={0.1}>
              <div className="relative aspect-[3/4] lg:aspect-[4/5] rounded-sm overflow-hidden">
                <Image
                  src="/images/hero-main.jpg"
                  alt="A contemporary villa in Siolim, Goa with floor-to-ceiling glass walls surrounded by tropical greenery"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  priority
                />
              </div>
              <p className="font-mono text-xs text-espresso/50 mt-3">
                Siolim, Goa
              </p>
            </Reveal>
          </div>

          {/* LEFT — Content (second on mobile) */}
          <div className="lg:col-span-7 order-2 lg:order-1 flex flex-col justify-center py-16 lg:py-24">
            <Reveal delay={0}>
              <span className="font-mono text-xs tracking-[0.1em] uppercase text-gold mb-6 block">
                Luxury Residences Across India
              </span>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] text-espresso mb-6 text-balance">
                Find a Home That Speaks to You
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="body-text text-espresso/70 max-w-xl mb-8">
                We curate a select collection of residential properties across India&apos;s most desirable cities — villas, penthouses, and heritage homes chosen for their design, location, and lasting value.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex gap-4 flex-wrap">
                <Button variant="primary" size="lg" href="/properties">
                  Explore Properties
                </Button>
                <Button variant="secondary" size="lg" href="/sell">
                  Request a Valuation
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}