"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { NavItem } from "@/lib/site";
import { LogoIcon } from "./Mark";

// The menu comes from Menu and footer in the admin, passed in by the server.
export default function Header({ nav, joinLabel }: { nav: NavItem[]; joinLabel: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const isCurrent = (href: string) => pathname === href || pathname.startsWith(href + "/");

  useEffect(() => { setOpen(false); setSub(null); }, [pathname]);

  // Dropdowns close on Escape or a tap anywhere else.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSub(null); };
    const onDown = (e: PointerEvent) => { if (!navRef.current?.contains(e.target as Node)) setSub(null); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return (
    <header className="site band">
      <div className="wrap nav">
        <Link className="lockup" href="/" aria-label="Fintech Pakistan home">
          <LogoIcon />
          <span className="word"><b>fintech</b><span>pakistan</span></span>
        </Link>
        <nav aria-label="Main" ref={navRef}>
          <ul className={`menu${open ? " open" : ""}`} id="menu">
            {nav.map((n) => {
              if (!("items" in n)) {
                return <li key={n.href}><Link href={n.href} aria-current={isCurrent(n.href) ? "page" : undefined}>{n.label}</Link></li>;
              }
              const expanded = sub === n.label;
              const active = n.items.some((i) => isCurrent(i.href));
              return (
                <li key={n.label} className={`has-sub${expanded ? " open" : ""}${active ? " active" : ""}`}>
                  <button className="sub-btn" type="button" aria-expanded={expanded} onClick={() => setSub(expanded ? null : n.label)}>
                    {n.label}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m2.5 4.5 3.5 3.5 3.5-3.5" /></svg>
                  </button>
                  <ul className="sub">
                    {n.items.map((i) => <li key={i.href}><Link href={i.href} aria-current={isCurrent(i.href) ? "page" : undefined}>{i.label}</Link></li>)}
                  </ul>
                </li>
              );
            })}
            <li className="menu-cta"><Link className="btn btn-signal" href="/community" data-join>{joinLabel}</Link></li>
          </ul>
        </nav>
        <div className="nav-right">
          <Link className="nav-search" href="/search" aria-label="Search" data-search>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          </Link>
          <Link className="btn btn-signal btn-small" href="/community" data-join>{joinLabel}</Link>
          <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>
            {open ? "CLOSE" : "MENU"}
          </button>
        </div>
      </div>
    </header>
  );
}
