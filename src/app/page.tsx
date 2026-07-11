'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/shared/Reveal';
import { getFeaturedProperties, getAllProperties, cities } from '@/data/properties';
import { neighborhoods } from '@/data/neighborhoods';

/* ─── Data ─── */
const featuredProperties = getFeaturedProperties().slice(0, 3);
const allProperties = getAllProperties();
const propertyCounts = cities.reduce<Record<string, number>>((acc, city) => {
  acc[city] = allProperties.filter((p) => p.city === city).length;
  return acc;
}, {});

/* ─── Arrow Icon (14x14) ─── */
function ArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M1 7H13M13 7L7 1M13 7L7 13"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HOMEPAGE
   ═══════════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <hr className="rule" />
      <CollectionSection />
      <hr className="rule" />
      <MethodSection />
      <hr className="rule" />
      <PlacesSection />
      <hr className="rule" />
      <SellersSection />
      <hr className="rule" />
      <StandardSection />
      <FinalCTASection />
    </main>
  );
}

/* ─── SECTION 1 — Hero (N°000) ─── */
function HeroSection() {
  const heroImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = heroImgRef.current;
    if (!img) return;
    const start = performance.now();
    const duration = 2000;

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const scale = 1.05 - 0.05 * eased;
      img.style.transform = `scale(${scale})`;
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col justify-end overflow-hidden pt-20 lg:pt-24"
      aria-label="Hero"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          ref={heroImgRef}
          src="/images/hero-main.jpg"
          alt="Luxury residential interior with warm natural light"
          fill
          sizes="100vw"
          priority
          className="object-cover"
          style={{ transform: 'scale(1.05)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(24,19,16,0.6) 0%, rgba(24,19,16,0.3) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container-site pb-12 md:pb-16 lg:pb-20">
        <div className="mb-6">
          <h1 className="display-hero text-paper">
            Live{' '}
            <em className="text-brass italic">
              remarkably.
            </em>
          </h1>
        </div>

        <p className="body-copy-light opacity-55 max-w-lg mb-8">
          Private residential advisory for considered homes across India.
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-12">
          <Link href="/properties" className="btn-primary">
            Explore the collection
          </Link>
        </div>

        {/* Bottom row: coordinate + scroll indicator */}
        <div className="flex items-end justify-between">
          <span className="label-micro text-paper/30">
            28.6139&deg; N, 77.2090&deg; E
          </span>
          <div className="flex flex-col items-center gap-2">
            <span className="label-micro text-paper/30">Scroll to discover</span>
            <svg
              width="16"
              height="24"
              viewBox="0 0 16 24"
              fill="none"
              className="animate-slow-pulse"
              aria-hidden="true"
            >
              <path
                d="M8 4L8 20M8 20L2 14M8 20L14 14"
                stroke="rgba(244,240,232,0.5)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 2 — The Collection (N°001) ─── */
function CollectionSection() {
  return (
    <section className="section-py" aria-label="Featured Properties">
      <div className="container-site">
        {/* Section header */}
        <Reveal className="mb-12 md:mb-16 lg:mb-24">
          <span className="section-number block mb-4">N&deg;001</span>
          <h2 className="display-section text-ink">Homes with a point of view.</h2>
          <p className="body-copy text-muted mt-6 max-w-xl">
            Each property in our collection has been visited, assessed, and selected. No noise, no pressure — just homes that match your life.
          </p>
        </Reveal>

        {/* Property stack */}
        <div className="flex flex-col">
          {featuredProperties.map((property, i) => (
            <PropertyRow key={property.id} property={property} index={i + 1} />
          ))}
        </div>

        {/* Full collection link */}
        <Reveal className="mt-12 md:mt-16">
          <Link
            href="/properties"
            className="label-interface text-ink hover:text-brass transition-colors duration-200 inline-flex items-center gap-2 group"
          >
            View the full collection
            <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Individual property row (alternating layout) ─── */
function PropertyRow({
  property,
  index,
}: {
  property: (typeof featuredProperties)[number];
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <Reveal
      className={`grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 py-10 md:py-14 border-t border-line`}
      translateY={40}
    >
      {/* Image */}
      <div
        className={`relative aspect-[4/3] lg:aspect-[3/2] overflow-hidden ${
          isEven ? 'lg:order-2' : 'lg:order-1'
        }`}
      >
        <Image
          src={property.heroImage}
          alt={property.title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>

      {/* Info panel */}
      <div
        className={`flex flex-col justify-center ${
          isEven ? 'lg:order-1' : 'lg:order-2'
        }`}
      >
        <span className="label-micro text-muted">#{String(index).padStart(3, '0')}</span>
        <h3 className="heading-property text-ink mt-3 mb-1">{property.title}</h3>
        <span className="label-micro text-muted mb-5">{property.city}</span>

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-6">
          <div>
            <span className="label-micro text-muted block mb-0.5">Price</span>
            <span className="font-mono text-sm text-ink font-medium">{property.price}</span>
          </div>
          <div>
            <span className="label-micro text-muted block mb-0.5">Type</span>
            <span className="body-copy text-ink text-sm">{property.type}</span>
          </div>
          <div>
            <span className="label-micro text-muted block mb-0.5">Bedrooms</span>
            <span className="body-copy text-ink text-sm">{property.bedrooms} Bed</span>
          </div>
          <div>
            <span className="label-micro text-muted block mb-0.5">Area</span>
            <span className="body-copy text-ink text-sm">{property.area}</span>
          </div>
        </div>

        <Link
          href={`/properties/${property.slug}`}
          className="label-interface text-brass hover:text-ink transition-colors duration-200 inline-flex items-center gap-2 group self-start"
        >
          View property
          <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </Reveal>
  );
}

/* ─── SECTION 3 — The Method (N°002) ─── */
function MethodSection() {
  const principles = [
    {
      num: '01',
      title: 'Curated buying',
      description:
        'We present only what fits. No noise, no pressure, just properties that match your life.',
    },
    {
      num: '02',
      title: 'Considered selling',
      description:
        'Strategic positioning and honest pricing, presented to the right audience.',
    },
    {
      num: '03',
      title: 'Private advisory',
      description:
        'Discreet, one-to-one guidance from first conversation to final handshake.',
    },
  ];

  return (
    <section className="bg-ink section-py" aria-label="Our Method">
      <div className="container-site">
        <Reveal className="mb-12 md:mb-16 lg:mb-20" translateY={30}>
          <span
            className="section-number block mb-4"
            style={{ color: 'rgba(244,240,232,0.4)' }}
          >
            N&deg;002
          </span>
          <h2 className="display-section text-paper">Less noise. Better decisions.</h2>
        </Reveal>

        <div className="flex flex-col gap-8 md:gap-10">
          {principles.map((p, i) => (
            <Reveal key={p.num} delay={i * 120} translateY={24}>
              <div className="flex items-baseline gap-4 md:gap-6">
                <span className="label-micro text-brass text-sm md:text-base font-bold tracking-wider shrink-0">
                  {p.num}
                </span>
                <h3 className="heading-property text-paper">{p.title}</h3>
              </div>
              <p className="body-copy-light opacity-50 mt-2 ml-0 md:ml-[calc(1ch+1.5rem+1.5rem)]">
                {p.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 4 — Places (N°003) ─── */
function PlacesSection() {
  return (
    <section className="section-py" aria-label="Places">
      <div className="container-site mb-12 md:mb-16 lg:mb-20">
        <Reveal>
          <span className="section-number block mb-4">N&deg;003</span>
          <h2 className="display-section text-ink">A life, placed well.</h2>
        </Reveal>
      </div>

      {/* Mobile: vertical stack / Desktop: horizontal scroll */}
      <div className="lg:overflow-x-auto lg:overflow-y-hidden">
        <div className="flex flex-col lg:flex-row">
          {neighborhoods.map((n, i) => {
            const count = propertyCounts[n.name] ?? 0;
            return (
              <Reveal
                key={n.slug}
                className="relative min-h-[320px] md:min-h-[400px] lg:min-h-[70vh] lg:w-[420px] xl:w-[480px] shrink-0 overflow-hidden group"
                delay={i * 80}
                translateY={30}
              >
                <Image
                  src={n.image}
                  alt={`${n.name} residential landscape`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <span className="label-micro text-paper/50 block mb-2">
                    {count} {count === 1 ? 'property' : 'properties'}
                  </span>
                  <h3 className="heading-property text-paper mb-2">{n.name}</h3>
                  <p className="body-copy-light opacity-70 text-sm mb-4 max-w-xs">
                    {n.tagline}
                  </p>
                  <Link
                    href={`/properties?city=${encodeURIComponent(n.name)}`}
                    className="btn-ghost !text-paper/70 hover:!text-brass"
                  >
                    Explore
                    <ArrowIcon />
                  </Link>
                </div>

                {/* Desktop divider */}
                {i < neighborhoods.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-8 bottom-8 -right-px w-px bg-line"
                    aria-hidden="true"
                  />
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 5 — For Sellers (N°004) ─── */
function SellersSection() {
  const sellerSteps = [
    {
      number: '01',
      title: 'Market positioning',
      description:
        "We analyse comparable sales, current demand, and your home's unique qualities to arrive at a price that is honest, not inflated.",
    },
    {
      number: '02',
      title: 'Professional presentation',
      description:
        'Your property is photographed, written about, and presented with the same editorial standard as the rest of our collection.',
    },
    {
      number: '03',
      title: 'Qualified introductions',
      description:
        'Every enquiry is vetted before it reaches you. No open houses, no casual browsers — only serious, financially-verified buyers.',
    },
    {
      number: '04',
      title: 'Private viewings',
      description:
        'Viewings are scheduled at your convenience, with pre-qualified buyers, so the process respects your time and privacy.',
    },
  ];

  return (
    <section className="section-py" aria-label="For Sellers">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left: text content */}
          <div className="flex flex-col justify-between">
            <div>
              <Reveal className="mb-8 md:mb-12" translateY={30}>
                <span className="section-number block mb-4">N&deg;004</span>
                <h2 className="display-section text-ink">
                  Your home,
                  <br />
                  properly seen.
                </h2>
              </Reveal>

              <Reveal className="flex flex-col gap-6 md:gap-8 mb-10 md:mb-12" translateY={20}>
                {sellerSteps.map((step) => (
                  <div key={step.number} className="flex gap-4 items-start">
                    <span className="label-micro text-brass font-bold text-sm mt-0.5 shrink-0">
                      {step.number}
                    </span>
                    <div>
                      <h4 className="font-semibold text-ink text-sm mb-1">
                        {step.title}
                      </h4>
                      <p className="body-copy-muted text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </Reveal>
            </div>

            <Reveal translateY={20}>
              <Link href="/sell#valuation-form" className="btn-outline-dark">
                Request a valuation
              </Link>
            </Reveal>
          </div>

          {/* Right: image */}
          <div className="relative aspect-[3/4] lg:aspect-auto lg:h-full overflow-hidden">
            <Image
              src="/images/sell-hero.jpg"
              alt="Elegant home interior with natural light and refined furnishings"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 6 — Our Standard (N°005) ─── */
function StandardSection() {
  const standards = [
    {
      num: '01',
      title: 'Transparency',
      description:
        "We tell you what a property is, what it isn't, and what it could be. There is no hidden agenda in our recommendations — just honest assessment based on visits, not listings.",
    },
    {
      num: '02',
      title: 'Selectivity',
      description:
        "We work with a small number of clients at any given time. This isn't about volume; it's about giving every engagement the attention and rigour it deserves.",
    },
    {
      num: '03',
      title: 'Privacy',
      description:
        "Your search, your finances, and your decisions stay between us. We don't share client information, and we don't advertise sold prices. Discretion is not a feature — it's a condition.",
    },
  ];

  return (
    <section className="bg-paper-deep section-py" aria-label="Our Standards">
      <div className="container-site">
        <Reveal className="mb-12 md:mb-16 lg:mb-20" translateY={30}>
          <span className="section-number block mb-4" style={{ color: 'rgba(24,19,16,0.3)' }}>
            N&deg;005
          </span>
          <h2 className="display-section text-ink">
            Personal attention.
            <br />
            No theatre.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-16">
          {standards.map((s, i) => (
            <Reveal key={s.num} delay={i * 120} translateY={24}>
              <span className="label-micro text-ink/50 text-sm font-bold tracking-wider block mb-3">
                {s.num}
              </span>
              <h3 className="heading-property text-ink mb-3">{s.title}</h3>
              <p className="body-copy text-ink/70">{s.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SECTION 7 — Final CTA (N°006) ─── */
function FinalCTASection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-ink overflow-hidden"
      aria-label="Get in Touch"
    >
      <Reveal className="container-site text-center" translateY={40}>
        <span
          className="section-number block mb-6"
          style={{ color: 'rgba(244,240,232,0.3)' }}
        >
          N&deg;006
        </span>
        <h2 className="display-hero text-paper">
          Let&apos;s find{' '}
          <em className="text-brass italic">the one.</em>
        </h2>
        <p className="body-copy-light opacity-50 mt-6 max-w-md mx-auto mb-10">
          Start a private conversation about your next home.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact" className="btn-primary">
            Book a private consultation
          </Link>
          <Link href="/properties" className="btn-outline">
            Browse properties
          </Link>
        </div>
      </Reveal>
    </section>
  );
}