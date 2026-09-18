export const CALENDLY_MESSAGE_ORIGIN = "https://calendly.com";

export function isTrustedCalendlyEvent(event: { origin: string; data: unknown }): boolean {
  if (event.origin !== CALENDLY_MESSAGE_ORIGIN) return false;
  return typeof event.data === "object" && event.data !== null &&
    "event" in event.data && event.data.event === "calendly.event_scheduled";
}