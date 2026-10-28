import type { MockupKind } from "@/data/products";
import { LOGO_COLOR, LOGO_PATHS } from "../logo";

/**
 * Custom packaging and powder mockups for Frox Colours.
 * Every mockup is a flat SVG coloured by a single `color` prop, so any of the
 * 25 shades can be "shot" in any pack. Shading uses white and black overlays
 * at low opacity instead of gradients, which keeps the style flat and lets
 * the components render on the server without unique ids.
 */

const NAVY = "#132A45";
const LINE = "#D9D9D5";

type MockupProps = {
  color: string;
  label?: string;
  className?: string;
  title?: string;
};

function Frame({
  children,
  className,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 240 240"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      fontFamily="var(--font-geist-sans), system-ui, sans-serif"
    >
      {children}
    </svg>
  );
}

function GroundShadow({ cx = 120, cy = 214, rx = 78 }: { cx?: number; cy?: number; rx?: number }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={9} fill="#000" opacity={0.07} />;
}

/** Deterministic powder grain so server and client markup always match. */
const GRAIN: [number, number, number][] = [
  [0.12, 0.62, 1.4], [0.22, 0.48, 1], [0.31, 0.7, 1.6], [0.4, 0.4, 1.1], [0.47, 0.6, 0.9],
  [0.55, 0.33, 1.3], [0.61, 0.66, 1], [0.69, 0.5, 1.5], [0.76, 0.72, 1.1], [0.84, 0.58, 0.9],
  [0.27, 0.82, 1.2], [0.52, 0.84, 1.4], [0.73, 0.86, 1], [0.36, 0.56, 0.8], [0.64, 0.44, 0.8],
];

function Grain({ x, y, w, h, color = "#fff", opacity = 0.45 }: { x: number; y: number; w: number; h: number; color?: string; opacity?: number }) {
  return (
    <g fill={color} opacity={opacity}>
      {GRAIN.map(([gx, gy, r], i) => (
        <circle key={i} cx={x + gx * w} cy={y + gy * h} r={r} />
      ))}
    </g>
  );
}

/** The Frox Colours FC ring mark, placed inside a mockup at (cx, cy). */
function LabelMark({ cx, cy, size }: { cx: number; cy: number; size: number }) {
  const p = LOGO_PATHS;
  const s = size / 100;
  return (
    <g transform={`translate(${cx - size / 2} ${cy - size / 2}) scale(${s})`}>
      <circle cx={50} cy={50} r={p.outerRing} fill="none" stroke={LOGO_COLOR} strokeWidth={p.ringStroke * 1.3} />
      <circle cx={50} cy={50} r={p.innerRing - 0.6} fill="none" stroke={LOGO_COLOR} strokeWidth={p.ringStroke * 1.3} />
      <path fill={LOGO_COLOR} d={p.fTop} />
      <path fill={LOGO_COLOR} d={p.fBody} />
      <path fill={LOGO_COLOR} d={p.c} />
    </g>
  );
}

function BrandLabel({
  x,
  y,
  w,
  h,
  color,
  label,
  sub = "DAYLIGHT FLUORESCENT",
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  label?: string;
  sub?: string;
}) {
  const cx = x + w / 2;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={5} fill="#fff" />
      <rect x={x} y={y} width={w} height={6} rx={0} fill={NAVY} />
      <rect x={x} y={y + 6} width={w} height={2} fill={color} />
      <LabelMark cx={cx} cy={y + 18} size={16} />
      <text x={cx} y={y + 33} textAnchor="middle" fontSize={5.2} fontWeight={700} fill={NAVY} letterSpacing={1.2}>
        FROX COLOURS
      </text>
      <text x={cx} y={y + h - 14} textAnchor="middle" fontSize={4.2} fill="#5B5F66" letterSpacing={0.6}>
        {sub}
      </text>
      {label ? (
        <text x={cx} y={y + h - 6} textAnchor="middle" fontSize={5.4} fontWeight={600} fill="#0A0A0A">
          {label}
        </text>
      ) : null}
    </g>
  );
}

