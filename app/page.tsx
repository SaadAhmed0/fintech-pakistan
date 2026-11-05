import Link from "next/link";
import HeroGrid from "@/components/HeroGrid";
import CycleWord from "@/components/CycleWord";
import PostCard from "@/components/PostCard";
import { GhostF } from "@/components/Mark";
import CompanyCard from "@/components/CompanyCard";
import { getCompanies, getGuides, getNews } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { site, summitWhen } from "@/lib/site";
import Partners from "@/components/Partners";
import PakistanMap from "@/components/PakistanMap";
import CorridorMap from "@/components/CorridorMap";

export const metadata = pageMetadata({
  title: "Fintech Pakistan: Stablecoin Neobank News and Directory",
  description: site.description,
  path: "/",
  absoluteTitle: true,
});

const TOPICS = ["COMMUNITY MEETUPS", "BUILDING FINTECH IN PAKISTAN", "FOUNDER STORIES", "PRODUCT LAUNCHES", "JOBS AND OPPORTUNITIES", "FP LIVE", "THE RAILS SUMMIT", "ASK AND HELP"];

export default function Home() {
  const news = getNews().slice(0, 3);
  const guides = getGuides().slice(0, 3);
  const companies = getCompanies().filter((c) => c.indexable).slice(0, 6);
  return (
    <>
      <section className="hero home-hero band" aria-labelledby="home-title">
        <HeroGrid />
        <div className="wrap hero-inner">
          <div>
            <span className="label eyebrow">News · Companies · Guides</span>
            <h1 id="home-title">Pakistan&apos;s stablecoin neobanks, <span className="soft">tracked.</span></h1>
            <CycleWord />
            <p className="lede">{site.description}</p>
            <div className="ctas">
              <Link className="btn btn-signal" href="/news">Read the latest news <span className="arrow">→</span></Link>
              <Link className="btn btn-ghost" href="/companies">Browse companies</Link>
            </div>
          </div>
          <PakistanMap />
        </div>
      </section>

      <div className="marquee" aria-label="What happens at Fintech Pakistan">
        <div className="marquee-track">
          <div className="marquee-group">{TOPICS.map((t) => <span key={t}>{t}</span>)}</div>
          <div className="marquee-group" aria-hidden="true">{TOPICS.map((t) => <span key={t}>{t}</span>)}</div>
        </div>
      </div>

      <section className="block band paper" aria-labelledby="home-latest">
        <div className="wrap">
          <div className="head">
            <span className="label">News</span>
            <h2 id="home-latest">Latest from <span className="soft-accent">Pakistan&apos;s fintech.</span></h2>
            <p>Launches, funding and regulation, with every claim sourced.</p>
          </div>
          <div className="grid-3">{news.map((p) => <PostCard key={p.path} post={p} />)}</div>
          <div className="ctas" style={{ marginTop: 32 }}><Link className="btn btn-ink" href="/news">All news <span className="arrow">→</span></Link></div>
        </div>
      </section>

      <section className="block band dark" aria-labelledby="home-directory">
        <div className="wrap">
          <div className="head">
            <span className="label">Company directory</span>
            <h2 id="home-directory">Who actually <span className="soft-accent">serves Pakistan.</span></h2>
            <p>One profile per company, showing what is confirmed, what is only reported, and when we last checked.</p>
          </div>
          <div className="grid-3">{companies.map((c) => <CompanyCard key={c.slug} company={c} />)}</div>
          <div className="ctas" style={{ marginTop: 32 }}><Link className="btn btn-signal" href="/companies">Browse the directory <span className="arrow">→</span></Link></div>
        </div>
      </section>

      <section className="block band paper" aria-labelledby="home-guides">
        <div className="wrap">
          <div className="head">
            <span className="label">Guides</span>
            <h2 id="home-guides">How it works, <span className="soft-accent">in plain English.</span></h2>
          </div>
          <div className="grid-3">{guides.map((p) => <PostCard key={p.path} post={p} />)}</div>
          <div className="ctas" style={{ marginTop: 32 }}><Link className="btn btn-ink" href="/guides">All guides <span className="arrow">→</span></Link></div>
        </div>
      </section>

      <section className="block band white on-light" aria-labelledby="home-numbers">
        <div className="wrap">
          <div className="head">
            <span className="label">By the numbers</span>
            <h2 id="home-numbers">Pakistan&apos;s money, <span className="soft-accent">right now.</span></h2>
            <p>The latest public figures on how Pakistan pays, sends and regulates money. Each one opens the article it comes from.</p>
          </div>
          <div className="grid-4">
            <Link className="stat" href="/news/pakistan-digital-payments-92-percent">
              <span className="num"><span className="count" data-to="92" data-dec="0">92</span><em>%</em></span>
              <p>of retail payments were digital, January to March 2026</p>
              <span className="src">STATE BANK OF PAKISTAN →</span>
            </Link>
            <Link className="stat" href="/guides/raast-instant-payments-explained">
              <span className="num"><span className="count" data-to="742.1" data-dec="1">742.1</span><em>M</em></span>
              <p>Raast instant payments in a single quarter, January to March 2026</p>
              <span className="src">STATE BANK OF PAKISTAN →</span>
            </Link>
            <Link className="stat" href="/news/pakistan-remittances-fy26-record">
              <span className="num"><em>$</em><span className="count" data-to="41.6" data-dec="1">41.6</span><em>B</em></span>
              <p>in workers&apos; remittances in FY26, a record year</p>
              <span className="src">STATE BANK OF PAKISTAN →</span>
            </Link>
            <Link className="stat" href="/guides/pvara-virtual-asset-licensing">
              <span className="num"><span className="count" data-to="10" data-dec="0">10</span></span>
              <p>licence categories under Pakistan&apos;s new virtual asset regime</p>
              <span className="src">PVARA · AUG 2026 →</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="block band paper on-light" aria-labelledby="home-community">
        <div className="wrap split top">
          <div className="prose">
            <span className="label" style={{ color: "var(--slate)" }}>FP Community</span>
            <h2 id="home-community" style={{ marginTop: 20 }}>Pakistan&apos;s fintech <span className="soft-accent">finally has a room.</span></h2>
            <p>Four focused channels, so you get the conversations you care about without the noise.</p>
            <div className="chips" style={{ marginTop: 28 }}>
              <span className="chip">General</span><span className="chip">News &amp; Regulation</span><span className="chip">Ask &amp; Help</span><span className="chip">Jobs &amp; Opportunities</span>
            </div>
          </div>
          <div className="join-card">
            <h3>The room is open. <span className="soft">Pull up a chair.</span></h3>
            <p>Free for anyone working in or around fintech in Pakistan.</p>
            <ul className="ticks">
              <li>News, founder stories and regulation in one place</li>
              <li>Monthly meetups with people building the same things</li>
              <li>First to hear about FP Live events</li>
            </ul>
            <Link className="btn btn-signal" href="/community" data-join>How to join <span className="arrow">→</span></Link>
          </div>
        </div>
      </section>

      <section className="block band dark" aria-labelledby="home-corridors">
        <div className="wrap corridors">
          <div className="prose">
            <span className="label" style={{ color: "var(--mist-2)" }}>PK · MENA · SEA</span>
            <h2 id="home-corridors" style={{ marginTop: 20 }}>Money crosses borders. <span className="soft soft-accent">So do we.</span></h2>
            <p>Pakistan&apos;s financial story runs through the Gulf and Southeast Asia. In May 2026, Saudi Arabia and the UAE together sent $2.04 billion of a record $4.25 billion in monthly remittances.</p>
            <div className="ctas" style={{ marginTop: 32 }}><Link className="btn btn-signal" href="/news/pakistan-remittances-fy26-record">Read the remittance story <span className="arrow">→</span></Link></div>
          </div>
          <CorridorMap />
        </div>
      </section>

      <section className="block band white" aria-labelledby="home-stage">
        <div className="wrap">
          <div className="head">
            <span className="label">On stage</span>
            <h2 id="home-stage">Read up, <span className="soft-accent">then show up.</span></h2>
          </div>
          <Link className="event compact" href="/events">
            <GhostF fill="#13201A" />
            <div className="top"><span className="live">LIVE</span><span className="when">{summitWhen()}</span></div>
            <h3>The Rails <span className="soft">Summit.</span></h3>
            <p>Our flagship event on the infrastructure under Pakistan&apos;s money.</p>
          </Link>
        </div>
      </section>

      <section className="block band white" aria-labelledby="home-partners">
        <div className="wrap">
          <div className="head">
            <span className="label">Partners</span>
            <h2 id="home-partners">In good <span className="soft-accent">company.</span></h2>
            <p>We work with companies that want to build Pakistan&apos;s fintech ecosystem, not just sell into it.</p>
          </div>
          <Partners />
        </div>
      </section>
    </>
  );
}
