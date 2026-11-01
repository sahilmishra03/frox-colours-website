import Link from "next/link";
import {
  ArrowRight,
  Barricade,
  Cube,
  Eyedropper,
  Flask,
  Package,
  PuzzlePiece,
  Sneaker,
  Swatches,
  TShirt,
  Tag,
} from "@phosphor-icons/react/ssr";
import { CategoryCard } from "@/components/category-card";
import { ColourShoot } from "@/components/colour-shoot";
import { ContactBlock } from "@/components/contact-block";
import { Faq, FaqJsonLd } from "@/components/faq";
import { Reveal } from "@/components/reveal";
import { CtaBand, SectionHeading } from "@/components/sections";
import { TaglineReveal } from "@/components/tagline-reveal";
import { CompanyFacts, RatingsReviews, TrustStrip } from "@/components/trust";
import { buttonPrimary, buttonSecondary, container, eyebrow, textLink } from "@/components/ui";
import { categories, productLineCount } from "@/data/products";

const benefits = [
  {
    Icon: Eyedropper,
    title: "Approve the shade on a sample",
    text: "Every order starts with a physical sample, so the colour is signed off in your own process and not on a screen.",
  },
  {
    Icon: Swatches,
    title: "25 named shades on one card",
    text: "Order by shade name across greens, yellows, oranges, reds, pinks and magentas.",
  },
  {
    Icon: Package,
    title: "Eight categories from one supplier",
    text: "Pigments, toners, dyes, printing inks, paints and reflective coatings on a single purchase order.",
  },
  {
    Icon: Flask,
    title: "Grades for your process",
    text: "Lines for masterbatch, PVC, plastisol and screen printing, with technical data sheets on request.",
  },
];

const applications = [
  { Icon: Cube, title: "Plastics and masterbatch", text: "Moulded parts, films and colour compounds.", href: "/products/fluorescent-pigments" },
  { Icon: TShirt, title: "Garment and textile print", text: "Screen printing and plastisol work on fabric.", href: "/products/printing-inks" },
  { Icon: Barricade, title: "Safety and signage", text: "High visibility marking and signboards.", href: "/products/fluorescent-paints" },
  { Icon: Tag, title: "Packaging and labels", text: "Cartons, stickers and printed labels.", href: "/products/printing-inks" },
  { Icon: PuzzlePiece, title: "Toys and stationery", text: "Bright colour for consumer goods.", href: "/products/pigments" },
  { Icon: Sneaker, title: "PVC and footwear goods", text: "Printing and colouring on PVC surfaces.", href: "/products/printing-inks" },
];

