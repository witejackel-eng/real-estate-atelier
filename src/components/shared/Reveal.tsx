"use client";

import { useRef, useState, useEffect, type CSSProperties, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  translateY?: number;
}

export function Reveal({
  children,
  className,
  style,
  delay = 0,
  translateY = 20,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!mounted) {
    return (
      <div ref={ref} className={className} style={style}>
        {children}
      </div>
    );
  }

  const hidden = !inView;
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: hidden ? 0 : 1,
        transform: hidden ? `translateY(${translateY}px)` : "translateY(0)",
        transition: `opacity var(--duration-reveal) var(--ease-out-expo) ${delay}ms, transform var(--duration-reveal) var(--ease-out-expo) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}