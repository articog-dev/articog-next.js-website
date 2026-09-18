import * as React from "react";
import { cn } from "@/lib/utils";

function Badge({ className, variant = "default", ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "secondary" | "outline" }) {
  return (
    <div
      className={cn(
        "inline-flex w-fit items-center radius-sm border px-2 py-0.5 type-caption font-medium",
        variant === "default" && "border-accent/30 bg-accent-muted text-white",
        variant === "secondary" && "border-border bg-surface text-muted",
        variant === "outline" && "border-border text-muted",
        className
      )}
      {...props}
    />
  );
}

export { Badge };
