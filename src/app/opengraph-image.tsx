import { ImageResponse } from "next/og";
import { LOGO_COLOR, LOGO_PATHS } from "@/components/logo";
import { categories, productLineCount } from "@/data/products";
import { shades } from "@/data/shades";

export const alt = "Frox Colours, daylight fluorescent pigments, dyes and inks";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const p = LOGO_PATHS;
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="${p.outerRing}" fill="none" stroke="${LOGO_COLOR}" stroke-width="${p.ringStroke}"/><circle cx="50" cy="50" r="${p.innerRing}" fill="none" stroke="${LOGO_COLOR}" stroke-width="${p.ringStroke}"/><path fill="${LOGO_COLOR}" d="${p.fTop}"/><path fill="${LOGO_COLOR}" d="${p.fBody}"/><path fill="${LOGO_COLOR}" d="${p.c}"/></svg>`;
const logoSrc = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString("base64")}`;

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FFFFFF",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={88} height={88} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 36, fontWeight: 600, color: "#0A0A0A" }}>Frox Colours</div>
            <div style={{ fontSize: 22, color: "#5B5F66" }}>Fluorescent pigments</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 66, fontWeight: 600, color: "#0A0A0A", lineHeight: 1.05 }}>
            Fluorescent pigments for plastics, print and paint
          </div>
          <div style={{ fontSize: 28, color: "#5B5F66" }}>
            {`${categories.length} categories · ${productLineCount} product lines · ${shades.length} named shades`}
          </div>
        </div>
        <div style={{ display: "flex", height: 8, borderRadius: 4, background: "#132A45" }} />
      </div>
    ),
    size,
  );
}
