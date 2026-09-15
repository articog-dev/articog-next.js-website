import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { BeehiivForm } from '@/components/newsletter/BeehiivForm';

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      <div className="flex-grow pt-32 pb-20">
        <Container>
          <div className="max-w-2xl mx-auto">
            <h1 className="type-h1 mb-6 text-white">Newsletter</h1>
            <p className="text-zinc-400 type-h3 mb-12 leading-relaxed">
              Get Studio &amp; Service Updates, new production capabilities, selected work, and useful creative production context.
            </p>

            <Section className="py-12 border-t border-zinc-900">
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-8">
                <h2 className="type-h3 mb-3 text-white">Studio &amp; Service Updates</h2>
                <p className="mb-6 text-sm leading-relaxed text-zinc-400">
                  Subscribe for production insights and new work. You can manage marketing email preferences separately from this signup.
                </p>
                <BeehiivForm />
                <p className="mt-5 text-xs leading-relaxed text-zinc-500">
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
