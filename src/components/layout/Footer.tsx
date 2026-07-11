'use client';

import Link from 'next/link';

const exploreLinks = [
  { label: 'Properties', href: '/properties' },
  { label: 'Neighbourhoods', href: '/neighborhoods' },
  { label: 'About', href: '/about' },
];

const serviceLinks = [
  { label: 'Sell Your Home', href: '/sell' },
  { label: 'Contact', href: '/contact' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper mt-auto" role="contentinfo">
      <div className="container-site py-16 lg:py-24">
        {/* ── 4-Column Grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="font-display text-2xl tracking-tight">
                Casa Aurelia
              </span>
              <span className="label-micro ml-2 opacity-40">Atelier 01</span>
            </Link>
            <p
              className="mt-5 text-sm leading-relaxed"
              style={{ color: 'var(--color-muted)' }}
            >
              Private residential advisory for considered homes across India.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="label-micro text-white/40 mb-5">Explore</h3>
            <ul className="space-y-3" role="list">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="label-micro text-white/40 mb-5">Services</h3>
            <ul className="space-y-3" role="list">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="label-micro text-white/40 mb-5">Legal</h3>
            <ul className="space-y-3" role="list">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Divider ── */}
        <hr className="rule-light my-12 lg:my-16" />

        {/* ── Bottom Bar ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="label-micro text-white/25">
            &copy; {year} Casa Aurelia. All rights reserved.
          </p>
          <p className="label-micro text-white/20">
            Demo property platform — for demonstration purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}