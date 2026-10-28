import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { LogoMark } from "./logo";
import { Reveal } from "./reveal";
import { container, eyebrow } from "./ui";

export function SectionHeading({
  kicker,
  title,
  text,
  align = "left",
}: {
  kicker: string;
  title: string;
  text?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-[680px] text-center" : "max-w-[680px]"}>
      <p className={eyebrow}>{kicker}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">{title}</h2>
      {text ? <p className="mt-4 text-lg text-muted">{text}</p> : null}
    </div>
  );
}

export function PageHeader({
  kicker,
  title,
  text,
  children,
}: {
  kicker: string;
  title: React.ReactNode;
  text?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-line bg-white pb-16 pt-24">
      <div className={`${container} pt-12`}>
        <Reveal>
          <p className={eyebrow}>{kicker}</p>
          <h1 className="hero-heading mt-3 max-w-[680px] text-5xl font-semibold tracking-tight md:text-6xl">{title}</h1>
          {text ? <p className="mt-6 max-w-[680px] text-lg text-muted">{text}</p> : null}
          {children}
        </Reveal>
      </div>
    </section>
  );
}

export function CtaBand({
  title = "Start with a sample in your shade",
  text = "Tell us the product, shade and quantity you need. We reply with a sample plan and a quotation for your approval.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="py-24">
      <div className={container}>
        <Reveal className="rounded-3xl bg-navy p-8 md:p-16">
          <div className="grid gap-12 md:grid-cols-2 md:items-end">
            <div>
              <h2 className="max-w-[680px] text-3xl font-semibold tracking-tight text-white md:text-5xl">{title}</h2>
              <p className="mt-6 max-w-md text-lg text-white/70">{text}</p>
              <Link
                href="/enquiry"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-base font-semibold text-navy transition-[background-color,transform] duration-300 ease-brand hover:bg-surface active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Request a sample
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <div className="flex md:justify-end" aria-hidden="true">
              <LogoMark className="size-32 opacity-90 md:size-40" color="#FFFFFF" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
