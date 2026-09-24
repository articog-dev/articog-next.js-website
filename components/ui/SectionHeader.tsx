import { ScrollReveal } from "@/components/animations";
import { cn } from "@/lib/utils";
import { Heading } from "./Heading";

interface SectionHeaderProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  className?: string;
}

export function SectionHeader({ eyebrow, title, lead, className }: SectionHeaderProps) {
  return (
    <ScrollReveal>
      <div className={cn("mx-auto mb-[var(--gap-header-to-content)] max-w-3xl text-center", className)}>
        {eyebrow ? <p className="type-label text-white/55">{eyebrow}</p> : null}
        <Heading as="h2" size="section" className={cn("text-balance text-white", eyebrow && "mt-3")}>{title}</Heading>
        {lead ? <p className="mx-auto mt-[var(--gap-heading-to-text)] max-w-2xl type-body-lg text-white/70">{lead}</p> : null}
      </div>
    </ScrollReveal>
  );
}