"use client";

import { Link } from "@/components/ui/Link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-black px-6">
      <div className="max-w-2xl text-center">
        <h1 className="type-h1 mb-5 text-white">
          Something went wrong. Please try again.
        </h1>
        <p className="mb-10 type-body leading-relaxed text-white/50">
          We could not load this page right now.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-white px-8 type-small text-black transition-all hover:bg-white/90 active:scale-95 sm:w-auto"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex h-12 w-full items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 type-small text-white transition-all hover:bg-white/10 active:scale-95 sm:w-auto"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}