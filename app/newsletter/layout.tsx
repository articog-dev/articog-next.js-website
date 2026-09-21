import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter | Articog",
  description: "Subscribe for updates on AI creative production, new case studies, and industry insights from Articog.",
  alternates: { canonical: "https://www.articog.com/newsletter" },
};

export default function NewsletterLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}