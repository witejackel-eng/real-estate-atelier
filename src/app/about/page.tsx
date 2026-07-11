import { createMetadata } from '@/lib/seo';
import { AboutClient } from '@/components/about/AboutClient';

export const metadata = createMetadata({
  title: 'About',
  description:
    'A deliberate real-estate practice. Fewer listings, more attention, clear advice, straightforward communication.',
  path: '/about',
});

export default function AboutPage() {
  return <AboutClient />;
}