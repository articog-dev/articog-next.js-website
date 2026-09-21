import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Choices | Articog",
  description: "Manage your privacy and cookie preferences for the Articog website.",
  alternates: { canonical: "https://www.articog.com/privacy-choices" },
};

export default function PrivacyChoicesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
