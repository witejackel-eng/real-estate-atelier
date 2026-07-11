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
    <section className="bg-paper py-24 lg:py-36" aria-label="For sellers">
      <Container variant="main">
        <div className="grid grid-cols-1 gap-12 border-t border-espresso/30 pt-4 lg:grid-cols-12 lg:gap-12">
          {/* Content */}
          <Reveal className="lg:col-span-5 lg:flex lg:flex-col lg:justify-between">
            <div>
              <SectionLabel className="text-espresso">N° 005 / For sellers</SectionLabel>
              <h2 className="mt-10 font-display text-[clamp(3rem,5.5vw,6rem)] leading-[0.92] tracking-[-0.05em] mb-7">
                Your home,<br /><span className="italic text-cobalt">properly seen.</span>
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
              <Button variant="primary" size="lg" href="/sell" className="rounded-full bg-cobalt hover:bg-espresso">
                Request a Valuation
              </Button>
            </div>
          </Reveal>

          {/* Image */}
          <Reveal className="lg:col-span-7" direction="right" delay={0.15}>
            <div className="relative aspect-[4/3] overflow-hidden lg:aspect-[5/4]">
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
