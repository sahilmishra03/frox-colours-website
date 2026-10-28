import type { Metadata } from "next";
import { Suspense } from "react";
import { ChatText, Clock, EnvelopeSimple, MapPin, Phone, UserCircle, WhatsappLogo } from "@phosphor-icons/react/ssr";
import { EnquiryForm, EnquiryFormSkeleton } from "@/components/enquiry-form";
import { PageHeader } from "@/components/sections";
import { buttonSecondary, container, focusRing } from "@/components/ui";
import { site } from "@/data/site";
import { contactPerson } from "@/data/trust";

export const metadata: Metadata = {
  title: "Request a sample",
  description:
    "Send Frox Colours your product, shade and quantity. We reply with a sample plan and a quotation.",
  alternates: { canonical: "/enquiry" },
};

const contactItems = [
  { Icon: UserCircle, label: "Contact person", value: `${contactPerson.name}, ${contactPerson.role}` },
  { Icon: EnvelopeSimple, label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}` },
  { Icon: Phone, label: "Phone", value: site.contact.phoneDisplay, href: `tel:${site.contact.phoneHref}` },
  { Icon: MapPin, label: "Address", value: site.contact.address },
  { Icon: Clock, label: "Hours", value: site.contact.hours },
];

export default function EnquiryPage() {
  return (
    <>
      <PageHeader
        kicker="Enquiry"
        title={
          <>
            Request a sample
            <br />
            in your shade
          </>
        }
        text="Share the product, shade and quantity you need. We reply with a sample plan and a quotation for your approval."
      />

      <section className="pb-24 pt-16" aria-label="Enquiry form and contact details">
        <div className={`${container} grid gap-8 lg:grid-cols-12`}>
          <div className="lg:col-span-8">
            <Suspense fallback={<EnquiryFormSkeleton />}>
              <EnquiryForm />
            </Suspense>
          </div>

          <aside className="space-y-4 lg:col-span-4" aria-label="Contact details">
            <div className="rounded-2xl border border-line bg-surface p-6">
              <h2 className="text-lg font-semibold tracking-tight text-ink">Contact the sales team</h2>
              <ul className="mt-6 space-y-4">
                {contactItems.map(({ Icon, label, value, href }) => (
                  <li key={label} className="flex gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-white text-navy">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-xs text-muted">{label}</span>
                      {href ? (
                        <a href={href} className={`rounded-sm text-sm font-semibold text-ink hover:text-navy ${focusRing}`}>
                          {value}
                        </a>
                      ) : (
                        <span className="block text-sm font-semibold text-ink">{value}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid gap-3 rounded-2xl border border-line bg-white p-6">
              <h2 className="text-lg font-semibold tracking-tight text-ink">Other ways to reach us</h2>
              <a href={`sms:${site.contact.phoneHref}`} className={buttonSecondary}>
                <ChatText size={18} aria-hidden="true" />
                Contact via SMS
              </a>
              <a
                href={`https://wa.me/${site.contact.phoneHref.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonSecondary}
              >
                <WhatsappLogo size={18} aria-hidden="true" />
                Chat on WhatsApp
              </a>
            </div>
            <div className="rounded-2xl border border-line bg-white p-6">
              <h2 className="text-lg font-semibold tracking-tight text-ink">Before you write</h2>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-muted">
                <li>Name the base material, for example PP, PVC, cotton or a water based ink.</li>
                <li>Mention your process, such as moulding, extrusion or screen printing.</li>
                <li>Add the delivery location so we can include freight in the quotation.</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
