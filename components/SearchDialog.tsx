"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { searchItems, type SearchItem } from "@/lib/search";

const QUICK = [
  { href: "/news", label: "News" },
  { href: "/guides", label: "Guides" },
  { href: "/companies", label: "Companies" },
  { href: "/topics", label: "Topics" },
  { href: "/community", label: "Community" },
  { href: "/events", label: "Events" },
];

// Links marked data-search open this popup. They still point at /search, so they
// work before hydration and when opened in a new tab. Ctrl or Cmd + K also opens it.
export default function SearchDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [q, setQ] = useState("");
  const [items, setItems] = useState<SearchItem[] | null>(null);
  const results = useMemo(() => searchItems(items ?? [], q), [items, q]);

  useEffect(() => {
    function open() {
      if (ref.current?.open) return;
      ref.current?.showModal();
      input.current?.focus();
      // The index only loads the first time someone searches.
      setItems((current) => {
        if (!current) fetch("/search-index.json").then((r) => r.json()).then(setItems, () => setItems([]));
        return current ?? [];
      });
    }
    function onClick(e: MouseEvent) {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (!(e.target as Element).closest("[data-search]")) return;
      e.preventDefault();
      open();
    }
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); open(); }
    }
    document.addEventListener("click", onClick, true);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("click", onClick, true); document.removeEventListener("keydown", onKey); };
  }, []);

  const close = () => ref.current?.close();
  useEffect(() => { close(); setQ(""); }, [pathname]);

  return (
    <dialog ref={ref} className="search-dialog" aria-label="Search the site" onClick={(e) => { if (e.target === ref.current) close(); }}>
      <div className="search-dialog-body">
        <form className="search-bar" role="search" onSubmit={(e) => { e.preventDefault(); if (results[0]) { router.push(results[0].path); close(); } }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          <input ref={input} type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search the whole site" aria-label="Search the whole site" autoComplete="off" enterKeyHint="search" />
          <button className="search-close" type="button" onClick={close} aria-label="Close search"><span aria-hidden="true">×</span></button>
        </form>
        {q.trim() ? (
          <div className="search-scroll">
            <p className="dir-count" aria-live="polite">{results.length} {results.length === 1 ? "result" : "results"}</p>
            <ul className="search-results">
              {results.map((r) => (
                <li key={r.path}><Link href={r.path} onClick={close}><span className="label">{r.type}</span><b>{r.title}</b><span>{r.text}</span></Link></li>
              ))}
            </ul>
            {results.length === 0 && <p className="empty">Nothing found. Try a company name or a topic like stablecoins.</p>}
          </div>
        ) : (
          <div className="search-quick">
            <span className="label">Jump to</span>
            <div className="filters">{QUICK.map((l) => <Link key={l.href} className="filter" href={l.href} onClick={close}>{l.label}</Link>)}</div>
          </div>
        )}
      </div>
    </dialog>
  );
}
