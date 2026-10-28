/**
 * Product categories and product lines from
 * public/Frox_Colours_Product_Category_List_v2.pdf.
 *
 * The PDF lists names only. Descriptions and application notes below are
 * website copy written for planning and must be confirmed by Frox Colours
 * before publication (as the PDF itself notes).
 */
export type MockupKind =
  | "jar"
  | "sack"
  | "tin"
  | "tub"
  | "bottle"
  | "pouch"
  | "reflective"
  | "vial";

export type ProductLine = {
  name: string;
  description: string;
};

export type Category = {
  slug: string;
  number: string;
  name: string;
  short: string;
  intro: string;
  mockup: MockupKind;
  /** Shade id used to colour the category mockup. */
  shade: string;
  lines: ProductLine[];
  applications: string[];
};

export const categories: Category[] = [
  {
    slug: "fluorescent-pigments",
    number: "01",
    name: "Fluorescent Pigments",
    short: "Daylight fluorescent pigments for plastics, masterbatch and general colouring.",
    intro:
      "Our core range. Daylight fluorescent pigments give bright, high visibility colour under normal light and are offered across all 25 named shades.",
    mockup: "jar",
    shade: "glow-green",
    lines: [
      {
        name: "PL Series Daylight Fluorescent Pigments",
        description: "A pigment series intended for plastics processing, offered across the full shade card.",
      },
      {
        name: "Masterbatch Fluorescent Pigment",
        description: "A grade for colour masterbatch producers who need fluorescent shades in their compounds.",
      },
      {
        name: "Daylight Fluorescent Colours",
        description: "Bright daylight fluorescent colours for general colouring work.",
      },
    ],
    applications: ["Plastic moulding", "Colour masterbatch", "Films and sheets", "Toys and stationery"],
  },
  {
    slug: "pigments",
    number: "02",
    name: "Pigments",
    short: "Organic and fluorescent pigment powders, plus daylight fluorescent toner.",
    intro:
      "Pigment powders for manufacturers who blend their own colour. The range covers organic pigment powder alongside daylight fluorescent pigments and toner.",
    mockup: "sack",
    shade: "barbie-pink",
    lines: [
      { name: "Organic Pigment Powder", description: "Organic pigment in powder form for blending into your own systems." },
      { name: "Daylight Fluorescent Pigments", description: "Fluorescent pigment powder for bright, high visibility colour." },
      { name: "Daylight Fluorescent Toner", description: "A concentrated fluorescent colourant for tinting and shading." },
      { name: "Fluorescent Pigments Powder", description: "Fluorescent pigment supplied as a free flowing powder." },
    ],
    applications: ["Paint making", "Ink making", "Plastics", "Rubber goods"],
  },
  {
    slug: "fluorescent-paints",
    number: "03",
    name: "Fluorescent Paints",
    short: "Radiant paint for high visibility marking, signage and decoration.",
    intro:
      "Ready to use fluorescent paint for surfaces that need to stand out. Radiant Paint is the line listed in the current range.",
    mockup: "tin",
    shade: "orange-rg",
    lines: [{ name: "Radiant Paint", description: "Fluorescent paint for signage, marking and decorative finishes." }],
    applications: ["Safety marking", "Signage", "Event and stage", "Decorative work"],
  },
  {
    slug: "printing-inks",
    number: "04",
    name: "Printing Inks",
    short: "Screen printing, PVC, Huber and plastisol inks for textile and packaging print.",
    intro:
      "Fluorescent and colour inks for printers. The range covers screen printing, PVC, plastisol and Huber printing ink lines.",
    mockup: "tub",
    shade: "lemon-yellow",
    lines: [
      { name: "Screen Printing Inks", description: "Inks for screen printing on textiles, paper and boards." },
      { name: "PVC Printing Ink", description: "Ink for printing on PVC surfaces and PVC based goods." },
      { name: "Huber Printing Ink", description: "Huber printing ink line as listed in the Frox range. Ask for grade details." },
      { name: "Plastisol Inks", description: "Plastisol inks for garment and textile screen printing." },
    ],
    applications: ["Garment printing", "PVC goods", "Packaging", "Labels and stickers"],
  },
  {
    slug: "fluorescent-dyes",
    number: "05",
    name: "Fluorescent Dyes",
    short: "Soluble fluorescent dyes for solutions, liquids and dyeing work.",
    intro:
      "Dyes dissolve into the medium rather than sitting in it as particles. Soluble fluorescent dyes suit liquid systems where a clear, bright colour is required.",
    mockup: "bottle",
    shade: "magenta-r",
    lines: [{ name: "Soluble Fluorescent Dyes", description: "Fluorescent dyes that dissolve into the carrier for clear, bright colour." }],
    applications: ["Liquid colouring", "Dyeing", "Water based colours", "Craft colours"],
  },
  {
    slug: "fluorescent-toners",
    number: "06",
    name: "Fluorescent Toners",
    short: "TN Series daylight fluorescent toner for tinting and shade correction.",
    intro:
      "Toners are concentrated colourants used to tint, brighten or correct a shade. The TN Series is the toner line in the current range.",
    mockup: "pouch",
    shade: "red-violet",
    lines: [{ name: "TN Series Daylight Fluorescent Toner", description: "Concentrated daylight fluorescent toner for tinting and shading." }],
    applications: ["Ink tinting", "Paint tinting", "Shade correction", "Plastics"],
  },
  {
    slug: "heat-reflective-coatings",
    number: "07",
    name: "Heat Reflective Coatings",
    short: "Reflective paint pigment for coatings that reflect sunlight.",
    intro:
      "Reflective pigment for coatings on roofs, tanks and exposed surfaces where reflecting sunlight is part of the brief.",
    mockup: "reflective",
    shade: "chrome",
    lines: [{ name: "Reflective Paint Pigment", description: "Pigment for formulating reflective paints and roof coatings." }],
    applications: ["Roof coatings", "Water tanks", "Industrial sheds", "Exterior walls"],
  },
  {
    slug: "fluorescent-pigment-dyes",
    number: "08",
    name: "Fluorescent Pigment Dyes",
    short: "Fluorescent pigment dyes for bright colour in dye based processes.",
    intro:
      "A combined pigment dye line for processes that need fluorescent brightness with dye handling.",
    mockup: "vial",
    shade: "pink-m",
    lines: [{ name: "Fluorescent Pigment Dyes", description: "Fluorescent pigment dyes for dye based colouring processes." }],
    applications: ["Textiles", "Paper colouring", "Craft and hobby", "Stationery"],
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export const productLineCount = categories.reduce((n, c) => n + c.lines.length, 0);
