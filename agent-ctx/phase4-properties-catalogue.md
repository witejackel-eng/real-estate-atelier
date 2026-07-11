# Phase 4: Properties Catalogue Page Rebuild

## Files Created/Modified

### 1. `/src/app/properties/page.tsx` (Modified)
- Server component with `createMetadata` for SEO
- Async function that receives `searchParams` from Next.js and passes them as `initialSearchParams` prop to `PropertiesClient`
- This avoids the need for a mount-time `useEffect` + `setState` (which triggers React 19 lint error)

### 2. `/src/components/properties/PropertyCard.tsx` (New)
- Shared card component used by both homepage and properties page
- Props: `property`, `isFavorited?`, `onToggleFavorite?`, `sizes?`
- Wrapped in a single `<Link>` with `<article>` inside
- Favorite button is INSIDE the Link but uses `e.preventDefault()` + `e.stopPropagation()`
- 44px min touch target on favorite button
- Proper `aria-label` for accessibility
- If no `onToggleFavorite` callback, button is not rendered

### 3. `/src/components/properties/PropertiesClient.tsx` (New)
- Full-featured client component with:
  - **URL State Sync**: Initial filters from server `searchParams` prop, subsequent changes via `window.history.replaceState`
  - **Filtering**: Search (title, location, city, type, shortDescription), city, type, beds (>=), sort (newest/price-asc/price-desc)
  - **Desktop Filter Bar**: Hidden on mobile, horizontal flex-wrap with search input, city/type/beds/sort selects, result count
  - **Mobile Filter Button**: Visible below lg, shows active filter count badge
  - **Filter Drawer**: Fixed overlay + bottom sheet, focus trap, Escape to close, overlay click to close, sticky footer with Clear All + Apply
  - **Filter Chips**: Show above grid when filters active, individual remove buttons, "Clear all" link
  - **Property Grid**: Responsive 1/2/3 column grid using PropertyCard
  - **Empty State**: SearchX icon, message, "Clear all filters" button
  - **Favorites**: `useSyncExternalStore` + localStorage (`casa-aurelia-favorites` key)

## Key Decisions
- Used `searchParams` prop from server component to avoid `react-hooks/set-state-in-effect` lint error
- Search input on desktop expands from w-48 to w-64 on focus
- Select elements use native `<select>` with custom brand styling (no shadcn/ui Select, which would add complexity)
- Favorites key changed from old `casaaurelia_favorites` to `casa-aurelia-favorites` per spec
- Filter state is single source of truth; URL is derived from it via effect
