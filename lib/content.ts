// All content loading lives here. Frontmatter problems fail the build rather than ship.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked, type Tokens } from "marked";

const CONTENT = path.join(process.cwd(), "content");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const production = process.env.NODE_ENV === "production";

export type Source = { title: string; url: string };
export type Heading = { id: string; text: string };
export type Faq = { q: string; a: string };
export type PostKind = "news" | "guides";
export type Label = "" | "Sponsored" | "Partner";

export type Post = {
  kind: PostKind;
  slug: string;
  path: string;
  title: string;
  description: string;
  date: string;
  published: string;
  updated?: string;
  author: string;
  authorSlug: string;
  tags: string[];
  coverImage?: string;
  coverAlt?: string;
  draft: boolean;
  label: Label;
  lead: boolean;
  chart: string;
  keyPoints: string[];
  sources: Source[];
  faqs: Faq[];
  companies: string[];
  html: string;
  headings: Heading[];
  readingTime: number;
  wordCount: number;
};

export type Availability = "" | "yes" | "reported" | "no";

export type Company = {
  slug: string;
  path: string;
  name: string;
  description: string;
  website: string;
  aliases: string[];
  founded: string;
  hq: string;
  licenses: string[];
  regulators: string[];
  stablecoins: string[];
  pvaraStatus: string;
  pakistanAvailability: Availability;
  pakistanNote: string;
  usdAccount: boolean | null;
  card: boolean | null;
  fees: string;
  kyc: string;
  topics: string[];
  label: Label;
  pick: string;
  lastVerified: string;
  draft: boolean;
  sources: Source[];
  faqs: Faq[];
  html: string;
  wordCount: number;
  indexable: boolean;
};

export type Author = { slug: string; name: string; type: "Person" | "Organization"; role: string; bio: string; sameAs: string[]; html: string };
export type Topic = { slug: string; name: string; description: string; html: string };
export type Comparison = { slug: string; path: string; a: Company; b: Company; title: string; description: string; date: string; updated?: string; author: string; authorSlug: string; sources: Source[]; html: string };

