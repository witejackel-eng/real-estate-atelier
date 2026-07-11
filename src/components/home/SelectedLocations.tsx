import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/shared/Container';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { Reveal } from '@/components/shared/Reveal';
import { getAllNeighborhoods } from '@/data/neighborhoods';

export function SelectedLocations() {
  const neighborhoods = getAllNeighborhoods().slice(0, 4);

  return (
    <section className="section-py bg-espresso text-offwhite" aria-label="Selected cities">
      <Container variant="main">
        <Reveal>
          <SectionLabel>Locations</SectionLabel>
          <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] text-offwhite mb-12">
            Selected Cities
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {neighborhoods.map((neighborhood, i) => (
            <Reveal key={neighborhood.slug} delay={i * 0.08}>
              <Link
                href={`/properties?city=${encodeURIComponent(neighborhood.name)}`}
                className="group block relative aspect-[3/4] overflow-hidden rounded-sm"
              >
                <Image
                  src={neighborhood.image}
                  alt={neighborhood.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-display text-xl text-offwhite mb-1">
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
            className="inline-flex items-center gap-2 text-sm text-gold hover:text-offwhite transition-colors mt-8"
          >
            View all locations
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}