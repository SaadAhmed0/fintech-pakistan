import Link from "next/link";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Fintech Pakistan",
  description: "Fintech Pakistan is the community, stage and voice of fintech in Pakistan: a free community, sourced news and guides, and FP Live events.",
  path: "/about",
});

export default function About() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "About", path: "/about" }])} />
      <PageHero id="about-title" title="About Fintech Pakistan"
        lede="Fintech Pakistan is the community, stage and voice of fintech in Pakistan, and the markets it connects to." />

      <section className="block band paper" aria-labelledby="about-story">
        <div className="wrap">
          <div className="prose">
            <h2 id="about-story">What Fintech Pakistan is</h2>
            <p>Our mark is a pixel F with one missing piece. Add the block and it becomes a P. That piece is what we do: connect the people building financial services here with each other, with the market, and with the corridors money already moves through.</p>
            <p>We work alongside Pakistan&apos;s industry associations, regulators and banks. Our job is to bring them together.</p>
            <div className="ctas" style={{ marginTop: 28 }}>
              <Link className="btn btn-ink" href="/our-story">Our story</Link>
              <Link className="btn btn-ghost" href="/team">Meet the team</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="block band white" aria-labelledby="about-beliefs">
        <div className="wrap">
          <div className="head">
            <h2 id="about-beliefs">What we believe</h2>
          </div>
          <div className="grid-3">
            <div className="card"><span className="label">Open</span><h3>Free to join</h3><p>The community is free. Anyone working in or around fintech in Pakistan can join.</p></div>
            <div className="card"><span className="label">Builders</span><h3>Builders first</h3><p>The stories, stages and conversations belong to the people actually building.</p></div>
            <div className="card"><span className="label">Sourced</span><h3>Facts with receipts</h3><p>Every number we publish links back to where it came from.</p></div>
          </div>
        </div>
      </section>

      <section className="block band white" aria-labelledby="about-what">
        <div className="wrap">
          <div className="head">
            <h2 id="about-what">What we do</h2>
          </div>
          <div className="grid-4">
            <Link className="card" href="/community"><span className="label">FP Community</span><h3>Connect</h3><p>A free WhatsApp community with focused channels and monthly meetups.</p><span className="go">Community</span></Link>
            <Link className="card" href="/news"><span className="label">FP News</span><h3>Read</h3><p>Short, sourced articles on what is moving Pakistan&apos;s money.</p><span className="go">News</span></Link>
            <Link className="card" href="/events"><span className="label">FP Live</span><h3>Meet</h3><p>Meetups, roundtables and the Rails Summit.</p><span className="go">Events</span></Link>
            <Link className="card" href="/partners"><span className="label">FP Agency</span><h3>Reach</h3><p>Launches, stories and stages for fintechs that want the right audience.</p><span className="go">Partners</span></Link>
          </div>
        </div>
      </section>
    </>
  );
}
