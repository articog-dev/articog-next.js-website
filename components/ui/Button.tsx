import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap radius-pill text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-white text-black hover:bg-white/90 active:scale-[0.98] shadow-lg shadow-black/10",
        secondary:
          "border border-border bg-surface text-foreground hover:bg-surface-hover active:scale-[0.98]",
        ghost:
          "text-foreground/70 hover:text-foreground hover:bg-surface active:scale-[0.98]",
        link: "h-auto p-0 text-accent hover:text-accent-hover underline-offset-4 hover:underline",
        outline:
          "border border-accent/40 text-accent hover:border-accent hover:bg-accent-muted active:scale-[0.98]",
      },
      size: {
        sm: "h-8 px-3 type-small",
        md: "h-10 px-4 type-small",
        lg: "h-11 px-6 type-body",
        xl: "h-12 px-8 type-body",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };
