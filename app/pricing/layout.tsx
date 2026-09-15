import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creative Production Pricing | Articog",
  description: "Learn about Articog's project-based, ongoing, and strategic creative production engagement models.",
  alternates: { canonical: "https://articog.com/pricing" },
};

export default function PricingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}