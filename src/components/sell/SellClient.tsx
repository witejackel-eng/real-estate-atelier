'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Container } from '@/components/shared/Container';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { Reveal } from '@/components/shared/Reveal';
import { AnimatedText } from '@/components/shared/AnimatedText';
import { Button } from '@/components/shared/Button';

const steps = [
  {
    number: '01',
    title: 'Valuation',
    description: 'We assess your property\'s market position with honest comparable analysis.',
  },
  {
    number: '02',
    title: 'Positioning',
    description: 'We define the right buyer profile and craft a narrative that speaks to them.',
  },
  {
    number: '03',
    title: 'Photography',
    description: 'Professional photography and staging that shows your home at its best.',
  },
  {
    number: '04',
    title: 'Private Buyer List',
    description: 'Access to our network of pre-qualified, serious buyers.',
  },
  {
    number: '05',
    title: 'Negotiation',
    description: 'We handle offers, counter-offers, and terms so you don\'t have to.',
  },
  {
    number: '06',
    title: 'Closing',
    description: 'Documentation, legal checks, and handover managed end to end.',
  },
];

const checklist = [
  'Declutter — Remove excess furniture and personal items',
  'Deep clean — Every surface, window, and corner',
  'Minor repairs — Fix leaky faucets, cracked tiles, peeling paint',
  'Neutral colors — Repaint bold walls in warm neutrals',
  'Curb appeal — Freshen up the entrance, landscaping, and exterior',
  'Good lighting — Open curtains, add lamps to dark corners',
  'Remove personal items — Family photos, collections, memorabilia',
];

const faqs = [
  {
    question: 'How long does the selling process take with Casa Aurelia?',
    answer:
      'On average, our properties sell within 45-90 days from listing. This timeline depends on the property type, market conditions, and pricing. Premium properties in desirable locations may move faster.',
  },
  {
    question: 'What is your commission structure?',
    answer:
      'Our commission is discussed transparently during the initial consultation and is competitive with industry standards. We believe in clear, upfront pricing with no hidden fees.',
  },
  {
    question: 'Do I need to stage my property before selling?',
    answer:
      'We strongly recommend professional staging or at minimum, following our staging checklist. Studies show well-presented properties sell 20-30% faster and often at higher prices.',
  },
  {
    question: 'How do you determine the right asking price?',
    answer:
      'We use a combination of recent comparable sales, current market analysis, property condition assessment, and our deep knowledge of neighborhood-level pricing trends. We never inflate prices to win listings.',
  },
  {
    question: 'Will you manage the entire closing process?',
    answer:
      'Yes. From documentation and legal verification to coordination with buyers, lawyers, and financial institutions — we manage the entire end-to-end process so you can focus on your next move.',
  },
];

