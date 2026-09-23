import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries We Serve | Articog",
  description: "Creative production for DTC, SaaS, beauty, automotive, real estate, fashion, and other growth-stage businesses.",
  alternates: { canonical: "https://www.articog.com/industries" },
};
import { PageHero } from "@/components/ui";
import { IndustryDetails } from "@/components/sections/IndustryDetails";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function IndustriesPage() {
  return (
    <div className="bg-black min-h-screen">
      <PageHero title="Industries We Serve" />

      <IndustryDetails />

      <FinalCTA content={{ ctaHref: "/book-a-demo", ctaLabel: "Book a Demo" }} />
    </div>
  );
}