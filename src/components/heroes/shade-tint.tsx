"use client";

import { createContext, useContext, useEffect, useState, type CSSProperties, type ReactNode } from "react";

export type TintShade = { id: string; name: string; hex: string };

type Ctx = { shades: TintShade[]; index: number; pick: (i: number) => void };
const TintContext = createContext<Ctx | null>(null);

const INTERVAL = 2800;

/**
 * Holds the active shade and exposes it to children as the CSS variable
 * --tint. Cycles through the shades on its own until the visitor picks one,
 * and stays still for reduced motion.
 */
export function TintRoot({
  shades,
  className,
  children,
}: {
  shades: TintShade[];
  className?: string;
  children: ReactNode;
}) {
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % shades.length), INTERVAL);
    return () => window.clearInterval(t);
  }, [auto, shades.length]);

  const pick = (i: number) => {
    setAuto(false);
    setIndex(i);
  };

  return (
    <TintContext.Provider value={{ shades, index, pick }}>
      <section className={className} style={{ "--tint": shades[index].hex } as CSSProperties}>
        {children}
      </section>
    </TintContext.Provider>
  );
}

/** Row of shade chips. Hovering, focusing or tapping a chip sets the tint. */
export function TintSwatches() {
  const ctx = useContext(TintContext);
  if (!ctx) return null;
  const { shades, index, pick } = ctx;

  return (
    <div className="flex flex-col items-center gap-3">
      <div role="group" aria-label="Preview a shade" className="flex items-center gap-2.5">
        {shades.map((s, i) => {
          const active = i === index;
          return (
            <button
              key={s.id}
              type="button"
              aria-label={s.name}
              aria-pressed={active}
              onMouseEnter={() => pick(i)}
              onFocus={() => pick(i)}
              onClick={() => pick(i)}
              className={`relative size-8 rounded-full transition-transform duration-300 ease-brand hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
                active ? "scale-110" : ""
              }`}
              style={{ backgroundColor: s.hex, boxShadow: active ? `0 0 0 3px #0d1f34, 0 0 0 5px ${s.hex}, 0 0 24px ${s.hex}` : undefined }}
            />
          );
        })}
      </div>
      <p className="h-5 text-sm font-medium text-white/75" aria-live="polite">
        {shades[index].name}
      </p>
    </div>
  );
}
