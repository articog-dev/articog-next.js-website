"use client";

import { Link } from "@/components/ui/Link";
import { Button } from '@/components/ui/Button';
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
      <div className="flex-grow pt-32 pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="type-h1 mb-6 text-white">Email Preferences</h1>
          <p className="text-zinc-400 type-body-lg mb-10">
            Manage what emails you receive from us.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8 bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800">
            <div className="space-y-2">
              <label htmlFor="email" className="text-zinc-300">Email Address</label>
              <input id="email" name="email" type="email" required placeholder="you@company.com" className="w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white placeholder:text-zinc-600 focus:border-white focus:outline-none" />
            </div>

            <div className="space-y-6">
              <label className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Categories</label>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3 group cursor-pointer" onClick={() => !unsubscribedAll && null}>
                  <div className="pt-0.5">
                    <input 
                      type="checkbox" 
                      id="product-updates"
                      name="product-updates"
                      disabled={unsubscribedAll}
                      className="w-5 h-5 rounded border-zinc-700 bg-black text-white focus:ring-0 focus:ring-offset-0 disabled:opacity-50" 
                    />
                  </div>
                  <div>
                    <label htmlFor="product-updates" className={`text-lg font-medium transition-colors ${unsubscribedAll ? 'text-zinc-600' : 'text-zinc-200 group-hover:text-white'}`}>Studio &amp; Service Updates</label>
                    <p className="text-sm text-zinc-500">New production capabilities, work, and service updates.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 group cursor-pointer">
                  <div className="pt-0.5">
                    <input 
                      type="checkbox" 
                      id="insights"
                      name="insights"
                      disabled={unsubscribedAll}
                      className="w-5 h-5 rounded border-zinc-700 bg-black text-white focus:ring-0 focus:ring-offset-0 disabled:opacity-50" 
                    />
                  </div>
                  <div>
                    <label htmlFor="insights" className={`text-lg font-medium transition-colors ${unsubscribedAll ? 'text-zinc-600' : 'text-zinc-200 group-hover:text-white'}`}>Production Insights</label>
                    <p className="text-sm text-zinc-500">Case studies, production notes, and useful creative context.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 group cursor-pointer">
                  <div className="pt-0.5">
                    <input 
                      type="checkbox" 
                      id="events"
                      name="events"
                      disabled={unsubscribedAll}
                      className="w-5 h-5 rounded border-zinc-700 bg-black text-white focus:ring-0 focus:ring-offset-0 disabled:opacity-50" 
                    />
                  </div>
                  <div>
                    <label htmlFor="events" className={`text-lg font-medium transition-colors ${unsubscribedAll ? 'text-zinc-600' : 'text-zinc-200 group-hover:text-white'}`}>Event Invitations</label>
                    <p className="text-sm text-zinc-500">Webinars, workshops, and exclusive networking events.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800">
              <div className="flex items-start space-x-3 group cursor-pointer" onClick={() => setUnsubscribedAll(!unsubscribedAll)}>
                <div className="pt-0.5">
                  <input 
                    type="checkbox" 
                    id="unsubscribe-all"
                    name="unsubscribe-all"
                    checked={unsubscribedAll}
                    onChange={(e) => setUnsubscribedAll(e.target.checked)}
                    className="w-5 h-5 rounded border-zinc-700 bg-black text-white focus:ring-0 focus:ring-offset-0" 
                  />
                </div>
                <div>
                  <label htmlFor="unsubscribe-all" className="text-lg font-bold text-white transition-colors">Unsubscribe from all emails</label>
                  <p className="text-sm text-zinc-500">You will no longer receive any marketing communications from Articog.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <p className="text-sm text-zinc-500 italic leading-relaxed">
                Note: Changes may take a few business days to take effect. Transactional emails related to active projects or account billing may still be sent regardless of marketing preferences.
              </p>
              <Button type="submit" disabled={isSubmitting} className="w-full bg-white text-black hover:bg-zinc-200 h-14 text-lg font-semibold rounded-full transition-all">
                {isSubmitting ? 'Updating...' : 'Save Preferences'}
              </Button>
              {errorMessage ? <p role="alert" className="text-sm text-red-300">{errorMessage}</p> : null}
            </div>
          </form>

          <div className="mt-12 text-center">
            <Link to="/privacy-policy" className="text-zinc-400 hover:text-white transition-colors underline underline-offset-4 decoration-zinc-800 text-sm">
              Read our full Privacy Policy
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
