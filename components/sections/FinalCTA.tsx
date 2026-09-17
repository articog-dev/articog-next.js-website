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

          <h2 className="type-h2 mb-5 text-white">
            Ready to transform your production?
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
