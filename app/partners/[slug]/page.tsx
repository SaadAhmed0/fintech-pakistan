import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import PartnerLogo from "@/components/PartnerLogo";
import PartnersGrid from "@/components/Partners";
import PostCard from "@/components/PostCard";
import { getPartner, getPartners, getPostBySlug, hostOf } from "@/lib/content";
import { breadcrumbLd, pageAlternates, shareImage, titleTag } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getPartners().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getPartner(slug);
  if (!p) return {};
  const title = `${p.name}: ${p.focus}`;
  const url = absoluteUrl(`/partners/${p.slug}`);
  const images = shareImage(`/partners/${p.slug}/opengraph-image`, title);
  return {
    title: titleTag(title),
    description: p.description,
    alternates: pageAlternates(url),
    openGraph: { type: "website", url, title, description: p.description, siteName: site.name, locale: site.locale, images },
    twitter: { card: "summary_large_image", title, description: p.description, images },
  };
}

const SOCIAL_LABEL: [RegExp, string][] = [[/x\.com|twitter\.com/, "X"], [/linkedin\.com/, "LinkedIn"], [/instagram\.com/, "Instagram"], [/discord\./, "Discord"], [/youtube\.com/, "YouTube"]];
const socialLabel = (u: string) => SOCIAL_LABEL.find(([re]) => re.test(u))?.[1] ?? hostOf(u);

export default async function PartnerPage({ params }: Props) {
  const { slug } = await params;
  const p = getPartner(slug);
  if (!p) notFound();
  const url = absoluteUrl(`/partners/${p.slug}`);
  const related = p.related.map(getPostBySlug).filter((x) => x !== undefined);

  const ld = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": url,
    url,
    name: `${p.name}, ${site.name} ${p.type.toLowerCase()}`,
    description: p.description,
    isPartOf: { "@id": absoluteUrl("/#website") },
    mainEntity: {
      "@type": "Organization",
      name: p.name,
      url: p.website,
      logo: absoluteUrl(p.logo.src),
      description: p.description,
      ...(p.sameAs.length ? { sameAs: p.sameAs } : {}),
    },
  };

  return (
    <>
      <JsonLd data={[ld, breadcrumbLd([{ name: "Partners", path: "/partners" }, { name: p.name, path: `/partners/${p.slug}` }])]} />

      <section className="hero page-hero partner-hero band" aria-labelledby="partner-title">
        <div className="wrap hero-inner">
          <div>
            <nav aria-label="Breadcrumb">
              <ol className="crumbs">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/partners">Partners</Link></li>
              </ol>
            </nav>
            <span className="label eyebrow">{p.type} · {p.focus}</span>
            <h1 id="partner-title">{p.name}</h1>
            <p className="lede">{p.description}</p>
            <div className="ctas">
              <a className="btn btn-signal" href={p.website} target="_blank" rel="noopener">Visit {hostOf(p.website)} <span className="arrow">↗</span></a>
              <Link className="btn btn-ghost" href="/partners">All partners</Link>
            </div>
          </div>
          <div className="hero-mark"><PartnerLogo partner={p} size="hero" priority /></div>
        </div>
      </section>

      <section className="block band paper" aria-label={`About ${p.name}`}>
        <div className="article-layout">
          <div className="article">
            <div className="article-body" dangerouslySetInnerHTML={{ __html: p.html }} />
            {p.sources.length > 0 && (
              <aside className="sources" aria-labelledby="sources-title">
                <span className="label" id="sources-title" style={{ color: "var(--slate)" }}>Sources</span>
                <ol>{p.sources.map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noopener">{s.title}</a></li>)}</ol>
              </aside>
            )}
          </div>
          <div className="aside-stack">
            <div className="facts-card">
              <dl>
                <div><dt>Partnership</dt><dd>{p.type}</dd></div>
                <div><dt>Focus</dt><dd>{p.focus}</dd></div>
                <div><dt>Website</dt><dd><a href={p.website} target="_blank" rel="noopener">{hostOf(p.website)}</a></dd></div>
                {p.sameAs.length > 0 && (
                  <div><dt>Follow</dt><dd className="socials">{p.sameAs.map((u) => <a key={u} href={u} target="_blank" rel="noopener">{socialLabel(u)}</a>)}</dd></div>
                )}
              </dl>
            </div>
            <Link className="btn btn-ink" href="/contact?topic=Partnership">Become a partner</Link>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="block band white" aria-labelledby="related-title">
          <div className="wrap">
            <div className="head">
              <h2 id="related-title">From our newsroom</h2>
            </div>
            <div className="grid-3">{related.map((r) => <PostCard key={r.slug} post={r} />)}</div>
          </div>
        </section>
      )}

      <section className="block band paper" aria-labelledby="more-partners">
        <div className="wrap">
          <div className="head">
            <h2 id="more-partners">Other partners</h2>
          </div>
          <PartnersGrid />
        </div>
      </section>
    </>
  );
}
