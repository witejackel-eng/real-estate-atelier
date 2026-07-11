'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

/* ────────────────────────────────────────────
   Inline RevealDiv
   ──────────────────────────────────────────── */
function RevealDiv({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: '-40px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(16px)',
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ────────────────────────────────────────────
   Component
   ──────────────────────────────────────────── */
export function NotFoundClient() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center pt-32 md:pt-40 lg:pt-48 pb-20 md:pb-28">
      <div className="container-editorial text-center">
        {/* Architectural visual element */}
        <RevealDiv>
          <div className="relative inline-block mb-10" aria-hidden="true">
            <div className="relative w-24 h-24 md:w-28 md:h-28">
              <div className="absolute inset-0 border border-espresso/8" />
              <div className="absolute inset-4 border border-espresso/8" />
              <div className="absolute inset-8 border border-espresso/8" />
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-5 h-px bg-warm-grey" />
              <div className="absolute top-0 left-0 w-px h-5 bg-warm-grey" />
              <div className="absolute bottom-0 right-0 w-5 h-px bg-warm-grey" />
              <div className="absolute bottom-0 right-0 w-px h-5 bg-warm-grey" />
            </div>
          </div>
        </RevealDiv>

        <RevealDiv delay={0.1}>
          <span className="section-number block mb-3 text-warm-grey">
            Error 404
          </span>
        </RevealDiv>

        <RevealDiv delay={0.15}>
          <h1 className="display-page text-espresso mb-5">
            This address is no longer on the <em className="text-gold not-italic">map.</em>
          </h1>
        </RevealDiv>

        <RevealDiv delay={0.25}>
          <p className="body-copy text-warm-grey mb-12 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist, may have moved,
            or was never part of the collection. Let&apos;s get you back to
            something useful.
          </p>
        </RevealDiv>

        <RevealDiv delay={0.35}>
          <nav
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
            aria-label="Navigation"
          >
            <Link href="/properties" className="btn-primary">
              Browse properties
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
            <Link href="/" className="btn-outline-dark">
              Back home
            </Link>
            <Link href="/contact" className="btn-ghost">
              Contact us
            </Link>
          </nav>
        </RevealDiv>
      </div>
    </section>
  );
}
