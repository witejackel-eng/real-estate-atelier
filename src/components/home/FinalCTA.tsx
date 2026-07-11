import Link from 'next/link';
import { Container } from '@/components/shared/Container';
import { Reveal } from '@/components/shared/Reveal';

export function FinalCTA() {
  return (
    <section className="py-20 lg:py-28 bg-espresso text-offwhite" aria-label="Get started">
      <Container variant="editorial">
        <Reveal>
          <div className="text-center">
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] text-offwhite mb-4">
              Ready to Find Your Next Home?
            </h2>
            <p className="text-offwhite/60 body-text mb-8">
              Schedule a private consultation to discuss your requirements, or
              browse our collection at your own pace.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-gold text-espresso font-mono text-sm tracking-wider uppercase px-8 py-4 hover:bg-gold/90 transition-colors rounded-sm"
            >
              Book a Private Consultation
            </Link>
            <p className="text-sm text-offwhite/40 mt-4">
              or{' '}
              <Link
                href="/properties"
                className="text-gold hover:text-offwhite underline transition-colors"
              >
                browse all properties
              </Link>
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}