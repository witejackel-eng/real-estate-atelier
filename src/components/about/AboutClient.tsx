'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cities } from '@/data/properties';
import { PageHero } from '@/components/shared/PageHero';
import { SectionHeader } from '@/components/shared/SectionHeader';

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
      <PageHero
        label="About"
        title={
          <>
            A deliberate real-estate <em className="text-gold not-italic">practice.</em>
          </>
        }
        subtitle="Casa Aurelia is not a brokerage operating at scale. We are a small, intentional practice that works with a limited number of clients and properties at any given time."
      />

      {/* ── Full-width Image ──────────────────── */}
      <section className="pb-20 md:pb-28 lg:pb-36">
        <div className="container-site">
          <RevealDiv>
            <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
              <Image
                src="/images/about-studio.jpg"
                alt="A bright, thoughtfully arranged interior space with natural materials and clean lines"
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* ── Philosophy ───────────────────────── */}
      <section className="pb-20 md:pb-28 lg:pb-36">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <SectionHeader
                label="Philosophy"
                title={
                  <>
                    Fewer listings.
                    <br />
                    More attention.
                    <br />
                    Clear advice.
                  </>
                }
                size="section"
                bottomSpacing="md"
              />
              <RevealDiv delay={0.1}>
                <p className="body-copy text-warm-grey max-w-lg">
                  We don&apos;t believe in listing everything that comes our way. Instead, we
                  choose a small number of properties we genuinely believe in, and give each
                  one the time and craft required to find the right buyer. The result is a
                  quieter, more honest process for everyone involved.
                </p>
              </RevealDiv>
            </div>
            <div className="lg:col-span-5">
              <RevealDiv delay={0.15}>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src="/images/hero-interior.jpg"
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

      <hr className="editorial-rule container-site" />

      {/* ── What We Do (Scroll-Triggered List) ── */}
      <section className="py-20 md:py-28 lg:py-36">
        <div className="container-site">
          <SectionHeader
            label="What We Do"
            title="Three things, done carefully."
            subtitle="We keep our focus narrow so each engagement gets the attention it deserves."
          />
          <div className="max-w-3xl mx-auto mt-12 md:mt-16">
            <ScrollList items={whatWeDo} />
          </div>
        </div>
      </section>

      <hr className="editorial-rule container-site" />

      {/* ── Selection Process (Vertical Timeline) ── */}
      <section className="py-20 md:py-28 lg:py-36">
        <div className="container-site">
          <SectionHeader
            label="Selection"
            title="How properties make it onto the platform"
            subtitle="Every listing begins with a visit. Properties that don't meet our standards simply don't get listed."
          />
          <div className="relative max-w-3xl mx-auto mt-12 md:mt-16">
            {/* Vertical line */}
            <div
              className="absolute left-[23px] md:left-[31px] top-2 bottom-2 w-px bg-espresso/10"
              aria-hidden="true"
            />

            <ol className="space-y-12 md:space-y-16">
              {selectionSteps.map((step, i) => (
                <RevealDiv key={step.number} delay={i * 0.06}>
                  <li className="relative pl-14 md:pl-20">
                    {/* Dot on the line */}
                    <div
                      className="absolute left-[18px] md:left-[26px] top-1.5 w-[11px] h-[11px] rounded-full border-2 border-espresso/30 bg-ivory"
                      aria-hidden="true"
                    />
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="label-micro text-warm-grey">{step.number}</span>
                      <span className="h-px w-6 bg-warm-grey/30" aria-hidden="true" />
                      <h3 className="heading-sub text-espresso">{step.label}</h3>
                    </div>
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
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeader
                label="Approach"
                title={
                  <>
                    Direct.
                    <br />
                    Transparent.
                    <br />
                    Unhurried.
                  </>
                }
                tone="light"
                size="section"
                bottomSpacing="none"
              />
            </div>
            <div className="lg:col-span-7 lg:pl-8">
              <RevealDiv delay={0.1}>
                <p className="body-copy-light opacity-70 max-w-xl">
                  There are no high-pressure tactics here. If a property isn&apos;t right for
                  you, we&apos;ll say so. If we think your expectations need recalibrating,
                  we&apos;ll have that conversation honestly. Our job is to help you make a
                  good decision — not to close a deal at any cost.
                </p>
              </RevealDiv>
              <RevealDiv delay={0.2}>
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="border-t border-ivory/10 pt-4">
                    <p className="label-micro text-gold mb-2">Engagement</p>
                    <p className="body-copy-light opacity-60 text-sm">
                      A limited number of clients at any time.
                    </p>
                  </div>
                  <div className="border-t border-ivory/10 pt-4">
                    <p className="label-micro text-gold mb-2">Communication</p>
                    <p className="body-copy-light opacity-60 text-sm">
                      Direct, honest, and on the record — always.
                    </p>
                  </div>
                  <div className="border-t border-ivory/10 pt-4">
                    <p className="label-micro text-gold mb-2">Privacy</p>
                    <p className="body-copy-light opacity-60 text-sm">
                      Your search and your details stay between us.
                    </p>
                  </div>
                  <div className="border-t border-ivory/10 pt-4">
                    <p className="label-micro text-gold mb-2">Outcome</p>
                    <p className="body-copy-light opacity-60 text-sm">
                      A decision you&apos;d make again, not one you regret.
                    </p>
                  </div>
                </div>
              </RevealDiv>
            </div>
          </div>
        </div>
      </section>

      {/* ── Locations / Regions ──────────────── */}
      <section className="py-20 md:py-28 lg:py-36">
        <div className="container-site">
          <SectionHeader
            label="Regions"
            title="Where we work"
            subtitle="Click any city to see what's currently in the collection."
          />
          <RevealDiv delay={0.1}>
            <div className="flex flex-wrap gap-x-8 gap-y-3 md:gap-x-12 md:gap-y-4 mt-10">
              {cities.map((city, i) => (
                <Link
                  key={city}
                  href={`/properties?city=${encodeURIComponent(city)}`}
                  className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-espresso/20 hover:text-espresso transition-colors duration-300"
                  style={{ transitionDelay: `${i * 30}ms` }}
                >
                  {city}
                </Link>
              ))}
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────── */}
      <section className="bg-paper py-16 md:py-20">
        <div className="container-site text-center">
          <RevealDiv>
            <h2 className="heading-property text-espresso mb-4">
              Want to talk?
            </h2>
          </RevealDiv>
          <RevealDiv delay={0.08}>
            <p className="body-copy text-warm-grey mb-8 max-w-md mx-auto">
              We&apos;re always open to a good conversation — about a specific property,
              the market, or how we might be able to help.
            </p>
          </RevealDiv>
          <RevealDiv delay={0.16}>
            <Link href="/contact" className="btn-primary">
              Get in Touch
              <ArrowRight size={14} aria-hidden="true" />
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
            active ? 'text-gold' : 'text-espresso/20'
          }`}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="flex-1 min-w-0">
          {/* Line treatment */}
          <div
            className={`h-px transition-all duration-700 ease-out mb-4 ${
              active ? 'w-16 bg-espresso' : 'w-0 bg-espresso'
            }`}
            aria-hidden="true"
          />

          <h3 className="heading-sub text-espresso mb-2">
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
