import Link from "next/link";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { CardSection } from "@/components/Cards";
import { pageWithBody } from "@/lib/cms";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

export function generateMetadata() {
  const p = pageWithBody("about");
  return pageMetadata({ ...p.seo, path: "/about" });
}

export default function About() {
  const p = pageWithBody("about");
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "About", path: "/about" }])} />
      <PageHero id="about-title" title={p.hero.title} lede={p.hero.lede || undefined} />

      <section className="block band paper" aria-labelledby="about-story">
        <div className="wrap">
          <div className="prose">
            {p.storyHeading && <h2 id="about-story">{p.storyHeading}</h2>}
            <div dangerouslySetInnerHTML={{ __html: p.html }} />
            {p.storyLinks.length > 0 && (
              <div className="ctas" style={{ marginTop: 28 }}>
                {p.storyLinks.map((l, i) => <Link key={l.href} className={i === 0 ? "btn btn-ink" : "btn btn-ghost"} href={l.href}>{l.label}</Link>)}
              </div>
            )}
          </div>
        </div>
      </section>

      <CardSection id="about-beliefs" section={p.beliefs} />
      <CardSection id="about-what" section={p.what} />
    </>
  );
}
