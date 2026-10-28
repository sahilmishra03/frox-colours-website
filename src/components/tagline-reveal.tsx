"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Large tagline whose words move from muted to full colour one at a time,
 * in reading order, as the section scrolls through a trigger line (skill B11).
 * Scroll work is throttled through requestAnimationFrame and stops once every
 * word is active.
 */
export function TaglineReveal({ lines }: { lines: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = lines.map((line) => line.split(" "));
  const total = words.reduce((n, w) => n + w.length, 0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion: CSS shows every word at full colour, so skip tracking.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let current = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Starts when the block's top reaches 80% of the viewport and finishes
      // when its bottom reaches 45%.
      const start = vh * 0.8;
      const end = vh * 0.45;
      const progress = (start - rect.top) / (start - end + rect.height);
      const next = Math.max(0, Math.min(total, Math.floor(progress * (total + 1))));
      if (next > current) {
        current = next;
        setActive(next);
      }
      if (current >= total) {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [total]);

  let index = 0;
  return (
    <p
      ref={ref}
      className="max-w-[680px] text-4xl font-semibold tracking-tight text-ink md:text-5xl"
      aria-label={lines.join(" ")}
    >
      {words.map((lineWords, li) => (
        <span key={li} className="block" aria-hidden="true">
          {lineWords.map((word, wi) => {
            const i = index++;
            return (
              <span key={wi} className="tagline-word" data-active={i < active}>
                {word}
                {wi < lineWords.length - 1 ? " " : ""}
              </span>
            );
          })}
        </span>
      ))}
    </p>
  );
}
