import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { CardSection } from "@/components/Cards";
import { page } from "@/lib/cms";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export function generateMetadata() {
  return pageMetadata({ ...page("team").seo, path: "/team" });
}

function initials(name: string) {
  const parts = name.split(" ");
  return parts[0][0] + parts[parts.length - 1][0];
}

export default function Team() {
  const p = page("team");
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Team", path: "/team" }])} />
      <PageHero id="team-title" title={p.hero.title} lede={p.hero.lede || undefined} />

      {site.team.length > 0 && (
        <section className="block band paper" aria-labelledby="team-founders">
          <div className="wrap">
            {p.teamHeading && <div className="head"><h2 id="team-founders">{p.teamHeading}</h2></div>}
            <div className="grid-2">
              {site.team.map((m) => (
                <article key={m.name} className="card person">
                  <span className="monogram" aria-hidden="true">{initials(m.name)}</span>
                  <div className="person-body">
                    <h3>{m.name}</h3>
                    {m.role && <span className="label">{m.role}</span>}
                    {m.bio && <p>{m.bio}</p>}
                    {m.linkedin && <a className="go" href={m.linkedin} target="_blank" rel="noopener">LINKEDIN →</a>}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <CardSection id="team-involved" section={p.involved} />
    </>
  );
}
