import { createMetadata } from '@/lib/seo';
import { NeighborhoodsClient } from '@/components/neighborhoods/NeighborhoodsClient';

export const metadata = createMetadata({
  title: 'Neighborhoods',
  description:
    "Explore India's most desirable residential neighborhoods. Detailed guides on lifestyle, property types, and price ranges for Delhi NCR, Mumbai, Goa, Bangalore, Pune, and Hyderabad.",
  path: '/neighborhoods',
});

export default function NeighborhoodsPage() {
  return <NeighborhoodsClient />;
}