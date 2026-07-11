import Link from 'next/link';

const exploreLinks = [
  { label: 'Properties', href: '/properties' },
  { label: 'Neighborhoods', href: '/neighborhoods' },
  { label: 'About', href: '/about' },
];

const servicesLinks = [
  { label: 'Sell Your Home', href: '/sell' },
  { label: 'Contact', href: '/contact' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
];

function FooterLinkGroup({
  heading,
  links,
}: {
  heading: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="font-mono text-xs uppercase tracking-wider text-gold mb-4">
        {heading}
      </h4>
      <ul>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block py-1 text-sm text-offwhite/60 hover:text-offwhite transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-espresso text-offwhite/80 mt-auto">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-6 lg:px-16 border-t border-offwhite/10">
        {/* 4-column grid */}
        <div className="py-12 lg:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">
          {/* Column 1: Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="font-display text-lg text-offwhite"
            >
              Casa Aurelia
            </Link>
            <p className="mt-3 text-sm text-offwhite/50 leading-relaxed max-w-xs">
              Curated residential properties across India&apos;s most
              sought-after cities.
            </p>
          </div>

          {/* Column 2: Explore */}
          <FooterLinkGroup heading="Explore" links={exploreLinks} />

          {/* Column 3: Services */}
          <FooterLinkGroup heading="Services" links={servicesLinks} />

          {/* Column 4: Legal */}
          <FooterLinkGroup heading="Legal" links={legalLinks} />
        </div>

        {/* Bottom bar */}
        <div className="border-t border-offwhite/10 py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <p className="text-xs text-offwhite/40">
            &copy; {new Date().getFullYear()} Casa Aurelia. All rights reserved.
          </p>
          <p className="text-xs text-offwhite/40">
            Demo property platform — for demonstration purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}