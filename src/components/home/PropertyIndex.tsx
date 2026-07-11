'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/shared/Container';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { Reveal } from '@/components/shared/Reveal';
import { AnimatedText } from '@/components/shared/AnimatedText';
import { getAllProperties } from '@/data/properties';
import type { Property } from '@/data/properties';

function PropertyRow({
  property,
  index,
  onHover,
  onLeave,
}: {
  property: Property;
  index: number;
  onHover: (property: Property) => void;
  onLeave: () => void;
}) {
  const num = String(index + 1).padStart(3, '0');

  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group block border-b border-espresso/10 py-6 md:py-8 transition-colors duration-300 hover:bg-sand/30 -mx-4 px-4 md:-mx-6 md:px-6"
      onMouseEnter={() => onHover(property)}
      onMouseLeave={onLeave}
    >
      <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1fr_auto_auto_auto] items-center gap-4 md:gap-8">
        <span className="font-mono text-xs text-gold tracking-wider shrink-0">/ {num}</span>
        <h3 className="font-display text-xl md:text-2xl lg:text-3xl text-espresso group-hover:text-gold transition-all duration-300 group-hover:translate-x-2">
          {property.title}
        </h3>
        <span className="font-mono text-xs text-espresso/50 tracking-wider hidden md:block">
          {property.city}
        </span>
        <span className="font-mono text-xs text-gold tracking-wider hidden md:block">
          {property.type}
        </span>
        <span className="font-body text-sm font-medium text-espresso hidden md:block">
          {property.price}
        </span>
      </div>
      <div className="md:hidden flex gap-4 mt-2">
        <span className="font-mono text-xs text-espresso/50 tracking-wider">
          {property.city} · {property.type}
        </span>
        <span className="font-body text-sm font-medium text-espresso">{property.price}</span>
      </div>
    </Link>
  );
}

export function PropertyIndex() {
  const properties = getAllProperties();
  const [hoveredProperty, setHoveredProperty] = useState<Property | null>(null);

  return (
    <section className="py-20 md:py-28 bg-ivory">
      <Container>
        <Reveal>
          <SectionLabel label="/ PROPERTY INDEX" />
        </Reveal>
        <Reveal delay={0.1}>
          <AnimatedText
            text="Every residence, numbered."
            as="h2"
            className="font-display text-4xl text-espresso mb-12 md:mb-16"
          />
        </Reveal>

        <div className="relative">
          {/* Desktop Image Preview */}
          <AnimatePresence>
            {hoveredProperty && (
              <motion.div
                className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 z-30 w-72 xl:w-80 pointer-events-none"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative aspect-[4/3] overflow-hidden shadow-2xl shadow-espresso/20">
                  <Image
                    src={hoveredProperty.heroImage}
                    alt={hoveredProperty.title}
                    fill
                    className="object-cover"
                    sizes="320px"
                  />
                </div>
                <p className="font-display text-lg text-espresso mt-3">
                  {hoveredProperty.title}
                </p>
                <p className="font-mono text-xs text-gold tracking-wider">
                  {hoveredProperty.price}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Property Rows */}
          <div className="max-w-4xl">
            {properties.map((property, index) => (
              <Reveal key={property.id} delay={index * 0.05}>
                <PropertyRow
                  property={property}
                  index={index}
                  onHover={setHoveredProperty}
                  onLeave={() => setHoveredProperty(null)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}