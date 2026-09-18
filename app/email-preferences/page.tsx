"use client";

import { Link } from "@/components/ui/Link";
import { Button, Container, Heading } from "@/components/ui";
import { useState } from 'react';
import { toast } from 'sonner';

export default function EmailPreferencesPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [unsubscribedAll, setUnsubscribedAll] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const data = new FormData(e.currentTarget);

    const interests = [
      data.get('product-updates') ? 'Studio & Service Updates' : null,
      data.get('insights') ? 'New production capabilities and work' : null,
      data.get('events') ? 'Event Invitations' : null,
    ].filter(Boolean) as string[];

    try {
      const response = await fetch('/api/email-preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.get('email'),
          interests,
          unsubscribeAll: data.get('unsubscribe-all') === 'on',
        }),
      });
      const result = (await response.json()) as { success?: boolean; message?: string; error?: string };

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Email preferences could not be updated.');
      }

      toast.success(result.message || 'Your preferences were updated.');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Email preferences could not be updated.';
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      <div className="flex-grow pt-32 md:pt-40 pb-20 px-4">
        <Container>
        <div className="mx-auto max-w-2xl">
          <Heading as="h1" size="hero" className="mb-6 text-white">Email Preferences</Heading>
          <p className="type-body-lg mb-10 text-white/60">
            Manage what emails you receive from us.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8">
            <div className="space-y-2">
              <label htmlFor="email" className="text-white/60">Email Address</label>
              <input id="email" name="email" type="email" required placeholder="you@company.com" className="w-full rounded-lg border border-white/[0.08] bg-black px-4 py-3 text-white placeholder:text-white/40 focus:border-white focus:outline-none" />
            </div>

            <div className="space-y-6">
              <label className="text-sm font-bold uppercase tracking-wider text-white/40">Categories</label>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3 group cursor-pointer" onClick={() => !unsubscribedAll && null}>
                  <div className="pt-0.5">
                    <input 
                      type="checkbox" 
                      id="product-updates"
                      name="product-updates"
                      disabled={unsubscribedAll}
                      className="h-5 w-5 rounded border-white/[0.08] bg-black text-white focus:ring-0 focus:ring-offset-0 disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="product-updates" className={`text-lg font-medium transition-colors ${unsubscribedAll ? 'text-white/40' : 'text-white/60 group-hover:text-white'}`}>Studio &amp; Service Updates</label>
                    <p className="text-sm text-white/40">New production capabilities, work, and service updates.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 group cursor-pointer">
                  <div className="pt-0.5">
                    <input 
                      type="checkbox" 
                      id="insights"
                      name="insights"
                      disabled={unsubscribedAll}
                      className="h-5 w-5 rounded border-white/[0.08] bg-black text-white focus:ring-0 focus:ring-offset-0 disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="insights" className={`text-lg font-medium transition-colors ${unsubscribedAll ? 'text-white/40' : 'text-white/60 group-hover:text-white'}`}>Production Insights</label>
                    <p className="text-sm text-white/40">Case studies, production notes, and useful creative context.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 group cursor-pointer">
                  <div className="pt-0.5">
                    <input 
                      type="checkbox" 
                      id="events"
                      name="events"
                      disabled={unsubscribedAll}
                      className="h-5 w-5 rounded border-white/[0.08] bg-black text-white focus:ring-0 focus:ring-offset-0 disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="events" className={`text-lg font-medium transition-colors ${unsubscribedAll ? 'text-white/40' : 'text-white/60 group-hover:text-white'}`}>Event Invitations</label>
                    <p className="text-sm text-white/40">Webinars, workshops, and exclusive networking events.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/[0.08] pt-6">
              <div className="flex items-start space-x-3 group cursor-pointer" onClick={() => setUnsubscribedAll(!unsubscribedAll)}>
                <div className="pt-0.5">
                  <input 
                    type="checkbox" 
                    id="unsubscribe-all"
                    name="unsubscribe-all"
                    checked={unsubscribedAll}
                    onChange={(e) => setUnsubscribedAll(e.target.checked)}
                    className="h-5 w-5 rounded border-white/[0.08] bg-black text-white focus:ring-0 focus:ring-offset-0"
                  />
                </div>
                <div>
                  <label htmlFor="unsubscribe-all" className="text-lg font-bold text-white transition-colors">Unsubscribe from all emails</label>
                  <p className="text-sm text-white/40">You will no longer receive any marketing communications from Articog.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <p className="text-sm italic leading-relaxed text-white/40">
                Note: Changes may take a few business days to take effect. Transactional emails related to active projects or account billing may still be sent regardless of marketing preferences.
              </p>
              <Button type="submit" disabled={isSubmitting} className="h-14 w-full rounded-full bg-white text-lg font-semibold text-black transition-all hover:bg-white/90">
                {isSubmitting ? 'Updating...' : 'Save Preferences'}
              </Button>
              {errorMessage ? <p role="alert" className="text-sm text-red-300">{errorMessage}</p> : null}
            </div>
          </form>

          <div className="mt-12 text-center">
            <Link to="/privacy-policy" className="text-sm text-white/60 underline decoration-white/[0.08] underline-offset-4 transition-colors hover:text-white">
              Read our full Privacy Policy
            </Link>
          </div>
        </div>
        </Container>
      </div>

    </div>
  );
}
