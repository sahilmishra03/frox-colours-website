/** Shared class strings so every interactive element gets the full state set (skill B9). */

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy";

export const buttonPrimary = [
  "inline-flex items-center justify-center gap-2 rounded-lg bg-navy px-3 py-2",
  "text-base font-semibold text-white",
  "transition-[background-color,transform] duration-300 ease-brand",
  "hover:bg-navy-deep active:scale-[0.98]",
  focusRing,
].join(" ");

export const buttonSecondary = [
  "inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-white px-3 py-2",
  "text-base font-semibold text-ink",
  "transition-[background-color,border-color,transform] duration-300 ease-brand",
  "hover:border-ink/20 hover:bg-surface active:scale-[0.98]",
  focusRing,
].join(" ");

export const buttonSmall = [
  "inline-flex items-center justify-center gap-2 rounded-lg bg-navy px-3 py-2",
  "text-sm font-semibold text-white",
  "transition-[background-color,transform] duration-300 ease-brand",
  "hover:bg-navy-deep active:scale-[0.98]",
  focusRing,
].join(" ");

export const textLink = [
  "inline-flex items-center gap-2 rounded-sm font-semibold text-navy",
  "transition-opacity duration-300 ease-brand hover:opacity-70",
  focusRing,
].join(" ");

export const eyebrow = "text-sm font-medium text-muted";

export const container = "mx-auto w-full max-w-6xl px-6";

export { focusRing };
