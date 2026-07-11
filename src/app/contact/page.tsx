import { createMetadata } from '@/lib/seo';
import { ContactClient } from '@/components/contact/ContactClient';

export const metadata = createMetadata({
  title: 'Contact',
  description:
    'Get in touch with Casa Aurelia for property inquiries, valuations, or general questions. We respond within 24 hours.',
  path: '/contact',
});

export default function ContactPage() {
  return <ContactClient />;
}