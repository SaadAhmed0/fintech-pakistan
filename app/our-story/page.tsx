import Link from "next/link";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Story",
  description: "Fintech Pakistan started when two colleagues at Sorbet saw that no agency or community was helping fintechs launch in Pakistan, so they decided to become one.",
  path: "/our-story",
});

export default function OurStory() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Our Story", path: "/our-story" }])} />
      <PageHero id="story-title" eyebrow="Our story" title={<>Pakistan had no launch partner. <span className="soft">So we became one.</span></>} />

      <section className="block band paper" aria-label="Our story">
        <div className="article">
          <div className="article-body">
            <p>Fintech Pakistan started with two colleagues and one question.</p>
            <p>Nauman Ali Murad and Saad Ahmed Siddiqui were working together at Sorbet, close to the stablecoin and neobank companies changing how money moves across borders. The more we saw of that world, the more one thing stood out.</p>
            <p>Other markets had plenty of help. There were agencies and communities whose whole job was launching a fintech into a new country: telling its story, finding its first users and opening the right doors.</p>
            <p>Pakistan had none of that. Crypto and fintech were taking off here, yet there wasn&apos;t a single place built to help a neobank launch in this market.</p>
            <p className="pull">If nobody was doing this for Pakistan, <em>why not us?</em></p>
            <p>So we decided to become that place. Fintech Pakistan is a home for the people building money here, and a launch partner for the companies coming to join them.</p>
            <p>We&apos;re just getting started, and the room is open.</p>
          </div>
          <div className="ctas" style={{ marginTop: 36 }}>
            <Link className="btn btn-ink" href="/team">Meet the team <span className="arrow">→</span></Link>
            <Link className="btn btn-ghost" href="/community" data-join>Join the community</Link>
          </div>
        </div>
      </section>
    </>
  );
}
