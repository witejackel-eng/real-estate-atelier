import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { properties, getPropertyBySlug, getSimilarProperties } from '@/data/properties';
import { PropertyDetailClient } from '@/components/properties/PropertyDetailClient';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) {
    return { title: 'Property Not Found — Casa Aurelia' };
  }
  return {
    title: `${property.title} in ${property.location} — Casa Aurelia`,
    description: property.shortDescription,
    openGraph: {
      title: `${property.title} — Casa Aurelia`,
      description: property.shortDescription,
      images: [{ url: property.heroImage, width: 1200, height: 800 }],
    },
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  const similarProperties = getSimilarProperties(slug, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    description: property.shortDescription,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/properties/${property.slug}`,
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
      <PropertyDetailClient property={property} similarProperties={similarProperties} />
    </>
  );
}