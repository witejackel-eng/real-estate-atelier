'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/shared/Container';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { Button } from '@/components/shared/Button';

const phrases = [
  'Homes with taste.',
  'Spaces with story.',
  'Views worth pausing for.',
  'Decisions made calmly.',
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const advance = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % phrases.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(advance, 3000);
    return () => clearInterval(interval);
  }, [advance]);

  return (
    <section className="min-h-screen flex items-center relative bg-ivory overflow-hidden">
      {/* Subtle background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.04]"
          style={{ backgroundImage: "url('/images/hero-main.jpg')" }}
        />
      </div>

      <Container className="relative z-10 pt-24 pb-16 md:pt-32 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionLabel label="/ CURATED REAL ESTATE" />

          <motion.p
            className="font-mono text-xs tracking-[0.2em] text-espresso/50 mb-8 md:mb-10 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.3 }}
          >
            Delhi NCR · Mumbai · Goa · Bangalore
          </motion.p>

          {/* Kinetic Hero Text */}
          <div className="h-[1.2em] sm:h-[1.3em] md:h-[1.2em] mb-8 md:mb-10">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentIndex}
                className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold leading-tight text-espresso"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {phrases[currentIndex]}
              </motion.h1>
            </AnimatePresence>
          </div>

          <motion.p
            className="font-body text-lg text-espresso/70 max-w-2xl mb-10 md:mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Casa Aurelia curates premium homes, private viewings, and selling strategies for people
            who want clarity before they move.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button href="/properties" variant="primary" size="lg">
              Explore Properties
            </Button>
            <Button href="/sell" variant="secondary" size="lg">
              Request Valuation
            </Button>
          </motion.div>

          <motion.p
            className="font-mono text-xs text-gold tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.9 }}
          >
            Private viewings · Verified listings · Clear negotiation support
          </motion.p>
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2 }}
      >
        <motion.div
          className="w-px h-12 bg-gold/40"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top' }}
        />
      </motion.div>
    </section>
  );
}