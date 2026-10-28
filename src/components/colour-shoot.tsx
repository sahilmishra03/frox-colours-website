"use client";

import { useEffect, useState } from "react";
import { heroShadeIds, getShade, shades } from "@/data/shades";
import { InkTub, PigmentJar, PigmentSack } from "./mockups/product-mockups";
import { focusRing } from "./ui";

const ROTATE_MS = 4200;

/**
 * Hero product shot: the jar, 25 kg sack and ink tub on one studio set,
 * all in a single shade at a time so the products stay the focus.
 * The shade rotates slowly, pauses on hover or focus, and never auto rotates
 * under reduced motion.
 */
export function ColourShoot() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const shade = getShade(heroShadeIds[index]);
  const number = shades.findIndex((s) => s.id === shade.id) + 1;

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % heroShadeIds.length), ROTATE_MS);
    return () => window.clearTimeout(t);
  }, [index, paused]);

  const label = shade.name.toUpperCase();

  return (
    <figure
      className="group relative rounded-3xl border border-line bg-white p-2"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Outer 24px radius minus 8px gap gives 16px inside (skill B3). */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface">
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-surface-2" aria-hidden="true" />
        <div className="absolute left-4 top-4 rounded-lg bg-white px-3 py-2 text-xs font-medium text-muted">
          Product range
        </div>

        <PigmentSack
          key={`s-${shade.id}`}
          color={shade.hex}
          label={label}
          title={`Frox Colours 25 kg pigment sack in ${shade.name}`}
          className="absolute bottom-6 left-0 w-[42%] animate-pop-in transition-transform duration-700 ease-brand group-hover:-translate-x-1"
        />
        <InkTub
          key={`t-${shade.id}`}
          color={shade.hex}
          label={label}
          title={`Frox Colours printing ink tub in ${shade.name}`}
          className="absolute bottom-4 right-0 w-[40%] animate-pop-in [animation-delay:160ms] transition-transform duration-700 ease-brand group-hover:translate-x-1"
        />
        <PigmentJar
          key={`j-${shade.id}`}
          color={shade.hex}
          label={label}
          title={`Frox Colours pigment jar in ${shade.name}`}
          className="absolute bottom-2 left-1/2 w-[46%] -translate-x-1/2 animate-pop-in [animation-delay:80ms]"
        />
      </div>

      <figcaption className="flex flex-wrap items-center justify-between gap-4 px-4 py-4">
        <div aria-live="polite">
          <p className="text-sm font-semibold text-ink">Daylight fluorescent pigment, {shade.name}</p>
          <p className="text-xs text-muted">
            Shade {String(number).padStart(2, "0")} of {shades.length} · Jar, 25 kg sack and ink tub
          </p>
        </div>
        <div className="flex items-center gap-1" role="group" aria-label="Choose a shade for the product shot">
          {heroShadeIds.map((id, i) => {
            const s = getShade(id);
            const current = i === index;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show products in ${s.name}`}
                aria-pressed={current}
                className={`grid size-8 place-items-center rounded-lg transition-[background-color,transform] duration-300 ease-brand hover:bg-surface active:scale-[0.98] ${focusRing}`}
              >
                <span
                  className={`size-3 rounded-full transition-transform duration-500 ease-brand ${current ? "scale-125 ring-2 ring-navy ring-offset-2" : ""}`}
                  style={{ backgroundColor: s.hex }}
                />
              </button>
            );
          })}
        </div>
      </figcaption>
    </figure>
  );
}
