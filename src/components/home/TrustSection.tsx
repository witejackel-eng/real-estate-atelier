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
    <section className="overflow-hidden bg-citrus py-24 text-espresso lg:py-32" aria-label="Our commitment">
      <div className="mb-20 flex w-max animate-marquee whitespace-nowrap border-y border-espresso/20 py-3 font-mono text-xs uppercase tracking-[0.2em]" aria-hidden="true">
        <span className="px-6">Private viewings · Independent advice · Verified details · Clear negotiations · Private viewings · Independent advice · Verified details · Clear negotiations · </span>
        <span className="px-6">Private viewings · Independent advice · Verified details · Clear negotiations · Private viewings · Independent advice · Verified details · Clear negotiations · </span>
      </div>
      <Container variant="main">
        <div>
          <Reveal>
            <div className="grid gap-8 border-t border-espresso/30 pt-4 lg:grid-cols-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] lg:col-span-3">N° 006 / Our standard</p>
              <h2 className="font-display text-[clamp(3.25rem,7.2vw,7.5rem)] leading-[0.9] tracking-[-0.055em] lg:col-span-9">
                Personal attention.<br />No theatre.
              </h2>
            </div>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 border-b border-espresso/25 md:grid-cols-3">
            {principles.map((principle, i) => (
              <Reveal key={principle.heading} delay={i * 0.1}>
                <article className="h-full border-t border-espresso/25 py-7 md:border-l md:px-7 first:md:border-l-0 first:md:pl-0">
                  <span className="mb-12 block font-mono text-[10px]">0{i + 1}</span>
                  <h3 className="font-display text-2xl tracking-[-0.03em] mb-3">
                    {principle.heading}
                  </h3>
                  <p className="text-sm text-espresso/65 leading-relaxed">
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
