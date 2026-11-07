import Link from "next/link";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { CardSection } from "@/components/Cards";
import { page } from "@/lib/cms";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { absoluteUrl, site, summitWhen } from "@/lib/site";

export function generateMetadata() {
  return pageMetadata({ ...page("events").seo, path: "/events" });
}

function summitLd(description: string) {
  if (!site.summit.date) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: site.summit.name,
    description,
    startDate: site.summit.date,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: site.summit.venue || site.summit.city,
      address: { "@type": "PostalAddress", addressLocality: site.summit.city, addressCountry: "PK" },
    },
    organizer: { "@type": "Organization", name: site.name, url: site.url },
    url: absoluteUrl("/events"),
    image: absoluteUrl("/opengraph-image"),
  };
}

export default function Events() {
  const p = page("events");
  const s = p.summit;
  const ld = summitLd(s.text);
  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: "Events", path: "/events" }]), ...(ld ? [ld] : [])]} />
      <PageHero id="events-title" title={p.hero.title} lede={p.hero.lede || undefined} />

      {s.name && (
        <section className="block band paper" aria-labelledby="events-next">
          <div className="wrap">
            {p.flagshipHeading && <div className="head"><h2 id="events-next">{p.flagshipHeading}</h2></div>}
            <div className="event">
              <div className="top"><span className="when">{summitWhen()}{s.venue && ` · ${s.venue.toUpperCase()}`}</span></div>
              <h3>{s.name}</h3>
              {s.text && <p>{s.text}</p>}
              <div className="ctas">
                {s.primary.label && <Link className="btn btn-signal" href={s.primary.href}>{s.primary.label}</Link>}
                {s.secondary.label && <Link className="btn btn-ghost" href={s.secondary.href}>{s.secondary.label}</Link>}
              </div>
            </div>
          </div>
        </section>
      )}

      <CardSection id="events-formats" section={p.formats} band="paper" />

      {p.host.heading && (
        <section className="block band white" aria-labelledby="events-host">
          <div className="wrap split">
            <div className="prose">
              <h2 id="events-host">{p.host.heading}</h2>
              {p.host.text && <p>{p.host.text}</p>}
            </div>
            <div className="card" style={{ gap: 20 }}>
              {p.host.cardLabel && <span className="label">{p.host.cardLabel}</span>}
              {p.host.cardText && <p>{p.host.cardText}</p>}
              {p.host.links.length > 0 && (
                <div className="ctas">
                  {p.host.links.map((l, i) => <Link key={l.href} className={i === 0 ? "btn btn-ink" : "btn btn-ghost"} href={l.href}>{l.label}</Link>)}
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
