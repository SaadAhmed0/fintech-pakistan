import type { Metadata } from "next";
import { absoluteUrl, sameAs, site } from "./site";
import type { Post } from "./posts";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
};

export function pageMetadata({ title, description, path, absoluteTitle }: PageMeta): Metadata {
  const url = absoluteUrl(path);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: site.name, locale: site.locale, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": absoluteUrl("/#organization"),
  name: site.name,
  url: site.url,
  logo: absoluteUrl("/icon.svg"),
  description: site.description,
  areaServed: "PK",
  ...(sameAs().length ? { sameAs: sameAs() } : {}),
  ...(site.contactEmail ? { email: site.contactEmail } : {}),
});

export const websiteLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absoluteUrl("/#website"),
  name: site.name,
  url: site.url,
  inLanguage: site.language,
  publisher: { "@id": absoluteUrl("/#organization") },
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

export const articleLd = (p: Post) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": absoluteUrl(`/insights/${p.slug}#article`),
  headline: p.title,
  description: p.description,
  datePublished: p.date,
  dateModified: p.updated || p.date,
  articleSection: p.tag,
  wordCount: p.wordCount,
  inLanguage: site.language,
  keywords: p.keywords.join(", ") || undefined,
  mainEntityOfPage: absoluteUrl(`/insights/${p.slug}`),
  image: absoluteUrl(`/insights/${p.slug}/opengraph-image`),
  author:
    p.author === site.name
      ? { "@id": absoluteUrl("/#organization") }
      : { "@type": "Person", name: p.author },
  publisher: { "@id": absoluteUrl("/#organization") },
  citation: p.sources.map((s) => ({ "@type": "CreativeWork", name: s.title, url: s.url })),
});
