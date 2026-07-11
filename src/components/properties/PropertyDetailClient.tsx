'use client';

import { useState, useCallback, useEffect, useRef, type FormEvent, type KeyboardEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ChevronLeft, ChevronRight, Phone, X, CheckCircle2, AlertCircle, MapPin, Bed, Bath, Maximize, Car, CalendarClock } from 'lucide-react';
import type { Property } from '@/data/properties';
import { cn, formatPrice, formatPriceFull } from '@/lib/utils';
import { Container } from '@/components/shared/Container';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { Button } from '@/components/shared/Button';
import { Reveal } from '@/components/shared/Reveal';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { Separator } from '@/components/ui/separator';
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
/*  EMI Calculation                                                    */
/* ------------------------------------------------------------------ */

function calcEMI(principal: number, annualRate: number, tenureYears: number): number {
  const r = annualRate / 12 / 100;
  const n = tenureYears * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function PropertyDetailClient({ property, similarProperties }: PropertyDetailClientProps) {
  /* ---- Gallery state ---- */
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const galleryImages = [property.heroImage, ...property.gallery];

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
    },
    [lightboxPrev, lightboxNext]
  );

  /* ---- Favorite state ---- */
  const [isFavorited, setIsFavorited] = useState(false);

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

    // Client-side validation
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
          propertyId: property.id,
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

  /* ---- EMI Calculator state ---- */
  const [emiDownPayment, setEmiDownPayment] = useState(Math.round(property.priceNumber * 0.2));
  const [emiRate, setEmiRate] = useState(8.5);
  const [emiTenure, setEmiTenure] = useState(20);

  const emiLoan = property.priceNumber - emiDownPayment;
  const emiMonthly = calcEMI(emiLoan, emiRate, emiTenure);
  const emiTotalInterest = emiMonthly * emiTenure * 12 - emiLoan;
  const emiTotalPayment = emiLoan + emiTotalInterest;

  /* ---- Mobile CTA scroll handler ---- */
  const scrollToInquiry = () => {
    inquiryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /* ---- Mobile action bar visibility (hide near footer) ---- */
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
    `${property.title} - Main view`,
    ...property.gallery.map((_, i) => `${property.title} - Photo ${i + 2}`),
  ];

  /* ---- Grid classes for similar properties ---- */
  const similarGridClass = cn(
    'grid gap-6',
    similarProperties.length === 1 && 'grid-cols-1',
    similarProperties.length === 2 && 'grid-cols-1 sm:grid-cols-2',
    similarProperties.length >= 3 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
  );

  return (
    <>
      <div className="pb-20 md:pb-0">
        {/* ============================================================ */}
        {/*  Breadcrumb                                                   */}
        {/* ============================================================ */}
        <Container variant="main">
          <nav aria-label="Breadcrumb" className="pt-6 pb-4">
            <ol className="flex items-center gap-1.5 text-sm text-espresso/50 font-body">
              <li>
                <Link href="/" className="hover:text-espresso transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-espresso/20">/</li>
              <li>
                <Link href="/properties" className="hover:text-espresso transition-colors">
                  Properties
                </Link>
              </li>
              <li aria-hidden="true" className="text-espresso/20">/</li>
              <li>
                <span className="text-espresso truncate max-w-[200px] sm:max-w-xs inline-block align-bottom" aria-current="page">
                  {property.title}
                </span>
              </li>
            </ol>
          </nav>
        </Container>

        {/* ============================================================ */}
        {/*  Gallery                                                      */}
        {/* ============================================================ */}
        <Container variant="main">
          <Reveal>
            {/* Desktop Gallery */}
            <div className="hidden md:grid md:grid-cols-3 gap-2 mb-8">
              {/* Main image — 2/3 */}
              <button
                type="button"
                onClick={() => openLightbox(0)}
                className="col-span-2 relative aspect-[16/10] overflow-hidden rounded-sm cursor-pointer focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
                aria-label={`View ${galleryAltTexts[0]}`}
              >
                <Image
                  src={galleryImages[0]}
                  alt={galleryAltTexts[0]}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 66vw"
                  
                />
              </button>

              {/* Stacked smaller images — 1/3 */}
              <div className="grid grid-rows-2 gap-2">
                {galleryImages.slice(1, 3).map((img, i) => (
                  <button
                    key={img + i}
                    type="button"
                    onClick={() => openLightbox(i + 1)}
                    className="relative aspect-[4/3] overflow-hidden rounded-sm cursor-pointer focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
                    aria-label={`View ${galleryAltTexts[i + 1]}`}
                  >
                    <Image
                      src={img}
                      alt={galleryAltTexts[i + 1]}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </button>
                ))}
                {/* If there are more than 3 images, show a "+N" overlay on the last thumbnail */}
                {galleryImages.length > 3 && (
                  <button
                    type="button"
                    onClick={() => openLightbox(3)}
                    className="absolute inset-0 flex items-center justify-center bg-charcoal/60 text-offwhite font-mono text-sm tracking-wider hover:bg-charcoal/70 transition-colors"
                    aria-label={`View ${galleryImages.length - 3} more photos`}
                  >
                    +{galleryImages.length - 3} more
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Gallery — single image */}
            <div className="md:hidden relative aspect-[4/3] overflow-hidden rounded-sm mb-8">
              <Image
                src={galleryImages[0]}
                alt={galleryAltTexts[0]}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
              {galleryImages.length > 1 && (
                <button
                  type="button"
                  onClick={() => openLightbox(0)}
                  className="absolute bottom-3 right-3 bg-charcoal/60 backdrop-blur-sm text-offwhite text-xs font-mono px-3 py-1.5 rounded-sm hover:bg-charcoal/80 transition-colors min-h-[44px] flex items-center"
                  aria-label={`View all ${galleryImages.length} photos`}
                >
                  1 / {galleryImages.length}
                </button>
              )}
            </div>
          </Reveal>
        </Container>

        {/* ============================================================ */}
        {/*  Property Identity Section                                    */}
        {/* ============================================================ */}
        <Container variant="main">
          <Reveal>
            <div className="mb-8">
              {/* Top row: type badge + favorite */}
              <div className="flex items-center justify-between mb-3">
                <span className="inline-block font-mono text-xs uppercase tracking-[0.1em] text-gold border border-gold/20 px-3 py-1 rounded-sm">
                  {property.type}
                </span>
                <button
                  type="button"
                  aria-label={isFavorited ? `Remove ${property.title} from favorites` : `Save ${property.title} to favorites`}
                  onClick={() => setIsFavorited(!isFavorited)}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full p-2 border border-espresso/10 hover:border-gold/30 transition-colors"
                >
                  <Heart
                    size={20}
                    className={isFavorited ? 'fill-terracotta stroke-terracotta' : 'fill-none stroke-espresso/60'}
                  />
                </button>
              </div>

              {/* Title */}
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-espresso leading-tight mb-2">
                {property.title}
              </h1>

              {/* Location */}
              <div className="flex items-center gap-1.5 text-espresso/60 mb-4">
                <MapPin size={16} className="text-gold" aria-hidden="true" />
                <span className="text-sm font-body">
                  {property.location}, {property.city}
                </span>
              </div>

              {/* Price + Possession */}
              <div className="flex flex-wrap items-baseline gap-4 mb-6">
                <span className="font-mono text-2xl sm:text-3xl text-espresso">
                  {property.price}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.1em] text-espresso/50 border border-espresso/10 px-2.5 py-1 rounded-sm">
                  {property.possession}
                </span>
              </div>

              {/* Compact facts strip */}
              <div className="flex flex-wrap items-center gap-0 text-sm border-t border-espresso/10 pt-4">
                <div className="flex items-center gap-1.5 px-4 border-r border-espresso/10">
                  <Bed size={16} className="text-gold" aria-hidden="true" />
                  <span className="font-body text-espresso/80">
                    {property.bedrooms} {property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-4 border-r border-espresso/10">
                  <Bath size={16} className="text-gold" aria-hidden="true" />
                  <span className="font-body text-espresso/80">
                    {property.bathrooms} {property.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-4 border-r border-espresso/10">
                  <Maximize size={16} className="text-gold" aria-hidden="true" />
                  <span className="font-body text-espresso/80">{property.area}</span>
                </div>
                <div className="flex items-center gap-1.5 px-4 border-r border-espresso/10">
                  <Car size={16} className="text-gold" aria-hidden="true" />
                  <span className="font-body text-espresso/80">{property.parking}</span>
                </div>
                <div className="flex items-center gap-1.5 px-4">
                  <CalendarClock size={16} className="text-gold" aria-hidden="true" />
                  <span className="font-body text-espresso/80">{property.possession}</span>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>

        <Separator className="max-w-[1360px] mx-auto w-[calc(100%-2.5rem)] sm:w-[calc(100%-3rem)] lg:w-[calc(100%-8rem)]" />

        {/* ============================================================ */}
        {/*  Main Content: 8/4 Grid                                       */}
        {/* ============================================================ */}
        <Container variant="main">
          <div className="py-10 lg:py-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">

            {/* ---- LEFT COLUMN ---- */}
            <div className="lg:col-span-8 space-y-12">

              {/* Description */}
              <Reveal>
                <section>
                  <SectionLabel>Overview</SectionLabel>
                  <h2 className="font-display text-2xl sm:text-3xl text-espresso mt-2 mb-4">Description</h2>
                  <div className="body-text text-espresso/80 leading-relaxed">
                    <p>{property.description}</p>
                  </div>
                </section>
              </Reveal>

              {/* Features */}
              {property.features.length > 0 && (
                <Reveal>
                  <section>
                    <SectionLabel>Details</SectionLabel>
                    <h2 className="font-display text-2xl sm:text-3xl text-espresso mt-2 mb-4">Key Features</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {property.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-espresso/80 font-body">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold shrink-0" aria-hidden="true" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </section>
                </Reveal>
              )}

              {/* Amenities */}
              {property.amenities.length > 0 && (
                <Reveal>
                  <section>
                    <SectionLabel>Lifestyle</SectionLabel>
                    <h2 className="font-display text-2xl sm:text-3xl text-espresso mt-2 mb-4">Amenities</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {property.amenities.map((amenity) => (
                        <li key={amenity} className="flex items-start gap-2 text-sm text-espresso/80 font-body">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold shrink-0" aria-hidden="true" />
                          {amenity}
                        </li>
                      ))}
                    </ul>
                  </section>
                </Reveal>
              )}

              {/* Neighborhood */}
              {property.neighborhood && (
                <Reveal>
                  <section>
                    <SectionLabel>Location</SectionLabel>
                    <h2 className="font-display text-2xl sm:text-3xl text-espresso mt-2 mb-4">Neighborhood</h2>
                    <p className="body-text text-espresso/80 leading-relaxed">{property.neighborhood}</p>
                  </section>
                </Reveal>
              )}

              {/* EMI Calculator */}
              <Reveal>
                <section>
                  <SectionLabel>Finance</SectionLabel>
                  <h2 className="font-display text-2xl sm:text-3xl text-espresso mt-2 mb-6">EMI Calculator</h2>

                  <div className="border border-espresso/10 rounded-sm p-5 sm:p-6 bg-offwhite">
                    {/* Property Price (display) */}
                    <div className="mb-5">
                      <label className="block text-xs font-mono uppercase tracking-[0.1em] text-espresso/50 mb-1.5">
                        Property Price
                      </label>
                      <p className="font-mono text-lg text-espresso">{formatPriceFull(property.priceNumber)}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
                      {/* Down Payment */}
                      <div>
                        <label htmlFor="emi-down-payment" className="block text-xs font-mono uppercase tracking-[0.1em] text-espresso/50 mb-1.5">
                          Down Payment
                        </label>
                        <input
                          id="emi-down-payment"
                          type="number"
                          value={emiDownPayment}
                          onChange={(e) => {
                            const v = parseInt(e.target.value) || 0;
                            setEmiDownPayment(Math.min(v, property.priceNumber));
                          }}
                          className="w-full border border-espresso/15 bg-transparent px-3 py-2.5 text-sm font-mono text-espresso rounded-sm focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-1 focus-visible:ring-offset-offwhite focus-visible:outline-none"
                        />
                        <span className="text-xs text-espresso/40 font-mono mt-1 block">
                          {formatPrice(emiDownPayment)} ({((emiDownPayment / property.priceNumber) * 100).toFixed(0)}%)
                        </span>
                      </div>

                      {/* Interest Rate */}
                      <div>
                        <label htmlFor="emi-rate" className="block text-xs font-mono uppercase tracking-[0.1em] text-espresso/50 mb-1.5">
                          Interest Rate (% p.a.)
                        </label>
                        <input
                          id="emi-rate"
                          type="number"
                          step="0.1"
                          min="1"
                          max="30"
                          value={emiRate}
                          onChange={(e) => setEmiRate(parseFloat(e.target.value) || 8.5)}
                          className="w-full border border-espresso/15 bg-transparent px-3 py-2.5 text-sm font-mono text-espresso rounded-sm focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-1 focus-visible:ring-offset-offwhite focus-visible:outline-none"
                        />
                      </div>

                      {/* Tenure */}
                      <div>
                        <label htmlFor="emi-tenure" className="block text-xs font-mono uppercase tracking-[0.1em] text-espresso/50 mb-1.5">
                          Tenure (Years)
                        </label>
                        <input
                          id="emi-tenure"
                          type="number"
                          min="5"
                          max="30"
                          value={emiTenure}
                          onChange={(e) => {
                            let v = parseInt(e.target.value) || 20;
                            v = Math.max(5, Math.min(30, v));
                            setEmiTenure(v);
                          }}
                          className="w-full border border-espresso/15 bg-transparent px-3 py-2.5 text-sm font-mono text-espresso rounded-sm focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-1 focus-visible:ring-offset-offwhite focus-visible:outline-none"
                        />
                      </div>
                    </div>

                    {/* Results */}
                    <div className="border-t border-espresso/10 pt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs font-mono uppercase tracking-[0.1em] text-espresso/40 mb-1">Monthly EMI</p>
                        <p className="font-mono text-lg text-espresso">{formatPriceFull(Math.round(emiMonthly))}</p>
                      </div>
                      <div>
                        <p className="text-xs font-mono uppercase tracking-[0.1em] text-espresso/40 mb-1">Total Interest</p>
                        <p className="font-mono text-lg text-terracotta">{formatPriceFull(Math.round(emiTotalInterest))}</p>
                      </div>
                      <div>
                        <p className="text-xs font-mono uppercase tracking-[0.1em] text-espresso/40 mb-1">Total Payment</p>
                        <p className="font-mono text-lg text-espresso">{formatPriceFull(Math.round(emiTotalPayment))}</p>
                      </div>
                    </div>

                    {/* Disclaimer */}
                    <p className="text-xs text-espresso/40 font-body mt-4 leading-relaxed">
                      This is an indicative estimate and not a loan offer.
                    </p>
                  </div>
                </section>
              </Reveal>
            </div>

            {/* ---- RIGHT COLUMN: Sticky Inquiry Card ---- */}
            <div className="lg:col-span-4">
              <div
                ref={inquiryRef}
                className="lg:sticky lg:top-8 space-y-6"
              >
                <Reveal direction="none">
                  <div className="border border-espresso/10 rounded-sm p-6 bg-offwhite">
                    {/* Card header */}
                    <div className="mb-5">
                      <SectionLabel>Inquire</SectionLabel>
                      <h2 className="font-display text-xl text-espresso mt-1 mb-2">Request a Private Viewing</h2>
                      <p className="font-mono text-lg text-espresso">{property.price}</p>
                    </div>

                    {/* Success state */}
                    {submitStatus === 'success' ? (
                      <div className="flex flex-col items-center text-center py-6">
                        <CheckCircle2 size={40} className="text-gold mb-3" />
                        <h3 className="font-display text-lg text-espresso mb-1">Inquiry Sent</h3>
                        <p className="text-sm text-espresso/60 font-body">
                          We&apos;ll get back to you shortly about {property.title}.
                        </p>
                        <button
                          type="button"
                          onClick={() => setSubmitStatus('idle')}
                          className="mt-4 text-xs font-mono uppercase tracking-[0.1em] text-gold hover:text-terracotta transition-colors"
                        >
                          Send another inquiry
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleInquirySubmit} noValidate className="space-y-4">
                        {/* Name */}
                        <div>
                          <label htmlFor="inquiry-name" className="block text-xs font-mono uppercase tracking-[0.1em] text-espresso/60 mb-1.5">
                            Name <span aria-hidden="true" className="text-terracotta">*</span>
                          </label>
                          <input
                            id="inquiry-name"
                            type="text"
                            required
                            value={form.name}
                            onChange={(e) => updateField('name', e.target.value)}
                            className="w-full border border-espresso/15 bg-transparent px-3 py-2.5 text-sm font-body text-espresso rounded-sm focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-1 focus-visible:ring-offset-offwhite focus-visible:outline-none placeholder:text-espresso/30"
                            placeholder="Your full name"
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label htmlFor="inquiry-email" className="block text-xs font-mono uppercase tracking-[0.1em] text-espresso/60 mb-1.5">
                            Email <span aria-hidden="true" className="text-terracotta">*</span>
                          </label>
                          <input
                            id="inquiry-email"
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => updateField('email', e.target.value)}
                            className="w-full border border-espresso/15 bg-transparent px-3 py-2.5 text-sm font-body text-espresso rounded-sm focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-1 focus-visible:ring-offset-offwhite focus-visible:outline-none placeholder:text-espresso/30"
                            placeholder="you@example.com"
                          />
                        </div>

                        {/* Phone */}
                        <div>
                          <label htmlFor="inquiry-phone" className="block text-xs font-mono uppercase tracking-[0.1em] text-espresso/60 mb-1.5">
                            Phone <span aria-hidden="true" className="text-terracotta">*</span>
                          </label>
                          <input
                            id="inquiry-phone"
                            type="tel"
                            required
                            value={form.phone}
                            onChange={(e) => updateField('phone', e.target.value)}
                            className="w-full border border-espresso/15 bg-transparent px-3 py-2.5 text-sm font-body text-espresso rounded-sm focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-1 focus-visible:ring-offset-offwhite focus-visible:outline-none placeholder:text-espresso/30"
                            placeholder="+91 98765 43210"
                          />
                        </div>

                        {/* Message */}
                        <div>
                          <label htmlFor="inquiry-message" className="block text-xs font-mono uppercase tracking-[0.1em] text-espresso/60 mb-1.5">
                            Message
                          </label>
                          <textarea
                            id="inquiry-message"
                            rows={3}
                            value={form.message}
                            onChange={(e) => updateField('message', e.target.value)}
                            className="w-full border border-espresso/15 bg-transparent px-3 py-2.5 text-sm font-body text-espresso rounded-sm resize-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-1 focus-visible:ring-offset-offwhite focus-visible:outline-none placeholder:text-espresso/30"
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
                          <div className="flex items-start gap-2 text-sm text-terracotta" role="alert">
                            <AlertCircle size={16} className="shrink-0 mt-0.5" />
                            <span>{formError}</span>
                          </div>
                        )}

                        {/* Submit */}
                        <Button
                          type="submit"
                          variant="primary"
                          size="lg"
                          disabled={submitStatus === 'submitting'}
                          className="w-full"
                        >
                          {submitStatus === 'submitting' ? (
                            <span className="flex items-center justify-center gap-2">
                              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-offwhite/30 border-t-offwhite" />
                              Sending...
                            </span>
                          ) : (
                            'Request a Private Viewing'
                          )}
                        </Button>

                        {/* Privacy note */}
                        <p className="text-xs text-espresso/40 font-body leading-relaxed text-center">
                          By submitting, you agree to our{' '}
                          <Link href="/privacy" className="underline underline-gold/40 underline-offset-2 hover:decoration-gold transition-colors">
                            Privacy Policy
                          </Link>
                          . We&apos;ll never share your data.
                        </p>
                      </form>
                    )}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </Container>

        {/* ============================================================ */}
        {/*  Similar Properties                                           */}
        {/* ============================================================ */}
        {similarProperties.length > 0 && (
          <Container variant="main">
            <Reveal>
              <section className="section-py border-t border-espresso/10">
                <SectionLabel>Explore More</SectionLabel>
                <h2 className="font-display text-2xl sm:text-3xl text-espresso mt-2 mb-8">Similar Properties</h2>
                <div className={similarGridClass}>
                  {similarProperties.map((p) => (
                    <PropertyCard key={p.id} property={p} />
                  ))}
                </div>
              </section>
            </Reveal>
          </Container>
        )}
      </div>

      {/* ============================================================ */}
      {/*  Lightbox Dialog                                               */}
      {/* ============================================================ */}
      <Dialog open={lightboxOpen} onOpenChange={(open) => setLightboxOpen(open)}>
        <DialogContent
          className="max-w-[95vw] sm:max-w-[90vw] lg:max-w-[85vw] p-0 bg-charcoal border-charcoal overflow-hidden"
          showCloseButton={false}
          onKeyDown={handleLightboxKeyDown}
          aria-label="Image gallery"
        >
          <DialogTitle className="sr-only">
            {property.title} — Photo {lightboxIndex + 1} of {galleryImages.length}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Use left and right arrow keys to navigate through the gallery.
          </DialogDescription>

          {/* Close button */}
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-3 right-3 z-10 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-charcoal/60 backdrop-blur-sm text-offwhite hover:bg-charcoal/80 transition-colors"
            aria-label="Close gallery"
          >
            <X size={20} />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-4 z-10 font-mono text-xs text-offwhite/70 bg-charcoal/50 backdrop-blur-sm px-3 py-1 rounded-sm">
            {lightboxIndex + 1} / {galleryImages.length}
          </div>

          {/* Image container */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9]">
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
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-charcoal/50 backdrop-blur-sm text-offwhite hover:bg-charcoal/70 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                onClick={lightboxNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-charcoal/50 backdrop-blur-sm text-offwhite hover:bg-charcoal/70 transition-colors"
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
        <div className="bg-offwhite/95 backdrop-blur-md border-t border-espresso/10 px-5 py-3 flex items-center gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
          <Button
            variant="primary"
            size="md"
            onClick={scrollToInquiry}
            className="flex-1"
          >
            Request a Viewing
          </Button>
          <button
            type="button"
            onClick={scrollToInquiry}
            className="flex items-center gap-2 px-4 py-3 text-sm font-mono uppercase tracking-[0.1em] text-espresso/60 hover:text-espresso transition-colors min-h-[44px]"
            aria-label="Call to inquire"
          >
            <Phone size={16} aria-hidden="true" />
            Call
          </button>
        </div>
      </div>
    </>
  );
}