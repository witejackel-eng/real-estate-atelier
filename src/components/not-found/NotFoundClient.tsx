'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

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
    <section className="min-h-[80vh] flex items-center justify-center">
      <div className="container-editorial text-center py-20 md:py-32">
        {/* Architectural visual element */}
        <RevealDiv>
          <div className="relative inline-block mb-8" aria-hidden="true">
            {/* Grid lines */}
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              <div className="absolute inset-0 border border-espresso/6" />
              <div className="absolute inset-4 border border-espresso/6" />
              <div className="absolute inset-8 border border-espresso/6" />
              <div className="absolute inset-12 border border-espresso/6" />
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-6 h-px bg-warm-grey" />
              <div className="absolute top-0 left-0 w-px h-6 bg-warm-grey" />
              <div className="absolute bottom-0 right-0 w-6 h-px bg-warm-grey" />
              <div className="absolute bottom-0 right-0 w-px h-6 bg-warm-grey" />
            </div>
          </div>
        </RevealDiv>

        <RevealDiv delay={0.1}>
          <h1 className="display-hero text-warm-grey">
            404
          </h1>
        </RevealDiv>

        <RevealDiv delay={0.2}>
          <p className="body-copy text-warm-grey mt-6 mb-12 max-w-md mx-auto">
            This address is no longer on the map.
          </p>
        </RevealDiv>

        <RevealDiv delay={0.3}>
          <nav className="flex flex-col sm:flex-row items-center justify-center gap-4" aria-label="Navigation">
            <Link href="/properties" className="btn-primary">
              Properties
            </Link>
            <Link href="/" className="btn-outline-dark">
              Homepage
            </Link>
            <Link href="/contact" className="btn-outline-dark">
              Contact
            </Link>
          </nav>
        </RevealDiv>
      </div>
    </section>
  );
}