export function SellClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    propertyType: '',
    expectedPrice: '',
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
    if (!formData.location.trim()) newErrors.location = 'Property location is required';
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

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-espresso text-offwhite py-24 sm:py-32 pt-28 sm:pt-36 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/sell-hero.jpg"
            alt="Sell your property"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
        </div>
        <Container className="relative z-10">
          <SectionLabel label="Sell" className="text-offwhite/50 [&_span]:text-offwhite/30" />
          <AnimatedText
            text="Sell with less noise and better preparation."
            as="h1"
            className="font-display text-4xl sm:text-5xl lg:text-6xl mt-3 tracking-tight leading-tight"
          />
          <p className="font-body text-offwhite/60 mt-4 max-w-xl text-base sm:text-lg leading-relaxed">
            We help you present, position, and price your property so it attracts the right buyers — without the usual chaos.
          </p>
        </Container>
      </section>

      {/* Process */}
      <section id="process" className="py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionLabel label="Our Process" />
            <h2 className="font-display text-3xl sm:text-4xl text-espresso mt-2 mb-12 tracking-tight">
              Six steps to a confident sale
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <Reveal key={step.number} delay={index * 0.08}>
                <div className="relative flex gap-5">
                  <div className="shrink-0 w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center">
                    <span className="font-mono text-xs text-gold">{step.number}</span>
                  </div>
                  <div className="pt-1">
                    <h3 className="font-display text-xl text-espresso mb-2">{step.title}</h3>
                    <p className="font-body text-sm text-espresso/60 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Presentation Matters */}
      <section className="py-16 sm:py-20 bg-offwhite editorial-line">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <Reveal direction="left">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/service-staging.jpg"
                  alt="Professional property staging"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </Reveal>
            <Reveal direction="right" delay={0.1}>
              <SectionLabel label="Why It Matters" />
              <h2 className="font-display text-3xl sm:text-4xl text-espresso mt-2 mb-6 tracking-tight">
                Presentation isn&apos;t vanity. It&apos;s strategy.
              </h2>
              <p className="font-body text-base text-espresso/70 leading-relaxed mb-4">
                Research consistently shows that professionally presented properties sell faster and at higher prices. First impressions are formed within seconds of viewing a listing online — and those seconds determine whether a buyer clicks &quot;schedule a viewing&quot; or keeps scrolling.
              </p>
              <p className="font-body text-base text-espresso/70 leading-relaxed mb-4">
                We invest in professional photography, strategic staging, and compelling descriptions because we know these details directly impact your sale outcome. Our approach transforms how buyers perceive your property — often resulting in offers that exceed expectations.
              </p>
              <p className="font-body text-base text-espresso/70 leading-relaxed">
                In a market where buyers have hundreds of options at their fingertips, presentation is the difference between a property that sits and one that sells.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Staging Checklist */}
      <section className="py-16 sm:py-20 editorial-line">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <SectionLabel label="Prepare" />
              <h2 className="font-display text-3xl sm:text-4xl text-espresso mt-2 mb-10 tracking-tight">
                Staging Checklist
              </h2>
            </Reveal>
            <div className="space-y-0">
              {checklist.map((item, index) => (
                <Reveal key={index} delay={index * 0.05}>
                  <div className="flex items-start gap-4 py-4 border-b border-espresso/5">
                    <span className="shrink-0 w-6 h-6 rounded-full border border-gold/30 flex items-center justify-center mt-0.5">
                      <span className="block w-1.5 h-1.5 rounded-full bg-gold" />
                    </span>
                    <p className="font-body text-base text-espresso/80">{item}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Valuation Form */}
      <section className="py-16 sm:py-20 bg-offwhite editorial-line">
        <Container>
          <div className="max-w-2xl mx-auto">
            <Reveal>
              <SectionLabel label="Get Started" />
              <h2 className="font-display text-3xl sm:text-4xl text-espresso mt-2 mb-3 tracking-tight">
                Request a Free Valuation
              </h2>
              <p className="font-body text-espresso/60 mb-8">
                Tell us about your property and we&apos;ll provide an honest, no-obligation market assessment.
              </p>
            </Reveal>

            {submitted ? (
              <Reveal>
                <div className="bg-ivory border border-gold/20 p-8 sm:p-10 text-center">
                  <p className="font-display text-2xl text-espresso mb-2">Valuation Request Received</p>
                  <p className="font-body text-sm text-espresso/60">
                    Thank you for your interest. This is a demo — no data was actually sent. Our team would
                    typically reach out within 24 hours.
                  </p>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="mt-6"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', location: '', propertyType: '', expectedPrice: '', message: '' });
                    }}
                  >
                    Submit Another
                  </Button>
                </div>
              </Reveal>
            ) : (
              <Reveal delay={0.1}>
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
                    <div>
                      <input
                        type="text"
                        placeholder="Property Location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className={inputStyles}
                      />
                      {errors.location && (
                        <p className="text-terracotta text-xs mt-1">{errors.location}</p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      className={`${inputStyles} appearance-none cursor-pointer`}
                    >
                      <option value="">Property Type</option>
                      <option value="Villa">Villa</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Penthouse">Penthouse</option>
                      <option value="Duplex">Duplex</option>
                      <option value="Weekend Home">Weekend Home</option>
                      <option value="Heritage Home">Heritage Home</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Expected Price (e.g., ₹3 Cr)"
                      value={formData.expectedPrice}
                      onChange={(e) => setFormData({ ...formData, expectedPrice: e.target.value })}
                      className={inputStyles}
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Tell us more about your property (optional)"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`${inputStyles} resize-none`}
                    />
                  </div>
                  <Button type="submit" variant="primary" size="lg" className="w-full">
                    Request Valuation
                  </Button>
                </form>
              </Reveal>
            )}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 editorial-line">
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
    </main>
  );
}