import { createMetadata } from '@/lib/seo';
import { ContactClient } from '@/components/contact/ContactClient';

export const metadata = createMetadata({
  title: 'Contact',
  description:
    'Start a private conversation about your next home. Contact Casa Aurelia for property enquiries, advisory, or selling.',
  path: '/contact',
});

export default function ContactPage() {
  return <ContactClient />;
}