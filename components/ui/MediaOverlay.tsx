import { cn } from "@/lib/utils";

type MediaOverlayProps = {
  className?: string;
  strength?: "soft" | "standard" | "strong";
};

const strengthMap = {
  soft: "from-black/45 via-black/10 to-transparent",
  standard: "from-black/70 via-black/20 to-transparent",
  strong: "from-black/85 via-black/35 to-black/5",
};

export function MediaOverlay({ className, strength = "standard" }: MediaOverlayProps) {
  return <div className={cn("absolute inset-0 bg-gradient-to-t", strengthMap[strength], className)} aria-hidden="true" />;
}
