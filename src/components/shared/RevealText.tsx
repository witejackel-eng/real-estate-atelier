'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface RevealTextProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  delay?: number;
}

export function RevealText({
  children,
  className,
  as: Tag = 'h2',
  delay = 0,
}: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  const words = children.split(' ');

  return (
    <div ref={ref}>
      <Tag className={cn(className)}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0.85, y: 4 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0.85, y: 4 }
            }
            transition={{
              duration: 0.6,
              delay: delay + i * 0.03,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ display: 'inline-block', marginRight: '0.25em' }}
          >
            {word}
          </motion.span>
        ))}
      </Tag>
    </div>
  );
}