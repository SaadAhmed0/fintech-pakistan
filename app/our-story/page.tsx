import Link from "next/link";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { Equation } from "@/components/Mark";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Our Story",
  description: "Pakistan's fintech scene has the builders. It was missing a room. This is why Fintech Pakistan exists and what we're building.",
  path: "/our-story",
});

export default function OurStory() {
  const founders = site.team.map((m) => m.name).join(" and ");
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Our Story", path: "/our-story" }])} />
      <PageHero id="story-title" eyebrow="Our story" title={<>Pakistan had the builders. <span className="soft">It was missing a room.</span></>}
        lede="Fintech Pakistan exists to put the people building money in Pakistan in the same conversation." />

      <section className="block band white on-light" aria-labelledby="story-gap">
        <div className="wrap split top">
          <div className="prose">
            <span className="label" style={{ color: "var(--slate)" }}>The gap</span>
            <h2 id="story-gap" style={{ marginTop: 20 }}>Everyone was building. <span className="soft-accent">Nobody shared a room.</span></h2>
          </div>
          <div className="prose">
            <p>The people building financial services in Pakistan are spread across companies, cities and countries. Founders, operators, regulators and banks rarely end up in the same conversation.</p>
            <p>Fintechs arriving from abroad don&apos;t know where to start. {founders} started Fintech Pakistan to fix that.</p>
          </div>
        </div>
      </section>

      <section className="block band paper" aria-labelledby="story-mark">
        <div className="wrap split">
          <Equation />
          <div className="prose">
            <span className="label" style={{ color: "var(--slate)" }}>The name</span>
            <h2 id="story-mark" style={{ marginTop: 20 }}>One block turns an F into a P.</h2>
            <p>Our mark is a pixel F with one block missing. Add the block and the F becomes a P. Fintech, completed by Pakistan.</p>
            <p>That block is the job we&apos;ve taken on: connecting the people building financial services here with each other, with the market, and with the corridors money already moves through.</p>
          </div>
        </div>
      </section>

      <section className="block band dark" aria-labelledby="story-building">
        <div className="wrap">
          <div className="head">
            <span className="label">What we&apos;re building</span>
            <h2 id="story-building">From group chat <span className="soft soft-accent">to main stage.</span></h2>
            <p>It all runs under one name, and every part feeds the others.</p>
          </div>
          <div className="grid-4">
            <Link className="card card-dark" href="/community"><span className="label">FP Community</span><h3>Connect</h3><p>A free WhatsApp community with four focused channels.</p><span className="go">COMMUNITY →</span></Link>
            <Link className="card card-dark" href="/insights"><span className="label">FP Insights</span><h3>Read</h3><p>Short articles where every number links to its source.</p><span className="go">INSIGHTS →</span></Link>
            <Link className="card card-dark" href="/events"><span className="label">FP Live</span><h3>Meet</h3><p>Monthly meetups, closed-door roundtables and the Rails Summit in Lahore.</p><span className="go">EVENTS →</span></Link>
            <Link className="card card-dark" href="/partners"><span className="label">FP Agency</span><h3>Reach</h3><p>Launches, stories and stages for fintechs that want to reach this audience.</p><span className="go">PARTNERS →</span></Link>
          </div>
        </div>
      </section>

      <section className="block band white on-light" aria-labelledby="story-alongside">
        <div className="wrap split">
          <div className="prose">
            <span className="label" style={{ color: "var(--slate)" }}>How we fit in</span>
            <h2 id="story-alongside" style={{ marginTop: 20 }}>Alongside, <span className="soft-accent">not instead.</span></h2>
          </div>
          <div className="prose">
            <p>Pakistan already has industry associations doing policy and advocacy work. We don&apos;t replace them. We&apos;re the room where everyone meets, and we&apos;d like them in it.</p>
            <div className="ctas" style={{ marginTop: 28 }}><Link className="btn btn-ink" href="/team">Meet the team <span className="arrow">→</span></Link></div>
          </div>
        </div>
      </section>
    </>
  );
}
