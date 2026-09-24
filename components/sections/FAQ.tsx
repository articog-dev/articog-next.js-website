import { Container, Heading, Section } from "@/components/ui";

const faqs = [
  {
    question: "What makes Articog different from a traditional agency?",
    answer:
      "Articog combines human creative leadership with AI-native production workflows, giving teams faster turnaround, broader variation testing, and tighter reporting without sacrificing brand quality.",
  },
  {
    question: "Do you work with in-house marketing teams?",
    answer:
      "Yes. We often plug into existing marketing, product, and brand teams as a creative partner, production engine, or flexible extension of the team depending on the workflow.",
  },
  {
    question: "Can you support paid media and organic content together?",
    answer:
      "Absolutely. Our production workflows are built to support performance creative, campaign variants, launch content, and longer-form narrative assets from the same systems.",
  },
  {
    question: "How quickly can a project start?",
    answer:
      "Most engagements can begin within a short discovery sprint, with rapid production cycles once the scope, asset libraries, and creative direction are aligned.",
  },
];

export function FAQ() {
  return (
    <Section size="lg" className="bg-black">
      <Container>
        <div className="mx-auto max-w-4xl">
          <Heading as="h2" size="section" className="mb-10 text-center text-white">
            Questions teams ask before they start
          </Heading>

          <div className="space-y-3">
            {faqs.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 text-left transition-colors hover:border-white/20 hover:bg-white/[0.04]"
                open={item.question === faqs[0].question}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-white marker:content-none">
                  <span>{item.question}</span>
                  <span className="text-white/50 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/65">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
