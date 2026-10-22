import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <PageHero id="nf-title" eyebrow="404" title={<>This block <span className="soft">is missing.</span></>}
      lede="The page you were looking for has moved or never existed.">
      <div className="ctas"><Link className="btn btn-signal" href="/">Go home <span className="arrow">→</span></Link><Link className="btn btn-ghost" href="/insights">Read insights</Link></div>
    </PageHero>
  );
}
