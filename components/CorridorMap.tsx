import { REGION_CELL, REGION_CITIES, REGION_H, REGION_LAND, REGION_PK, REGION_W } from "@/lib/corridor-map";
import { curve } from "./PakistanMap";

// [from, to, how far the arc bows, is it a live route with a block running along it]
const ROUTES: [string, string, number, boolean][] = [
  ["KHI", "DXB", 0.3, true],
  ["KHI", "RUH", 0.3, true],
  ["KHI", "SIN", 0.3, true],
  ["LHE", "DXB", 0.2, false],
  ["ISB", "RUH", 0.16, false],
  ["LHE", "SIN", -0.18, false],
];

const city = (code: string) => REGION_CITIES.find((c) => c.code === code)!;
const route = (from: string, to: string, bow: number) => curve(city(from), city(to), bow);

// Where each city's name sits relative to its node
const LABELS: Record<string, { dx: number; dy: number; anchor: "start" | "end" | "middle" }> = {
  KHI: { dx: 0, dy: 32, anchor: "middle" },
  LHE: { dx: 16, dy: 7, anchor: "start" },
  ISB: { dx: 16, dy: -2, anchor: "start" },
  DXB: { dx: 0, dy: 32, anchor: "middle" },
  RUH: { dx: 0, dy: 32, anchor: "middle" },
  SIN: { dx: -18, dy: 7, anchor: "end" },
};

export default function CorridorMap() {
  const inner = REGION_CELL - 3;
  return (
    <div className="corridor-wrap">
      <svg
        className="region-map"
        viewBox={`0 0 ${REGION_W} ${REGION_H}`}
        role="img"
        aria-label="Map of payment corridors linking Karachi, Lahore and Islamabad with Riyadh, Dubai and Singapore"
      >
        <defs>
          <pattern id="rg-cell" width={REGION_CELL} height={REGION_CELL} patternUnits="userSpaceOnUse">
            <rect x="1.5" y="1.5" width={inner} height={inner} rx="1.8" fill="#20362B" />
          </pattern>
          <pattern id="rg-cell-pk" width={REGION_CELL} height={REGION_CELL} patternUnits="userSpaceOnUse">
            <rect x="1.5" y="1.5" width={inner} height={inner} rx="1.8" fill="#17A267" />
          </pattern>
        </defs>

        <path d={REGION_LAND} fill="url(#rg-cell)" />
        <path d={REGION_PK} fill="url(#rg-cell-pk)" />

        {ROUTES.map(([from, to, bow, live]) => (
          <path key={from + to} className={live ? "pk-route live" : "pk-route"} d={route(from, to, bow)} />
        ))}
        {ROUTES.filter((r) => r[3]).map(([from, to, bow], i) => (
          <rect
            key={from + to}
            className="pk-block"
            x="-6" y="-6" width="12" height="12" rx="2.5"
            style={{ offsetPath: `path("${route(from, to, bow)}")`, ["--i" as string]: i * 1.4 }}
          />
        ))}

        {REGION_CITIES.map((c, i) => {
          const s = c.hub ? 16 : 11;
          const l = LABELS[c.code];
          return (
            <g key={c.code}>
              {c.hub && <rect className="pk-ring" style={{ animationDelay: `${i * 0.5}s` }} x={c.x - s / 2} y={c.y - s / 2} width={s} height={s} rx="3" />}
              <rect className={c.hub ? "pk-node hub" : "pk-node"} x={c.x - s / 2} y={c.y - s / 2} width={s} height={s} rx="3" />
              <text className={c.hub ? "rg-city hub" : "rg-city"} x={c.x + l.dx} y={c.y + l.dy} textAnchor={l.anchor}>{c.name}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
