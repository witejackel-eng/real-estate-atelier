'use client';

import { useEffect, useRef, useState, type FormEvent, type FocusEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Loader2, ArrowRight, Mail, Phone, Clock } from 'lucide-react';
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
const subjectOptions = ['General', 'Buy', 'Sell', 'Other'] as const;

type FieldState = {
  touched: boolean;
  error: string | null;
};

type FormFields = {
  name: FieldState;
  email: FieldState;
  phone: FieldState;
};

/* ────────────────────────────────────────────
   Component
   ──────────────────────────────────────────── */
export function ContactClient() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [focused, setFocused] = useState<string | null>(null);
  const [fields, setFields] = useState<FormFields>({
    name: { touched: false, error: null },
    email: { touched: false, error: null },
    phone: { touched: false, error: null },
  });

  function validateField(name: string, value: string): string | null {
    if (name === 'name' && !value.trim()) return 'Name is required.';
    if (name === 'email') {
      if (!value.trim()) return 'Email is required.';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return 'Please enter a valid email.';
    }
    if (name === 'phone' && !value.trim()) return 'Phone is required.';
    return null;
  }

  function handleBlur(e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setFields((prev) => ({
      ...prev,
      [name]: { touched: true, error },
    }));
    setFocused(null);
  }

  function handleFocus(e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setFocused(e.target.name);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    const field = fields[name as keyof FormFields];
    if (field?.touched) {
      const error = validateField(name, value);
      setFields((prev) => ({
        ...prev,
        [name]: { ...field, error },
      }));
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const honey = (form.elements.namedItem('_honey') as HTMLInputElement)?.value;
    if (honey) return;

    const nameVal = (form.elements.namedItem('name') as HTMLInputElement)?.value || '';
    const emailVal = (form.elements.namedItem('email') as HTMLInputElement)?.value || '';
    const phoneVal = (form.elements.namedItem('phone') as HTMLInputElement)?.value || '';

    const nameErr = validateField('name', nameVal);
    const emailErr = validateField('email', emailVal);
    const phoneErr = validateField('phone', phoneVal);

    const newFields: FormFields = {
      name: { touched: true, error: nameErr },
      email: { touched: true, error: emailErr },
      phone: { touched: true, error: phoneErr },
    };
    setFields(newFields);

    if (nameErr || emailErr || phoneErr) return;

    setFormState('loading');

    const formData = new FormData(form);
    const data: Record<string, string> = { formType: 'contact' };
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
        label="Contact"
        title={
          <>
            Let&apos;s start a <em className="text-gold not-italic">conversation.</em>
          </>
        }
        subtitle="Whether you're considering buying, selling, or just want to understand the market better, we're happy to talk. Tell us what you're thinking and we'll respond within 24 hours."
      />

      {/* ── Two-Column Layout ────────────────── */}
      <section className="pb-20 md:pb-28 lg:pb-36">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* ── Left column: context + channels ── */}
            <aside className="lg:col-span-5 flex flex-col gap-8">
              <RevealDiv>
                <h2 className="heading-property text-espresso mb-4">
                  We&apos;d rather talk than broadcast.
                </h2>
                <p className="body-copy text-warm-grey">
                  Real estate decisions are personal. A form is a starting point, not a
                  substitute for a proper conversation. Share a few details below and
                  we&apos;ll take it from there.
                </p>
              </RevealDiv>

              {/* Channel list */}
              <RevealDiv delay={0.08}>
                <ul className="space-y-5 border-t border-espresso/8 pt-6">
                  <li className="flex items-start gap-4">
                    <span className="shrink-0 w-10 h-10 rounded-full bg-paper flex items-center justify-center text-espresso">
                      <Mail size={16} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="label-micro text-warm-grey mb-1">Email</p>
                      <a
                        href="mailto:hello@casaaurelia.com"
                        className="body-copy text-espresso hover:text-gold transition-colors"
                      >
                        hello@casaaurelia.com
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="shrink-0 w-10 h-10 rounded-full bg-paper flex items-center justify-center text-espresso">
                      <Phone size={16} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="label-micro text-warm-grey mb-1">Phone</p>
                      <a
                        href="tel:+919800000000"
                        className="body-copy text-espresso hover:text-gold transition-colors"
                      >
                        +91 98000 00000
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="shrink-0 w-10 h-10 rounded-full bg-paper flex items-center justify-center text-espresso">
                      <Clock size={16} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="label-micro text-warm-grey mb-1">Response Time</p>
                      <p className="body-copy text-espresso">Within 24 hours, Monday to Saturday</p>
                    </div>
                  </li>
                </ul>
              </RevealDiv>

              {/* Quick links */}
              <RevealDiv delay={0.16}>
                <div className="border-t border-espresso/8 pt-6 space-y-3">
                  <p className="label-micro text-warm-grey">Or skip ahead to</p>
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/properties"
                      className="inline-flex items-center gap-2 body-copy text-espresso hover:text-gold transition-colors group"
                    >
                      Browse the collection
                      <ArrowRight
                        size={14}
                        className="text-warm-grey group-hover:text-gold group-hover:translate-x-1 transition-all"
                        aria-hidden="true"
                      />
                    </Link>
                    <Link
                      href="/sell"
                      className="inline-flex items-center gap-2 body-copy text-espresso hover:text-gold transition-colors group"
                    >
                      Selling your home
                      <ArrowRight
                        size={14}
                        className="text-warm-grey group-hover:text-gold group-hover:translate-x-1 transition-all"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>
              </RevealDiv>
            </aside>

            {/* ── Right column: Form ────────────── */}
            <div className="lg:col-span-7">
              <RevealDiv delay={0.1}>
                {formState === 'success' ? (
                  <div className="text-center py-16 md:py-20 border border-espresso/8 rounded-sm bg-paper/40">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-gold/40 mb-6">
                      <span className="text-gold text-2xl" aria-hidden="true">✓</span>
                    </div>
                    <p className="font-display text-2xl md:text-3xl text-espresso mb-3">
                      Thank you.
                    </p>
                    <p className="body-copy text-warm-grey max-w-sm mx-auto mb-8">
                      We have received your message and will respond shortly.
                    </p>
                    <button
                      type="button"
                      className="btn-outline-dark"
                      onClick={() => {
                        setFormState('idle');
                        setFields({
                          name: { touched: false, error: null },
                          email: { touched: false, error: null },
                          phone: { touched: false, error: null },
                        });
                      }}
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-6 border border-espresso/8 rounded-sm p-6 sm:p-8 lg:p-10 bg-offwhite/40"
                    noValidate
                  >
                    {/* Honeypot */}
                    <div className="absolute -left-[9999px]" aria-hidden="true">
                      <label htmlFor="_honey_contact">Leave blank</label>
                      <input
                        type="text"
                        id="_honey_contact"
                        name="_honey"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FieldGroup
                        label="Name"
                        required
                        error={fields.name.touched ? fields.name.error : null}
                      >
                        <input
                          type="text"
                          name="name"
                          required
                          className={`input-light ${
                            focused === 'name'
                              ? 'border-gold'
                              : fields.name.touched && fields.name.error
                                ? 'field-error'
                                : ''
                          }`}
                          placeholder="Your full name"
                          onBlur={handleBlur}
                          onFocus={handleFocus}
                          onChange={handleChange}
                        />
                      </FieldGroup>

                      <FieldGroup
                        label="Email"
                        required
                        error={fields.email.touched ? fields.email.error : null}
                      >
                        <input
                          type="email"
                          name="email"
                          required
                          className={`input-light ${
                            focused === 'email'
                              ? 'border-gold'
                              : fields.email.touched && fields.email.error
                                ? 'field-error'
                                : ''
                          }`}
                          placeholder="you@example.com"
                          onBlur={handleBlur}
                          onFocus={handleFocus}
                          onChange={handleChange}
                        />
                      </FieldGroup>

                      <FieldGroup
                        label="Phone"
                        required
                        error={fields.phone.touched ? fields.phone.error : null}
                      >
                        <input
                          type="tel"
                          name="phone"
                          required
                          className={`input-light ${
                            focused === 'phone'
                              ? 'border-gold'
                              : fields.phone.touched && fields.phone.error
                                ? 'field-error'
                                : ''
                          }`}
                          placeholder="+91 98765 43210"
                          onBlur={handleBlur}
                          onFocus={handleFocus}
                          onChange={handleChange}
                        />
                      </FieldGroup>

                      <FieldGroup label="Subject">
                        <select
                          name="subject"
                          className="input-light"
                          onBlur={handleBlur}
                          onFocus={handleFocus}
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Select a subject
                          </option>
                          {subjectOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </FieldGroup>
                    </div>

                    <FieldGroup label="Message">
                      <textarea
                        name="message"
                        rows={5}
                        className={`input-light resize-y ${
                          focused === 'message' ? 'border-gold' : ''
                        }`}
                        placeholder="Tell us how we can help..."
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                      />
                    </FieldGroup>

                    {formState === 'error' && (
                      <p className="text-sm text-red-500" role="alert">
                        Something went wrong. Please try again or email us directly.
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
                            Sending
                          </>
                        ) : (
                          'Send Message'
                        )}
                      </button>

                      <p className="label-micro text-warm-grey/70 leading-relaxed sm:text-right max-w-xs">
                        Handled per our{' '}
                        <a
                          href="/privacy"
                          className="underline hover:text-espresso transition-colors"
                        >
                          Privacy Policy
                        </a>
                        .
                      </p>
                    </div>
                  </form>
                )}
              </RevealDiv>
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing strip ────────────────────── */}
      <section className="bg-espresso py-16 md:py-20">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            <RevealDiv>
              <p className="label-micro text-gold mb-3">01</p>
              <h3 className="heading-sub text-ivory mb-2">Discreet</h3>
              <p className="body-copy-light opacity-60 text-sm">
                Your search, your finances, and your decisions stay between us.
              </p>
            </RevealDiv>
            <RevealDiv delay={0.1}>
              <p className="label-micro text-gold mb-3">02</p>
              <h3 className="heading-sub text-ivory mb-2">Considered</h3>
              <p className="body-copy-light opacity-60 text-sm">
                We work with a limited number of clients so every conversation gets full attention.
              </p>
            </RevealDiv>
            <RevealDiv delay={0.2}>
              <p className="label-micro text-gold mb-3">03</p>
              <h3 className="heading-sub text-ivory mb-2">Honest</h3>
              <p className="body-copy-light opacity-60 text-sm">
                If a property isn&apos;t right for you, we&apos;ll say so. No pressure, no theatre.
              </p>
            </RevealDiv>
          </div>
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
  error = null,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string | null;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="label-micro text-espresso/60">
        {label}
        {required && <span className="text-gold ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
