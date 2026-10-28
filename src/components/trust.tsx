import Image from "next/image";
import {
  Buildings,
  CalendarBlank,
  ChartLineUp,
  CheckCircle,
  Globe,
  IdentificationCard,
  Receipt,
  Scales,
  ShieldCheck,
  Star,
  ThumbsUp,
  UsersThree,
} from "@phosphor-icons/react/ssr";
import { categories, productLineCount } from "@/data/products";
import { shades } from "@/data/shades";
import { businessFacts, marketplace, reviewSummary, reviews, reviewsAreSamples, type Review } from "@/data/trust";
import { Reveal } from "./reveal";
import { container, eyebrow, focusRing } from "./ui";

const FACT_ICONS: Record<string, typeof Buildings> = {
  nature: Buildings,
  legal: Scales,
  employees: UsersThree,
  turnover: ChartLineUp,
  "gst-date": CalendarBlank,
  gst: Receipt,
  iec: Globe,
};

/** Official IndiaMART logo (public/brand/indiamart-logo.png, 646 x 458). */
export function IndiaMartLogo({ className = "h-10 w-auto" }: { className?: string }) {
  return <Image src="/brand/indiamart-logo.png" alt="IndiaMART" width={646} height={458} className={className} />;
}

/**
 * IndiaMART badge: the official logo plus a status line.
 * Only shown when the matching flag in src/data/trust.ts is on.
 */
export function IndiaMartBadge({ status, compact = false }: { status: "trustseal" | "member"; compact?: boolean }) {
  const title = status === "trustseal" ? "TrustSeal verified" : "Verified member";
  const inner = (
    <span
      className={`inline-flex items-center gap-3 whitespace-nowrap rounded-xl border border-line bg-white ${compact ? "px-3 py-2" : "px-4 py-3"}`}
    >
      <IndiaMartLogo className={compact ? "h-8 w-auto" : "h-10 w-auto"} />
      <span className="text-left">
        <span className="block text-sm font-semibold text-ink">{title}</span>
        <span className="block text-xs text-muted">on IndiaMART</span>
      </span>
    </span>
  );
  return marketplace.profileUrl ? (
    <a
      href={marketplace.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`rounded-xl transition-transform duration-300 ease-brand hover:-translate-y-0.5 ${focusRing}`}
      aria-label={`Frox Colours on IndiaMART, ${title}`}
    >
      {inner}
    </a>
  ) : (
    inner
  );
}

/**
 * Achievements strip that sits directly under the hero: key numbers,
 * buyer rating and marketplace trust signals.
 */
