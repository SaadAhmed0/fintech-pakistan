// Reads the singletons Keystatic edits (content/settings and content/pages).
// Types come straight from keystatic.config.tsx, so a field added there is
// typed here with no extra work.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Entry } from "@keystatic/core/reader";
import type keystaticConfig from "@/keystatic.config";
import { renderBody, type Heading } from "./markdoc";

type Singletons = (typeof keystaticConfig)["singletons"];
type Collections = (typeof keystaticConfig)["collections"];
export type SingletonData<K extends keyof Singletons> = Omit<Entry<Singletons[K]>, "content">;
export type CollectionData<K extends keyof Collections> = Omit<Entry<Collections[K]>, "content">;

// Content lives in the repo, read at build time. The comment stops the bundler
// tracing the whole project into every function.
const ROOT = /*turbopackIgnore: true*/ process.cwd();
const production = process.env.NODE_ENV === "production";
const cache = new Map<string, unknown>();

// Production builds read each file once. Under `npm run dev` every request
// re-reads, so edits in the admin show up on refresh.
function cached<T>(key: string, load: () => T): T {
  if (production && cache.has(key)) return cache.get(key) as T;
  const value = load();
  cache.set(key, value);
  return value;
}

export function readJson<T>(rel: string): T {
  return cached(rel, () => {
    const file = path.join(ROOT, rel);
    if (!fs.existsSync(file)) throw new Error(`Missing content file: ${rel}. Create it in the admin at /admin.`);
    return JSON.parse(fs.readFileSync(file, "utf8")) as T;
  });
}

export function readWithBody<T>(rel: string): T & { html: string; headings: Heading[] } {
  return cached(rel, () => {
    const file = path.join(ROOT, rel);
    if (!fs.existsSync(file)) throw new Error(`Missing content file: ${rel}. Create it in the admin at /admin.`);
    const { data, content } = matter(fs.readFileSync(file, "utf8"));
    return { ...(data as T), ...renderBody(content, rel) };
  });
}

const PAGE_FILES = {
  home: "home",
  team: "team",
  community: "community",
  events: "events",
  partnersPage: "partners",
  contact: "contact",
  newsPage: "news",
  guidesPage: "guides",
  companiesPage: "companies",
  topicsPage: "topics",
  searchPage: "search",
  notFound: "not-found",
} as const;

const BODY_FILES = { about: "about", ourStory: "our-story", editorialPolicy: "editorial-policy" } as const;

export const page = <K extends keyof typeof PAGE_FILES>(key: K) => readJson<SingletonData<K>>(`content/pages/${PAGE_FILES[key]}.json`);
export const pageWithBody = <K extends keyof typeof BODY_FILES>(key: K) => readWithBody<SingletonData<K>>(`content/pages/${BODY_FILES[key]}.md`);
export const settings = () => readJson<SingletonData<"settings">>("content/settings/site.json");
export const navigation = () => readJson<SingletonData<"navigation">>("content/settings/navigation.json");

/* ---------- Charts ---------- */

export type ChartRow = { label: string; value: number; display: string };
export type Chart = { key: string; type: "bars" | "columns"; title: string; subtitle: string; rows: ChartRow[]; source: string };

export function getChart(key: string): Chart {
  const data = readJson<CollectionData<"charts">>(`content/charts/${key}.json`);
  return { key, type: data.type, title: data.title, subtitle: data.subtitle, rows: data.rows.map((r) => ({ label: r.label, value: r.value ?? 0, display: r.display })), source: data.source };
}

export const chartExists = (key: string) => fs.existsSync(path.join(ROOT, "content", "charts", `${key}.json`));

// Keystatic stores "no value" as null or leaves the key out. The UI hides both.
export const has = (v: string | null | undefined): v is string => typeof v === "string" && v.trim() !== "";
