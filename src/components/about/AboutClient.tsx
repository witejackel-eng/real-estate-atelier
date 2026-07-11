'use client';

import Image from 'next/image';
import { Container } from '@/components/shared/Container';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { Reveal } from '@/components/shared/Reveal';
import { AnimatedText } from '@/components/shared/AnimatedText';
import { Button } from '@/components/shared/Button';

const team = [
  {
    name: 'Arjun Mehta',
    role: 'Founder & Lead Advisor',
    image: '/images/team-1.jpg',
    bio: 'With over 15 years in premium residential real estate, Arjun founded Casa Aurelia to build a practice rooted in honesty and preparation. He personally oversees every client relationship and visits every property before recommending it.',
  },
  {
    name: 'Priya Sharma',
    role: 'Property Curator',
    image: '/images/team-2.jpg',
    bio: 'Priya brings an architect\'s eye to property curation. She evaluates each home not just on specs, but on how it will feel to live in. Her background in design helps clients see potential that others miss.',
  },
  {
    name: 'Vikram Desai',
    role: 'Client Relations',
    image: '/images/team-3.jpg',
    bio: 'Vikram ensures that every client interaction at Casa Aurelia is thoughtful and unhurried. From initial consultation to post-sale support, he manages the client journey with care and attention to detail.',
  },
];

const values = [
  {
    title: 'Integrity',
    description: 'We tell you what you need to hear, not what you want to hear. Honest assessments, transparent pricing, and no pressure tactics.',
  },
  {
    title: 'Clarity',
    description: 'We provide complete information, clear comparisons, and structured guidance so you can make decisions with confidence.',
  },
  {
    title: 'Patience',
    description: 'We work at your pace. The right property is worth waiting for, and we never rush a decision to meet a quota.',
  },
  {
    title: 'Preparation',
    description: 'Every viewing is prepared, every property is personally visited, and every recommendation is backed by research and experience.',
  },
];

const processSteps = [
  {
    number: '01',
    title: 'Consultation',
    description: 'We start with a conversation about your life, not just your requirements. Understanding context helps us curate better.',
  },
  {
    number: '02',
    title: 'Curation',
    description: 'Based on our understanding, we prepare a shortlist of properties that genuinely match — not a scattergun list of possibilities.',
  },
  {
    number: '03',
    title: 'Viewing',
    description: 'We accompany you on viewings, point out details you might miss, and provide honest assessments after each visit.',
  },
  {
    number: '04',
    title: 'Decision',
    description: 'When you\'re ready, we support you through negotiation, documentation, and handover — at your pace.',
  },
];

export function AboutClient() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-offwhite py-24 sm:py-32 pt-28 sm:pt-36">
        <Container>
          <Reveal>
            <SectionLabel label="About" />
          </Reveal>
          <AnimatedText
            text="A studio that slows down the decision."
            as="h1"
            className="font-display text-4xl sm:text-5xl lg:text-6xl mt-3 tracking-tight leading-tight"
          />
          <Reveal delay={0.2}>
            <p className="font-body text-espresso/60 mt-4 max-w-xl text-base sm:text-lg leading-relaxed">
              We believe property decisions should feel informed, not rushed.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Brand Story */}
      <section className="py-16 sm:py-20 editorial-line">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <SectionLabel label="Our Story" />
              <h2 className="font-display text-3xl sm:text-4xl text-espresso mt-2 mb-8 tracking-tight">
                Why we exist
              </h2>
            </Reveal>
            <div className="space-y-6">
              <Reveal delay={0.05}>
                <p className="font-body text-base sm:text-lg text-espresso/70 leading-relaxed">
                  Casa Aurelia started from a simple observation: most people make property decisions under pressure, with incomplete information, and with someone else&apos;s urgency driving the timeline. We wanted to build a different kind of real estate practice — one where the client&apos;s clarity matters more than the commission timeline.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="font-body text-base sm:text-lg text-espresso/70 leading-relaxed">
                  We are a small, deliberate team. We visit every property before recommending it. We write honest descriptions. We price based on evidence, not aspiration. And we only work with a limited number of clients at a time, so each one gets our full attention.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="font-body text-base sm:text-lg text-espresso/70 leading-relaxed">
                  The name &quot;Aurelia&quot; comes from the Latin for golden — a reminder that the best decisions are made when time is taken to consider what truly matters. We don&apos;t aim to be the biggest. We aim to be the most thoughtful.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Philosophy */}
      <section className="py-16 sm:py-20 bg-offwhite editorial-line">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <SectionLabel label="Philosophy" />
              <blockquote className="font-display text-2xl sm:text-3xl lg:text-4xl text-espresso mt-4 tracking-tight leading-snug">
                We believe property decisions should feel informed, not rushed. Our role is to slow the process down enough for the right details to become visible.
              </blockquote>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="py-16 sm:py-20 editorial-line">
        <Container>
          <Reveal>
            <SectionLabel label="How We Work" />
            <h2 className="font-display text-3xl sm:text-4xl text-espresso mt-2 mb-12 tracking-tight">
              Our process
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <Reveal key={step.number} delay={index * 0.1}>
                <div className="relative">
                  <span className="font-mono text-xs text-gold">{step.number}</span>
                  <h3 className="font-display text-xl text-espresso mt-2 mb-3">{step.title}</h3>
                  <p className="font-body text-sm text-espresso/60 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="py-16 sm:py-20 bg-offwhite editorial-line">
        <Container>
          <Reveal>
            <SectionLabel label="Team" />
            <h2 className="font-display text-3xl sm:text-4xl text-espresso mt-2 mb-12 tracking-tight">
              The people behind the practice
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Reveal key={member.name} delay={index * 0.1}>
                <article className="text-center">
                  <div className="relative aspect-[3/4] overflow-hidden mb-5 mx-auto max-w-[260px]">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="260px"
                    />
                  </div>
                  <span className="font-mono text-xs text-gold/60 uppercase tracking-wider">Demo</span>
                  <h3 className="font-display text-xl text-espresso mt-1">{member.name}</h3>
                  <p className="font-mono text-xs text-espresso/50 mt-1">{member.role}</p>
                  <p className="font-body text-sm text-espresso/60 leading-relaxed mt-3">
                    {member.bio}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20 editorial-line">
        <Container>
          <Reveal>
            <SectionLabel label="Values" />
            <h2 className="font-display text-3xl sm:text-4xl text-espresso mt-2 mb-12 tracking-tight">
              What we stand for
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.08}>
                <div className="bg-offwhite border border-espresso/5 p-6 h-full">
                  <h3 className="font-display text-xl text-espresso mb-3">{value.title}</h3>
                  <p className="font-body text-sm text-espresso/60 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-espresso text-offwhite">
        <Container className="text-center">
          <Reveal>
            <SectionLabel label="Next Step" className="text-offwhite/50 [&_span]:text-offwhite/30" />
            <h2 className="font-display text-3xl sm:text-4xl text-offwhite mt-2 mb-4 tracking-tight">
              Talk to the team
            </h2>
            <p className="font-body text-offwhite/60 mb-8 max-w-md mx-auto">
              Schedule a no-obligation conversation about your property needs.
            </p>
            <Button href="/contact" variant="primary" size="lg">
              Get in Touch
            </Button>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}