import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import PostCard from "@/components/PostCard";
import ReadingProgress from "@/components/ReadingProgress";
import Share from "@/components/Share";
import Toc from "@/components/Toc";
import { formatDate, getAllPosts, getPost, getRelated, slugify } from "@/lib/posts";
import { articleLd, breadcrumbLd } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  const url = absoluteUrl(`/insights/${p.slug}`);
  const title = p.seoTitle || p.title;
  return {
    title,
    description: p.description,
    keywords: p.keywords,
    alternates: { canonical: url },
    authors: [{ name: p.author }],
    robots: p.draft ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      url,
      title,
      description: p.description,
      siteName: site.name,
      locale: site.locale,
      publishedTime: p.date,
      modifiedTime: p.updated || p.date,
      section: p.tag,
      tags: p.keywords,
      authors: [p.author],
    },
    twitter: { card: "summary_large_image", title, description: p.description },
  };
}

export default async function Article({ params }: Props) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  const url = absoluteUrl(`/insights/${p.slug}`);
  const tagSlug = slugify(p.tag);
  const related = getRelated(p);

  return (
    <article id="article">
      <JsonLd data={[
        articleLd(p),
        breadcrumbLd([{ name: "Insights", path: "/insights" }, { name: p.tag, path: `/insights/topic/${tagSlug}` }, { name: p.title, path: `/insights/${p.slug}` }]),
      ]} />
      <ReadingProgress target="article" />

      <section className="hero page-hero article-hero band" aria-labelledby="article-title">
        <div className="wrap hero-inner">
          <div>
            <nav aria-label="Breadcrumb">
              <ol className="crumbs">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/insights">Insights</Link></li>
                <li><Link href={`/insights/topic/${tagSlug}`}>{p.tag}</Link></li>
              </ol>
            </nav>
            <h1 id="article-title">{p.title}</h1>
            <p className="lede">{p.description}</p>
            <div className="article-meta">
              <span>BY {p.author.toUpperCase()}</span>
              <time dateTime={p.date}>{formatDate(p.date).toUpperCase()}</time>
              {p.updated && <span>UPDATED <time dateTime={p.updated}>{formatDate(p.updated).toUpperCase()}</time></span>}
              <span>{p.readingTime} MIN READ</span>
            </div>
          </div>
        </div>
      </section>

      <section className="block band paper" aria-label="Article">
        <div className="article-layout">
          <div className="article">
            {p.headings.length > 1 && (
              <details className="toc-mobile">
                <summary>On this page</summary>
                <ol>{p.headings.map((h) => <li key={h.id}><a href={`#${h.id}`}>{h.text}</a></li>)}</ol>
              </details>
            )}
            <div className="article-body" dangerouslySetInnerHTML={{ __html: p.html }} />

            {p.sources.length > 0 && (
              <aside className="sources" aria-labelledby="sources-title">
                <span className="label" id="sources-title" style={{ color: "var(--slate)" }}>Sources</span>
                <ol>{p.sources.map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noopener">{s.title}</a></li>)}</ol>
              </aside>
            )}

            <div className="article-foot">
              <span className="label">Share this</span>
              <Share url={url} title={p.title} />
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
              <h2 id="related-title">More on <span className="soft-accent">{p.tag.toLowerCase()}.</span></h2>
            </div>
            <div className="grid-3">{related.map((r) => <PostCard key={r.slug} post={r} />)}</div>
          </div>
        </section>
      )}
    </article>
  );
}