export function PigmentJar({ color, label, className, title }: MockupProps) {
  return (
    <Frame className={className} title={title}>
      <GroundShadow />
      {/* glass body */}
      <rect x={58} y={72} width={124} height={140} rx={20} fill="#FFFFFF" opacity={0.92} stroke={LINE} strokeWidth={1.5} />
      {/* powder fill */}
      <rect x={63} y={104} width={114} height={103} rx={16} fill={color} />
      <ellipse cx={120} cy={106} rx={57} ry={7} fill={color} />
      <ellipse cx={120} cy={106} rx={57} ry={7} fill="#fff" opacity={0.28} />
      <rect x={150} y={104} width={27} height={103} rx={12} fill="#000" opacity={0.08} />
      <Grain x={66} y={104} w={108} h={100} />
      {/* label */}
      <BrandLabel x={82} y={128} w={76} h={62} color={color} label={label} sub="FLUORESCENT PIGMENT" />
      {/* glass highlight */}
      <rect x={68} y={84} width={8} height={116} rx={4} fill="#fff" opacity={0.65} />
      {/* lid */}
      <rect x={54} y={48} width={132} height={30} rx={9} fill={NAVY} />
      <rect x={54} y={48} width={132} height={8} rx={4} fill="#fff" opacity={0.12} />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
        <rect key={i} x={64 + i * 11} y={58} width={2} height={16} rx={1} fill="#fff" opacity={0.08} />
      ))}
    </Frame>
  );
}

export function PigmentSack({ color, label, className, title }: MockupProps) {
  return (
    <Frame className={className} title={title}>
      <GroundShadow rx={86} />
      <path d="M62 58 L178 58 L188 204 Q120 214 52 204 Z" fill="#F4F4F1" stroke={LINE} strokeWidth={1.5} />
      <path d="M62 58 L178 58 L179 72 L61 72 Z" fill="#E7E7E3" />
      {Array.from({ length: 14 }).map((_, i) => (
        <rect key={i} x={66 + i * 8} y={64} width={4} height={1.5} fill="#B9B9B4" />
      ))}
      <path d="M58 100 L182 100 L185 148 L55 148 Z" fill={color} />
      <path d="M58 100 L182 100 L182.6 108 L57.4 108 Z" fill="#000" opacity={0.08} />
      <BrandLabel x={86} y={112} w={68} h={58} color={color} label={label} sub="PIGMENT POWDER" />
      <text x={120} y={192} textAnchor="middle" fontSize={9} fontWeight={600} fill={NAVY} letterSpacing={2}>
        NET 25 KG
      </text>
      <path d="M150 62 L178 58 L188 204 Q170 207 160 208 Z" fill="#000" opacity={0.05} />
      {/* spilled powder */}
      <path d="M22 216 C34 194 50 188 60 188 C72 188 84 198 94 216 Z" fill={color} />
      <path d="M22 216 C34 194 50 188 60 188 C50 194 42 204 40 216 Z" fill="#fff" opacity={0.25} />
      <Grain x={30} y={192} w={60} h={22} />
    </Frame>
  );
}

export function PaintTin({ color, label, className, title }: MockupProps) {
  return (
    <Frame className={className} title={title}>
      <GroundShadow rx={70} />
      <path d="M74 64 Q120 20 166 64" fill="none" stroke="#9EA3A9" strokeWidth={3} />
      <rect x={64} y={70} width={112} height={138} rx={8} fill="#D5D8DC" />
      <rect x={64} y={100} width={112} height={82} fill={color} />
      <BrandLabel x={86} y={108} w={68} h={66} color={color} label={label} sub="RADIANT PAINT" />
      <rect x={64} y={70} width={14} height={138} fill="#fff" opacity={0.35} />
      <rect x={154} y={70} width={22} height={138} fill="#000" opacity={0.07} />
      <ellipse cx={120} cy={70} rx={56} ry={10} fill="#C3C7CC" />
      <ellipse cx={120} cy={68} rx={48} ry={7} fill="#E1E4E7" />
      {/* drip */}
      <path d="M140 70 L140 92 Q140 98 145 98 Q150 98 150 92 L150 71 Z" fill={color} />
      <rect x={64} y={198} width={112} height={10} rx={4} fill="#000" opacity={0.08} />
    </Frame>
  );
}

