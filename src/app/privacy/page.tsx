import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Frox Colours handles the information you share through this website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      intro="This policy explains what information we receive through this website and how we use it."
      sections={[
        {
          heading: "Information you send us",
          body: "When you submit an enquiry, your email app sends us your name, company, email, optional phone number and the details of your requirement. We use this only to reply, send samples and prepare quotations.",
        },
        {
          heading: "Cookies and tracking",
          body: "This website does not set advertising or analytics cookies. If that changes, we will update this page and ask for your consent where the law requires it.",
        },
        {
          heading: "Sharing",
          body: "We do not sell your information. We share it only with couriers and service providers when needed to deliver samples or orders to you.",
        },
        {
          heading: "Your choices",
          body: `To see, correct or delete the information we hold about you, write to ${site.contact.email}.`,
        },
      ]}
    />
  );
}
