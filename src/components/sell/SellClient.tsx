'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Loader2, ArrowRight } from 'lucide-react';
import { cities, propertyTypes } from '@/data/properties';
import { PageHero } from '@/components/shared/PageHero';
import { SectionHeader } from '@/components/shared/SectionHeader';

/* ────────────────────────────────────────────
   Inline RevealDiv
   ──────────────────────────────────────────── */
function RevealDiv({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: '-40px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(16px)',
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ────────────────────────────────────────────
   Data
   ──────────────────────────────────────────── */
const presentationPoints = [
  {
    title: 'Photography that reflects reality',
    body: 'We photograph every property ourselves. The images you see are the spaces you visit — no wide-angle distortion, no misleading staging.',
  },
  {
    title: 'Writing that respects the buyer',
    body: 'Property descriptions are factual and specific. We describe what is actually there, not what marketing copy demands.',
  },
  {
    title: 'Pricing grounded in the market',
    body: 'We analyze comparable transactions and provide a recommended price range based on data, not aspiration.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Understand',
    description: 'We assess your property\'s market position through comparable analysis and an honest conversation about your expectations.',
  },
  {
    number: '02',
    title: 'Prepare',
    description: 'Professional photography, strategic staging advice, and copywriting that presents your property accurately.',
  },
  {
    number: '03',
    title: 'Market',
    description: 'Targeted exposure to qualified buyers through our platform and network. We coordinate and attend every viewing.',
  },
  {
    number: '04',
    title: 'Negotiate',
    description: 'Structured offer management, negotiation support, and coordination through to registration and handover.',
  },
  {
    number: '05',
    title: 'Close',
    description: 'We stay involved until the keys change hands. No handoffs, no disappearing acts.',
  },
];

const faqs = [
  {
    question: 'How does the valuation process work?',
    answer:
      'We start with a conversation about your property, your timeline, and your expectations. Then we assess comparable recent transactions in the area, visit the property, and provide a detailed valuation report with a recommended listing price.',
  },
  {
    question: 'How long does it typically take to sell a property?',
    answer:
      'It varies significantly based on the property type, location, pricing, and market conditions. We provide an honest assessment of expected timelines during the valuation process rather than making promises we can\'t keep.',
  },
  {
    question: 'What are the costs involved in selling through Casa Aurelia?',
    answer:
      'We discuss fees transparently during our initial conversation. There are no hidden charges. You\'ll know exactly what our engagement involves and what it costs before we begin working together.',
  },
  {
    question: 'What should I do to prepare my property before the valuation?',
    answer:
      'A well-maintained, decluttered property photographs and presents best. We\'ll provide specific staging guidance based on your property\'s characteristics during the preparation phase — there\'s no need to invest in renovations before speaking with us.',
  },
];

/* ────────────────────────────────────────────
   Component
   ──────────────────────────────────────────── */
export function SellClient() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const honey = (form.elements.namedItem('_honey') as HTMLInputElement)?.value;
    if (honey) return;

    setFormState('loading');

    const formData = new FormData(form);
    const data: Record<string, string> = { formType: 'valuation' };
    for (const [key, value] of formData.entries()) {
      if (key === '_honey') continue;
      data[key] = value as string;
    }

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Submission failed');

      setFormState('success');
      form.reset();
    } catch {
      setFormState('error');
    }
  }

  return (
    <>
      {/* ── Hero ─────────────────────────────── */}
      <PageHero
        label="Sell"
        title={
          <>
            Your home deserves better than a <em className="text-gold not-italic">listing.</em>
          </>
        }
        subtitle="We work with a limited number of sellers at a time, giving each property the attention it deserves — from honest pricing to professional presentation and qualified buyer matching."
      >
        <a href="#valuation-form" className="btn-primary">
          Request a Valuation
          <ArrowRight size={14} aria-hidden="true" />
        </a>
      </PageHero>

      {/* ── Hero image strip ─────────────────── */}
      <section className="pb-16 md:pb-24 lg:pb-32">
        <div className="container-site">
          <RevealDiv>
            <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
              <Image
                src="/images/sell-hero.jpg"
                alt="Elegant home interior with natural light and refined furnishings"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* ── Why Presentation Matters ──────────── */}
      <section className="pb-20 md:pb-28 lg:pb-36">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeader
                label="Presentation"
                title={
                  <>
                    Why presentation <br /> matters
                  </>
                }
                size="section"
                bottomSpacing="none"
              />
            </div>
            <div className="lg:col-span-7">
              <div className="space-y-8">
                {presentationPoints.map((point, i) => (
                  <RevealDiv key={point.title} delay={i * 0.08}>
                    <article className="border-t border-espresso/10 pt-6">
                      <div className="flex items-baseline gap-4 mb-3">
                        <span className="label-micro text-gold font-bold shrink-0">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <h3 className="heading-sub text-espresso">{point.title}</h3>
                      </div>
                      <p className="body-copy text-warm-grey lg:pl-10">
                        {point.body}
                      </p>
                    </article>
                  </RevealDiv>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="editorial-rule container-site" />

      {/* ── Seller Process ───────────────────── */}
      <section className="py-20 md:py-28 lg:py-36">
        <div className="container-site">
          <SectionHeader
            label="Process"
            title="How we sell your property"
            subtitle="A structured, transparent process from first conversation to final handshake."
          />

          {/* Vertical process timeline */}
          <div className="relative max-w-3xl mx-auto mt-12 md:mt-16">
            <div
              className="absolute left-[23px] md:left-[31px] top-2 bottom-2 w-px bg-espresso/10"
              aria-hidden="true"
            />
            <ol className="space-y-10 md:space-y-12">
              {steps.map((step, i) => (
                <RevealDiv key={step.number} delay={i * 0.06}>
                  <li className="relative pl-14 md:pl-20">
                    <div
                      className="absolute left-[18px] md:left-[26px] top-1.5 w-[11px] h-[11px] rounded-full border-2 border-gold/50 bg-ivory"
                      aria-hidden="true"
                    />
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="label-micro text-warm-grey">{step.number}</span>
                      <span className="h-px w-6 bg-warm-grey/30" aria-hidden="true" />
                      <h3 className="heading-sub text-espresso">{step.title}</h3>
                    </div>
                    <p className="body-copy text-warm-grey max-w-md">
                      {step.description}
                    </p>
                  </li>
                </RevealDiv>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Valuation Form (Dark Section) ────── */}
      <section
        id="valuation-form"
        className="py-20 md:py-28 lg:py-36 bg-espresso"
        aria-label="Valuation request form"
      >
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left intro */}
            <div className="lg:col-span-5">
              <SectionHeader
                label="Valuation"
                title={
                  <>
                    Tell us about <br /> your property
                  </>
                }
                subtitle="No public listing without approval. No open-house pressure. No inflated promises."
                tone="light"
                size="section"
                bottomSpacing="md"
              />
              <div className="space-y-4 border-t border-ivory/10 pt-6">
                <div className="flex items-baseline gap-3">
                  <span className="label-micro text-gold">01</span>
                  <p className="body-copy-light opacity-70 text-sm">
                    Share the basic details below.
                  </p>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="label-micro text-gold">02</span>
                  <p className="body-copy-light opacity-70 text-sm">
                    We review comparable transactions and visit if appropriate.
                  </p>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="label-micro text-gold">03</span>
                  <p className="body-copy-light opacity-70 text-sm">
                    You receive a written valuation with a recommended price range.
                  </p>
                </div>
              </div>
            </div>

            {/* Right form */}
            <div className="lg:col-span-7">
              {formState === 'success' ? (
                <div className="text-center py-16 border border-ivory/10 rounded-sm">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-gold/40 mb-6">
                    <span className="text-gold text-2xl" aria-hidden="true">✓</span>
                  </div>
                  <p className="font-display text-2xl text-ivory mb-2">
                    Thank you for your inquiry
                  </p>
                  <p className="text-sm text-ivory/50 max-w-sm mx-auto">
                    We&apos;ll review your details and respond soon.
                  </p>
                  <button
                    type="button"
                    className="btn-outline mt-8"
                    onClick={() => setFormState('idle')}
                  >
                    Submit another
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 border border-ivory/10 rounded-sm p-6 sm:p-8 lg:p-10 bg-charcoal/40"
                  noValidate
                >
                  {/* Honeypot */}
                  <div className="absolute -left-[9999px]" aria-hidden="true">
                    <label htmlFor="_honey">Leave blank</label>
                    <input
                      type="text"
                      id="_honey"
                      name="_honey"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FieldGroup label="Name" required>
                      <input
                        type="text"
                        name="name"
                        required
                        className="input-premium"
                        placeholder="Your full name"
                      />
                    </FieldGroup>

                    <FieldGroup label="Email" required>
                      <input
                        type="email"
                        name="email"
                        required
                        className="input-premium"
                        placeholder="you@example.com"
                      />
                    </FieldGroup>

                    <FieldGroup label="Phone" required>
                      <input
                        type="tel"
                        name="phone"
                        required
                        className="input-premium"
                        placeholder="+91 98765 43210"
                      />
                    </FieldGroup>

                    <FieldGroup label="Property City" required>
                      <select name="city" required className="input-premium" defaultValue="">
                        <option value="" disabled>
                          Select city
                        </option>
                        {cities.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </FieldGroup>

                    <FieldGroup label="Property Type">
                      <select name="propertyType" className="input-premium" defaultValue="">
                        <option value="" disabled>
                          Select type
                        </option>
                        {propertyTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </FieldGroup>

                    <FieldGroup label="Approximate Value">
                      <input
                        type="text"
                        name="approximateValue"
                        className="input-premium"
                        placeholder="e.g. ₹5 Cr"
                      />
                    </FieldGroup>
                  </div>

                  <FieldGroup label="Message">
                    <textarea
                      name="message"
                      rows={4}
                      className="input-premium resize-y"
                      placeholder="Anything else you'd like us to know..."
                    />
                  </FieldGroup>

                  {formState === 'error' && (
                    <p className="text-sm text-red-400" role="alert">
                      Something went wrong. Please try again or contact us directly.
                    </p>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                    <button
                      type="submit"
                      className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
                      disabled={formState === 'loading'}
                    >
                      {formState === 'loading' ? (
                        <>
                          <Loader2 size={14} className="animate-spin" aria-hidden="true" />
                          Submitting
                        </>
                      ) : (
                        'Request Valuation'
                      )}
                    </button>

                    <p className="label-micro text-ivory/40 leading-relaxed sm:text-right max-w-xs">
                      Handled per our{' '}
                      <a
                        href="/privacy"
                        className="underline hover:text-ivory/70 transition-colors"
                      >
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────── */}
      <section className="py-20 md:py-28 lg:py-36" aria-label="Frequently asked questions">
        <div className="container-site">
          <SectionHeader
            label="FAQ"
            title="Common questions"
            subtitle="If something isn't covered here, send us a note — we're happy to answer directly."
          />
          <div className="max-w-3xl mx-auto mt-12 md:mt-16">
            <div className="space-y-0">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group border-b border-espresso/10 first:border-t"
                >
                  <summary className="cursor-pointer py-6 flex items-start justify-between gap-4 list-none select-none">
                    <span className="heading-sub text-espresso/90 group-open:text-espresso">
                      {faq.question}
                    </span>
                    <span
                      className="label-micro text-warm-grey mt-1.5 shrink-0 transition-transform duration-200 group-open:rotate-45"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <p className="body-copy text-warm-grey pb-6 max-w-2xl pr-8">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────── */}
      <section className="bg-espresso py-16 md:py-20">
        <div className="container-site text-center">
          <RevealDiv>
            <h2 className="heading-property text-ivory mb-4">
              Prefer a conversation?
            </h2>
          </RevealDiv>
          <RevealDiv delay={0.08}>
            <p className="body-copy-light opacity-60 mb-8 max-w-md mx-auto">
              If you&apos;d rather talk before filling out a form, that works too.
            </p>
          </RevealDiv>
          <RevealDiv delay={0.16}>
            <Link href="/contact" className="btn-outline">
              Contact Us
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </RevealDiv>
        </div>
      </section>
    </>
  );
}

/* ────────────────────────────────────────────
   Field Group Helper
   ──────────────────────────────────────────── */
function FieldGroup({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="label-micro text-ivory/60">
        {label}
        {required && <span className="text-gold ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}
