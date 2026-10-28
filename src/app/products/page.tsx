import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { CategoryCard } from "@/components/category-card";
import { Reveal } from "@/components/reveal";
import { CtaBand, PageHeader } from "@/components/sections";
import { container, focusRing } from "@/components/ui";
import { categories, productLineCount } from "@/data/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Fluorescent pigments, pigments, fluorescent paints, printing inks, fluorescent dyes, toners, heat reflective coatings and fluorescent pigment dyes from Frox Colours.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        kicker="Products"
        title={
          <>
            Eight categories,
            <br />
            {productLineCount} product lines
          </>
        }
        text="Browse the full Frox Colours range. Every category is offered in our named shades, and every order can start with a sample."
      />

      <section className="py-16" aria-label="All categories">
        <div className={container}>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c, i) => (
              <Reveal as="li" key={c.slug} delay={(i % 4) * 80}>
                <CategoryCard category={c} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Full index, in the same order as the product category list PDF. */}
      <section className="border-y border-line bg-surface py-24" aria-labelledby="index-title">
        <div className={container}>
          <Reveal>
            <h2 id="index-title" className="text-3xl font-semibold tracking-tight text-ink">
              Complete product index
            </h2>
          </Reveal>
          <div className="mt-12 divide-y divide-line rounded-2xl border border-line bg-white">
            {categories.map((c) => (
              <Reveal key={c.slug} className="grid gap-4 p-6 md:grid-cols-12">
                <div className="md:col-span-4">
                  <p className="font-mono text-xs text-muted">{c.number}</p>
                  <h3 className="mt-1 text-lg font-semibold tracking-tight text-ink">
                    <Link href={`/products/${c.slug}`} className={`rounded-sm hover:text-navy ${focusRing}`}>
                      {c.name}
                    </Link>
                  </h3>
                </div>
                <ul className="flex flex-wrap gap-2 md:col-span-6">
                  {c.lines.map((l) => (
                    <li key={l.name} className="rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink">
                      {l.name}
                    </li>
                  ))}
                </ul>
                <div className="md:col-span-2 md:text-right">
                  <Link
                    href={`/products/${c.slug}`}
                    className={`inline-flex items-center gap-1 rounded-sm text-sm font-semibold text-navy transition-opacity duration-300 ease-brand hover:opacity-70 ${focusRing}`}
                  >
                    Details
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
