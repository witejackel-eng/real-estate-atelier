'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cities } from '@/data/properties';

/* ────────────────────────────────────────────
   Inline RevealDiv (IntersectionObserver)
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
   Data
   ──────────────────────────────────────────── */
const whatWeDo = [
  {
    title: 'Curate residential properties',
    description:
      'We visit, photograph, and evaluate every property before it appears on our platform. Selection is based on design quality, location, and lasting value — not volume.',
  },
  {
    title: 'Help owners sell thoughtfully',
    description:
      'We work with sellers to present their property accurately and attract qualified buyers. From pricing to photography to closing, the process is structured and transparent.',
  },
  {
    title: 'Provide private advice',
    description:
      'Whether you are buying your first premium property or navigating a complex sale, we offer guidance tailored to your situation — not a generic script.',
  },
];

const selectionSteps = [
  {
    number: '01',
    label: 'Visit',
    description:
      'We walk through the property ourselves. No relying on third-party photos or descriptions.',
  },
  {
    number: '02',
    label: 'Assess',
    description:
      'Design quality, location merit, and structural integrity are evaluated against clear criteria.',
  },
  {
    number: '03',
    label: 'Verify',
    description:
      'Legal status, documentation, and ownership are checked before we proceed.',
  },
  {
    number: '04',
    label: 'Present',
    description:
      'Professional photography and honest copywriting — no inflated claims.',
  },
  {
    number: '05',
    label: 'Introduce',
    description:
      'The property is presented to buyers who match its profile. Quietly, deliberately.',
  },
];

/* ────────────────────────────────────────────
   Component
   ──────────────────────────────────────────── */
