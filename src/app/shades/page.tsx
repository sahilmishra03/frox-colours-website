import type { Metadata } from "next";
import { CtaBand, PageHeader } from "@/components/sections";
import { ShadeExplorer } from "@/components/shade-explorer";
import { container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Shade card",
  description:
    "Explore the 25 named Frox Colours daylight fluorescent shades, from Glow Green to Magenta (B). View each shade in daylight and under UV light and see it on our packs.",
  alternates: { canonical: "/shades" },
};

export default function ShadesPage() {
  return (
    <>
      <PageHeader
        kicker="Shade card"
        title={
          <>
            25 named shades,
            <br />
            shown in daylight and UV
          </>
        }
        text="Filter by colour family, switch the viewing light, and see any shade on a jar, sack, ink tub or paint tin. Approve final colour against a physical sample."
      />

      <section className="py-16" aria-label="Shade explorer">
        <div className={container}>
          <ShadeExplorer />
        </div>
      </section>

      <CtaBand title="Found your shade? Ask for a sample" />
    </>
  );
}
