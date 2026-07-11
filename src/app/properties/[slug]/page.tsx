import { notFound } from 'next/navigation';
import { properties, getPropertyBySlug, getSimilarProperties } from '@/data/properties';
import { PropertyDetailClient } from '@/components/properties/PropertyDetailClient';
import { createMetadata, SITE_URL } from '@/lib/seo';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) {
    return { title: 'Property Not Found' };
  }
  return createMetadata({
    title: `${property.title}, ${property.location}`,
    description: property.shortDescription,
    path: `/properties/${property.slug}`,
    image: property.heroImage,
  });
}

export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  const propertyIndex = properties.findIndex((p) => p.slug === slug);

  const similarRaw = getSimilarProperties(slug, 4);
  const similarProperties = similarRaw.length >= 3 ? similarRaw.slice(0, 3) : similarRaw;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    description: property.shortDescription,
    url: `${SITE_URL}/properties/${property.slug}`,
    image: `${SITE_URL}${property.heroImage}`,
    offers: {
      '@type': 'Offer',
      price: property.priceNumber,
      priceCurrency: 'INR',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: property.location,
      addressRegion: property.city,
      addressCountry: 'IN',
    },
    numberOfRooms: property.bedrooms,
    numberOfBathroomsTotal: property.bathrooms,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: parseInt(property.area.replace(/[^0-9]/g, '')),
      unitCode: 'FTK',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PropertyDetailClient
        property={property}
        propertyIndex={propertyIndex}
        similarProperties={similarProperties}
      />
    </>
  );
}