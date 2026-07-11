import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Terms of Use',
  description: 'Terms of Use for Casa Aurelia.',
  path: '/terms',
});

const sections = [
  {
    heading: 'Demo Nature of This Website',
    body: [
      'This website ("Casa Aurelia") is a demonstration project created for portfolio and educational purposes. It does not represent a real real estate brokerage, advisory firm, or any other type of business entity. All property listings, contact information, and services described on this website are fictional.',
    ],
  },
  {
    heading: 'No Real Brokerage Service',
    body: [
      'Casa Aurelia does not provide any real estate brokerage, advisory, valuation, or property management services. Any forms, calculators, or interactive features on this website are for demonstration purposes only and should not be relied upon for making property decisions.',
    ],
  },
  {
    heading: 'Intellectual Property',
    body: [
      'The design, layout, and code of this website are original work created for demonstration purposes. Property images used on this site are either generated, licensed for demonstration use, or used under fair use principles.',
    ],
  },
  {
    heading: 'Limitation of Liability',
    body: [
      'To the fullest extent permitted by applicable law, the creators of this demo website shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from the use of, or inability to use, this website. All information presented is fictional and should not be used as a basis for any real-world decisions.',
    ],
  },
  {
    heading: 'User Conduct',
    body: [
      'By using this website, you agree to use it only for lawful purposes. You may not attempt to gain unauthorized access to any part of the website, use it in any way that could damage, disable, or impair the website, or use any automated means to access the website\'s content.',
    ],
  },
  {
    heading: 'Governing Law',
    body: [
      'These terms are governed by the laws of India. Any disputes arising from the use of this website would be subject to the exclusive jurisdiction of the courts in New Delhi, India.',
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="pt-32 md:pt-40 lg:pt-48 pb-20 md:pb-28 lg:pb-36">
      <div className="container-editorial">
        <span className="section-number block mb-5 text-warm-grey">Legal</span>
        <h1 className="display-page text-espresso mb-12 md:mb-16">
          Terms of Use
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
