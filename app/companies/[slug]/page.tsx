import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AVAILABILITY, UNKNOWN, companyFacts } from "@/components/CompanyCard";
import Faqs from "@/components/Faqs";
import JsonLd from "@/components/JsonLd";
import LabelNotice from "@/components/LabelNotice";
import PostCard from "@/components/PostCard";
import { formatDate, getCompanies, getCompany, getComparisonsFor, getPostsForCompany, getTopic, hostOf } from "@/lib/content";
import { breadcrumbLd, companyLd, faqLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getCompanies().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getCompany(slug);
  if (!c) return {};
  return pageMetadata({
    title: `${c.name} in Pakistan: Availability, Fees and KYC`,
    description: c.description,
    path: c.path,
    image: `${c.path}/opengraph-image`,
    noindex: !c.indexable,
  });
}

export default async function CompanyPage({ params }: Props) {
  const { slug } = await params;
  const c = getCompany(slug);
  if (!c) notFound();
  const news = getPostsForCompany(c.slug).slice(0, 6);
  const comparisons = getComparisonsFor(c.slug);
  const topics = c.topics.map(getTopic).filter((t) => t !== undefined);

  return (
    <>
      <JsonLd data={[companyLd(c), breadcrumbLd([{ name: "Companies", path: "/companies" }, { name: c.name, path: c.path }]), ...(c.faqs.length ? [faqLd(c.faqs)] : [])]} />
      <section className="hero page-hero article-hero band" aria-labelledby="company-title">
        <div className="wrap hero-inner">
          <div>
            <nav aria-label="Breadcrumb">
              <ol className="crumbs">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/companies">Companies</Link></li>
              </ol>
            </nav>
            <h1 id="company-title">{c.name} in Pakistan</h1>
            <p className="lede">{c.description}</p>
            <div className="article-meta">
              <span>{AVAILABILITY[c.pakistanAvailability].toUpperCase()}</span>
              <span>LAST VERIFIED {c.lastVerified ? formatDate(c.lastVerified).toUpperCase() : "PENDING"}</span>
              <a href={c.website} target="_blank" rel="noopener nofollow">{hostOf(c.website).toUpperCase()}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="block band paper" aria-label={`About ${c.name}`}>
        <div className="article-layout">
          <div className="article">
            {c.label && <LabelNotice label={c.label} subject="This profile" />}
            <div className="article-body" dangerouslySetInnerHTML={{ __html: c.html }} />
            {c.pakistanNote && <p className="notice"><b>Pakistan availability:</b> {c.pakistanNote}</p>}
            {c.faqs.length > 0 && <Faqs faqs={c.faqs} />}
            <p className="notice">This profile is general information, not financial advice. A listing here is not an endorsement, and fees and availability can change. Check with the company before you sign up.</p>
            {c.sources.length > 0 && (
              <aside className="sources" aria-labelledby="sources-title">
                <span className="label" id="sources-title" style={{ color: "var(--slate)" }}>Sources</span>
                <ol>{c.sources.map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noopener">{s.title}</a></li>)}</ol>
              </aside>
            )}
          </div>
          <aside className="aside-stack" aria-label="Company facts">
            <div className="facts-card">
              <dl>
                {companyFacts(c).map(([k, v]) => <div key={k}><dt>{k}</dt><dd className={v === UNKNOWN ? "unknown" : undefined}>{v}</dd></div>)}
              </dl>
            </div>
            {topics.length > 0 && <div className="filters">{topics.map((t) => <Link key={t.slug} className="filter" href={`/topics/${t.slug}`}>{t.name}</Link>)}</div>}
          </aside>
        </div>
      </section>

      {comparisons.length > 0 && (
        <section className="block band white" aria-labelledby="compare-title">
          <div className="wrap">
            <div className="head"><h2 id="compare-title">Compare <span className="soft-accent">{c.name}.</span></h2></div>
            <div className="filters">{comparisons.map((x) => <Link key={x.slug} className="filter" href={x.path}>{x.a.name} vs {x.b.name}</Link>)}</div>
          </div>
        </section>
      )}

      {news.length > 0 && (
        <section className="block band white" aria-labelledby="company-news">
          <div className="wrap">
            <div className="head">
              <span className="label">Latest</span>
              <h2 id="company-news">News about <span className="soft-accent">{c.name}.</span></h2>
            </div>
            <div className="grid-3">{news.map((p) => <PostCard key={p.path} post={p} />)}</div>
          </div>
        </section>
      )}
    </>
  );
}
