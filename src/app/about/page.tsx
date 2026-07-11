import type { Metadata } from 'next';
import { AboutClient } from '@/components/about/AboutClient';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Casa Aurelia is a deliberate real estate practice where client clarity matters more than commission timelines. Learn about our philosophy, team, and values.',
  openGraph: {
    title: 'About — Casa Aurelia',
    description:
      'A real estate studio where client clarity matters more than commission timelines.',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}