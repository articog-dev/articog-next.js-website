import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.articog.com/copyright" },
};

export default function CopyrightLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}