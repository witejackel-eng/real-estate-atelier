'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { cities, propertyTypes } from '@/data/properties';
import { Reveal } from '@/components/shared/Reveal';

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
    description:
      "We assess your property's market position through comparable analysis and an honest conversation about your expectations.",
  },
  {
    number: '02',
    title: 'Prepare',
    description:
      'Professional photography, strategic staging advice, and copywriting that presents your property accurately.',
  },
  {
    number: '03',
    title: 'Market',
    description:
      'Targeted exposure to qualified buyers through our platform and network. We coordinate and attend every viewing.',
  },
  {
    number: '04',
    title: 'Negotiate',
    description:
      'Structured offer management, negotiation support, and coordination through to registration and handover.',
  },
  {
    number: '05',
    title: 'Close',
    description:
      'We stay involved until the keys change hands. No handoffs, no disappearing acts.',
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
      "It varies significantly based on the property type, location, pricing, and market conditions. We provide an honest assessment of expected timelines during the valuation process rather than making promises we can't keep.",
  },
  {
    question: 'What are the costs involved in selling through Casa Aurelia?',
    answer:
      "We discuss fees transparently during our initial conversation. There are no hidden charges. You'll know exactly what our engagement involves and what it costs before we begin working together.",
  },
  {
    question: 'What should I do to prepare my property before the valuation?',
    answer:
      "A well-maintained, decluttered property photographs and presents best. We'll provide specific staging guidance based on your property's characteristics during the preparation phase — there's no need to invest in renovations before speaking with us.",
  },
];

/* ────────────────────────────────────────────
   Component
   ──────────────────────────────────────────── */
