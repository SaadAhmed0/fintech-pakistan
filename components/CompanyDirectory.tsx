"use client";

import { useMemo, useState } from "react";
import CompanyCard, { type CompanyCardData } from "./CompanyCard";

// Every company is in the server-rendered HTML. Filters only hide cards, so
// crawlers and readers without JavaScript see the full directory.
export default function CompanyDirectory({ companies }: { companies: CompanyCardData[] }) {
  const [usd, setUsd] = useState(false);
  const [card, setCard] = useState(false);
  const [pakistan, setPakistan] = useState(false);
  const [coin, setCoin] = useState("");
  const coins = useMemo(() => [...new Set(companies.flatMap((c) => c.stablecoins))].sort(), [companies]);
  const shown = companies.filter((c) =>
    (!usd || c.usdAccount) && (!card || c.card) && (!pakistan || c.pakistanAvailability === "yes" || c.pakistanAvailability === "reported") && (!coin || c.stablecoins.includes(coin)));

  const toggle = (label: string, on: boolean, set: (v: boolean) => void) => (
    <button type="button" className="filter" aria-pressed={on} onClick={() => set(!on)}>{label}</button>
  );

  return (
    <>
      <div className="filters" role="group" aria-label="Filter companies">
        {toggle("USD account", usd, setUsd)}
        {toggle("Card", card, setCard)}
        {toggle("Available in Pakistan", pakistan, setPakistan)}
        <select className="filter" aria-label="Stablecoin" value={coin} onChange={(e) => setCoin(e.target.value)}>
          <option value="">Any stablecoin</option>
          {coins.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <p className="dir-count" aria-live="polite">{shown.length} of {companies.length} companies</p>
      <div className="grid-3">{shown.map((c) => <CompanyCard key={c.slug} company={c} headingLevel={2} />)}</div>
      {shown.length === 0 && <p className="empty">No companies match those filters.</p>}
    </>
  );
}
