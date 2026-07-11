'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/shared/Reveal';
import { neighborhoods } from '@/data/neighborhoods';
import { properties } from '@/data/properties';

/* ────────────────────────────────────────────
   Helpers
   ──────────────────────────────────────────── */
function getPropertyMeta(neighborhoodName: string) {
  const cityProps = properties.filter((p) => p.city === neighborhoodName);
  const count = cityProps.length;
  const types = [...new Set(cityProps.map((p) => p.type))];
  const minPrice = cityProps.length > 0
    ? Math.min(...cityProps.map((p) => p.priceNumber))
    : 0;
  const maxPrice = cityProps.length > 0
    ? Math.max(...cityProps.map((p) => p.priceNumber))
    : 0;

  function formatPrice(n: number): string {
    if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)} Cr`;
    if (n >= 100000) return `₹${(n / 100000).toFixed(0)} L`;
    return `₹${n.toLocaleString('en-IN')}`;
  }

  const priceRange =
    count > 0
      ? minPrice === maxPrice
        ? formatPrice(minPrice)
        : `${formatPrice(minPrice)} — ${formatPrice(maxPrice)}`
      : neighborhoods.find((n) => n.name === neighborhoodName)?.priceRange ?? '';

  return { count, types, priceRange };
}

/* ────────────────────────────────────────────
   Mobile Card
   ──────────────────────────────────────────── */
function MobileCard({
  neighborhood,
  index,
}: {
  neighborhood: (typeof neighborhoods)[number];
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const { count, types, priceRange } = getPropertyMeta(neighborhood.name);

  return (
    <Reveal delay={80 + index * 60}>
      <article className="mb-6">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={neighborhood.image}
            alt={neighborhood.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
            <span className="label-micro text-white/50">
              N°{String(index + 1).padStart(3, '0')}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-white mt-1">
              {neighborhood.name}
            </h2>
            <p className="body-copy-light opacity-60 text-sm mt-1">
              {neighborhood.tagline}
            </p>
            <div className="flex items-center gap-3 mt-3 text-xs text-white/40 font-mono">
              {count > 0 && <span>{count} {count === 1 ? 'listing' : 'listings'}</span>}
              <span className="w-px h-3 bg-white/20" aria-hidden="true" />
              <span>{priceRange}</span>
            </div>
          </div>
        </div>

        {/* Expandable description */}
        <div className="px-1 pt-4">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="text-xs font-mono text-muted uppercase tracking-widest hover:text-brass transition-colors"
            aria-expanded={expanded}
          >
            {expanded ? 'Less' : 'Read more'}
          </button>
          <div
            className="overflow-hidden transition-all duration-500"
            style={{ maxHeight: expanded ? '400px' : '0px', opacity: expanded ? 1 : 0 }}
          >
            <p className="body-copy-muted text-sm mt-3">
              {neighborhood.description}
            </p>
            {neighborhood.lifestyleTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {neighborhood.lifestyleTags.map((tag) => (
                  <span
                    key={tag}
                    className="label-micro text-muted border border-ink/8 px-2.5 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <Link
              href={`/properties?city=${encodeURIComponent(neighborhood.name)}`}
              className="btn-outline-dark mt-6 inline-flex"
            >
              View Properties
            </Link>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/* ────────────────────────────────────────────
   Desktop Chapter
   ──────────────────────────────────────────── */
function DesktopChapter({
  neighborhood,
  index,
}: {
  neighborhood: (typeof neighborhoods)[number];
  index: number;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const { count, types, priceRange } = getPropertyMeta(neighborhood.name);

  const handleIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    for (const entry of entries) {
      setInView(entry.isIntersecting);
    }
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.15,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [handleIntersect]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen hidden md:flex items-end overflow-hidden"
    >
      {/* Background image with parallax scale */}
      <div
        className="absolute inset-0 transition-transform duration-700"
        style={{
          transform: inView ? 'scale(1.05)' : 'scale(1.10)',
          transformOrigin: 'center center',
        }}
      >
        <Image
          src={neighborhood.image}
          alt={neighborhood.name}
          fill
          className="object-cover"
          sizes="100vw"
          priority={index === 0}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-ink/20" />

      {/* Content */}
      <div className="relative z-10 w-full container-site pb-12 lg:pb-16">
        <span
          className="section-number text-white/50 block"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(12px)',
            transition: `opacity 0.6s var(--ease-out-expo) 0.1s, transform 0.6s var(--ease-out-expo) 0.1s`,
          }}
        >
          N°{String(index + 1).padStart(3, '0')}
        </span>
        <h2
          className="display-section text-white mt-3"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(12px)',
            transition: `opacity 0.6s var(--ease-out-expo) 0.2s, transform 0.6s var(--ease-out-expo) 0.2s`,
          }}
        >
          {neighborhood.name}
        </h2>
        <p
          className="body-copy-light opacity-50 mt-2 max-w-lg"
          style={{
            opacity: inView ? 0.5 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(12px)',
            transition: `opacity 0.6s var(--ease-out-expo) 0.3s, transform 0.6s var(--ease-out-expo) 0.3s`,
          }}
        >
          {neighborhood.tagline}
        </p>
        <p
          className="body-copy-light opacity-60 mt-4 max-w-xl"
          style={{
            opacity: inView ? 0.6 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(12px)',
            transition: `opacity 0.6s var(--ease-out-expo) 0.35s, transform 0.6s var(--ease-out-expo) 0.35s`,
          }}
        >
          {neighborhood.description}
        </p>

        {/* Meta row */}
        <div
          className="flex items-center gap-4 mt-6 text-xs font-mono text-white/40"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(12px)',
            transition: `opacity 0.6s var(--ease-out-expo) 0.4s, transform 0.6s var(--ease-out-expo) 0.4s`,
          }}
        >
          {count > 0 && <span>{count} {count === 1 ? 'listing' : 'listings'}</span>}
          {types.length > 0 && (
            <>
              <span className="w-px h-3 bg-white/20" aria-hidden="true" />
              <span>{types.join(', ')}</span>
            </>
          )}
          <span className="w-px h-3 bg-white/20" aria-hidden="true" />
          <span>{priceRange}</span>
        </div>

        {/* Lifestyle tags */}
        <div
          className="flex flex-wrap gap-2 mt-5"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(12px)',
            transition: `opacity 0.6s var(--ease-out-expo) 0.45s, transform 0.6s var(--ease-out-expo) 0.45s`,
          }}
        >
          {neighborhood.lifestyleTags.map((tag) => (
            <span
              key={tag}
              className="label-micro text-white/40 border border-white/10 px-2.5 py-1"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div
          className="mt-8"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(12px)',
            transition: `opacity 0.6s var(--ease-out-expo) 0.5s, transform 0.6s var(--ease-out-expo) 0.5s`,
          }}
        >
          <Link
            href={`/properties?city=${encodeURIComponent(neighborhood.name)}`}
            className="btn-outline"
          >
            View Properties
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────
   Neighborhoods Client
   ──────────────────────────────────────────── */
export function NeighborhoodsClient() {
  return (
    <>
      {/* ── Hero ─────────────────────────────── */}
      <section className="section-py">
        <div className="container-editorial">
          <Reveal>
            <span className="section-number">N°003</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="display-page text-ink mt-4 mb-8">
              A life, placed well.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="body-copy text-muted max-w-xl">
              Each city on this platform has been chosen for the quality of
              its residential offerings and the character of its
              neighborhoods. We work where we believe a thoughtful home can
              be found and lived in.
            </p>
          </Reveal>
        </div>
      </section>

      <hr className="rule" />

      {/* ── Desktop: Full-screen chapters ──── */}
      <div className="hidden md:block">
        {neighborhoods.map((n, i) => (
          <DesktopChapter key={n.slug} neighborhood={n} index={i} />
        ))}
      </div>

      {/* ── Mobile: Editorial cards ─────────── */}
      <div className="md:hidden px-[clamp(1.25rem,4vw,5rem)] pt-8 pb-16">
        {neighborhoods.map((n, i) => (
          <MobileCard key={n.slug} neighborhood={n} index={i} />
        ))}
      </div>
    </>
  );
}