export function SellClient() {
  const [formState, setFormState] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const honey = (form.elements.namedItem('_honey') as HTMLInputElement)
      ?.value;
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
      <section className="section-py">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Text — 7 cols */}
            <div className="lg:col-span-7">
              <Reveal>
                <span className="section-number">N°002</span>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="display-page text-ink mt-4 mb-8">
                  Your home deserves better than a listing.
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="body-copy text-muted max-w-xl mb-10">
                  We work with a limited number of sellers at a time, giving
                  each property the attention it deserves — from honest pricing
                  to professional presentation and qualified buyer matching.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <a href="#valuation-form" className="btn-primary">
                  Request a Valuation
                </a>
              </Reveal>
            </div>

            {/* Image — 5 cols */}
            <Reveal delay={200} className="lg:col-span-5">
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src="/images/sell-hero.jpg"
                  alt="Elegant home interior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </div>
        <hr className="rule-soft mt-16 lg:mt-24" />
      </section>

      {/* ── Why Presentation Matters ──────────── */}
      <section className="section-py">
        <div className="container-editorial">
          <Reveal>
            <span className="section-number">Presentation</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="heading-property text-ink mt-4 mb-12">
              Why presentation matters
            </h2>
          </Reveal>

          <div className="space-y-0">
            {presentationPoints.map((point, i) => (
              <Reveal key={point.title} delay={120 + i * 80}>
                <article>
                  <h3 className="heading-sub text-ink mb-2">{point.title}</h3>
                  <p className="body-copy-muted max-w-lg">{point.body}</p>
                </article>
                {i < presentationPoints.length - 1 && (
                  <hr className="rule-soft my-10" />
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <hr className="rule mx-auto max-w-[1600px]" />

      {/* ── Selling Process ───────────────────── */}
      <section className="section-py">
        <div className="container-editorial">
          <Reveal>
            <span className="section-number">Process</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="heading-property text-ink mt-4 mb-14">
              How we sell your property
            </h2>
          </Reveal>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-[23px] md:left-[31px] top-2 bottom-2 w-px bg-ink/10"
              aria-hidden="true"
            />

            <ol className="space-y-14 md:space-y-16">
              {steps.map((step, i) => (
                <Reveal key={step.number} delay={100 + i * 60}>
                  <li className="relative pl-16 md:pl-20">
                    {/* Dot */}
                    <div
                      className="absolute left-[18px] md:left-[26px] top-2 w-[11px] h-[11px] rounded-full border-2 border-brass/40 bg-paper"
                      aria-hidden="true"
                    />
                    <span className="label-micro text-muted block mb-2">
                      {step.number}
                    </span>
                    <h3 className="heading-sub text-ink mb-2">{step.title}</h3>
                    <p className="body-copy-muted max-w-md">
                      {step.description}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Valuation Form (Dark Section) ────── */}
      <section
        id="valuation-form"
        className="section-py bg-ink"
        aria-label="Valuation request form"
      >
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left — 5 cols */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <Reveal>
                <span className="section-number text-muted">Valuation</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="heading-property text-white mt-4 mb-4">
                  Tell us about your property
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="body-copy-light opacity-60 mb-6">
                  No public listing without approval. No open-house pressure. No
                  inflated promises.
                </p>
              </Reveal>
              <Reveal delay={160}>
                <p className="body-copy-light opacity-40 text-sm mb-8">
                  Your information is handled in accordance with our{' '}
                  <a
                    href="/privacy"
                    className="underline hover:opacity-80 transition-opacity"
                  >
                    Privacy Policy
                  </a>
                  . We will not share your details with third parties.
                </p>
              </Reveal>
            </div>

            {/* Right — 7 cols: form */}
            <div className="lg:col-span-7">
              <Reveal delay={100}>
                {formState === 'success' ? (
                  <div className="text-center py-20">
                    <p className="heading-sub text-white mb-2">
                      Thank you for your inquiry
                    </p>
                    <p className="body-copy-light opacity-50">
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
                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    {/* Honeypot */}
                    <div
                      className="absolute -left-[9999px]"
                      aria-hidden="true"
                    >
                      <label htmlFor="_honey_sell">Leave blank</label>
                      <input
                        type="text"
                        id="_honey_sell"
                        name="_honey"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FieldGroup label="Name" required dark>
                        <input
                          type="text"
                          name="name"
                          required
                          className="input-premium"
                          placeholder="Your full name"
                        />
                      </FieldGroup>

                      <FieldGroup label="Email" required dark>
                        <input
                          type="email"
                          name="email"
                          required
                          className="input-premium"
                          placeholder="you@example.com"
                        />
                      </FieldGroup>

                      <FieldGroup label="Phone" required dark>
                        <input
                          type="tel"
                          name="phone"
                          required
                          className="input-premium"
                          placeholder="+91 98765 43210"
                        />
                      </FieldGroup>

                      <FieldGroup label="Property City" required dark>
                        <select
                          name="city"
                          required
                          className="input-premium"
                          defaultValue=""
                        >
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

                      <FieldGroup label="Property Type" dark>
                        <select
                          name="propertyType"
                          className="input-premium"
                          defaultValue=""
                        >
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

                      <FieldGroup label="Approximate Value" dark>
                        <input
                          type="text"
                          name="approximateValue"
                          className="input-premium"
                          placeholder="e.g. ₹5 Cr"
                        />
                      </FieldGroup>
                    </div>

                    <FieldGroup label="Message" dark>
                      <textarea
                        name="message"
                        rows={4}
                        className="input-premium resize-y"
                        placeholder="Anything else you'd like us to know..."
                      />
                    </FieldGroup>

                    {formState === 'error' && (
                      <p className="text-sm text-[#A45F3D]" role="alert">
                        Something went wrong. Please try again or contact us
                        directly.
                      </p>
                    )}

                    <button
                      type="submit"
                      className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
                      disabled={formState === 'loading'}
                    >
                      {formState === 'loading' ? (
                        <>
                          <Loader2
                            size={14}
                            className="animate-spin"
                            aria-hidden="true"
                          />
                          Submitting
                        </>
                      ) : (
                        'Request Valuation'
                      )}
                    </button>

                    <p className="label-micro text-white/25 mt-4 leading-relaxed">
                      This is a demonstration website. No data is transmitted.
                    </p>
                  </form>
                )}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────── */}
      <section
        className="section-py bg-ink"
        aria-label="Frequently asked questions"
      >
        <div className="container-editorial">
          <Reveal>
            <span className="section-number text-muted">FAQ</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="heading-property text-white mt-4 mb-12">
              Common questions
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="space-y-0">
              {faqs.map((faq) => (
                <details key={faq.question} className="group">
                  <summary className="cursor-pointer py-5 flex items-start justify-between gap-4 list-none select-none border-b border-paper/10">
                    <span className="heading-sub text-paper/90 group-open:text-paper">
                      {faq.question}
                    </span>
                    <span
                      className="text-white/40 mt-1 shrink-0 text-lg leading-none transition-transform duration-200 group-open:rotate-45"
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
          </Reveal>
        </div>
      </section>

      {/* ── Closing CTA ────────────────────────── */}
      <section className="section-py bg-ink">
        <div className="container-editorial text-center">
          <Reveal>
            <h2 className="heading-property text-white mb-4">
              Prefer a conversation?
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="body-copy-light opacity-60 mb-8 max-w-md mx-auto">
              If you&apos;d rather talk before filling out a form, that works
              too.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <Link href="/contact" className="btn-outline">
              Contact Us
            </Link>
          </Reveal>
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
  dark = false,
  children,
}: {
  label: string;
  required?: boolean;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        className={`label-micro ${dark ? 'text-white/60' : 'text-muted'}`}
      >
        {label}
        {required && <span className="text-brass ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}