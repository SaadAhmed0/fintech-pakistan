import Link from "next/link";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import Partners from "@/components/Partners";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { getPartners } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Partner With Fintech Pakistan: Events and Community",
  description: "Fintech Pakistan partners include Sorbet, Karsa and Crypto Awaz. Reach Pakistan's fintech founders, operators, banks and investors through events and community.",
  path: "/partners",
});

export default function PartnersPage() {
  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: "Partners", path: "/partners" }]), {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Fintech Pakistan partners",
        itemListElement: getPartners().map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, url: absoluteUrl(`/partners/${p.slug}`) })),
      }]} />
      <PageHero id="partners-title" title="Work with Fintech Pakistan"
        lede="Already operating in Pakistan, or planning to enter? We put your company in front of the right audience through the channels this community already trusts.">
        <div className="ctas"><Link className="btn btn-signal" href="/contact?topic=Partnership">Talk to us</Link></div>
      </PageHero>

      <section className="block band paper" aria-labelledby="partners-current">
        <div className="wrap">
          <div className="head">
            <h2 id="partners-current">Our partners</h2>
            <p>The companies we work with.</p>
          </div>
          <Partners />
        </div>
      </section>

      <section className="block band white" aria-labelledby="partners-who">
        <div className="wrap">
          <div className="head">
            <h2 id="partners-who">Who we work with</h2>
            <p>Different partners need different things from Pakistan&apos;s fintech scene. Start with the one that sounds like you.</p>
          </div>
          <div className="grid-3">
            <div className="card"><span className="label">Already here</span><h3>Fintechs in Pakistan</h3><p>Get seen by the people you want to hire, partner with and raise from.</p></div>
            <div className="card"><span className="label">Coming in</span><h3>Fintechs entering Pakistan</h3><p>Meet the ecosystem before you launch, and launch to an audience that&apos;s already paying attention.</p></div>
            <div className="card"><span className="label">Institutions</span><h3>Banks &amp; financial institutions</h3><p>Meet the fintechs you&apos;ll partner with, in a room built for it.</p></div>
            <div className="card"><span className="label">Capital</span><h3>Investors</h3><p>See who is building in Pakistan, and hear from them directly.</p></div>
            <div className="card"><span className="label">Vendors</span><h3>Service providers</h3><p>Reach the teams that buy legal, compliance, infrastructure and other services.</p></div>
            <div className="card"><span className="label">Ecosystem</span><h3>Associations &amp; communities</h3><p>Co-host events and share what matters across our audiences.</p></div>
          </div>
        </div>
      </section>

      <section className="block band paper" aria-labelledby="partners-formats">
        <div className="wrap">
          <div className="head">
            <h2 id="partners-formats">Ways to partner</h2>
            <p>Every partnership is built around a goal, not a package. These are the formats we work with.</p>
          </div>
          <div className="grid-3">
            <Link className="card" href="/events"><span className="label">FP Live</span><h3>Events</h3><p>Host a meetup, sponsor a roundtable or partner on the Rails Summit.</p><span className="go">See events</span></Link>
            <Link className="card" href="/community"><span className="label">FP Community</span><h3>Community</h3><p>Support the community and get in front of the people in it.</p><span className="go">See community</span></Link>
            <Link className="card" href="/contact?topic=Partnership"><span className="label">FP Agency</span><h3>Launch &amp; PR</h3><p>Go-to-market, founder stories and announcements told in a voice the ecosystem reads.</p><span className="go">Talk to us</span></Link>
          </div>
        </div>
      </section>

      <section className="block band white" aria-labelledby="partners-how">
        <div className="wrap">
          <div className="head">
            <h2 id="partners-how">How it works</h2>
          </div>
          <ol className="steps">
            <li><h3>Tell us your goal</h3><p>Who you want to reach and what you want them to do.</p></li>
            <li><h3>We suggest a format</h3><p>An event, a community launch, or a mix.</p></li>
            <li><h3>We launch it together</h3><p>We run it with you and share what came out of it.</p></li>
          </ol>
        </div>
      </section>
    </>
  );
}
