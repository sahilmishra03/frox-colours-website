/**
 * Brand and contact configuration.
 *
 * IMPORTANT: The contact values below are placeholders. The source files
 * (product PDF and image kit) do not include an address, phone number,
 * email or domain. Replace every value marked TODO before publishing.
 */
export const site = {
  name: "Frox Colours",
  legalName: "Frox Colours",
  tagline: "Daylight fluorescent pigments, dyes, inks and coatings",
  description:
    "Frox Colours supplies daylight fluorescent pigments, toners, dyes, printing inks, paints and heat reflective coatings in 25 named shades for plastics, textiles, paint and print.",
  // TODO: replace with the live domain.
  url: "https://www.froxcolours.com",
  contact: {
    // TODO: replace with the real sales inbox.
    email: "sales@froxcolours.com",
    // TODO: replace with the real phone number (E.164 for the tel: link).
    phoneDisplay: "+91 00000 00000",
    phoneHref: "+910000000000",
    // TODO: replace with the factory or office address.
    address: "Address to be confirmed",
    hours: "Monday to Saturday, 10:00 to 18:30 IST",
  },
  downloads: {
    catalogue: "/Frox_Colours_Product_Category_List_v2.pdf",
    imageKit: "/Frox_Colours_Website_Image_Kit.zip",
  },
} as const;

export const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/shades", label: "Shades" },
  { href: "/about", label: "About" },
  { href: "/enquiry", label: "Enquiry" },
] as const;
