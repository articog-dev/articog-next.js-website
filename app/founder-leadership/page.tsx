import type { Metadata } from "next";
import { PageHeroDetail } from "@/components/ui";
import { FounderProfile } from "@/components/sections/FounderProfile";
import { founders } from "@/lib/founders";

export const metadata: Metadata = {
  title: "Founder / Leadership | Articog",
  description: "Meet the founders and leadership behind Articog.",
  alternates: { canonical: "https://www.articog.com/founder-leadership" },
};

export default function FounderLeadershipPage() {
  return (
    <div className="bg-black">
      <PageHeroDetail
        title="FOUNDER / LEADERSHIP"
        backLink={{ href: "/about", label: "Back to About" }}
        detail={
          <div className="space-y-16">
            {founders.map((founder) => (
              <FounderProfile key={founder.slug} founder={founder} />
            ))}
          </div>
        }
      />
    </div>
  );
}
