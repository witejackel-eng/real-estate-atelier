# Casa Aurelia — Real Estate Atelier

A premium real estate website built with Next.js, Tailwind CSS, Framer Motion, curated property data, cinematic visuals, SEO pages, and conversion-focused contact flows.

**Live Preview:** [Deploy to Vercel to generate live URL]

## Brand

**Casa Aurelia** — A cinematic real estate studio for curated homes, sharp negotiation, and calm buying decisions.

## Features

- **Cinematic homepage** with kinetic hero text, featured properties, editorial property index, services grid, and neighborhood previews
- **Property listings** with client-side filtering by city, type, bedrooms, price, and search
- **Property detail pages** with image gallery, lightbox, inquiry form, EMI calculator, and similar properties
- **Sell page** with process steps, staging checklist, valuation form, and FAQ
- **Neighborhood guides** for Delhi NCR, Mumbai, Goa, Bangalore, Pune, and Hyderabad
- **About page** with brand story, philosophy, process, and team
- **Contact page** with validated form, direct contact details, and FAQ
- **Legal pages** (Privacy Policy, Terms of Use)
- **Smooth scroll** via Lenis
- **Framer Motion** animations with reduced motion support
- **Save/favorite properties** via localStorage
- **EMI calculator** with Indian currency formatting
- **Book viewing modal** with date/time selection
- **Property hover preview** in the editorial index
- **Live footer time** (IST)
- **SEO metadata** on all pages including Open Graph and Twitter cards
- **Responsive design** with mobile-first approach
- **Accessible** components with keyboard navigation and focus states

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Smooth Scroll:** @studio-freight/lenis
- **Icons:** Lucide React
- **Fonts:** Playfair Display (display), Inter (body), Geist Mono (labels)

## Pages / Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with 12 sections |
| `/properties` | All properties with filters |
| `/properties/[slug]` | Property detail page |
| `/sell` | Sell with us / valuation |
| `/neighborhoods` | Neighborhood guides |
| `/about` | Brand story and team |
| `/contact` | Contact form and details |
| `/privacy` | Privacy policy |
| `/terms` | Terms of use |

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, or bun

### Installation

```bash
git clone https://github.com/witejackel-eng/real-estate-atelier.git
cd real-estate-atelier
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## Environment Variables

Create a `.env.local` file based on `.env.example`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
RESEND_API_KEY=
CONTACT_TO_EMAIL=
```

> **Note:** Form submissions currently show a demo success message. To enable real email delivery, configure `RESEND_API_KEY` and `CONTACT_TO_EMAIL` with a service like [Resend](https://resend.com), or integrate a CRM of your choice.

## Font / License Note

The project uses **Playfair Display** as the primary display font with fallbacks to `Cormorant Garamond` and `Instrument Serif`.

The original design spec called for **Crème España** (from [fontesk.com](https://fontesk.com/creme-espana-font/)) as a decorative accent font. If you wish to use Crème España:

1. Purchase a commercial license from the font foundry.
2. Place the `.otf` or `.ttf` file in `/public/fonts/`.
3. Update `src/app/layout.tsx` to load the local font.
4. Add `CremaEspana` to the `font-display` family in `tailwind.config.ts`.

For commercial deployment without a Crème España license, the current Playfair Display fallback is production-ready.

## Image Credits

All images are sourced from free-image websites (Unsplash, Pexels, Pixabay) under their respective licenses. See `/public/images/image-credits.json` for detailed attribution.

## Demo Data Disclaimer

**This project uses demo property data.** Listings, prices, testimonials, team members, and contact information are fictional and must be replaced with verified real business data before any commercial use.

- Property listings are illustrative examples, not real offerings
- Team member profiles are placeholder/demo content
- Testimonials are clearly labeled as demo content
- Contact details (email, phone, address) are fictional
- No real brokerage, advisory, or legal service is provided

## Deployment (Vercel)

1. Push this repository to GitHub
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. Select the repository
4. Vercel will auto-detect Next.js and configure the build
5. Add environment variables in the Vercel dashboard
6. Deploy

## Push to GitHub

If the repository was not automatically created, run:

```bash
git init
git add .
git commit -m "Initial commit: Casa Aurelia real estate website"
gh repo create witejackel-eng/real-estate-atelier --public \
  --description "Premium real estate website built with Next.js, Tailwind CSS, Framer Motion, curated property data, cinematic visuals, SEO pages, and conversion-focused contact flows." \
  --source . --remote origin --push
```

## License

This project is created for demonstration and portfolio purposes. The code is available for reference. Please ensure all assets (images, fonts) are properly licensed before commercial use.