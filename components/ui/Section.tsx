import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: React.ElementType;
  size?: "sm" | "md" | "lg";
  style?: React.CSSProperties;
}

export function Section({
  children,
  className,
  id,
  as: Tag = "section",
  size = "md",
  style,
}: SectionProps) {
  const isLegacyHero = className?.includes("pt-32") ?? false;

  return (
    <Tag
      id={id}
      style={style}
      data-spacing-hero={isLegacyHero ? "true" : undefined}
      className={cn(
        "relative w-full",
        (isLegacyHero ? "md" : size) === "sm" && "py-section-sm",
        (isLegacyHero ? "md" : size) === "md" && "py-section",
        (isLegacyHero ? "md" : size) === "lg" && "py-section-lg",
        className
      )}
    >
      {children}
    </Tag>
  );
}
