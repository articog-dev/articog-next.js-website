import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help Center | Articog",
  description: "Find answers about services, workflows, rights, and creative production with Articog.",
  alternates: { canonical: "https://www.articog.com/help" },
};

export default function HelpLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}