import { Container } from '@/components/shared/Container';
import { Reveal } from '@/components/shared/Reveal';

const principles = [
  {
    heading: 'Transparency',
    description:
      'Every property listing includes accurate details, real photographs, and honest descriptions. What you see is what you get.',
  },
  {
    heading: 'Selectivity',
    description:
      'We work with fewer properties to give each one the attention it deserves — from initial evaluation to final handover.',
  },
  {
    heading: 'Privacy',
    description:
      'Your personal information and property interests are handled with discretion. We do not share data with third parties.',
  },
];

export function TrustSection() {
  return (
    <section className="section-py border-y border-espresso/8" aria-label="Our commitment">
      <Container variant="main">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] mb-10">
              Our Commitment
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {principles.map((principle, i) => (
              <Reveal key={principle.heading} delay={i * 0.1}>
                <article className="text-center">
                  <div className="w-12 h-px bg-gold mx-auto mb-4" aria-hidden />
                  <h3 className="font-display text-lg mb-2">
                    {principle.heading}
                  </h3>
                  <p className="text-sm text-espresso/60 leading-relaxed">
                    {principle.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}