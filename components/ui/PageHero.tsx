import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { Heading } from "./Heading";
import { Section } from "./Section";

type PageHeroProps = {
  title: React.ReactNode;
  eyebrow?: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  media?: React.ReactNode;
  compact?: boolean;
  className?: string;
};

export function PageHero({
  title,
  eyebrow,
  subtitle,
  actions,
  media,
  compact = false,
  className,
}: PageHeroProps) {
  return (
    <Section
      size={compact ? "sm" : "lg"}
      className={cn(
        "overflow-hidden pt-[var(--header-offset)]",
        media && "relative flex items-center",
        className,
      )}
    >
      {media ? <div className="absolute inset-0 z-0">{media}</div> : null}
      <Container className={cn("relative z-10", !media && "text-center")}>
        <div className={cn("max-w-3xl", !media && "mx-auto")}>
          {eyebrow ? <div className="mb-4 type-label text-white/50">{eyebrow}</div> : null}
          <Heading as="h1" size="hero" className="text-white">
            {title}
          </Heading>
          {subtitle ? <p className="mt-6 max-w-2xl type-body-lg text-white/60">{subtitle}</p> : null}
          {actions ? <div className="mt-8 flex flex-wrap gap-component-gap">{actions}</div> : null}
        </div>
      </Container>
    </Section>
  );
}
