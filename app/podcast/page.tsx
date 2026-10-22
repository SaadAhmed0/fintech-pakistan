import Link from "next/link";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { GhostF } from "@/components/Mark";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Money Moves: The Weekly Pakistan Fintech Podcast",
  description: "Weekly conversations with the founders, operators and regulators building how Pakistan pays, saves and sends, across PK, MENA and Southeast Asia.",
  path: "/podcast",
});

export default function Podcast() {
  const cover = (
    <div className="hero-mark">
      <div className="cover" aria-hidden="true">
        <GhostF />
        <span className="label">The podcast</span>
        <span className="title">Money<br />Moves.</span>
        <span className="eq">{Array.from({ length: 10 }, (_, i) => <i key={i} style={{ ["--i" as string]: i }} />)}</span>
        <span className="meta"><span>WEEKLY</span><span>PK · MENA · SEA</span></span>
      </div>
    </div>
  );
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Podcast", path: "/podcast" }])} />
      <PageHero id="podcast-title" eyebrow="FP Podcast · Weekly" title={<>Money <span className="soft">Moves.</span></>}
        lede="Weekly conversations with the founders, operators and regulators building how Pakistan pays, saves and sends." aside={cover}>
        <div className="facts">
          <div><span className="label">Cadence</span><b>Weekly</b></div>
          <div><span className="label">Guests</span><b>Builders</b></div>
          <div><span className="label">Corridors</span><b>PK · MENA · SEA</b></div>
        </div>
      </PageHero>

      <section className="block band paper" aria-labelledby="podcast-topics">
        <div className="wrap">
          <div className="head">
            <span className="label">What we talk about</span>
            <h2 id="podcast-topics">How money actually <span className="soft-accent">moves here.</span></h2>
            <p>Practical conversations about building financial services in Pakistan, and across the corridors that connect it to the Gulf and Southeast Asia.</p>
          </div>
          <div className="grid-4">
            <Link className="card card-light" href="/insights/raast-instant-payments-explained"><span className="label">Rails</span><h3>Payments</h3><p>The systems that move money inside Pakistan, and who is building on them.</p><span className="go">READ: RAAST →</span></Link>
            <Link className="card card-light" href="/insights/pakistan-remittances-fy26-record"><span className="label">Corridors</span><h3>Remittances</h3><p>Money moving between Pakistan, the Gulf and Southeast Asia.</p><span className="go">READ: FY26 RECORD →</span></Link>
            <Link className="card card-light" href="/insights/pvara-virtual-asset-licensing"><span className="label">Policy</span><h3>Regulation</h3><p>What the rules are, how they&apos;re changing, and what that means for builders.</p><span className="go">READ: PVARA →</span></Link>
            <Link className="card card-light" href="/insights/pakistan-digital-banks-status"><span className="label">Company</span><h3>Building</h3><p>Hiring, fundraising and scaling a fintech in Pakistan.</p><span className="go">READ: DIGITAL BANKS →</span></Link>
          </div>
        </div>
      </section>

      <section className="block band dark" aria-labelledby="podcast-guest">
        <div className="wrap split">
          <div className="prose">
            <span className="label" style={{ color: "var(--mist-2)" }}>Be a guest</span>
            <h2 id="podcast-guest" style={{ marginTop: 20 }}>Built something worth <span className="soft soft-accent">talking about?</span></h2>
            <p>We&apos;re looking for people who have built, regulated or funded financial services in Pakistan or the corridors around it. Suggest yourself or someone you know.</p>
          </div>
          <div className="card card-dark" style={{ gap: 20 }}>
            <span className="label">Good guests have</span>
            <ul className="ticks">
              <li>Shipped a product or policy used by real customers</li>
              <li>A specific story, not a pitch</li>
              <li>Something they&apos;d do differently next time</li>
            </ul>
            <div className="ctas" style={{ marginTop: 8 }}>
              <Link className="btn btn-signal" href="/contact?topic=Podcast%20guest">Pitch a guest <span className="arrow">→</span></Link>
              <Link className="btn btn-ghost" href="/partners">Sponsor the show</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
