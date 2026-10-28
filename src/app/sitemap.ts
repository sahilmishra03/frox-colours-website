import type { MetadataRoute } from "next";
import { categories } from "@/data/products";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/products", "/shades", "/about", "/enquiry", "/privacy", "/terms"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}` })),
    ...categories.map((c) => ({ url: `${site.url}/products/${c.slug}` })),
  ];
}
