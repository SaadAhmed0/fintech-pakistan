"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/posts";

export default function Toc({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState(headings[0]?.id);
  useEffect(() => {
    const els = headings.map((h) => document.getElementById(h.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver((entries) => {
      const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (vis[0]) setActive(vis[0].target.id);
    }, { rootMargin: "-96px 0px -65% 0px" });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [headings]);
  if (headings.length < 2) return null;
  return (
    <nav className="toc" aria-label="On this page">
      <span className="label">On this page</span>
      <ol>
        {headings.map((h) => (
          <li key={h.id}><a href={`#${h.id}`} aria-current={active === h.id ? "true" : undefined}>{h.text}</a></li>
        ))}
      </ol>
    </nav>
  );
}
