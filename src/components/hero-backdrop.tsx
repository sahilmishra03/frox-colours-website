import Image from "next/image";
import { shades } from "@/data/shades";

const COLUMNS = 6;

/**
 * Full-bleed backdrop for the hero: a tilted wall of Frox shade cards
 * (public/Frox_Colours_Image_Kit) drifting slowly, under a navy overlay.
 * Decorative only.
 */
export function HeroBackdrop() {
  const cols = Array.from({ length: COLUMNS }, (_, c) => shades.filter((_, i) => i % COLUMNS === c));

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -inset-[20%] flex rotate-[-10deg] justify-center gap-5">
        {cols.map((col, c) => (
          <div key={c} className="w-[220px] shrink-0 overflow-hidden">
            <div
              className="wall-col flex flex-col gap-5"
              data-dir={c % 2 ? "down" : "up"}
              style={{ animationDuration: `${70 + c * 8}s` }}
            >
              {[...col, ...col, ...col, ...col].map((s, i) => (
                <Image
                  key={`${s.id}-${i}`}
                  src={s.image}
                  alt=""
                  width={1200}
                  height={1200}
                  sizes="220px"
                  className="w-full rounded-2xl"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Overlay keeps text readable while the colours glow through */}
      <div className="absolute inset-0 bg-navy-deep/75" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(13_31_52/0.35),rgb(13_31_52/0.92)_72%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-deep to-transparent" />
    </div>
  );
}
