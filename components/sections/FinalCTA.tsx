import { Link } from "@/components/ui/Link";
import { ArrowRight } from "lucide-react";
import { Container, Section, Button, Heading } from "@/components/ui";
import type { CTAContent } from "@/types";

interface FinalCTAProps {
  content: CTAContent;
}

export function FinalCTA({ content }: FinalCTAProps) {
  return (
    <Section size="lg">
      <Container>
        <div className="mx-auto max-w-xl text-center">

          <Heading as="h2" size="section" className="mb-5 text-white">
            Ready to transform your production?
          </Heading>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="primary" size="lg">
              <Link href={content.ctaHref}>
                {content.ctaLabel}
                <ArrowRight size={15} />
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
