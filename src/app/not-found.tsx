'use client';

import Link from 'next/link';
import { Reveal } from '@/components/shared/Reveal';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-paper">
      <div className="container-editorial text-center py-20 md:py-32">
        <Reveal>
          <h1 className="display-hero text-ink/10">404</h1>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="heading-sub text-ink mt-4">
            This page doesn&apos;t exist.
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="body-copy-muted mt-4 max-w-md mx-auto">
            The page you&apos;re looking for may have been moved or
            doesn&apos;t exist.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div className="mt-10">
            <Link href="/" className="btn-outline-dark">
              Return home
            </Link>
          </div>
        </Reveal>
      </div>
    </main>
  );
}