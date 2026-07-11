'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/shared/Reveal';
import { cities } from '@/data/properties';

/* ────────────────────────────────────────────
   Data
   ──────────────────────────────────────────── */
const whatWeDoItems = [
  {
    number: '01',
    title: 'Curate',
    description:
      'We visit, assess, and select properties that meet clear standards of quality, location, and value. Most properties we see do not make it onto this platform.',
  },
  {
    number: '02',
    title: 'Sell',
    description:
      'We present each property with honest photography, accurate descriptions, and realistic pricing. No exaggeration, no pressure, no artificial urgency.',
  },
  {
    number: '03',
    title: 'Advise',
    description:
      'We offer straightforward guidance based on market knowledge and your specific needs. If a property is not right for you, we will tell you.',
  },
];

const processSteps = [
  {
    number: '01',
    title: 'Visit',
    description:
      'Every property is visited in person. We assess condition, location, light, layout, and context before making any decision about representation.',
  },
  {
    number: '02',
    title: 'Assess',
    description:
      'We analyze the property against comparable sales, current market conditions, and our own standards for quality and value.',
  },
  {
    number: '03',
    title: 'Verify',
    description:
      'Title documents, approvals, encumbrances, and legal standing are checked thoroughly before any property is listed on our platform.',
  },
  {
    number: '04',
    title: 'Present',
    description:
      'Professional photography, measured floor plans, and factual descriptions. The presentation reflects the property as it actually is.',
  },
  {
    number: '05',
    title: 'Introduce',
    description:
      'We match properties with serious, qualified buyers and coordinate viewings, negotiations, and the transaction through to completion.',
  },
];

/* ────────────────────────────────────────────
   Scroll-Triggered List Item
   ──────────────────────────────────────────── */
