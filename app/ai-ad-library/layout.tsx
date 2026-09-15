import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Ad Library | Articog",
  description: "Browse AI-native ad concepts, campaign creative, and product visuals from Articog's production work.",
  alternates: { canonical: "https://articog.com/ai-ad-library" },
};

export default function AILibraryLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
