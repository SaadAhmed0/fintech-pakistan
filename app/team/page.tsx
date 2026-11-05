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
      <PageHero id="team-title" eyebrow="Team" title={<>The team behind <span className="soft">Pakistan&apos;s fintech room.</span></>}
        lede={`Fintech Pakistan was co-founded by ${names}.`} />

      <section className="block band paper" aria-labelledby="team-founders">
        <div className="wrap">
          <div className="head">
            <span className="label">Co-founders</span>
            <h2 id="team-founders">Who is <span className="soft-accent">building this.</span></h2>
          </div>
          <div className="grid-2">
            {site.team.map((m) => (
              <article key={m.name} className="card card-light person">
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

      <section className="block band dark" aria-labelledby="team-involved">
        <div className="wrap">
          <div className="head">
            <span className="label">Get involved</span>
            <h2 id="team-involved">Build it <span className="soft soft-accent">with us.</span></h2>
            <p>The room gets better with the people in it. Here is where to start.</p>
          </div>
          <div className="grid-3">
            <Link className="card card-dark" href="/community"><span className="label">FP Community</span><h3>Join the room</h3><p>A free WhatsApp community for anyone working in or around fintech in Pakistan.</p><span className="go">COMMUNITY →</span></Link>
            <Link className="card card-dark" href="/events"><span className="label">FP Live</span><h3>Show up</h3><p>Meetups, closed-door roundtables and the Rails Summit in Lahore.</p><span className="go">EVENTS →</span></Link>
            <Link className="card card-dark" href="/partners"><span className="label">Partners</span><h3>Work with us</h3><p>For companies that want to build Pakistan&apos;s fintech ecosystem, not just sell into it.</p><span className="go">PARTNERS →</span></Link>
          </div>
        </div>
      </section>
    </>
  );
}
