"use client";

import { useSyncExternalStore } from "react";
import { Link } from "@/components/ui/Link";

const DISMISSAL_KEY = "articog-announcement-dismissed";
const DISMISS_EVENT = "articog-announcement-dismissed-change";

const subscribeToDismissal = (onChange: () => void) => {
  window.addEventListener(DISMISS_EVENT, onChange);
  return () => window.removeEventListener(DISMISS_EVENT, onChange);
};

const readDismissal = () => sessionStorage.getItem(DISMISSAL_KEY) === "true";
const readServerDismissal = () => false;

export function AnnouncementBar() {
  const dismissed = useSyncExternalStore(subscribeToDismissal, readDismissal, readServerDismissal);

  if (dismissed) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-[1100] min-h-9 border-b border-white/10 bg-[#111] px-4 py-2 pr-12 text-center text-xs font-medium text-white/80">
      <span>NOW OPEN: Articog is open for pilot collaborations. </span>
      <Link href="/book-a-demo" className="text-white underline underline-offset-4 transition hover:text-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
        Book a Demo →
      </Link>
      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={() => {
          sessionStorage.setItem(DISMISSAL_KEY, "true");
          window.dispatchEvent(new Event(DISMISS_EVENT));
        }}
        className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center text-white/60 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        ×
      </button>
    </div>
  );
}