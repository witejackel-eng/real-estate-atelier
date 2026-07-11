'use client';

import { Container } from '@/components/shared/Container';
import { Reveal } from '@/components/shared/Reveal';
import { AnimatedText } from '@/components/shared/AnimatedText';
import { Button } from '@/components/shared/Button';

export function FinalCTA() {
  return (
    <section className="py-20 md:py-28 bg-charcoal text-offwhite">
      <Container className="text-center">
        <Reveal>
          <AnimatedText
            text="Find the address that fits the next version of your life."
            as="h2"
            className="font-display text-3xl md:text-5xl text-offwhite max-w-3xl mx-auto mb-10 md:mb-12"
          />
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              className="bg-gold text-espresso hover:bg-gold/90"
            >
              Book a Private Viewing
            </Button>
            <Button
              href="/contact"
              variant="secondary"
              size="lg"
              className="border-offwhite/20 text-offwhite hover:border-offwhite/50 hover:text-offwhite"
            >
              Contact the Studio
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}