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
    <footer
      className="bg-espresso text-ivory"
      role="contentinfo"
    >
      <div className="container-site py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="font-display text-2xl tracking-tight cursor-view">
              Casa Aurelia
            </Link>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--color-warm-grey)' }}>
              Private residential advisory for considered homes across India.
            </p>
            <span className="label-micro mt-6 inline-block text-ivory/20">
              Atelier 01
            </span>
          </div>

          {/* Explore */}
          <div>
            <h3 className="label-interface text-ivory/40 mb-6">Explore</h3>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory/70 hover:text-ivory transition-colors cursor-view"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="label-interface text-ivory/40 mb-6">Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory/70 hover:text-ivory transition-colors cursor-view"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="label-interface text-ivory/40 mb-6">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory/70 hover:text-ivory transition-colors cursor-view"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <hr className="editorial-rule-light my-12" />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="label-micro text-ivory/30">
            &copy; {year} Casa Aurelia. All rights reserved.
          </p>
          <p className="label-micro text-ivory/20">
            Demo property platform — for demonstration purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}