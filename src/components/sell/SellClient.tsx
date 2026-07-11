'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { cities, propertyTypes } from '@/data/properties';

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

    // Honeypot check
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
      <section className="py-20 md:py-28 lg:py-36">
        <div className="container-editorial">
          <RevealDiv>
            <span className="section-number">N°002</span>
          </RevealDiv>
          <RevealDiv delay={0.08}>
            <h1 className="display-page text-espresso mt-4 mb-8">
              Your home deserves better than a listing.
            </h1>
          </RevealDiv>
          <RevealDiv delay={0.16}>
            <p className="body-copy text-warm-grey max-w-xl mb-8">
              We work with a limited number of sellers at a time, giving each property the
              attention it deserves — from honest pricing to professional presentation and
              qualified buyer matching.
            </p>
          </RevealDiv>
          <RevealDiv delay={0.24}>
            <a href="#valuation-form" className="btn-primary">
              Request a Valuation
            </a>
          </RevealDiv>
        </div>
      </section>

      <hr className="editorial-rule mx-auto max-w-[1600px]" />

      {/* ── Why Presentation Matters ──────────── */}
      <section className="py-20 md:py-28 lg:py-36">
        <div className="container-editorial">
          <RevealDiv>
            <span className="section-number">Presentation</span>
          </RevealDiv>
          <RevealDiv delay={0.08}>
            <h2 className="heading-property text-espresso mt-4 mb-12">
              Why presentation matters
            </h2>
          </RevealDiv>
          <div className="space-y-10">
            {presentationPoints.map((point, i) => (
              <RevealDiv key={point.title} delay={0.12 + i * 0.08}>
                <article>
                  <h3 className="font-display text-lg md:text-xl text-espresso mb-2">
                    {point.title}
                  </h3>
                  <p className="body-copy text-warm-grey max-w-lg">
                    {point.body}
                  </p>
                </article>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      <hr className="editorial-rule mx-auto max-w-[1600px]" />

      {/* ── Seller Process ───────────────────── */}
      <section className="py-20 md:py-28 lg:py-36">
        <div className="container-editorial">
          <RevealDiv>
            <span className="section-number">Process</span>
          </RevealDiv>
          <RevealDiv delay={0.08}>
            <h2 className="heading-property text-espresso mt-4 mb-12">
              How we sell your property
            </h2>
          </RevealDiv>

          {/* Vertical process */}
          <div className="relative">
            <div className="absolute left-[23px] md:left-[31px] top-0 bottom-0 w-px bg-espresso/10" aria-hidden="true" />
            <ol className="space-y-12 md:space-y-14">
              {steps.map((step, i) => (
                <RevealDiv key={step.number} delay={0.1 + i * 0.06}>
                  <li className="relative pl-14 md:pl-20">
                    <div
                      className="absolute left-[18px] md:left-[26px] top-1.5 w-[11px] h-[11px] rounded-full border-2 border-gold/40 bg-ivory"
                      aria-hidden="true"
                    />
                    <span className="label-micro text-warm-grey">{step.number}</span>
                    <h3 className="font-display text-lg md:text-xl text-espresso mt-1 mb-2">
                      {step.title}
                    </h3>
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
        <div className="container-form">
          <RevealDiv>
            <span className="section-number text-warm-grey">Valuation</span>
          </RevealDiv>
          <RevealDiv delay={0.08}>
            <h2 className="heading-property text-ivory mt-4 mb-3">
              Tell us about your property
            </h2>
          </RevealDiv>
          <RevealDiv delay={0.12}>
            <p className="body-copy-light opacity-40 text-sm max-w-md mb-8">
              No public listing without approval. No open-house pressure. No inflated promises.
            </p>
            <p className="body-copy-light opacity-70 mb-10">
              Fill in the details below and we&apos;ll get back to you with a preliminary assessment.
            </p>
          </RevealDiv>

          {formState === 'success' ? (
            <RevealDiv>
              <div className="text-center py-16">
                <p className="font-display text-xl text-ivory mb-2">
                  Thank you for your inquiry
                </p>
                <p className="text-sm text-ivory/50">
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
            </RevealDiv>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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
                  <select name="city" required className="input-premium">
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
                  <select name="propertyType" className="input-premium">
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

              <p className="text-xs text-ivory/30 mt-4">
                Your information is handled in accordance with our{' '}
                <a href="/privacy" className="underline hover:text-ivory/50 transition-colors">
                  Privacy Policy
                </a>
                . This is a demonstration website — submissions are logged locally.
              </p>
              <p className="label-micro text-ivory/25 mt-4">
                This is a demonstration. No data is transmitted.
              </p>
            </form>
          )}
        </div>
      </section>

      <hr className="editorial-rule-light mx-auto max-w-[1600px] bg-espresso" />

      {/* ── FAQ ──────────────────────────────── */}
      <section className="py-20 md:py-28 lg:py-36 bg-espresso" aria-label="Frequently asked questions">
        <div className="container-editorial">
          <RevealDiv>
            <span className="section-number text-warm-grey">FAQ</span>
          </RevealDiv>
          <RevealDiv delay={0.08}>
            <h2 className="heading-property text-ivory mt-4 mb-12">
              Common questions
            </h2>
          </RevealDiv>
          <RevealDiv delay={0.12}>
            <div className="space-y-0">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group border-b border-ivory/8"
                >
                  <summary className="cursor-pointer py-5 flex items-start justify-between gap-4 list-none select-none">
                    <span className="font-display text-base md:text-lg text-ivory/90 group-open:text-ivory">
                      {faq.question}
                    </span>
                    <span
                      className="label-micro text-offwhite/60 mt-1 shrink-0 transition-transform duration-200 group-open:rotate-45"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <p className="body-copy-light opacity-60 pb-5 max-w-lg pr-8">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </RevealDiv>
        </div>
      </section>

      <hr className="editorial-rule-light mx-auto max-w-[1600px] bg-espresso" />

      {/* ── Final CTA ────────────────────────── */}
      <section className="py-20 md:py-28 lg:py-36 bg-espresso">
        <div className="container-editorial text-center">
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