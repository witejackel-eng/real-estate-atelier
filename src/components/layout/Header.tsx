'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Properties', href: '/properties', num: '01' },
  { label: 'Sell', href: '/sell', num: '02' },
  { label: 'Neighbourhoods', href: '/neighborhoods', num: '03' },
  { label: 'About', href: '/about', num: '04' },
  { label: 'Contact', href: '/contact', num: '05' },
];

const pageLabels: Record<string, string> = {
  '/': 'Home',
  '/properties': 'Properties',
  '/sell': 'Sell',
  '/neighborhoods': 'Neighbourhoods',
  '/about': 'About',
  '/contact': 'Contact',
};

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHome = pathname === '/';

  /* ── Scroll detection ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Body scroll lock when menu is open ── */
  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [menuOpen]);

  /* ── Escape key closes menu ── */
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  /* ── Focus into menu when opened ── */
  useEffect(() => {
    if (!menuOpen || !menuRef.current) return;
    const focusable = menuRef.current.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length > 0) {
      requestAnimationFrame(() => focusable[0].focus());
    }
  }, [menuOpen]);

  /* ── Focus trap: Tab / Shift+Tab cycles within menu ── */
  const handleMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !menuRef.current) return;

    const focusable = Array.from(
      menuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      )
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  const isTransparent = isHome && !scrolled && !menuOpen;
  const pageLabel = pageLabels[pathname] || '';

  /* ── Text color based on transparent/opaque state ── */
  const textPrimary = isTransparent ? 'var(--color-white)' : 'var(--color-ink)';
  const textMuted = isTransparent ? 'rgba(244,240,232,0.6)' : 'var(--color-muted)';
  const textSubtle = isTransparent ? 'rgba(244,240,232,0.5)' : 'var(--color-muted)';

  return (
    <>
      {/* ═══ Fixed Header Bar ═══ */}
      <header
        className={`fixed top-0 left-0 right-0 transition-colors duration-300 ${
          isTransparent
            ? 'bg-transparent'
            : 'bg-paper/95 backdrop-blur-md'
        }`}
        style={{ zIndex: 150 }}
      >
        <div
          className="container-site flex items-center justify-between"
          style={{ height: 'var(--header-h)' }}
        >
          {/* ── Left: Logo ── */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="font-display text-lg lg:text-xl tracking-tight transition-colors duration-300"
              style={{ color: textPrimary }}
            >
              Casa Aurelia
            </Link>
            <span
              className="hidden lg:inline label-micro opacity-40 transition-colors duration-300"
              style={{ color: isTransparent ? 'var(--color-white)' : 'var(--color-muted)' }}
            >
              Atelier 01
            </span>
          </div>

          {/* ── Center: Page Label (lg+) ── */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2">
            <span
              className="label-interface transition-colors duration-300"
              style={{ color: textMuted }}
            >
              {pageLabel}
            </span>
          </div>

          {/* ── Right: Desktop Controls (lg+) ── */}
          <div className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => setMenuOpen(true)}
              className="label-interface transition-colors duration-300"
              style={{ color: textPrimary }}
              aria-label="Open menu"
            >
              Menu
            </button>
            <Link href="/sell" className="btn-outline-dark">
              List Your Home
            </Link>
          </div>

          {/* ── Right: Mobile Hamburger (<lg) ── */}
          <button
            className="lg:hidden flex flex-col justify-center items-end gap-[5px] w-10 h-10"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <span
              className="block w-7 h-px transition-colors duration-300"
              style={{ backgroundColor: textPrimary }}
            />
            <span
              className="block w-5 h-px transition-colors duration-300"
              style={{ backgroundColor: textPrimary }}
            />
          </button>
        </div>
      </header>

      {/* ═══ Full-Screen Menu Overlay ═══ */}
      <div
        ref={menuRef}
        className={`menu-backdrop ${menuOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        onKeyDown={handleMenuKeyDown}
      >
        <div className="container-site h-full flex flex-col justify-between py-12 lg:py-16">
          {/* ── Close Button ── */}
          <div className="flex justify-end">
            <button
              onClick={() => setMenuOpen(false)}
              className="label-interface text-white/50 hover:text-white transition-colors duration-300"
              aria-label="Close menu"
            >
              Close
            </button>
          </div>

          {/* ── Numbered Navigation ── */}
          <nav className="flex-1 flex flex-col justify-center" aria-label="Main navigation">
            <ul className="space-y-0" role="list">
              {navItems.map((item, i) => {
                const isActive = pathname === item.href;
                const isHovered = hoveredItem === i;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      onMouseEnter={() => setHoveredItem(i)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className="group flex items-baseline gap-4 sm:gap-6 lg:gap-10 py-3.5 sm:py-4 lg:py-6"
                    >
                      <span
                        className="label-micro shrink-0 transition-colors duration-300"
                        style={{
                          color: isHovered || isActive
                            ? 'var(--color-brass)'
                            : 'rgba(244,240,232,0.25)',
                        }}
                      >
                        {item.num}
                      </span>
                      <span
                        className="font-display text-3xl lg:text-6xl transition-colors duration-300"
                        style={{
                          color: isHovered || isActive
                            ? 'var(--color-white)'
                            : 'rgba(244,240,232,0.45)',
                        }}
                      >
                        {item.label}
                      </span>
                      {isActive && (
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 lg:mt-3"
                          style={{ backgroundColor: 'var(--color-brass)' }}
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* ── Bottom: CTA + Tagline ── */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pt-8 lg:pt-10">
            <Link
              href="/sell"
              onClick={() => setMenuOpen(false)}
              className="btn-primary w-fit"
            >
              List Your Home
            </Link>
            <p className="label-micro text-white/25">
              Private residential advisory&nbsp;&nbsp;/&nbsp;&nbsp;Across India
            </p>
          </div>
        </div>
      </div>
    </>
  );
}