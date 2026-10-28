import type { Metadata } from "next";
import { ClipboardText, Eyedropper, Handshake, Scales } from "@phosphor-icons/react/ssr";
import { PigmentSack, PowderMound, SwatchFan } from "@/components/mockups/product-mockups";
import { Reveal } from "@/components/reveal";
import { CtaBand, PageHeader } from "@/components/sections";
import { container, eyebrow } from "@/components/ui";
import { categories, productLineCount } from "@/data/products";
import { shades } from "@/data/shades";

export const metadata: Metadata = {
  title: "About",
  description:
    "Frox Colours supplies daylight fluorescent pigments, dyes, toners, printing inks, paints and reflective coatings to manufacturers and printers.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    Icon: Eyedropper,
    title: "Sample first",
    text: "We would rather you test a sample than trust a screen. Colour is approved in your process before any bulk order.",
  },
  {
    Icon: ClipboardText,
    title: "Clear specifications",
    text: "Every shade has a name and every line has a category, so your purchase orders and our dispatch notes say the same thing.",
  },
  {
    Icon: Scales,
    title: "Consistent lots",
    text: "Bulk supply is checked against the sample you approved, so repeat orders match the first.",
  },
  {
    Icon: Handshake,
    title: "Direct answers",
    text: "Ask about grades, pack sizes or lead times and you get a straight reply from people who know the product.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        kicker="About Frox Colours"
        title={
          <>
            A colour supplier built
            <br />
            around the sample
          </>
        }
        text="Frox Colours supplies daylight fluorescent pigments and related colourants to manufacturers, compounders and printers. Our range covers pigments, toners, dyes, printing inks, paints and heat reflective coatings."
      />

      <section className="py-24" aria-labelledby="what-title">
        <div className={`${container} grid gap-12 lg:grid-cols-12 lg:items-center`}>
          <Reveal className="lg:col-span-6">
            <p className={eyebrow}>What we do</p>
            <h2 id="what-title" className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Bright colour for products that need to be seen
            </h2>
            <p className="mt-6 text-lg text-muted">
              Daylight fluorescent colour turns part of the light around it into visible colour, so it reads brighter
              than conventional pigment. That is why it is chosen for safety wear, signage, toys, packaging and
              garment prints.
            </p>
            <p className="mt-4 text-lg text-muted">
              We organise the range into {categories.length} categories and {productLineCount} product lines, all
              offered against one shade card of {shades.length} named shades.
            </p>
          </Reveal>
          <Reveal className="group lg:col-span-6" delay={100}>
            <div className="rounded-3xl border border-line bg-white p-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface">
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-surface-2" aria-hidden="true" />
                <SwatchFan
                  colors={["#00F548", "#DEFF00", "#FF9900", "#FF0073", "#B000FF"]}
                  className="absolute right-4 top-4 w-1/3"
                />
                <PowderMound color="#FF0073" className="absolute bottom-2 left-0 w-1/3" />
                <PigmentSack
                  color="#00F548"
                  label="GLOW GREEN"
                  title="Frox Colours 25 kg pigment sack in Glow Green"
                  className="absolute bottom-2 left-1/2 w-1/2 -translate-x-1/2"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-line bg-surface py-24" aria-labelledby="how-title">
        <div className={container}>
          <Reveal>
            <p className={eyebrow}>How we work</p>
            <h2 id="how-title" className="mt-3 max-w-[680px] text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Four principles behind every order
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map(({ Icon, title, text }, i) => (
              <Reveal as="li" key={title} delay={i * 80} className="rounded-2xl border border-line bg-white p-6">
                <span className="grid size-10 place-items-center rounded-lg bg-surface text-navy">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-lg font-semibold tracking-tight text-ink">{title}</h3>
                <p className="mt-2 text-sm text-muted">{text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-24" aria-labelledby="who-title">
        <div className={`${container} grid gap-12 lg:grid-cols-12`}>
          <Reveal className="lg:col-span-5">
            <p className={eyebrow}>Who we supply</p>
            <h2 id="who-title" className="mt-3 text-3xl font-semibold tracking-tight text-ink">
              Manufacturers, compounders and printers
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={80}>
            <dl className="divide-y divide-line rounded-2xl border border-line">
              {[
                ["Plastics", "Moulders, film makers and masterbatch producers"],
                ["Print", "Screen printers, garment printers and label converters"],
                ["Coatings", "Paint makers and roof coating applicators"],
                ["Consumer goods", "Toy, stationery and footwear manufacturers"],
              ].map(([term, desc]) => (
                <div key={term} className="grid gap-2 p-6 sm:grid-cols-3">
                  <dt className="text-base font-semibold text-ink">{term}</dt>
                  <dd className="text-base text-muted sm:col-span-2">{desc}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
