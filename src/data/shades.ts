/**
 * The 25 named shades from public/Frox_Colours_Image_Kit.
 * Hex values were sampled from the swatch in each PNG. They are digital
 * previews only, not official colour standards (see the kit README).
 */
export type ShadeFamily =
  | "green"
  | "yellow"
  | "orange"
  | "red"
  | "pink"
  | "magenta";

export type Shade = {
  id: string;
  name: string;
  hex: string;
  family: ShadeFamily;
  image: string;
  /** True when dark text is needed on top of the swatch. */
  light: boolean;
};

const kit = "/Frox_Colours_Image_Kit";

export const shades: Shade[] = [
  { id: "glow-green", name: "Glow Green", hex: "#00F548", family: "green", image: `${kit}/01_Glow_Green.png`, light: true },
  { id: "lemon-yellow", name: "Lemon Yellow", hex: "#DEFF00", family: "yellow", image: `${kit}/02_Lemon_Yellow.png`, light: true },
  { id: "chrome", name: "Chrome", hex: "#FF9900", family: "orange", image: `${kit}/03_Chrome.png`, light: true },
  { id: "orange-rg", name: "Orange RG", hex: "#FF3F00", family: "orange", image: `${kit}/04_Orange_RG.png`, light: false },
  { id: "barbie-pink", name: "Barbie Pink", hex: "#FF0073", family: "pink", image: `${kit}/05_Barbie_Pink.png`, light: false },
  { id: "magenta-r", name: "Magenta (R)", hex: "#F000BE", family: "magenta", image: `${kit}/06_Magenta__R.png`, light: false },
  { id: "fire-red", name: "Fire Red", hex: "#FF141E", family: "red", image: `${kit}/07_Fire_Red.png`, light: false },
  { id: "red-violet", name: "Red Violet", hex: "#B000FF", family: "magenta", image: `${kit}/08_Red_Violet.png`, light: false },
  { id: "lunar-yellow", name: "Lunar Yellow", hex: "#DEFF6A", family: "yellow", image: `${kit}/09_Lunar_Yellow.png`, light: true },
  { id: "saturn-yellow", name: "Saturn Yellow", hex: "#D3F741", family: "yellow", image: `${kit}/10_Saturn_Yellow.png`, light: true },
  { id: "super-yellow", name: "Super Yellow", hex: "#EDF551", family: "yellow", image: `${kit}/11_Super_Yellow.png`, light: true },
  { id: "geneva-green", name: "Geneva Green", hex: "#00E748", family: "green", image: `${kit}/12_Geneva_Green.png`, light: true },
  { id: "c-green", name: "C Green", hex: "#00D36F", family: "green", image: `${kit}/13_C_Green.png`, light: true },
  { id: "glow-green-s", name: "Glow Green (S)", hex: "#00E152", family: "green", image: `${kit}/14_Glow_Green__S.png`, light: true },
  { id: "golden-yellow-y", name: "Golden Yellow (Y)", hex: "#FFB500", family: "yellow", image: `${kit}/15_Golden_Yellow__Y.png`, light: true },
  { id: "deep-green", name: "Deep Green", hex: "#00C245", family: "green", image: `${kit}/16_Deep_Green.png`, light: true },
  { id: "golden-yellow-r", name: "Golden Yellow (R)", hex: "#FF9B00", family: "yellow", image: `${kit}/17_Golden_Yellow__R.png`, light: true },
  { id: "orange-y", name: "Orange (Y)", hex: "#FF5B16", family: "orange", image: `${kit}/18_Orange__Y.png`, light: false },
  { id: "red-orange", name: "Red Orange", hex: "#FF4133", family: "orange", image: `${kit}/19_Red_Orange.png`, light: false },
  { id: "orange-r", name: "Orange (R)", hex: "#FF6F14", family: "orange", image: `${kit}/20_Orange__R.png`, light: false },
  { id: "r-red", name: "R. Red", hex: "#FF2A4E", family: "red", image: `${kit}/21_R__Red.png`, light: false },
  { id: "pink-m", name: "Pink (M)", hex: "#FF0084", family: "pink", image: `${kit}/22_Pink__M.png`, light: false },
  { id: "pink-s", name: "Pink (S)", hex: "#FF0F80", family: "pink", image: `${kit}/23_Pink__S.png`, light: false },
  { id: "magenta-s", name: "Magenta (S)", hex: "#E7008D", family: "magenta", image: `${kit}/24_Magenta__S.png`, light: false },
  { id: "magenta-b", name: "Magenta (B)", hex: "#D200B2", family: "magenta", image: `${kit}/25_Magenta__B.png`, light: false },
];

export const shadeFamilies: { id: ShadeFamily | "all"; label: string }[] = [
  { id: "all", label: "All shades" },
  { id: "green", label: "Greens" },
  { id: "yellow", label: "Yellows" },
  { id: "orange", label: "Oranges" },
  { id: "red", label: "Reds" },
  { id: "pink", label: "Pinks" },
  { id: "magenta", label: "Magentas and violet" },
];

export function getShade(id: string): Shade {
  const shade = shades.find((s) => s.id === id);
  if (!shade) throw new Error(`Unknown shade: ${id}`);
  return shade;
}

/** Shades used by the hero colour shoot rotation. */
export const heroShadeIds = [
  "glow-green",
  "barbie-pink",
  "lemon-yellow",
  "orange-rg",
  "red-violet",
  "chrome",
] as const;