export type Partner = {
  slug: string;
  name: string;
  type: string;
  focus: string;
  description: string;
  website: string;
  logo: { src: string; width: number; height: number };
  showName: boolean;
  order: number;
  sameAs: string[];
  related: string[];
  sources: Source[];
  html: string;
  headings: Heading[];
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

function renderMarkdown(md: string, file: string) {
  const headings: Heading[] = [];
  const marked = new Marked({ gfm: true });
  marked.use({
    renderer: {
      heading(this: { parser: { parseInline(t: Tokens.Generic[]): string } }, { tokens, depth, text }: Tokens.Heading) {
        const inner = this.parser.parseInline(tokens);
        const id = slugify(text);
        // The page title is the only H1, so a stray "#" in a body becomes an H2.
        const level = Math.max(depth, 2);
        if (level === 2) headings.push({ id, text: inner.replace(/<[^>]+>/g, "") });
        return `<h${level} id="${id}">${inner}</h${level}>\n`;
      },
      link({ href, title, tokens }: Tokens.Link) {
        const inner = (this as unknown as { parser: { parseInline(t: Tokens.Generic[]): string } }).parser.parseInline(tokens);
        const external = /^https?:\/\//.test(href);
        const t = title ? ` title="${title}"` : "";
        return external
          ? `<a href="${href}"${t} target="_blank" rel="noopener">${inner}</a>`
          : `<a href="${href}"${t}>${inner}</a>`;
      },
      image({ href, title, text }: Tokens.Image) {
        if (!text.trim()) throw new Error(`${file}: image ${href} needs alt text`);
        const t = title ? ` title="${title}"` : "";
        return `<img src="${href}" alt="${text}"${t} loading="lazy" decoding="async">`;
      },
    },
  });
  const html = marked.parse(md, { async: false }) as string;
  return { html, headings };
}

const mdFiles = (dir: string) => {
  const full = path.join(CONTENT, dir);
  if (!fs.existsSync(full)) return [];
  return fs.readdirSync(full).filter((f) => /\.mdx?$/.test(f) && !f.startsWith("_"));
};
const read = (dir: string, file: string) => matter(fs.readFileSync(path.join(CONTENT, dir, file), "utf8"));
const slugOf = (file: string) => file.replace(/\.mdx?$/, "");
const countWords = (md: string) => md.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
const asDate = (v: unknown) => (v instanceof Date ? v.toISOString().slice(0, 10) : String(v).slice(0, 10));
// A date written with a time keeps it, which Google News prefers. A plain date stays a plain date.
const asTimestamp = (v: unknown) => {
  if (v instanceof Date) return v.toISOString().endsWith("T00:00:00.000Z") ? v.toISOString().slice(0, 10) : v.toISOString();
  return String(v);
};
const triState = (v: unknown) => (v === true || v === false ? v : null);

function checkDescription(where: string, value: unknown, draft: boolean) {
  const length = String(value).length;
  if (!draft && (length < 150 || length > 160)) throw new Error(`${where}: description is ${length} characters, it must be 150 to 160`);
}

// Links the first mention of each company in body text to its profile, skipping
// headings and text that is already a link.
function linkCompanies(html: string, companies: Company[], self?: string) {
  const mentioned: string[] = [];
  const pending = companies
    .filter((c) => c.slug !== self)
    .flatMap((c) => [c.name, ...c.aliases].map((name) => ({ c, name })))
    .sort((a, b) => b.name.length - a.name.length);
  const parts = html.split(/(<[^>]+>)/);
  let skip = 0;
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part.startsWith("<")) {
      if (/^<(a|h[1-6]|code|pre)[\s>]/.test(part)) skip++;
      else if (/^<\/(a|h[1-6]|code|pre)>/.test(part)) skip--;
      continue;
    }
    if (skip > 0 || !part.trim()) continue;
    // Find every match in the original text first, then insert links from the
    // end backwards so earlier positions stay valid.
    const hits: { at: number; text: string; path: string }[] = [];
    for (const { c, name } of pending) {
      if (mentioned.includes(c.slug)) continue;
      const m = new RegExp(`(^|[^A-Za-z0-9])(${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})(?![A-Za-z0-9])`).exec(part);
      if (!m) continue;
      const at = m.index + m[1].length;
      if (hits.some((h) => at < h.at + h.text.length && h.at < at + m[2].length)) continue;
      hits.push({ at, text: m[2], path: c.path });
      mentioned.push(c.slug);
    }
    for (const h of hits.sort((a, b) => b.at - a.at)) {
      parts[i] = `${parts[i].slice(0, h.at)}<a href="${h.path}">${h.text}</a>${parts[i].slice(h.at + h.text.length)}`;
    }
  }
  return { html: parts.join(""), mentioned };
}

/* ---------- Authors ---------- */

function loadAuthor(file: string): Author {
  const { data, content } = read("authors", file);
  const where = `content/authors/${file}`;
  for (const k of ["name", "type", "role", "bio"]) if (!data[k]) throw new Error(`${where}: missing "${k}" in frontmatter`);
  return { slug: slugOf(file), name: data.name, type: data.type, role: data.role, bio: data.bio, sameAs: data.sameAs || [], html: renderMarkdown(content, where).html };
}

export const getAuthors = () => mdFiles("authors").map(loadAuthor);
export const getAuthor = (slug: string) => getAuthors().find((a) => a.slug === slug);

function authorSlugFor(name: unknown, where: string) {
  const a = getAuthors().find((x) => x.name === name);
  if (!a) throw new Error(`${where}: author "${name}" has no file in content/authors`);
  return a.slug;
}

/* ---------- Companies ---------- */

function loadCompany(file: string): Company {
  const where = `content/companies/${file}`;
  const { data, content } = read("companies", file);
  const slug = slugOf(file);
  if (!SLUG.test(slug)) throw new Error(`${where}: filename must be a clean slug`);
  for (const k of ["name", "description", "website"]) if (!data[k]) throw new Error(`${where}: missing "${k}" in frontmatter`);
  if (typeof data.draft !== "boolean") throw new Error(`${where}: "draft" must be true or false`);
  checkDescription(where, data.description, data.draft);
  const sources: Source[] = data.sources || [];
  const availability: Availability = data.pakistanAvailability || "";
  const lastVerified = data.lastVerified ? asDate(data.lastVerified) : "";
  const wordCount = countWords(content);
  return {
    slug,
    path: `/companies/${slug}`,
    name: data.name,
    description: data.description,
    website: data.website,
    aliases: data.aliases || [],
    founded: data.founded ? String(data.founded) : "",
    hq: data.hq || "",
    licenses: data.licenses || [],
    regulators: data.regulators || [],
    stablecoins: data.stablecoins || [],
    pvaraStatus: data.pvaraStatus || "",
    pakistanAvailability: availability,
    pakistanNote: data.pakistanNote || "",
    usdAccount: triState(data.usdAccount),
    card: triState(data.card),
    fees: data.fees || "",
    kyc: data.kyc || "",
    topics: data.topics || [],
    label: data.label || "",
    pick: data.pick || "",
    lastVerified,
    draft: data.draft,
    sources,
    faqs: data.faqs || [],
    html: renderMarkdown(content, where).html,
    wordCount,
    // Thin or unverified profiles still render but stay out of search until they earn it.
    indexable: Boolean(availability && lastVerified && sources.length >= 2 && wordCount >= 60),
  };
}

