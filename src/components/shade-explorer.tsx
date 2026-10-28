"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, Copy, DownloadSimple, Lightbulb, Sun } from "@phosphor-icons/react";
import { shadeFamilies, shades, type Shade, type ShadeFamily } from "@/data/shades";
import type { MockupKind } from "@/data/products";
import { PowderMound, ProductMockup } from "./mockups/product-mockups";
import { buttonPrimary, buttonSecondary, focusRing } from "./ui";

type View = "daylight" | "uv";

function ViewToggle({ view, onChange }: { view: View; onChange: (v: View) => void }) {
  const options: { id: View; label: string; Icon: typeof Sun }[] = [
    { id: "daylight", label: "Daylight", Icon: Sun },
    { id: "uv", label: "UV light", Icon: Lightbulb },
  ];
  return (
    <div className="inline-flex rounded-xl border border-line bg-white p-1" role="group" aria-label="Viewing light">
      {options.map(({ id, label, Icon }) => {
        const active = view === id;
        return (
          <button
            key={id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(id)}
            className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-[background-color,color,transform] duration-300 ease-brand active:scale-[0.98] ${focusRing} ${
              active ? "bg-navy text-white" : "text-muted hover:bg-surface hover:text-ink"
            }`}
          >
            <Icon size={16} weight={active ? "fill" : "regular"} aria-hidden="true" />
            {label}
          </button>
        );
      })}
    </div>
  );
}

function Swatch({ shade, uv }: { shade: Shade; uv: boolean }) {
  return (
    <span className="relative block aspect-[4/3] w-full">
      <span
        className={`absolute inset-2 rounded-lg blur-xl transition-opacity duration-500 ease-brand ${uv ? "opacity-80" : "opacity-0"}`}
        style={{ backgroundColor: shade.hex }}
        aria-hidden="true"
      />
      <span className="absolute inset-0 rounded-lg" style={{ backgroundColor: shade.hex }} />
    </span>
  );
}

/** Compact 25 tile board used on the home page. */
export function ShadeBoard() {
  const [view, setView] = useState<View>("daylight");
  const uv = view === "uv";
  return (
    <div className="relative overflow-hidden rounded-3xl border border-line p-6 md:p-8">
      <div className="absolute inset-0 bg-surface" aria-hidden="true" />
      <div
        className={`absolute inset-0 bg-uv transition-opacity duration-500 ease-brand ${uv ? "opacity-100" : "opacity-0"}`}
        aria-hidden="true"
      />
      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className={`text-sm transition-colors duration-300 ease-brand ${uv ? "text-white/70" : "text-muted"}`}>
            {uv ? "Illustrated view of how the shades read under UV light." : "Digital previews of the 25 named shades."}
          </p>
          <ViewToggle view={view} onChange={setView} />
        </div>
        <ul className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-5">
          {shades.map((s) => (
            <li key={s.id}>
              <Link
                href={`/shades#${s.id}`}
                className={`group/tile block rounded-xl p-1 transition-transform duration-500 ease-brand hover:-translate-y-1 active:scale-[0.98] ${focusRing}`}
              >
                <Swatch shade={s} uv={uv} />
                <span
                  className={`mt-2 block truncate px-1 text-xs font-medium transition-colors duration-300 ease-brand ${uv ? "text-white" : "text-ink"}`}
                >
                  {s.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const PACKS: { id: MockupKind; label: string }[] = [
  { id: "jar", label: "Jar" },
  { id: "sack", label: "25 kg sack" },
  { id: "tub", label: "Ink tub" },
  { id: "tin", label: "Paint tin" },
];

function CopyHex({ hex }: { hex: string }) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");

  useEffect(() => {
    if (state === "idle") return;
    const t = window.setTimeout(() => setState("idle"), 2400);
    return () => window.clearTimeout(t);
  }, [state]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(hex);
      setState("copied");
    } catch {
      setState("error");
    }
  }

  return (
    <div>
      <button type="button" onClick={copy} className={buttonSecondary} aria-describedby="copy-status">
        {state === "copied" ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
        <span className="font-mono">{hex}</span>
      </button>
      <p id="copy-status" className="mt-2 min-h-5 text-sm text-muted" aria-live="polite">
        {state === "copied" ? `${hex} copied to clipboard.` : null}
        {state === "error" ? "Copy failed. Select the code and copy it manually." : null}
      </p>
    </div>
  );
}

/** Full shade card: filters, daylight and UV views, and a mockup studio per shade. */
export function ShadeExplorer() {
  const [family, setFamily] = useState<ShadeFamily | "all">("all");
  const [view, setView] = useState<View>("daylight");
  const [selectedId, setSelectedId] = useState<string>(shades[0].id);
  const [pack, setPack] = useState<MockupKind>("jar");
  const uv = view === "uv";

  // Deep link support: /shades#glow-green
  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.slice(1);
      if (shades.some((s) => s.id === id)) {
        setSelectedId(id);
        setFamily("all");
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const visible = useMemo(
    () => (family === "all" ? shades : shades.filter((s) => s.family === family)),
    [family],
  );
  const selected = shades.find((s) => s.id === selectedId) ?? shades[0];
  const number = shades.findIndex((s) => s.id === selected.id) + 1;

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by colour family">
            {shadeFamilies.map((f) => {
              const active = family === f.id;
              const count = f.id === "all" ? shades.length : shades.filter((s) => s.family === f.id).length;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFamily(f.id)}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition-[background-color,border-color,color,transform] duration-300 ease-brand active:scale-[0.98] ${focusRing} ${
                    active ? "border-navy bg-navy text-white" : "border-line bg-white text-muted hover:border-ink/20 hover:text-ink"
                  }`}
                >
                  {f.label} <span className={active ? "text-white/70" : "text-subtle"}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative mt-6 overflow-hidden rounded-3xl border border-line p-4 md:p-6">
          <div className="absolute inset-0 bg-surface" aria-hidden="true" />
          <div
            className={`absolute inset-0 bg-uv transition-opacity duration-500 ease-brand ${uv ? "opacity-100" : "opacity-0"}`}
            aria-hidden="true"
          />
          <div className="relative">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className={`text-sm transition-colors duration-300 ease-brand ${uv ? "text-white/70" : "text-muted"}`}>
                Showing {visible.length} of {shades.length} shades
              </p>
              <ViewToggle view={view} onChange={setView} />
            </div>

            {visible.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-line bg-white p-8 text-center">
                <p className="text-base font-semibold text-ink">No shades in this family yet</p>
                <p className="mt-2 text-sm text-muted">Choose another family or view all 25 shades.</p>
              </div>
            ) : (
              <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                {visible.map((s, i) => {
                  const active = s.id === selected.id;
                  return (
                    <li key={s.id} id={s.id} className="animate-fade-up" style={{ animationDelay: `${Math.min(i * 30, 400)}ms` }}>
                      <button
                        type="button"
                        onClick={() => setSelectedId(s.id)}
                        aria-pressed={active}
                        className={`block w-full rounded-2xl border p-2 text-left transition-[background-color,border-color,transform] duration-500 ease-brand hover:-translate-y-1 active:scale-[0.98] ${focusRing} ${
                          uv
                            ? active
                              ? "border-white/60 bg-white/10"
                              : "border-white/10 bg-white/5"
                            : active
                              ? "border-navy bg-white"
                              : "border-line bg-white hover:border-ink/20"
                        }`}
                      >
                        <Swatch shade={s} uv={uv} />
                        <span className="block px-2 pb-1 pt-3">
                          <span className={`block truncate text-sm font-semibold transition-colors duration-300 ease-brand ${uv ? "text-white" : "text-ink"}`}>
                            {s.name}
                          </span>
                          <span className={`block font-mono text-xs transition-colors duration-300 ease-brand ${uv ? "text-white/60" : "text-muted"}`}>
                            {s.hex}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Detail panel with a mockup studio for the selected shade. */}
      <aside className="lg:col-span-5" aria-label="Selected shade">
        <div className="rounded-3xl border border-line bg-white p-2 lg:sticky lg:top-24">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface">
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-surface-2" aria-hidden="true" />
            <PowderMound key={`m-${selected.id}`} color={selected.hex} className="absolute -left-4 bottom-2 w-1/2 animate-pop-in" />
            <ProductMockup
              key={`${pack}-${selected.id}`}
              kind={pack}
              color={selected.hex}
              label={selected.name.toUpperCase()}
              title={`${selected.name} shown in a Frox Colours ${pack}`}
              className="absolute bottom-2 right-4 w-3/5 animate-pop-in [animation-delay:80ms]"
            />
          </div>

          <div className="p-4 md:p-6">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Show the shade in a pack">
              {PACKS.map((p) => {
                const active = p.id === pack;
                return (
                  <button
                    key={p.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setPack(p.id)}
                    className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-[background-color,border-color,color,transform] duration-300 ease-brand active:scale-[0.98] ${focusRing} ${
                      active ? "border-navy bg-navy text-white" : "border-line text-muted hover:border-ink/20 hover:text-ink"
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>

            <p className="mt-6 font-mono text-xs text-muted">Shade {String(number).padStart(2, "0")} of 25</p>
            <h2 className="mt-1 text-3xl font-semibold tracking-tight text-ink">{selected.name}</h2>
            <p className="mt-2 text-sm text-muted">Daylight fluorescent pigment</p>

            <div className="mt-6">
              <CopyHex hex={selected.hex} />
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Link href={`/enquiry?shade=${selected.id}`} className={buttonPrimary}>
                Request this shade
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <a href={selected.image} download className={buttonSecondary}>
                <DownloadSimple size={18} aria-hidden="true" />
                Shade card image
              </a>
            </div>

            <p className="mt-6 rounded-xl bg-surface p-4 text-xs text-muted">
              Screen colour is an approximation. Confirm the shade against a physical sample before production.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
