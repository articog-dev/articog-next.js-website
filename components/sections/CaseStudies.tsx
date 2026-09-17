import { Container, Section, Heading } from "@/components/ui";
import type { CaseStudy } from "@/types";

const approachItems = [
  "01 — Human-Directed",
  "02 — AI-Native",
  "03 — Campaign-Ready",
];

export function CaseStudies({}: { caseStudies: CaseStudy[] }) {
  return (
    <Section
      id="approach"
      className="bg-[#080808]"
      aria-labelledby="approach-heading"
    >
      <Container>
        <Heading id="approach-heading" as="h2" size="section" className="mb-16">
          Our Approach
        </Heading>

        <ul className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {approachItems.map((item) => (
            <li key={item}>
              <h3 className="font-display text-lg font-medium text-white md:text-xl">
                {item}
              </h3>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}