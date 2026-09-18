import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://articog.com/legal/cookie-policy" },
  title: "Cookie Policy | Articog",
  description: "Information about how Articog uses cookies and similar technologies.",
};
import { Container, Section, Heading } from "@/components/ui";

export default function CookiePolicyPage() {
  return (
    <div className="bg-black min-h-screen">
      <Section size="lg" className="pt-32 md:pt-40">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Heading as="h1" size="hero" className="mb-6">Cookie Policy</Heading>
            <p className="type-small text-muted-safe mb-12 uppercase tracking-widest">Last updated: August 19, 2026</p>

            <div className="space-y-12 type-small leading-relaxed text-white/60">
              <section>
                <Heading as="h2" size="card" className="text-xl font-semibold text-white mb-4">1. What are cookies?</Heading>
                <p>Cookies are small text files that are stored on your device when you visit a website. They help the website recognize your device and remember information about your visit.</p>
              </section>
              <section>
                <Heading as="h2" size="card" className="text-xl font-semibold text-white mb-4">2. How we use cookies</Heading>
                <p>We use cookies to enhance your browsing experience, analyze site traffic, and serve personalized content. Some cookies are necessary for the technical operation of our site.</p>
              </section>
              <section>
                <Heading as="h2" size="card" className="text-xl font-semibold text-white mb-4">3. Managing your preferences</Heading>
                <p>You can manage your cookie preferences through your browser settings or by visiting our <a href="/privacy-choices" className="text-white underline">Privacy Choices</a> page.</p>
              </section>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
