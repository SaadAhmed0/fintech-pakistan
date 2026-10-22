import { getAllPosts } from "@/lib/posts";
import { absoluteUrl, site } from "@/lib/site";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const posts = getAllPosts();
  const items = posts.map((p) => {
    const url = absoluteUrl(`/insights/${p.slug}`);
    return `<item>
  <title>${esc(p.title)}</title>
  <link>${url}</link>
  <guid isPermaLink="true">${url}</guid>
  <pubDate>${new Date(p.date + "T00:00:00Z").toUTCString()}</pubDate>
  <category>${esc(p.tag)}</category>
  <description>${esc(p.description)}</description>
  <content:encoded><![CDATA[${p.html}]]></content:encoded>
</item>`;
  }).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
<channel>
  <title>${esc(site.name)} Insights</title>
  <link>${absoluteUrl("/insights")}</link>
  <description>${esc("Short, sourced reads on payments, banking, corridors and regulation in Pakistan.")}</description>
  <language>en</language>
  <atom:link href="${absoluteUrl("/insights/feed.xml")}" rel="self" type="application/rss+xml"/>
${items}
</channel>
</rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
