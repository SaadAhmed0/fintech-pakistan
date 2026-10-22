import Link from "next/link";
import { site } from "@/lib/site";
import { LogoIcon } from "./Mark";

export default function Footer() {
  const social = Object.entries(site.social).filter(([, u]) => u);
  const labels: Record<string, string> = { linkedin: "LinkedIn", x: "X", youtube: "YouTube", spotify: "Spotify", applePodcasts: "Apple Podcasts" };
  return (
    <footer className="dark band">
      <div className="wrap">
        <div className="brand">
          <Link className="lockup" href="/" aria-label="Fintech Pakistan home">
            <LogoIcon />
            <span className="word"><b>fintech</b><span>pakistan</span></span>
          </Link>
          <p>{site.description.split(". For")[0]}.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <ul><li><Link href="/community">Community</Link></li><li><Link href="/podcast">Podcast</Link></li><li><Link href="/events">Events</Link></li></ul>
        </div>
        <div>
          <h4>Read</h4>
          <ul>
            <li><Link href="/insights">Insights</Link></li>
            <li><Link href="/insights/raast-instant-payments-explained">Raast, explained</Link></li>
            <li><Link href="/insights/pvara-virtual-asset-licensing">Virtual asset rules</Link></li>
            <li><a href="/insights/feed.xml">RSS feed</a></li>
          </ul>
        </div>
        <div>
          <h4>Work with us</h4>
          <ul>
            <li><Link href="/partners">Partners</Link></li><li><Link href="/about">About</Link></li><li><Link href="/contact">Contact</Link></li>
            {social.map(([k, u]) => <li key={k}><a href={u} rel="me noopener" target="_blank">{labels[k]}</a></li>)}
          </ul>
        </div>
        <div className="base"><span>{site.url.replace(/^https?:\/\//, "").toUpperCase()}</span><span>COMMUNITY · PODCAST · EVENTS · INSIGHTS</span></div>
      </div>
    </footer>
  );
}
