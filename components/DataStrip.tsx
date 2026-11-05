import Link from "next/link";

const ITEMS = [
  { label: "Remittances FY26", value: "$41.6B", href: "/news/pakistan-remittances-fy26-record" },
  { label: "Raast FY26", value: "2.76B payments", href: "/guides/raast-instant-payments-explained" },
  { label: "Digital retail payments", value: "92%", href: "/news/pakistan-digital-payments-92-percent" },
  { label: "PVARA licence categories", value: "11", href: "/guides/pvara-virtual-asset-licensing" },
];

// Sourced figures that open the story behind them. Update when the data changes.
export default function DataStrip() {
  return (
    <div className="strip band" aria-label="Key figures">
      <div className="wrap">
        {ITEMS.map((i) => <Link key={i.label} href={i.href}>{i.label} <b>{i.value}</b></Link>)}
      </div>
    </div>
  );
}
