import type { Metadata } from 'next';
import { NeighborhoodsClient } from '@/components/neighborhoods/NeighborhoodsClient';

export const metadata: Metadata = {
  title: 'Neighborhoods',
  description:
    'Explore India\'s most desirable residential neighborhoods. Detailed guides on lifestyle, property types, and price ranges for Delhi NCR, Mumbai, Goa, Bangalore, Pune, and Hyderabad.',
  openGraph: {
    title: 'Neighborhoods — Casa Aurelia',
    description:
      'Explore India\'s most desirable residential neighborhoods with detailed lifestyle and property guides.',
  },
};

export default function NeighborhoodsPage() {
  return <NeighborhoodsClient />;
}