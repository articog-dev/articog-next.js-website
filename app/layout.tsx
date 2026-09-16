// app/layout.tsx
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Sora } from "next/font/google";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { CookieConsent } from "@/components/analytics/CookieConsent";
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
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link
          rel="preload"
          as="video"
          href="https://res.cloudinary.com/hmy5ctzy/video/upload/f_mp4,vc_h264,q_auto:good,w_1280,dpr_auto,c_limit/v1786961383/Web_3.mp4"
          type="video/mp4"
        />
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <GoogleAnalytics />
        <AnnouncementBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Articog",
              url: "https://articog.com",
              logo: "https://articog.com/articog-logo-white.png",
              sameAs: [
                "https://www.linkedin.com/company/articog/",
                "https://www.youtube.com/@articogcom",
                "https://x.com/articogcom",
                "https://www.instagram.com/articogcom/",
                "https://medium.com/@articog.com",
              ],
            }),
          }}
        />
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}