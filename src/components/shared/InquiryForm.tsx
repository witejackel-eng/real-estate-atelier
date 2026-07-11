'use client';

import { useState } from 'react';
import { SectionLabel } from './SectionLabel';
import { Button } from './Button';

export function InquiryForm({ propertyTitle }: { propertyTitle?: string }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
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

  if (submitted) {
    return (
      <div className="bg-offwhite border border-espresso/10 p-8 text-center">
        <p className="font-display text-2xl text-espresso mb-2">Thank you for your inquiry</p>
        <p className="text-espresso/60 font-body">
          We&apos;ll get back to you within 24 hours. This is a demo — no data was sent.
        </p>
      </div>
    );
  }

  return (
    <div>
      <SectionLabel label="Inquire" />
      <h3 className="font-display text-2xl text-espresso mt-2 mb-6">
        Interested in {propertyTitle ? `"${propertyTitle}"` : 'this property'}?
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-offwhite border border-espresso/10 px-4 py-3 font-body text-sm text-espresso placeholder:text-espresso/40 focus:outline-none focus:border-gold/50 transition-colors"
          />
          {errors.name && <p className="text-terracotta text-xs mt-1 font-body">{errors.name}</p>}
        </div>
        <div>
          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-offwhite border border-espresso/10 px-4 py-3 font-body text-sm text-espresso placeholder:text-espresso/40 focus:outline-none focus:border-gold/50 transition-colors"
          />
          {errors.email && <p className="text-terracotta text-xs mt-1 font-body">{errors.email}</p>}
        </div>
        <div>
          <input
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full bg-offwhite border border-espresso/10 px-4 py-3 font-body text-sm text-espresso placeholder:text-espresso/40 focus:outline-none focus:border-gold/50 transition-colors"
          />
          {errors.phone && <p className="text-terracotta text-xs mt-1 font-body">{errors.phone}</p>}
        </div>
        <div>
          <textarea
            placeholder="Your message (optional)"
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full bg-offwhite border border-espresso/10 px-4 py-3 font-body text-sm text-espresso placeholder:text-espresso/40 focus:outline-none focus:border-gold/50 transition-colors resize-none"
          />
        </div>
        <Button type="submit" variant="primary" size="lg" className="w-full">
          Send Inquiry
        </Button>
      </form>
    </div>
  );
}