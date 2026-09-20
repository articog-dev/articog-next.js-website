// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Sora } from "next/font/google";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteEntitySchema } from "@/lib/structured-data";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Articog | AI Native Film & Production Company",
  description:
    "Articog is an AI-native film and creative production company for growth-stage brands and modern marketing teams. We produce brand films, commercials, performance creative, product visuals, creator-style social content, audio, and campaign assets through human-directed AI production workflows.",
  metadataBase: new URL("https://articog.com"),
  manifest: "/manifest.webmanifest",
  verification: {
    google: "Td3Rl6_MP-F3VnYqsXt5T6M3IuO0OIlzz1tfWCQ5hTU",
  },
  openGraph: {
    type: "website",
    siteName: "Articog",
    title: "Articog | AI Native Film & Production Company",
    description:
      "Articog is an AI-native film and creative production company for growth-stage brands and modern marketing teams. We produce brand films, commercials, performance creative, product visuals, creator-style social content, audio, and campaign assets through human-directed AI production workflows.",
    url: "https://articog.com",
    images: [
      {
        url: "/og-image.png",
        width: 2400,
        height: 1260,
        alt: "Articog AI-native film and creative production",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Articog | AI Native Film & Production Company",
    description:
      "AI-native film and creative production for growth-stage brands and modern marketing teams.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} h-full antialiased`}
    >
      <head>
      </head>
      <body className="min-h-full flex flex-col">
        <GoogleAnalytics />
        <AnnouncementBar />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <CookieBanner />
        <JsonLd data={siteEntitySchema} />
      </body>
    </html>
  );
}