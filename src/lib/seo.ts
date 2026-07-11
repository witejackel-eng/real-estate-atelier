import type { Metadata } from 'next';

export const SITE_NAME = 'Casa Aurelia';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://real-estate-atelier.vercel.app';

interface CreateMetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
}

export function createMetadata({ title, description, path, image }: CreateMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage = image ? `${SITE_URL}${image}` : undefined;

  return {
    title: {
      absolute: `${title} | Casa Aurelia`,
    },
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | Casa Aurelia`,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_IN',
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630, alt: title }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Casa Aurelia`,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}