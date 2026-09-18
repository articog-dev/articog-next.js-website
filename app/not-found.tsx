import Link from "next/link";
import { Heading } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
          <Heading as="h1" size="hero" className="mb-4">404</Heading>
      <p className="text-xl mb-8">This page could not be found.</p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-black text-white hover:opacity-80 transition"
      >
        Back to homepage
      </Link>
    </div>
  );
}