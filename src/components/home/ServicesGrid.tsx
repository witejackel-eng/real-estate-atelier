'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Container } from '@/components/shared/Container';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { Reveal } from '@/components/shared/Reveal';
import { AnimatedText } from '@/components/shared/AnimatedText';

interface Service {
  title: string;
  slug: string;
  copy: string;
}

const services: Service[] = [
  {
    title: 'Buy a Home',
    slug: 'buy',
    copy: 'We help you compare the right homes, understand the trade-offs, and move only when the decision feels clear.',
  },
  {
    title: 'Sell a Property',
    slug: 'sell',
    copy: 'We position, photograph, and present your home so serious buyers understand its value before they visit.',
  },
  {
    title: 'Luxury Rentals',
    slug: 'rental',
    copy: 'Curated rental properties for those who want premium living without a purchase commitment.',
  },
  {
    title: 'Investment Advisory',
    slug: 'invest',
    copy: 'Data-informed guidance on where and when to invest, based on market realities, not trends.',
  },
  {
    title: 'Relocation Support',
    slug: 'relocate',
    copy: 'End-to-end assistance for moving between cities, from shortlisting to settling in.',
  },
  {
    title: 'Property Staging',
    slug: 'staging',
    copy: 'We prepare your property to photograph and show at its best, so buyers see potential immediately.',
  },
  {
    title: 'Market Valuation',
    slug: 'valuation',
    copy: 'Clear, honest pricing based on comparable sales, location analysis, and current demand.',
  },
  {
    title: 'Closing Guidance',
    slug: 'closing',
    copy: 'Support through documentation, legal checks, and negotiations so nothing falls through the cracks.',
  },
];

function ServiceTile({ service, index }: { service: Service; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Reveal delay={index * 0.07}>
      <div
        className="group relative bg-offwhite border border-espresso/5 p-6 md:p-8 min-h-[280px] md:min-h-[320px] overflow-hidden transition-all duration-500 hover:border-gold/20 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Repeated title background pattern */}
        <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden pointer-events-none select-none">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="font-display text-4xl md:text-5xl text-espresso/[0.03] leading-tight whitespace-nowrap"
            >
              {service.title}
            </span>
          ))}
        </div>

        {/* Hover Image */}
        <div
          className="absolute inset-0 z-0 transition-opacity duration-700"
          style={{ opacity: isHovered ? 0.12 : 0 }}
        >
          <Image
            src={`/images/service-${service.slug}.jpg`}
            alt={service.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className="font-display text-2xl text-espresso mb-3 group-hover:text-gold transition-colors duration-300">
            {service.title}
          </h3>
          <p className="font-body text-sm text-espresso/60 leading-relaxed max-w-xs">
            {service.copy}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export function ServicesGrid() {
  return (
    <section className="py-20 md:py-28 bg-offwhite">
      <Container>
        <Reveal>
          <SectionLabel label="/ WHAT WE DO" />
        </Reveal>
        <Reveal delay={0.1}>
          <AnimatedText
            text="Services for every stage of owning."
            as="h2"
            className="font-display text-4xl text-espresso mb-12 md:mb-16"
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, index) => (
            <ServiceTile key={service.slug} service={service} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}