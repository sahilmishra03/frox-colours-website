"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { categories } from "@/data/products";
import { shades } from "@/data/shades";
import { site } from "@/data/site";
import { buttonPrimary } from "./ui";

type Values = {
  name: string;
  company: string;
  email: string;
  phone: string;
  category: string;
  shade: string;
  quantity: string;
  message: string;
};

type Errors = Partial<Record<keyof Values, string>>;

const QUANTITIES = ["Sample only", "Under 25 kg", "25 to 100 kg", "100 to 500 kg", "Over 500 kg"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9 ()]{7,20}$/;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Enter your full name.";
  if (!v.company.trim()) e.company = "Enter your company name.";
  if (!v.email.trim()) e.email = "Enter your work email.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "Enter an email in the format name@company.com.";
  if (v.phone.trim() && !PHONE_RE.test(v.phone.trim())) e.phone = "Use digits only, with an optional country code such as +91.";
  if (!v.category) e.category = "Choose the product category you need.";
  if (v.message.trim().length < 20) e.message = "Describe your requirement in at least 20 characters.";
  return e;
}

const fieldBase =
  "mt-2 block w-full rounded-lg border bg-white px-3 py-2 text-base text-ink placeholder:text-subtle transition-[border-color] duration-300 ease-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy";

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label} {optional ? <span className="font-normal text-subtle">(optional)</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 flex items-center gap-1 text-sm text-red-700">
          <WarningCircle size={16} aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function EnquiryForm() {
  const params = useSearchParams();
  const initialShade = shades.some((s) => s.id === params.get("shade")) ? (params.get("shade") as string) : "";
  const initialCategory = categories.some((c) => c.slug === params.get("category"))
    ? (params.get("category") as string)
    : initialShade
      ? "fluorescent-pigments"
      : "";

  const [values, setValues] = useState<Values>({
    name: "",
    company: "",
    email: "",
    phone: "",
    category: initialCategory,
    shade: initialShade,
    quantity: QUANTITIES[0],
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const set = (key: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...values, [key]: e.target.value };
    setValues(next);
    if (errors[key]) setErrors(validate(next));
  };

  const describedBy = (key: keyof Values) => (errors[key] ? `${key}-error` : undefined);
  const border = (key: keyof Values) => (errors[key] ? "border-red-600" : "border-line hover:border-ink/20");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstKey = Object.keys(found)[0];
    if (firstKey) {
      document.getElementById(firstKey)?.focus();
      return;
    }

    setStatus("sending");
    const category = categories.find((c) => c.slug === values.category)?.name ?? values.category;
    const shade = shades.find((s) => s.id === values.shade)?.name ?? "Not specified";
    const subject = `Sample enquiry: ${category}${values.shade ? `, ${shade}` : ""}`;
    const body = [
      `Name: ${values.name}`,
      `Company: ${values.company}`,
      `Email: ${values.email}`,
      `Phone: ${values.phone || "Not given"}`,
      `Product category: ${category}`,
      `Shade: ${shade}`,
      `Quantity: ${values.quantity}`,
      "",
      values.message,
    ].join("\n");

    // There is no form backend yet, so the enquiry opens in the visitor's
    // email app, addressed to the sales inbox.
    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.setTimeout(() => setStatus("sent"), 600);
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-line bg-white p-8" role="status">
        <CheckCircle size={32} weight="fill" className="text-navy" aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-ink">Your enquiry is ready to send</h2>
        <p className="mt-2 text-base text-muted">
          Your email app opened with the details filled in and addressed to {site.contact.email}. Press send there to
          reach our team. If nothing opened, write to {site.contact.email} directly.
        </p>
        <button type="button" className={`${buttonPrimary} mt-6`} onClick={() => setStatus("idle")}>
          Edit enquiry
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="rounded-2xl border border-line bg-white p-6 md:p-8" aria-label="Sample enquiry">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Full name" error={errors.name}>
          <input id="name" name="name" autoComplete="name" value={values.name} onChange={set("name")} className={`${fieldBase} ${border("name")}`} aria-invalid={!!errors.name} aria-describedby={describedBy("name")} required />
        </Field>
        <Field id="company" label="Company" error={errors.company}>
          <input id="company" name="company" autoComplete="organization" value={values.company} onChange={set("company")} className={`${fieldBase} ${border("company")}`} aria-invalid={!!errors.company} aria-describedby={describedBy("company")} required />
        </Field>
        <Field id="email" label="Work email" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" placeholder="name@company.com" value={values.email} onChange={set("email")} className={`${fieldBase} ${border("email")}`} aria-invalid={!!errors.email} aria-describedby={describedBy("email")} required />
        </Field>
        <Field id="phone" label="Phone" optional error={errors.phone}>
          <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+91" value={values.phone} onChange={set("phone")} className={`${fieldBase} ${border("phone")}`} aria-invalid={!!errors.phone} aria-describedby={describedBy("phone")} />
        </Field>
        <Field id="category" label="Product category" error={errors.category}>
          <select id="category" name="category" value={values.category} onChange={set("category")} className={`${fieldBase} ${border("category")}`} aria-invalid={!!errors.category} aria-describedby={describedBy("category")} required>
            <option value="">Choose a category</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </Field>
        <Field id="shade" label="Shade" optional>
          <select id="shade" name="shade" value={values.shade} onChange={set("shade")} className={`${fieldBase} border-line hover:border-ink/20`}>
            <option value="">Not decided yet</option>
            {shades.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </Field>
        <Field id="quantity" label="Estimated quantity">
          <select id="quantity" name="quantity" value={values.quantity} onChange={set("quantity")} className={`${fieldBase} border-line hover:border-ink/20`}>
            {QUANTITIES.map((q) => (
              <option key={q}>{q}</option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field id="message" label="Your requirement" error={errors.message}>
            <textarea id="message" name="message" rows={5} placeholder="Application, base material, process and delivery location" value={values.message} onChange={set("message")} className={`${fieldBase} ${border("message")}`} aria-invalid={!!errors.message} aria-describedby={describedBy("message")} required />
          </Field>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">Fields without a label note are required.</p>
        <button type="submit" className={`${buttonPrimary} disabled:opacity-60`} disabled={status === "sending"}>
          {status === "sending" ? "Preparing your email" : "Send enquiry"}
        </button>
      </div>
    </form>
  );
}

/** Skeleton shaped like the form, shown while search params resolve. */
export function EnquiryFormSkeleton() {
  return (
    <div className="rounded-2xl border border-line bg-white p-6 md:p-8" aria-hidden="true">
      <div className="grid gap-6 sm:grid-cols-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i}>
            <div className="h-4 w-24 animate-pulse rounded bg-surface-2" />
            <div className="mt-2 h-10 animate-pulse rounded-lg bg-surface" />
          </div>
        ))}
        <div className="sm:col-span-2">
          <div className="h-4 w-32 animate-pulse rounded bg-surface-2" />
          <div className="mt-2 h-32 animate-pulse rounded-lg bg-surface" />
        </div>
      </div>
    </div>
  );
}
