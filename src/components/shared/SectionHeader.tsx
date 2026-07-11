'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * SectionHeader — consistent section opener used inside any page.
 *
 *   ──────────────────────────────────────
 *   SECTION LABEL (mono micro)
 *   Display heading (display-section / heading-property)
 *   Optional subcopy (body-copy, max-w-xl)
 *   ──────────────────────────────────────
 */
interface SectionHeaderProps {
  label?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  tone?: 'dark' | 'light';
  /** Size of the title. */
  size?: 'section' | 'property' | 'page';
  align?: 'left' | 'center';
  className?: string;
  /** Optional bottom spacing under the header before child content. */
  bottomSpacing?: 'sm' | 'md' | 'lg' | 'none';
}

const spacingMap = {
  none: '',
  sm: 'mb-8',
  md: 'mb-12 md:mb-16',
  lg: 'mb-16 md:mb-24',
};

export function SectionHeader({
  label,
  title,
  subtitle,
  tone = 'dark',
  size = 'section',
  align = 'left',
  className = '',
  bottomSpacing = 'lg',
}: SectionHeaderProps) {
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
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const titleColor = tone === 'light' ? 'text-ivory' : 'text-espresso';
  const labelColor = tone === 'light' ? 'text-ivory/40' : 'text-warm-grey';
  const subtitleColor = tone === 'light' ? 'text-ivory/60' : 'text-warm-grey';

  const titleClass =
    size === 'section'
      ? 'display-section'
      : size === 'page'
        ? 'display-page'
        : 'heading-property';

  const alignClass = align === 'center' ? 'text-center mx-auto' : '';
  const subtitleMaxWidth = align === 'center' ? 'max-w-md mx-auto' : 'max-w-xl';

  // Pre-mount plain render to avoid hydration mismatch
  if (!mounted) {
    return (
      <div ref={ref} className={`${spacingMap[bottomSpacing]} ${className}`}>
        {label && (
          <span className={`section-number block mb-4 ${labelColor} ${alignClass}`}>
            {label}
          </span>
        )}
        <h2 className={`${titleClass} ${titleColor} ${alignClass}`}>{title}</h2>
        {subtitle && (
          <p className={`body-copy mt-6 ${subtitleColor} ${subtitleMaxWidth} ${alignClass}`}>
            {subtitle}
          </p>
        )}
      </div>
    );
  }

  const hidden = !inView;
  const baseTransition =
    'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)';

  return (
    <div ref={ref} className={`${spacingMap[bottomSpacing]} ${className}`}>
      {label && (
        <span
          className={`section-number block mb-4 ${labelColor} ${alignClass}`}
          style={{
            opacity: hidden ? 0 : 1,
            transform: hidden ? 'translateY(10px)' : 'translateY(0)',
            transition: baseTransition,
          }}
        >
          {label}
        </span>
      )}
      <h2
        className={`${titleClass} ${titleColor} ${alignClass}`}
        style={{
          opacity: hidden ? 0 : 1,
          transform: hidden ? 'translateY(14px)' : 'translateY(0)',
          transition: `${baseTransition} 80ms`,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`body-copy mt-6 ${subtitleColor} ${subtitleMaxWidth} ${alignClass}`}
          style={{
            opacity: hidden ? 0 : 1,
            transform: hidden ? 'translateY(14px)' : 'translateY(0)',
            transition: `${baseTransition} 160ms`,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
