'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/shared/Container';

const footerLinks = {
  explore: [
    { label: 'All Properties', href: '/properties' },
    { label: 'Neighborhoods', href: '/neighborhoods' },
    { label: 'Sell With Us', href: '/sell' },
    { label: 'About Us', href: '/about' },
  ],
  services: [
    { label: 'Buy a Home', href: '/properties' },
    { label: 'Sell a Property', href: '/sell' },
    { label: 'Property Valuation', href: '/sell' },
    { label: 'Contact an Advisor', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Image Credits', href: '/images/image-credits.json' },
  ],
};

function LiveTime() {
  const [time, setTime] = React.useState('');
  React.useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return <span>{time} IST</span>;
}

export function Footer() {
  return (
    <footer className="bg-espresso text-offwhite/80 mt-auto">
      <Container>
        <div className="py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
            <div className="lg:col-span-2">
              <Link href="/" className="font-display text-2xl text-offwhite tracking-tight">
                Casa Aurelia
              </Link>
              <p className="font-body text-sm text-offwhite/50 mt-4 max-w-sm leading-relaxed">
                A premium real estate studio for curated homes, private viewings, and calm
                buying decisions across India&apos;s finest addresses.
              </p>
              <div className="flex gap-6 mt-6">
                <span className="font-mono text-xs text-gold/70 tracking-wider">Instagram</span>
                <span className="font-mono text-xs text-gold/70 tracking-wider">LinkedIn</span>
                <span className="font-mono text-xs text-gold/70 tracking-wider">Twitter</span>
              </div>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase tracking-[0.15em] text-gold mb-4">Explore</h4>
              <ul className="space-y-3">
                {footerLinks.explore.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-offwhite/50 hover:text-offwhite transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase tracking-[0.15em] text-gold mb-4">Services</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-offwhite/50 hover:text-offwhite transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase tracking-[0.15em] text-gold mb-4">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-offwhite/50 hover:text-offwhite transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-offwhite/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <p className="font-mono text-xs text-offwhite/30">
                &copy; {new Date().getFullYear()} Casa Aurelia. All rights reserved.
              </p>
              <span className="hidden sm:inline text-offwhite/10">|</span>
              <p className="font-mono text-xs text-offwhite/30">
                New Delhi, India &middot; hello@casaaurelia.com &middot; +91 90000 00000
              </p>
            </div>
            <p className="font-mono text-xs text-offwhite/30">
              <LiveTime />
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}