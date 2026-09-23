import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You | Articog",
  description: "Thanks for booking a demo with Articog. We will be in touch soon.",
  robots: {
    index: false,
    follow: false,
  },
};
import { Link } from "@/components/ui/Link";
import { Container, Section, Button, Heading } from "@/components/ui";
import { CheckCircle2 } from "lucide-react";

export default function ThankYouDemoPage() {
  return (
    <Section size="lg" className="pt-32 md:pt-40 min-h-[80vh] flex items-center bg-black">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
              <CheckCircle2 size={32} />
            </div>
          </div>
          <div className="text-center mb-16">
            <Heading as="h1" size="hero" className="mb-6 text-white">
              Thanks we&apos;ve got your request
            </Heading>
          </div>
          <p
            className="mx-auto mb-10 max-w-md type-body md:text-lg"
            style={{ color: "#ffffff", lineHeight: 1.65 }}
          >
            Our team will follow up within 1 business day to schedule your demo.
          </p>
          <Button asChild variant="primary" size="lg">
            <Link href="/work">View Our Work</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
