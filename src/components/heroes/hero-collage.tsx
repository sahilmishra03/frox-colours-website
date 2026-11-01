import Image from "next/image";
import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { IndiaMartLogo } from "@/components/trust";
import { getShade } from "@/data/shades";
import { marketplace } from "@/data/trust";
import { heroBadges } from "./hero-data";
import { TintRoot, TintSwatches } from "./shade-tint";

const display = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

/**
 * Four factory photos (public/hero), one per corner. Each tile is larger than
 * a quarter so the tiles overlap, and the inner edges fade out, so the photos
 * blend into one scene with no hard seams.
 */
const FADE = "black 55%, transparent 96%";
const tiles = [
  { src: "/hero/plant.webp", pos: "left-0 top-0", x: "to right", y: "to bottom", focus: "50% 25%" },
  { src: "/hero/worker.webp", pos: "right-0 top-0", x: "to left", y: "to bottom", focus: "40% 30%" },
  { src: "/hero/qc.webp", pos: "left-0 bottom-0", x: "to right", y: "to top", focus: "35% 65%" },
  { src: "/hero/warehouse.webp", pos: "right-0 bottom-0", x: "to left", y: "to top", focus: "55% 55%" },
];

/** Product shades the visitor can preview. Kept to the warm and green families. */
const tintShades = ["glow-green", "lemon-yellow", "chrome", "orange-rg", "fire-red", "c-green"].map((id) => {
  const s = getShade(id);
  return { id: s.id, name: s.name, hex: s.hex };
});

/** Option 2: full-screen factory photo backdrop with an interactive shade preview. */
export function HeroCollage({ titleAs: Title = "h1" }: { titleAs?: "h1" | "h2" }) {
  return (
    <TintRoot
      shades={tintShades}
      className={`${display.className} relative flex min-h-svh items-center justify-center overflow-hidden bg-navy-deep`}
    >
        {/* Photo backdrop */}
        <div className="absolute inset-0" aria-hidden="true">
          {tiles.map((t, i) => {
            const mask = `linear-gradient(${t.x}, ${FADE}), linear-gradient(${t.y}, ${FADE})`;
            return (
              <div
                key={t.src}
                className={`absolute h-[62%] w-[60%] ${t.pos}`}
                style={{
                  maskImage: mask,
                  WebkitMaskImage: mask,
                  maskComposite: "intersect",
                  WebkitMaskComposite: "source-in",
                }}
              >
                <Image
                  src={t.src}
                  alt=""
                  fill
                  sizes="60vw"
                  preload={i < 2}
                  className="object-cover saturate-[0.85]"
                  style={{ objectPosition: t.focus }}
                />
              </div>
            );
          })}
        </div>

        {/* One colour grade over all photos, then the shade glow */}
        <div className="absolute inset-0 bg-navy-deep/55" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_center,rgb(13_31_52/0.82),rgb(13_31_52/0.35))]"
          aria-hidden="true"
        />
        <div
          className="absolute left-1/2 top-1/2 size-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.16] blur-3xl transition-[background-color] duration-1000 ease-brand"
          style={{ backgroundColor: "var(--tint)" }}
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-navy-deep/80 to-transparent" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-navy-deep to-transparent" aria-hidden="true" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 pb-16 pt-36 text-center">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
            <span className="h-px w-8 bg-white/40" aria-hidden="true" />
            Frox Colours, India
            <span className="h-px w-8 bg-white/40" aria-hidden="true" />
          </p>

          <Title className="mt-6 text-[2.6rem] font-extrabold leading-[1.04] tracking-[-0.035em] text-white sm:text-6xl lg:text-[5.25rem]">
            Daylight{" "}
            <span className="relative inline-block">
              <span className="transition-colors duration-700 ease-brand" style={{ color: "var(--tint)" }}>
                Fluorescent
              </span>
              <span
                className="absolute inset-x-1 -bottom-1 h-1.5 rounded-full transition-colors duration-700 ease-brand"
                style={{ backgroundColor: "var(--tint)" }}
                aria-hidden="true"
              />
            </span>
            <br />
            Pigments
            <span className="mt-3 block text-2xl font-semibold tracking-[-0.01em] text-white/85 sm:text-3xl lg:text-4xl">
              Manufacturer &amp; Supplier
            </span>
          </Title>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            Pigments, toners, dyes, inks and coatings for plastics, textiles, paint and print.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-[15px] font-bold text-white shadow-lg shadow-black/20 transition-[background-color,transform] duration-300 ease-brand hover:-translate-y-0.5 hover:bg-accent-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Explore Products
              <ArrowRight
                size={18}
                weight="bold"
                aria-hidden="true"
                className="transition-transform duration-300 ease-brand group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              href="/enquiry"
              className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-[15px] font-bold text-white backdrop-blur-md transition-[background-color,transform] duration-300 ease-brand hover:-translate-y-0.5 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Contact Sales
            </Link>
          </div>

          <div className="mt-10">
            <TintSwatches />
          </div>

          <ul className="mt-8 flex flex-wrap items-stretch justify-center divide-white/15 overflow-hidden rounded-2xl border border-white/15 bg-navy-deep/40 backdrop-blur-md sm:divide-x">
            {marketplace.trustSeal ? (
              <li className="flex items-center gap-3 px-5 py-3">
                <span className="grid size-10 place-items-center rounded-lg bg-white p-1">
                  <IndiaMartLogo className="h-7 w-auto" />
                </span>
                <span className="text-left">
                  <span className="block text-sm font-bold leading-tight text-white">TrustSeal Verified</span>
                  <span className="block text-xs leading-tight text-white/65">IndiaMART supplier</span>
                </span>
              </li>
            ) : null}
            {heroBadges.map(({ Icon, title, text }) => (
              <li key={title} className="flex items-center gap-3 px-5 py-3">
                <span className="grid size-10 place-items-center rounded-lg bg-white/10 text-white">
                  <Icon size={22} weight="duotone" aria-hidden="true" />
                </span>
                <span className="text-left">
                  <span className="block text-sm font-bold leading-tight text-white">{title}</span>
                  <span className="block text-xs leading-tight text-white/65">{text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
    </TintRoot>
  );
}
