import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { Heading } from "./Heading";
import { Section } from "./Section";

type PageHeroProps = {
  title: React.ReactNode;
  breadcrumbs?: React.ReactNode;
  eyebrow?: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  media?: React.ReactNode;
  compact?: boolean;
  className?: string;
};

export function PageHero({
  title,
  breadcrumbs,
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
        "overflow-hidden pt-32 md:pt-40",
        media && "relative",
        className,
      )}
    >
      {media ? <div className="absolute inset-0 z-0">{media}</div> : null}
      <Container className="relative z-10 text-center">
        {breadcrumbs}
        <div className="text-center mb-16 mx-auto max-w-3xl">
          {eyebrow ? <div className="mb-4 type-label text-white/50">{eyebrow}</div> : null}
          <Heading as="h1" size="hero" className="mb-6 text-white">
            {title}
          </Heading>
          {subtitle ? <p className="mx-auto mt-6 max-w-2xl type-body-lg text-white/60">{subtitle}</p> : null}
          {actions ? <div className="mt-8 flex flex-wrap justify-center gap-component-gap">{actions}</div> : null}
        </div>
      </Container>
    </Section>
  );
}
