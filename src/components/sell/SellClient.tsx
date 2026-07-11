'use client';

import { useState, type FormEvent } from 'react';
import Image from 'next/image';
import { Check, Loader2 } from 'lucide-react';
import { Container } from '@/components/shared/Container';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { Button } from '@/components/shared/Button';
import { Reveal } from '@/components/shared/Reveal';

/* ────────────────────────────────────────────
   Data
   ──────────────────────────────────────────── */

const sellerBenefits = [
  'Market-aware pricing based on comparable transactions and current demand',
  'Professional photography and presentation that does justice to your property',
  'Qualified inquiry handling — we pre-screen every serious buyer',
  'Negotiation and closing coordination from first offer to handover',
];

const steps = [
  {
    number: '01',
    title: 'Understand and Value',
    description:
      'We assess your property\'s market position through comparable analysis, location evaluation, and an honest conversation about your expectations and timeline.',
  },
  {
    number: '02',
    title: 'Prepare and Position',
    description:
      'Professional photography, strategic staging advice, and copywriting that presents your property accurately to the right audience.',
  },
  {
    number: '03',
    title: 'Market and Conduct Viewings',
    description:
      'Targeted exposure to qualified buyers through our platform and network. We coordinate and attend every viewing.',
  },
  {
    number: '04',
    title: 'Negotiate and Close',
    description:
      'Structured offer management, negotiation support, and coordination with legal counsel through to registration and handover.',
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

const propertyTypeOptions = [
  'Villa',
  'Apartment',
  'Penthouse',
  'Duplex',
  'Weekend Home',
  'Heritage Home',
] as const;

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
      <section aria-label="Sell your property" className="section-py">
        <Container variant="main">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col justify-center py-8 lg:py-12">
              <Reveal>
                <SectionLabel>For Sellers</SectionLabel>
                <h1 className="font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.1] text-espresso mt-4 mb-6 text-balance">
                  Sell Your Property with Intention
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="body-text text-espresso/70 max-w-xl mb-8">
                  We work with a limited number of sellers at a time, giving each property the
                  attention it deserves — from honest pricing to professional presentation and
                  qualified buyer matching.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <Button variant="primary" size="lg" href="#valuation-form">
                  Request a Valuation
                </Button>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal direction="right" delay={0.15}>
                <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
                  <Image
                    src="/images/sell-hero.jpg"
                    alt="A well-presented luxury living room with natural light and considered furnishings"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Seller Benefits ──────────────────── */}
      <section className="section-py editorial-line" aria-label="What you get">
        <Container variant="main">
          <Reveal>
            <SectionLabel>Why Sell With Us</SectionLabel>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] mt-4 mb-10">
              A considered approach to selling
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="space-y-4 max-w-2xl">
              {sellerBenefits.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check
                    size={16}
                    className="text-gold mt-0.5 shrink-0"
                    aria-hidden
                  />
                  <span className="text-sm text-espresso/80">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* ── Four-Step Process ────────────────── */}
      <section className="section-py editorial-line" aria-label="Selling process">
        <Container variant="main">
          <Reveal>
            <SectionLabel>The Process</SectionLabel>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] mt-4 mb-12">
              How we sell your property
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {steps.map((step, i) => (
              <Reveal key={step.number} delay={i * 0.08}>
                <article>
                  <span className="font-mono text-3xl text-gold/30 mb-3 block">
                    {step.number}
                  </span>
                  <h3 className="font-display text-xl mb-2">{step.title}</h3>
                  <p className="body-text text-espresso/70 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Valuation Form ───────────────────── */}
      <section
        id="valuation-form"
        className="section-py bg-espresso"
        aria-label="Valuation request form"
      >
        <Container variant="form">
          <Reveal>
            <SectionLabel className="text-gold/80">Request a Valuation</SectionLabel>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] text-offwhite mt-4 mb-3">
              Tell us about your property
            </h2>
            <p className="body-text text-offwhite/60 mb-10">
              Fill in the details below and we&apos;ll get back to you with a preliminary
              assessment.
            </p>
          </Reveal>

          {formState === 'success' ? (
            <Reveal>
              <div className="text-center py-12">
                <p className="font-display text-xl text-offwhite mb-2">
                  Thank you for your inquiry
                </p>
                <p className="text-sm text-offwhite/60">
                  We&apos;ll review your details and respond soon.
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-offwhite/70 hover:text-offwhite mt-6"
                  onClick={() => setFormState('idle')}
                >
                  Submit another
                </Button>
              </div>
            </Reveal>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Honeypot */}
              <div className="absolute -left-[9999px]" aria-hidden>
                <label htmlFor="_honey">Leave blank</label>
                <input
                  type="text"
                  id="_honey"
                  name="_honey"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FieldGroup label="Name" required>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full rounded-sm border border-offwhite/15 bg-offwhite/5 px-4 py-3 text-sm text-offwhite placeholder:text-offwhite/30 focus:border-gold/50 focus:outline-none transition-colors"
                    placeholder="Your full name"
                  />
                </FieldGroup>

                <FieldGroup label="Email" required>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full rounded-sm border border-offwhite/15 bg-offwhite/5 px-4 py-3 text-sm text-offwhite placeholder:text-offwhite/30 focus:border-gold/50 focus:outline-none transition-colors"
                    placeholder="you@example.com"
                  />
                </FieldGroup>

                <FieldGroup label="Phone" required>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="w-full rounded-sm border border-offwhite/15 bg-offwhite/5 px-4 py-3 text-sm text-offwhite placeholder:text-offwhite/30 focus:border-gold/50 focus:outline-none transition-colors"
                    placeholder="+91 98765 43210"
                  />
                </FieldGroup>

                <FieldGroup label="Property Location" required>
                  <input
                    type="text"
                    name="location"
                    required
                    className="w-full rounded-sm border border-offwhite/15 bg-offwhite/5 px-4 py-3 text-sm text-offwhite placeholder:text-offwhite/30 focus:border-gold/50 focus:outline-none transition-colors"
                    placeholder="e.g. Indiranagar, Bangalore"
                  />
                </FieldGroup>

                <FieldGroup label="Property Type" required>
                  <select name="propertyType" required className="w-full rounded-sm border border-offwhite/15 bg-offwhite/5 px-4 py-3 text-sm text-offwhite focus:border-gold/50 focus:outline-none transition-colors">
                    <option value="" disabled>
                      Select type
                    </option>
                    {propertyTypeOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </FieldGroup>

                <FieldGroup label="Approximate Area">
                  <input
                    type="text"
                    name="area"
                    className="w-full rounded-sm border border-offwhite/15 bg-offwhite/5 px-4 py-3 text-sm text-offwhite placeholder:text-offwhite/30 focus:border-gold/50 focus:outline-none transition-colors"
                    placeholder="e.g. 3,500 sq ft"
                  />
                </FieldGroup>
              </div>

              <FieldGroup label="Expected Price (optional)">
                <input
                  type="text"
                  name="expectedPrice"
                  className="w-full rounded-sm border border-offwhite/15 bg-offwhite/5 px-4 py-3 text-sm text-offwhite placeholder:text-offwhite/30 focus:border-gold/50 focus:outline-none transition-colors"
                  placeholder="e.g. ₹5 Cr"
                />
              </FieldGroup>

              <FieldGroup label="Message (optional)">
                <textarea
                  name="message"
                  rows={4}
                  className="w-full rounded-sm border border-offwhite/15 bg-offwhite/5 px-4 py-3 text-sm text-offwhite placeholder:text-offwhite/30 focus:border-gold/50 focus:outline-none transition-colors resize-y"
                  placeholder="Anything else you'd like us to know..."
                />
              </FieldGroup>

              {formState === 'error' && (
                <p className="text-sm text-terracotta" role="alert">
                  Something went wrong. Please try again or contact us directly.
                </p>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={formState === 'loading'}
              >
                {formState === 'loading' ? (
                  <>
                    <Loader2 size={14} className="animate-spin mr-2" aria-hidden />
                    Submitting
                  </>
                ) : (
                  'Request Valuation'
                )}
              </Button>

              <p className="text-xs text-offwhite/40 mt-4">
                Your information is handled in accordance with our{' '}
                <a href="/privacy" className="underline hover:text-offwhite/60 transition-colors">
                  Privacy Policy
                </a>
                . This is a demonstration website — submissions are logged locally.
              </p>
            </form>
          )}
        </Container>
      </section>

      {/* ── FAQ ──────────────────────────────── */}
      <section className="section-py editorial-line" aria-label="Frequently asked questions">
        <Container variant="main">
          <Reveal>
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] mt-4 mb-10">
              Common questions
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="max-w-2xl space-y-0 divide-y divide-espresso/10">
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-5 first:pt-0 last:pb-0">
                  <summary className="cursor-pointer flex items-start justify-between gap-4 list-none font-display text-base sm:text-lg text-espresso select-none">
                    <span>{faq.question}</span>
                    <span
                      className="font-mono text-xs text-gold mt-1 shrink-0 transition-transform duration-200 group-open:rotate-45"
                      aria-hidden
                    >
                      +
                    </span>
                  </summary>
                  <p className="body-text text-espresso/70 text-sm mt-3 max-w-xl">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </Reveal>
        </Container>
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
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-mono uppercase tracking-[0.08em] text-offwhite/70">
        {label}
        {required && <span className="text-gold ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}