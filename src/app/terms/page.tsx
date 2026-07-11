import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Casa Aurelia.',
};

export default function TermsPage() {
  return (
    <main className="section-py">
      <div className="container-editorial">
        <h1 className="display-page text-ink mb-12">Terms of Service</h1>

        <div className="space-y-10">
          {/* Demo Disclaimer */}
          <section>
            <p className="body-copy-muted mb-4">
              This website is a demonstration project created for portfolio
              and educational purposes. It does not represent a real real
              estate brokerage, advisory firm, or any other type of
              business entity. All property listings, contact information,
              and services described on this website are fictional.
            </p>
          </section>

          <hr className="rule-soft" />

          {/* Acceptance */}
          <section>
            <h2 className="heading-sub text-ink mb-3">Acceptance</h2>
            <p className="body-copy-muted">
              By accessing and using this website, you acknowledge that
              you have read these terms and agree to be bound by them.
              If you do not agree with any part of these terms, you
              should not use this website. These terms apply to all
              visitors, users, and others who access the site.
            </p>
          </section>

          <hr className="rule-soft" />

          {/* Demo Nature */}
          <section>
            <h2 className="heading-sub text-ink mb-3">Demo Nature</h2>
            <p className="body-copy-muted">
              Casa Aurelia does not provide any real estate brokerage,
              advisory, valuation, or property management services.
              Any forms, calculators, or interactive features on this
              website are for demonstration purposes only and should
              not be relied upon for making property decisions. All
              property data, pricing, and descriptions are fictional.
            </p>
          </section>

          <hr className="rule-soft" />

          {/* Intellectual Property */}
          <section>
            <h2 className="heading-sub text-ink mb-3">Intellectual Property</h2>
            <p className="body-copy-muted">
              The design, layout, and code of this website are original
              work created for demonstration purposes. Property images
              used on this site are either generated, licensed for
              demonstration use, or used under fair use principles.
              You may not reproduce, distribute, or create derivative
              works from the content of this site without prior
              written permission.
            </p>
          </section>

          <hr className="rule-soft" />

          {/* Limitation of Liability */}
          <section>
            <h2 className="heading-sub text-ink mb-3">Limitation of Liability</h2>
            <p className="body-copy-muted">
              To the fullest extent permitted by applicable law, the
              creators of this demo website shall not be liable for any
              direct, indirect, incidental, consequential, or special
              damages arising from the use of, or inability to use,
              this website. All information presented is fictional and
              should not be used as a basis for any real-world decisions.
            </p>
          </section>

          <hr className="rule-soft" />

          {/* Changes */}
          <section>
            <h2 className="heading-sub text-ink mb-3">Changes to These Terms</h2>
            <p className="body-copy-muted">
              We reserve the right to modify these terms at any time.
              Changes will be posted on this page with an updated
              revision date. Your continued use of the website after
              any changes constitutes acceptance of the revised terms.
            </p>
          </section>

          <hr className="rule-soft" />

          {/* Contact */}
          <section>
            <h2 className="heading-sub text-ink mb-3">Contact</h2>
            <p className="body-copy-muted">
              If you have any questions about these terms, you may
              contact us at{' '}
              <span className="text-brass">hello@casaaurelia.com</span>.
              Please note this email address is fictional and part
              of the demonstration.
            </p>
          </section>

          {/* Footer */}
          <section className="pt-6 border-t border-ink/5">
            <p className="label-micro text-muted">
              Last updated: July 2026
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}