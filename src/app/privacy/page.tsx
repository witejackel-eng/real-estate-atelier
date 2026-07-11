import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Privacy Policy',
  description: 'Privacy Policy for Casa Aurelia.',
  path: '/privacy',
});

const sections = [
  {
    heading: 'Demo Disclaimer',
    body: [
      'This is a demo website. No real data is collected, stored, or transmitted. Form submissions are simulated for demonstration purposes only. No personal information you enter on this website is sent to any server, database, or third-party service.',
    ],
  },
  {
    heading: 'Information We Collect',
    body: [
      'In a live version of this website, we would collect the following types of information when you submit a form:',
    ],
    list: [
      'Personal identification information: name, email address, phone number',
      'Property preferences and search criteria',
      'Viewing schedules and inquiry details',
    ],
  },
  {
    heading: 'How We Use Information',
    body: [
      'In a live version, any collected information would be used exclusively to:',
    ],
    list: [
      'Respond to your property inquiries',
      'Schedule and manage property viewings',
      'Provide market updates and property recommendations (with your consent)',
      'Improve our website and services',
    ],
  },
  {
    heading: 'Third-Party Services',
    body: [
      'This demo website does not use any third-party analytics, advertising, or tracking services. In a production environment, we would only use services that comply with applicable data protection laws and would disclose them clearly here.',
    ],
  },
  {
    heading: 'Data Security',
    body: [
      'Since no real data is collected or stored by this demo website, there are no security concerns regarding personal information. In a production environment, we would implement industry-standard encryption and security measures to protect any collected data.',
    ],
  },
  {
    heading: 'Contact for Privacy Concerns',
    body: [
      'If you have any questions or concerns about this privacy policy, you may reach us at hello@casaaurelia.com.',
      'Please note this email address is fictional and part of the demo.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="pt-32 md:pt-40 lg:pt-48 pb-20 md:pb-28 lg:pb-36">
      <div className="container-editorial">
        <span className="section-number block mb-5 text-warm-grey">Legal</span>
        <h1 className="display-page text-espresso mb-12 md:mb-16">
          Privacy Policy
        </h1>

        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="heading-sub text-espresso mb-3">{section.heading}</h2>
              <div className="space-y-3">
                {section.body.map((paragraph, i) => (
                  <p key={i} className="body-copy text-warm-grey">
                    {paragraph}
                  </p>
                ))}
                {section.list && (
                  <ul className="space-y-2 mt-3">
                    {section.list.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 body-copy text-warm-grey"
                      >
                        <span
                          className="block w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2.5"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}

          <section className="pt-6 border-t border-espresso/8">
            <p className="label-micro text-warm-grey">
              Last updated: July 2026
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
