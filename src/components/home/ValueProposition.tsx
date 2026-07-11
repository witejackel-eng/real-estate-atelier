import { Container } from '@/components/shared/Container';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { Button } from '@/components/shared/Button';
import { Reveal } from '@/components/shared/Reveal';

const pillars = [
  {
    number: '01',
    heading: 'Curated Buying',
    description:
      'Every property in our collection is selected for its design, location, and long-term value. We visit, photograph, and evaluate each home before it appears on our platform.',
    linkText: 'Browse properties',
    linkHref: '/properties',
  },
  {
    number: '02',
    heading: 'Considered Selling',
    description:
      'We work with a small number of sellers at a time, ensuring each property receives professional photography, strategic pricing, and qualified buyer access.',
    linkText: 'Sell with us',
    linkHref: '/sell',
  },
  {
    number: '03',
    heading: 'Private Advisory',
    description:
      'Whether you are buying your first premium home or expanding a portfolio, we offer guidance tailored to your requirements, timeline, and budget.',
    linkText: 'Get in touch',
    linkHref: '/contact',
  },
];

export function ValueProposition() {
  return (
    <section className="section-py editorial-line" aria-label="How we work">
      <Container variant="main">
        <Reveal>
          <SectionLabel>How We Work</SectionLabel>
          <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] mb-12">
            Three ways we help
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.heading} delay={i * 0.1}>
              <article>
                <span className="font-mono text-3xl text-gold/30 mb-4 block">
                  {pillar.number}
                </span>
                <h3 className="font-display text-xl mb-3">{pillar.heading}</h3>
                <p className="body-text text-espresso/70 mb-4">
                  {pillar.description}
                </p>
                <Button variant="ghost" size="sm" href={pillar.linkHref}>
                  {pillar.linkText}
                </Button>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}