import type { MetadataRoute } from "next";
import { getAllPosts, getAuthors, getCompanies, getComparisons, getNews, getPartners, getPostsByAuthor, getTopics, topicItemCount } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latest = posts[0]?.updated || posts[0]?.date;
  const latestNews = getNews()[0]?.date;
  const companies = getCompanies().filter((c) => c.indexable);
  const lastVerified = companies.map((c) => c.lastVerified).sort().pop();

  const lists: [string, string | undefined, number][] = [
    ["/", latest, 1],
    ["/news", latestNews, 0.9],
    ["/companies", lastVerified, 0.9],
    ["/guides", latest, 0.8],
    ["/topics", latest, 0.6],
  ];
  const statics = ["/community", "/events", "/partners", "/about", "/our-story", "/team", "/editorial-policy", "/contact"];

  return [
    ...lists.map(([p, lastModified, priority]) => ({ url: absoluteUrl(p), lastModified, changeFrequency: "daily" as const, priority })),
    ...statics.map((p) => ({ url: absoluteUrl(p), changeFrequency: "monthly" as const, priority: 0.6 })),
    ...posts.map((p) => ({ url: absoluteUrl(p.path), lastModified: p.updated || p.date, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...companies.map((c) => ({ url: absoluteUrl(c.path), lastModified: c.lastVerified, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...getComparisons().map((c) => ({ url: absoluteUrl(c.path), lastModified: c.updated || c.date, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...getTopics().filter((t) => topicItemCount(t.slug) >= 2).map((t) => ({ url: absoluteUrl(`/topics/${t.slug}`), changeFrequency: "weekly" as const, priority: 0.6 })),
    ...getAuthors().map((a) => ({ url: absoluteUrl(`/authors/${a.slug}`), lastModified: getPostsByAuthor(a.slug)[0]?.date, changeFrequency: "monthly" as const, priority: 0.4 })),
    ...getPartners().map((p) => ({ url: absoluteUrl(`/partners/${p.slug}`), changeFrequency: "monthly" as const, priority: 0.5 })),
  ];
}
