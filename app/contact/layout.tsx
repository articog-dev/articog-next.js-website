import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Articog",
  description:
    "Get in touch with Articog about your project, goals, timeline, and deliverables. Submit an inquiry and our team will review your needs.",
  alternates: { canonical: "https://articog.com/contact" },
};

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}