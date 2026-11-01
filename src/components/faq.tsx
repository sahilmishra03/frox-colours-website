import { CaretDown } from "@phosphor-icons/react/ssr";

export type FaqItem = { q: string; a: string };

export const faqs: FaqItem[] = [
  {
    q: "Can I get a sample before placing a bulk order?",
    a: "Yes. Every enquiry starts with a physical sample in the shade and product line you need, so you can test it in your own process before you commit to bulk.",
  },
  {
    q: "How accurate are the colours shown on this website?",
    a: "They are digital previews. Fluorescent colour cannot be shown exactly on a screen, so please approve shades against the physical sample.",
  },
  {
    q: "Which product should I choose for plastics?",
    a: "For moulding and compounding, start with the PL Series Daylight Fluorescent Pigments or the Masterbatch Fluorescent Pigment. Tell us your polymer and process and we will recommend the right grade.",
  },
  {
    q: "What is the difference between a pigment, a toner and a dye?",
    a: "A pigment stays as fine particles in the medium. A toner is a concentrated colourant used to tint or correct a shade. A dye dissolves into the medium. Our team can advise which one suits your system.",
  },
  {
    q: "What is the minimum order quantity?",
    a: "It depends on the product line and shade. We share the minimum quantity, pack sizes and lead time together with your quotation.",
  },
  {
    q: "Can you match a shade that is not on the card?",
    a: "Send us a reference sample. We will tell you the closest standard shade from our range and confirm whether a custom match is possible.",
  },
  {
    q: "Do you provide technical and safety data sheets?",
    a: "Yes, on request. Mention the product line in your enquiry and we will send the documents that apply to it.",
  },
  {
    q: "Do you deliver outside my city?",
    a: "Share your delivery location in the enquiry form and we will confirm dispatch options and freight with the quotation.",
  },
];

export function Faq({ items = faqs }: { items?: FaqItem[] }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <details
          key={item.q}
          className="group rounded-2xl border border-line bg-white px-5 transition-[border-color,box-shadow] duration-300 ease-brand open:border-navy/20 open:shadow-sm"
        >
          <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-base font-semibold text-navy outline-none focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy">
            {item.q}
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-2 text-navy transition-transform duration-300 ease-brand group-open:rotate-180">
              <CaretDown size={16} weight="bold" aria-hidden="true" />
            </span>
          </summary>
          <p className="-mt-1 pb-5 text-base text-muted group-open:animate-fade-up">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function FaqJsonLd({ items = faqs }: { items?: FaqItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
