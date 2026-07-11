'use client';

import { useEffect, useRef, useCallback } from 'react';

export function CursorManager() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });

  const onMouseMove = useCallback((e: MouseEvent) => {
    targetRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    document.addEventListener('mousemove', onMouseMove);

    let raf: number;
    function animate() {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.15;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.15;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${targetRef.current.x - 4}px, ${targetRef.current.y - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${posRef.current.x - 18}px, ${posRef.current.y - 18}px)`;
      }
      raf = requestAnimationFrame(animate);
    }
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, [onMouseMove]);

  // Handle hover states on interactive elements
  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const addViewing = () => {
      dot.classList.add('viewing');
      ring.classList.add('viewing');
      if (dot.querySelector('.cursor-label')) return;
      const label = document.createElement('span');
      label.className = 'cursor-label';
      label.textContent = 'VIEW';
      label.style.cssText = 'font-family:var(--font-mono);font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--color-cobalt);pointer-events:none;';
      dot.appendChild(label);
    };
    const removeViewing = () => {
      dot.classList.remove('viewing');
      ring.classList.remove('viewing');
      const label = dot.querySelector('.cursor-label');
      if (label) label.remove();
    };

    const observer = new MutationObserver(() => {
      document.querySelectorAll('a[href], button, [role="button"], .cursor-view').forEach((el) => {
        if (!el.hasAttribute('data-cursor-bound')) {
          el.setAttribute('data-cursor-bound', 'true');
          el.addEventListener('mouseenter', addViewing);
          el.addEventListener('mouseleave', removeViewing);
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Initial bind
    document.querySelectorAll('a[href], button, [role="button"], .cursor-view').forEach((el) => {
      el.setAttribute('data-cursor-bound', 'true');
      el.addEventListener('mouseenter', addViewing);
      el.addEventListener('mouseleave', removeViewing);
    });

    return () => {
      observer.disconnect();
      document.querySelectorAll('[data-cursor-bound]').forEach((el) => {
        el.removeEventListener('mouseenter', addViewing);
        el.removeEventListener('mouseleave', removeViewing);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}