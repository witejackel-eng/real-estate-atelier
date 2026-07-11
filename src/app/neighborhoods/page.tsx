import { createMetadata } from '@/lib/seo';
import { NeighborhoodsClient } from '@/components/neighborhoods/NeighborhoodsClient';

export const metadata = createMetadata({
  title: 'Neighborhoods',
  description:
    'Explore India\'s most desirable residential neighborhoods — Delhi NCR, Mumbai, Goa, Bangalore, Pune, Hyderabad, Jaipur, and Alibaug.',
  path: '/neighborhoods',
});

export default function NeighborhoodsPage() {
  return <NeighborhoodsClient />;
}