import type { Metadata } from 'next';
import { PropertiesClient } from '@/components/properties/PropertiesClient';

export const metadata: Metadata = {
  title: 'Properties — Casa Aurelia',
  description:
    'Browse our curated collection of premium properties across India. Filter by city, type, bedrooms, and price to find your perfect home.',
  openGraph: {
    title: 'Properties — Casa Aurelia',
    description:
      'Browse our curated collection of premium properties across India.',
  },
};

export default function PropertiesPage() {
  return <PropertiesClient />;
}