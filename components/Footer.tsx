import Link from "next/link";
import { site } from "@/lib/site";
import { getPartners } from "@/lib/content";
import { LogoIcon } from "./Mark";

export default function Footer() {
  const social = Object.entries(site.social).filter(([, u]) => u);
  const labels: Record<string, string> = { linkedin: "Follow us on LinkedIn", x: "X", youtube: "YouTube" };
  return (
    <footer className="dark band">
      <div className="wrap">
        <div className="brand">
          <Link className="lockup" href="/" aria-label="Fintech Pakistan home">
            <LogoIcon />
            <span className="word"><b>fintech</b><span>pakistan</span></span>
          </Link>
          <p>{site.description}</p>
          {social.length > 0 && (
            <div className="foot-social">
              {social.map(([k, u]) => (
                <a key={k} href={u} rel="me noopener" target="_blank">
                  {k === "linkedin" && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.83v1.54h.05c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.13V21h-4v-5.01c0-1.2-.02-2.73-1.66-2.73-1.67 0-1.92 1.3-1.92 2.65V21h-3.89V9.75Z" /></svg>
                  )}
                  {labels[k]}
                </a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h2>Read</h2>
          <ul>
            <li><Link href="/news">News</Link></li>
            <li><Link href="/companies">Companies</Link></li>
            <li><Link href="/guides">Guides</Link></li>
            <li><Link href="/topics">Topics</Link></li>
            <li><Link href="/search" data-search>Search</Link></li>
          </ul>
        </div>
        <div>
          <h2>Community</h2>
          <ul><li><Link href="/community">Community</Link></li><li><Link href="/events">Events</Link></li></ul>
        </div>
        <div>
          <h2>Partners</h2>
          <ul>{getPartners().map((p) => <li key={p.slug}><Link href={`/partners/${p.slug}`}>{p.name}</Link></li>)}</ul>
        </div>
        <div>
          <h2>About</h2>
          <ul>
            <li><Link href="/about">About</Link></li><li><Link href="/our-story">Our Story</Link></li><li><Link href="/team">Team</Link></li>
            <li><Link href="/editorial-policy">Editorial policy</Link></li><li><Link href="/partners">Partners</Link></li><li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="base"><span>{site.url.replace(/^https?:\/\//, "").toUpperCase()}</span><span>NEWS · COMPANIES · GUIDES</span></div>
      </div>
    </footer>
  );
}
