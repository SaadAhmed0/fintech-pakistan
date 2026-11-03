import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { renderMarkdown, type Heading, type Source } from "./posts";

const DIR = path.join(process.cwd(), "content", "partners");

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

function load(file: string): Partner {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);
  for (const k of ["name", "type", "focus", "description", "website", "logo"]) {
    if (!data[k]) throw new Error(`content/partners/${file} is missing "${k}" in its frontmatter`);
  }
  const { html, headings } = renderMarkdown(content);
  return {
    slug: file.replace(/\.md$/, ""),
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
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map(load)
    .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
}

export function getPartner(slug: string) {
  return getPartners().find((p) => p.slug === slug);
}

export function hostOf(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
