# Casa Aurelia

Private residential advisory for considered homes across India.

A premium real estate advisory website built with Next.js, Tailwind CSS, curated property data, cinematic visuals, refined forms, SEO pages, and responsive luxury design.

## Live URL

[real-estate-atelier.vercel.app](https://real-estate-atelier.vercel.app/)

## Features

- Cinematic editorial homepage with numbered narrative sections
- Curated property collection with custom filtering (city, type, bedrooms, price, search)
- Immersive property detail pages with editorial gallery and lightbox
- Branded page loader, smooth scrolling (Lenis), custom cursor
- Full-screen navigation menu with numbered links
- Responsive design across mobile, tablet, and desktop
- SEO-optimized with dynamic metadata, sitemap, and structured data
- Form handling with honeypot protection and client-side validation

## Pages

| Route | Description |
| --- | --- |
| `/` | Homepage — editorial narrative with featured properties, method, locations, sellers |
| `/properties` | Property collection — filtered catalogue with editorial grid |
| `/properties/[slug]` | Property detail — gallery, specs, neighborhood, inquiry |
| `/sell` | Seller advisory — valuation form and process |
| `/about` | About — philosophy, selection process, regions |
| `/contact` | Contact — enquiry form with validation |
| `/neighborhoods` | Neighbourhoods — city guides with property counts |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Service |

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Fonts**: Instrument Serif (display), Inter (body), IBM Plex Mono (labels)
- **Motion**: CSS transitions, IntersectionObserver reveals, Lenis smooth scroll
- **Icons**: Lucide React
- **Deployment**: Vercel

## Design Direction

The visual identity follows a warm luxury palette:
- Warm ivory backgrounds with espresso text
- Gold accents for interactive elements and CTAs
- Sand and paper tones for section contrast
- Architectural editorial typography with serif display headings
- Monospace labels for section numbering and metadata
- Minimal borders, generous whitespace, restrained animations

## Image Credits

All property and location images are sourced from [Unsplash](https://unsplash.com) under the Unsplash License. See `/public/images/image-credits.json` for full attribution.

## Demo Disclaimer

This is a demo real estate platform. Property data, prices, images, testimonials, contact details, legal language, and business claims must be replaced with verified real business information before commercial use.

Forms are currently demo/local unless an email service, CRM, or backend API is connected.

## Getting Started

### Prerequisites

- Node.js 18+
- npm or Bun

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Environment Variables

See `.env.example` for required variables.

## Deployment

The project is deployed on Vercel. Connect your GitHub repository and deploy automatically.