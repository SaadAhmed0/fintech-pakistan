import Link from "next/link";
import Figure from "@/components/Figure";
import { formatDate, getAllPosts, getTopics, type Post } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { page } from "@/lib/cms";
import { site, summitWhen } from "@/lib/site";

export function generateMetadata() {
  const { seo } = page("home");
  return pageMetadata({ title: seo.title, description: seo.description || site.description, path: "/", absoluteTitle: true });
}

const byline = (p: Post) => `${p.author} · ${formatDate(p.updated || p.date)}${p.readingTime >= 3 ? ` · ${p.readingTime} min read` : ""}`;

export default function Home() {
  const h = page("home");
  // Posts about ourselves stay out of the front page. It leads with reporting.
  const stories = getAllPosts().filter((p) => !p.tags.includes("From us") || p.label);
  const lead = stories.find((p) => p.lead) ?? stories[0];
  const rest = stories.filter((p) => p !== lead);
  const features = rest.filter((p) => p.chart).slice(0, 2);
  const latest = rest.filter((p) => !features.includes(p)).slice(0, 5);
  const summit = summitWhen();

  return (
    <>
      <section className="front-lead band" aria-labelledby="lead-title">
        <div className="wrap">
          <div className="front-title">
            <h1>{h.title}</h1>
            {h.subtitle && <p>{h.subtitle}</p>}
          </div>
          <div className="lead-grid">
            <Link className="lead-story" href={lead.path}>
              <span className="label">{lead.tags[0]}</span>
              <h2 id="lead-title">{lead.title}</h2>
              <p className="dek">{lead.description}</p>
              <p className="meta">{byline(lead)}</p>
            </Link>
            {lead.chart && <Figure chart={lead.chart} />}
          </div>
        </div>
      </section>

      <div className="band paper">
        <div className="wrap">
          <div className="front">
            <div className="features">
              {features.map((p) => (
                <article key={p.path}>
                  <Link className="feature" href={p.path}>
                    <span className="label">{p.tags[0]}</span>
                    <h3>{p.title}</h3>
                    <p>{p.description}</p>
                    <span className="meta">{byline(p)}</span>
                  </Link>
                  {p.chart && <Figure chart={p.chart} compact />}
                </article>
              ))}
            </div>

            <aside className="rail" aria-label="Latest">
              <h2>{h.latestHeading}</h2>
              <ol>
                {latest.map((p) => (
                  <li key={p.path}><Link href={p.path}><b>{p.title}</b><time dateTime={p.date}>{p.tags[0]}{p.label && ` · ${p.label}`} · {formatDate(p.updated || p.date)}</time></Link></li>
                ))}
              </ol>
              {h.community.title && (
                <div className="rail-note">
                  <b>{h.community.title}</b>
                  {h.community.text && <p>{h.community.text}</p>}
                  {h.community.buttonLabel && <Link className="btn btn-ink" href="/community" data-join>{h.community.buttonLabel}</Link>}
                </div>
              )}
            </aside>
          </div>

          {h.numbers.length > 0 && (
            <section className="section-line" aria-labelledby="home-numbers">
              <h2 id="home-numbers">{h.numbersHeading}</h2>
              <div className="data-desk">
                <div className="numbers">
                  {h.numbers.map((n) => (n.href
                    ? <Link key={n.value + n.text} className="stat" href={n.href}><b>{n.value}</b><span>{n.text}</span></Link>
                    : <div key={n.value + n.text} className="stat"><b>{n.value}</b><span>{n.text}</span></div>))}
                </div>
                {h.numbersChart && <Figure chart={h.numbersChart} compact />}
              </div>
            </section>
          )}

          <section className="section-line" aria-labelledby="home-topics">
            <h2 id="home-topics">{h.topicsHeading}</h2>
            <ul className="topic-list">
              {getTopics().map((t) => <li key={t.slug}><Link href={`/topics/${t.slug}`}><b>{t.name}</b><span>{t.description}</span></Link></li>)}
            </ul>
          </section>

          <section className="section-line" aria-labelledby="home-events">
            <h2 id="home-events"><Link href="/events">{h.eventsHeading}</Link></h2>
            <p className="dek-line">{site.summit.name}, {summit.charAt(0) + summit.slice(1).toLowerCase()}.{h.eventsText && ` ${h.eventsText}`}</p>
          </section>
        </div>
      </div>
    </>
  );
}
