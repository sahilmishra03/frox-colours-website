/**
 * Frox Colours mark, redrawn as a vector from the original printed logo
 * (public/Logo-Temp.jpg): two rings of equal thickness and the FC monogram.
 * The F is stencil style: its top bar is detached from the stem, and both
 * bars share the same width and height.
 */
export const LOGO_COLOR = "#E0502F";

/** Shared geometry, kept in sync with public/brand/frox-logo.svg and src/app/icon.svg. */
export const LOGO_PATHS = {
  ringStroke: 4.8,
  outerRing: 44.6,
  innerRing: 37.4,
  fTop: "M27.7 35.1h22.4v6.6H27.7z",
  fBody: "M27.7 47.3h22.4v6.6H37.4v10.7h-9.7z",
  c: "M73.5 35.1H66.6A14.3 14.3 0 0 0 66.6 63.7H73.5V57.1H66.6A7.7 7.7 0 0 1 66.6 41.7H73.5Z",
};

export function LogoMark({ className = "size-9", color = LOGO_COLOR }: { className?: string; color?: string }) {
  const p = LOGO_PATHS;
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r={p.outerRing} fill="none" stroke={color} strokeWidth={p.ringStroke} />
      <circle cx="50" cy="50" r={p.innerRing} fill="none" stroke={color} strokeWidth={p.ringStroke} />
      <path fill={color} d={p.fTop} />
      <path fill={color} d={p.fBody} />
      <path fill={color} d={p.c} />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="inline-flex items-center gap-2">
      <LogoMark />
      <span className="leading-none">
        <span className="block text-base font-semibold tracking-tight text-ink">Frox Colours</span>
        <span className="mt-0.5 block text-xs text-muted">Fluorescent pigments</span>
      </span>
    </span>
  );
}
