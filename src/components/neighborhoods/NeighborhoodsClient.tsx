'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { neighborhoods, type Neighborhood } from '@/data/neighborhoods';
import { getAllProperties } from '@/data/properties';
import { PageHero } from '@/components/shared/PageHero';
import { SectionHeader } from '@/components/shared/SectionHeader';

/* ────────────────────────────────────────────
   Inline RevealDiv
   ──────────────────────────────────────────── */
function RevealDiv({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: '-40px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(16px)',
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ────────────────────────────────────────────
   Helpers
   ──────────────────────────────────────────── */
const allProperties = getAllProperties();

function getPropertyCount(cityName: string): number {
  return allProperties.filter((p) => p.city === cityName).length;
}

/* ────────────────────────────────────────────
   CityCard — unified layout that works on all breakpoints
   ──────────────────────────────────────────── */
function CityCard({
  neighborhood,
  index,
}: {
  neighborhood: Neighborhood;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const count = getPropertyCount(neighborhood.name);
  const href = `/properties?city=${encodeURIComponent(neighborhood.name)}`;

  // Alternate image side for visual rhythm on desktop
  const imageLeft = index % 2 === 0;

  return (
    <article
      ref={ref}
      className="border-t border-espresso/10 first:border-t-0 py-12 md:py-16 lg:py-20"
      aria-labelledby={`neighborhood-${neighborhood.slug}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Image */}
        <div
          className={`relative aspect-[4/3] lg:aspect-[5/4] overflow-hidden lg:col-span-7 ${
            imageLeft ? '' : 'lg:order-2'
          }`}
        >
          <Image
            src={neighborhood.image}
            alt={`${neighborhood.name} residential landscape`}
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className={`object-cover transition-transform duration-[1.2s] ease-out ${
              inView ? 'scale-100' : 'scale-105'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className={`lg:col-span-5 ${imageLeft ? '' : 'lg:order-1'}`}>
          <div className="flex items-baseline gap-3 mb-3">
            <span className="label-micro text-gold font-bold">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="h-px w-8 bg-warm-grey/30" aria-hidden="true" />
            <span className="label-micro text-warm-grey">
              {count > 0
                ? `${count} ${count === 1 ? 'property' : 'properties'}`
                : 'Enquire for availability'}
            </span>
          </div>

          <h2
            id={`neighborhood-${neighborhood.slug}`}
            className="display-page text-espresso mb-3"
          >
            {neighborhood.name}
          </h2>

          <p className="body-copy text-espresso mb-4 italic">
            {neighborhood.tagline}
          </p>

          <p className="body-copy text-warm-grey mb-6 max-w-md">
            {neighborhood.description}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 label-micro text-warm-grey">
            <span>{neighborhood.propertyTypes.join(' · ')}</span>
            <span className="w-px h-3 bg-warm-grey/30" aria-hidden="true" />
            <span>{neighborhood.priceRange}</span>
          </div>

          {/* Lifestyle tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {neighborhood.lifestyleTags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="label-micro text-warm-grey/80 border border-espresso/12 px-2.5 py-1"
              >
                {tag}
              </span>
            ))}
          </div>

          <Link
            href={href}
            className="btn-outline-dark"
          >
            Explore properties
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ────────────────────────────────────────────
   Component
   ──────────────────────────────────────────── */
export function NeighborhoodsClient() {
  return (
    <>
      {/* ── Hero ─────────────────────────────── */}
      <PageHero
        label="Neighbourhoods"
        title={
          <>
            A life, placed <em className="text-gold not-italic">well.</em>
          </>
        }
        subtitle="Each city has a distinct character and property market. Browse our curated neighbourhoods to find the one that fits how you want to live."
      />

      {/* ── City Cards ────────────────────────── */}
      <section className="pb-20 md:pb-28 lg:pb-36">
        <div className="container-site">
          {neighborhoods.map((neighborhood, i) => (
            <RevealDiv key={neighborhood.slug}>
              <CityCard neighborhood={neighborhood} index={i} />
            </RevealDiv>
          ))}
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────── */}
      <section className="bg-espresso py-16 md:py-20">
        <div className="container-site text-center">
          <RevealDiv>
            <h2 className="heading-property text-ivory mb-4">
              Not sure where to start?
            </h2>
          </RevealDiv>
          <RevealDiv delay={0.08}>
            <p className="body-copy-light opacity-60 mb-8 max-w-md mx-auto">
              Tell us how you want to live, and we&apos;ll point you to the neighbourhoods
              that fit — even ones not listed here yet.
            </p>
          </RevealDiv>
          <RevealDiv delay={0.16}>
            <Link href="/contact" className="btn-primary">
              Start a conversation
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </RevealDiv>
        </div>
      </section>
    </>
  );
}
