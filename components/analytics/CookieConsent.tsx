"use client";

import { useState, useSyncExternalStore } from "react";
import { Link } from "@/components/ui/Link";
import { saveCookieConsent, readCookieConsentSnapshot, subscribeCookieConsent, type CookieConsent } from "@/lib/cookie-consent";

export function CookieConsent() {
  const storedSnapshot = useSyncExternalStore(subscribeCookieConsent, readCookieConsentSnapshot, () => null);
  const storedConsent = storedSnapshot ? JSON.parse(storedSnapshot) as CookieConsent : null;
  const [consent, setConsent] = useState<CookieConsent | null>(storedConsent);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  if (consent || storedConsent) return null;

  const save = (analytics: boolean) => {
    setConsent(saveCookieConsent(analytics));
    setIsCustomizing(false);
  };

  return (
    <div className="fixed inset-x-4 bottom-4 z-[1200] sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-md">
      <section
        className="rounded-2xl border border-white/15 bg-[#111]/95 p-6 text-white shadow-2xl backdrop-blur-xl"
        role="dialog"
        aria-modal="false"
        aria-labelledby="cookie-settings-title"
        aria-describedby="cookie-settings-description"
      >
        <h2 id="cookie-settings-title" className="type-h3 mb-3">Cookie settings</h2>
        <p id="cookie-settings-description" className="type-small leading-relaxed text-white/65">
          We use cookies and similar technologies to operate the site, understand site usage, and improve your experience. You can customize your preferences below.
        </p>

        {isCustomizing ? (
          <div className="mt-5 space-y-4 border-t border-white/10 pt-5">
            <label className="flex items-start gap-3 text-sm text-white/80">
              <input type="checkbox" checked disabled className="mt-0.5 h-4 w-4 accent-white" />
              <span><strong className="text-white">Necessary</strong><br /><span className="text-white/55">Required for core site operation.</span></span>
            </label>
            <label className="flex items-start gap-3 text-sm text-white/80">
              <input
                type="checkbox"
                checked={analyticsEnabled}
                onChange={(event) => setAnalyticsEnabled(event.target.checked)}
                className="mt-0.5 h-4 w-4 accent-white"
              />
              <span><strong className="text-white">Analytics</strong><br /><span className="text-white/55">Helps Articog understand site usage through GA4.</span></span>
            </label>
            <button
              type="button"
              onClick={() => save(analyticsEnabled)}
              className="w-full rounded-full bg-white px-4 py-3 text-sm font-medium text-black transition hover:bg-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Save Preferences
            </button>
          </div>
        ) : (
          <div className="mt-5 flex flex-col gap-2">
            <button type="button" onClick={() => setIsCustomizing(true)} className="w-full rounded-full border border-white/20 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              Customize Cookie Settings
            </button>
            <button type="button" onClick={() => save(false)} className="w-full rounded-full border border-white/10 px-4 py-3 text-sm font-medium text-white/75 transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              Reject All Cookies
            </button>
            <button type="button" onClick={() => save(true)} className="w-full rounded-full bg-white px-4 py-3 text-sm font-medium text-black transition hover:bg-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              Accept All Cookies
            </button>
          </div>
        )}

        <Link href="/legal/cookie-policy" className="mt-4 inline-block text-xs text-white/55 underline underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
          Cookie Policy
        </Link>
      </section>
    </div>
  );
}