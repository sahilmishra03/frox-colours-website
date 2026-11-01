import Link from "next/link";
import { ArrowRight, CaretDown } from "@phosphor-icons/react/ssr";
import { HeroBackdrop } from "@/components/hero-backdrop";
import { IndiaMartLogo } from "@/components/trust";
import { getShade } from "@/data/shades";
import { marketplace } from "@/data/trust";
import { heroActions, heroBadges, heroShadeIds, heroText, heroTitle } from "./hero-data";

/**
 * Option 1: full-screen, centred hero over a drifting wall of Frox shade cards.
 */
export function HeroWall({ titleAs: Title = "h1" }: { titleAs?: "h1" | "h2" }) {
  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden bg-navy-deep">
      <HeroBackdrop />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 pb-28 pt-36 text-center">
        <p className="inline-flex animate-fade-up items-center gap-3 rounded-full border border-white/20 bg-white/10 py-1.5 pl-2 pr-4 text-sm font-medium text-white/90 backdrop-blur-md">
          <span className="flex -space-x-1.5" aria-hidden="true">
            {heroShadeIds.slice(0, 5).map((id) => (
              <span
                key={id}
                className="size-5 rounded-full ring-2 ring-navy-deep"
                style={{ backgroundColor: getShade(id).hex }}
              />
            ))}
          </span>
          Pigments · Dyes · Inks · Coatings
        </p>

        <Title className="mt-7 animate-fade-up text-4xl font-bold leading-[1.08] tracking-tight text-white [animation-delay:80ms] md:text-6xl lg:text-7xl">
          {heroTitle.lead}
          <span className="block text-accent-bright">{heroTitle.tail}</span>
        </Title>
        <p className="mt-6 max-w-2xl animate-fade-up text-lg text-white/80 [animation-delay:160ms] md:text-xl">
          {heroText}
        </p>

        <div className="mt-10 flex animate-fade-up flex-wrap items-center justify-center gap-3 [animation-delay:240ms]">
          {heroActions.map((a, i) => (
            <Link
              key={a.href}
              href={a.href}
              className={`group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-base font-semibold transition-[background-color,transform,box-shadow] duration-300 ease-brand hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                i === 0
                  ? "bg-accent text-white shadow-lg shadow-accent/30 hover:bg-accent-deep"
                  : "border border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
              }`}
            >
              {a.label}
              {i === 0 ? (
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className="transition-transform duration-300 ease-brand group-hover:translate-x-0.5"
                />
              ) : null}
            </Link>
          ))}
        </div>

        <ul className="mt-14 flex animate-fade-up flex-wrap items-stretch justify-center divide-white/15 overflow-hidden rounded-2xl border border-white/15 bg-white/[0.07] backdrop-blur-md [animation-delay:320ms] sm:divide-x">
          {marketplace.trustSeal ? (
            <li className="flex items-center gap-3 px-5 py-3">
              <span className="grid size-11 place-items-center rounded-lg bg-white p-1">
                <IndiaMartLogo className="h-8 w-auto" />
              </span>
              <span className="text-left">
                <span className="block text-sm font-bold leading-tight text-white">TrustSeal Verified</span>
                <span className="block text-xs leading-tight text-white/70">IndiaMART supplier</span>
              </span>
            </li>
          ) : null}
          {heroBadges.map(({ Icon, title, text }) => (
            <li key={title} className="flex items-center gap-3 px-5 py-3">
              <span className="grid size-11 place-items-center rounded-lg bg-white/10 text-white">
                <Icon size={24} weight="duotone" aria-hidden="true" />
              </span>
              <span className="text-left">
                <span className="block text-sm font-bold leading-tight text-white">{title}</span>
                <span className="block text-xs leading-tight text-white/70">{text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <CaretDown
        size={22}
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-bounce text-white/60"
      />
    </section>
  );
}
