import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked, type Tokens } from "marked";

const DIR = path.join(process.cwd(), "content", "insights");

export type Source = { title: string; url: string };
export type Heading = { id: string; text: string };

export type Post = {
  slug: string;
  title: string;
  seoTitle?: string;
  description: string;
  tag: string;
  date: string;
  updated?: string;
  author: string;
  featured: boolean;
  draft: boolean;
  keywords: string[];
  sources: Source[];
  html: string;
  headings: Heading[];
  readingTime: number;
  wordCount: number;
};

export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/&amp;|&/g, "and")
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function render(md: string) {
  const headings: Heading[] = [];
  const marked = new Marked({ gfm: true });
  marked.use({
    renderer: {
      heading(this: { parser: { parseInline(t: Tokens.Generic[]): string } }, { tokens, depth, text }: Tokens.Heading) {
        const inner = this.parser.parseInline(tokens);
        const id = slugify(text);
        if (depth === 2) headings.push({ id, text: inner.replace(/<[^>]+>/g, "") });
        return `<h${depth} id="${id}">${inner}</h${depth}>\n`;
      },
      link({ href, title, tokens }: Tokens.Link) {
        const inner = (this as unknown as { parser: { parseInline(t: Tokens.Generic[]): string } }).parser.parseInline(tokens);
        const external = /^https?:\/\//.test(href);
        const t = title ? ` title="${title}"` : "";
        return external
          ? `<a href="${href}"${t} target="_blank" rel="noopener">${inner}</a>`
          : `<a href="${href}"${t}>${inner}</a>`;
      },
    },
  });
  const html = marked.parse(md, { async: false }) as string;
  return { html, headings };
}

function load(file: string): Post {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);
  const slug = file.replace(/\.md$/, "");
  const required = ["title", "description", "tag", "date"];
  for (const k of required) {
    if (!data[k]) throw new Error(`content/insights/${file} is missing "${k}" in its frontmatter`);
  }
  const { html, headings } = render(content);
  const wordCount = content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  const asDate = (v: unknown) => (v instanceof Date ? v.toISOString().slice(0, 10) : String(v));
  return {
    slug,
    title: data.title,
    seoTitle: data.seoTitle,
    description: data.description,
    tag: data.tag,
    date: asDate(data.date),
    updated: data.updated ? asDate(data.updated) : undefined,
    author: data.author || "Fintech Pakistan",
    featured: Boolean(data.featured),
    draft: Boolean(data.draft),
    keywords: data.keywords || [],
    sources: data.sources || [],
    html,
    headings,
    wordCount,
    readingTime: Math.max(1, Math.round(wordCount / 220)),
  };
}

let cache: Post[] | null = null;

export function getAllPosts(): Post[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  const showDrafts = process.env.NODE_ENV !== "production";
  cache = fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map(load)
    .filter((p) => showDrafts || !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title)));
  return cache;
}

export function getPost(slug: string) {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getTags() {
  const tags: string[] = [];
  for (const p of getAllPosts()) if (!tags.includes(p.tag)) tags.push(p.tag);
  return tags;
}

export function getPostsByTag(tag: string) {
  return getAllPosts().filter((p) => slugify(p.tag) === tag);
}

export function getRelated(post: Post, n = 3) {
  const others = getAllPosts().filter((p) => p.slug !== post.slug);
  const same = others.filter((p) => p.tag === post.tag);
  return [...same, ...others.filter((p) => p.tag !== post.tag)].slice(0, n);
}

export function formatDate(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
