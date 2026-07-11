'use client';

import Image from 'next/image';
import { Container } from '@/components/shared/Container';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { Button } from '@/components/shared/Button';
import { Reveal } from '@/components/shared/Reveal';
import { cities } from '@/data/properties';

export function AboutClient() {
  return (
    <>
      {/* ── Brand Statement ───────────────────── */}
      <section className="section-py" aria-label="About Casa Aurelia">
        <Container variant="editorial">
          <Reveal>
            <SectionLabel>About</SectionLabel>
            <h1 className="font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.1] text-espresso mt-4 mb-8 text-balance">
              A deliberate real estate practice
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="body-text text-espresso/70 mb-6">
              Casa Aurelia is not a brokerage operating at scale. We are a small, intentional
              practice that works with a limited number of clients and properties at any given
              time. The name itself — &ldquo;golden house&rdquo; — reflects the standard we
              hold: each home we represent should feel worth the attention it receives.
            </p>
            <p className="body-text text-espresso/70">
              We believe the process of finding or selling a home should be clear, unhurried,
              and respectful of the people involved. That means fewer listings, more care per
              property, and straightforward communication throughout.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── Image ─────────────────────────────── */}
      <section className="editorial-line" aria-label="Studio">
        <Container variant="editorial">
          <Reveal>
            <div className="relative aspect-[16/10] rounded-sm overflow-hidden my-10">
              <Image
                src="/images/about-studio.jpg"
                alt="A bright, thoughtfully arranged interior space with natural materials and clean lines"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 720px"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── What We Do ────────────────────────── */}
      <section className="section-py editorial-line" aria-label="What we do">
        <Container variant="editorial">
          <Reveal>
            <SectionLabel>What We Do</SectionLabel>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] mt-4 mb-6">
              Three things, done carefully
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-lg text-espresso mb-2">Curate residential properties</h3>
                <p className="body-text text-espresso/70">
                  We visit, photograph, and evaluate every property before it appears on our
                  platform. Selection is based on design quality, location, and lasting value
                  — not volume or velocity.
                </p>
              </div>
              <div>
                <h3 className="font-display text-lg text-espresso mb-2">Help owners sell thoughtfully</h3>
                <p className="body-text text-espresso/70">
                  We work with sellers to present their property accurately and attract
                  qualified buyers. From pricing to photography to closing, the process is
                  structured and transparent.
                </p>
              </div>
              <div>
                <h3 className="font-display text-lg text-espresso mb-2">Provide advisory</h3>
                <p className="body-text text-espresso/70">
                  Whether you are buying your first premium property or navigating a complex
                  sale, we offer guidance tailored to your situation — not a generic script.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── How Properties Are Selected ───────── */}
      <section className="section-py editorial-line" aria-label="Our selection process">
        <Container variant="editorial">
          <Reveal>
            <SectionLabel>Selection</SectionLabel>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] mt-4 mb-6">
              How properties make it onto the platform
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="body-text text-espresso/70 mb-6">
              Every listing begins with a visit. We walk through the property, photograph it
              ourselves, and assess it against clear criteria: Does the design hold up? Is the
              location genuinely desirable? Does it represent fair value for the asking price?
            </p>
            <p className="body-text text-espresso/70">
              Properties that don&apos;t meet these standards simply don&apos;t get listed. We
              would rather have a smaller, more trustworthy collection than a marketplace
              where anything goes.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── Buying & Selling Approach ─────────── */}
      <section className="section-py editorial-line" aria-label="Our approach">
        <Container variant="editorial">
          <Reveal>
            <SectionLabel>Approach</SectionLabel>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] mt-4 mb-6">
              Direct and transparent
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="body-text text-espresso/70 mb-6">
              There are no high-pressure tactics here. If a property isn&apos;t right for you,
              we&apos;ll say so. If we think your expectations need recalibrating, we&apos;ll
              have that conversation honestly. Our job is to help you make a good decision —
              not to close a deal at any cost.
            </p>
            <p className="body-text text-espresso/70">
              For buyers, that means property recommendations based on what you actually need,
              not what generates the highest commission. For sellers, it means pricing and
              presentation advice grounded in market reality.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── Service Regions ───────────────────── */}
      <section className="section-py editorial-line" aria-label="Where we operate">
        <Container variant="editorial">
          <Reveal>
            <SectionLabel>Regions</SectionLabel>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] mt-4 mb-6">
              Where we work
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="body-text text-espresso/70 mb-4">
              We currently operate across{' '}
              {cities.map((city, i) => (
                <span key={city}>
                  {i > 0 && (i === cities.length - 1 ? ' and ' : ', ')}
                  {city}
                </span>
              ))}
              . Each of these markets has distinct characteristics, and we approach them
              accordingly — with local knowledge and without a one-size-fits-all playbook.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── Contact CTA ───────────────────────── */}
      <section className="section-py" aria-label="Get in touch">
        <Container variant="editorial">
          <Reveal>
            <div className="border-t border-espresso/10 pt-10">
              <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] mb-4">
                Want to talk?
              </h2>
              <p className="body-text text-espresso/70 mb-8">
                We&apos;re always open to a good conversation — about a specific property,
                the market, or how we might be able to help.
              </p>
              <Button variant="primary" size="lg" href="/contact">
                Get in Touch
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}