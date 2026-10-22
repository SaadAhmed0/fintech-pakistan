import Link from "next/link";
import HeroGrid from "@/components/HeroGrid";
import CycleWord from "@/components/CycleWord";
import PostCard from "@/components/PostCard";
import { Equation, GhostF, HeroMark } from "@/components/Mark";
import { getAllPosts } from "@/lib/posts";
import { pageMetadata } from "@/lib/seo";
import { site, summitWhen } from "@/lib/site";
import Partners from "@/components/Partners";

export const metadata = pageMetadata({
  title: "Fintech Pakistan: Community, Podcast, Events and Insights",
  description: site.description,
  path: "/",
  absoluteTitle: true,
});

const TOPICS = ["RAAST", "DIGITAL BANKS", "REMITTANCES", "VIRTUAL ASSETS", "MERCHANT PAYMENTS", "REGULATION", "PK · MENA · SEA", "FP LIVE", "MONEY MOVES"];

export default function Home() {
  const posts = getAllPosts().slice(0, 3);
  return (
    <>
      <section className="hero band" aria-labelledby="home-title">
        <HeroGrid />
        <div className="wrap hero-inner">
          <div>
            <span className="label eyebrow">Community · Podcast · Events · Insights</span>
            <h1 id="home-title">Where Pakistan&apos;s fintech <span className="soft">connects.</span></h1>
            <CycleWord />
            <p className="lede">The community, stage and voice of fintech in Pakistan, and the markets it connects to. For the founders, operators and regulators shaping how money moves here.</p>
            <div className="ctas">
              <Link className="btn btn-signal" href="/community">Join the community <span className="arrow">→</span></Link>
              <Link className="btn btn-ghost" href="/partners">Partner with us</Link>
            </div>
          </div>
          <HeroMark variant="full" />
        </div>
      </section>

      <div className="marquee" aria-label="Topics we cover">
        <div className="marquee-track">
          <div className="marquee-group">{TOPICS.map((t) => <span key={t}>{t}</span>)}</div>
          <div className="marquee-group" aria-hidden="true">{TOPICS.map((t) => <span key={t}>{t}</span>)}</div>
        </div>
      </div>

      <section className="block band paper" aria-labelledby="home-story">
        <div className="wrap split">
          <Equation />
          <div className="prose">
            <h2 id="home-story">One block turns an F into a P.</h2>
            <p>Fintech, completed by Pakistan. Pakistan&apos;s fintech scene has the builders. What it has been missing is a shared room where they meet, learn from each other and get seen.</p>
            <p>That room is what we&apos;re building: a free community, a weekly podcast, sourced insights and events that bring it all together.</p>
          </div>
        </div>
      </section>

      <section className="block band dark" aria-labelledby="home-ways">
        <div className="wrap">
          <div className="head">
            <span className="label">One brand, four ways in</span>
            <h2 id="home-ways">From group chat <span className="soft">to main stage.</span></h2>
            <p>A conversation in the community can become a podcast episode, a panel on stage, or a launch. It all runs under one name.</p>
          </div>
          <div className="grid-4">
            <Link className="card card-dark" href="/community">
              <span className="tag"><i style={{ background: "#0E7A4D" }}></i><b>FP</b> Community</span>
              <p>A free WhatsApp community with focused channels for news, questions and jobs, plus monthly meetups.</p>
              <span className="go">JOIN →</span>
            </Link>
            <Link className="card card-dark" href="/podcast">
              <span className="tag"><i style={{ background: "#F3F4EE" }}></i><b>FP</b> Podcast</span>
              <p>Money Moves. Weekly conversations with the people building Pakistan&apos;s financial rails.</p>
              <span className="go">LISTEN →</span>
            </Link>
            <Link className="card card-dark" href="/events">
              <span className="tag"><i style={{ background: "#8FB82A" }}></i><b>FP</b> Live</span>
              <p>Meetups, closed-door roundtables and the Rails Summit, our flagship stage.</p>
              <span className="go">SEE EVENTS →</span>
            </Link>
            <Link className="card card-dark" href="/partners">
              <span className="tag"><i style={{ background: "#5B6660" }}></i><b>FP</b> Agency</span>
              <p>Helping fintechs reach the right audience in Pakistan through launches, stories and stages.</p>
              <span className="go">PARTNER →</span>
            </Link>
          </div>
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
            <Link className="stat" href="/insights/pakistan-digital-payments-92-percent">
              <span className="num"><span className="count" data-to="92" data-dec="0">92</span><em>%</em></span>
              <p>of retail payments were digital, January to March 2026</p>
              <span className="src">STATE BANK OF PAKISTAN →</span>
            </Link>
            <Link className="stat" href="/insights/raast-instant-payments-explained">
              <span className="num"><span className="count" data-to="742.1" data-dec="1">742.1</span><em>M</em></span>
              <p>Raast instant payments in a single quarter, January to March 2026</p>
              <span className="src">STATE BANK OF PAKISTAN →</span>
            </Link>
            <Link className="stat" href="/insights/pakistan-remittances-fy26-record">
              <span className="num"><em>$</em><span className="count" data-to="41.6" data-dec="1">41.6</span><em>B</em></span>
              <p>in workers&apos; remittances in FY26, a record year</p>
              <span className="src">STATE BANK OF PAKISTAN →</span>
            </Link>
            <Link className="stat" href="/insights/pvara-virtual-asset-licensing">
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
            <Link className="btn btn-signal" href="/community">How to join <span className="arrow">→</span></Link>
          </div>
        </div>
      </section>

      <section className="block band dark" aria-labelledby="home-corridors">
        <div className="wrap split">
          <div className="prose">
            <span className="label" style={{ color: "var(--mist-2)" }}>PK · MENA · SEA</span>
            <h2 id="home-corridors" style={{ marginTop: 20 }}>Money crosses borders. <span className="soft soft-accent">So do we.</span></h2>
            <p>Pakistan&apos;s financial story runs through the Gulf and Southeast Asia. In May 2026, Saudi Arabia and the UAE together sent $2.04 billion of a record $4.25 billion in monthly remittances.</p>
            <div className="ctas" style={{ marginTop: 32 }}><Link className="btn btn-signal" href="/insights/pakistan-remittances-fy26-record">Read the remittance story <span className="arrow">→</span></Link></div>
          </div>
          <div className="corridor-wrap">
            <svg className="corridor" viewBox="0 0 640 400" role="img" aria-label="Diagram of payment corridors linking Karachi, Lahore and Islamabad with Riyadh, Dubai and Singapore">
              <text className="region" x="40" y="36">PAKISTAN</text>
              <text className="region" x="300" y="36">MENA</text>
              <text className="region" x="500" y="36">SOUTHEAST ASIA</text>
              <path id="r1" className="route hot" d="M120 300 Q 230 160 370 210" />
              <path id="r2" className="route hot" d="M120 300 Q 260 330 340 290" />
              <path className="route" d="M150 170 Q 260 120 370 210" />
              <path className="route" d="M110 100 Q 220 220 340 290" />
              <path id="r3" className="route hot" d="M370 210 Q 470 150 560 300" />
              <path className="route" d="M120 300 Q 340 420 560 300" />
              <g>
                <rect className="node hub" x="110" y="290" width="20" height="20" rx="3" /><rect className="ring" x="110" y="290" width="20" height="20" rx="3" />
                <rect className="node" x="140" y="160" width="20" height="20" rx="3" />
                <rect className="node" x="100" y="90" width="20" height="20" rx="3" />
                <rect className="node hub" x="360" y="200" width="20" height="20" rx="3" /><rect className="ring" x="360" y="200" width="20" height="20" rx="3" style={{ animationDelay: ".8s" }} />
                <rect className="node" x="330" y="280" width="20" height="20" rx="3" />
                <rect className="node hub" x="550" y="290" width="20" height="20" rx="3" /><rect className="ring" x="550" y="290" width="20" height="20" rx="3" style={{ animationDelay: "1.6s" }} />
              </g>
              <text x="96" y="342">KHI</text>
              <text x="170" y="176">LHE</text>
              <text x="130" y="106">ISB</text>
              <text x="390" y="200">DXB</text>
              <text x="360" y="315">RUH</text>
              <text x="580" y="307">SIN</text>
              <rect className="traveller" width="10" height="10" rx="2" x="-5" y="-5" fill="#C6F24E"><animateMotion dur="3.2s" repeatCount="indefinite"><mpath href="#r1" /></animateMotion></rect>
              <rect className="traveller" width="10" height="10" rx="2" x="-5" y="-5" fill="#C6F24E"><animateMotion dur="2.6s" begin="1s" repeatCount="indefinite"><mpath href="#r2" /></animateMotion></rect>
              <rect className="traveller" width="10" height="10" rx="2" x="-5" y="-5" fill="#F3F4EE"><animateMotion dur="3.8s" begin=".5s" repeatCount="indefinite"><mpath href="#r3" /></animateMotion></rect>
            </svg>
          </div>
        </div>
      </section>

      <section className="block band white" aria-labelledby="home-onair">
        <div className="wrap">
          <div className="head">
            <span className="label">On air and on stage</span>
            <h2 id="home-onair">Listen in, <span className="soft-accent">then show up.</span></h2>
          </div>
          <div className="grid-2">
            <Link className="cover small" href="/podcast">
              <GhostF />
              <span className="label">The podcast</span>
              <span className="title">Money<br />Moves.</span>
              <span className="eq" aria-hidden="true">{Array.from({ length: 8 }, (_, i) => <i key={i} style={{ ["--i" as string]: i }} />)}</span>
              <span className="meta"><span>WEEKLY</span><span>PK · MENA · SEA</span></span>
            </Link>
            <Link className="event compact" href="/events">
              <GhostF fill="#13201A" />
              <div className="top"><span className="live">LIVE</span><span className="when">{summitWhen()}</span></div>
              <h3>The Rails <span className="soft">Summit.</span></h3>
              <p>Our flagship event on the infrastructure under Pakistan&apos;s money.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="block band paper" aria-labelledby="home-latest">
        <div className="wrap">
          <div className="head">
            <span className="label">Insights</span>
            <h2 id="home-latest">Latest <span className="soft-accent">reads.</span></h2>
            <p>Short, sourced articles on what is moving Pakistan&apos;s money.</p>
          </div>
          <div className="grid-3">{posts.map((p) => <PostCard key={p.slug} post={p} />)}</div>
          <div className="ctas" style={{ marginTop: 32 }}><Link className="btn btn-ink" href="/insights">All insights <span className="arrow">→</span></Link></div>
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
