import type { Metadata } from 'next';
import { ContactClient } from '@/components/contact/ContactClient';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Casa Aurelia for property inquiries, valuations, or general questions. We respond within 24 hours.',
  openGraph: {
    title: 'Contact — Casa Aurelia',
    description: 'Get in touch with Casa Aurelia for property inquiries and general questions.',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}