let companies: Company[] | null = null;

export function getCompanies(): Company[] {
  if (companies && production) return companies;
  companies = mdFiles("companies")
    .map(loadCompany)
    .filter((c) => !production || !c.draft)
    .sort((a, b) => Number(Boolean(b.pick)) - Number(Boolean(a.pick)) || a.name.localeCompare(b.name));
  return companies;
}

export const getCompany = (slug: string) => getCompanies().find((c) => c.slug === slug);

/* ---------- News and guides ---------- */

function loadPost(kind: PostKind, file: string): Post {
  const where = `content/${kind}/${file}`;
  const fail = (msg: string): never => { throw new Error(`${where}: ${msg}`); };
  const { data, content } = read(kind, file);
  const slug = slugOf(file);

  if (!SLUG.test(slug)) fail("filename must be a clean slug: lowercase letters, numbers and hyphens");
  for (const k of ["title", "description", "date", "author"]) if (!data[k]) fail(`missing "${k}" in frontmatter`);
  if (!Array.isArray(data.tags) || data.tags.length === 0) fail('"tags" must list at least one tag');
  if (typeof data.draft !== "boolean") fail('"draft" must be true or false');
  if (data.label && !["Sponsored", "Partner"].includes(data.label)) fail('"label" must be empty, Sponsored or Partner');
  checkDescription(where, data.description, data.draft);

  const coverImage: string | undefined = data.coverImage || undefined;
  const coverAlt: string | undefined = data.coverAlt || undefined;
  if (coverImage && !coverAlt) fail('"coverImage" needs "coverAlt"');
  if (coverImage && !fs.existsSync(path.join(PUBLIC_DIR, coverImage))) fail(`cover image not found: public${coverImage}`);

  const rendered = renderMarkdown(content, where);
  const { html, mentioned } = linkCompanies(rendered.html, getCompanies());
  const wordCount = countWords(content);
  return {
    kind,
    slug,
    path: `/${kind}/${slug}`,
    title: data.title,
    description: data.description,
    date: asDate(data.date),
    published: asTimestamp(data.date),
    updated: data.updated ? asDate(data.updated) : undefined,
    author: data.author,
    authorSlug: authorSlugFor(data.author, where),
    tags: data.tags,
    coverImage,
    coverAlt,
    draft: data.draft,
    label: data.label || "",
    lead: Boolean(data.lead),
    chart: data.chart || "",
    keyPoints: data.keyPoints || [],
    sources: data.sources || [],
    faqs: data.faqs || [],
    companies: mentioned,
    html,
    headings: rendered.headings,
    wordCount,
    readingTime: Math.max(1, Math.round(wordCount / 220)),
  };
}

const newest = (a: Post, b: Post) => (a.published < b.published ? 1 : a.published > b.published ? -1 : a.title.localeCompare(b.title));

const cache: Partial<Record<PostKind, Post[]>> = {};

// Files starting with "_" (the templates) are never loaded. Drafts appear only
// under `npm run dev`, so they are never part of a production build.
function getPosts(kind: PostKind): Post[] {
  const hit = cache[kind];
  if (hit && production) return hit;
  const posts = mdFiles(kind)
    .map((f) => loadPost(kind, f))
    .filter((p) => !production || !p.draft)
    .sort(newest);
  cache[kind] = posts;
  return posts;
}

export const getNews = () => getPosts("news");
export const getGuides = () => getPosts("guides");
export const getAllPosts = () => [...getNews(), ...getGuides()].sort(newest);
export const getPost = (kind: PostKind, slug: string) => getPosts(kind).find((p) => p.slug === slug);
export const getPostBySlug = (slug: string) => getAllPosts().find((p) => p.slug === slug);
export const getPostsByAuthor = (slug: string) => getAllPosts().filter((p) => p.authorSlug === slug);
export const getPostsForCompany = (slug: string) => getAllPosts().filter((p) => p.companies.includes(slug));

