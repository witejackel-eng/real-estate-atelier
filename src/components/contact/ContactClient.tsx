'use client';

import { useState, type FormEvent, type FocusEvent } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { Reveal } from '@/components/shared/Reveal';

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
  const [formState, setFormState] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
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

  function handleBlur(
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setFields((prev) => ({
      ...prev,
      [name]: { touched: true, error },
    }));
    setFocused(null);
  }

  function handleFocus(
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFocused(e.target.name);
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
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

    const honey = (form.elements.namedItem('_honey') as HTMLInputElement)
      ?.value;
    if (honey) return;

    const nameVal =
      (form.elements.namedItem('name') as HTMLInputElement)?.value || '';
    const emailVal =
      (form.elements.namedItem('email') as HTMLInputElement)?.value || '';
    const phoneVal =
      (form.elements.namedItem('phone') as HTMLInputElement)?.value || '';

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

  function resetForm() {
    setFormState('idle');
    setFields({
      name: { touched: false, error: null },
      email: { touched: false, error: null },
      phone: { touched: false, error: null },
    });
  }

  return (
    <>
      {/* ── Hero ─────────────────────────────── */}
      <section className="section-py">
        <div className="container-editorial">
          <Reveal>
            <span className="section-number">N°005</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="display-page text-ink mt-4 mb-8">
              Let&apos;s start a conversation.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="body-copy text-muted max-w-xl">
              Whether you&apos;re considering buying, selling, or just want to
              understand the market better, we&apos;re happy to talk.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Two-Column Layout ────────────────── */}
      <section className="pb-20 md:pb-28 lg:pb-36">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* ── Left column ──────────────────── */}
            <div className="lg:col-span-5 flex flex-col justify-center lg:sticky lg:top-32 lg:self-start">
              <Reveal>
                <h2 className="heading-sub text-ink mb-4">
                  We&apos;d rather talk than broadcast.
                </h2>
              </Reveal>
              <Reveal delay={80}>
                <p className="body-copy text-muted mb-8">
                  Real estate decisions are personal. A form is a starting point,
                  not a substitute for a proper conversation. Tell us what
                  you&apos;re thinking and we&apos;ll respond within 24 hours.
                </p>
              </Reveal>
              <Reveal delay={160}>
                <div className="space-y-3 mb-10">
                  <Link
                    href="/properties"
                    className="block body-copy text-brass hover:text-brass-dark transition-colors"
                  >
                    Browse properties &rarr;
                  </Link>
                  <Link
                    href="/sell"
                    className="block body-copy text-brass hover:text-brass-dark transition-colors"
                  >
                    Selling your home &rarr;
                  </Link>
                </div>
              </Reveal>
              <Reveal delay={240}>
                <div className="bg-paper-deep/60 border border-ink/5 p-4">
                  <p className="label-micro text-muted leading-relaxed">
                    This is a demonstration website. Form submissions are logged
                    locally.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* ── Right column: Form ────────────── */}
            <div className="lg:col-span-7">
              <Reveal delay={100}>
                {formState === 'success' ? (
                  <div className="text-center py-20">
                    <p className="heading-sub text-ink mb-3">
                      Thank you for your inquiry
                    </p>
                    <p className="body-copy text-muted max-w-sm mx-auto">
                      We have received your message and will respond shortly.
                    </p>
                    <button
                      type="button"
                      className="btn-outline-dark mt-8"
                      onClick={resetForm}
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
                        error={
                          fields.name.touched ? fields.name.error : null
                        }
                      >
                        <input
                          type="text"
                          name="name"
                          required
                          className={`input-light ${
                            focused === 'name'
                              ? 'border-brass'
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
                        error={
                          fields.email.touched ? fields.email.error : null
                        }
                      >
                        <input
                          type="email"
                          name="email"
                          required
                          className={`input-light ${
                            focused === 'email'
                              ? 'border-brass'
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
                        error={
                          fields.phone.touched ? fields.phone.error : null
                        }
                      >
                        <input
                          type="tel"
                          name="phone"
                          required
                          className={`input-light ${
                            focused === 'phone'
                              ? 'border-brass'
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
                          focused === 'message' ? 'border-brass' : ''
                        }`}
                        placeholder="Tell us how we can help..."
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                      />
                    </FieldGroup>

                    {formState === 'error' && (
                      <p className="text-sm text-[#A45F3D]" role="alert">
                        Something went wrong. Please try again.
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
                          Sending
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>

                    <p className="label-micro text-muted/60 mt-6 leading-relaxed">
                      Your information is handled in accordance with our{' '}
                      <a
                        href="/privacy"
                        className="underline hover:text-ink/80 transition-colors"
                      >
                        Privacy Policy
                      </a>
                      . We will not share your details with third parties.
                    </p>
                    <p className="label-micro text-ink/30 mt-4">
                      This is a demonstration website. No data is transmitted.
                    </p>
                  </form>
                )}
              </Reveal>
            </div>
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
      <label className="label-micro text-muted">
        {label}
        {required && <span className="text-brass ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-sm text-[#A45F3D]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}