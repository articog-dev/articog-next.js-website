import { cn } from "@/lib/utils";

type GridProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "compact" | "standard" | "spacious";
  columns?: string;
};

const gapMap = {
  compact: "grid-gap-card",
  standard: "grid-gap-section",
  spacious: "grid-gap-loose",
};

export function Grid({
  variant = "standard",
  columns = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  className,
  ...props
}: GridProps) {
  return <div className={cn("grid", gapMap[variant], columns, className)} {...props} />;
}
