'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Unified PageHero
 *
 * Every interior page (Sell, Contact, About, Neighborhoods, Properties, etc.)
 * shares this hero so the layout feels intentional and balanced across the site.
 *
 * Structure:
 *   ┌──────────────────────────────────────────┐
 *   │  pt-32 / pt-40 / pt-48  (clears header)  │
 *   │                                          │
 *   │  SECTION LABEL  (mono micro)             │
 *   │  DISPLAY TITLE  (display-page)           │
 *   │  Sub copy  (body-copy, max-w-xl)         │
 *   │  [optional children — CTAs, meta row]    │
 *   │                                          │
 *   │  pb-16 / pb-24 / pb-32                   │
 *   └──────────────────────────────────────────┘
 */
interface PageHeroProps {
  label?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  /** Tone controls the text color of label/title/subtitle. */
  tone?: 'dark' | 'light';
  className?: string;
  /** Optional max width for the title block. Defaults to wide editorial. */
  containerWidth?: 'editorial' | 'site' | 'form';
}

export function PageHero({
  label,
  title,
  subtitle,
  children,
  tone = 'dark',
  className = '',
  containerWidth = 'editorial',
}: PageHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const containerClass =
    containerWidth === 'site'
      ? 'container-site'
      : containerWidth === 'form'
        ? 'container-form'
        : 'container-editorial';

  const titleColor = tone === 'light' ? 'text-ivory' : 'text-espresso';
  const labelColor = tone === 'light' ? 'text-ivory/50' : 'text-warm-grey';
  const subtitleColor = tone === 'light' ? 'text-ivory/70' : 'text-warm-grey';

  // Before mount: render plain (matches server HTML, avoids hydration mismatch)
  if (!mounted) {
    return (
      <section
        ref={ref}
        className={`pt-32 md:pt-40 lg:pt-48 pb-16 md:pb-24 lg:pb-32 ${className}`}
        aria-label="Page introduction"
      >
        <div className={containerClass}>
          {label && (
            <span className={`section-number block mb-5 ${labelColor}`}>
              {label}
            </span>
          )}
          <h1 className={`display-page ${titleColor}`}>{title}</h1>
          {subtitle && (
            <p className={`body-copy mt-6 max-w-xl ${subtitleColor}`}>
              {subtitle}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </section>
    );
  }

  const hidden = !inView;
  const baseTransition =
    'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)';

  return (
    <section
      ref={ref}
      className={`pt-32 md:pt-40 lg:pt-48 pb-16 md:pb-24 lg:pb-32 ${className}`}
      aria-label="Page introduction"
    >
      <div className={containerClass}>
        {label && (
          <span
            className={`section-number block mb-5 ${labelColor}`}
            style={{
              opacity: hidden ? 0 : 1,
              transform: hidden ? 'translateY(12px)' : 'translateY(0)',
              transition: baseTransition,
            }}
          >
            {label}
          </span>
        )}
        <h1
          className={`display-page ${titleColor}`}
          style={{
            opacity: hidden ? 0 : 1,
            transform: hidden ? 'translateY(16px)' : 'translateY(0)',
            transition: `${baseTransition} 80ms`,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className={`body-copy mt-6 max-w-xl ${subtitleColor}`}
            style={{
              opacity: hidden ? 0 : 1,
              transform: hidden ? 'translateY(16px)' : 'translateY(0)',
              transition: `${baseTransition} 160ms`,
            }}
          >
            {subtitle}
          </p>
        )}
        {children && (
          <div
            className="mt-8"
            style={{
              opacity: hidden ? 0 : 1,
              transform: hidden ? 'translateY(16px)' : 'translateY(0)',
              transition: `${baseTransition} 240ms`,
            }}
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
