import { cn } from "@/lib/utils";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "p";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement> {
  children: React.ReactNode;
  as?: HeadingTag;
  size?: "hero" | "section" | "card" | "subsection" | "label";
  className?: string;
  gradient?: boolean;
  id?: string;
}

const sizeMap: Record<NonNullable<HeadingProps["size"]>, string> = {
  hero: "type-h1",
  section: "type-h2",
  card: "type-h3",
  subsection: "type-h4",
  label: "type-label text-white/35",
};

export function Heading({
  children,
  as: Tag = "h2",
  size = "section",
  className,
  gradient = false,
  ...props
}: HeadingProps) {
  return (
    <Tag
      {...props}
      className={cn(
        sizeMap[size],
        gradient && "text-gradient-accent",
        className
      )}
    >
      {children}
    </Tag>
  );
}
