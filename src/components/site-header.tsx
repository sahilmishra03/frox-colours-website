"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "@/data/site";
import { Logo } from "./logo";
import { buttonPrimary, buttonSmall, focusRing } from "./ui";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the menu after navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        aria-label="Main"
        className="relative z-50 flex w-full max-w-3xl items-center justify-between gap-6 rounded-2xl border border-line bg-white/80 p-2 pl-4 backdrop-blur-md md:w-auto"
      >
        <Link href="/" className={`rounded-lg ${focusRing}`} aria-label="Frox Colours home">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-300 ease-brand ${focusRing} ${
                    active ? "bg-surface-2 text-ink" : "text-muted hover:bg-surface hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          {/* Wrapper controls visibility so `hidden` never fights the button's own `inline-flex`. */}
          <span className="hidden md:block">
            <Link href="/enquiry" className={buttonSmall}>
              Request a sample
            </Link>
          </span>
          <button
            type="button"
            className={`relative inline-flex size-10 items-center justify-center rounded-lg text-ink transition-colors duration-300 ease-brand hover:bg-surface active:scale-[0.98] md:hidden ${focusRing}`}
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

      {/* Mobile menu: full height panel with staggered links (skill B7). */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-xl transition-opacity duration-500 ease-brand md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        <ul className="flex h-full flex-col justify-center gap-2 px-6">
          {[{ href: "/", label: "Home" }, ...navLinks].map((link, i) => {
            const active = link.href === "/" ? pathname === "/" : isActive(pathname, link.href);
            return (
              <li
                key={link.href}
                className={`transition-[opacity,transform] duration-500 ease-brand ${
                  open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${Math.min(i * 60, 400)}ms` : "0ms" }}
              >
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`block rounded-lg py-2 text-4xl font-semibold tracking-tight ${focusRing} ${
                    active ? "text-ink" : "text-subtle"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li
            className={`pt-6 transition-[opacity,transform] duration-500 ease-brand ${
              open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: open ? "300ms" : "0ms" }}
          >
            <Link href="/enquiry" className={buttonPrimary}>
              Request a sample
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
