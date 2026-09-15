import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Articog | AI Native Film & Production Company",
  description: "Talk with Articog about AI-native film, creative production, campaigns, and production support for your next launch.",
  alternates: { canonical: "https://articog.com/contact" },
};

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}