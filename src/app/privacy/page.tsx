import type { Metadata } from 'next';
import { Container } from '@/components/shared/Container';
import { SectionLabel } from '@/components/shared/SectionLabel';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Privacy Policy',
  description: 'Privacy Policy for Casa Aurelia.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-24 sm:py-32 pt-28 sm:pt-36">
      <Container>
        <div className="max-w-3xl mx-auto">
          <SectionLabel>Legal</SectionLabel>
          <h1 className="font-display text-4xl sm:text-5xl text-espresso mt-2 mb-10 tracking-tight">
            Privacy Policy
          </h1>

          <div className="space-y-8">
            <section>
              <h2 className="font-display text-xl text-espresso mb-3">Demo Disclaimer</h2>
              <p className="font-body text-sm text-espresso/70 leading-relaxed">
                This is a demo website. No real data is collected, stored, or transmitted. Form submissions
                are simulated for demonstration purposes only. No personal information you enter on this
                website is sent to any server, database, or third-party service.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-espresso mb-3">Information We Collect</h2>
              <p className="font-body text-sm text-espresso/70 leading-relaxed">
                In a live version of this website, we would collect the following types of information
                when you submit a form:
              </p>
              <ul className="mt-3 space-y-2">
                <li className="flex items-start gap-3 font-body text-sm text-espresso/70">
                  <span className="text-gold mt-1.5 block w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  Personal identification information: name, email address, phone number
                </li>
                <li className="flex items-start gap-3 font-body text-sm text-espresso/70">
                  <span className="text-gold mt-1.5 block w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  Property preferences and search criteria
                </li>
                <li className="flex items-start gap-3 font-body text-sm text-espresso/70">
                  <span className="text-gold mt-1.5 block w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  Viewing schedules and inquiry details
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl text-espresso mb-3">How We Use Information</h2>
              <p className="font-body text-sm text-espresso/70 leading-relaxed">
                In a live version, any collected information would be used exclusively to:
              </p>
              <ul className="mt-3 space-y-2">
                <li className="flex items-start gap-3 font-body text-sm text-espresso/70">
                  <span className="text-gold mt-1.5 block w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  Respond to your property inquiries
                </li>
                <li className="flex items-start gap-3 font-body text-sm text-espresso/70">
                  <span className="text-gold mt-1.5 block w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  Schedule and manage property viewings
                </li>
                <li className="flex items-start gap-3 font-body text-sm text-espresso/70">
                  <span className="text-gold mt-1.5 block w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  Provide market updates and property recommendations (with your consent)
                </li>
                <li className="flex items-start gap-3 font-body text-sm text-espresso/70">
                  <span className="text-gold mt-1.5 block w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  Improve our website and services
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl text-espresso mb-3">Third-Party Services</h2>
              <p className="font-body text-sm text-espresso/70 leading-relaxed">
                This demo website does not use any third-party analytics, advertising, or tracking services.
                In a production environment, we would only use services that comply with applicable data
                protection laws and would disclose them clearly here.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-espresso mb-3">Data Security</h2>
              <p className="font-body text-sm text-espresso/70 leading-relaxed">
                Since no real data is collected or stored by this demo website, there are no security
                concerns regarding personal information. In a production environment, we would implement
                industry-standard encryption and security measures to protect any collected data.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl text-espresso mb-3">Contact for Privacy Concerns</h2>
              <p className="font-body text-sm text-espresso/70 leading-relaxed">
                If you have any questions or concerns about this privacy policy, you may reach us at:{' '}
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
    </div>
  );
}