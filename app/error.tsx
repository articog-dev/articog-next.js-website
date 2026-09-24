"use client";

import { Link } from "@/components/ui/Link";
import { Container, Heading } from "@/components/ui";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-black px-6">
      <Container>
      <div className="max-w-2xl text-center">
        <Heading as="h1" size="hero" className="mb-5 text-white">
          Something went wrong. Please try again.
        </Heading>
        <p className="mb-10 type-body leading-relaxed text-white">
          We could not load this page right now.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-white px-8 type-small text-black transition-[background-color,transform] hover:bg-white/90 active:scale-95 sm:w-auto"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex h-12 w-full items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 type-small text-white transition-[background-color,transform] hover:bg-white/10 active:scale-95 sm:w-auto"
          >
            Back to Home
          </Link>
        </div>
      </div>
      </Container>
    </div>
  );
}