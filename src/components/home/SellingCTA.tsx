'use client';

import { Container } from '@/components/shared/Container';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { Reveal } from '@/components/shared/Reveal';
import { AnimatedText } from '@/components/shared/AnimatedText';
import { Button } from '@/components/shared/Button';

export function SellingCTA() {
  return (
    <section className="py-20 md:py-28 bg-sand/50">
      <Container>
        <Reveal>
          <SectionLabel label="/ SELL" />
        </Reveal>
        <Reveal delay={0.1}>
          <AnimatedText
            text="Selling a property? Make it feel inevitable."
            as="h2"
            className="font-display text-4xl md:text-5xl text-espresso mb-6"
          />
        </Reveal>
        <Reveal delay={0.2}>
          <p className="font-body text-lg text-espresso/70 max-w-2xl mb-10 leading-relaxed">
            We help position, photograph, price, and present your home so serious buyers understand
            its value before they visit.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/sell" variant="primary" size="lg">
              Request a Valuation
            </Button>
            <Button href="/sell#process" variant="secondary" size="lg">
              See Selling Process
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}