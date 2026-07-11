'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/shared/Reveal';

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-espresso text-offwhite" aria-label="Casa Aurelia introduction">
      <Image
        src="/images/hero-main.jpg"
        alt="Contemporary villa set among tropical greenery in Siolim, Goa"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,17,15,.88)_0%,rgba(15,17,15,.34)_58%,rgba(15,17,15,.1)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,17,15,.28)_0%,transparent_38%,rgba(15,17,15,.58)_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1600px] flex-col px-5 pb-7 pt-24 sm:px-8 lg:px-12 lg:pb-10 lg:pt-28">
        <div className="flex items-start justify-between border-t border-offwhite/30 pt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-offwhite/70 sm:text-xs">
          <span>N° 001 / Private residential advisory</span>
          <span className="hidden sm:block">India · 18.5204° N, 73.8567° E</span>
        </div>

        <div className="my-auto max-w-6xl py-16">
          <Reveal direction="none">
            <p className="mb-6 max-w-md text-sm leading-relaxed text-offwhite/72 sm:text-base">
              Thoughtful homes, quietly found. A private property studio for buyers and sellers who value design, clarity, and discretion.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display text-[clamp(4rem,12vw,11.5rem)] font-medium leading-[0.78] tracking-[-0.065em] text-offwhite">
              Live<br />
              <span className="ml-[12vw] italic text-citrus">remarkably.</span>
            </h1>
          </Reveal>
        </div>

        <div className="grid items-end gap-6 border-t border-offwhite/30 pt-5 sm:grid-cols-2 lg:grid-cols-3">
          <p className="max-w-sm text-sm leading-relaxed text-offwhite/62">
            Curated residences across India, selected for architecture, setting, and the life they make possible.
          </p>
          <Link
            href="/properties"
            className="group flex items-center justify-between rounded-full bg-citrus px-5 py-3.5 font-mono text-xs uppercase tracking-[0.14em] text-espresso transition-transform hover:-translate-y-0.5 sm:max-w-xs lg:justify-self-center"
          >
            Explore the collection
            <ArrowUpRight size={17} className="transition-transform group-hover:rotate-45" aria-hidden />
          </Link>
          <div className="hidden items-center justify-end gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-offwhite/60 lg:flex">
            Scroll to discover <ArrowDownRight size={16} aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