export function getRelated(post: Post, n = 3) {
  const others = getAllPosts().filter((p) => p.path !== post.path);
  const score = (p: Post) =>
    p.tags.filter((t) => post.tags.includes(t)).length * 2 + p.companies.filter((c) => post.companies.includes(c)).length * 3 + (p.kind === post.kind ? 1 : 0);
  return others.map((p) => ({ p, s: score(p) })).sort((a, b) => b.s - a.s).slice(0, n).map((x) => x.p);
}

export function formatDate(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/* ---------- Topics ---------- */

function loadTopic(file: string): Topic {
  const where = `content/topics/${file}`;
  const { data, content } = read("topics", file);
  for (const k of ["name", "description"]) if (!data[k]) throw new Error(`${where}: missing "${k}" in frontmatter`);
  return { slug: slugOf(file), name: data.name, description: data.description, html: renderMarkdown(content, where).html };
}

export const getTopics = () => mdFiles("topics").map(loadTopic).sort((a, b) => a.name.localeCompare(b.name));
export const getTopic = (slug: string) => getTopics().find((t) => t.slug === slug);
export const getPostsByTopic = (slug: string) => getAllPosts().filter((p) => p.tags.some((t) => slugify(t) === slug));
export const getCompaniesByTopic = (slug: string) => getCompanies().filter((c) => c.topics.includes(slug));
export const topicItemCount = (slug: string) => getPostsByTopic(slug).length + getCompaniesByTopic(slug).length;

/* ---------- Comparisons ---------- */

// A comparison page exists only if someone wrote a file for it, so a pair of
// companies never becomes a page automatically.
function loadComparison(file: string): Comparison | null {
  const where = `content/compare/${file}`;
  const { data, content } = read("compare", file);
  const slug = slugOf(file);
  const pair = /^(.+)-vs-(.+)$/.exec(slug);
  if (!pair) throw new Error(`${where}: filename must be [a]-vs-[b]`);
  for (const k of ["title", "description", "date", "author"]) if (!data[k]) throw new Error(`${where}: missing "${k}" in frontmatter`);
  checkDescription(where, data.description, Boolean(data.draft));
  if (production && data.draft) return null;
  const a = getCompany(pair[1]);
  const b = getCompany(pair[2]);
  if (!a || !b) throw new Error(`${where}: both companies need a file in content/companies`);
  if (countWords(content) < 250) throw new Error(`${where}: a comparison needs at least 250 words of real analysis`);
  return {
    slug,
    path: `/compare/${slug}`,
    a,
    b,
    title: data.title,
    description: data.description,
    date: asDate(data.date),
    updated: data.updated ? asDate(data.updated) : undefined,
    author: data.author,
    authorSlug: authorSlugFor(data.author, where),
    sources: data.sources || [],
    html: linkCompanies(renderMarkdown(content, where).html, [a, b]).html,
  };
}

export const getComparisons = () => mdFiles("compare").map(loadComparison).filter((c): c is Comparison => c !== null);
export const getComparison = (slug: string) => getComparisons().find((c) => c.slug === slug);
export const getComparisonsFor = (slug: string) => getComparisons().filter((c) => c.a.slug === slug || c.b.slug === slug);

/* ---------- Partners ---------- */

function loadPartner(file: string): Partner {
  const where = `content/partners/${file}`;
  const { data, content } = read("partners", file);
  for (const k of ["name", "type", "focus", "description", "website", "logo"]) {
    if (!data[k]) throw new Error(`${where}: missing "${k}" in frontmatter`);
  }
  const { html, headings } = renderMarkdown(content, where);
  return {
    slug: slugOf(file),
    name: data.name,
    type: data.type,
    focus: data.focus,
    description: data.description,
    website: data.website,
    logo: data.logo,
    showName: Boolean(data.showName),
    order: data.order ?? 99,
    sameAs: data.sameAs || [],
    related: data.related || [],
    sources: data.sources || [],
    html,
    headings,
  };
}

export function getPartners(): Partner[] {
  return mdFiles("partners")
    .map(loadPartner)
    .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
}

export function getPartner(slug: string) {
  return getPartners().find((p) => p.slug === slug);
}

export function hostOf(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
