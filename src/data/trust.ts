/**
 * Business facts, marketplace badges and buyer reviews.
 *
 * IMPORTANT: Fill these in with Frox Colours' own details before launch.
 * - A `null` fact is shown on the site as "To be confirmed".
 * - Only keep an IndiaMART badge switched on if Frox Colours actually holds it.
 * - `reviewsAreSamples: true` shows a visible "sample reviews" note. Replace the
 *   reviews with real, verified buyer reviews and set it to false.
 */

export type BusinessFact = {
  id: string;
  label: string;
  value: string | null;
};

export const businessFacts: BusinessFact[] = [
  { id: "nature", label: "Nature of business", value: "Manufacturer and supplier" },
  { id: "legal", label: "Legal status of firm", value: null }, // TODO e.g. "Proprietorship"
  { id: "employees", label: "Total number of employees", value: null }, // TODO e.g. "11 to 25 people"
  { id: "turnover", label: "Annual turnover", value: null }, // TODO e.g. "5 to 25 Cr"
  { id: "gst-date", label: "GST registration date", value: null }, // TODO e.g. "01 July 2017"
  { id: "gst", label: "GST number", value: null }, // TODO 15 character GSTIN
  { id: "iec", label: "Import export code (IEC)", value: null }, // TODO 10 digit IEC
];

export const marketplace = {
  /** Show the IndiaMART TrustSeal badge. */
  trustSeal: true,
  /** Show the "Payment protected" note next to the TrustSeal. */
  paymentProtected: true,
  /** Show the IndiaMART member badge in the footer. */
  member: true,
  // TODO: link to the Frox Colours IndiaMART catalogue, or leave null.
  profileUrl: null as string | null,
};

export const contactPerson = {
  // TODO: replace with the real contact person.
  name: "Sales team",
  role: "Frox Colours",
};

export type Review = {
  name: string;
  city: string;
  state: string;
  product: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string; // ISO date
  quality: boolean;
  response: boolean;
  delivery: boolean;
  text: string;
};

export const reviewsAreSamples = true;

export const reviews: Review[] = [
  {
    name: "Harshvardhan Patil",
    city: "Bhiwandi",
    state: "Maharashtra",
    product: "Masterbatch Fluorescent Pigment",
    rating: 5,
    date: "2026-09-18",
    quality: true,
    response: true,
    delivery: true,
    text: "Glow Green matched the sample in our PP masterbatch trial. Bulk lot came out the same.",
  },
  {
    name: "Meenakshi Raghavan",
    city: "Tiruppur",
    state: "Tamil Nadu",
    product: "Plastisol Inks",
    rating: 5,
    date: "2026-08-02",
    quality: true,
    response: true,
    delivery: true,
    text: "Barbie Pink and Lemon Yellow print cleanly on cotton. Samples reached us in four days.",
  },
  {
    name: "Gurpreet Sandhu",
    city: "Ludhiana",
    state: "Punjab",
    product: "Screen Printing Inks",
    rating: 4,
    date: "2026-06-27",
    quality: true,
    response: false,
    delivery: true,
    text: "Good brightness on paper boards. Quotation took a couple of follow ups.",
  },
  {
    name: "Ankit Somani",
    city: "Ahmedabad",
    state: "Gujarat",
    product: "Reflective Paint Pigment",
    rating: 4,
    date: "2026-05-11",
    quality: true,
    response: true,
    delivery: true,
    text: "Used it for a shed roof coating trial. Technical sheet was shared on request.",
  },
  {
    name: "Farhan Qureshi",
    city: "Kanpur",
    state: "Uttar Pradesh",
    product: "PVC Printing Ink",
    rating: 3,
    date: "2026-03-23",
    quality: true,
    response: true,
    delivery: false,
    text: "Ink quality is fine on PVC sheets. Dispatch was later than the date we agreed.",
  },
  {
    name: "Ritika Bansal",
    city: "Jaipur",
    state: "Rajasthan",
    product: "Soluble Fluorescent Dyes",
    rating: 5,
    date: "2026-02-14",
    quality: true,
    response: true,
    delivery: true,
    text: "Magenta (R) dissolves well and stays bright. Repeat order was consistent.",
  },
];

export function reviewSummary(list: Review[] = reviews) {
  const count = list.length;
  const average = count ? list.reduce((s, r) => s + r.rating, 0) / count : 0;
  const distribution = ([5, 4, 3, 2, 1] as const).map((star) => {
    const n = list.filter((r) => r.rating === star).length;
    return { star, percent: count ? Math.round((n / count) * 100) : 0 };
  });
  const pct = (key: "quality" | "response" | "delivery") =>
    count ? Math.round((list.filter((r) => r[key]).length / count) * 100) : 0;
  return {
    count,
    average: Math.round(average * 10) / 10,
    distribution,
    satisfaction: [
      { label: "Response", percent: pct("response") },
      { label: "Quality", percent: pct("quality") },
      { label: "Delivery", percent: pct("delivery") },
    ],
  };
}
