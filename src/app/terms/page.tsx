import type { Metadata } from 'next';
import { Container } from '@/components/shared/Container';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of Use for Casa Aurelia — a demo real estate website.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen py-24 sm:py-32 pt-28 sm:pt-36">
      <Container>
        <div className="max-w-3xl mx-auto">
          <span className="mono-label">Legal</span>
          <h1 className="font-display text-4xl sm:text-5xl text-espresso mt-2 mb-10 tracking-tight">
            Terms of Use
          </h1>

          <div className="space-y-8">
            <section>
              <h2 className="font-display text-xl text-espresso mb-3">Demo Nature of This Website</h2>
              <p className="font-body text-sm text-espresso/70 leading-relaxed">
                This website (&quot;Casa Aurelia&quot;) is a demonstration project created for portfolio and
                educational purposes. It does not represent a real real estate brokerage, advisory firm,
                or any other type of business entity. All property listings, team members, contact
                information, and services described on this website are fictional.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-espresso mb-3">No Real Brokerage Service</h2>
              <p className="font-body text-sm text-espresso/70 leading-relaxed">
                Casa Aurelia does not provide any real estate brokerage, advisory, valuation, or property
                management services. Any forms, calculators, or interactive features on this website are
                for demonstration purposes only and should not be relied upon for making property
                decisions. No transactions, agreements, or professional relationships are created through
                the use of this website.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-espresso mb-3">Intellectual Property</h2>
              <p className="font-body text-sm text-espresso/70 leading-relaxed">
                The design, layout, and code of this website are original work created for demonstration
                purposes. Property images used on this site are either generated, licensed for
                demonstration use, or used under fair use principles. No claim is made to the ownership
                of property images or any third-party content that may appear on this site.
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
              <h2 className="font-display text-xl text-espresso mb-3">Changes to These Terms</h2>
              <p className="font-body text-sm text-espresso/70 leading-relaxed">
                These terms may be updated from time to time. Continued use of this website after any
                changes constitutes your acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-espresso mb-3">Governing Law</h2>
              <p className="font-body text-sm text-espresso/70 leading-relaxed">
                These terms are governed by the laws of India. Any disputes arising from the use of this
                website would be subject to the exclusive jurisdiction of the courts in New Delhi, India.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-espresso mb-3">Contact</h2>
              <p className="font-body text-sm text-espresso/70 leading-relaxed">
                For questions about these terms, contact us at:{' '}
                <span className="text-gold">hello@casaaurelia.com</span>
              </p>
              <p className="font-body text-sm text-espresso/50 mt-2">
                Please note this email address is fictional and part of the demo.
              </p>
            </section>

            <section className="pt-6 border-t border-espresso/5">
              <p className="font-mono text-xs text-espresso/40">
                Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}