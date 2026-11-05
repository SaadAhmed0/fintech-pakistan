import { CELL, CELLS, CITIES, MAP_H, MAP_W, OUTLINE } from "@/lib/pakistan-map";

// A quiet reference map: Pakistan, including Jammu and Kashmir, with the main cities.
export default function PakistanMap() {
  const inner = CELL - 3.5;
  return (
    <div className="pk">
      <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} role="img" aria-label="Map of Pakistan, including Jammu and Kashmir, marking Karachi, Lahore and Islamabad">
        <defs>
          <pattern id="pk-cell" width={CELL} height={CELL} patternUnits="userSpaceOnUse">
            <rect x="1.75" y="1.75" width={inner} height={inner} rx="1" fill="#2C6E52" />
          </pattern>
        </defs>
        <path d={CELLS} fill="url(#pk-cell)" />
        <path d={OUTLINE} fill="none" stroke="#C6F24E" strokeWidth="1.4" strokeLinejoin="round" />
        {CITIES.filter((c) => c.hub).map((c) => (
          <g key={c.code}>
            <rect x={c.x - 5} y={c.y - 5} width="10" height="10" fill="#C6F24E" />
            <text className="pk-city" x={c.x + 10} y={c.y + 5}>{c.name}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}
