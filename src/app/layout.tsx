import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Frox Colours | Daylight fluorescent pigments, dyes and inks",
    template: "%s | Frox Colours",
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Frox Colours | Daylight fluorescent pigments, dyes and inks",
    description: site.description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frox Colours",
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white text-ink">
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}.tagline-word{opacity:1!important}.rating-bar{transform:scaleX(var(--v))!important}`}</style>
        </noscript>
        <a
          href="#main"
          className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-lg bg-navy px-3 py-2 text-sm font-semibold text-white transition-transform duration-300 ease-brand focus-visible:translate-y-0"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
