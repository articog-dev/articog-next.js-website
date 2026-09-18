"use client";

import * as React from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Adapted from Efferd UI's Pricing Card component published on 21st.dev:
// https://21st.dev/@efferd/components/pricing-card
function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("relative flex flex-col radius-lg border border-border bg-surface p-8", className)} {...props}>{children}</div>;
}

function Header({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col", className)} {...props}>{children}</div>;
}

function Plan({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-5 flex items-start justify-between gap-3", className)} {...props}>{children}</div>;
}

function PlanName({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("type-h3 text-white", className)} {...props}>{children}</h3>;
}

function Badge({ className, children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("radius-pill bg-accent px-3 py-1 type-label text-black", className)} {...props}>{children}</span>;
}

function Price({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4 flex items-baseline gap-2", className)} {...props}>{children}</div>;
}

function MainPrice({ className, children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("type-h2 text-accent", className)} {...props}>{children}</span>;
}

function Period({ className, children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("type-small text-muted", className)} {...props}>{children}</span>;
}

function OriginalPrice({ className, children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("type-small text-muted line-through", className)} {...props}>{children}</span>;
}

function Body({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-1 flex-col", className)} {...props}>{children}</div>;
}

function Description({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("mb-6 type-small text-muted", className)} {...props}>{children}</p>;
}

function List({ className, children, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn("flex flex-1 flex-col gap-4", className)} {...props}>{children}</ul>;
}

function ListItem({ className, children, ...props }: React.LiHTMLAttributes<HTMLLIElement>) {
  return <li className={cn("flex items-start gap-3 type-small text-foreground/70", className)} {...props}><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />{children}</li>;
}

export { Card, Header, Plan, PlanName, Badge, Price, MainPrice, Period, OriginalPrice, Body, Description, List, ListItem };
