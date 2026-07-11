# Phase 3: Homepage Rebuild — Work Record

## Task ID: phase-3-homepage

## Summary
Rebuilt the Casa Aurelia homepage with 7 sections across 8 files (7 component files + 1 page file). All sections follow the editorial luxury real estate design system with ivory/sand/espresso/gold palette.

## Files Created/Modified

### Component Files (in `src/components/home/`)
1. **Hero.tsx** — Client component. 7/5 grid split on desktop (image right, content left). Stacked on mobile with image first. Uses Reveal for progressive content animation. Two CTAs: "Explore Properties" + "Request a Valuation". Image: `/images/hero-main.jpg` with editorial caption "Siolim, Goa".

2. **FeaturedProperties.tsx** — Client component. Displays 6 featured properties in a 3-column grid. Each card is a Link wrapping article content. Favorite heart button is positioned OUTSIDE the Link (absolute over image). Uses `useSyncExternalStore` for localStorage favorites (avoids setState-in-effect lint error). Non-favorited hearts have a `bg-charcoal/30 backdrop-blur-sm` circle. Favorited hearts are gold filled. 44px touch targets. "View All Properties" ghost button with ArrowRight icon.

3. **ValueProposition.tsx** — Server component. Three pillars (Curated Buying, Considered Selling, Private Advisory) with decorative gold numbers (01/02/03), ghost link buttons, and editorial-line divider above.

4. **SelectedLocations.tsx** — Server component. Dark section (bg-espresso) with 4 neighborhood cards (Delhi NCR, Mumbai, Goa, Bangalore) in a 4-column grid. Each card has aspect-[3/4] image with gradient overlay and hover scale effect. "View all locations" link below.

5. **SellingCTA.tsx** — Server component. 2-column grid: left has SectionLabel, heading, paragraph, 3 bullet items with Check icons, and "Request a Valuation" CTA. Right has `/images/sell-hero.jpg` in aspect-[4/3].

6. **TrustSection.tsx** — Server component. Centered layout with 3 principles (Transparency, Selectivity, Privacy). Each has a decorative gold horizontal rule, heading, and description. Bordered top and bottom.

7. **FinalCTA.tsx** — Server component. Dark section (bg-espresso). Centered editorial container. Custom gold CTA button styled inline (not using Button component since primary variant bg doesn't work on dark bg). Secondary "browse all properties" link.

### Page File
8. **src/app/page.tsx** — Server component that imports and renders all 7 section components.

## Key Design Decisions
- Used `useSyncExternalStore` for localStorage favorites to avoid React lint error (`react-hooks/set-state-in-effect`)
- Dispatches `StorageEvent` after toggle to trigger re-render via subscription
- Hero is `'use client'` for scroll listener capability (though Reveal handles animations)
- FeaturedProperties is `'use client'` for favorites interactivity
- Remaining 5 sections are server components (no interactivity needed)
- Reveal component ensures content is always visible (initial opacity: 1) — no invisible-by-default states
- No fake testimonials, no statistics, no repeated CTAs
- Semantic HTML throughout (section, article, h2, h3, nav)
- Proper aria-labels on sections and interactive elements

## Lint Status
✅ ESLint passes with zero errors