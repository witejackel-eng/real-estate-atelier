import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/shared/Container';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { Reveal } from '@/components/shared/Reveal';
import { getAllNeighborhoods } from '@/data/neighborhoods';
import { ArrowUpRight } from 'lucide-react';

export function SelectedLocations() {
  const neighborhoods = getAllNeighborhoods().slice(0, 4);

  return (
    <section className="bg-espresso py-24 text-offwhite lg:py-36" aria-label="Selected cities">
      <Container variant="main">
        <div className="mb-14 grid gap-8 border-t border-offwhite/30 pt-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <SectionLabel className="text-citrus">N° 004 / Where</SectionLabel>
          </Reveal>
          <Reveal className="lg:col-span-9">
            <h2 className="max-w-4xl font-display text-[clamp(3.25rem,7.2vw,7.5rem)] leading-[0.92] tracking-[-0.055em] text-offwhite">
              A life, placed well.
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {neighborhoods.map((neighborhood, i) => (
            <Reveal key={neighborhood.slug} delay={i * 0.08}>
              <Link
                href={`/properties?city=${encodeURIComponent(neighborhood.name)}`}
                className="group block relative aspect-[3/4] overflow-hidden"
              >
                <Image
                  src={neighborhood.image}
                  alt={neighborhood.name}
                  fill
                  className="object-cover grayscale-[55%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/10 to-transparent" />
                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 font-mono text-[10px] uppercase tracking-wider text-offwhite/70">
                  <span>0{i + 1}</span><ArrowUpRight size={15} className="transition-transform group-hover:rotate-45" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-display text-3xl tracking-[-0.03em] text-offwhite mb-2">
                    {neighborhood.name}
                  </h3>
                  <p className="text-sm text-offwhite/70">
                    {neighborhood.tagline}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <Link
            href="/neighborhoods"
            className="inline-flex items-center gap-2 border-b border-citrus pb-1 font-mono text-[10px] uppercase tracking-[0.15em] text-citrus hover:text-offwhite transition-colors mt-10"
          >
            View all locations <ArrowUpRight size={14} />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
