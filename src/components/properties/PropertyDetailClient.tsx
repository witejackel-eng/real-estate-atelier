'use client';

import { useState, useCallback, useEffect, useRef, type FormEvent, type KeyboardEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  X,
  ArrowDown,
} from 'lucide-react';
import type { Property } from '@/data/properties';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/shared/Reveal';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface PropertyDetailClientProps {
  property: Property;
  propertyIndex: number;
  similarProperties: Property[];
}

interface InquiryFormState {
  name: string;
  email: string;
  phone: string;
  message: string;
  honey: string;
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function PropertyDetailClient({
  property,
  propertyIndex,
  similarProperties,
}: PropertyDetailClientProps) {
  /* ---- Gallery state ---- */
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const galleryImages = property.gallery.length > 0
    ? property.gallery
    : [property.heroImage];

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const lightboxPrev = useCallback(() => {
    setLightboxIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length);
  }, [galleryImages.length]);

  const lightboxNext = useCallback(() => {
    setLightboxIndex((i) => (i + 1) % galleryImages.length);
  }, [galleryImages.length]);

  const handleLightboxKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowLeft') lightboxPrev();
      if (e.key === 'ArrowRight') lightboxNext();
      if (e.key === 'Escape') setLightboxOpen(false);
    },
    [lightboxPrev, lightboxNext]
  );

  /* ---- Favorite state (localStorage) ---- */
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const readFavorites = () => {
      try {
        const raw = localStorage.getItem('casa-aurelia-favorites');
        const favorites: string[] = raw ? JSON.parse(raw) : [];
        setIsFavorited(favorites.includes(property.slug));
      } catch {
        /* ignore */
      }
    };
    queueMicrotask(readFavorites);
  }, [property.slug]);

  const toggleFavorite = useCallback(() => {
    setIsFavorited((prev) => {
      const next = !prev;
      try {
        const raw = localStorage.getItem('casa-aurelia-favorites');
        const favorites: string[] = raw ? JSON.parse(raw) : [];
        if (next) {
          if (!favorites.includes(property.slug)) favorites.push(property.slug);
        } else {
          const idx = favorites.indexOf(property.slug);
          if (idx > -1) favorites.splice(idx, 1);
        }
        localStorage.setItem('casa-aurelia-favorites', JSON.stringify(favorites));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, [property.slug]);

  /* ---- Inquiry form state ---- */
  const [form, setForm] = useState<InquiryFormState>({
    name: '',
    email: '',
    phone: '',
    message: '',
    honey: '',
  });
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [formError, setFormError] = useState('');
  const inquiryRef = useRef<HTMLDivElement>(null);

  const updateField = (field: keyof InquiryFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (submitStatus === 'error') {
      setSubmitStatus('idle');
      setFormError('');
    }
  };

  const handleInquirySubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!form.name.trim()) {
      setFormError('Name is required.');
      return;
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setFormError('A valid email is required.');
      return;
    }
    if (!form.phone.trim() || !/^\+?[\d\s-]{7,15}$/.test(form.phone.trim())) {
      setFormError('A valid phone number is required.');
      return;
    }

    setSubmitStatus('submitting');

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'property-inquiry',
          propertyTitle: property.title,
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          message: form.message.trim(),
          _honey: form.honey,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitStatus('success');
        setForm({ name: '', email: '', phone: '', message: '', honey: '' });
      } else {
        setFormError(data.error || 'Something went wrong. Please try again.');
        setSubmitStatus('error');
      }
    } catch {
      setFormError('Network error. Please check your connection and try again.');
      setSubmitStatus('error');
    }
  };

  /* ---- Mobile CTA scroll ---- */
  const scrollToInquiry = () => {
    inquiryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /* ---- Mobile sticky bar visibility (hide near footer) ---- */
  const [showMobileBar, setShowMobileBar] = useState(true);
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowMobileBar(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  /* ---- Gallery alt texts ---- */
  const galleryAltTexts = [
    `${property.title} — Main view`,
    ...property.gallery.map((_, i) => `${property.title} — Photo ${i + 2}`),
  ];

  /* ---- Section number ---- */
  const sectionNum = String(propertyIndex + 1).padStart(3, '0');

  /* ---- Metadata items ---- */
  const metaItems = [
    { label: 'Type', value: property.type },
    { label: 'Bedrooms', value: `${property.bedrooms}` },
    { label: 'Bathrooms', value: `${property.bathrooms}` },
    { label: 'Area', value: property.area },
    { label: 'Possession', value: property.possession },
  ];

  return (
    <>
      <div className="pb-24 md:pb-0">

        {/* ============================================================ */}
        {/*  Breadcrumbs                                                  */}
        {/* ============================================================ */}
        <nav aria-label="Breadcrumb" className="container-site pt-6 pb-5">
          <ol className="flex items-center gap-2 label-micro text-warm-grey">
            <li>
              <Link href="/" className="hover:text-espresso transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/properties" className="hover:text-espresso transition-colors">
                Properties
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <span className="text-espresso truncate max-w-[180px] sm:max-w-[260px] inline-block align-bottom" aria-current="page">
                {property.title}
              </span>
            </li>
          </ol>
        </nav>

        {/* ============================================================ */}
        {/*  Gallery                                                      */}
        {/* ============================================================ */}
        <Reveal>
          <section aria-label="Property gallery">
            {/* Hero image — full width, 60-70vh */}
            <button
              type="button"
              onClick={() => openLightbox(0)}
              className="relative w-full h-[60vh] sm:h-[65vh] lg:h-[70vh] overflow-hidden cursor-view focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-inset"
              aria-label={`View ${galleryAltTexts[0]}`}
            >
              <Image
                src={galleryImages[0]}
                alt={galleryAltTexts[0]}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
              <div className="absolute bottom-4 right-4 label-micro text-ivory/70 bg-espresso/40 backdrop-blur-sm px-3 py-1.5 rounded-sm">
                {galleryImages.length > 1
                  ? `1 / ${galleryImages.length}`
                  : '1 / 1'}
              </div>
            </button>

            {/* Remaining images — mixed-size editorial grid */}
            {galleryImages.length > 1 && (
              <div className="container-site mt-2">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {/* 2nd image: large (2/3 width) */}
                  {galleryImages[1] && (
                    <button
                      type="button"
                      onClick={() => openLightbox(1)}
                      className="sm:col-span-2 relative aspect-[16/9] overflow-hidden cursor-view focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-inset"
                      aria-label={`View ${galleryAltTexts[1]}`}
                    >
                      <Image
                        src={galleryImages[1]}
                        alt={galleryAltTexts[1]}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 66vw"
                      />
                    </button>
                  )}
                  {/* 3rd image: small (1/3 width) */}
                  {galleryImages[2] && (
                    <button
                      type="button"
                      onClick={() => openLightbox(2)}
                      className="relative aspect-[4/3] overflow-hidden cursor-view focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-inset"
                      aria-label={`View ${galleryAltTexts[2]}`}
                    >
                      <Image
                        src={galleryImages[2]}
                        alt={galleryAltTexts[2]}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    </button>
                  )}
                </div>
              </div>
            )}
          </section>
        </Reveal>

        {/* ============================================================ */}
        {/*  Property Introduction                                         */}
        {/* ============================================================ */}
        <section className="container-site py-16 sm:py-24 lg:py-32 relative z-10">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              {/* Left: Title, description, CTA */}
              <div className="lg:col-span-8 xl:col-span-9">
                {/* Section number */}
                <p className="section-number mb-4">N°{sectionNum}</p>

                {/* Title */}
                <h1 className="heading-property text-espresso mb-3">
                  {property.title}
                </h1>

                {/* Location */}
                <p className="label-micro text-warm-grey mb-6">
                  {property.location}
                </p>

                {/* Price */}
                <p className="font-mono text-2xl sm:text-3xl lg:text-4xl text-espresso tracking-tight mb-8">
                  {property.price}
                </p>

                {/* Metadata grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-0 border-t border-b border-espresso/12 mb-8">
                  {metaItems.map((item) => (
                    <div
                      key={item.label}
                      className="py-4 px-0 sm:px-4 sm:border-r sm:border-espresso/8 first:sm:border-l-0 last:sm:border-r-0"
                    >
                      <p className="label-micro text-warm-grey mb-1">{item.label}</p>
                      <p className="body-copy text-espresso">{item.value}</p>
                    </div>
                  ))}
                </div>

                {/* Short description */}
                <p className="body-copy text-espresso/80 max-w-[640px] mb-10">
                  {property.shortDescription}
                </p>

                {/* CTA row: Enquire + Favorite */}
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={scrollToInquiry}
                    className="btn-primary"
                  >
                    <span>Enquire</span>
                    <ArrowDown size={14} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    aria-pressed={isFavorited}
                    aria-label={
                      isFavorited
                        ? `Remove ${property.title} from favorites`
                        : `Save ${property.title} to favorites`
                    }
                    onClick={toggleFavorite}
                    className="min-h-[48px] min-w-[48px] flex items-center justify-center rounded-full p-2 border border-espresso/12 hover:border-gold/40 transition-colors"
                  >
                    <Heart
                      size={20}
                      className={
                        isFavorited
                          ? 'fill-gold stroke-gold'
                          : 'fill-none stroke-espresso/50'
                      }
                    />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ============================================================ */}
        {/*  Description                                                   */}
        {/* ============================================================ */}
        <hr className="editorial-rule container-site" />
        <section className="py-16 sm:py-20 lg:py-24">
          <Reveal>
            <div className="container-editorial">
              <p className="section-number mb-4">Description</p>
              <div className="body-copy text-espresso/80 space-y-5">
                {property.description.split(/\n\n+/).map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ============================================================ */}
        {/*  Specifications Table                                          */}
        {/* ============================================================ */}
        <hr className="editorial-rule container-site" />
        <section className="py-16 sm:py-20 lg:py-24">
          <Reveal>
            <div className="container-site">
              <p className="section-number mb-4">Specifications</p>
              <h2 className="heading-property text-espresso mb-10">Features & Amenities</h2>

              {/* Specifications grid */}
              <div className="max-w-[900px]">
                {/* Key specs table */}
                <div className="border-t border-espresso/12 mb-12">
                  {metaItems.map((item, i) => (
                    <div
                      key={item.label}
                      className={cn(
                        'grid grid-cols-[140px_1fr] sm:grid-cols-[180px_1fr] items-baseline py-3.5',
                        i < metaItems.length - 1 && 'border-b border-espresso/8'
                      )}
                    >
                      <p className="label-micro text-warm-grey">{item.label}</p>
                      <p className="body-copy text-espresso">{item.value}</p>
                    </div>
                  ))}
                  {property.parking && (
                    <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[180px_1fr] items-baseline py-3.5 border-b border-espresso/8">
                      <p className="label-micro text-warm-grey">Parking</p>
                      <p className="body-copy text-espresso">{property.parking}</p>
                    </div>
                  )}
                </div>

                {/* Features & Amenities in 2-column grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12">
                  {property.features.length > 0 && (
                    <div>
                      <p className="label-micro text-warm-grey mb-4">Key Features</p>
                      <ul className="space-y-0">
                        {property.features.map((feature, i) => (
                          <li
                            key={feature}
                            className={cn(
                              'flex items-baseline gap-3 py-2.5',
                              i < property.features.length - 1 && 'border-b border-espresso/8'
                            )}
                          >
                            <span className="h-1 w-1 rounded-full bg-sand shrink-0 mt-1.5" aria-hidden="true" />
                            <span className="body-copy text-espresso">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {property.amenities.length > 0 && (
                    <div>
                      <p className="label-micro text-warm-grey mb-4">Amenities</p>
                      <ul className="space-y-0">
                        {property.amenities.map((amenity, i) => (
                          <li
                            key={amenity}
                            className={cn(
                              'flex items-baseline gap-3 py-2.5',
                              i < property.amenities.length - 1 && 'border-b border-espresso/8'
                            )}
                          >
                            <span className="h-1 w-1 rounded-full bg-espresso shrink-0 mt-1.5" aria-hidden="true" />
                            <span className="body-copy text-espresso">{amenity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ============================================================ */}
        {/*  Neighborhood                                                  */}
        {/* ============================================================ */}
        {property.neighborhood && (
          <>
            <hr className="editorial-rule container-site" />
            <section className="py-16 sm:py-20 lg:py-24">
              <Reveal>
                <div className="container-editorial">
                  <p className="section-number mb-4">Location</p>
                  <h2 className="heading-property text-espresso mb-6">Neighborhood</h2>
                  <p className="body-copy text-espresso/80">{property.neighborhood}</p>
                </div>
              </Reveal>
            </section>
          </>
        )}

        {/* ============================================================ */}
        {/*  Enquiry Section (Dark)                                        */}
        {/* ============================================================ */}
        <section
          ref={inquiryRef}
          className="bg-espresso py-16 sm:py-20 lg:py-24"
        >
          <Reveal>
            <div className="container-form">
              <div className="text-center mb-10">
                <p className="label-micro text-warm-grey mb-3">Enquire</p>
                <h2 className="heading-property text-ivory mb-3" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
                  Interested in this property?
                </h2>
                <p className="body-copy-light text-ivory/60 max-w-[480px] mx-auto">
                  Leave your details and we will reach out to arrange a private viewing or share more information.
                </p>
              </div>

              {/* Success state */}
              {submitStatus === 'success' ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-gold/40 mb-6">
                    <span className="text-gold text-2xl">✓</span>
                  </div>
                  <h3 className="heading-property text-ivory mb-3">Thank you</h3>
                  <p className="body-copy-light text-ivory/60 max-w-[400px] mx-auto mb-6">
                    We have received your enquiry. We will be in touch.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitStatus('idle')}
                    className="btn-outline"
                  >
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} noValidate className="space-y-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="inquiry-name" className="label-micro text-warm-grey block mb-2">
                      Name <span aria-hidden="true" className="text-gold">*</span>
                    </label>
                    <input
                      id="inquiry-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      className="input-premium"
                      placeholder="Your full name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="inquiry-email" className="label-micro text-warm-grey block mb-2">
                      Email <span aria-hidden="true" className="text-gold">*</span>
                    </label>
                    <input
                      id="inquiry-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className="input-premium"
                      placeholder="you@example.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="inquiry-phone" className="label-micro text-warm-grey block mb-2">
                      Phone <span aria-hidden="true" className="text-gold">*</span>
                    </label>
                    <input
                      id="inquiry-phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      className="input-premium"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="inquiry-message" className="label-micro text-warm-grey block mb-2">
                      Message
                    </label>
                    <textarea
                      id="inquiry-message"
                      rows={4}
                      value={form.message}
                      onChange={(e) => updateField('message', e.target.value)}
                      className="input-premium resize-none"
                      placeholder="Any specific requirements or questions..."
                    />
                  </div>

                  {/* Honeypot — hidden from real users */}
                  <div className="absolute -left-[9999px]" aria-hidden="true">
                    <label htmlFor="inquiry-honey">Do not fill this</label>
                    <input
                      id="inquiry-honey"
                      type="text"
                      name="_honey"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.honey}
                      onChange={(e) => updateField('honey', e.target.value)}
                    />
                  </div>

                  {/* Error message */}
                  {formError && (
                    <div className="flex items-start gap-2 text-sm text-gold" role="alert">
                      <span className="shrink-0 mt-0.5">⚠</span>
                      <span className="body-copy-light">{formError}</span>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitStatus === 'submitting'}
                    className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                  >
                    {submitStatus === 'submitting' ? (
                      <span className="flex items-center gap-2">
                        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-espresso/20 border-t-espresso" />
                        <span>Sending...</span>
                      </span>
                    ) : (
                      <span>Submit Enquiry</span>
                    )}
                  </button>
                  <p className="label-micro text-ivory/25 mt-4">
                    This is a demonstration website. No data is transmitted.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </section>

        {/* ============================================================ */}
        {/*  Similar Properties                                            */}
        {/* ============================================================ */}
        {similarProperties.length > 0 && (
          <>
            <hr className="editorial-rule container-site" />
            <section className="py-16 sm:py-20 lg:py-24">
              <Reveal>
                <div className="container-site">
                  <p className="section-number mb-4">Explore More</p>
                  <h2 className="heading-property text-espresso mb-10">Similar Properties</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                    {similarProperties.map((p) => (
                      <Link
                        key={p.id}
                        href={`/properties/${p.slug}`}
                        className="group block card-line-anim pb-4"
                      >
                        {/* Image */}
                        <div className="relative aspect-[4/3] overflow-hidden mb-5">
                          <Image
                            src={p.heroImage}
                            alt={p.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>

                        {/* Title */}
                        <h3 className="heading-property text-espresso mb-1 group-hover:text-gold transition-colors">
                          {p.title}
                        </h3>

                        {/* Location */}
                        <p className="label-micro text-warm-grey mb-2">{p.location}</p>

                        {/* Price */}
                        <p className="font-mono text-lg text-espresso">{p.price}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </Reveal>
            </section>
          </>
        )}
      </div>

      {/* ============================================================ */}
      {/*  Lightbox Dialog                                               */}
      {/* ============================================================ */}
      <Dialog open={lightboxOpen} onOpenChange={(open) => setLightboxOpen(open)}>
        <DialogContent
          className="max-w-[98vw] sm:max-w-[94vw] lg:max-w-[90vw] p-0 bg-espresso/95 border-none overflow-hidden rounded-none"
          showCloseButton={false}
          onKeyDown={handleLightboxKeyDown}
          aria-label="Image gallery"
        >
          <DialogTitle className="sr-only">
            {property.title} — Photo {lightboxIndex + 1} of {galleryImages.length}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Use left and right arrow keys to navigate through the gallery. Press Escape to close.
          </DialogDescription>

          {/* Close button */}
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 z-10 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-ivory/10 backdrop-blur-sm text-ivory hover:bg-ivory/20 transition-colors"
            aria-label="Close gallery"
          >
            <X size={20} />
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-5 z-10 label-micro text-ivory/60">
            {lightboxIndex + 1} / {galleryImages.length}
          </div>

          {/* Image container */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center">
            <Image
              src={galleryImages[lightboxIndex]}
              alt={galleryAltTexts[lightboxIndex]}
              fill
              className="object-contain"
              sizes="95vw"
              priority
            />
          </div>

          {/* Prev / Next buttons */}
          {galleryImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={lightboxPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-ivory/10 backdrop-blur-sm text-ivory hover:bg-ivory/20 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                onClick={lightboxNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-ivory/10 backdrop-blur-sm text-ivory hover:bg-ivory/20 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* ============================================================ */}
      {/*  Mobile Sticky Action Bar                                      */}
      {/* ============================================================ */}
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 z-40 md:hidden transition-transform duration-300',
          showMobileBar ? 'translate-y-0' : 'translate-y-full'
        )}
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="bg-offwhite/95 backdrop-blur-md border-t border-espresso/10 px-5 py-3 flex items-center justify-between gap-4 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
          <div>
            <p className="font-mono text-lg text-espresso leading-none">{property.price}</p>
            <p className="label-micro text-warm-grey mt-1">{property.bedrooms} Bed · {property.area}</p>
          </div>
          <button
            type="button"
            onClick={scrollToInquiry}
            className="btn-primary"
          >
            Enquire
          </button>
        </div>
      </div>
    </>
  );
}