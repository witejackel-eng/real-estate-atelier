'use client';

import { useState, type FormEvent } from 'react';
import { Loader2 } from 'lucide-react';
import { Container } from '@/components/shared/Container';
import { Reveal } from '@/components/shared/Reveal';
import { Button } from '@/components/shared/Button';

const subjectOptions = [
  'Property Inquiry',
  'Valuation Request',
  'General Question',
] as const;

const inputClasses =
  'w-full rounded-sm border border-espresso/15 bg-offwhite/60 px-4 py-3 text-sm text-espresso placeholder:text-espresso/35 focus:border-gold/50 focus:outline-none transition-colors';

export function ContactClient() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const honey = (form.elements.namedItem('_honey') as HTMLInputElement)?.value;
    if (honey) return;

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
    <section className="section-py" aria-label="Contact us">
      <Container variant="main">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* ── Left column ─────────────────────── */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <Reveal>
              <h1 className="font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.1] text-espresso text-balance">
                Get in Touch
              </h1>
              <p className="body-text text-espresso/70 mt-5 mb-4">
                Whether you&apos;re considering buying, selling, or just want to understand
                the market better, we&apos;re happy to talk.
              </p>
              <p className="text-sm text-espresso/50 mb-8">
                We aim to respond within 24 hours.
              </p>
              <div className="rounded-sm bg-sand/50 border border-espresso/5 p-4 mb-6">
                <p className="text-xs text-espresso/50 leading-relaxed">
                  This is a demonstration website. Form submissions are logged locally.
                </p>
              </div>
            </Reveal>
          </div>

          {/* ── Right column: form ──────────────── */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              {formState === 'success' ? (
                <div className="text-center py-16">
                  <p className="font-display text-xl text-espresso mb-2">
                    Thank you for reaching out
                  </p>
                  <p className="text-sm text-espresso/60">
                    We&apos;ll be in touch soon.
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-6"
                    onClick={() => setFormState('idle')}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Honeypot */}
                  <div className="absolute -left-[9999px]" aria-hidden>
                    <label htmlFor="_honey_contact">Leave blank</label>
                    <input
                      type="text"
                      id="_honey_contact"
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
                        className={inputClasses}
                        placeholder="Your full name"
                      />
                    </FieldGroup>

                    <FieldGroup label="Email" required>
                      <input
                        type="email"
                        name="email"
                        required
                        className={inputClasses}
                        placeholder="you@example.com"
                      />
                    </FieldGroup>

                    <FieldGroup label="Phone" required>
                      <input
                        type="tel"
                        name="phone"
                        required
                        className={inputClasses}
                        placeholder="+91 98765 43210"
                      />
                    </FieldGroup>

                    <FieldGroup label="Subject" required>
                      <select name="subject" required className={inputClasses}>
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

                  <FieldGroup label="Message" required>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      className={`${inputClasses} resize-y`}
                      placeholder="Tell us how we can help..."
                    />
                  </FieldGroup>

                  {formState === 'error' && (
                    <p className="text-sm text-terracotta" role="alert">
                      Something went wrong. Please try again.
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
                        Sending
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </Button>

                  <p className="text-xs text-espresso/40 mt-4">
                    Your information is handled in accordance with our{' '}
                    <a href="/privacy" className="underline hover:text-espresso/60 transition-colors">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

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
      <label className="text-xs font-mono uppercase tracking-[0.08em] text-espresso/60">
        {label}
        {required && <span className="text-gold ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}