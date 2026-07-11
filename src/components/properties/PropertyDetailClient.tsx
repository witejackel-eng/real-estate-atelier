'use client';

import { useState, useEffect, useCallback, useRef, useSyncExternalStore } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { Heart, ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { Property } from '@/data/properties';
import { Reveal } from '@/components/shared/Reveal';

/* ═══════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════ */
interface Props {
  property: Property;
  propertyIndex: number;
  similarProperties: Property[];
}

/* ═══════════════════════════════════════════════════
   FAVORITES HELPERS
   ═══════════════════════════════════════════════════ */
function saveFavorites(slugs: string[]) {
  localStorage.setItem('casa-aurelia-favorites', JSON.stringify(slugs));
  window.dispatchEvent(new Event('casa-fav'));
}

const emptyFavArr: string[] = [];

function subscribeFavorites(cb: () => void) {
  window.addEventListener('casa-fav', cb);
  return () => window.removeEventListener('casa-fav', cb);
}

function getFavSnapshot(): string[] {
  try { return JSON.parse(localStorage.getItem('casa-aurelia-favorites') || '[]'); } catch { return []; }
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════ */
export function PropertyDetailClient({
  property,
  propertyIndex,
  similarProperties,
}: Props) {
  const allFavorites = useSyncExternalStore(subscribeFavorites, getFavSnapshot, () => emptyFavArr);
  const isFavorited = allFavorites.includes(property.slug);
  const [showMobileCTA, setShowMobileCTA] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const toggleFavorite = useCallback(() => {
    const favs = getFavSnapshot();
    const next = favs.includes(property.slug)
      ? favs.filter((s) => s !== property.slug)
      : [...favs, property.slug];
    saveFavorites(next);
  }, [property.slug]);

  /* Show mobile CTA after scrolling past hero */
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowMobileCTA(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const images = [property.heroImage, ...property.gallery];
  const propNum = String(propertyIndex + 1).padStart(2, '0');

  return (
    <main>
      {/* ═══ Gallery ═══ */}
      <div ref={heroRef}>
        <Gallery images={images} title={property.title} />
      </div>

      {/* ═══ Property Introduction ═══ */}
      <section className="section-py">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Left — 7 cols */}
            <div className="lg:col-span-7">
              <Reveal>
                <p className="section-number mb-4">N&deg;{propNum}</p>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="heading-property mb-3">{property.title}</h1>
              </Reveal>
              <Reveal delay={120}>
                <p className="label-micro text-muted mb-6">
                  {property.location}
                </p>
              </Reveal>
              <Reveal delay={160}>
                <p className="body-copy">{property.shortDescription}</p>
              </Reveal>
            </div>

            {/* Right — 5 cols: metadata table */}
            <div className="lg:col-span-5">
              <Reveal delay={100}>
                <div className="space-y-0">
                  {/* Price */}
                  <div className="flex justify-between items-baseline py-3 border-b border-ink/[0.06]">
                    <span className="label-micro text-muted">Price</span>
                    <span className="display-section text-xl md:text-2xl">
                      {property.price}
                    </span>
                  </div>
                  {/* Type */}
                  <div className="flex justify-between items-baseline py-3 border-b border-ink/[0.06]">
                    <span className="label-micro text-muted">Type</span>
                    <span className="body-copy">{property.type}</span>
                  </div>
                  {/* Bedrooms */}
                  <div className="flex justify-between items-baseline py-3 border-b border-ink/[0.06]">
                    <span className="label-micro text-muted">Bedrooms</span>
                    <span className="body-copy">{property.bedrooms}</span>
                  </div>
                  {/* Bathrooms */}
                  <div className="flex justify-between items-baseline py-3 border-b border-ink/[0.06]">
                    <span className="label-micro text-muted">Bathrooms</span>
                    <span className="body-copy">{property.bathrooms}</span>
                  </div>
                  {/* Area */}
                  <div className="flex justify-between items-baseline py-3 border-b border-ink/[0.06]">
                    <span className="label-micro text-muted">Area</span>
                    <span className="body-copy">{property.area}</span>
                  </div>
                  {/* Possession */}
                  <div className="flex justify-between items-baseline py-3 border-b border-ink/[0.06]">
                    <span className="label-micro text-muted">Possession</span>
                    <span className="body-copy">{property.possession}</span>
                  </div>
                </div>
              </Reveal>

              {/* CTA buttons */}
              <Reveal delay={180}>
                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                  <a
                    href="#enquiry"
                    className="btn-primary text-center no-underline"
                  >
                    Enquire about this property
                  </a>
                  <button
                    onClick={toggleFavorite}
                    className={`btn-outline-dark gap-2 ${
                      isFavorited ? 'border-brass text-brass' : ''
                    }`}
                    type="button"
                    aria-label={
                      isFavorited
                        ? `Remove ${property.title} from favorites`
                        : `Save ${property.title} to favorites`
                    }
                  >
                    <Heart
                      size={14}
                      className={
                        isFavorited
                          ? 'fill-brass stroke-brass'
                          : 'fill-none stroke-ink'
                      }
                    />
                    {isFavorited ? 'Saved' : 'Save'}
                  </button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Description ═══ */}
      <section className="pb-[clamp(3rem,6vw,6rem)]">
        <div className="container-editorial">
          <Reveal>
            <div>
              <hr className="rule mb-8" />
              <p className="body-copy">{property.description}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ Features & Amenities ═══ */}
      <section className="pb-[clamp(4rem,8vw,8rem)]">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Features */}
            <Reveal>
              <div>
                <p className="section-number mb-3">N&deg;{propNum}A</p>
                <h2 className="heading-sub mb-6">Features</h2>
                <div>
                  {property.features.map((f, i) => (
                    <div key={f}>
                      {i > 0 && <hr className="rule-light" />}
                      <p className="body-copy py-3">{f}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Amenities */}
            <Reveal delay={100}>
              <div>
                <p className="section-number mb-3">N&deg;{propNum}B</p>
                <h2 className="heading-sub mb-6">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-0">
                  {property.amenities.map((a, i) => (
                    <div key={a} className={i > 0 ? 'pt-3 border-t border-ink/[0.06]' : 'pt-3'}>
                      <p className="body-copy text-sm">{a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ Neighborhood ═══ */}
      <section className="pb-[clamp(4rem,8vw,8rem)]">
        <div className="container-site">
          <Reveal>
            <div>
              <p className="section-number mb-3">N&deg;{propNum}C</p>
              <h2 className="heading-property mb-6">The Neighborhood</h2>
              <div className="max-w-3xl">
                <p className="body-copy">{property.neighborhood}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ Enquiry Section ═══ */}
      <section
        id="enquiry"
        className="section-py"
        style={{ backgroundColor: 'var(--color-ink)' }}
      >
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left — copy */}
            <Reveal>
              <div className="flex flex-col justify-center">
                <p className="section-number mb-4" style={{ color: 'var(--color-muted)' }}>
                  Enquire
                </p>
                <h2 className="display-section text-white mb-6">
                  Enquire about {property.title}
                </h2>
                <p className="body-copy-light mb-4">
                  Our advisory team will reach out within 24 hours with detailed
                  information, floor plans, and scheduling options for a private
                  viewing.
                </p>
                <p className="label-micro" style={{ color: 'rgba(244,240,232,0.25)' }}>
                  Your information is kept strictly confidential.
                </p>
              </div>
            </Reveal>

            {/* Right — form */}
            <Reveal delay={120}>
              <EnquiryForm propertySlug={property.slug} />
            </Reveal>
          </div>

          {/* Demo disclaimer */}
          <Reveal delay={200}>
            <p
              className="label-micro text-center mt-12"
              style={{ color: 'rgba(244,240,232,0.2)' }}
            >
              This is a demonstration website. No real data is collected or stored.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ Similar Properties ═══ */}
      {similarProperties.length > 0 && (
        <section className="section-py">
          <div className="container-site">
            <Reveal>
              <p className="section-number mb-3">Explore</p>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="heading-sub mb-10">Similar Properties</h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {similarProperties.map((sp, i) => (
                <Reveal key={sp.slug} delay={i * 80}>
                  <Link
                    href={`/properties/${sp.slug}`}
                    className="group block card-line-anim border-b border-ink/[0.06] pb-5"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-4">
                      <Image
                        src={sp.heroImage}
                        alt={sp.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="heading-property mb-1">{sp.title}</h3>
                    <p className="label-micro text-muted mb-3">{sp.location}</p>
                    <p className="font-mono font-medium text-sm">{sp.price}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ Mobile Sticky CTA ═══ */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 z-[140] transition-transform duration-300 ${
          showMobileCTA ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{
          backgroundColor: 'var(--color-ink)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <div className="container-site py-3">
          <a
            href="#enquiry"
            className="btn-primary w-full text-center no-underline block"
          >
            Enquire
          </a>
        </div>
      </div>
    </main>
  );
}

/* ═══════════════════════════════════════════════════
   GALLERY (embla-carousel-react)
   ═══════════════════════════════════════════════════ */
function Gallery({ images, title }: { images: string[]; title: string }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [thumbRef, thumbApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  /* Sync selected index */
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  /* Scroll to slide on thumbnail click */
  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
      thumbApi?.scrollTo(index);
    },
    [emblaApi, thumbApi]
  );

  /* Keyboard nav */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxOpen) return; // lightbox handles its own keys
      if (e.key === 'ArrowLeft') scrollPrev();
      if (e.key === 'ArrowRight') scrollNext();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [scrollPrev, scrollNext, lightboxOpen]);

  return (
    <>
      {/* Main carousel */}
      <div className="pt-[var(--header-h)]">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {images.map((src, i) => (
              <div key={i} className="flex-none w-full">
                <button
                  type="button"
                  className="w-full block cursor-zoom-in focus-visible:outline-brass"
                  aria-label={`View image ${i + 1} of ${images.length}`}
                  onClick={() => {
                    setSelectedIndex(i);
                    setLightboxOpen(true);
                  }}
                >
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src={src}
                      alt={`${title} - image ${i + 1}`}
                      fill
                      sizes="100vw"
                      className="object-cover"
                      priority={i === 0}
                    />
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel controls */}
        <div className="container-site flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={scrollPrev}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center border border-ink/[0.12] rounded-sm hover:bg-ink/[0.04] transition-colors"
              aria-label="Previous image"
              type="button"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={scrollNext}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center border border-ink/[0.12] rounded-sm hover:bg-ink/[0.04] transition-colors"
              aria-label="Next image"
              type="button"
            >
              <ChevronRight size={18} />
            </button>
          </div>
          <p className="label-micro text-muted">
            {selectedIndex + 1} / {images.length}
          </p>
        </div>

        {/* Thumbnail strip */}
        <div className="container-site pb-6">
          <div ref={thumbRef} className="overflow-hidden">
            <div className="flex gap-2">
              {images.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollTo(i)}
                  className={`flex-none w-20 h-14 sm:w-24 sm:h-16 relative rounded-sm overflow-hidden border-2 transition-colors ${
                    i === selectedIndex
                      ? 'border-brass'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                >
                  <Image
                    src={src}
                    alt={`${title} thumbnail ${i + 1}`}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Lightbox ═══ */}
      {lightboxOpen && (
        <Lightbox
          images={images}
          title={title}
          initialIndex={selectedIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════
   LIGHTBOX (custom, no Radix)
   ═══════════════════════════════════════════════════ */
function Lightbox({
  images,
  title,
  initialIndex,
  onClose,
}: {
  images: string[];
  title: string;
  initialIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(initialIndex);

  const prev = useCallback(() => {
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }, [images.length]);

  const next = useCallback(() => {
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  /* Keyboard */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', handleKey);
    /* Lock scroll */
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, prev, next]);

  return (
    <div
      className="fixed inset-0 z-[500] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(24,19,16,0.95)' }}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 min-h-[44px] min-w-[44px] flex items-center justify-center text-white/50 hover:text-white transition-colors"
        aria-label="Close lightbox"
        type="button"
      >
        <X size={24} />
      </button>

      {/* Prev */}
      <button
        onClick={prev}
        className="absolute left-4 z-10 min-h-[44px] min-w-[44px] flex items-center justify-center text-white/40 hover:text-white transition-colors"
        aria-label="Previous image"
        type="button"
      >
        <ChevronLeft size={32} />
      </button>

      {/* Image */}
      <div className="relative w-full h-full max-w-6xl max-h-[85vh] px-16">
        <Image
          src={images[index]}
          alt={`${title} - image ${index + 1}`}
          fill
          sizes="100vw"
          className="object-contain"
          priority
        />
      </div>

      {/* Next */}
      <button
        onClick={next}
        className="absolute right-4 z-10 min-h-[44px] min-w-[44px] flex items-center justify-center text-white/40 hover:text-white transition-colors"
        aria-label="Next image"
        type="button"
      >
        <ChevronRight size={32} />
      </button>

      {/* Counter */}
      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 label-micro text-white/40">
        {index + 1} / {images.length}
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   ENQUIRY FORM
   ═══════════════════════════════════════════════════ */
function EnquiryForm({ propertySlug }: { propertySlug: string }) {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setFormState('loading');
      setErrorMsg('');

      const form = e.currentTarget;
      const data = new FormData(form);
      const body: Record<string, string> = {
        formType: 'property-inquiry',
        propertySlug,
        name: (data.get('name') as string) || '',
        email: (data.get('email') as string) || '',
        phone: (data.get('phone') as string) || '',
        message: (data.get('message') as string) || '',
        _honey: (data.get('_honey') as string) || '',
      };

      try {
        const res = await fetch('/api/inquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          const json = await res.json().catch(() => ({}));
          throw new Error(
            (json as { error?: string }).error || 'Something went wrong.'
          );
        }

        setFormState('success');
        form.reset();
      } catch (err) {
        setErrorMsg(
          err instanceof Error ? err.message : 'Something went wrong.'
        );
        setFormState('error');
      }
    },
    [propertySlug]
  );

  if (formState === 'success') {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <p className="display-section text-white mb-3">Thank you</p>
          <p className="body-copy-light" style={{ color: 'rgba(244,240,232,0.6)' }}>
            We have received your enquiry and will be in touch shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot */}
      <div aria-hidden="true" className="absolute opacity-0 h-0 w-0 overflow-hidden">
        <label htmlFor="honey-field">Do not fill this</label>
        <input
          type="text"
          id="honey-field"
          name="_honey"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="enq-name" className="label-micro block mb-2" style={{ color: 'rgba(244,240,232,0.4)' }}>
          Name
        </label>
        <input
          type="text"
          id="enq-name"
          name="name"
          required
          minLength={2}
          placeholder="Your full name"
          className="input-premium"
        />
      </div>

      <div>
        <label htmlFor="enq-email" className="label-micro block mb-2" style={{ color: 'rgba(244,240,232,0.4)' }}>
          Email
        </label>
        <input
          type="email"
          id="enq-email"
          name="email"
          required
          placeholder="you@example.com"
          className="input-premium"
        />
      </div>

      <div>
        <label htmlFor="enq-phone" className="label-micro block mb-2" style={{ color: 'rgba(244,240,232,0.4)' }}>
          Phone
        </label>
        <input
          type="tel"
          id="enq-phone"
          name="phone"
          placeholder="+91 98765 43210"
          className="input-premium"
        />
      </div>

      <div>
        <label htmlFor="enq-message" className="label-micro block mb-2" style={{ color: 'rgba(244,240,232,0.4)' }}>
          Message
        </label>
        <textarea
          id="enq-message"
          name="message"
          rows={4}
          placeholder="Tell us what you are looking for..."
          className="input-premium resize-none"
        />
      </div>

      {formState === 'error' && errorMsg && (
        <p className="text-sm" style={{ color: '#E8916D' }}>
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={formState === 'loading'}
        className="btn-primary w-full"
      >
        {formState === 'loading' ? 'Sending...' : 'Send Enquiry'}
      </button>
    </form>
  );
}