import { createMetadata } from '@/lib/seo';
import { AboutClient } from '@/components/about/AboutClient';

export const metadata = createMetadata({
  title: 'About',
  description:
    'Casa Aurelia is a deliberate real estate practice where client clarity matters more than commission timelines. Learn about our philosophy and values.',
  path: '/about',
});

export default function AboutPage() {
  return <AboutClient />;
}