import { createMetadata } from '@/lib/seo';
import { SellClient } from '@/components/sell/SellClient';

export const metadata = createMetadata({
  title: 'Sell with Us',
  description:
    'Sell your home with considered presentation, qualified introductions, and private viewings. Request a free property valuation.',
  path: '/sell',
});

export default function SellPage() {
  return <SellClient />;
}