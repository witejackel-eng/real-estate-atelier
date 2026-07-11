import { PropertiesClient } from '@/components/properties/PropertiesClient';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'The Collection',
  description:
    'A curated selection of premium residential properties across India. Filter by city, type, bedrooms, and price.',
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