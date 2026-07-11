import { PropertiesClient } from '@/components/properties/PropertiesClient';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Properties',
  description: 'Browse our curated collection of premium residential properties across India — villas, penthouses, apartments, and heritage homes.',
  path: '/properties',
});

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  return <PropertiesClient initialSearchParams={params} />;
}