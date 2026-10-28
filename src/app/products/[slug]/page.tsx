import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle } from "@phosphor-icons/react/ssr";
import { CategoryCard } from "@/components/category-card";
import { MockupStudio } from "@/components/mockup-studio";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/sections";
import { buttonPrimary, container, eyebrow, textLink } from "@/components/ui";
import { categories, getCategory } from "@/data/products";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: category.name,
    description: `${category.short} ${category.lines.map((l) => l.name).join(", ")}.`,
    alternates: { canonical: `/products/${category.slug}` },
  };
}

export default async function CategoryPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const others = categories.filter((c) => c.slug !== category.slug).slice(0, 4);

  return (
    <>
      <section className="border-b border-line bg-white pb-16 pt-24">
        <div className={`${container} grid gap-12 pt-12 lg:grid-cols-12 lg:items-center`}>
          <div className="lg:col-span-6">
            <Link href="/products" className={`${textLink} text-sm`}>
              <ArrowLeft size={16} aria-hidden="true" />
              All products
            </Link>
            <p className={`${eyebrow} mt-8 font-mono`}>Category {category.number}</p>
            <h1 className="hero-heading mt-3 max-w-[680px] text-5xl font-semibold tracking-tight md:text-6xl">
              {category.name}
            </h1>
            <p className="mt-6 max-w-[680px] text-lg text-muted">{category.intro}</p>
            <div className="mt-8">
              <Link href={`/enquiry?category=${category.slug}`} className={buttonPrimary}>
                Request a sample
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6">
            <MockupStudio kind={category.mockup} initialShade={category.shade} categoryName={category.name} />
          </div>
        </div>
      </section>

      <section className="py-24" aria-labelledby="lines-title">
        <div className={`${container} grid gap-12 lg:grid-cols-12`}>
          <Reveal className="lg:col-span-4">
            <p className={eyebrow}>Product lines</p>
            <h2 id="lines-title" className="mt-3 text-3xl font-semibold tracking-tight text-ink">
              What this category includes
            </h2>
          </Reveal>
          <ul className="grid gap-4 lg:col-span-8">
            {category.lines.map((line, i) => (
              <Reveal as="li" key={line.name} delay={i * 80} className="rounded-2xl border border-line bg-white p-6">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-ink">{line.name}</h3>
                    <p className="mt-2 text-base text-muted">{line.description}</p>
                  </div>
                  <Link
                    href={`/enquiry?category=${category.slug}`}
                    className={`${textLink} shrink-0 text-sm`}
                    aria-label={`Enquire about ${line.name}`}
                  >
                    Enquire
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-line bg-surface py-24" aria-labelledby="apps-title">
        <div className={container}>
          <Reveal>
            <p className={eyebrow}>Typical applications</p>
            <h2 id="apps-title" className="mt-3 text-3xl font-semibold tracking-tight text-ink">
              Where {category.name.toLowerCase()} are used
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {category.applications.map((a, i) => (
              <Reveal as="li" key={a} delay={i * 60} className="flex items-center gap-3 rounded-2xl border border-line bg-white p-6">
                <CheckCircle size={22} weight="fill" className="shrink-0 text-navy" aria-hidden="true" />
                <span className="text-base font-medium text-ink">{a}</span>
              </Reveal>
            ))}
          </ul>
          <p className="mt-8 max-w-[680px] text-sm text-muted">
            Application notes are guidance only. Share your base material and process and our team will confirm the
            right grade before you order.
          </p>
        </div>
      </section>

      <section className="py-24" aria-labelledby="more-title">
        <div className={container}>
          <Reveal>
            <h2 id="more-title" className="text-3xl font-semibold tracking-tight text-ink">
              Other categories
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((c, i) => (
              <Reveal as="li" key={c.slug} delay={i * 80}>
                <CategoryCard category={c} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title={`Need ${category.name.toLowerCase()} in your shade?`} />
    </>
  );
}
