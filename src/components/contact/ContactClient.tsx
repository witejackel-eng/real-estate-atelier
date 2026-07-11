'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Container } from '@/components/shared/Container';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { Reveal } from '@/components/shared/Reveal';
import { AnimatedText } from '@/components/shared/AnimatedText';
import { Button } from '@/components/shared/Button';

const faqs = [
  {
    question: 'How quickly do you respond to inquiries?',
    answer:
      'We aim to respond to all inquiries within 24 hours during working days. For urgent matters, please call us directly.',
  },
  {
    question: 'Do you charge for the initial consultation?',
    answer:
      'No. The first consultation is always free and without obligation. We believe understanding your needs should come before any commitment.',
  },
  {
    question: 'Can I schedule a property viewing online?',
    answer:
      'Yes. You can schedule viewings through our property pages, or simply contact us and we\'ll arrange everything for you.',
  },
  {
    question: 'Do you work with clients outside India?',
    answer:
      'Yes. We regularly assist NRIs and international clients with property purchases in India. We can coordinate viewings, documentation, and the entire process remotely.',
  },
  {
    question: 'What areas do you cover?',
    answer:
      'We currently operate in Delhi NCR, Mumbai, Goa, Bangalore, Pune, Jaipur, Hyderabad, and Alibaug. We are selectively expanding to other markets.',
  },
];

export function ContactClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Invalid email address';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const inputStyles =
    'w-full bg-offwhite border border-espresso/10 px-4 py-3 font-body text-sm text-espresso placeholder:text-espresso/40 focus:outline-none focus:border-gold/50 transition-colors';

  const contactDetails = [
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@casaaurelia.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 90000 00000',
    },
    {
      icon: MapPin,
      label: 'Address',
      value: 'New Delhi, India',
    },
    {
      icon: Clock,
      label: 'Working Hours',
      value: 'Mon–Sat, 10am–7pm IST',
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="py-24 sm:py-32 pt-28 sm:pt-36">
        <Container>
          <Reveal>
            <SectionLabel label="Contact" />
          </Reveal>
          <AnimatedText
            text="Let's talk about what you need."
            as="h1"
            className="font-display text-4xl sm:text-5xl lg:text-6xl mt-3 tracking-tight leading-tight"
          />
          <Reveal delay={0.2}>
            <p className="font-body text-espresso/60 mt-4 max-w-xl text-base sm:text-lg leading-relaxed">
              Whether you&apos;re buying, selling, or just exploring — we&apos;re here for a thoughtful conversation.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Contact Form + Details */}
      <section className="pb-16 sm:pb-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {/* Form */}
            <Reveal>
              <div>
                <SectionLabel label="Write to Us" />
                <h2 className="font-display text-2xl sm:text-3xl text-espresso mt-2 mb-6">
                  Send a message
                </h2>

                {submitted ? (
                  <div className="bg-offwhite border border-gold/20 p-8 text-center">
                    <p className="font-display text-2xl text-espresso mb-2">Message Sent</p>
                    <p className="font-body text-sm text-espresso/60">
                      Thank you for reaching out. This is a demo — no data was actually sent. We would
                      typically respond within 24 hours.
                    </p>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="mt-6"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', phone: '', reason: '', message: '' });
                      }}
                    >
                      Send Another
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={inputStyles}
                        />
                        {errors.name && <p className="text-terracotta text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <input
                          type="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={inputStyles}
                        />
                        {errors.email && <p className="text-terracotta text-xs mt-1">{errors.email}</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={inputStyles}
                        />
                        {errors.phone && <p className="text-terracotta text-xs mt-1">{errors.phone}</p>}
                      </div>
                      <select
                        value={formData.reason}
                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                        className={`${inputStyles} appearance-none cursor-pointer`}
                      >
                        <option value="">Reason for Contact</option>
                        <option value="Buy">Buy</option>
                        <option value="Sell">Sell</option>
                        <option value="Rent">Rent</option>
                        <option value="Invest">Invest</option>
                        <option value="General">General</option>
                      </select>
                    </div>
                    <div>
                      <textarea
                        placeholder="Your message"
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={`${inputStyles} resize-none`}
                      />
                    </div>
                    <Button type="submit" variant="primary" size="lg" className="w-full">
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
            </Reveal>

            {/* Contact Details */}
            <Reveal direction="right" delay={0.1}>
              <div className="md:pl-8 lg:pl-12">
                <SectionLabel label="Direct Contact" />
                <h2 className="font-display text-2xl sm:text-3xl text-espresso mt-2 mb-8">
                  Reach us directly
                </h2>

                <div className="space-y-6">
                  {contactDetails.map((detail) => (
                    <div key={detail.label} className="flex items-start gap-4">
                      <div className="shrink-0 w-10 h-10 rounded-full border border-espresso/10 flex items-center justify-center">
                        <detail.icon size={16} className="text-gold" />
                      </div>
                      <div>
                        <p className="font-mono text-xs uppercase tracking-wider text-espresso/50 mb-0.5">
                          {detail.label}
                        </p>
                        <p className="font-body text-base text-espresso">{detail.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 p-6 bg-offwhite border border-espresso/5">
                  <p className="font-mono text-xs uppercase tracking-wider text-gold mb-2">Note</p>
                  <p className="font-body text-sm text-espresso/60 leading-relaxed">
                    This is a demo website. The contact details above are fictional and no messages are transmitted. If you&apos;re interested in real estate services, please contact a licensed professional in your area.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-offwhite editorial-line">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <SectionLabel label="FAQ" />
              <h2 className="font-display text-3xl sm:text-4xl text-espresso mt-2 mb-10 tracking-tight">
                Common Questions
              </h2>
            </Reveal>
            <div className="space-y-0">
              {faqs.map((faq, index) => (
                <Reveal key={index} delay={index * 0.05}>
                  <details className="group border-b border-espresso/5">
                    <summary className="flex items-center justify-between py-5 cursor-pointer list-none">
                      <h3 className="font-display text-lg text-espresso pr-4 group-hover:text-gold transition-colors duration-300">
                        {faq.question}
                      </h3>
                      <span className="shrink-0 font-mono text-xs text-gold group-open:rotate-45 transition-transform duration-300">
                        +
                      </span>
                    </summary>
                    <div className="pb-5">
                      <p className="font-body text-sm text-espresso/60 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20 editorial-line">
        <Container className="text-center">
          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl text-espresso tracking-tight mb-4">
              Ready to explore properties?
            </h2>
            <p className="font-body text-espresso/60 mb-8 max-w-md mx-auto">
              Browse our curated collection of premium homes across India.
            </p>
            <Button href="/properties" variant="primary" size="lg">
              View Properties
            </Button>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}