export function TrustStrip() {
  const summary = reviewSummary();
  const stats = [
    { label: "Product categories", value: String(categories.length) },
    { label: "Product lines", value: String(productLineCount) },
    { label: "Named shades", value: String(shades.length) },
  ];
  return (
    <section className="border-y border-line bg-surface" aria-label="Company highlights">
      <div className={`${container} grid gap-6 py-8 lg:grid-cols-12 lg:items-center`}>
        <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:col-span-7">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="text-sm text-muted">{s.label}</dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-ink">{s.value}</dd>
            </div>
          ))}
          {summary.count ? (
            <div>
              <dt className="text-sm text-muted">Buyer rating</dt>
              <dd className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-semibold tracking-tight text-ink">{summary.average.toFixed(1)}</span>
                <Star size={18} weight="fill" className="text-[#F2A900]" aria-hidden="true" />
                <span className="text-sm text-muted">/5</span>
              </dd>
            </div>
          ) : null}
        </dl>
        <div className="flex flex-wrap items-center gap-3 lg:col-span-5 lg:justify-end">
          {marketplace.trustSeal ? <IndiaMartBadge status="trustseal" /> : null}
          {marketplace.paymentProtected ? (
            <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl border border-line bg-white px-4 py-3 text-sm font-semibold text-ink">
              <ShieldCheck size={20} weight="fill" className="text-navy" aria-hidden="true" />
              Payment protected
            </span>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function CompanyFacts() {
  return (
    <section className="py-24" aria-labelledby="facts-title">
      <div className={container}>
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className={eyebrow}>Company at a glance</p>
            <h2 id="facts-title" className="mt-3 max-w-[680px] text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Welcome to Frox Colours
            </h2>
          </div>
          {marketplace.trustSeal ? <IndiaMartBadge status="trustseal" compact /> : null}
        </Reveal>

        <Reveal delay={80} className="mt-12 rounded-3xl border border-line bg-white p-2">
          <dl className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {businessFacts.map((fact) => {
              const Icon = FACT_ICONS[fact.id] ?? IdentificationCard;
              return (
                <div key={fact.id} className="flex items-start gap-4 rounded-2xl bg-surface p-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-white text-navy">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-sm text-muted">{fact.label}</dt>
                    <dd className={`mt-1 truncate text-base font-semibold ${fact.value ? "font-mono text-ink" : "text-subtle"}`}>
                      {fact.value ?? "To be confirmed"}
                    </dd>
                  </div>
                </div>
              );
            })}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`} role="img">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          weight="fill"
          aria-hidden="true"
          className={i <= Math.round(rating) ? "text-[#F2A900]" : "text-line"}
        />
      ))}
    </span>
  );
}

/** Bar that grows with transform only when its Reveal parent is shown. */
function Bar({ percent }: { percent: number }) {
  return (
    <span className="relative block h-2 flex-1 overflow-hidden rounded-full bg-surface-2">
      <span
        className="rating-bar absolute inset-0 origin-left rounded-full bg-navy"
        style={{ "--v": percent / 100 } as React.CSSProperties}
      />
    </span>
  );
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function ReviewCard({ review }: { review: Review }) {
  const flags = [
    { label: "Quality", ok: review.quality },
    { label: "Response", ok: review.response },
    { label: "Delivery", ok: review.delivery },
  ];
  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-surface-2 text-base font-semibold text-navy" aria-hidden="true">
            {review.name.charAt(0)}
          </span>
          <div>
            <p className="text-sm font-semibold text-ink">{review.name}</p>
            <p className="text-xs text-muted">
              {review.city}, {review.state}
            </p>
          </div>
        </div>
        <time dateTime={review.date} className="shrink-0 text-xs text-muted">
          {formatDate(review.date)}
        </time>
      </div>
      <div className="mt-4">
        <Stars rating={review.rating} />
      </div>
      <p className="mt-3 flex-1 text-sm text-ink">{review.text}</p>
      <p className="mt-4 text-xs text-muted">
        Product: <span className="font-semibold text-ink">{review.product}</span>
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {flags.map((f) => (
          <li
            key={f.label}
            className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ${
              f.ok ? "bg-surface text-ink" : "bg-surface text-subtle line-through"
            }`}
          >
            {f.ok ? <ThumbsUp size={12} weight="fill" className="text-navy" aria-hidden="true" /> : null}
            {f.label}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function RatingsReviews() {
  const summary = reviewSummary();
  if (summary.count === 0) return null;

  return (
    <section className="border-y border-line bg-surface py-24" aria-labelledby="reviews-title">
      <div className={container}>
        <Reveal>
          <p className={eyebrow}>Ratings and reviews</p>
          <h2 id="reviews-title" className="mt-3 max-w-[680px] text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            What buyers say about our colour
          </h2>
          {reviewsAreSamples ? (
            <p className="mt-4 inline-flex rounded-lg border border-line bg-white px-3 py-2 text-sm text-muted">
              Sample reviews for layout. Replace with verified buyer reviews before launch.
            </p>
          ) : null}
        </Reveal>

        <Reveal delay={80} className="mt-12 grid gap-4 lg:grid-cols-12">
          <div className="rounded-2xl border border-line bg-white p-6 lg:col-span-3">
            <p className="text-5xl font-semibold tracking-tight text-ink">
              {summary.average.toFixed(1)}
              <span className="text-2xl text-muted">/5</span>
            </p>
            <div className="mt-3">
              <Stars rating={summary.average} size={20} />
            </div>
            <p className="mt-3 text-sm text-muted">Reviewed by {summary.count} buyers</p>
          </div>

          <div className="rounded-2xl border border-line bg-white p-6 lg:col-span-5">
            <h3 className="text-sm font-semibold text-ink">Rating breakdown</h3>
            <ul className="mt-4 space-y-3">
              {summary.distribution.map((d) => (
                <li key={d.star} className="flex items-center gap-3 text-sm">
                  <span className="inline-flex w-8 items-center gap-1 text-ink">
                    {d.star}
                    <Star size={12} weight="fill" className="text-[#F2A900]" aria-hidden="true" />
                  </span>
                  <Bar percent={d.percent} />
                  <span className="w-10 text-right font-mono text-xs text-muted">{d.percent}%</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-line bg-white p-6 lg:col-span-4">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
              <ThumbsUp size={18} weight="fill" className="text-navy" aria-hidden="true" />
              Buyer satisfaction
            </h3>
            <ul className="mt-4 space-y-3">
              {summary.satisfaction.map((s) => (
                <li key={s.label} className="flex items-center gap-3 text-sm">
                  <span className="w-20 text-ink">{s.label}</span>
                  <Bar percent={s.percent} />
                  <span className="w-10 text-right font-mono text-xs text-muted">{s.percent}%</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <h3 className="mt-16 text-xl font-semibold tracking-tight text-ink">Most relevant reviews</h3>
        <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal as="li" key={r.name} delay={(i % 3) * 80}>
              <ReviewCard review={r} />
            </Reveal>
          ))}
        </ul>

        {reviewsAreSamples ? null : (
          <p className="mt-6 flex items-center gap-2 text-sm text-muted">
            <CheckCircle size={16} className="text-navy" aria-hidden="true" />
            Reviews come from buyers who placed an order with Frox Colours.
          </p>
        )}
      </div>
    </section>
  );
}
