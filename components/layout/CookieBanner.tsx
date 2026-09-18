"use client";

import { useSyncExternalStore } from "react";
import { Link } from "@/components/ui/Link";
import {
  hasGlobalPrivacyControl,
  readCookieConsentSnapshot,
  saveCookieConsent,
  subscribeCookieConsent,
} from "@/lib/cookie-consent";

function getConsentSnapshot(): string | null {
  if (hasGlobalPrivacyControl()) return "gpc-opt-out";
  return readCookieConsentSnapshot();
}

export function CookieBanner() {
  const consentSnapshot = useSyncExternalStore(
    subscribeCookieConsent,
    getConsentSnapshot,
    () => null,
  );

  if (consentSnapshot !== null) return null;

  return (
    <aside
      className="fixed inset-x-4 bottom-4 z-[1050] max-h-[45vh] rounded-xl border border-white/[0.12] bg-[#111] p-4 text-white shadow-2xl sm:inset-x-auto sm:right-6 sm:max-w-md"
      aria-label="Cookie consent"
    >
      <p className="type-small leading-relaxed text-white/70">
        We use analytics to understand site usage and improve the Articog experience.
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => saveCookieConsent(true)}
          className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => saveCookieConsent(false)}
          className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Decline
        </button>
        <Link
          href="/privacy-choices"
          className="text-sm text-white/60 underline underline-offset-4 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Manage preferences
        </Link>
      </div>
    </aside>
  );
}
