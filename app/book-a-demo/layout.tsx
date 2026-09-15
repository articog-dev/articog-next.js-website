import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Demo | Articog",
  description: "Book a demo to discuss your campaign, production needs, and AI-native creative workflow with Articog.",
  alternates: { canonical: "https://articog.com/book-a-demo" },
};

export default function BookADemoLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}