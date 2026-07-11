import type { Metadata } from 'next';
import { SellClient } from '@/components/sell/SellClient';

export const metadata: Metadata = {
  title: 'Sell with Us',
  description:
    'Sell your property with Casa Aurelia — professional presentation, honest valuations, and access to pre-qualified buyers. Less noise, better preparation.',
  openGraph: {
    title: 'Sell with Us — Casa Aurelia',
    description:
      'Sell your property with professional presentation, honest valuations, and access to pre-qualified buyers.',
  },
};

export default function SellPage() {
  return <SellClient />;
}