import { Container } from '@/components/shared/Container';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { Reveal } from '@/components/shared/Reveal';

const pillars = [
  {
    number: '01',
    heading: 'Curated Buying',
    description:
      'Every property in our collection is selected for its design, location, and long-term value. We visit, photograph, and evaluate each home before it appears on our platform.',
  },
  {
    number: '02',
    heading: 'Considered Selling',
    description:
      'We work with a small number of sellers at a time, ensuring each property receives professional photography, strategic pricing, and qualified buyer access.',
  },
  {
    number: '03',
    heading: 'Private Advisory',
    description:
      'Whether you are buying your first premium home or expanding a portfolio, we offer guidance tailored to your requirements, timeline, and budget.',
  },
];

export function ValueProposition() {
  return (
    <section className="bg-cobalt py-24 text-offwhite lg:py-36" aria-label="How we work">
      <Container variant="main">
        <div className="grid gap-8 border-t border-offwhite/35 pt-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <SectionLabel className="text-citrus">N° 003 / The method</SectionLabel>
          </Reveal>
          <Reveal className="lg:col-span-9">
            <h2 className="mb-16 max-w-5xl font-display text-[clamp(3.25rem,7.2vw,7.5rem)] leading-[0.92] tracking-[-0.055em] text-offwhite">
              Less noise.<br /><span className="italic text-citrus">Better decisions.</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.heading} delay={i * 0.1}>
              <article className="h-full border-t border-offwhite/30 py-6 lg:border-l lg:border-t-0 lg:px-7 lg:py-0 first:lg:border-l-0 first:lg:pl-0">
                <span className="font-mono text-xs tracking-[0.16em] text-citrus mb-14 block">
                  {pillar.number}
                </span>
                <h3 className="font-display text-3xl tracking-[-0.03em] mb-5 text-offwhite">{pillar.heading}</h3>
                <p className="body-text text-offwhite/68">
                  {pillar.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
