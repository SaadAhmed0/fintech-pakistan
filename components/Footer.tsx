import Link from "next/link";
import { site } from "@/lib/site";
import { getPartners } from "@/lib/content";
import { navigation } from "@/lib/cms";
import { LogoIcon } from "./Mark";

// Columns come from Menu and footer in the admin.
export default function Footer() {
  const nav = navigation();
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
        {nav.footerColumns.map((col) => (
          <div key={col.heading}>
            <h2>{col.heading}</h2>
            <ul>
              {col.kind === "partners"
                ? getPartners().map((p) => <li key={p.slug}><Link href={`/partners/${p.slug}`}>{p.name}</Link></li>)
                : col.links.map((l) => <li key={l.href + l.label}><Link href={l.href} {...(l.href === "/search" ? { "data-search": true } : {})}>{l.label}</Link></li>)}
            </ul>
          </div>
        ))}
        <div className="base"><span>{site.url.replace(/^https?:\/\//, "").toUpperCase()}</span>{nav.footerTagline && <span>{nav.footerTagline}</span>}</div>
      </div>
    </footer>
  );
}
