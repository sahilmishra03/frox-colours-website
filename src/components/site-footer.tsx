import Link from "next/link";
import { EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react/ssr";
import { categories } from "@/data/products";
import { navLinks, site } from "@/data/site";
import { marketplace } from "@/data/trust";
import { ShareRow } from "./contact-block";
import { Logo } from "./logo";
import { IndiaMartBadge } from "./trust";
import { container } from "./ui";

async function CurrentYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

const focusLight = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
const linkClass = `whitespace-nowrap rounded-sm text-sm text-white/65 transition-colors duration-300 ease-brand hover:text-white ${focusLight}`;

export function SiteFooter() {
  return (
    <footer className="bg-navy text-white">
      <div className={`${container} grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12`}>
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-4">
          <Link href="/" className={`inline-flex rounded-lg ${focusLight}`} aria-label="Frox Colours home">
            <Logo tone="light" />
          </Link>
          <p className="mt-4 max-w-sm text-sm text-white/65">{site.description}</p>
          {marketplace.trustSeal || marketplace.member ? (
            <div className="mt-6 flex flex-wrap gap-3">
              <IndiaMartBadge status={marketplace.trustSeal ? "trustseal" : "member"} compact />
            </div>
          ) : null}
        </div>

        {/* Products */}
        <nav aria-label="Products" className="lg:col-span-3">
          <h2 className="text-sm font-semibold text-white">Products</h2>
          <ul className="mt-4 space-y-2">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/products/${c.slug}`} className={linkClass}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Company */}
        <nav aria-label="Company" className="lg:col-span-2">
          <h2 className="text-sm font-semibold text-white">Company</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/" className={linkClass}>
                Home
              </Link>
            </li>
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={site.downloads.catalogue} className={linkClass} download>
                Product list (PDF)
              </a>
            </li>
          </ul>
        </nav>

        {/* Contact */}
        <div className="lg:col-span-3">
          <h2 className="text-sm font-semibold text-white">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm text-white/65">
            <li className="flex items-start gap-2">
              <EnvelopeSimple size={18} className="mt-0.5 shrink-0 text-white/50" aria-hidden="true" />
              <a href={`mailto:${site.contact.email}`} className={linkClass}>
                {site.contact.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Phone size={18} className="mt-0.5 shrink-0 text-white/50" aria-hidden="true" />
              <a href={`tel:${site.contact.phoneHref}`} className={linkClass}>
                {site.contact.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={18} className="mt-0.5 shrink-0 text-white/50" aria-hidden="true" />
              <span>{site.contact.address}</span>
            </li>
            <li className="pl-6">{site.contact.hours}</li>
          </ul>
          <div className="mt-6">
            <ShareRow tone="dark" />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div
          className={`${container} flex flex-col gap-4 py-6 text-sm text-white/55 lg:flex-row lg:items-center lg:justify-between`}
        >
          <p>
            © <CurrentYear /> {site.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <Link href="/privacy" className={linkClass}>
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className={linkClass}>
                Terms of use
              </Link>
            </li>
            <li>
              <Link href="/sitemap.xml" className={linkClass}>
                Site map
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
