import Image from "next/image";
import Link from "next/link";
import Faqs from "./Faqs";
import JsonLd from "./JsonLd";
import LabelNotice from "./LabelNotice";
import PostCard from "./PostCard";
import ReadingProgress from "./ReadingProgress";
import Share from "./Share";
import Toc from "./Toc";
import { formatDate, getCompany, getTopic, slugify, type Post } from "@/lib/content";
import { articleLd, breadcrumbLd, faqLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

const SECTION = { news: "News", guides: "Guides" };

// The one layout every news post and guide renders through.
export default function PostLayout({ post: p, related }: { post: Post; related: Post[] }) {
  const section = SECTION[p.kind];
  const companies = p.companies.map(getCompany).filter((c) => c !== undefined);

  return (
    <article id="article">
      <JsonLd data={[
        articleLd(p),
        breadcrumbLd([{ name: section, path: `/${p.kind}` }, { name: p.title, path: p.path }]),
        ...(p.faqs.length ? [faqLd(p.faqs)] : []),
      ]} />
      <ReadingProgress target="article" />

      <section className="hero page-hero article-hero band" aria-labelledby="article-title">
        <div className="wrap hero-inner">
          <div>
            <nav aria-label="Breadcrumb">
              <ol className="crumbs">
                <li><Link href="/">Home</Link></li>
                <li><Link href={`/${p.kind}`}>{section}</Link></li>
              </ol>
            </nav>
            <h1 id="article-title">{p.title}</h1>
            <p className="lede">{p.description}</p>
            <div className="article-meta">
              <span>BY <Link href={`/authors/${p.authorSlug}`}>{p.author.toUpperCase()}</Link></span>
              <time dateTime={p.published}>{formatDate(p.date).toUpperCase()}</time>
              {p.updated && <span>UPDATED <time dateTime={p.updated}>{formatDate(p.updated).toUpperCase()}</time></span>}
              <span>{p.readingTime} MIN READ</span>
            </div>
          </div>
        </div>
      </section>

      <section className="block band paper" aria-label="Article">
        <div className="article-layout">
          <div className="article">
            {p.label && <LabelNotice label={p.label} />}
            {p.coverImage && (
              <div className="post-cover">
                <Image src={p.coverImage} alt={p.coverAlt ?? ""} fill priority sizes="(max-width: 780px) 100vw, 720px" />
              </div>
            )}
            {p.headings.length > 1 && (
              <details className="toc-mobile">
                <summary>On this page</summary>
                <ol>{p.headings.map((h) => <li key={h.id}><a href={`#${h.id}`}>{h.text}</a></li>)}</ol>
              </details>
            )}
            <div className="article-body" dangerouslySetInnerHTML={{ __html: p.html }} />

            {p.faqs.length > 0 && <Faqs faqs={p.faqs} />}

            {p.kind === "guides" && (
              <p className="notice">This guide is general information, not financial, legal or tax advice. Rules, fees and availability change, so check with the provider and your own adviser before you act.</p>
            )}

            {p.sources.length > 0 && (
              <aside className="sources" aria-labelledby="sources-title">
                <span className="label" id="sources-title" style={{ color: "var(--slate)" }}>Sources</span>
                <ol>{p.sources.map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noopener">{s.title}</a></li>)}</ol>
              </aside>
            )}

            <div className="article-foot">
              {companies.length > 0 && (
                <>
                  <span className="label">Companies in this story</span>
                  <div className="filters post-tags">
                    {companies.map((c) => <Link key={c.slug} className="filter" href={c.path}>{c.name}</Link>)}
                  </div>
                </>
              )}
              <span className="label">Topics</span>
              <div className="filters post-tags">
                {p.tags.map((t) => {
                  const topic = getTopic(slugify(t));
                  return topic
                    ? <Link key={t} className="filter" href={`/topics/${topic.slug}`}>{topic.name}</Link>
                    : <span key={t} className="chip">{t}</span>;
                })}
              </div>
              <span className="label">Share this</span>
              <Share url={absoluteUrl(p.path)} title={p.title} />
            </div>
          </div>
          <Toc headings={p.headings} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="block band white" aria-labelledby="related-title">
          <div className="wrap">
            <div className="head">
              <span className="label">Keep reading</span>
              <h2 id="related-title">Related <span className="soft-accent">reads.</span></h2>
            </div>
            <div className="grid-3">{related.map((r) => <PostCard key={r.path} post={r} />)}</div>
          </div>
        </section>
      )}
    </article>
  );
}
