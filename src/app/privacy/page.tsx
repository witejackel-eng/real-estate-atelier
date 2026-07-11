import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Casa Aurelia.',
};

export default function PrivacyPage() {
  return (
    <main className="section-py">
      <div className="container-editorial">
        <h1 className="display-page text-ink mb-12">Privacy Policy</h1>

        <div className="space-y-10">
          {/* Demo Disclaimer */}
          <section>
            <p className="body-copy-muted mb-4">
              This is a demonstration website. No real data is collected,
              stored, or transmitted. Form submissions are simulated for
              demonstration purposes only. No personal information you
              provide on this site is sent to any server, database, or
              third-party service.
            </p>
          </section>

          <hr className="rule-soft" />

          {/* Information Collection */}
          <section>
            <h2 className="heading-sub text-ink mb-3">Information Collection</h2>
            <p className="body-copy-muted">
              In a live version of this website, the following types of
              information would be collected when you submit a form or
              interact with our services:
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start gap-3 body-copy-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-brass mt-2 shrink-0" aria-hidden="true" />
                Personal identification information: name, email address, phone number
              </li>
              <li className="flex items-start gap-3 body-copy-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-brass mt-2 shrink-0" aria-hidden="true" />
                Property preferences and search criteria
              </li>
              <li className="flex items-start gap-3 body-copy-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-brass mt-2 shrink-0" aria-hidden="true" />
                Viewing schedules and inquiry details
              </li>
              <li className="flex items-start gap-3 body-copy-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-brass mt-2 shrink-0" aria-hidden="true" />
                Basic browsing behaviour through standard server logs
              </li>
            </ul>
          </section>

          <hr className="rule-soft" />

          {/* Use of Information */}
          <section>
            <h2 className="heading-sub text-ink mb-3">Use of Information</h2>
            <p className="body-copy-muted">
              In a production environment, any collected information would be
              used exclusively for the following purposes:
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start gap-3 body-copy-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-brass mt-2 shrink-0" aria-hidden="true" />
                Responding to your property inquiries and scheduling viewings
              </li>
              <li className="flex items-start gap-3 body-copy-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-brass mt-2 shrink-0" aria-hidden="true" />
                Providing market updates and property recommendations with your consent
              </li>
              <li className="flex items-start gap-3 body-copy-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-brass mt-2 shrink-0" aria-hidden="true" />
                Improving our website, services, and user experience
              </li>
              <li className="flex items-start gap-3 body-copy-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-brass mt-2 shrink-0" aria-hidden="true" />
                Communicating with you about our services as appropriate
              </li>
            </ul>
          </section>

          <hr className="rule-soft" />

          {/* Data Protection */}
          <section>
            <h2 className="heading-sub text-ink mb-3">Data Protection</h2>
            <p className="body-copy-muted">
              Since no real data is collected or stored by this demo website,
              there are no security concerns regarding personal information.
              In a production environment, we would implement industry-standard
              encryption, secure hosting, and access controls to protect any
              collected data in compliance with applicable Indian data protection
              legislation.
            </p>
          </section>

          <hr className="rule-soft" />

          {/* Cookies */}
          <section>
            <h2 className="heading-sub text-ink mb-3">Cookies</h2>
            <p className="body-copy-muted">
              This demo website does not use tracking cookies or any
              third-party analytics services. In a production environment,
              we would use only essential cookies required for the
              website to function, and any additional cookies would
              require your explicit consent.
            </p>
          </section>

          <hr className="rule-soft" />

          {/* Third Parties */}
          <section>
            <h2 className="heading-sub text-ink mb-3">Third Parties</h2>
            <p className="body-copy-muted">
              This demo website does not share any information with third
              parties. In a production environment, we would only share
              data with service providers who assist in operating the
              website and conducting our business, and only under strict
              confidentiality agreements.
            </p>
          </section>

          <hr className="rule-soft" />

          {/* Changes */}
          <section>
            <h2 className="heading-sub text-ink mb-3">Changes to This Policy</h2>
            <p className="body-copy-muted">
              We may update this privacy policy from time to time. Any
              changes would be posted on this page with an updated
              revision date. Continued use of the website after changes
              are posted constitutes acceptance of the revised policy.
            </p>
          </section>

          <hr className="rule-soft" />

          {/* Contact */}
          <section>
            <h2 className="heading-sub text-ink mb-3">Contact</h2>
            <p className="body-copy-muted">
              If you have any questions about this privacy policy, you
              may contact us at{' '}
              <span className="text-brass">hello@casaaurelia.com</span>.
              Please note this email address is fictional and part of
              the demonstration.
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