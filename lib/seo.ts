import type { Metadata } from "next";
import { absoluteUrl, sameAs, site } from "./site";
import { getAuthor, type Author, type Company, type Post } from "./content";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  image?: string;
  noindex?: boolean;
};

// Setting canonical on a page replaces the root alternates, so the RSS link is
// repeated here to keep it on every page.
export const pageAlternates = (url: string) => ({
  canonical: url,
  types: { "application/rss+xml": [{ url: absoluteUrl("/rss.xml"), title: site.name }] },
});

// Setting openGraph on a page replaces the generated image, so it is named explicitly.
export const shareImage = (imagePath: string, alt: string) => [{ url: absoluteUrl(imagePath), width: 1200, height: 630, alt }];

// Adds the site name only when the whole title still fits in Google's 60 characters.
const SUFFIX = ` | ${site.name}`;
export const titleTag = (title: string) => (title.length + SUFFIX.length <= 60 ? title : { absolute: title });

export function pageMetadata({ title, description, path, absoluteTitle, image = "/opengraph-image", noindex }: PageMeta): Metadata {
  const url = absoluteUrl(path);
  const images = shareImage(image, site.name);
  return {
    title: absoluteTitle ? { absolute: title } : titleTag(title),
    description,
    alternates: pageAlternates(url),
    openGraph: { title, description, url, siteName: site.name, locale: site.locale, type: "website", images },
    twitter: { card: "summary_large_image", title, description, images },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

export function postMetadata(p: Post): Metadata {
  const url = absoluteUrl(p.path);
  const images = p.coverImage
    ? [{ url: absoluteUrl(p.coverImage), width: 1600, height: 900, alt: p.coverAlt }]
    : shareImage(`${p.path}/opengraph-image`, p.title);
  return {
    title: titleTag(p.title),
    description: p.description,
    alternates: pageAlternates(url),
    authors: [{ name: p.author, url: absoluteUrl(`/authors/${p.authorSlug}`) }],
    openGraph: {
      type: "article",
      url,
      title: p.title,
      description: p.description,
      siteName: site.name,
      locale: site.locale,
      publishedTime: p.published,
      modifiedTime: p.updated || p.published,
      section: p.tags[0],
      tags: p.tags,
      authors: [p.author],
      images,
    },
    twitter: { card: "summary_large_image", title: p.title, description: p.description, images },
  };
}

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": absoluteUrl("/#organization"),
  name: site.name,
  alternateName: site.alternateNames,
  url: site.url,
  logo: absoluteUrl("/brand/fp-icon_green_1024.png"),
  description: site.description,
  areaServed: "PK",
  founder: site.team.map((m) => ({ "@type": "Person", name: m.name, jobTitle: m.role, ...(m.linkedin ? { sameAs: m.linkedin } : {}) })),
  ...(sameAs().length ? { sameAs: sameAs() } : {}),
  ...(site.contactEmail ? { email: site.contactEmail } : {}),
});

export const websiteLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absoluteUrl("/#website"),
  name: site.name,
  alternateName: site.alternateNames,
  url: site.url,
  inLanguage: site.language,
  publisher: { "@id": absoluteUrl("/#organization") },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${site.url}/search?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
});

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: absoluteUrl(it.path),
  })),
});

export const faqLd = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

const authorRef = (a: Author | undefined, fallback: string) => ({
  "@type": a?.type ?? "Organization",
  name: a?.name ?? fallback,
  ...(a ? { url: absoluteUrl(`/authors/${a.slug}`) } : {}),
});

export const articleLd = (p: Post) => ({
  "@context": "https://schema.org",
  "@type": p.kind === "news" ? "NewsArticle" : "Article",
  "@id": absoluteUrl(`${p.path}#article`),
  headline: p.title,
  description: p.description,
  datePublished: p.published,
  dateModified: p.updated || p.published,
  articleSection: p.tags[0],
  wordCount: p.wordCount,
  inLanguage: site.language,
  keywords: p.tags.join(", "),
  mainEntityOfPage: absoluteUrl(p.path),
  image: absoluteUrl(p.coverImage || `${p.path}/opengraph-image`),
  author: authorRef(getAuthor(p.authorSlug), p.author),
  publisher: { "@id": absoluteUrl("/#organization") },
  citation: p.sources.map((s) => ({ "@type": "CreativeWork", name: s.title, url: s.url })),
});

export const companyLd = (c: Company) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": absoluteUrl(`${c.path}#organization`),
  name: c.name,
  url: c.website,
  description: c.description,
  mainEntityOfPage: absoluteUrl(c.path),
  ...(c.founded ? { foundingDate: c.founded } : {}),
  ...(c.aliases.length ? { alternateName: c.aliases } : {}),
});

export const authorLd = (a: Author) => ({
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": a.type,
    "@id": absoluteUrl(`/authors/${a.slug}#author`),
    name: a.name,
    description: a.bio,
    url: absoluteUrl(`/authors/${a.slug}`),
    ...(a.type === "Person" ? { jobTitle: a.role } : {}),
    ...(a.sameAs.length ? { sameAs: a.sameAs } : {}),
  },
});
