import Link from "next/link";
import { CELL, CELLS, CITIES, MAP_H, MAP_W, OUTLINE, TWINKLE } from "@/lib/pakistan-map";

// [from, to, how far the arc bows, is it a live route with a block running along it]
const ROUTES: [string, string, number, boolean][] = [
  ["KHI", "LHE", 0.16, true],
  ["KHI", "ISB", -0.14, true],
  ["GWD", "KHI", 0.14, true],
  ["LHE", "SXR", 0.22, true],
  ["ISB", "GIL", 0.2, true],
  ["KHI", "UET", 0.2, false],
  ["UET", "ISB", -0.16, false],
  ["KHI", "SKZ", 0.12, false],
  ["SKZ", "MUX", 0.14, false],
  ["MUX", "LHE", 0.16, false],
  ["PEW", "ISB", 0.3, false],
  ["SXR", "LEH", -0.2, false],
];

const city = (code: string) => CITIES.find((c) => c.code === code)!;

function arc(from: string, to: string, bow: number) {
  const a = city(from), b = city(to);
  const mx = (a.x + b.x) / 2 - (b.y - a.y) * bow;
  const my = (a.y + b.y) / 2 + (b.x - a.x) * bow;
  return `M${a.x} ${a.y}Q${mx.toFixed(1)} ${my.toFixed(1)} ${b.x} ${b.y}`;
}

const LABEL_LEFT = new Set(["KHI", "UET", "PEW"]);

export default function PakistanMap() {
  const inner = CELL - 3.5;
  return (
    <div className="pk">
      <svg
        viewBox={`0 0 ${MAP_W} ${MAP_H}`}
        role="img"
        aria-label="Map of Pakistan, including Jammu and Kashmir, built from pixel blocks, with payment routes linking Karachi, Lahore, Islamabad and other cities"
      >
        <defs>
          <pattern id="pk-cell" width={CELL} height={CELL} patternUnits="userSpaceOnUse">
            <rect x="1.75" y="1.75" width={inner} height={inner} rx="1.6" fill="#1B3B2B" />
          </pattern>
          <pattern id="pk-cell-hot" width={CELL} height={CELL} patternUnits="userSpaceOnUse">
            <rect x="1.75" y="1.75" width={inner} height={inner} rx="1.6" fill="#17A267" />
          </pattern>
          <radialGradient id="pk-fade">
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <mask id="pk-glow" maskUnits="userSpaceOnUse" x="0" y="0" width={MAP_W} height={MAP_H}>
            {CITIES.filter((c) => c.hub).map((c) => <circle key={c.code} cx={c.x} cy={c.y} r="150" fill="url(#pk-fade)" />)}
          </mask>
        </defs>

        <path className="pk-land" d={OUTLINE} />
        <path d={CELLS} fill="url(#pk-cell)" />
        <path className="pk-heat" d={CELLS} fill="url(#pk-cell-hot)" mask="url(#pk-glow)" />
        {TWINKLE.map(([x, y], i) => (
          <rect key={i} className="pk-twinkle" style={{ ["--i" as string]: i }} x={x} y={y} width={inner + 0.5} height={inner + 0.5} rx="1.6" />
        ))}

        <path className="pk-edge" d={OUTLINE} />
        <path className="pk-trace" d={OUTLINE} pathLength={100} />

        {ROUTES.map(([from, to, bow, live]) => (
          <path key={from + to} className={live ? "pk-route live" : "pk-route"} d={arc(from, to, bow)} />
        ))}
        {ROUTES.filter((r) => r[3]).map(([from, to, bow], i) => (
          <rect
            key={from + to}
            className="pk-block"
            x="-4.5" y="-4.5" width="9" height="9" rx="1.8"
            style={{ offsetPath: `path("${arc(from, to, bow)}")`, ["--i" as string]: i }}
          />
        ))}

        {CITIES.map((c) => {
          const s = c.hub ? 12 : 8;
          const left = LABEL_LEFT.has(c.code);
          return (
            <g key={c.code}>
              {c.hub && <rect className="pk-ring" x={c.x - s / 2} y={c.y - s / 2} width={s} height={s} rx="2.5" />}
              <rect className={c.hub ? "pk-node hub" : "pk-node"} x={c.x - s / 2} y={c.y - s / 2} width={s} height={s} rx="2.5" />
              <text className={c.hub ? "pk-city hub" : "pk-city"} x={left ? c.x - s : c.x + s} y={c.y + 4} textAnchor={left ? "end" : "start"}>{c.code}</text>
            </g>
          );
        })}
      </svg>

      <div className="pk-chips">
        <Link className="pk-chip" href="/insights/pakistan-digital-payments-92-percent"><b>92%</b><span>of retail payments digital, Q1 2026</span></Link>
        <Link className="pk-chip" href="/insights/raast-instant-payments-explained"><b>742.1M</b><span>Raast payments in Q1 2026</span></Link>
        <Link className="pk-chip" href="/insights/pakistan-remittances-fy26-record"><b>$41.6B</b><span>in remittances, FY26 record</span></Link>
      </div>
    </div>
  );
}