function ScrollListItem({
  item,
  index,
  isActive,
}: {
  item: (typeof whatWeDoItems)[number];
  index: number;
  isActive: boolean;
}) {
  return (
    <div
      className="border-b border-ink/[0.06] py-8 md:py-10 transition-colors duration-500"
      style={{ transitionDelay: `${index * 0.05}s` }}
    >
      <div className="flex items-start gap-6 md:gap-10">
        <span
          className={`label-micro shrink-0 mt-1 transition-colors duration-500 ${
            isActive ? 'text-brass' : 'text-muted'
          }`}
        >
          {item.number}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="heading-sub text-ink">{item.title}</h3>
          <p
            className={`body-copy-muted mt-2 max-w-md transition-all duration-500 ${
              isActive
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-2'
            }`}
          >
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   About Client
   ──────────────────────────────────────────── */
export function AboutClient() {
  const listRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const idx = Number(entry.target.getAttribute('data-index'));
        if (!isNaN(idx)) setActiveIndex(idx);
      }
    }
  }, []);

  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLElement>('[data-index]');
    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      threshold: 0.6,
    });

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [handleIntersect]);

  return (
    <>
      {/* ── Hero ─────────────────────────────── */}
      <section className="section-py">
        <div className="container-editorial">
          <Reveal>
            <span className="section-number">N°004</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="display-page text-ink mt-4 mb-8">
              A deliberate real-estate practice.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="body-copy text-muted max-w-xl">
              We are a small, intentional practice. We carry fewer listings
              so that each one receives the attention it requires — careful
              assessment, honest presentation, and serious buyer matching.
            </p>
          </Reveal>
        </div>
      </section>

      <hr className="rule" />

      {/* ── Full-Width Image ─────────────────── */}
      <section className="h-[50vh] md:h-[60vh] lg:h-[70vh] relative overflow-hidden md:pl-[12vw]">
        <div className="absolute inset-0 md:right-0 md:top-0 md:bottom-0 md:left-0">
          <Image
            src="/images/about-studio.jpg"
            alt="Casa Aurelia studio workspace"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      </section>

      {/* ── Philosophy ───────────────────────── */}
      <section className="section-py">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Text column */}
            <div className="lg:col-span-7">
              <Reveal>
                <span className="section-number">Philosophy</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="display-section text-ink mt-4 mb-8">
                  Fewer listings.
                  <br />
                  More attention.
                  <br />
                  Clear advice.
                  <br />
                  Straightforward communication.
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="body-copy text-muted max-w-lg mb-6">
                  We believe that real estate at its best is a service built on
                  trust, not volume. When you work with us, you work with the
                  same people from the first conversation to the final handover.
                  There are no handoffs, no junior associates, no call centres.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p className="body-copy text-muted max-w-lg">
                  Our role is simple: to understand what you need, to present
                  properties that genuinely match those needs, and to provide
                  clear, honest guidance at every step. If something is not
                  right, we say so. If the market does not support your
                  expectations, we explain why.
                </p>
              </Reveal>
            </div>

            {/* Image column */}
            <div className="lg:col-span-5">
              <Reveal delay={200}>
                <div className="relative aspect-[4/5] overflow-hidden img-reveal">
                  <Image
                    src="/images/about-studio.jpg"
                    alt="Casa Aurelia studio detail"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <hr className="rule-soft max-w-[1440px] mx-auto" />

      {/* ── What We Do (Scroll-Triggered List) ─ */}
      <section className="section-py">
        <div className="container-editorial">
          <Reveal>
            <span className="section-number">What We Do</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display-section text-ink mt-4 mb-12">
              Three things, done carefully.
            </h2>
          </Reveal>

          <div ref={listRef}>
            {whatWeDoItems.map((item, i) => (
              <div key={item.number} data-index={i}>
                <Reveal delay={100 + i * 60}>
                  <ScrollListItem
                    item={item}
                    index={i}
                    isActive={activeIndex === i}
                  />
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="rule-soft max-w-[760px] mx-auto" />

      {/* ── Selection Process (Timeline) ──────── */}
      <section className="section-py">
        <div className="container-editorial">
          <Reveal>
            <span className="section-number">Process</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="heading-sub text-ink mt-4 mb-12">
              How we select a property
            </h2>
          </Reveal>

          {/* Vertical timeline */}
          <div className="relative">
            <div
              className="absolute left-[23px] md:left-[31px] top-0 bottom-0 w-px bg-ink/10"
              aria-hidden="true"
            />
            <ol className="space-y-12 md:space-y-14">
              {processSteps.map((step, i) => (
                <Reveal key={step.number} delay={100 + i * 60}>
                  <li className="relative pl-14 md:pl-20">
                    <div
                      className="absolute left-[18px] md:left-[26px] top-1.5 w-[11px] h-[11px] rounded-full border-2 border-brass/40 bg-paper"
                      aria-hidden="true"
                    />
                    <span className="label-micro text-muted">{step.number}</span>
                    <h3 className="font-display text-lg md:text-xl text-ink mt-1 mb-2">
                      {step.title}
                    </h3>
                    <p className="body-copy text-muted max-w-md">
                      {step.description}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <hr className="rule-soft max-w-[760px] mx-auto" />

      {/* ── Approach (Dark) ──────────────────── */}
      <section className="section-py bg-ink">
        <div className="container-editorial">
          <Reveal>
            <span className="section-number text-muted">Approach</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="display-section text-paper mt-4 mb-8">
              Direct. Transparent. Unhurried.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="body-copy-light opacity-60 max-w-lg mb-6">
              We do not chase volume. We do not create artificial urgency.
              Every interaction with Casa Aurelia is intended to be clear,
              respectful of your time, and focused on outcomes rather than
              activity.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="body-copy-light opacity-60 max-w-lg">
              Our clients are people who value substance over spectacle — who
              would rather have one honest conversation than ten glossy
              presentations. If that describes how you prefer to work, we
              should talk.
            </p>
          </Reveal>
        </div>
      </section>

      <hr className="rule-light max-w-[1440px] mx-auto bg-ink" />

      {/* ── Regions ──────────────────────────── */}
      <section className="section-py bg-ink">
        <div className="container-site">
          <Reveal>
            <h2 className="heading-sub text-paper mb-12">Where we work</h2>
          </Reveal>
          <div className="flex flex-wrap gap-x-4 gap-y-2 md:gap-x-6 md:gap-y-3">
            {cities.map((city, i) => (
              <Reveal key={city} delay={60 + i * 40}>
                <Link
                  href={`/properties?city=${encodeURIComponent(city)}`}
                  className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display text-white/20 hover:text-white transition-colors duration-300 leading-none"
                >
                  {city}
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────── */}
      <section className="section-py bg-ink">
        <div className="container-editorial">
          <Reveal>
            <h2 className="heading-sub text-paper mb-4">Want to talk?</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="body-copy-light opacity-60 mb-8 max-w-md">
              Whether you are buying, selling, or simply exploring — we are
              happy to have a conversation without pressure or commitment.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <Link href="/contact" className="btn-primary">
              Get in Touch
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}