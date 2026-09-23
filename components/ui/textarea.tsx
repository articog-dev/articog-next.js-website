import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(({ className, ...props }, ref) => (
  <textarea
    className={cn("flex min-h-24 w-full radius-sm border border-border bg-surface px-3 py-2 type-body text-white outline-none placeholder:text-white placeholder:opacity-100 overflow-x-hidden whitespace-pre-wrap break-words focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-50", className)}
    ref={ref}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