export function InkTub({ color, label, className, title }: MockupProps) {
  return (
    <Frame className={className} title={title}>
      <GroundShadow rx={88} />
      {/* print stroke */}
      <path d="M26 206 C70 188 120 222 214 198" stroke={color} strokeWidth={14} strokeLinecap="round" fill="none" />
      <path d="M26 206 C70 188 120 222 214 198" stroke="#fff" strokeWidth={3} strokeLinecap="round" fill="none" opacity={0.35} />
      <rect x={50} y={104} width={140} height={92} rx={12} fill="#FFFFFF" stroke={LINE} strokeWidth={1.5} />
      <rect x={168} y={104} width={22} height={92} rx={10} fill="#000" opacity={0.05} />
      <BrandLabel x={84} y={118} w={72} h={64} color={color} label={label} sub="PRINTING INK" />
      <rect x={44} y={86} width={152} height={24} rx={7} fill={color} />
      <rect x={44} y={86} width={152} height={7} rx={3.5} fill="#fff" opacity={0.25} />
      <rect x={44} y={103} width={152} height={7} rx={3.5} fill="#000" opacity={0.1} />
      {/* squeegee */}
      <g transform="rotate(-18 186 66)">
        <rect x={150} y={56} width={72} height={14} rx={4} fill={NAVY} />
        <rect x={150} y={68} width={72} height={6} rx={2} fill="#2B2B2B" />
      </g>
    </Frame>
  );
}

export function DyeBottle({ color, label, className, title }: MockupProps) {
  return (
    <Frame className={className} title={title}>
      <GroundShadow rx={60} />
      <path d="M96 62 L144 62 L144 82 Q174 92 174 124 L174 196 Q174 210 160 210 L80 210 Q66 210 66 196 L66 124 Q66 92 96 82 Z" fill="#fff" stroke={LINE} strokeWidth={1.5} opacity={0.95} />
      <path d="M70 126 Q70 120 76 120 L164 120 Q170 120 170 126 L170 194 Q170 206 158 206 L82 206 Q70 206 70 194 Z" fill={color} opacity={0.92} />
      <path d="M70 128 Q120 118 170 128" stroke="#fff" strokeWidth={2} fill="none" opacity={0.4} />
      <BrandLabel x={86} y={136} w={68} h={58} color={color} label={label} sub="SOLUBLE DYE" />
      <rect x={76} y={96} width={7} height={96} rx={3.5} fill="#fff" opacity={0.6} />
      <rect x={92} y={36} width={56} height={30} rx={6} fill={NAVY} />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={99 + i * 9} y={42} width={2} height={18} rx={1} fill="#fff" opacity={0.12} />
      ))}
    </Frame>
  );
}

export function TonerPouch({ color, label, className, title }: MockupProps) {
  return (
    <Frame className={className} title={title}>
      <GroundShadow rx={74} />
      <path d="M66 52 L174 52 L180 196 Q180 208 168 208 L72 208 Q60 208 60 196 Z" fill="#FFFFFF" stroke={LINE} strokeWidth={1.5} />
      <path d="M66 52 L174 52 L176 96 L64 96 Z" fill={color} />
      <rect x={66} y={64} width={108} height={3} fill="#000" opacity={0.12} />
      <circle cx={160} cy={78} r={4} fill="#fff" opacity={0.9} />
      {/* window with powder */}
      <rect x={84} y={150} width={72} height={44} rx={22} fill="#F1F1EE" />
      <path d="M86 186 C100 164 140 164 154 186 L154 190 Q154 194 150 194 L90 194 Q86 194 86 190 Z" fill={color} />
      <Grain x={90} y={168} w={60} h={24} />
      <LabelMark cx={120} cy={114} size={20} />
      <text x={120} y={131} textAnchor="middle" fontSize={5.6} fontWeight={700} fill={NAVY} letterSpacing={1.2}>
        FROX COLOURS
      </text>
      <text x={120} y={140} textAnchor="middle" fontSize={5.4} fontWeight={600} fill="#0A0A0A">
        {label ?? "TN SERIES TONER"}
      </text>
      <path d="M152 52 L174 52 L180 196 Q180 208 168 208 L160 208 Z" fill="#000" opacity={0.04} />
    </Frame>
  );
}

export function ReflectiveTin({ color, label, className, title }: MockupProps) {
  return (
    <Frame className={className} title={title}>
      <GroundShadow rx={70} />
      {/* sun and reflected rays */}
      <circle cx={196} cy={42} r={14} fill={color} />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <rect key={a} x={194.5} y={18} width={3} height={8} rx={1.5} fill={color} transform={`rotate(${a} 196 42)`} />
      ))}
      <path d="M176 58 L136 84" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeDasharray="4 6" />
      <path d="M136 84 L102 44" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeDasharray="4 6" opacity={0.6} />
      <rect x={64} y={88} width={112} height={120} rx={8} fill="#FFFFFF" stroke={LINE} strokeWidth={1.5} />
      <rect x={64} y={112} width={112} height={74} fill="#EEF0F2" />
      <BrandLabel x={86} y={118} w={68} h={62} color={color} label={label} sub="REFLECTIVE PIGMENT" />
      <rect x={154} y={88} width={22} height={120} fill="#000" opacity={0.05} />
      <ellipse cx={120} cy={88} rx={56} ry={10} fill="#E3E6E9" />
      <ellipse cx={120} cy={86} rx={48} ry={7} fill="#FFFFFF" />
    </Frame>
  );
}

