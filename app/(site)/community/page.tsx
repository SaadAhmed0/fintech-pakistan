import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CardSection } from "@/components/Cards";
import { page, settings } from "@/lib/cms";
import { breadcrumbLd, faqLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export function generateMetadata() {
  return pageMetadata({ ...page("community").seo, path: "/community" });
}

export default function Community() {
  const p = page("community");
  const join = settings().joinDialog.buttonLabel || undefined;
  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: "Community", path: "/community" }]), ...(p.faqs.length ? [faqLd(p.faqs)] : [])]} />
      <PageHero id="community-title" title={p.hero.title} lede={p.hero.lede || undefined}>
        <div className="ctas"><WhatsAppButton invite={site.whatsappInvite} label={join} /></div>
      </PageHero>

      <CardSection id="community-channels" section={p.channels} band="paper" />

      {p.who.heading && (
        <section className="block band white" aria-labelledby="community-who">
          <div className="wrap split top">
            <div className="prose">
              <h2 id="community-who">{p.who.heading}{p.who.headingAccent && <> <span className="soft-accent">{p.who.headingAccent}</span></>}</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {p.who.chips.length > 0 && <div className="chips">{p.who.chips.map((c) => <span key={c} className="chip">{c}</span>)}</div>}
              {p.who.steps.length > 0 && (
                <ol className="steps">
                  {p.who.steps.map((s) => <li key={s.title}><h3 className="h4">{s.title}</h3>{s.text && <p>{s.text}</p>}</li>)}
                </ol>
              )}
            </div>
          </div>
        </section>
      )}

      {p.rules.items.length > 0 && (
        <section className="block band white" aria-labelledby="community-rules">
          <div className="wrap">
            <div className="head">
              <h2 id="community-rules">{p.rules.heading}</h2>
              {p.rules.intro && <p>{p.rules.intro}</p>}
            </div>
            <ul className="rules">
              {p.rules.items.map((r) => <li key={r.title}><b>{r.title}</b><span>{r.text}</span></li>)}
            </ul>
          </div>
        </section>
      )}

      {p.faqs.length > 0 && (
        <section className="block band paper" aria-labelledby="community-faq">
          <div className="wrap split top">
            <div className="prose">
              <h2 id="community-faq">{p.faqHeading}</h2>
            </div>
            <div className="faq">
              {p.faqs.map((f, i) => <details key={f.q} open={i === 0}><summary>{f.q}</summary><p>{f.a}</p></details>)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
