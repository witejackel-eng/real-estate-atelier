import Image from 'next/image';
import { Check } from 'lucide-react';
import { Container } from '@/components/shared/Container';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { Button } from '@/components/shared/Button';
import { Reveal } from '@/components/shared/Reveal';

const benefits = [
  'Market-aware pricing based on comparable transactions',
  'Professional photography and property staging',
  'Qualified inquiry handling and negotiation support',
];

export function SellingCTA() {
  return (
    <section className="section-py" aria-label="For sellers">
      <Container variant="main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <Reveal>
            <div>
              <SectionLabel>For Sellers</SectionLabel>
              <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] mb-4">
                Sell with Confidence
              </h2>
              <p className="body-text text-espresso/70 mb-8">
                We take on a limited number of properties to ensure each one
                receives dedicated attention — from professional presentation
                and strategic pricing to qualified buyer matching and closing
                coordination.
              </p>
              <ul className="space-y-3 mb-8">
                {benefits.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check
                      size={16}
                      className="text-gold mt-0.5 shrink-0"
                      aria-hidden
                    />
                    <span className="text-sm text-espresso/80">{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="primary" size="lg" href="/sell">
                Request a Valuation
              </Button>
            </div>
          </Reveal>

          {/* Image */}
          <Reveal direction="right" delay={0.15}>
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
              <Image
                src="/images/sell-hero.jpg"
                alt="A well-staged luxury living room with natural light and premium furnishings"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}