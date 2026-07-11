'use client';

import { useState, useEffect, useCallback } from 'react';
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
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Body scroll lock
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Escape to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  // Focus trap
  const menuRef = useCallback((node: HTMLDivElement | null) => {
    if (!node || !menuOpen) return;
    const focusable = node.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length > 0) focusable[0].focus();
  }, [menuOpen]);

  const isTransparent = isHome && !scrolled && !menuOpen;
  const pageLabel = pageLabels[pathname] || '';

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[150] transition-colors duration-300"
        style={{
          background: isTransparent ? 'transparent' : 'rgba(242, 238, 229, 0.92)',
          backdropFilter: isTransparent ? 'none' : 'blur(12px)',
          WebkitBackdropFilter: isTransparent ? 'none' : 'blur(12px)',
        }}
      >
        <div className="container-site flex items-center justify-between h-16 lg:h-20">
          {/* Left: Logo */}
          <Link
            href="/"
            className="font-display text-lg lg:text-xl tracking-tight cursor-view"
            style={{ color: isTransparent ? 'var(--color-ivory)' : 'var(--color-espresso)' }}
          >
            Casa Aurelia
          </Link>

          {/* Center: Page label (desktop) */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2">
            <span
              className="label-interface"
              style={{ color: isTransparent ? 'rgba(242,238,229,0.6)' : 'var(--color-warm-grey)' }}
            >
              {pageLabel}
            </span>
          </div>

          {/* Right: Desktop */}
          <div className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => setMenuOpen(true)}
              className="label-interface cursor-view"
              style={{ color: isTransparent ? 'var(--color-ivory)' : 'var(--color-espresso)' }}
              aria-label="Open menu"
            >
              Menu
            </button>
            <Link
              href="/sell"
              className="btn-primary text-[10px] px-4 py-2 cursor-view"
            >
              List Your Home
            </Link>
          </div>

          {/* Right: Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2 cursor-view"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            style={{ color: isTransparent ? 'var(--color-ivory)' : 'var(--color-espresso)' }}
          >
            <span className="block w-6 h-px bg-current" />
            <span className="block w-4 h-px bg-current ml-auto" />
          </button>
        </div>
      </header>

      {/* Full-screen menu */}
      <div
        ref={menuRef}
        className={`menu-backdrop ${menuOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        onKeyDown={(e) => {
          if (e.key === 'Escape') setMenuOpen(false);
          if (e.key === 'Tab') {
            const focusable = e.currentTarget.querySelectorAll<HTMLElement>(
              'a[href], button, [tabindex]:not([tabindex="-1"])'
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
          }
        }}
      >
        <div className="container-site h-full flex flex-col justify-between py-24 lg:py-32">
          {/* Close */}
          <button
            onClick={() => setMenuOpen(false)}
            className="self-end label-interface text-ivory/60 hover:text-ivory transition-colors cursor-view"
            aria-label="Close menu"
          >
            Close
          </button>

          {/* Navigation links */}
          <nav className="flex-1 flex flex-col justify-center">
            <ul className="space-y-0">
              {navItems.map((item, i) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      onMouseEnter={() => setHoveredItem(i)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className="group flex items-baseline gap-6 lg:gap-10 py-4 lg:py-6 cursor-view"
                    >
                      <span
                        className="label-micro transition-colors duration-300"
                        style={{
                          color: hoveredItem === i || isActive ? 'var(--color-chartreuse)' : 'rgba(242,238,229,0.3)',
                        }}
                      >
                        {item.num}
                      </span>
                      <span
                        className="font-display text-4xl lg:text-7xl transition-colors duration-300"
                        style={{
                          color: hoveredItem === i || isActive ? 'var(--color-ivory)' : 'rgba(242,238,229,0.5)',
                        }}
                      >
                        {item.label}
                      </span>
                      {isActive && (
                        <span
                          className="hidden lg:block w-2 h-2 rounded-full bg-chartreuse ml-4"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Bottom info */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pt-8 border-t border-ivory/10">
            <Link
              href="/sell"
              onClick={() => setMenuOpen(false)}
              className="btn-primary w-fit cursor-view"
            >
              List Your Home
            </Link>
            <div className="label-micro text-ivory/30">
              <p>Private residential advisory</p>
              <p className="mt-1">Across India</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}