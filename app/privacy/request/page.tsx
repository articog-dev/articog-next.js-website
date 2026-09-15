"use client";

import { Link } from "@/components/ui/Link";
import { Button, Input, Textarea, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { useState } from 'react';
import { toast } from 'sonner';

export default function PrivacyRequestPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const response = await fetch('/api/privacy-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          requestType: data.get('type'),
          details: data.get('details'),
        }),
      });
      const result = (await response.json()) as { success?: boolean; message?: string; error?: string };

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'We could not submit your request. Please try again later.');
      }

      toast.success(result.message || 'Your request was received for review.');
      form.reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'We could not submit your request. Please try again later.';
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
          <h1 className="type-h1 mb-6 text-white">Data Rights Request</h1>
          <p className="text-zinc-400 type-body-lg mb-10">
            Submit a request to know, delete, or correct your personal information.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8 bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-zinc-300">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe" 
                required 
                className="rounded-lg bg-black px-4 py-3 text-white placeholder:text-zinc-600 focus:border-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-300">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email" 
                placeholder="john@example.com" 
                required 
                className="rounded-lg bg-black px-4 py-3 text-white placeholder:text-zinc-600 focus:border-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type" className="text-zinc-300">Request Type</Label>
              <Select name="type" defaultValue="">
                <SelectTrigger id="type" className="rounded-lg bg-black px-4 py-3 text-white focus:border-white"><SelectValue placeholder="Select request type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="know">Right to Know</SelectItem>
                  <SelectItem value="delete">Right to Delete</SelectItem>
                  <SelectItem value="correct">Right to Correct</SelectItem>
                  <SelectItem value="opt-out">Opt-Out of Sale/Sharing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="details" className="text-zinc-300">Details / Message</Label>
              <Textarea
                id="details"
                name="details"
                placeholder="Please provide any additional context for your request..." 
                className="min-h-[120px] resize-none rounded-lg bg-black px-4 py-3 text-white placeholder:text-zinc-600 focus:border-white"
              />
            </div>

            <div className="space-y-4 pt-4">
              <p className="text-sm text-zinc-500 italic leading-relaxed">
                Note: We may need to verify your identity before processing certain requests. We aim to respond within the timeframe required by applicable law.
              </p>
              <Button type="submit" disabled={isSubmitting} className="w-full bg-white text-black hover:bg-zinc-200 h-14 text-lg font-semibold rounded-full transition-all">
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </Button>
              {errorMessage ? <p role="alert" className="text-sm text-red-300">{errorMessage}</p> : null}
            </div>
          </form>

          <div className="mt-12 space-y-6">
            <div className="p-8 rounded-2xl bg-zinc-900/30 border border-zinc-800/50">
              <h2 className="type-h3 mb-2">Alternate Contact Method</h2>
              <p className="text-zinc-400">
                You can also reach us at{' '}
                <a href="mailto:info@articog.com" className="text-white hover:underline underline-offset-4 decoration-zinc-700">
                  info@articog.com
                </a>.
              </p>
            </div>

            <div className="flex flex-wrap gap-6 text-sm">
              <Link to="/privacy-choices" className="text-zinc-400 hover:text-white transition-colors underline underline-offset-4 decoration-zinc-800">
                ← Back to Privacy Choices
              </Link>
              <Link to="/privacy/california" className="text-zinc-400 hover:text-white transition-colors underline underline-offset-4 decoration-zinc-800">
                California Privacy Notice
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
