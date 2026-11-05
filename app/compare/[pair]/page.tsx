import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { companyFacts } from "@/components/CompanyCard";
import JsonLd from "@/components/JsonLd";
import { formatDate, getComparison, getComparisons } from "@/lib/content";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ pair: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getComparisons().map((c) => ({ pair: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pair } = await params;
  const c = getComparison(pair);
  return c ? pageMetadata({ title: c.title, description: c.description, path: c.path }) : {};
}

export default async function ComparePage({ params }: Props) {
  const { pair } = await params;
  const c = getComparison(pair);
  if (!c) notFound();
  const aFacts = companyFacts(c.a);
  const bFacts = companyFacts(c.b);
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Companies", path: "/companies" }, { name: c.title, path: c.path }])} />
      <section className="hero page-hero article-hero band" aria-labelledby="compare-title">
        <div className="wrap hero-inner">
          <div>
            <h1 id="compare-title">{c.title}</h1>
            <p className="lede">{c.description}</p>
            <div className="article-meta">
              <span>BY <Link href={`/authors/${c.authorSlug}`}>{c.author.toUpperCase()}</Link></span>
              <span>UPDATED {formatDate(c.updated || c.date).toUpperCase()}</span>
            </div>
          </div>
        </div>
      </section>
      <section className="block band paper" aria-label="Comparison">
        <div className="article">
          <div className="table-scroll">
            <table className="compare-table">
              <thead><tr><th scope="col">Detail</th><th scope="col"><Link href={c.a.path}>{c.a.name}</Link></th><th scope="col"><Link href={c.b.path}>{c.b.name}</Link></th></tr></thead>
              <tbody>{aFacts.map(([k, v], i) => <tr key={k}><th scope="row">{k}</th><td>{v}</td><td>{bFacts[i][1]}</td></tr>)}</tbody>
            </table>
          </div>
          <div className="article-body" dangerouslySetInnerHTML={{ __html: c.html }} />
          {c.sources.length > 0 && (
            <aside className="sources" aria-labelledby="sources-title">
              <span className="label" id="sources-title" style={{ color: "var(--slate)" }}>Sources</span>
              <ol>{c.sources.map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noopener">{s.title}</a></li>)}</ol>
            </aside>
          )}
          <p className="notice">This comparison is general information, not financial advice.</p>
        </div>
      </section>
    </>
  );
}