export function DyeVials({ color, label, className, title }: MockupProps) {
  const vials = [
    { x: 58, h: 112, o: 0.55 },
    { x: 104, h: 136, o: 1 },
    { x: 150, h: 98, o: 0.75 },
  ];
  return (
    <Frame className={className} title={title}>
      <GroundShadow rx={84} />
      {vials.map((v, i) => {
        const top = 208 - v.h;
        return (
          <g key={i}>
            <rect x={v.x} y={top} width={34} height={v.h} rx={10} fill="#fff" stroke={LINE} strokeWidth={1.5} />
            <rect x={v.x + 3} y={top + v.h * 0.35} width={28} height={v.h * 0.65 - 3} rx={8} fill={color} opacity={v.o} />
            <rect x={v.x + 6} y={top + 10} width={4} height={v.h - 24} rx={2} fill="#fff" opacity={0.6} />
            <rect x={v.x - 2} y={top - 12} width={38} height={14} rx={4} fill={NAVY} />
          </g>
        );
      })}
      <rect x={68} y={176} width={104} height={24} rx={5} fill="#fff" stroke={LINE} />
      <LabelMark cx={80} cy={188} size={16} />
      <text x={126} y={188} textAnchor="middle" fontSize={7} fontWeight={700} fill={NAVY} letterSpacing={1.2}>
        FROX COLOURS
      </text>
      <text x={126} y={196} textAnchor="middle" fontSize={4.6} fill="#5B5F66">
        {label ?? "FLUORESCENT PIGMENT DYE"}
      </text>
    </Frame>
  );
}

export function PowderMound({ color, className, title }: Omit<MockupProps, "label">) {
  return (
    <Frame className={className} title={title}>
      <ellipse cx={120} cy={206} rx={104} ry={10} fill="#000" opacity={0.07} />
      <path d="M16 206 C52 134 92 100 120 100 C148 100 188 134 224 206 Z" fill={color} />
      <path d="M16 206 C52 134 92 100 120 100 C100 112 74 150 64 206 Z" fill="#fff" opacity={0.26} />
      <path d="M224 206 C188 134 148 100 120 100 C142 116 166 160 172 206 Z" fill="#000" opacity={0.08} />
      <Grain x={40} y={110} w={160} h={96} />
      <Grain x={40} y={120} w={160} h={80} color="#000" opacity={0.1} />
    </Frame>
  );
}

/** Fanned swatch deck. Cards open further when a parent `.group` is hovered. */
export function SwatchFan({ colors, className, title }: { colors: string[]; className?: string; title?: string }) {
  const n = colors.length;
  const spread = 64;
  return (
    <Frame className={className} title={title}>
      <ellipse cx={120} cy={218} rx={60} ry={7} fill="#000" opacity={0.07} />
      {colors.map((c, i) => {
        const angle = n === 1 ? 0 : -spread / 2 + (spread / (n - 1)) * i;
        return (
          <g key={i} className="fan-card" style={{ ["--a" as string]: `${angle}deg` }}>
            <rect x={104} y={40} width={32} height={176} rx={6} fill="#fff" stroke={LINE} strokeWidth={1} />
            <rect x={107} y={43} width={26} height={122} rx={4} fill={c} />
            <rect x={110} y={172} width={20} height={3} rx={1.5} fill="#C9C9C4" />
            <rect x={110} y={179} width={14} height={3} rx={1.5} fill="#DDDDD8" />
          </g>
        );
      })}
      <circle cx={120} cy={204} r={4} fill={NAVY} />
    </Frame>
  );
}

export function ProductMockup({ kind, ...props }: MockupProps & { kind: MockupKind }) {
  switch (kind) {
    case "jar":
      return <PigmentJar {...props} />;
    case "sack":
      return <PigmentSack {...props} />;
    case "tin":
      return <PaintTin {...props} />;
    case "tub":
      return <InkTub {...props} />;
    case "bottle":
      return <DyeBottle {...props} />;
    case "pouch":
      return <TonerPouch {...props} />;
    case "reflective":
      return <ReflectiveTin {...props} />;
    case "vial":
      return <DyeVials {...props} />;
  }
}
