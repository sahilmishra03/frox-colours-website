import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { getShade } from "@/data/shades";
import type { Category } from "@/data/products";
import { ProductMockup } from "./mockups/product-mockups";
import { focusRing } from "./ui";

export function CategoryCard({ category }: { category: Category }) {
  const shade = getShade(category.shade);
  return (
    <Link
      href={`/products/${category.slug}`}
      className={`group flex h-full flex-col rounded-2xl border border-line bg-white p-2 transition-[border-color,transform] duration-500 ease-brand hover:-translate-y-1 hover:border-ink/20 active:scale-[0.98] ${focusRing}`}
    >
      {/* 16px outer radius minus 8px gap gives 8px inside (skill B3). */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-surface">
        <span
          className="absolute left-3 top-3 rounded-md bg-white px-2 py-1 font-mono text-xs text-muted"
          aria-hidden="true"
        >
          {category.number}
        </span>
        <ProductMockup
          kind={category.mockup}
          color={shade.hex}
          label={shade.name.toUpperCase()}
          className="absolute inset-x-0 bottom-0 mx-auto w-4/5 transition-transform duration-700 ease-brand group-hover:-translate-y-2 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col px-3 pb-3 pt-4">
        <h3 className="text-lg font-semibold tracking-tight text-ink">{category.name}</h3>
        <p className="mt-2 flex-1 text-sm text-muted">{category.short}</p>
        <p className="mt-4 flex items-center justify-between text-sm">
          <span className="text-subtle">
            {category.lines.length} {category.lines.length === 1 ? "product line" : "product lines"}
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-navy">
            View range
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-500 ease-brand group-hover:translate-x-1"
            />
          </span>
        </p>
      </div>
    </Link>
  );
}
