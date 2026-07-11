'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from './Button';

function BookingForm({
  propertyName,
  onClose,
}: {
  propertyName?: string;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
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

  return (
    <>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-espresso/50 hover:text-espresso transition-colors"
        aria-label="Close modal"
      >
        <X size={20} />
      </button>

      {submitted ? (
        <div className="text-center py-8">
          <p className="font-display text-2xl text-espresso mb-2">Viewing Requested</p>
          <p className="text-espresso/60 font-body text-sm">
            We&apos;ll confirm your viewing slot soon. This is a demo — no data was sent.
          </p>
        </div>
      ) : (
        <>
          <span className="mono-label">Book a Viewing</span>
          <h3 className="font-display text-2xl text-espresso mt-2 mb-1">
            Schedule a Visit
          </h3>
          {propertyName && (
            <p className="text-gold font-mono text-sm mb-6">{propertyName}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-ivory border border-espresso/10 px-4 py-3 font-body text-sm text-espresso placeholder:text-espresso/40 focus:outline-none focus:border-gold/50 transition-colors"
              />
              {errors.name && <p className="text-terracotta text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-ivory border border-espresso/10 px-4 py-3 font-body text-sm text-espresso placeholder:text-espresso/40 focus:outline-none focus:border-gold/50 transition-colors"
              />
              {errors.email && <p className="text-terracotta text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-ivory border border-espresso/10 px-4 py-3 font-body text-sm text-espresso placeholder:text-espresso/40 focus:outline-none focus:border-gold/50 transition-colors"
              />
              {errors.phone && <p className="text-terracotta text-xs mt-1">{errors.phone}</p>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full bg-ivory border border-espresso/10 px-4 py-3 font-body text-sm text-espresso focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>
              <div>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full bg-ivory border border-espresso/10 px-4 py-3 font-body text-sm text-espresso focus:outline-none focus:border-gold/50 transition-colors"
                >
                  <option value="">Preferred Time</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                  <option value="5:00 PM">5:00 PM</option>
                </select>
              </div>
            </div>
            <Button type="submit" variant="primary" size="lg" className="w-full mt-2">
              Request Viewing
            </Button>
          </form>
        </>
      )}
    </>
  );
}

export function BookViewingModal({
  open,
  onOpenChange,
  propertyName,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  propertyName?: string;
}) {
  const handleClose = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };
    if (open) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [open, onOpenChange]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-espresso/60 backdrop-blur-sm" onClick={handleClose} />
          <motion.div
            className="relative bg-offwhite w-full max-w-lg max-h-[90vh] overflow-y-auto p-8"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <BookingForm propertyName={propertyName} onClose={handleClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}