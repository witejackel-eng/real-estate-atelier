# Casa Aurelia — Private Residential Advisory

A premium editorial real-estate website built with Next.js 16, Tailwind CSS v4, and TypeScript.

## Overview

Casa Aurelia is a demonstration property platform showcasing curated residential properties across India. The design follows an editorial architecture direction — "Quiet Indian residential luxury expressed through editorial architecture."

**This is a demonstration website.** Form submissions are logged locally. No real transactions, agents, or services are offered.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 (CSS-first, `@theme inline`)
- **Fonts**: Instrument Serif (display), Inter (body), IBM Plex Mono (labels)
- **Motion**: CSS transitions + IntersectionObserver (no heavy animation libraries)
- **Gallery**: embla-carousel-react
- **Icons**: lucide-react (minimal use)

## Design System

The visual identity uses warm, architectural tones:

| Token | Value | Usage |
|-------|-------|-------|
| paper | `#F4F0E8` | Primary background |
| paper-deep | `#EAE2D5` | Section backgrounds |
| ink | `#181310` | Primary text |
| ink-soft | `#2A231E` | Secondary text |
| brass | `#B4874C` | Accent, CTAs, highlights |
| line | `#D7CEC1` | Dividers, borders |
| muted | `#756D64` | Secondary labels |
| white | `#FFFDF8` | Light text on dark backgrounds |

Typography, spacing, and motion tokens are defined in `src/app/globals.css`.

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Design system (tokens, typography, components)
│   ├── layout.tsx           # Root layout (fonts, metadata, header/footer)
│   ├── page.tsx             # Homepage
│   ├── properties/          # Listing + detail pages
│   ├── sell/                # Seller page
│   ├── contact/             # Contact page
│   ├── about/               # About page
│   ├── neighborhoods/       # Neighborhoods page
│   ├── privacy/             # Privacy policy
│   ├── terms/               # Terms of service
│   ├── not-found.tsx        # 404 page
│   └── api/inquiry/         # Form submission endpoint
├── components/
│   ├── layout/              # Header, Footer
│   ├── properties/          # PropertiesClient, PropertyDetailClient
│   ├── sell/                # SellClient
│   ├── contact/             # ContactClient
│   ├── about/               # AboutClient
│   └── shared/              # Reveal (scroll animation)
└── data/
    ├── properties.ts        # 9 properties with full data
    └── neighborhoods.ts     # 6 cities with descriptions
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, collection, method, places, sellers |
| `/properties` | Property listing with filters (city, type, bedrooms, sort) |
| `/properties/[slug]` | Property detail with gallery, specs, inquiry form |
| `/sell` | Seller page with valuation form and FAQ |
| `/contact` | Contact form |
| `/about` | Brand story, philosophy, selection process |
| `/neighborhoods` | City chapters with editorial storytelling |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

## Development

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Run linter
bun run lint

# Production build
bun run build
```

## Demonstration Notice

This website is a **demonstration project**. All property listings are fictional examples. Form submissions are logged locally and no data is transmitted to any external service. No real estate brokerage, advisory, or agency services are offered through this website.

## License

Private. All rights reserved.