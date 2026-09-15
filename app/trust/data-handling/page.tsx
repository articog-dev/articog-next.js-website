import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://articog.com/trust/data-handling" },
  title: "Data Handling & Retention | Articog",
  description: "Learn how Articog manages, stores, and protects client data throughout the creative production process.",
};
import { Container, Section, Button, Heading } from "@/components/ui";
import { Link } from "@/components/ui/Link";
import { Database, Shield, Trash2, HardDrive, RefreshCw, FileText } from "lucide-react";

export default function DataHandlingPage() {
  const sections = [
    {
      title: "Storage & Security",
      icon: <Database className="w-5 h-5 text-white/40" />,
      description: "Client materials and project assets are handled in the tools agreed for each engagement. Access and sharing practices can be documented during onboarding.",
    },
    {
      title: "Retention Policy",
      icon: <HardDrive className="w-5 h-5 text-white/40" />,
      description: "Retention periods depend on the engagement and applicable requirements. The expected retention schedule can be discussed and documented during onboarding.",
    },
    {
      icon: <Shield className="w-5 h-5 text-white/40" />,
      title: "AI Tool Use",
      description: "Client-provided materials are handled according to the agreed project terms and the applicable policies of the tools used for delivery. Specific permissions and restrictions can be documented during onboarding.",
    },
    {
      title: "Vendor & Sub-Processing",
      icon: <RefreshCw className="w-5 h-5 text-white/40" />,
      description: "Third-party tools used in a production workflow can be reviewed as part of project scoping and vendor due diligence. Specific tools and data flows depend on the engagement.",
    },
    {
      title: "Data Deletion",
      icon: <Trash2 className="w-5 h-5 text-white/40" />,
      description: "Deletion requests can be discussed after delivery. Timing and scope depend on the tools involved, applicable requirements, and any agreed retention terms.",
    },
    {
      title: "Backups & Continuity",
      icon: <FileText className="w-5 h-5 text-white/40" />,
      description: "Project continuity and backup arrangements can be discussed during onboarding based on the agreed delivery and storage workflow.",
    },
  ];

  return (
    <div className="bg-black min-h-screen">
      <Section size="lg" className="pt-32 md:pt-40">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-20">
            <span
              className="mb-5 inline-block type-label uppercase tracking-[0.18em]"
              style={{ color: "rgba(255,255,255,0.40)" }}
            >
              TRUST & GOVERNANCE
            </span>
            <Heading as="h1" size="hero" className="mb-6">
              Data Handling & Retention
            </Heading>
            <p className="mx-auto max-w-2xl type-body md:text-lg leading-relaxed mb-12" style={{ color: "rgba(255,255,255,0.65)" }}>
              How we manage, store, and protect your brand's data and creative materials throughout our partnership.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-24">
            {sections.map((section) => (
              <div
                key={section.title}
                className="group rounded-2xl p-8 border border-white/[0.08] transition-all hover:border-white/20 hover:bg-white/[0.02]"
                style={{ background: "rgba(255,255,255,0.01)" }}
              >
                <div className="mb-6 w-10 h-10 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center">
                  {section.icon}
                </div>
                <h3 className="text-lg font-display font-semibold text-white mb-4">{section.title}</h3>
                <p className="type-small leading-relaxed" style={{ color: "rgba(255,255,255,0.50)" }}>
                  {section.description}
                </p>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto p-10 rounded-2xl border border-white/[0.08] bg-white/[0.01] mb-24 text-center">
            <p className="type-small leading-relaxed mb-0" style={{ color: "rgba(255,255,255,0.40)" }}>
              Note: Specific data handling terms, retention schedules, and security protocols are detailed in each client's master service agreement (MSA).
            </p>
          </div>

          <div className="text-center pt-16 border-t border-white/10">
            <Heading as="h2" size="section" className="mb-8">
              Review our practices
            </Heading>
            <Button asChild variant="primary" size="lg">
              <Link href="/book-a-demo">Book a Demo</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}
