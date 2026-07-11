'use client';

import { Container } from '@/components/shared/Container';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { Reveal } from '@/components/shared/Reveal';
import { AnimatedText } from '@/components/shared/AnimatedText';

const testimonials = [
  {
    quote:
      'The process felt calm, prepared, and transparent from the first viewing. We never felt rushed into a decision.',
    name: 'Demo Client A',
    role: 'Home Buyer, Mumbai',
  },
  {
    quote:
      'They helped us understand pricing without pressure. The home sold within six weeks at a fair price.',
    name: 'Demo Client B',
    role: 'Property Seller, Delhi',
  },
  {
    quote:
      "Their market knowledge saved us from two bad investments. We ended up with a property that actually appreciates.",
    name: 'Demo Client C',
    role: 'Investor, Bangalore',
  },
];

export function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-ivory">
      <Container>
        <Reveal>
          <div className="flex items-baseline gap-4 mb-4 md:mb-6">
            <SectionLabel label="/ TESTIMONIALS" />
            <span className="font-mono text-[0.65rem] tracking-wider text-espresso/30">
              (Demo testimonials)
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <AnimatedText
            text="What people say after the process."
            as="h2"
            className="font-display text-4xl text-espresso mb-12 md:mb-16"
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 0.12}>
              <article className="bg-offwhite border border-espresso/10 p-8 h-full flex flex-col">
                <blockquote className="font-body text-lg italic text-espresso/80 leading-relaxed flex-1">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="border-t border-espresso/10 mt-6 pt-6">
                  <p className="font-display text-base text-espresso">{testimonial.name}</p>
                  <p className="font-mono text-xs text-gold tracking-wider mt-1">
                    {testimonial.role}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}