export function AboutClient() {
  return (
    <>
      {/* ── Hero ─────────────────────────────── */}
      <section className="py-20 md:py-28 lg:py-36">
        <div className="container-editorial">
          <RevealDiv>
            <span className="section-number">N°004</span>
          </RevealDiv>
          <RevealDiv delay={0.08}>
            <h1 className="display-page text-espresso mt-4 mb-8">
              A deliberate real-estate practice.
            </h1>
          </RevealDiv>
          <RevealDiv delay={0.16}>
            <p className="body-copy text-warm-grey max-w-xl">
              Casa Aurelia is not a brokerage operating at scale. We are a small, intentional
              practice that works with a limited number of clients and properties at any given
              time.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* ── Full-width Image ──────────────────── */}
      <section className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
        <div className="absolute inset-0 md:pl-[12vw]">
          <Image
            src="/images/about-studio.jpg"
            alt="A bright, thoughtfully arranged interior space with natural materials and clean lines"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </section>

      {/* ── Philosophy ───────────────────────── */}
      <section className="py-20 md:py-28 lg:py-36">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <RevealDiv>
                <span className="section-number">Philosophy</span>
              </RevealDiv>
              <RevealDiv delay={0.08}>
                <p className="display-section text-espresso mt-6 leading-[1.05]">
                  Fewer listings. More attention. Clear advice. Straightforward communication.
                </p>
              </RevealDiv>
            </div>
            <div className="lg:col-span-5">
              <RevealDiv delay={0.16}>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src="/images/about-studio.jpg"
                    alt="Interior detail showing natural materials and considered design"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
              </RevealDiv>
            </div>
          </div>
        </div>
      </section>

      <hr className="editorial-rule mx-auto max-w-[1600px]" />

      {/* ── What We Do (Scroll-Triggered List) ── */}
      <section className="py-20 md:py-28 lg:py-36">
        <div className="container-editorial">
          <RevealDiv>
            <span className="section-number">What We Do</span>
          </RevealDiv>
          <RevealDiv delay={0.08}>
            <h2 className="display-section text-espresso mt-4 mb-12">
              Three things, done carefully.
            </h2>
          </RevealDiv>
          <ScrollList items={whatWeDo} />
        </div>
      </section>

      <hr className="editorial-rule mx-auto max-w-[1600px]" />

      {/* ── Selection Process (Vertical Timeline) ── */}
      <section className="py-20 md:py-28 lg:py-36">
        <div className="container-editorial">
          <RevealDiv>
            <span className="section-number">Selection</span>
          </RevealDiv>
          <RevealDiv delay={0.08}>
            <h2 className="heading-property text-espresso mt-4 mb-12">
              How properties make it onto the platform
            </h2>
          </RevealDiv>
          <RevealDiv delay={0.16}>
            <p className="body-copy text-warm-grey mb-16">
              Every listing begins with a visit. Properties that don&apos;t meet our standards
              simply don&apos;t get listed.
            </p>
          </RevealDiv>

          {/* Vertical timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[23px] md:left-[31px] top-0 bottom-0 w-px bg-espresso/10" aria-hidden="true" />

            <ol className="space-y-12 md:space-y-16">
              {selectionSteps.map((step, i) => (
                <RevealDiv key={step.number} delay={i * 0.06}>
                  <li className="relative pl-14 md:pl-20">
                    {/* Dot on the line */}
                    <div
                      className="absolute left-[18px] md:left-[26px] top-1.5 w-[11px] h-[11px] rounded-full border-2 border-espresso/30 bg-ivory"
                      aria-hidden="true"
                    />
                    <span className="label-micro text-warm-grey">{step.number}</span>
                    <h3 className="font-display text-xl md:text-2xl text-espresso mt-1 mb-2">
                      {step.label}
                    </h3>
                    <p className="body-copy text-warm-grey max-w-md">
                      {step.description}
                    </p>
                  </li>
                </RevealDiv>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Approach (Dark Section) ──────────── */}
      <section className="py-20 md:py-28 lg:py-36 bg-espresso">
        <div className="container-editorial">
          <RevealDiv>
            <span className="section-number text-warm-grey">Approach</span>
          </RevealDiv>
          <RevealDiv delay={0.08}>
            <p className="display-section text-ivory mt-6 leading-[1.05]">
              Direct. Transparent. Unhurried.
            </p>
          </RevealDiv>
          <RevealDiv delay={0.16}>
            <p className="body-copy-light mt-8 max-w-lg">
              There are no high-pressure tactics here. If a property isn&apos;t right for you,
              we&apos;ll say so. If we think your expectations need recalibrating,
              we&apos;ll have that conversation honestly. Our job is to help you make a good
              decision — not to close a deal at any cost.
            </p>
          </RevealDiv>
        </div>
      </section>

      <hr className="editorial-rule mx-auto max-w-[1600px]" />

      {/* ── Locations / Regions ──────────────── */}
      <section className="py-20 md:py-28 lg:py-36">
        <div className="container-site">
          <div className="container-editorial">
            <RevealDiv>
              <span className="section-number">Regions</span>
            </RevealDiv>
            <RevealDiv delay={0.08}>
              <h2 className="heading-property text-espresso mt-4 mb-12">
                Where we work
              </h2>
            </RevealDiv>
          </div>
          <RevealDiv delay={0.16}>
            <div className="flex flex-wrap gap-x-8 gap-y-3 md:gap-x-12 md:gap-y-4">
              {cities.map((city, i) => (
                <Link
                  key={city}
                  href={`/properties?city=${encodeURIComponent(city)}`}
                  className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-espresso/20 hover:text-espresso transition-colors duration-300 cursor-view"
                  style={{ transitionDelay: `${i * 30}ms` }}
                >
                  {city}
                </Link>
              ))}
            </div>
          </RevealDiv>
        </div>
      </section>

      <hr className="editorial-rule mx-auto max-w-[1600px]" />

      {/* ── Closing CTA ──────────────────────── */}
      <section className="py-20 md:py-28 lg:py-36">
        <div className="container-editorial">
          <RevealDiv>
            <h2 className="heading-property text-espresso mb-4">
              Want to talk?
            </h2>
          </RevealDiv>
          <RevealDiv delay={0.08}>
            <p className="body-copy text-warm-grey mb-8 max-w-md">
              We&apos;re always open to a good conversation — about a specific property,
              the market, or how we might be able to help.
            </p>
          </RevealDiv>
          <RevealDiv delay={0.16}>
            <Link href="/contact" className="btn-primary">
              Get in Touch
            </Link>
          </RevealDiv>
        </div>
      </section>
    </>
  );
}

/* ────────────────────────────────────────────
   Scroll-Triggered Interactive List
   ──────────────────────────────────────────── */
function ScrollList({ items }: { items: { title: string; description: string }[] }) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <ScrollListItem key={item.title} item={item} index={i} />
      ))}
    </div>
  );
}

function ScrollListItem({
  item,
  index,
}: {
  item: { title: string; description: string };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting);
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="py-6 border-b border-espresso/8 transition-all duration-500"
    >
      <div className="flex items-start gap-6">
        {/* Number */}
        <span
          className={`label-micro shrink-0 w-6 transition-colors duration-500 ${
            active ? 'text-cobalt' : 'text-espresso/20'
          }`}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="flex-1 min-w-0">
          {/* Line treatment */}
          <div
            className={`h-px transition-all duration-700 ease-out mb-4 ${
              active ? 'w-16 bg-cobalt' : 'w-0 bg-cobalt'
            }`}
            aria-hidden="true"
          />

          <h3 className="font-display text-lg md:text-xl text-espresso mb-2">
            {item.title}
          </h3>

          <p
            className={`body-copy text-warm-grey max-w-md transition-all duration-500 overflow-hidden ${
              active ? 'max-h-40 opacity-100 mt-0' : 'max-h-0 opacity-0 mt-0'
            }`}
            style={{
              transitionProperty: 'max-height, opacity',
              transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
              transitionDuration: '0.5s',
            }}
          >
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}