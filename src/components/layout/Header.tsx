'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Container } from '@/components/shared/Container';

const navLinks = [
  { label: 'Properties', href: '/properties' },
  { label: 'Sell', href: '/sell' },
  { label: 'Neighborhoods', href: '/neighborhoods' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-ivory/90 backdrop-blur-md border-b border-espresso/5'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 2, ease: [0.22, 1, 0.36, 1] }}
      >
        <Container>
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="font-display text-xl md:text-2xl text-espresso tracking-tight">
              Casa Aurelia
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-mono text-xs uppercase tracking-[0.15em] text-espresso/70 hover:text-gold transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/sell"
                className="font-mono text-xs uppercase tracking-[0.15em] bg-espresso text-offwhite px-5 py-2.5 hover:bg-charcoal transition-colors duration-300"
              >
                List Your Home
              </Link>
            </nav>

            <button
              className="md:hidden p-2 text-espresso"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </Container>
      </motion.header>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-ivory pt-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="flex flex-col items-center gap-8 pt-16">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="font-display text-3xl text-espresso hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.08 }}
              >
                <Link
                  href="/sell"
                  onClick={() => setIsMobileOpen(false)}
                  className="font-mono text-xs uppercase tracking-[0.15em] bg-espresso text-offwhite px-6 py-3 mt-4 inline-block"
                >
                  List Your Home
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}