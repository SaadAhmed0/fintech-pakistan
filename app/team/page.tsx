import Link from "next/link";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const names = site.team.map((m) => m.name).join(" and ");

export const metadata = pageMetadata({
  title: "Team",
  description: `Meet the team behind Fintech Pakistan. The community was co-founded by ${names}.`,
  path: "/team",
});

function initials(name: string) {
  const parts = name.split(" ");
  return parts[0][0] + parts[parts.length - 1][0];
}

export default function Team() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Team", path: "/team" }])} />
      <PageHero id="team-title" title="Our team"
        lede={`Fintech Pakistan was co-founded by ${names}.`} />

      <section className="block band paper" aria-labelledby="team-founders">
        <div className="wrap">
          <div className="head">
            <h2 id="team-founders">Co-founders</h2>
          </div>
          <div className="grid-2">
            {site.team.map((m) => (
              <article key={m.name} className="card person">
                <span className="monogram" aria-hidden="true">{initials(m.name)}</span>
                <div className="person-body">
                  <h3>{m.name}</h3>
                  <span className="label">{m.role}</span>
                  {m.bio && <p>{m.bio}</p>}
                  {m.linkedin && <a className="go" href={m.linkedin} target="_blank" rel="noopener">LINKEDIN →</a>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="block band white" aria-labelledby="team-involved">
        <div className="wrap">
          <div className="head">
            <h2 id="team-involved">Get involved</h2>
            <p>Three ways to take part.</p>
          </div>
          <div className="grid-3">
            <Link className="card" href="/community"><span className="label">FP Community</span><h3>Join the community</h3><p>A free WhatsApp community for anyone working in or around fintech in Pakistan.</p><span className="go">Community</span></Link>
            <Link className="card" href="/events"><span className="label">FP Live</span><h3>Show up</h3><p>Meetups, closed-door roundtables and the Rails Summit in Lahore.</p><span className="go">Events</span></Link>
            <Link className="card" href="/partners"><span className="label">Partners</span><h3>Work with us</h3><p>For companies that want to build Pakistan&apos;s fintech ecosystem, not just sell into it.</p><span className="go">Partners</span></Link>
          </div>
        </div>
      </section>
    </>
  );
}
