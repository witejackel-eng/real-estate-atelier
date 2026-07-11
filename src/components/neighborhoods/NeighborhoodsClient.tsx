'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { neighborhoods, type Neighborhood } from '@/data/neighborhoods';
import { getAllProperties } from '@/data/properties';

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
   City Chapter (Desktop: Full-Screen)
   ──────────────────────────────────────────── */
function CityChapter({
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
        setInView(entry.isIntersecting);
      },
      { rootMargin: '-30% 0px -30% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const count = getPropertyCount(neighborhood.name);
  const href = `/properties?city=${encodeURIComponent(neighborhood.name)}`;

  return (
    <>
      {/* Full-screen desktop chapter */}
      <section
        ref={ref}
        className="relative min-h-screen flex items-end overflow-hidden hidden md:block"
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={neighborhood.image}
            alt={neighborhood.name}
            fill
            className={`object-cover transition-transform duration-[1.2s] ease-out ${
              inView ? 'scale-105' : 'scale-110'
            }`}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/40 to-espresso/20" />
        </div>

        {/* Content overlay */}
        <div className="relative z-10 w-full container-site pb-20 md:pb-28 lg:pb-32">
          <div className="max-w-2xl">
            {/* City number */}
            <span
              className={`section-number text-ivory/60 transition-opacity duration-700 ${
                inView ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDelay: '0.1s' }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>

            {/* City name */}
            <h2
              className={`display-section text-ivory mt-2 transition-all duration-700 ${
                inView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '0.2s' }}
            >
              {neighborhood.name}
            </h2>

            {/* Tagline */}
            <p
              className={`body-copy-light opacity-80 mt-4 max-w-lg transition-all duration-700 ${
                inView
                  ? 'opacity-80 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '0.35s' }}
            >
              {neighborhood.tagline}
            </p>

            {/* Description */}
            <p
              className={`body-copy-light opacity-50 mt-4 max-w-lg transition-all duration-700 ${
                inView
                  ? 'opacity-50 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '0.45s' }}
            >
              {neighborhood.description}
            </p>

            {/* Meta row */}
            <div
              className={`flex flex-wrap items-center gap-4 mt-8 transition-all duration-700 ${
                inView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '0.55s' }}
            >
              {/* Property count */}
              <span className="label-micro text-ivory/60">
                {count} {count === 1 ? 'property' : 'properties'}
              </span>

              <span className="w-px h-3 bg-ivory/20" aria-hidden="true" />

              {/* Property types */}
              <span className="label-micro text-ivory/60">
                {neighborhood.propertyTypes.join(' · ')}
              </span>

              <span className="w-px h-3 bg-ivory/20" aria-hidden="true" />

              {/* Price range */}
              <span className="label-micro text-ivory/60">
                {neighborhood.priceRange}
              </span>
            </div>

            {/* Lifestyle tags */}
            <div
              className={`flex flex-wrap gap-2 mt-6 transition-all duration-700 ${
                inView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '0.65s' }}
            >
              {neighborhood.lifestyleTags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="label-micro text-ivory/50 border border-ivory/12 px-2.5 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div
              className={`mt-8 transition-all duration-700 ${
                inView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '0.75s' }}
            >
              <Link href={href} className="btn-outline cursor-view">
                Explore properties &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile editorial card (hidden on md+) */}
      <section className="md:hidden py-8">
        <div className="container-site">
          <Link href={href} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={neighborhood.image}
                alt={neighborhood.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <span className="label-micro text-ivory/50 mb-1">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h2 className="font-display text-3xl text-ivory mb-1">
                  {neighborhood.name}
                </h2>
                <p className="text-sm text-ivory/70 mb-3 line-clamp-2">
                  {neighborhood.tagline}
                </p>
                <div className="flex items-center gap-3 label-micro text-ivory/50">
                  {count > 0 ? (
                    <span>
                      {count} {count === 1 ? 'property' : 'properties'}
                    </span>
                  ) : (
                    <span>Enquire for availability</span>
                  )}
                  <span className="w-px h-3 bg-ivory/20" aria-hidden="true" />
                  <span>{neighborhood.priceRange}</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Mobile detail */}
          <div className="px-1 pt-4 pb-4 border-b border-espresso/8">
            <p className="body-copy text-warm-grey text-sm line-clamp-3 mb-3">
              {neighborhood.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {neighborhood.lifestyleTags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="label-micro text-warm-grey/70 border border-espresso/8 px-2 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="label-micro text-warm-grey/50">
              {neighborhood.propertyTypes.join(' · ')}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

/* ────────────────────────────────────────────
   Component
   ──────────────────────────────────────────── */
export function NeighborhoodsClient() {
  return (
    <>
      {/* ── Hero ─────────────────────────────── */}
      <section className="py-20 md:py-28 lg:py-36">
        <div className="container-editorial">
          <RevealDiv>
            <span className="section-number">N°003</span>
          </RevealDiv>
          <RevealDiv delay={0.08}>
            <h1 className="display-page text-espresso mt-4 mb-8">
              A life, placed well.
            </h1>
          </RevealDiv>
          <RevealDiv delay={0.16}>
            <p className="body-copy text-warm-grey max-w-xl">
              Each city has a distinct character and property market. Browse our
              curated neighborhoods to find the one that fits how you want to live.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* ── City Chapters ────────────────────── */}
      {neighborhoods.map((neighborhood, i) => (
        <CityChapter key={neighborhood.slug} neighborhood={neighborhood} index={i} />
      ))}
    </>
  );
}