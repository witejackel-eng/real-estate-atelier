import { notFound } from "next/navigation";
import { properties, getPropertyBySlug, getSimilarProperties } from "@/data/properties";
import { PropertyDetailClient } from "@/components/properties/PropertyDetailClient";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return {};
  return {
    title: property.title,
    description: property.shortDescription,
    openGraph: { title: property.title, description: property.shortDescription, images: [property.heroImage] },
  };
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) notFound();
  const allProperties = properties;
  const propertyIndex = allProperties.findIndex((p) => p.slug === slug);
  const similar = getSimilarProperties(slug, 3);
  return <PropertyDetailClient property={property} propertyIndex={propertyIndex} similarProperties={similar} />;
}