import { Container, Heading } from '@/components/ui';
import { Section } from '@/components/ui/Section';
import { BeehiivForm } from '@/components/newsletter/BeehiivForm';

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      <div className="flex-grow pt-32 md:pt-40 pb-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <div className="text-center mb-16">
              <Heading as="h1" size="hero" className="mb-6 text-white">Newsletter</Heading>
            </div>
            <p className="type-h3 mb-12 leading-relaxed text-white/60">
              Get Studio &amp; Service Updates, new production capabilities, selected work, and useful creative production context.
            </p>

            <Section className="border-t border-white/[0.08] py-12">
              <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8">
                <Heading as="h2" size="card" className="mb-3 text-white">Studio &amp; Service Updates</Heading>
                <p className="mb-6 text-sm leading-relaxed text-white/60">
                  Subscribe for production insights and new work. Unsubscribe or update your preferences through the Beehiiv link in any newsletter email.
                </p>
                <BeehiivForm />
                <p className="mt-5 text-xs leading-relaxed text-white/40">
                  By subscribing, you agree to receive marketing emails from Articog. See our Privacy Policy for details.
                </p>
              </div>
            </Section>
          </div>
        </Container>
      </div>
    </div>
  );
}
