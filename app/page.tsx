import Link from "next/link";
import { formatDate, getAllPosts, getTopics, type Post } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { site, summitWhen } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Fintech Pakistan: Fintech News and Company Directory",
  description: site.description,
  path: "/",
  absoluteTitle: true,
});

const NUMBERS = [
  { value: "92%", text: "of retail payments were digital, January to March 2026", href: "/news/pakistan-digital-payments-92-percent" },
  { value: "2.76B", text: "Raast payments in FY26, on provisional figures", href: "/guides/raast-instant-payments-explained" },
  { value: "$41.6B", text: "in workers' remittances in FY26, a record", href: "/news/pakistan-remittances-fy26-record" },
  { value: "11", text: "licence categories under PVARA's regime", href: "/guides/pvara-virtual-asset-licensing" },
];

const byline = (p: Post) => `${p.author} · ${formatDate(p.updated || p.date)}${p.readingTime >= 3 ? ` · ${p.readingTime} min read` : ""}`;

export default function Home() {
  // Posts about ourselves stay out of the front page. It leads with reporting.
  const stories = getAllPosts().filter((p) => !p.tags.includes("From us") || p.label);
  const lead = stories.find((p) => p.lead) ?? stories[0];
  const rest = stories.filter((p) => p !== lead);
  const features = rest.filter((p) => p.readingTime >= 3).slice(0, 2);
  const latest = rest.filter((p) => !features.includes(p)).slice(0, 5);
  const summit = summitWhen();

  return (
    <div className="band paper">
      <div className="wrap">
        <div className="front-title">
          <h1>Pakistan&apos;s fintech, tracked.</h1>
          <p>News, guides and a company directory, with every number sourced.</p>
        </div>

        <div className="front">
          <div>
            <article>
              <Link className="lead-story" href={lead.path}>
                <span className="label">{lead.tags[0]}</span>
                <h2>{lead.title}</h2>
                <p className="dek">{lead.description}</p>
                <p className="meta">{byline(lead)}</p>
              </Link>
            </article>
            {features.length > 0 && (
              <div className="features">
                {features.map((p) => (
                  <article key={p.path}>
                    <Link className="feature" href={p.path}>
                      <span className="label">{p.tags[0]}</span>
                      <h3>{p.title}</h3>
                      <p>{p.description}</p>
                      <span className="meta">{byline(p)}</span>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>

          <aside className="rail" aria-label="Latest">
            <h2>Latest</h2>
            <ol>
              {latest.map((p) => (
                <li key={p.path}><Link href={p.path}><b>{p.title}</b><time dateTime={p.date}>{p.tags[0]}{p.label && ` · ${p.label}`} · {formatDate(p.updated || p.date)}</time></Link></li>
              ))}
            </ol>
            <div className="rail-note">
              <b>Join the community</b>
              <p>A free WhatsApp group for people working in fintech in Pakistan.</p>
              <Link className="btn btn-ink" href="/community" data-join>How to join</Link>
            </div>
          </aside>
        </div>

        <section className="section-line" aria-labelledby="home-numbers">
          <h2 id="home-numbers">The numbers</h2>
          <div className="numbers">
            {NUMBERS.map((n) => <Link key={n.value} className="stat" href={n.href}><b>{n.value}</b><span>{n.text}</span></Link>)}
          </div>
        </section>

        <section className="section-line" aria-labelledby="home-topics">
          <h2 id="home-topics">Browse by topic</h2>
          <div className="filters">
            {getTopics().map((t) => <Link key={t.slug} className="filter" href={`/topics/${t.slug}`}>{t.name}</Link>)}
          </div>
        </section>

        <section className="section-line" aria-labelledby="home-events">
          <h2 id="home-events"><Link href="/events">Events</Link></h2>
          <p className="dek-line">{site.summit.name}, {summit.charAt(0) + summit.slice(1).toLowerCase()}. Our flagship event on the infrastructure under Pakistan&apos;s money.</p>
        </section>
      </div>
    </div>
  );
}
