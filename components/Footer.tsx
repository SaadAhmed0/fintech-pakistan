import Link from "next/link";
import { site } from "@/lib/site";
import { getPartners } from "@/lib/content";
import { LogoIcon } from "./Mark";

export default function Footer() {
  const social = Object.entries(site.social).filter(([, u]) => u);
  const labels: Record<string, string> = { linkedin: "LinkedIn", x: "X", youtube: "YouTube" };
  return (
    <footer className="dark band">
      <div className="wrap">
        <div className="brand">
          <Link className="lockup" href="/" aria-label="Fintech Pakistan home">
            <LogoIcon />
            <span className="word"><b>fintech</b><span>pakistan</span></span>
          </Link>
          <p>{site.description}</p>
        </div>
        <div>
          <h2>Read</h2>
          <ul>
            <li><Link href="/news">News</Link></li>
            <li><Link href="/companies">Companies</Link></li>
            <li><Link href="/guides">Guides</Link></li>
            <li><Link href="/topics">Topics</Link></li>
            <li><Link href="/search">Search</Link></li>
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
            {social.map(([k, u]) => <li key={k}><a href={u} rel="me noopener" target="_blank">{labels[k]}</a></li>)}
          </ul>
        </div>
        <div className="base"><span>{site.url.replace(/^https?:\/\//, "").toUpperCase()}</span><span>NEWS · COMPANIES · GUIDES</span></div>
      </div>
    </footer>
  );
}
