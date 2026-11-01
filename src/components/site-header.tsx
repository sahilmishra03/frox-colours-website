"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { navLinks } from "@/data/site";
import { Logo } from "./logo";
import { focusRing } from "./ui";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

const allLinks = [{ href: "/", label: "Home" }, ...navLinks.filter((l) => l.href !== "/enquiry")];

/**
 * Floating glass navigation bar. Narrows slightly once the page scrolls,
 * hides while scrolling down and returns when scrolling up.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Close the menu after navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 320 && y > lastY + 4);
      if (Math.abs(y - lastY) > 4) lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const tucked = hidden && !open;

  return (
    <header
      className={`fixed inset-x-0 top-3 z-50 px-3 transition-transform duration-500 ease-brand md:top-4 md:px-4 ${
        tucked ? "-translate-y-[calc(100%+1.5rem)]" : "translate-y-0"
      }`}
      onFocusCapture={() => setHidden(false)}
    >
      <nav
        aria-label="Main"
        className={`mx-auto flex items-center justify-between gap-4 rounded-2xl border p-1.5 pl-3 shadow-[inset_0_1px_0_rgb(255_255_255/0.7)] backdrop-blur-xl backdrop-saturate-150 transition-[max-width,background-color,box-shadow,border-color] duration-500 ease-brand ${
          scrolled || open
            ? "max-w-5xl border-navy/10 bg-white/80 shadow-lg shadow-navy/10"
            : "max-w-6xl border-white/50 bg-white/65 shadow-md shadow-black/10"
        }`}
      >
        <Link href="/" className={`rounded-lg ${focusRing}`} aria-label="Frox Colours home">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-0.5 rounded-xl bg-navy/[0.04] p-1 md:flex">
          {allLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`block rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-300 ease-brand ${focusRing} ${
                    active ? "bg-white text-navy shadow-sm ring-1 ring-navy/10" : "text-navy/70 hover:text-navy"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1.5">
          <Link
            href="/enquiry"
            className={`group hidden items-center gap-1.5 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-accent/30 transition-colors duration-300 ease-brand hover:bg-accent-deep md:inline-flex ${focusRing}`}
          >
            Get a quote
            <ArrowRight
              size={16}
              weight="bold"
              aria-hidden="true"
              className="transition-transform duration-300 ease-brand group-hover:translate-x-0.5"
            />
          </Link>
          <button
            type="button"
            className={`relative inline-flex size-11 items-center justify-center rounded-xl text-navy transition-colors duration-300 ease-brand hover:bg-navy/5 md:hidden ${focusRing}`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`absolute h-0.5 w-5 rounded-full bg-current transition-transform duration-500 ease-brand ${
                open ? "rotate-45" : "-translate-y-1"
              }`}
            />
            <span
              className={`absolute h-0.5 w-5 rounded-full bg-current transition-transform duration-500 ease-brand ${
                open ? "-rotate-45" : "translate-y-1"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu: glass panel under the bar */}
      <div
        id="mobile-menu"
        className={`mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl border border-navy/10 bg-white/90 shadow-lg backdrop-blur-xl transition-[opacity,transform] duration-300 ease-brand md:hidden ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        <ul className="flex flex-col p-2">
          {allLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium ${focusRing} ${
                    active ? "bg-navy text-white" : "text-navy hover:bg-navy/5"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li className="p-2">
            <Link
              href="/enquiry"
              className={`flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-base font-semibold text-white ${focusRing}`}
            >
              Get a quote
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
