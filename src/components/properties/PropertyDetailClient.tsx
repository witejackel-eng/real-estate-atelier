'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Bed,
  Bath,
  Maximize2,
  Car,
  CalendarCheck,
  Home,
  ChevronLeft,
  ChevronRight,
  X,
  MapPin,
  Heart,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/shared/Container';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { Reveal } from '@/components/shared/Reveal';
import { Button } from '@/components/shared/Button';
import { InquiryForm } from '@/components/shared/InquiryForm';
import { BookViewingModal } from '@/components/shared/BookViewingModal';
import { EMICalculator } from '@/components/shared/EMICalculator';
import type { Property } from '@/data/properties';

function PropertyCardMini({ property }: { property: Property }) {
  return (
    <Link href={`/properties/${property.slug}`} className="group block">
      <article className="bg-offwhite border border-espresso/5 overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-espresso/5">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={property.heroImage}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute bottom-3 left-3">
            <span className="inline-block bg-espresso/70 backdrop-blur-sm text-offwhite font-mono text-xs px-3 py-1">
              {property.type}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h4 className="font-display text-base text-espresso group-hover:text-gold transition-colors duration-300">
            {property.title}
          </h4>
          <p className="font-mono text-xs text-espresso/50 mt-1 flex items-center gap-1">
            <MapPin size={12} />
            {property.location}
          </p>
          <div className="flex items-center justify-between mt-3">
            <span className="font-display text-gold">{property.price}</span>
            <span className="font-mono text-xs text-espresso/50">
              {property.bedrooms} Bed · {property.bathrooms} Bath
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export function PropertyDetailClient({
  property,
  similarProperties,
}: {
  property: Property;
  similarProperties: Property[];
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      const stored = JSON.parse(localStorage.getItem('casaaurelia_favorites') || '[]');
      return stored.includes(property.id);
    } catch {
      return false;
    }
  });

  const allImages = [property.heroImage, ...property.gallery.filter((img) => img !== property.heroImage)];

  const toggleFavorite = useCallback(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('casaaurelia_favorites') || '[]');
      if (isFavorite) {
        localStorage.setItem('casaaurelia_favorites', JSON.stringify(stored.filter((id: string) => id !== property.id)));
      } else {
        localStorage.setItem('casaaurelia_favorites', JSON.stringify([...stored, property.id]));
      }
      setIsFavorite(!isFavorite);
    } catch {
      // ignore
    }
  }, [isFavorite, property.id]);

  const lightboxPrev = useCallback(() => {
    setActiveImage((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  }, [allImages.length]);

  const lightboxNext = useCallback(() => {
    setActiveImage((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  }, [allImages.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowLeft') lightboxPrev();
      if (e.key === 'ArrowRight') lightboxNext();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, lightboxPrev, lightboxNext]);

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxOpen]);

  const specs = [
    { icon: Bed, label: 'Bedrooms', value: `${property.bedrooms}` },
    { icon: Bath, label: 'Bathrooms', value: `${property.bathrooms}` },
    { icon: Maximize2, label: 'Area', value: property.area },
    { icon: Car, label: 'Parking', value: property.parking },
    { icon: CalendarCheck, label: 'Possession', value: property.possession },
    { icon: Home, label: 'Type', value: property.type },
  ];

  const scrollToInquiry = () => {
    const el = document.getElementById('inquiry-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen">
      {/* Hero Gallery */}
      <section className="pt-20 sm:pt-24">
        <Container className="py-6 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
            {/* Main Image */}
            <div
              className="lg:col-span-2 relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden cursor-pointer group"
              onClick={() => setLightboxOpen(true)}
            >
              <Image
                src={allImages[activeImage]}
                alt={`${property.title} - Image ${activeImage + 1}`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 66vw"
                priority
              />
              <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/10 transition-colors duration-300" />
              <button
                onClick={toggleFavorite}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-offwhite/80 backdrop-blur-sm rounded-full transition-colors hover:bg-offwhite"
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart
                  size={18}
                  className={isFavorite ? 'fill-terracotta text-terracotta' : 'text-espresso/60'}
                />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="lg:col-span-1 grid grid-cols-3 lg:grid-cols-1 gap-3 sm:gap-4">
              {allImages.slice(0, 3).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative aspect-[16/10] lg:aspect-[16/10] overflow-hidden transition-all duration-300 ${
                    activeImage === i ? 'ring-2 ring-gold ring-offset-2 ring-offset-ivory' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${property.title} - Thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 33vw, 33vw"
                  />
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-espresso/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-offwhite/60 hover:text-offwhite transition-colors z-10"
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>
            <button
              onClick={lightboxPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-offwhite/60 hover:text-offwhite transition-colors z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={lightboxNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-offwhite/60 hover:text-offwhite transition-colors z-10"
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>
            <motion.div
              key={activeImage}
              className="relative w-[90vw] h-[70vh] sm:h-[80vh]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={allImages[activeImage]}
                alt={`${property.title} - Image ${activeImage + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </motion.div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {allImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === activeImage ? 'bg-offwhite' : 'bg-offwhite/30'
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Property Info */}
      <section className="py-8 sm:py-12">
        <Container>
          <div className="max-w-4xl">
            <Reveal>
              <SectionLabel label={property.type} />
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-espresso mt-2 tracking-tight leading-tight">
                {property.title}
              </h1>
              <p className="font-mono text-gold mt-2 flex items-center gap-1.5 text-sm sm:text-base">
                <MapPin size={15} />
                {property.location}
              </p>
              <p className="font-display text-2xl sm:text-3xl text-espresso mt-4">{property.price}</p>
            </Reveal>
          </div>

          {/* Specs Grid */}
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-10">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="bg-offwhite border border-espresso/5 p-4 text-center"
                >
                  <spec.icon size={18} className="mx-auto text-gold mb-2" />
                  <p className="font-mono text-xs text-espresso/50 uppercase tracking-wider mb-1">
                    {spec.label}
                  </p>
                  <p className="font-body text-sm text-espresso font-medium">{spec.value}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Description */}
      <section className="py-10 sm:py-14 editorial-line">
        <Container>
          <div className="max-w-4xl">
            <Reveal>
              <SectionLabel label="Overview" />
              <h2 className="font-display text-2xl sm:text-3xl text-espresso mt-2 mb-6">Description</h2>
              <p className="font-body text-base sm:text-lg text-espresso/70 leading-relaxed">
                {property.description}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="py-10 sm:py-14 editorial-line">
        <Container>
          <div className="max-w-4xl">
            <Reveal>
              <SectionLabel label="Details" />
              <h2 className="font-display text-2xl sm:text-3xl text-espresso mt-2 mb-6">Key Features</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 font-body text-sm text-espresso/70">
                    <span className="text-gold mt-1.5 block w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Amenities */}
      <section className="py-10 sm:py-14 editorial-line">
        <Container>
          <div className="max-w-4xl">
            <Reveal>
              <SectionLabel label="Included" />
              <h2 className="font-display text-2xl sm:text-3xl text-espresso mt-2 mb-6">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="inline-block bg-offwhite border border-espresso/5 font-mono text-xs text-espresso/70 px-3 py-1.5 tracking-wide"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Neighborhood */}
      <section className="py-10 sm:py-14 editorial-line">
        <Container>
          <div className="max-w-4xl">
            <Reveal>
              <SectionLabel label="Location" />
              <h2 className="font-display text-2xl sm:text-3xl text-espresso mt-2 mb-6">Neighborhood</h2>
              <p className="font-body text-base sm:text-lg text-espresso/70 leading-relaxed">
                {property.neighborhood}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* EMI Calculator + Inquiry */}
      <section className="py-10 sm:py-14 editorial-line">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <Reveal>
              <EMICalculator />
            </Reveal>
            <Reveal delay={0.1}>
              <div id="inquiry-section">
                <InquiryForm propertyTitle={property.title} />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Similar Properties */}
      {similarProperties.length > 0 && (
        <section className="py-10 sm:py-14 editorial-line">
          <Container>
            <Reveal>
              <SectionLabel label="More" />
              <h2 className="font-display text-2xl sm:text-3xl text-espresso mt-2 mb-8">
                Similar Properties
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {similarProperties.map((p) => (
                <Reveal key={p.id} delay={0.1}>
                  <PropertyCardMini property={p} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-offwhite/95 backdrop-blur-md border-t border-espresso/10 p-3 sm:p-4 lg:hidden">
        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="md"
            className="flex-1"
            onClick={() => setBookingOpen(true)}
          >
            Book Viewing
          </Button>
          <Button variant="secondary" size="md" className="flex-1" onClick={scrollToInquiry}>
            Ask for Details
          </Button>
        </div>
      </div>

      {/* Desktop CTA — hidden on mobile */}
      <div className="hidden lg:block">
        <div className="h-20" />
      </div>

      <BookViewingModal
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        propertyName={property.title}
      />
    </main>
  );
}