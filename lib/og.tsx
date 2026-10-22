import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

// Brand Open Graph card: night ink, pixel mark, lime block.
export function ogImage({ eyebrow, title, footer }: { eyebrow: string; title: string; footer: string }) {
  const px: [number, number][] = [[23,16],[23,30],[23,44],[23,58],[23,72],[37,16],[51,16],[65,16],[37,44],[51,44],[65,44]];
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0B1510", color: "#F3F4EE", padding: 72, position: "relative" }}>
        <svg width="520" height="520" viewBox="0 0 100 100" style={{ position: "absolute", right: -90, top: -60 }}>
          {px.map(([x, y], i) => <rect key={i} x={x} y={y} width="12" height="12" rx="1.5" fill="#13291E" />)}
          <rect x="65" y="30" width="12" height="12" rx="1.5" fill="#C6F24E" />
        </svg>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="64" height="64" viewBox="0 0 100 100">
            <rect width="100" height="100" rx="24" fill="#0B6B43" />
            <rect x="23" y="16" width="12" height="68" rx="1.5" fill="#F3F4EE" /><rect x="23" y="16" width="54" height="12" rx="1.5" fill="#F3F4EE" /><rect x="23" y="44" width="54" height="12" rx="1.5" fill="#F3F4EE" />
            <rect x="65" y="30" width="12" height="12" rx="1.5" fill="#C6F24E" />
          </svg>
          <div style={{ display: "flex", fontSize: 40, letterSpacing: -1.5 }}>
            <span style={{ fontWeight: 800 }}>fintech</span><span style={{ color: "#C6F24E" }}>pakistan</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 980 }}>
          <span style={{ color: "#C6F24E", fontSize: 26, letterSpacing: 3, textTransform: "uppercase" }}>{eyebrow}</span>
          <span style={{ fontSize: title.length > 70 ? 60 : 72, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2.5 }}>{title}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "2px solid #24332B", paddingTop: 24, fontSize: 22, letterSpacing: 2, color: "#9FB0A6" }}>
          <span>{footer}</span><span>COMMUNITY · PODCAST · EVENTS · INSIGHTS</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
