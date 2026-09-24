export function buildContactPayload(formData: FormData) {
  const attribution = Object.fromEntries(
    Array.from(formData.entries())
      .filter(([key]) =>
        ["source", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "referrer", "landingPage"].includes(String(key)),
      )
      .map(([key, value]) => [key, String(value).trim()])
      .filter(([, value]) => value.length > 0),
  );

  return {
    name: formData.get("name")?.toString().trim() || "",
    email: formData.get("email")?.toString().trim() || "",
    company: formData.get("company")?.toString().trim() || "",
    companyWebsite: formData.get("companyWebsite")?.toString().trim() || "",
    website: formData.get("website")?.toString() || "",
    inquiryType: formData.get("inquiryType")?.toString() || "",
    message: formData.get("message")?.toString().trim() || "",
    ...(Object.keys(attribution).length ? { attribution } : {}),
  };
}
