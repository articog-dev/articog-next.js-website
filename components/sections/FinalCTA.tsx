import { Link } from "@/components/ui/Link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container, Section, Button } from "@/components/ui";
import type { CTAContent } from "@/types";

interface FinalCTAProps {
  content: CTAContent;
}

export function FinalCTA({ content }: FinalCTAProps) {
  return (
    <Section size="lg">
      <Container>
        <div className="mx-auto max-w-xl text-center">

          {/* Availability badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8"
            style={{ border: "1px solid rgba(255,255,255,0.10)" }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full animate-pulse"
              style={{ background: "#34d399" }}
            />
            <span
              className="type-label"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Accepting new projects
            </span>
          </div>

          <h2 className="type-h2 mb-5 text-white">
            {content.headline.split("\n").map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="primary" size="lg">
              <Link href={content.ctaHref}>
                {content.ctaLabel}
                <ArrowRight size={15} />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="/contact">
                Contact Us
                <ArrowUpRight size={14} />
              </Link>
            </Button>
          </div>

          <p
            className="mt-8 font-sans text-xs"
            style={{ color: "rgba(255,255,255,0.28)" }}
          >
            No commitment. Free first conversation.
          </p>
        </div>
      </Container>
    </Section>
  );
}
