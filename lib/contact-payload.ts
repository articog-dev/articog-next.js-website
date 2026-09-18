export function buildContactPayload(formData: FormData) {
  return {
    name: formData.get("name")?.toString().trim() || "",
    email: formData.get("email")?.toString().trim() || "",
    company: formData.get("company")?.toString().trim() || "",
    companyWebsite: formData.get("companyWebsite")?.toString().trim() || "",
    website: formData.get("website")?.toString() || "",
    inquiryType: formData.get("inquiryType")?.toString() || "",
    message: formData.get("message")?.toString().trim() || "",
  };
}
