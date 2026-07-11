import { PropertiesClient } from '@/components/properties/PropertiesClient';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'The Collection',
  description:
    'A considered selection of residential properties across India\'s most compelling cities — villas, penthouses, apartments, duplexes, heritage homes, and weekend retreats.',
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