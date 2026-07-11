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
      className="bg-espresso text-ivory mt-0"
      role="contentinfo"
    >
      <div className="container-site py-16 lg:py-24">
        {/* Top: brand + tagline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-12 lg:mb-16">
          <div className="lg:col-span-5">
            <Link
              href="/"
              className="font-display text-3xl tracking-tight inline-flex items-baseline gap-3"
            >
              Casa Aurelia
              <span className="label-micro opacity-40">Atelier 01</span>
            </Link>
            <p
              className="mt-4 body-copy-light opacity-60 max-w-md"
            >
              Private residential advisory for considered homes across India.
              Fewer listings, more attention, clear advice.
            </p>
          </div>

          {/* Links */}
          <div className="lg:col-span-7">
            <div className="hidden lg:block mb-8" aria-hidden="true">
              <hr className="editorial-rule-light" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-8">
              {/* Explore */}
              <div>
                <h3 className="label-micro text-ivory/60 mb-5">Explore</h3>
                <ul className="space-y-3">
                  {exploreLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-ivory/70 hover:text-gold transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div>
                <h3 className="label-micro text-ivory/60 mb-5">Services</h3>
                <ul className="space-y-3">
                  {serviceLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-ivory/70 hover:text-gold transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="label-micro text-ivory/60 mb-5">Legal</h3>
                <ul className="space-y-3">
                  {legalLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-ivory/70 hover:text-gold transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <hr className="editorial-rule-light mb-8" />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="label-micro text-ivory/40">
            © {year} Casa Aurelia. All rights reserved.
          </p>
          <p className="label-micro text-ivory/50">
            Demo property platform — for demonstration purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
