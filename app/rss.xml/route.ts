import { getAllPosts } from "@/lib/content";
import { absoluteUrl, site } from "@/lib/site";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const posts = getAllPosts();
  const items = posts.map((p) => {
    const url = absoluteUrl(p.path);
    return `<item>
  <title>${esc(p.title)}</title>
  <link>${url}</link>
  <guid isPermaLink="true">${url}</guid>
  <pubDate>${new Date(p.published.includes("T") ? p.published : p.date + "T00:00:00Z").toUTCString()}</pubDate>
  ${p.tags.map((t) => `<category>${esc(t)}</category>`).join("")}
  <description>${esc(p.description)}</description>
  <content:encoded><![CDATA[${p.html}]]></content:encoded>
</item>`;
  }).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
<channel>
  <title>${esc(site.name)}</title>
  <link>${absoluteUrl("/news")}</link>
  <description>${esc(site.description)}</description>
  <language>en</language>
  <lastBuildDate>${new Date((posts[0]?.updated || posts[0]?.date || "1970-01-01") + "T00:00:00Z").toUTCString()}</lastBuildDate>
  <atom:link href="${absoluteUrl("/rss.xml")}" rel="self" type="application/rss+xml"/>
${items}
</channel>
</rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
