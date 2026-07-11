import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/shared/Container';
import { Reveal } from '@/components/shared/Reveal';

export function FinalCTA() {
  return (
    <section className="bg-cobalt py-24 text-offwhite lg:py-36" aria-label="Get started">
      <Container variant="main">
        <Reveal>
          <div className="grid gap-10 border-t border-offwhite/35 pt-4 lg:grid-cols-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-citrus lg:col-span-3">N° 007 / Begin here</p>
            <div className="lg:col-span-9">
              <h2 className="font-display text-[clamp(3.5rem,8.5vw,9rem)] leading-[0.86] tracking-[-0.06em] text-offwhite mb-8">
                Let&apos;s find<br /><span className="italic text-citrus">the one.</span>
            </h2>
              <div className="flex flex-col items-start justify-between gap-8 border-t border-offwhite/30 pt-6 sm:flex-row sm:items-end">
                <p className="max-w-md text-offwhite/65 body-text">
                  Tell us what matters to you. We&apos;ll bring perspective, a carefully edited shortlist, and complete discretion.
                </p>
                <Link
                  href="/contact"
                  className="group flex items-center gap-8 rounded-full bg-citrus px-6 py-4 font-mono text-[10px] uppercase tracking-[0.16em] text-espresso transition-transform hover:-translate-y-1"
                >
                  Book a private consultation <ArrowUpRight size={17} className="transition-transform group-hover:rotate-45" />
                </Link>
              </div>
              <Link
                href="/properties"
                className="mt-8 inline-block border-b border-offwhite/40 pb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-offwhite/65 hover:text-citrus transition-colors"
              >
                Browse at your own pace
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
