import Link from "next/link";
import { settings } from "@/lib/cms";

// Sourced figures that open the story behind them. Edited in the admin under
// Site settings, Figures in the top bar.
export default function DataStrip() {
  const items = settings().topBar;
  if (items.length === 0) return null;
  return (
    <div className="strip band" aria-label="Key figures">
      <div className="wrap">
        {items.map((i) => (i.href ? <Link key={i.label} href={i.href}>{i.label} <b>{i.value}</b></Link> : <span key={i.label}>{i.label} <b>{i.value}</b></span>))}
      </div>
    </div>
  );
}
