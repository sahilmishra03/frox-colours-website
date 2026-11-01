"use client";

import { useEffect, useState } from "react";
import { WhatsappLogo, X } from "@phosphor-icons/react";
import { site } from "@/data/site";

const BUBBLE_KEY = "frox-wa-bubble-closed";
const message = "Hello Frox Colours, I would like to know more about your products.";

/**
 * Floating WhatsApp button, bottom right. A small "Need help?" card appears
 * after a few seconds and can be closed; the button itself stays.
 */
export function WhatsAppHelp() {
  const [bubble, setBubble] = useState(false);
  const digits = site.contact.phoneHref.replace(/\D/g, "");
  const href = `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    const t = window.setTimeout(() => {
      if (sessionStorage.getItem(BUBBLE_KEY) !== "1") setBubble(true);
    }, 3000);
    return () => window.clearTimeout(t);
  }, []);

  const closeBubble = () => {
    setBubble(false);
    sessionStorage.setItem(BUBBLE_KEY, "1");
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <div
        className={`relative w-64 rounded-2xl border border-navy/10 bg-white/90 p-4 pr-9 shadow-xl shadow-navy/15 backdrop-blur-xl transition-[opacity,transform] duration-500 ease-brand ${
          bubble ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
        }`}
        aria-hidden={!bubble}
        inert={!bubble}
      >
        <p className="text-sm font-bold text-navy">Need help?</p>
        <p className="mt-1 text-sm text-muted">Chat with our team about shades, grades and pricing.</p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#128C4B] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
        >
          Start chat
        </a>
        <button
          type="button"
          onClick={closeBubble}
          aria-label="Close help message"
          className="absolute right-2 top-2 grid size-7 place-items-center rounded-full text-subtle transition-colors duration-300 ease-brand hover:bg-surface hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
        >
          <X size={14} weight="bold" aria-hidden="true" />
        </button>
        {/* Pointer towards the button */}
        <span
          aria-hidden="true"
          className="absolute -bottom-1.5 right-6 size-3 rotate-45 border-b border-r border-navy/10 bg-white"
        />
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Frox Colours on WhatsApp"
        className="group relative grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 transition-transform duration-300 ease-brand hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
      >
        <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full [animation-iteration-count:5] bg-[#25D366] opacity-30" />
        <WhatsappLogo size={30} weight="fill" aria-hidden="true" className="relative" />
      </a>
    </div>
  );
}
