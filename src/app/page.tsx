import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Barricade,
  Cube,
  PuzzlePiece,
  Sneaker,
  TShirt,
  Tag,
} from "@phosphor-icons/react/ssr";
import { Faq, FaqJsonLd } from "@/components/faq";
import { HeroWall } from "@/components/heroes/hero-wall";
import { Reveal } from "@/components/reveal";
import { container, focusRing, sectionLabel, textLink } from "@/components/ui";
import { categories, productLineCount } from "@/data/products";
import { getShade } from "@/data/shades";

const industries = [
  { Icon: Cube, title: "Plastics and masterbatch", href: "/products/fluorescent-pigments" },
  { Icon: TShirt, title: "Textile and garment printing", href: "/products/printing-inks" },
  { Icon: Barricade, title: "Safety and signage", href: "/products/fluorescent-paints" },
  { Icon: Tag, title: "Packaging and labels", href: "/products/printing-inks" },
  { Icon: PuzzlePiece, title: "Toys and stationery", href: "/products/pigments" },
  { Icon: Sneaker, title: "PVC and footwear", href: "/products/printing-inks" },
];

function SectionTitle({ label, title, id }: { label: string; title: string; id: string }) {
  return (
    <div>
      <p className={sectionLabel}>{label}</p>
      <h2 id={id} className="mt-3 text-3xl font-bold tracking-tight text-navy md:text-4xl">
        {title}
      </h2>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <HeroWall />

      {/* Key figures */}
      <section className="border-b border-line bg-white" aria-label="Company figures">
        <dl className={`${container} grid grid-cols-2 divide-line py-8 md:grid-cols-4 md:divide-x`}>
          {[
            { value: String(categories.length), label: "Product categories" },
            { value: String(productLineCount), label: "Product lines" },
            { value: "6", label: "Industries served" },
            { value: "Custom", label: "Shades on request" },
          ].map((f) => (
            <div key={f.label} className="flex flex-col-reverse px-2 py-3 text-center md:px-6">
              <dt className="mt-1 text-sm text-muted">{f.label}</dt>
              <dd className="text-3xl font-bold tracking-tight text-navy">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Product categories */}
      <section className="py-20 md:py-24" aria-labelledby="products-title">
        <div className={container}>
          <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionTitle id="products-title" label="Products" title="Product categories" />
            <Link href="/products" className={`${textLink} text-sm`}>
              All products
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => {
              const shade = getShade(c.shade);
              return (
                <li key={c.slug} className="bg-white">
                  <Link
                    href={`/products/${c.slug}`}
                    className={`group flex h-full flex-col p-6 transition-colors duration-300 ease-brand hover:bg-surface ${focusRing}`}
                  >
                    <span className="flex items-center justify-between">
                      <span className="font-mono text-xs text-subtle">{c.number}</span>
                      <span className="size-6 rounded-md ring-1 ring-black/10" style={{ backgroundColor: shade.hex }} />
                    </span>
                    <span className="mt-8 text-lg font-semibold tracking-tight text-navy">{c.name}</span>
                    <span className="mt-2 flex-1 text-sm text-muted">{c.short}</span>
                    <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                      View range
                      <ArrowUpRight
                        size={16}
                        aria-hidden="true"
                        className="transition-transform duration-300 ease-brand group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Industries */}
      <section className="bg-surface py-20 md:py-24" aria-labelledby="industries-title">
        <div className={container}>
          <Reveal>
            <SectionTitle id="industries-title" label="Applications" title="Industries we serve" />
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map(({ Icon, title, href }) => (
              <li key={title}>
                <Link
                  href={href}
                  className={`group flex items-center gap-4 rounded-2xl border border-line bg-white p-5 transition-[border-color,box-shadow] duration-300 ease-brand hover:border-navy/20 hover:shadow-md ${focusRing}`}
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-navy text-white">
                    <Icon size={24} aria-hidden="true" />
                  </span>
                  <span className="flex-1 text-base font-semibold text-navy">{title}</span>
                  <ArrowRight
                    size={18}
                    aria-hidden="true"
                    className="text-subtle transition-[color,transform] duration-300 ease-brand group-hover:translate-x-1 group-hover:text-accent"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-24" aria-labelledby="faq-title">
        <div className="mx-auto w-full max-w-4xl px-6">
          <h2 id="faq-title" className="text-center text-3xl font-bold tracking-tight text-navy md:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-10">
            <Faq />
          </div>
        </div>
        <FaqJsonLd />
      </section>
      {/* Enquiry band */}
      <section className="pb-20 md:pb-24" aria-labelledby="enquiry-title">
        <div className={container}>
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-navy px-8 py-10 md:flex-row md:items-center md:px-12">
            <div>
              <h2 id="enquiry-title" className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                Need a specific shade or grade?
              </h2>
              <p className="mt-2 text-white/70">Share your requirement and our team will respond with a quotation.</p>
            </div>
            <Link
              href="/enquiry"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-accent px-5 py-3 text-base font-semibold text-white transition-colors duration-300 ease-brand hover:bg-accent-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Send enquiry
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
