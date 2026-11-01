import {
  ChatText,
  EnvelopeSimple,
  FacebookLogo,
  LinkedinLogo,
  MapPin,
  Phone,
  ShareNetwork,
  WhatsappLogo,
  XLogo,
} from "@phosphor-icons/react/ssr";
import { site } from "@/data/site";
import { contactPerson } from "@/data/trust";
import { Reveal } from "./reveal";
import { buttonPrimary, buttonSecondary, container, eyebrow, focusRing } from "./ui";

const shareText = `${site.name}: ${site.tagline}`;

export const shareLinks = [
  {
    label: "Share on Facebook",
    Icon: FacebookLogo,
    href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(site.url)}`,
  },
  {
    label: "Share on LinkedIn",
    Icon: LinkedinLogo,
    href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(site.url)}`,
  },
  {
    label: "Share on X",
    Icon: XLogo,
    href: `https://x.com/intent/post?url=${encodeURIComponent(site.url)}&text=${encodeURIComponent(shareText)}`,
  },
  {
    label: "Share on WhatsApp",
    Icon: WhatsappLogo,
    href: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${site.url}`)}`,
  },
];

export function ShareRow({ tone = "light" }: { tone?: "light" | "muted" | "dark" }) {
  const dark = tone === "dark";
  return (
    <div className="flex items-center gap-3">
      <span
        className={`inline-flex items-center gap-2 text-sm font-semibold ${
          dark ? "text-white" : tone === "light" ? "text-ink" : "text-muted"
        }`}
      >
        <ShareNetwork size={18} aria-hidden="true" />
        Share us
      </span>
      <ul className="flex items-center gap-1">
        {shareLinks.map(({ label, Icon, href }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={`grid size-10 place-items-center rounded-lg transition-[background-color,color,transform] duration-300 ease-brand active:scale-[0.98] ${
                dark
                  ? "text-white/65 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  : `text-muted hover:bg-white hover:text-navy ${focusRing}`
              }`}
            >
              <Icon size={20} weight="fill" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ContactBlock() {
  const digits = site.contact.phoneHref.replace(/\D/g, "");
  return (
    <section className="py-24" aria-labelledby="contact-title">
      <div className={container}>
        <Reveal>
          <p className={eyebrow}>Contact us</p>
          <h2 id="contact-title" className="mt-3 max-w-[680px] text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            Speak with our sales team
          </h2>
        </Reveal>

        <Reveal delay={80} className="mt-12 rounded-3xl border border-line bg-white p-2">
          <div className="grid gap-2 lg:grid-cols-12">
            <div className="rounded-2xl bg-surface p-6 lg:col-span-7">
              <p className="text-lg font-semibold tracking-tight text-ink">
                {contactPerson.name} <span className="font-normal text-muted">({contactPerson.role})</span>
              </p>
              <p className="mt-1 text-base text-ink">{site.legalName}</p>
              <p className="mt-4 flex items-start gap-2 text-base text-muted">
                <MapPin size={20} className="mt-0.5 shrink-0 text-navy" aria-hidden="true" />
                {site.contact.address}
              </p>
              <p className="mt-2 text-sm text-muted">{site.contact.hours}</p>
              <a href={`tel:${site.contact.phoneHref}`} className={`${buttonPrimary} mt-6`}>
                <Phone size={18} weight="fill" aria-hidden="true" />
                Call us: {site.contact.phoneDisplay}
              </a>
            </div>

            <div className="flex flex-col justify-between gap-6 rounded-2xl bg-surface p-6 lg:col-span-5">
              <div className="grid gap-3">
                <a href={`mailto:${site.contact.email}`} className={buttonSecondary}>
                  <EnvelopeSimple size={18} aria-hidden="true" />
                  Contact via email
                </a>
                <a href={`sms:${site.contact.phoneHref}`} className={buttonSecondary}>
                  <ChatText size={18} aria-hidden="true" />
                  Contact via SMS
                </a>
                <a href={`https://wa.me/${digits}`} target="_blank" rel="noopener noreferrer" className={buttonSecondary}>
                  <WhatsappLogo size={18} aria-hidden="true" />
                  Chat on WhatsApp
                </a>
              </div>
              <ShareRow />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
