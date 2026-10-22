import Link from "next/link";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import Partners from "@/components/Partners";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Partner With Fintech Pakistan: Events, Podcast and Launches",
  description: "Reach Pakistan's fintech founders, operators, banks and investors through FP Live events, the Money Moves podcast, the FP Community and launch campaigns.",
  path: "/partners",
});

export default function PartnersPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Partners", path: "/partners" }])} />
      <PageHero id="partners-title" eyebrow="Partners · FP Agency" title={<>Reach the people <span className="soft">who move the market.</span></>}
        lede="Already operating in Pakistan, or planning to enter? We put your company in front of the right audience through the channels this community already trusts.">
        <div className="ctas"><Link className="btn btn-signal" href="/contact?topic=Partnership">Talk to us <span className="arrow">→</span></Link></div>
      </PageHero>

      <section className="block band paper" aria-labelledby="partners-current">
        <div className="wrap">
          <div className="head">
            <span className="label">Our partners</span>
            <h2 id="partners-current">In good <span className="soft-accent">company.</span></h2>
            <p>The companies helping us build the room.</p>
          </div>
          <Partners />
        </div>
      </section>

      <section className="block band dark" aria-labelledby="partners-who">
        <div className="wrap">
          <div className="head">
            <span className="label">Who we work with</span>
            <h2 id="partners-who">Find your <span className="soft soft-accent">way in.</span></h2>
            <p>Different partners need different things from Pakistan&apos;s fintech scene. Start with the one that sounds like you.</p>
          </div>
          <div className="grid-3">
            <div className="card card-dark"><span className="label">Already here</span><h3>Fintechs in Pakistan</h3><p>Get seen by the people you want to hire, partner with and raise from.</p></div>
            <div className="card card-dark"><span className="label">Coming in</span><h3>Fintechs entering Pakistan</h3><p>Meet the ecosystem before you launch, and launch to an audience that&apos;s already paying attention.</p></div>
            <div className="card card-dark"><span className="label">Institutions</span><h3>Banks &amp; financial institutions</h3><p>Meet the fintechs you&apos;ll partner with, in a room built for it.</p></div>
            <div className="card card-dark"><span className="label">Capital</span><h3>Investors</h3><p>See who is building in Pakistan, and hear from them directly.</p></div>
            <div className="card card-dark"><span className="label">Vendors</span><h3>Service providers</h3><p>Reach the teams that buy legal, compliance, infrastructure and other services.</p></div>
            <div className="card card-dark"><span className="label">Ecosystem</span><h3>Associations &amp; communities</h3><p>Co-host events and share what matters across our audiences.</p></div>
          </div>
        </div>
      </section>

      <section className="block band paper" aria-labelledby="partners-formats">
        <div className="wrap">
          <div className="head">
            <span className="label">Ways to partner</span>
            <h2 id="partners-formats">Pick the stage <span className="soft-accent">that fits.</span></h2>
            <p>Every partnership is built around a goal, not a package. These are the formats we work with.</p>
          </div>
          <div className="grid-4">
            <Link className="card card-light" href="/events"><span className="label">FP Live</span><h3>Events</h3><p>Host a meetup, sponsor a roundtable or partner on the Rails Summit.</p><span className="go">SEE EVENTS →</span></Link>
            <Link className="card card-light" href="/podcast"><span className="label">FP Podcast</span><h3>Podcast</h3><p>Sponsor Money Moves, or a run of episodes on a topic you care about.</p><span className="go">SEE PODCAST →</span></Link>
            <Link className="card card-light" href="/community"><span className="label">FP Community</span><h3>Community</h3><p>Support the community and get in front of the people in it.</p><span className="go">SEE COMMUNITY →</span></Link>
            <Link className="card card-light" href="/contact?topic=Partnership"><span className="label">FP Agency</span><h3>Launch &amp; PR</h3><p>Go-to-market, founder stories and announcements told in a voice the ecosystem reads.</p><span className="go">TALK TO US →</span></Link>
          </div>
        </div>
      </section>

      <section className="block band white" aria-labelledby="partners-how">
        <div className="wrap">
          <div className="head">
            <span className="label">How it works</span>
            <h2 id="partners-how">From first call <span className="soft-accent">to launch.</span></h2>
          </div>
          <ol className="steps">
            <li><h3>Tell us your goal</h3><p>Who you want to reach and what you want them to do.</p></li>
            <li><h3>We suggest a format</h3><p>An event, a podcast run, a community launch, or a mix.</p></li>
            <li><h3>We launch it together</h3><p>We run it with you and share what came out of it.</p></li>
          </ol>
        </div>
      </section>
    </>
  );
}
