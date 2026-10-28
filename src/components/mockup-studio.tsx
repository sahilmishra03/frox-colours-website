"use client";

import { useState } from "react";
import { shades } from "@/data/shades";
import type { MockupKind } from "@/data/products";
import { PowderMound, ProductMockup } from "./mockups/product-mockups";
import { focusRing } from "./ui";

/**
 * Product page studio: shows the category pack and lets the visitor recolour
 * it with any of the 25 shades.
 */
export function MockupStudio({
  kind,
  initialShade,
  categoryName,
}: {
  kind: MockupKind;
  initialShade: string;
  categoryName: string;
}) {
  const [id, setId] = useState(initialShade);
  const shade = shades.find((s) => s.id === id) ?? shades[0];

  return (
    <div className="rounded-3xl border border-line bg-white p-2">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-surface">
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-surface-2" aria-hidden="true" />
        <div className="absolute left-4 top-4 rounded-lg bg-white/90 px-3 py-2 text-xs font-medium text-muted">
          Studio preview
        </div>
        <PowderMound key={`m-${shade.id}`} color={shade.hex} className="absolute -left-6 bottom-4 w-2/5 animate-pop-in" />
        <ProductMockup
          key={`p-${shade.id}`}
          kind={kind}
          color={shade.hex}
          label={shade.name.toUpperCase()}
          title={`${categoryName} pack in ${shade.name}`}
          className="absolute bottom-4 left-1/2 w-3/4 -translate-x-1/2 animate-pop-in [animation-delay:80ms]"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-semibold text-ink" aria-live="polite">
            {shade.name} <span className="font-mono text-xs font-normal text-muted">{shade.hex}</span>
          </p>
          <p className="text-xs text-muted">Pick a shade to recolour the pack</p>
        </div>
        <div className="mt-4 grid grid-cols-9 gap-1 sm:grid-cols-13" role="group" aria-label="Recolour the pack">
          {shades.map((s) => {
            const active = s.id === shade.id;
            return (
              <button
                key={s.id}
                type="button"
                aria-label={s.name}
                aria-pressed={active}
                onClick={() => setId(s.id)}
                className={`aspect-square rounded-md transition-transform duration-300 ease-brand hover:scale-110 active:scale-[0.98] ${focusRing} ${
                  active ? "ring-2 ring-navy ring-offset-2" : ""
                }`}
                style={{ backgroundColor: s.hex }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
