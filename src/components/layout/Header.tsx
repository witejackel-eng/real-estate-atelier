'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
// AnimatePresence replaced with CSS transitions for SSR safety
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Properties', href: '/properties' },
  { label: 'Sell', href: '/sell' },
  { label: 'Neighborhoods', href: '/neighborhoods' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isHome = pathname === '/';

  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuLinkRefs = useRef<(HTMLAnchorElement | HTMLButtonElement)[]>([]);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu
  const closeMobileMenu = useCallback(() => {
    setIsMobileOpen(false);
    setTimeout(() => hamburgerRef.current?.focus(), 0);
  }, []);

  const handleMobileNav = useCallback(
    (href: string) => {
      router.push(href);
      closeMobileMenu();
    },
    [router, closeMobileMenu]
  );

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isMobileOpen]);

  // Focus trap for mobile menu
  useEffect(() => {
    if (!isMobileOpen) return;

    const timer = setTimeout(() => {
      menuLinkRefs.current[0]?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMobileMenu();
        return;
      }

      if (e.key === 'Tab') {
        const focusable = menuLinkRefs.current.filter(
          (el) => el && !el.hasAttribute('disabled')
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileOpen, closeMobileMenu]);

  // Active link detection
  const isActive = useCallback(
    (href: string) => {
      if (href === '/') return pathname === '/';
      return pathname === href || pathname.startsWith(href + '/');
    },
    [pathname]
  );

  return (
    <>
      {/* Desktop / Mobile Header Bar */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled || !isHome
            ? 'bg-paper/92 text-espresso backdrop-blur-xl border-b border-espresso/10'
            : 'bg-transparent text-offwhite'
        )}
      >
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-[72px] lg:h-[84px]">
            {/* Brand */}
            <Link
              href="/"
              className="flex items-center gap-3 font-display text-lg tracking-[-0.02em]"
              aria-label="Casa Aurelia — Home"
            >
              <span>Casa Aurelia</span>
              <span className={cn('hidden rounded-full border px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider sm:inline', isScrolled || !isHome ? 'border-espresso/25' : 'border-offwhite/35')}>
                Atelier 01
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav
              role="navigation"
              aria-label="Main navigation"
              className="hidden lg:flex items-center gap-8"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'font-mono text-[10px] uppercase tracking-[0.14em] opacity-65 hover:opacity-100 transition-opacity',
                    isActive(link.href) &&
                      'opacity-100 underline decoration-1 underline-offset-4 decoration-current'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side: CTA + Hamburger */}
            <div className="flex items-center gap-3">
              <div className="hidden lg:block">
                <Button variant="primary" size="sm" href="/sell" className={cn('rounded-full', !isScrolled && isHome && 'bg-citrus text-espresso hover:bg-offwhite')}>
                  List your home <ArrowUpRight size={13} className="ml-2" />
                </Button>
              </div>

              <button
                ref={hamburgerRef}
                type="button"
                className="lg:hidden p-2 text-current"
                onClick={() => setIsMobileOpen(true)}
                aria-label="Open menu"
                aria-expanded={isMobileOpen}
                aria-controls="mobile-menu"
              >
                <Menu size={22} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileOpen && (
          <div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-0 z-[60] bg-cobalt text-offwhite [animation:slideIn_0.3s_cubic-bezier(0.22,1,0.36,1)_forwards]"
          >
            <div className="flex flex-col h-full max-w-[1360px] mx-auto px-5 sm:px-6 lg:px-16">
              {/* Top bar */}
              <div className="flex items-center justify-between h-[64px] lg:h-[72px]">
                <Link
                  href="/"
                  onClick={() => closeMobileMenu()}
                  className="font-display text-lg tracking-wide text-offwhite"
                  aria-label="Casa Aurelia — Home"
                >
                  Casa Aurelia
                </Link>
                <button
                  type="button"
                  className="p-2 text-offwhite"
                  onClick={closeMobileMenu}
                  aria-label="Close menu"
                  ref={(el) => {
                    if (el) menuLinkRefs.current[0] = el;
                  }}
                >
                  <X size={22} strokeWidth={1.5} />
                </button>
              </div>

              {/* Navigation links */}
              <nav aria-label="Mobile navigation">
                {navLinks.map((link, i) => (
                  <button
                    key={link.href}
                    type="button"
                    onClick={() => handleMobileNav(link.href)}
                    className={cn(
                      'w-full text-left font-display text-[clamp(2.5rem,9vw,4.5rem)] tracking-[-0.04em] py-3 border-b border-offwhite/20 text-offwhite transition-colors hover:text-citrus block',
                      isActive(link.href) &&
                        'underline decoration-2 underline-offset-4 underline-gold'
                    )}
                    ref={(el) => {
                      if (el) menuLinkRefs.current[i + 1] = el;
                    }}
                  >
                    {link.label}
                  </button>
                ))}
              </nav>

              {/* Bottom CTA */}
              <div className="mt-auto pb-8">
                <button
                  type="button"
                  onClick={() => handleMobileNav('/sell')}
                  className="w-full inline-flex items-center justify-center font-mono text-xs uppercase tracking-[0.15em] transition-colors duration-200 px-8 py-4 bg-citrus text-espresso hover:bg-offwhite focus-visible:ring-2 focus-visible:ring-offwhite rounded-full"
                  ref={(el) => {
                    if (el) menuLinkRefs.current[navLinks.length + 1] = el;
                  }}
                >
                  List Your Home
                </button>
              </div>
            </div>
          </div>
        )}
    </>
  );
}
