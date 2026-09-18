import * as React from "react";
import { cn } from "@/lib/utils";

function Alert({ className, variant = "default", ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "destructive" }) {
  return (
    <div
      role="alert"
      className={cn(
        "relative w-full radius-sm border px-4 py-3 type-small",
        variant === "default" && "border-border bg-surface text-foreground",
        variant === "destructive" && "border-red-400/30 bg-red-400/10 text-red-100",
        className
      )}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h4 className={cn("mb-1 type-h4", className)} {...props} />;
}

function AlertDescription({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("text-muted", className)} {...props} />;
}

export { Alert, AlertTitle, AlertDescription };
