import Link from "next/link";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { Equation } from "@/components/Mark";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Fintech Pakistan",
  description: "Fintech Pakistan is the community, stage and voice of fintech in Pakistan: a free community, a weekly podcast, sourced insights and FP Live events.",
  path: "/about",
});

export default function About() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "About", path: "/about" }])} />
      <PageHero id="about-title" eyebrow="About" mark="full" title={<>The missing <span className="soft">block.</span></>}
        lede="Fintech Pakistan is the community, stage and voice of fintech in Pakistan, and the markets it connects to." />

      <section className="block band paper" aria-labelledby="about-story">
        <div className="wrap split">
          <Equation />
          <div className="prose">
            <h2 id="about-story">Fintech, completed by Pakistan.</h2>
            <p>Our mark is a pixel F with one missing piece. Add the block and it becomes a P. That piece is what we do: connect the people building financial services here with each other, with the market, and with the corridors money already moves through.</p>
            <p>We work alongside Pakistan&apos;s industry associations, regulators and banks. Our job is the room where everyone meets.</p>
          </div>
        </div>
      </section>

      <section className="block band dark" aria-labelledby="about-beliefs">
        <div className="wrap">
          <div className="head">
            <span className="label">What we believe</span>
            <h2 id="about-beliefs">How we run <span className="soft soft-accent">the room.</span></h2>
          </div>
          <div className="grid-3">
            <div className="card card-dark"><span className="label">Open</span><h3>Free to join</h3><p>The community is free. Anyone working in or around fintech in Pakistan can join.</p></div>
            <div className="card card-dark"><span className="label">Builders</span><h3>Builders first</h3><p>The stories, stages and conversations belong to the people actually building.</p></div>
            <div className="card card-dark"><span className="label">Sourced</span><h3>Facts with receipts</h3><p>Every number we publish links back to where it came from.</p></div>
          </div>
        </div>
      </section>

      <section className="block band white" aria-labelledby="about-what">
        <div className="wrap">
          <div className="head">
            <span className="label">What we do</span>
            <h2 id="about-what">Four parts, <span className="soft-accent">one room.</span></h2>
          </div>
          <div className="grid-4">
            <Link className="card card-light" href="/community"><span className="label">FP Community</span><h3>Connect</h3><p>A free WhatsApp community with focused channels and monthly meetups.</p><span className="go">COMMUNITY →</span></Link>
            <Link className="card card-light" href="/podcast"><span className="label">FP Podcast</span><h3>Listen</h3><p>Money Moves, a weekly show with the people building Pakistan&apos;s rails.</p><span className="go">PODCAST →</span></Link>
            <Link className="card card-light" href="/events"><span className="label">FP Live</span><h3>Meet</h3><p>Meetups, roundtables and the Rails Summit.</p><span className="go">EVENTS →</span></Link>
            <Link className="card card-light" href="/partners"><span className="label">FP Agency</span><h3>Reach</h3><p>Launches, stories and stages for fintechs that want the right audience.</p><span className="go">PARTNERS →</span></Link>
          </div>
        </div>
      </section>
    </>
  );
}
