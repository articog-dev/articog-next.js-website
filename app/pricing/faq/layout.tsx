import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project FAQ | Articog",
  description: "Answers to common questions about starting a project, timelines, and working with Articog.",
};

export default function PricingFAQLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
