import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { PowderMound } from "@/components/mockups/product-mockups";
import { buttonPrimary, buttonSecondary, container, eyebrow } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="pb-24 pt-24">
      <div className={`${container} grid gap-12 pt-12 lg:grid-cols-12 lg:items-center`}>
        <div className="lg:col-span-6">
          <p className={`${eyebrow} font-mono`}>Error 404</p>
          <h1 className="hero-heading mt-3 max-w-[680px] text-5xl font-semibold tracking-tight md:text-6xl">
            This shade is
            <br />
            not on our card
          </h1>
          <p className="mt-6 max-w-[680px] text-lg text-muted">
            The page you asked for does not exist or has moved. Try the product range or the shade card instead.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/" className={buttonPrimary}>
              Back to home
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/products" className={buttonSecondary}>
              View products
            </Link>
          </div>
        </div>
        <div className="lg:col-span-6" aria-hidden="true">
          <div className="rounded-3xl border border-line bg-white p-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface">
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-surface-2" />
              <PowderMound color="#D9D9D5" className="absolute bottom-4 left-1/2 w-3/5 -translate-x-1/2 animate-pop-in" />
              <p className="absolute inset-x-0 top-1/4 text-center font-mono text-6xl font-semibold text-ink/10">404</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
