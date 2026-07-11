'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedProperties, getAllProperties, cities } from '@/data/properties';
import { neighborhoods } from '@/data/neighborhoods';

/* ─── Self-contained Reveal Wrapper (avoids React 19 ref-during-render lint) ─── */
interface RevealDivProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  translateY?: number;
  as?: 'div' | 'section' | 'article' | 'span';
}

function RevealDiv({
  children,
  className,
  style,
  delay = 0,
  translateY = 30,
  as: Tag = 'div',
}: RevealDivProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!mounted) {
    return (
      <Tag ref={ref} className={className} style={style}>
        {children}
      </Tag>
    );
  }

  const hidden = !inView;
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: hidden ? 0 : 1,
        transform: hidden ? `translateY(${translateY}px)` : 'translateY(0)',
        transition: `opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

/* ─── Data ─── */
const featuredProperties = getFeaturedProperties().slice(0, 3);
const allProperties = getAllProperties();
const propertyCounts = cities.reduce<Record<string, number>>((acc, city) => {
  acc[city] = allProperties.filter((p) => p.city === city).length;
  return acc;
}, {});

/* ─── Arrow Icon ─── */
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

/* ─── Small Arrow ─── */
function SmallArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
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

/* ─── Scroll Chevron ─── */
function ScrollChevron() {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="label-micro text-ivory/50">Scroll to discover</span>
      <svg
        width="16"
        height="24"
        viewBox="0 0 16 24"
        fill="none"
        className="animate-bounce"
        aria-hidden="true"
      >
        <path
          d="M8 4L8 20M8 20L2 14M8 20L14 14"
          stroke="rgba(242,238,229,0.5)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/* ─── Property Index Label ─── */
function PropertyIndex({ index }: { index: number }) {
  return (
    <span className="label-micro text-warm-grey text-xs tracking-widest">
      #{String(index).padStart(3, '0')}
    </span>
  );
}

/* ─── Seller Step ─── */
function SellerStep({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex gap-4 items-start">
      <span className="label-micro text-cobalt font-bold text-sm mt-0.5 shrink-0">{number}</span>
      <div>
        <h4 className="font-body text-sm font-semibold text-espresso mb-1">{title}</h4>
        <p className="body-copy text-warm-grey text-sm !text-[14px] !leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   HOMEPAGE
   ═══════════════════════════════════════════ */
export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <hr className="editorial-rule" />
      <CollectionSection />
      <hr className="editorial-rule" />
      <MethodSection />
      <PlacesSection />
      <hr className="editorial-rule" />
      <SellersSection />
      <hr className="editorial-rule" />
      <StandardSection />
      <FinalCTASection />
    </main>
  );
}

/* ─── N°000 — Hero ─── */
function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-end overflow-hidden pt-20 lg:pt-24"
      aria-label="Hero"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-main.jpg"
          alt="Luxury residential interior with warm natural light"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(23,19,16,0.6) 0%, rgba(23,19,16,0.3) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container-site pb-12 md:pb-16 lg:pb-20">
        <div className="mb-6">
          <h1 className="display-hero text-ivory">
            Live{' '}
            <em className="text-chartreuse" style={{ fontStyle: 'italic' }}>
              remarkably.
            </em>
          </h1>
        </div>

        <p className="body-copy-light opacity-70 max-w-lg mb-8">
          Private residential advisory for considered homes across India.
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-12">
          <Link href="/properties" className="btn-primary">
            Explore the collection
          </Link>
        </div>

        {/* Bottom row: coordinate + scroll indicator */}
        <div className="flex items-end justify-between">
          <span className="label-micro text-ivory/30">
            28.6139° N, 77.2090° E
          </span>
          <ScrollChevron />
        </div>
      </div>
    </section>
  );
}

/* ─── N°001 — The Collection ─── */
function CollectionSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32" aria-label="Featured Properties">
      <div className="container-site">
        {/* Section header */}
        <RevealDiv className="mb-12 md:mb-16 lg:mb-24">
          <span className="section-number block mb-4">001</span>
          <h2 className="display-section text-espresso">Homes with a point of view.</h2>
          <p className="body-copy text-warm-grey mt-6 max-w-xl">
            Each property in our collection has been visited, assessed, and selected.
          </p>
        </RevealDiv>

        {/* Property stack */}
        <div className="flex flex-col">
          {featuredProperties.map((property, i) => (
            <PropertyRow key={property.id} property={property} index={i + 1} />
          ))}
        </div>

        {/* Full collection link */}
        <div className="mt-12 md:mt-16">
          <Link
            href="/properties"
            className="label-interface text-espresso hover:text-cobalt transition-colors duration-200 inline-flex items-center gap-2 group"
          >
            View the full collection
            <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
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
    <RevealDiv
      as="article"
      className={`grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 py-10 md:py-14 border-t border-espresso/[0.08]`}
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
        <PropertyIndex index={index} />
        <h3 className="heading-property text-espresso mt-3 mb-1">{property.title}</h3>
        <span className="label-micro text-warm-grey mb-5">{property.city}</span>

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-6">
          <div>
            <span className="label-micro text-warm-grey block mb-0.5">Price</span>
            <span className="font-body text-sm text-espresso font-medium">{property.price}</span>
          </div>
          <div>
            <span className="label-micro text-warm-grey block mb-0.5">Type</span>
            <span className="font-body text-sm text-espresso">{property.type}</span>
          </div>
          <div>
            <span className="label-micro text-warm-grey block mb-0.5">Bedrooms</span>
            <span className="font-body text-sm text-espresso">{property.bedrooms} Bed</span>
          </div>
          <div>
            <span className="label-micro text-warm-grey block mb-0.5">Area</span>
            <span className="font-body text-sm text-espresso">{property.area}</span>
          </div>
        </div>

        <Link
          href={`/properties/${property.slug}`}
          className="label-interface text-cobalt hover:text-espresso transition-colors duration-200 inline-flex items-center gap-2 group self-start"
        >
          View property
          <SmallArrowIcon className="transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </RevealDiv>
  );
}

/* ─── N°002 — The Method ─── */
function MethodSection() {
  const principles = [
    { num: '01', title: 'Curated buying', description: 'We present only what fits. No noise, no pressure, just properties that match your life.' },
    { num: '02', title: 'Considered selling', description: 'Strategic positioning and honest pricing, presented to the right audience.' },
    { num: '03', title: 'Private advisory', description: 'Discreet, one-to-one guidance from first conversation to final handshake.' },
  ];

  return (
    <section className="bg-cobalt py-16 md:py-24 lg:py-32" aria-label="Our Method">
      <div className="container-site">
        <RevealDiv className="mb-12 md:mb-16 lg:mb-20" translateY={30}>
          <span className="section-number block mb-4" style={{ color: 'rgba(242,238,229,0.4)' }}>
            002
          </span>
          <h2 className="display-section text-ivory">Less noise. Better decisions.</h2>
        </RevealDiv>

        <div className="flex flex-col gap-8 md:gap-10">
          {principles.map((p, i) => (
            <RevealDiv key={p.num} delay={i * 120} translateY={24}>
              <div className="flex items-baseline gap-4 md:gap-6">
                <span className="label-micro text-chartreuse text-sm md:text-base font-bold tracking-wider shrink-0">
                  {p.num}
                </span>
                <h3 className="heading-property text-ivory">{p.title}</h3>
              </div>
              <p className="body-copy-light opacity-60 mt-2 ml-0 md:ml-[calc(1ch+1.5rem+1.5rem)]">
                {p.description}
              </p>
            </RevealDiv>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── N°003 — Places ─── */
function PlacesSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32" aria-label="Places">
      <div className="container-site mb-12 md:mb-16 lg:mb-20">
        <RevealDiv>
          <span className="section-number block mb-4">003</span>
          <h2 className="display-section text-espresso">A life, placed well.</h2>
        </RevealDiv>
      </div>

      {/* Mobile: vertical stack / Desktop: horizontal scroll */}
      <div className="lg:overflow-x-auto lg:overflow-y-hidden">
        <div className="flex flex-col lg:flex-row">
          {neighborhoods.map((n, i) => {
            const count = propertyCounts[n.name] ?? 0;
            return <CityCard key={n.slug} neighborhood={n} count={count} index={i} />;
          })}
        </div>
      </div>
    </section>
  );
}

function CityCard({
  neighborhood,
  count,
  index,
}: {
  neighborhood: (typeof neighborhoods)[number];
  count: number;
  index: number;
}) {
  return (
    <RevealDiv
      className="relative min-h-[320px] md:min-h-[400px] lg:min-h-[70vh] lg:w-[420px] xl:w-[480px] shrink-0 overflow-hidden group"
      delay={index * 80}
      translateY={30}
    >
      <Image
        src={neighborhood.image}
        alt={`${neighborhood.name} residential landscape`}
        fill
        sizes="(max-width: 1024px) 100vw, 480px"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-espresso/20 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <span className="label-micro text-ivory/50 block mb-2">
          {count} {count === 1 ? 'property' : 'properties'}
        </span>
        <h3 className="heading-property text-ivory mb-2">{neighborhood.name}</h3>
        <p className="body-copy-light opacity-70 text-sm mb-4 max-w-xs">
          {neighborhood.tagline}
        </p>
        <Link
          href={`/properties?city=${encodeURIComponent(neighborhood.name)}`}
          className="label-interface text-ivory/80 hover:text-chartreuse transition-colors duration-200 inline-flex items-center gap-2 group/link"
        >
          Explore
          <SmallArrowIcon className="transition-transform duration-200 group-hover/link:translate-x-1" />
        </Link>
      </div>

      {/* Desktop divider */}
      {index < neighborhoods.length - 1 && (
        <div className="hidden lg:block absolute top-8 bottom-8 -right-px w-px bg-espresso/10" aria-hidden="true" />
      )}
    </RevealDiv>
  );
}

/* ─── N°004 — For Sellers ─── */
function SellersSection() {
  const sellerSteps = [
    {
      number: '01',
      title: 'Market positioning',
      description:
        'We analyse comparable sales, current demand, and your home\'s unique qualities to arrive at a price that is honest, not inflated.',
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
    <section className="py-16 md:py-24 lg:py-32" aria-label="For Sellers">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left: text content */}
          <div className="flex flex-col justify-between">
            <div>
              <RevealDiv className="mb-8 md:mb-12" translateY={30}>
                <span className="section-number block mb-4">004</span>
                <h2 className="display-section text-espresso">
                  Your home,
                  <br />
                  properly seen.
                </h2>
              </RevealDiv>

              <RevealDiv className="flex flex-col gap-6 md:gap-8 mb-10 md:mb-12" translateY={20}>
                {sellerSteps.map((step) => (
                  <SellerStep
                    key={step.number}
                    number={step.number}
                    title={step.title}
                    description={step.description}
                  />
                ))}
              </RevealDiv>
            </div>

            <RevealDiv translateY={20}>
              <Link href="/sell#valuation-form" className="btn-outline-dark">
                Request a valuation
              </Link>
            </RevealDiv>
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

/* ─── N°005 — Standard ─── */
function StandardSection() {
  const standards = [
    {
      num: '01',
      title: 'Transparency',
      description:
        'We tell you what a property is, what it isn\'t, and what it could be. There is no hidden agenda in our recommendations — just honest assessment based on visits, not listings.',
    },
    {
      num: '02',
      title: 'Selectivity',
      description:
        'We work with a small number of clients at any given time. This isn\'t about volume; it\'s about giving every engagement the attention and rigour it deserves.',
    },
    {
      num: '03',
      title: 'Privacy',
      description:
        'Your search, your finances, and your decisions stay between us. We don\'t share client information, and we don\'t advertise sold prices. Discretion is not a feature — it\'s a condition.',
    },
  ];

  return (
    <section className="bg-chartreuse py-16 md:py-24 lg:py-32" aria-label="Our Standards">
      <div className="container-site">
        <RevealDiv className="mb-12 md:mb-16 lg:mb-20" translateY={30}>
          <span className="section-number block mb-4" style={{ color: 'rgba(23,19,16,0.35)' }}>
            005
          </span>
          <h2 className="display-section text-espresso">
            Personal attention.
            <br />
            No theatre.
          </h2>
        </RevealDiv>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-16">
          {standards.map((s, i) => (
            <RevealDiv key={s.num} delay={i * 120} translateY={24}>
              <span className="label-micro text-espresso/50 text-sm font-bold tracking-wider block mb-3">
                {s.num}
              </span>
              <h3 className="heading-property text-espresso mb-3">{s.title}</h3>
              <p className="body-copy text-espresso/70 text-[15px] leading-relaxed">
                {s.description}
              </p>
            </RevealDiv>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── N°006 — Final CTA ─── */
function FinalCTASection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-cobalt overflow-hidden"
      aria-label="Get in Touch"
    >
      <RevealDiv className="container-site text-center" as="div" translateY={40}>
        <span className="section-number block mb-6" style={{ color: 'rgba(242,238,229,0.4)' }}>
          006
        </span>
        <h2 className="display-hero text-ivory">
          Let&apos;s find
          <br />
          <em className="text-chartreuse" style={{ fontStyle: 'italic' }}>
            the one.
          </em>
        </h2>
        <p className="body-copy-light opacity-60 mt-6 max-w-md mx-auto mb-10">
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
      </RevealDiv>
    </section>
  );
}