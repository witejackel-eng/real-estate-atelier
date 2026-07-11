'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

function useSessionLoader() {
  const sessionKey = 'ca_loader_session';
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem(sessionKey)) return;

    const duration = 1600;
    const interval = 16;
    const step = 100 / (duration / interval);
    let current = 0;

    const timer = setInterval(() => {
      current += step + Math.random() * 2;
      if (current >= 100) {
        current = 100;
        clearInterval(timer);
        setTimeout(() => {
          sessionStorage.setItem(sessionKey, '1');
          loaderVisible = false;
          dispatchVisibility();
        }, 200);
      }
      setCount(Math.min(Math.floor(current), 100));
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return count;
}

let loaderVisible = true;
const visibilityListeners = new Set<() => void>();
function dispatchVisibility() {
  visibilityListeners.forEach((l) => l());
}
function subscribeVisibility(cb: () => void) {
  visibilityListeners.add(cb);
  return () => visibilityListeners.delete(cb);
}
function getVisibilitySnapshot() {
  // On first render during SSR, check session storage if available
  if (typeof window !== 'undefined') {
    return !sessionStorage.getItem('ca_loader_session');
  }
  return true;
}

export function PageLoader() {
  const count = useSessionLoader();
  const visible = useSyncExternalStore(subscribeVisibility, getVisibilitySnapshot, () => true);

  if (!visible) return null;

  return (
    <div className="loader-overlay" aria-hidden="true">
      <div className="flex flex-col items-center gap-6">
        <span
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 3vw, 32px)', color: 'var(--color-ivory)' }}
        >
          Casa Aurelia
        </span>
        <div className="flex items-center gap-4">
          <div
            style={{
              width: '120px',
              height: '1px',
              background: 'rgba(242, 238, 229, 0.2)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${count}%`,
                height: '100%',
                background: 'var(--color-chartreuse)',
                transition: 'width 0.1s linear',
              }}
            />
          </div>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.1em',
              color: 'var(--color-ivory)',
              minWidth: '2.5rem',
              textAlign: 'right',
            }}
          >
            {String(count).padStart(3, '0')}
          </span>
        </div>
      </div>
    </div>
  );
}