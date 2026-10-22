import Link from "next/link";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { GhostF } from "@/components/Mark";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { absoluteUrl, site, summitWhen } from "@/lib/site";

export const metadata = pageMetadata({
  title: "FP Live: Fintech Events, Meetups and the Rails Summit in Pakistan",
  description: "Monthly fintech meetups, closed-door roundtables and the Rails Summit in Lahore, the flagship stage for the people behind Pakistan's financial rails.",
  path: "/events",
});

function summitLd() {
  if (!site.summit.date) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: site.summit.name,
    description: "The flagship Fintech Pakistan event on the infrastructure under Pakistan's money: payments, remittances and the systems that connect them.",
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
  const ld = summitLd();
  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: "Events", path: "/events" }]), ...(ld ? [ld] : [])]} />
      <PageHero id="events-title" eyebrow="FP Live" title={<>Off the chat, <span className="soft">into the room.</span></>}
        lede="The community meets in person. Small, regular meetups keep people connected, and one flagship stage brings the whole ecosystem together." />

      <section className="block band paper" aria-labelledby="events-next">
        <div className="wrap">
          <div className="head">
            <span className="label">Flagship</span>
            <h2 id="events-next">The big one.</h2>
          </div>
          <div className="event">
            <GhostF fill="#13201A" />
            <div className="top"><span className="live">LIVE</span><span className="when">{summitWhen()}</span></div>
            <h3>The Rails <span className="soft">Summit.</span></h3>
            <p>Our flagship event on the infrastructure under Pakistan&apos;s money: payments, remittances and the systems that connect them. Sponsorship and speaking slots are open.</p>
            <div className="ctas">
              <Link className="btn btn-signal" href="/contact?topic=Speaking%20at%20FP%20Live">Sponsor or speak <span className="arrow">→</span></Link>
              <Link className="btn btn-ghost" href="/community" style={{ color: "#F3F4EE" }}>Get notified in the community</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="block band green" aria-labelledby="events-formats">
        <div className="wrap">
          <div className="head">
            <span className="label">Formats</span>
            <h2 id="events-formats">Three ways <span className="soft">we meet.</span></h2>
            <p>Each format has a different job, from keeping people in touch to putting the whole ecosystem on one stage.</p>
          </div>
          <div className="grid-3">
            <div className="card card-dark"><span className="label">Monthly</span><h3>Meetups</h3><p>Informal evenings for founders and operators to meet the people they&apos;ve been messaging. Open to community members.</p></div>
            <div className="card card-dark"><span className="label">Closed door</span><h3>Roundtables</h3><p>Small, focused sessions on a single problem, with the people who own it. By invitation.</p></div>
            <div className="card card-dark"><span className="label">Flagship</span><h3>The Rails Summit</h3><p>One day, one stage, the whole ecosystem. Talks, panels and the people behind Pakistan&apos;s financial rails.</p></div>
          </div>
        </div>
      </section>

      <section className="block band white" aria-labelledby="events-host">
        <div className="wrap split">
          <div className="prose">
            <span className="label" style={{ color: "var(--slate)" }}>Host with us</span>
            <h2 id="events-host" style={{ marginTop: 20 }}>Put your name <span className="soft-accent">on the room.</span></h2>
            <p>Host a meetup at your office, sponsor a roundtable on the problem you solve, or partner on the Rails Summit.</p>
          </div>
          <div className="card card-light" style={{ gap: 20 }}>
            <span className="label">Running your own fintech event in Pakistan?</span>
            <p>Tell us about it and we&apos;ll share it with the community.</p>
            <div className="ctas">
              <Link className="btn btn-ink" href="/contact?topic=Partnership">Partner on an event <span className="arrow">→</span></Link>
              <Link className="btn btn-ghost" href="/contact?topic=Share%20an%20event">Share your event</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
