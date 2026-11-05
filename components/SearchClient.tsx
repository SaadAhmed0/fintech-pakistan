"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type Item = { title: string; path: string; type: string; text: string };

export default function SearchClient() {
  const router = useRouter();
  const q = useSearchParams().get("q") ?? "";
  const [value, setValue] = useState(q);
  const [items, setItems] = useState<Item[]>([]);

  // The index only loads when someone opens this page.
  useEffect(() => {
    fetch("/search-index.json").then((r) => r.json()).then(setItems, () => setItems([]));
  }, []);
  useEffect(() => setValue(q), [q]);

  const results = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return items.filter((i) => {
      const hay = `${i.title} ${i.text}`.toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
  }, [q, items]);

  return (
    <>
      <form className="search-form" role="search" onSubmit={(e) => { e.preventDefault(); router.replace(`/search?q=${encodeURIComponent(value)}`); }}>
        <label className="sr-only" htmlFor="search-q">Search</label>
        <input id="search-q" type="search" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Search news, guides and companies" />
        <button className="btn btn-ink" type="submit">Search</button>
      </form>
      {q && <p className="dir-count" aria-live="polite">{results.length} {results.length === 1 ? "result" : "results"} for &ldquo;{q}&rdquo;</p>}
      <ul className="search-results">
        {results.map((r) => (
          <li key={r.path}>
            <Link href={r.path}><span className="label">{r.type}</span><b>{r.title}</b><span>{r.text}</span></Link>
          </li>
        ))}
      </ul>
    </>
  );
}
