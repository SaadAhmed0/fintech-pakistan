import type { MetadataRoute } from "next";
import { getAllPosts, getTags, slugify } from "@/lib/posts";
import { getPartners } from "@/lib/partners";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latest = posts[0]?.updated || posts[0]?.date;
  const pages = ["/", "/community", "/events", "/insights", "/partners", "/about", "/our-story", "/team", "/contact"].map((p) => ({
    url: absoluteUrl(p),
    changeFrequency: (p === "/" || p === "/insights" ? "weekly" : "monthly") as "weekly" | "monthly",
    priority: p === "/" ? 1 : p === "/insights" ? 0.9 : 0.7,
    ...(p === "/insights" || p === "/" ? { lastModified: latest } : {}),
  }));
  const articles = posts.map((p) => ({
    url: absoluteUrl(`/insights/${p.slug}`),
    lastModified: p.updated || p.date,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  const topics = getTags().map((t) => ({
    url: absoluteUrl(`/insights/topic/${slugify(t)}`),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));
  const partners = getPartners().map((p) => ({
    url: absoluteUrl(`/partners/${p.slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...pages, ...articles, ...partners, ...topics];
}
