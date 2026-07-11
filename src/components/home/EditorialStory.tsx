'use client';

import { Container } from '@/components/shared/Container';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { Reveal } from '@/components/shared/Reveal';
import { AnimatedText } from '@/components/shared/AnimatedText';

const includedItems = [
  'Curated property selection',
  'Verified listings and honest descriptions',
  'Pricing clarity and market context',
  'Negotiation support',
  'Private viewings by appointment',
  'Closing documentation guidance',
];

export function EditorialStory() {
  return (
    <section className="py-20 md:py-28 bg-espresso text-offwhite">
      <Container>
        <Reveal>
          <SectionLabel label="/ OUR APPROACH" className="text-gold" />
        </Reveal>
        <Reveal delay={0.1}>
          <AnimatedText
            text="The quiet difference is preparation."
            as="h2"
            className="font-display text-4xl md:text-5xl text-offwhite mb-12 md:mb-16"
          />
        </Reveal>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
          {/* Left Column - Long form copy */}
          <Reveal delay={0.15} className="md:col-span-1">
            <div className="font-body text-base md:text-lg text-offwhite/70 leading-relaxed space-y-6">
              <p>
                Every property we present has been visited, verified, and evaluated against a simple
                standard: would we recommend this to someone we know? The answer isn&apos;t always yes.
              </p>
              <p>
                When it is, we prepare a detailed brief covering pricing context, neighborhood
                dynamics, builder track record, and honest trade-offs.
              </p>
              <p>
                Our role isn&apos;t to sell you a home. It&apos;s to make sure you understand what
                you&apos;re buying, what it costs to maintain, and how it fits the life you&apos;re
                actually planning to live.
              </p>
              <p>
                We also work with sellers who want to present their property properly. That means
                professional photography, accurate descriptions, transparent pricing, and access to a
                curated list of serious buyers.
              </p>
              <p>
                The process takes longer than a standard listing. The results tend to justify the
                patience.
              </p>
            </div>
          </Reveal>

          {/* Right Column - What's included */}
          <Reveal delay={0.25} className="md:col-span-1">
            <div className="space-y-0">
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-gold/70 mb-8">
                What&apos;s included
              </p>
              <ul className="space-y-5">
                {includedItems.map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <span className="text-gold mt-0.5 shrink-0">—</span>
                    <span className="font-body text-base text-offwhite/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}