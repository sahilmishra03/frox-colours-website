import { Factory, Palette } from "@phosphor-icons/react/ssr";

export const heroTitle = {
  lead: "Daylight Fluorescent Pigments",
  tail: "Manufacturer & Supplier",
};

export const heroText =
  "Pigments, toners, dyes, printing inks and coatings for plastics, textiles, paint and print.";

export const heroActions = [
  { href: "/products", label: "Explore Products" },
  { href: "/shades", label: "View Shades" },
  { href: "/enquiry", label: "Contact Sales" },
] as const;

export const heroBadges: { Icon: typeof Factory; title: string; text: string }[] = [
  { Icon: Factory, title: "Manufacturer", text: "Direct from source" },
  { Icon: Palette, title: "Custom Shades", text: "Matched on request" },
];

/** Shades featured in hero slideshows: one from each colour family. */
export const heroShadeIds = [
  "glow-green",
  "lemon-yellow",
  "chrome",
  "orange-rg",
  "fire-red",
  "magenta-r",
  "red-violet",
  "golden-yellow-y",
];
