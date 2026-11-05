import { getNews } from "@/lib/content";
import { absoluteUrl, site } from "@/lib/site";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const TWO_DAYS = 2 * 24 * 60 * 60 * 1000;

// Google News only reads articles published in the last two days. This file is
// generated at build time, so each deploy refreshes it.
export function GET() {
  const cutoff = Date.now() - TWO_DAYS;
  const urls = getNews()
    .filter((p) => new Date(p.published).getTime() >= cutoff)
    .map((p) => `<url>
  <loc>${absoluteUrl(p.path)}</loc>
  <news:news>
    <news:publication>
      <news:name>${esc(site.name)}</news:name>
      <news:language>${site.language}</news:language>
    </news:publication>
    <news:publication_date>${p.published}</news:publication_date>
    <news:title>${esc(p.title)}</news:title>
  </news:news>
</url>`)
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
