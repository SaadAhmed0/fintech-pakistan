import Link from "next/link";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { pageWithBody } from "@/lib/cms";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

export function generateMetadata() {
  const p = pageWithBody("ourStory");
  return pageMetadata({ ...p.seo, path: "/our-story" });
}

export default function OurStory() {
  const p = pageWithBody("ourStory");
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Our Story", path: "/our-story" }])} />
      <PageHero id="story-title" title={p.hero.title} lede={p.hero.lede || undefined} />

      <section className="block band paper" aria-label="Our story">
        <div className="article">
          <div className="article-body" dangerouslySetInnerHTML={{ __html: p.html }} />
          {p.links.length > 0 && (
            <div className="ctas" style={{ marginTop: 36 }}>
              {p.links.map((l, i) => <Link key={l.href} className={i === 0 ? "btn btn-ink" : "btn btn-ghost"} href={l.href} {...(l.href === "/community" ? { "data-join": true } : {})}>{l.label}</Link>)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
