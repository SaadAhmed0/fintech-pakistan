import Link from "next/link";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import Partners from "@/components/Partners";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { getPartners } from "@/lib/content";
import { absoluteUrl, site } from "@/lib/site";
import { page } from "@/lib/cms";
import { CardSection } from "@/components/Cards";

export function generateMetadata() {
  return pageMetadata({ ...page("partnersPage").seo, path: "/partners" });
}

export default function PartnersPage() {
  const p = page("partnersPage");
  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: "Partners", path: "/partners" }]), {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `${site.name} partners`,
        itemListElement: getPartners().map((x, i) => ({ "@type": "ListItem", position: i + 1, name: x.name, url: absoluteUrl(`/partners/${x.slug}`) })),
      }]} />
      <PageHero id="partners-title" title={p.hero.title} lede={p.hero.lede || undefined}>
        {p.button.label && <div className="ctas"><Link className="btn btn-signal" href={p.button.href}>{p.button.label}</Link></div>}
      </PageHero>

      <section className="block band paper" aria-labelledby="partners-current">
        <div className="wrap">
          <div className="head">
            <h2 id="partners-current">{p.currentHeading}</h2>
            {p.currentIntro && <p>{p.currentIntro}</p>}
          </div>
          <Partners />
        </div>
      </section>

      <CardSection id="partners-who" section={p.who} />
      <CardSection id="partners-formats" section={p.formats} band="paper" />

      {p.how.length > 0 && (
        <section className="block band white" aria-labelledby="partners-how">
          <div className="wrap">
            <div className="head">
              <h2 id="partners-how">{p.howHeading}</h2>
            </div>
            <ol className="steps">
              {p.how.map((st) => <li key={st.title}><h3>{st.title}</h3>{st.text && <p>{st.text}</p>}</li>)}
            </ol>
          </div>
        </section>
      )}
    </>
  );
}
