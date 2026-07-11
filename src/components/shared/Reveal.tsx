'use client';

import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

const directionTransform = {
  up: 'translateY(12px)',
  down: 'translateY(-12px)',
  left: 'translateX(12px)',
  right: 'translateX(-12px)',
  none: 'none',
};

export function Reveal({
  children,
  className,
  delay = 0,
  direction = 'up',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Before mount: render plain div (matches server HTML exactly)
  if (!mounted) {
    return (
      <div ref={ref} className={cn(className)}>
        {children}
      </div>
    );
  }

  // After mount: apply CSS transitions (client-only, no hydration risk)
  const shouldAnimate = !isInView;

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: shouldAnimate ? 0 : 1,
        transform: shouldAnimate ? directionTransform[direction] : 'none',
        transition: `opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}