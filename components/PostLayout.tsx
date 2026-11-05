import Image from "next/image";
import Link from "next/link";
import Faqs from "./Faqs";
import Figure from "./Figure";
import JsonLd from "./JsonLd";
import LabelNotice from "./LabelNotice";
import Share from "./Share";
import { formatDate, getAuthor, getCompany, getTopic, slugify, type Post } from "@/lib/content";
import { articleLd, breadcrumbLd, faqLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

const SECTION = { news: "News", guides: "Guides" };

// The one layout every news post and guide renders through.
export default function PostLayout({ post: p, related }: { post: Post; related: Post[] }) {
  const section = SECTION[p.kind];
  const companies = p.companies.map(getCompany).filter((c) => c !== undefined);
  const author = getAuthor(p.authorSlug);
  const longRead = p.readingTime >= 3;
  // Charts sit inside the text, at <div data-chart="key"></div>.
  const chunks = p.html.split(/<div data-chart="([a-z0-9-]+)"><\/div>/);

  return (
    <article className="art">
      <JsonLd data={[
        articleLd(p),
        breadcrumbLd([{ name: section, path: `/${p.kind}` }, { name: p.title, path: p.path }]),
        ...(p.faqs.length ? [faqLd(p.faqs)] : []),
      ]} />

      <div className="art-top band">
        <header className="art-head">
          <nav aria-label="Breadcrumb">
            <ol className="crumbs">
              <li><Link href="/">Home</Link></li>
              <li><Link href={`/${p.kind}`}>{section}</Link></li>
            </ol>
          </nav>
          <h1>{p.title}</h1>
          <p className="lede">{p.description}</p>
          <p className="art-byline">
            By <Link href={`/authors/${p.authorSlug}`}>{p.author}</Link>
            {" · "}<time dateTime={p.published}>{formatDate(p.date)}</time>
            {p.updated && <> · Updated <time dateTime={p.updated}>{formatDate(p.updated)}</time></>}
            {longRead && ` · ${p.readingTime} min read`}
          </p>
        </header>
      </div>

      <div className="art-body band">
        <div className="art-col">
          {p.label && <LabelNotice label={p.label} />}
          {p.coverImage && (
            <div className="post-cover">
              <Image src={p.coverImage} alt={p.coverAlt ?? ""} fill priority sizes="(max-width: 720px) 100vw, 680px" />
            </div>
          )}
          {p.keyPoints.length > 0 && (
            <aside className="keypoints" aria-labelledby="keypoints-title">
              <h2 id="keypoints-title">In short</h2>
              <ul>{p.keyPoints.map((k) => <li key={k}>{k}</li>)}</ul>
            </aside>
          )}

          {chunks.map((chunk, i) => (i % 2
            ? <Figure key={i} chart={chunk} />
            : <div key={i} className={`article-body${i === 0 && longRead ? " dropcap" : ""}`} dangerouslySetInnerHTML={{ __html: chunk }} />))}

          {p.faqs.length > 0 && <Faqs faqs={p.faqs} />}

          {p.kind === "guides" && (
            <p className="notice">This guide is general information, not financial, legal or tax advice. Rules, fees and availability change, so check with the provider and your own adviser before you act.</p>
          )}

          {p.sources.length > 0 && (
            <aside className="sources" aria-labelledby="sources-title">
              <span className="label" id="sources-title">Sources</span>
              <ol>{p.sources.map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noopener">{s.title}</a></li>)}</ol>
            </aside>
          )}

          {author && <p className="author-box"><Link href={`/authors/${author.slug}`}>{author.name}</Link>: {author.bio}</p>}

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
            <span className="label">Share</span>
            <Share url={absoluteUrl(p.path)} title={p.title} />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <aside className="read-next band" aria-labelledby="read-next-title">
          <div className="read-next-inner">
            <h2 id="read-next-title">Read next</h2>
            <ol>
              {related.map((r) => (
                <li key={r.path}><Link href={r.path}><b>{r.title}</b><span>{r.description}</span></Link></li>
              ))}
            </ol>
          </div>
        </aside>
      )}
    </article>
  );
}
