import type { Metadata } from "next";
import { HeroCollage } from "@/components/heroes/hero-collage";

export const metadata: Metadata = {
  title: "Hero option 2",
  robots: { index: false, follow: false },
};

export default function HeroOptionTwo() {
  return <HeroCollage />;
}