const steps = [
  {
    title: "Share your requirement",
    text: "Tell us the product line, shade, application and the quantity you expect to order.",
  },
  {
    title: "Approve a physical sample",
    text: "Test the sample on your own line. If the result needs adjusting, we suggest the closest grade or shade.",
  },
  {
    title: "Receive bulk supply",
    text: "Your order is packed and dispatched against the sample you approved, with documents on request.",
  },
];

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <section className="bg-white pt-24">
        <div className={`${container} grid gap-12 pb-16 pt-12 lg:grid-cols-12 lg:items-center`}>
          <div className="lg:col-span-6">
            <p className={`${eyebrow} animate-fade-up`}>Manufacturer & IndiaMART TrustSeal Verified Supplier</p>
            <h1 className="hero-heading mt-4 max-w-[680px] animate-fade-up text-4xl font-semibold tracking-tight [animation-delay:80ms] sm:text-5xl xl:text-6xl">
              Brilliant daylight <br className="hidden sm:block" />
              fluorescent pigments & inks
            </h1>
            <p className="mt-6 max-w-[680px] animate-fade-up text-lg text-muted [animation-delay:160ms]">
              Supplying 25 vibrant daylight fluorescent shades across plastics masterbatch, printing inks, paints, dyes, and heat-reflective coatings. Approve a physical sample on your own production line before bulk order.
            </p>
            <div className="mt-8 flex animate-fade-up flex-col gap-3 [animation-delay:240ms] sm:flex-row">
              <Link href="/enquiry" className={buttonPrimary}>
                Request a sample
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link href="/products" className={buttonSecondary}>
                View products
              </Link>
            </div>
          </div>
          <div className="animate-pop-in [animation-delay:200ms] lg:col-span-6">
            <ColourShoot />
          </div>
        </div>
      </section>

      {/* 2. Achievements and trust, directly under the hero */}
      <TrustStrip />

      {/* 3. Products */}
      <section className="py-24" aria-labelledby="range-title">
        <div className={container}>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <p className={eyebrow}>Our products</p>
              <h2 id="range-title" className="mt-3 max-w-[680px] text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                {categories.length} categories, {productLineCount} product lines
              </h2>
            </Reveal>
            <div className="flex flex-wrap gap-6">
              <Link href="/shades" className={textLink}>
                Shade card
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link href="/products" className={textLink}>
                All products
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c, i) => (
              <Reveal as="li" key={c.slug} delay={(i % 4) * 80}>
                <CategoryCard category={c} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Company details */}
      <div className="border-t border-line">
        <CompanyFacts />
      </div>

      {/* 5. Why choose us */}
      <section className="border-t border-line bg-surface py-24" aria-labelledby="benefits-title">
        <div className={container}>
          <Reveal>
            <p className={eyebrow}>Why buyers choose Frox Colours</p>
            <h2 id="benefits-title" className="mt-3 max-w-[680px] text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Fewer rejected batches, because the shade is agreed first
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ Icon, title, text }, i) => (
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

      {/* 6. Ratings and reviews */}
      <RatingsReviews />

      {/* 7. Applications */}
      <section className="py-24" aria-labelledby="apps-title">
        <div className={container}>
          <Reveal>
            <SectionHeading
              kicker="Applications"
              title="Where our products are used"
              text="Tell us your end product and we will point you to the right line."
            />
          </Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {applications.map(({ Icon, title, text, href }, i) => (
              <Reveal as="li" key={title} delay={(i % 3) * 80}>
                <Link
                  href={href}
                  className="group flex h-full items-start gap-4 rounded-2xl border border-line bg-white p-6 transition-[border-color,transform] duration-500 ease-brand hover:-translate-y-1 hover:border-ink/20 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-surface text-navy">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-base font-semibold text-ink">{title}</span>
                    <span className="mt-1 block text-sm text-muted">{text}</span>
                  </span>
                  <ArrowRight
                    size={18}
                    aria-hidden="true"
                    className="mt-1 text-muted transition-transform duration-500 ease-brand group-hover:translate-x-1"
                  />
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 8. How it works */}
      <section className="border-y border-line bg-surface py-24" aria-labelledby="how-title">
        <div className={container}>
          <Reveal>
            <p className={eyebrow}>How it works</p>
            <h2 id="how-title" className="mt-3 max-w-[680px] text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              From enquiry to bulk supply in three steps
            </h2>
          </Reveal>
          <ol className="mt-12 grid gap-4 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 100} className="rounded-2xl border border-line bg-white p-6">
                <span className="grid size-10 place-items-center rounded-lg bg-navy font-mono text-sm font-semibold text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-lg font-semibold tracking-tight text-ink">{s.title}</h3>
                <p className="mt-2 text-base text-muted">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 9. Tagline reveal (skill B11) */}
      <section className="py-24" aria-label="Our promise">
        <div className={container}>
          <TaglineReveal lines={["The colour you approve on a sample", "is the colour you receive in bulk."]} />
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="border-t border-line bg-surface py-24" aria-labelledby="faq-title">
        <div className={`${container} grid gap-12 lg:grid-cols-12`}>
          <Reveal className="lg:col-span-4">
            <p className={eyebrow}>Questions</p>
            <h2 id="faq-title" className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-base text-muted">
              Need something not covered here?{" "}
              <Link href="/enquiry" className={textLink}>
                Ask our team
              </Link>
            </p>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={80}>
            <Faq />
          </Reveal>
        </div>
        <FaqJsonLd />
      </section>

      {/* 11. Contact */}
      <ContactBlock />

      <CtaBand />
    </>
  );
}
