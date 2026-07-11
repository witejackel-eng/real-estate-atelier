import { createMetadata } from '@/lib/seo';
import { SellClient } from '@/components/sell/SellClient';

export const metadata = createMetadata({
  title: 'Sell with Us',
  description:
    'Sell your property with Casa Aurelia — professional presentation, honest valuations, and access to pre-qualified buyers. Less noise, better preparation.',
  path: '/sell',
});

export default function SellPage() {
  return <SellClient />;
}