import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://articog.com/legal/terms-of-service" },
  title: "Terms of Service | Articog",
  description: "The terms and conditions governing your use of Articog's website and services.",
};
import { Container, Section, Heading } from "@/components/ui";

export default function TermsOfServicePage() {
  const sections = [
    {
      title: "Acceptance of Terms",
      content:
        "By accessing or using the Articog website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our site.",
    },
    {
      title: "Description of Services",
      content:
        "This website describes Articog's AI-powered creative production services, including video production, ad creative, social content, product visuals, and related creative strategy. Specific client engagements are governed by separate service agreements executed between Articog and the client.",
    },
    {
      title: "Intellectual Property",
      content:
        "All site content, branding, materials, and design elements are owned by Articog or its licensors and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works from our materials without prior written permission.",
    },
    {
      title: "Use of the Site",
      content:
        "You agree to use the site only for lawful purposes and in a way that does not infringe the rights of others or restrict their use and enjoyment of the site. Prohibited conduct includes scraping, data mining, automated access, interference with site operations, and any misuse of our services or infrastructure.",
    },
    {
      title: "Limitation of Liability",
      content:
        "To the fullest extent permitted by law, Articog and its affiliates, officers, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the site.",
    },
    {
      title: "Governing Law",
      content:
        "These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in which Articog operates, without regard to conflict of law principles. The specific governing jurisdiction will be finalized in client service agreements.",
    },
    {
      title: "Contact Us",
      content:
        "If you have any questions about these Terms of Service, please contact us at info@articog.com.",
    },
  ];

  return (
    <div className="bg-black min-h-screen">
      <Section size="lg" className="pt-32 md:pt-40">
        <Container>
          <div className="mx-auto max-w-3xl mb-24">
            <span className="mb-5 inline-block type-label uppercase tracking-[0.18em] text-white/40">Legal</span>
            <Heading as="h1" size="hero" className="mb-4">
              Terms of Service
            </Heading>
            <p className="type-small mb-16 text-white/40">
              Last updated: August 19, 2026
            </p>

            <div className="space-y-12">
              {sections.map((section) => (
                <div key={section.title}>
                  <h2 className="type-h3 text-white mb-4">
                    {section.title}
                  </h2>
                  <p className="type-body leading-relaxed text-white/60">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
