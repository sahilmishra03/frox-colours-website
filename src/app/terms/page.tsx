import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "Terms for using the Frox Colours website and its product information.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of use"
      intro="These terms apply to your use of this website and the information on it."
      sections={[
        {
          heading: "Product information",
          body: "Product names, categories and descriptions on this website are for general guidance. Availability, grades and specifications are confirmed in writing with each quotation.",
        },
        {
          heading: "Colour accuracy",
          body: "Shade previews are digital approximations and vary between screens. The approved physical sample is the only colour standard for an order.",
        },
        {
          heading: "Downloads",
          body: "The product list and shade image kit may be used to evaluate and specify Frox Colours products. Please ask before using them in other publications.",
        },
        {
          heading: "Orders",
          body: "Orders are governed by the quotation and invoice issued for them, not by the content of this website.",
        },
      ]}
    />
  );
}
