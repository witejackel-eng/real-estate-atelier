import type { Metadata } from 'next';
import { NotFoundClient } from '@/components/not-found/NotFoundClient';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for is no longer on the map.',
};

export default function NotFound() {
  return <NotFoundClient />;
}