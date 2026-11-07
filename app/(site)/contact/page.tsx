import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import Cards from "@/components/Cards";
import { page } from "@/lib/cms";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export function generateMetadata() {
  return pageMetadata({ ...page("contact").seo, path: "/contact" });
}

export default function Contact() {
  const p = page("contact");
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Contact", path: "/contact" }])} />
      <PageHero id="contact-title" title={p.hero.title} lede={p.hero.lede || undefined}>
        {(site.contactLinkedin || site.contactEmail) && (
          <div className="ctas">
            {site.contactLinkedin && <a className="btn btn-signal" href={site.contactLinkedin} target="_blank" rel="noopener">{p.buttonLabel || "Connect on LinkedIn"}</a>}
            {site.contactEmail && <a className="btn btn-ghost" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>}
          </div>
        )}
      </PageHero>

      {p.other.length > 0 && (
        <section className="block band white" aria-labelledby="contact-other">
          <div className="wrap">
            {p.otherHeading && (
              <div className="head">
                <h2 id="contact-other">{p.otherHeading}{p.otherHeadingAccent && <> <span className="soft-accent">{p.otherHeadingAccent}</span></>}</h2>
              </div>
            )}
            <Cards cards={p.other} />
          </div>
        </section>
      )}
    </>
  );
}
