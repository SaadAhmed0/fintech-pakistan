"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/site";
import { LogoIcon } from "./Mark";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="site band">
      <div className="wrap nav">
        <Link className="lockup" href="/" aria-label="Fintech Pakistan home">
          <LogoIcon />
          <span className="word"><b>fintech</b><span>pakistan</span></span>
        </Link>
        <nav aria-label="Main">
          <ul className={`menu${open ? " open" : ""}`} id="menu">
            {nav.map((n) => {
              const current = pathname === n.href || pathname.startsWith(n.href + "/");
              return (
                <li key={n.href}>
                  <Link href={n.href} aria-current={current ? "page" : undefined}>{n.label}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="nav-right">
          <Link className="btn btn-signal btn-small" href="/community">Join free</Link>
          <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>
            {open ? "CLOSE" : "MENU"}
          </button>
        </div>
      </div>
    </header>
  );
}
