import type { Metadata } from "next";
import { HeroCollage } from "@/components/heroes/hero-collage";
import { HeroWall } from "@/components/heroes/hero-wall";

export const metadata: Metadata = {
  title: "Hero options",
  description: "Hero designs for the Frox Colours home page, for review.",
  robots: { index: false, follow: false },
};

function OptionLabel({ n, name }: { n: number; name: string }) {
  return (
    <div className="border-y border-line bg-surface">
      <p className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-4 text-sm text-muted">
        <span className="rounded-full bg-navy px-3 py-1 font-semibold text-white">Option {n}</span>
        {name}
      </p>
    </div>
  );
}

export default function HeroOptionsPage() {
  return (
    <>
      <HeroWall />
      <OptionLabel n={1} name="Moving shade-card wall" />
      <HeroCollage titleAs="h2" />
      <OptionLabel n={2} name="Factory photo backdrop with interactive shades" />
    </>
  );
}
