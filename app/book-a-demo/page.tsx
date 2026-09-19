"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { Link } from "@/components/ui/Link";
import { Container, Section, Button, Heading, Input, Textarea, Checkbox, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";
import { ArrowRight } from "lucide-react";
import { trackCalendlyEventScheduled, trackCalendlyOpen, trackDemoFormStart, trackDemoFormSubmit, trackFormError, trackFormSubmit, trackFormSuccess } from "@/lib/analytics";
import { isTrustedCalendlyEvent } from "@/lib/calendly";

const CALENDLY_URL = "https://calendly.com/articog-media-01/articog-demo-call";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: {
        url: string;
        prefill?: {
          name?: string;
          email?: string;
        };
      }) => void;
    };
  }
}

export default function BookADemoPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasTrackedFormStart, setHasTrackedFormStart] = useState(false);
  const hasTrackedCalendlySchedule = useRef(false);

  useEffect(() => {
    const handleCalendlyMessage = (event: MessageEvent) => {
      if (isTrustedCalendlyEvent(event) && !hasTrackedCalendlySchedule.current) {
        hasTrackedCalendlySchedule.current = true;
        trackCalendlyEventScheduled();
      }
    };

    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "https://assets.calendly.com/assets/external/widget.css";
    stylesheet.dataset.calendlyWidget = "true";
    document.head.appendChild(stylesheet);

    window.addEventListener("message", handleCalendlyMessage);
    return () => {
      window.removeEventListener("message", handleCalendlyMessage);
      stylesheet.remove();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    trackFormSubmit("demo");
    trackDemoFormSubmit();

    const formData = new FormData(e.currentTarget);
    const firstName = (formData.get("firstName") as string) || "";
    const lastName = (formData.get("lastName") as string) || "";
    const email = (formData.get("email") as string) || "";
    const company = (formData.get("company") as string) || "";
    const role = (formData.get("role") as string) || "";
    const serviceInterest = formData.getAll("service-interest").map(String);
    const budget = (formData.get("budget") as string) || "";
    const timeline = (formData.get("timeline") as string) || "";
    const projectContext = (formData.get("projectContext") as string) || "";
    const referenceUrl = (formData.get("referenceUrl") as string) || "";
    const website = (formData.get("website") as string) || "";
    const consent = formData.get("consent") === "on";
    const name = `${firstName} ${lastName}`.trim();
    const fallbackCalendlyUrl = `${CALENDLY_URL}?${new URLSearchParams({
      name,
      email,
    }).toString()}`;

    const searchParams = new URLSearchParams(window.location.search);
    const attribution = {
      source: searchParams.get("source") || searchParams.get("utm_source") || "",
      medium: searchParams.get("utm_medium") || "",
      campaign: searchParams.get("utm_campaign") || "",
      content: searchParams.get("utm_content") || "",
      term: searchParams.get("utm_term") || "",
      referrer: document.referrer,
    };

    try {
      const response = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          name,
          email,
          company,
          role,
          serviceInterest,
          budget,
          timeline,
          projectContext,
          referenceUrl,
          website,
          consent,
          attribution,
        }),
      });

      const result = (await response.json()) as { success?: boolean; error?: string };
      if (!response.ok || !result.success) {
        throw new Error(result.error || "We could not save your request. Please try again.");
      }

      if (window.Calendly) {
        trackCalendlyOpen();
        window.Calendly.initPopupWidget({
          url: CALENDLY_URL,
          prefill: { name, email },
        });
      } else {
        trackCalendlyOpen();
        window.open(fallbackCalendlyUrl, "_blank", "noopener,noreferrer");
      }
      trackFormSuccess("demo");
    } catch (error) {
      const message = error instanceof Error ? error.message : "We could not save your request. Please try again.";
      setErrorMessage(message);
      trackFormError("demo", message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Section
      size="lg"
      className="pt-32 md:pt-40 bg-black min-h-screen"
    >
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <Heading as="h1" size="hero" className="mb-6 text-white">
              Book a Demo
            </Heading>
          </div>

          {/* Form */}
          <div
            className="rounded-2xl p-8 md:p-12"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <form
              onSubmit={handleSubmit}
              onFocus={() => {
                if (!hasTrackedFormStart) {
                  setHasTrackedFormStart(true);
                  trackDemoFormStart();
                }
              }}
              className="flex flex-col gap-5 md:gap-8"
            >
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-px w-px overflow-hidden"
              />
              {/* First Name + Last Name */}
              <div className="grid gap-5 sm:grid-cols-2 sm:gap-8">
                <div className="flex flex-col gap-2.5">
                  <label
                    htmlFor="firstName"
                    className="type-nav text-white/70"
                  >
                    First Name <span className="text-accent">*</span>
                  </label>

                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    placeholder="Jane"
                    className="h-14 rounded-lg px-4 text-base sm:h-12"
                    autoComplete="given-name"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "white",
                    }}
                  />
                </div>

                <div className="flex flex-col gap-2.5">
                  <label
                    htmlFor="lastName"
                    className="type-nav text-white/70"
                  >
                    Last Name <span className="text-accent">*</span>
                  </label>

                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    placeholder="Doe"
                    className="h-14 rounded-lg px-4 text-base sm:h-12"
                    autoComplete="family-name"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "white",
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <label htmlFor="projectContext" className="type-nav text-white/70">
                  Tell us about your project
                </label>
                <Textarea
                  id="projectContext"
                  name="projectContext"
                  placeholder="Deliverables, campaign objective, references, target platforms or anything we should know."
                  className="min-h-32 resize-y rounded-lg p-4 text-base"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "white",
                  }}
                />
              </div>

              <div className="flex flex-col gap-2.5">
                <label htmlFor="referenceUrl" className="type-nav text-white/70">
                  Reference / Website URL <span className="text-white/40">(optional)</span>
                </label>
                <Input
                  type="url"
                  id="referenceUrl"
                  name="referenceUrl"
                  placeholder="https://"
                  autoComplete="url"
                  className="h-14 rounded-lg px-4 text-base"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "white",
                  }}
                />
              </div>

              {/* Work Email + Company Name */}
              <div className="grid gap-8 sm:grid-cols-2">
                <div className="flex flex-col gap-2.5">
                  <label
                    htmlFor="email"
                    className="type-nav text-white/70"
                  >
                    Work Email <span className="text-accent">*</span>
                  </label>

                  <Input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="jane@company.com"
                    className="h-14 rounded-lg px-4 text-base sm:h-12"
                    autoComplete="email"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "white",
                    }}
                  />
                </div>

                <div className="flex flex-col gap-2.5">
                  <label
                    htmlFor="company"
                    className="type-nav text-white/70"
                  >
                    Company Name <span className="text-accent">*</span>
                  </label>

                  <Input
                    type="text"
                    id="company"
                    name="company"
                    required
                    placeholder="Acme Corp"
                    className="h-14 rounded-lg px-4 text-base sm:h-12"
                    autoComplete="organization"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "white",
                    }}
                  />
                </div>
              </div>

              {/* Your Role */}
              <div className="flex flex-col gap-2.5">
                <label
                  htmlFor="role"
                  className="type-nav text-white/70"
                >
                  Your Role
                </label>

                <Input
                  type="text"
                  id="role"
                  name="role"
                  placeholder="Creative Director"
                  className="h-14 rounded-lg px-4 text-base sm:h-12"
                  autoComplete="organization-title"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "white",
                  }}
                />
              </div>

              {/* Service Interest */}
              <fieldset className="flex flex-col gap-4">
                <legend className="type-nav text-white/70">
                  Service Interest
                </legend>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {[
                    "Brand Film",
                    "Commercial/Ad",
                    "Social Content",
                    "Product Visuals",
                    "Audio Ad",
                    "Other",
                  ].map((option) => (
                    <label
                      key={option}
                      className="group flex cursor-pointer items-center gap-3"
                    >
                      <div className="relative flex items-center justify-center">
                        <Checkbox
                          name="service-interest"
                          value={option}
                          className="h-5 w-5 rounded border-white/10 bg-white/5"
                        />
                      </div>

                      <span className="type-small text-white/60 transition-colors group-hover:text-white">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Budget + Timeline */}
              <div className="grid gap-5 sm:grid-cols-2 sm:gap-8">
                <div className="flex flex-col gap-2.5">
                  <label
                    htmlFor="budget"
                    className="type-nav text-white/70"
                  >
                    Budget Range
                  </label>

                  <Select name="budget" defaultValue="">
                    <SelectTrigger id="budget" className="h-14 rounded-lg px-4 text-base sm:h-12"><SelectValue placeholder="Select budget" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Under $5k">Under $5k</SelectItem>
                      <SelectItem value="$5k $15k">$5k $15k</SelectItem>
                      <SelectItem value="$15k $50k">$15k $50k</SelectItem>
                      <SelectItem value="$50k+">$50k+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2.5">
                  <label
                    htmlFor="timeline"
                    className="type-nav text-white/70"
                  >
                    Timeline
                  </label>

                  <Select name="timeline" defaultValue="">
                    <SelectTrigger id="timeline" className="h-14 rounded-lg px-4 text-base sm:h-12"><SelectValue placeholder="Select timeline" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Immediately">Immediately</SelectItem>
                      <SelectItem value="Within 1 month">Within 1 month</SelectItem>
                      <SelectItem value="1-3 months">1-3 months</SelectItem>
                      <SelectItem value="Planning for future">Planning for future</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="xl"
                className="mt-4 w-full"
                disabled={isLoading}
              >
                {isLoading ? "Scheduling..." : "Continue to Scheduling"}

                {!isLoading && <ArrowRight size={16} />}
              </Button>

              {errorMessage ? (
                <p role="alert" className="text-center text-sm text-red-300">
                  {errorMessage}
                </p>
              ) : null}

              {/* Privacy Note */}
              <div
                className="text-center font-sans text-[12px] leading-relaxed"
                style={{
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                <label className="mb-2 flex items-start justify-center gap-2 text-left">
                  <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-white" />
                  <span>By submitting, you agree to be contacted about your inquiry.</span>
                </label>
                See our{" "}
                <Link
                  href="/privacy-policy"
                  className="text-white/50 underline underline-offset-2 transition-colors hover:text-white"
                >
                  Privacy Policy
                </Link>
                .
              </div>
            </form>
          </div>
        </div>
      </Container>
    </Section>
  );
}