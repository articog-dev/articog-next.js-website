import type { Metadata } from "next";
import { Container, Heading, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Email Preferences | Articog",
  description: "How to manage your Articog email preferences.",
  alternates: { canonical: "https://articog.com/email-preferences" },
};

export default function EmailPreferencesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Section size="lg" className="pt-32 md:pt-40">
        <Container>
          <div className="mx-auto max-w-2xl">
            <Heading as="h1" size="hero" className="mb-6">
              Email Preferences
            </Heading>
            <div className="space-y-6 type-body-lg text-white/60">
              <p>
                To unsubscribe or update the types of emails you receive, use
                the unsubscribe or preferences link at the bottom of any
                Articog newsletter email.
              </p>
              <p>
                If you need help, email{" "}
                <a
                  href="mailto:info@articog.com"
                  className="text-white underline underline-offset-4 hover:text-white/80"
                >
                  info@articog.com
                </a>
                .
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
