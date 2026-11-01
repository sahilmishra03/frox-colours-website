import type { Metadata } from "next";
import { HeroWall } from "@/components/heroes/hero-wall";

export const metadata: Metadata = {
  title: "Hero option 1",
  robots: { index: false, follow: false },
};

export default function HeroOptionOne() {
  return <HeroWall />;
}
