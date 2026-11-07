import Link from "next/link";
import PageHero from "@/components/PageHero";
import SiteFrame from "@/components/SiteFrame";
import { has, page } from "@/lib/cms";
import "./globals.css";

export const metadata = { title: "Page not found", robots: { index: false } };

// Rendered outside app/(site), so it brings the site frame with it.
export default function NotFound() {
  const p = page("notFound");
  return (
    <SiteFrame>
      <PageHero id="nf-title" eyebrow={p.eyebrow} title={<>{p.title}{has(p.titleAccent) && <> <span className="soft">{p.titleAccent}</span></>}</>} lede={p.lede}>
        {p.links.length > 0 && (
          <div className="ctas">{p.links.map((l, i) => <Link key={l.href} className={i === 0 ? "btn btn-signal" : "btn btn-ghost"} href={l.href}>{l.label}</Link>)}</div>
        )}
      </PageHero>
    </SiteFrame>
  );
}
