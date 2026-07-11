import { Container } from '@/components/shared/Container';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Terms of Use',
  description: 'Terms of Use for Casa Aurelia.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <div className="min-h-screen py-24 sm:py-32 pt-28 sm:pt-36">
      <Container>
        <div className="max-w-3xl mx-auto">
          <SectionLabel>Legal</SectionLabel>
          <h1 className="font-display text-4xl sm:text-5xl text-espresso mt-2 mb-10 tracking-tight">
            Terms of Use
          </h1>

          <div className="space-y-8">
            <section>
              <h2 className="font-display text-xl text-espresso mb-3">Demo Nature of This Website</h2>
              <p className="font-body text-sm text-espresso/70 leading-relaxed">
                This website (&quot;Casa Aurelia&quot;) is a demonstration project created for portfolio and
                educational purposes. It does not represent a real real estate brokerage, advisory firm,
                or any other type of business entity. All property listings, contact
                information, and services described on this website are fictional.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-espresso mb-3">No Real Brokerage Service</h2>
              <p className="font-body text-sm text-espresso/70 leading-relaxed">
                Casa Aurelia does not provide any real estate brokerage, advisory, valuation, or property
                management services. Any forms, calculators, or interactive features on this website are
                for demonstration purposes only and should not be relied upon for making property
                decisions.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-espresso mb-3">Intellectual Property</h2>
              <p className="font-body text-sm text-espresso/70 leading-relaxed">
                The design, layout, and code of this website are original work created for demonstration
                purposes. Property images used on this site are either generated, licensed for
                demonstration use, or used under fair use principles.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-espresso mb-3">Limitation of Liability</h2>
              <p className="font-body text-sm text-espresso/70 leading-relaxed">
                To the fullest extent permitted by applicable law, the creators of this demo website
                shall not be liable for any direct, indirect, incidental, consequential, or special
                damages arising from the use of, or inability to use, this website. All information
                presented is fictional and should not be used as a basis for any real-world decisions.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-espresso mb-3">User Conduct</h2>
              <p className="font-body text-sm text-espresso/70 leading-relaxed">
                By using this website, you agree to use it only for lawful purposes. You may not attempt
                to gain unauthorized access to any part of the website, use it in any way that could
                damage, disable, or impair the website, or use any automated means to access the
                website&apos;s content.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-espresso mb-3">Governing Law</h2>
              <p className="font-body text-sm text-espresso/70 leading-relaxed">
                These terms are governed by the laws of India. Any disputes arising from the use of this
                website would be subject to the exclusive jurisdiction of the courts in New Delhi, India.
              </p>
            </section>

            <section className="pt-6 border-t border-espresso/5">
              <p className="font-mono text-xs text-espresso/40">
                Last updated: July 2026
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}