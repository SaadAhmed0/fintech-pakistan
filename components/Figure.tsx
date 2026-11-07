import { getChart } from "@/lib/cms";

// A sourced chart built from real text, so it stays sharp, readable and searchable.
// Every bar carries its value, so there is nothing hidden behind a hover.
export default function Figure({ chart, compact = false }: { chart: string; compact?: boolean }) {
  const c = getChart(chart);
  const max = Math.max(...c.rows.map((r) => r.value));
  return (
    <figure className={compact ? "fig fig-compact" : "fig"}>
      <figcaption><b>{c.title}</b><span>{c.subtitle}</span></figcaption>
      {c.type === "bars" ? (
        <ul className="bars">
          {c.rows.map((r) => (
            <li key={r.label}>
              <span className="bar-label">{r.label}</span>
              <span className="bar-track"><i style={{ width: `${(r.value / max) * 100}%` }} /><b>{r.display}</b></span>
            </li>
          ))}
        </ul>
      ) : (
        <ol className="cols">
          {c.rows.map((r) => (
            <li key={r.label}>
              <b>{r.display}</b>
              <i style={{ height: `${(r.value / max) * 100}%` }} />
              <span>{r.label}</span>
            </li>
          ))}
        </ol>
      )}
      <p className="fig-src">Source: {c.source}</p>
    </figure>
  );
}
