import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { pageWithBody } from "@/lib/cms";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

export function generateMetadata() {
  const p = pageWithBody("editorialPolicy");
  return pageMetadata({ ...p.seo, path: "/editorial-policy" });
}

export default function EditorialPolicy() {
  const p = pageWithBody("editorialPolicy");
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Editorial Policy", path: "/editorial-policy" }])} />
      <PageHero id="policy-title" title={p.hero.title} lede={p.hero.lede || undefined} />
      <section className="block band paper" aria-label="Policy">
        <div className="article">
          <div className="article-body policy" dangerouslySetInnerHTML={{ __html: p.html }} />
        </div>
      </section>
    </>
  );
}
