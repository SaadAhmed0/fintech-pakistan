import { getAllPosts, getAuthors, getCompanies, getComparisons, getPartners, getTopics } from "@/lib/content";
import { site } from "@/lib/site";
import { page, pageWithBody } from "@/lib/cms";

export const dynamic = "force-static";

const plain = (html: string) => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

// Every string in a page's content file, so anything a reader remembers can be found.
const strings = (v: unknown): string[] => (typeof v === "string" ? [v] : Array.isArray(v) ? v.flatMap(strings) : v && typeof v === "object" ? Object.values(v).flatMap(strings) : []);
const entry = (path: string, data: { hero: { title: string }; seo: { description: string } }, extra = "") => ({ title: data.hero.title, path, text: data.seo.description, body: `${strings(data).join(" ")} ${extra}` });

function pages() {
  return [
    entry("/community", page("community")),
    entry("/events", page("events")),
    entry("/partners", page("partnersPage")),
    entry("/about", pageWithBody("about"), plain(pageWithBody("about").html)),
    entry("/our-story", pageWithBody("ourStory"), plain(pageWithBody("ourStory").html)),
    entry("/team", page("team"), site.team.map((m) => `${m.name} ${m.role}`).join(" ")),
    entry("/contact", page("contact")),
    entry("/editorial-policy", pageWithBody("editorialPolicy"), plain(pageWithBody("editorialPolicy").html)),
  ];
}

export function GET() {
  const items = [
    ...getAllPosts().map((p) => ({ title: p.title, path: p.path, type: p.kind === "news" ? "News" : "Guide", text: p.description, body: `${p.tags.join(" ")} ${plain(p.html)}` })),
    ...getCompanies().map((c) => ({
      title: c.name,
      path: c.path,
      type: "Company",
      text: c.description,
      body: [c.aliases, c.stablecoins, c.licenses, c.topics].flat().concat(c.fees, c.kyc, c.hq, c.pakistanNote, plain(c.html)).join(" "),
    })),
    ...getComparisons().map((c) => ({ title: c.title, path: c.path, type: "Comparison", text: c.description, body: plain(c.html) })),
    ...getTopics().map((t) => ({ title: t.name, path: `/topics/${t.slug}`, type: "Topic", text: t.description, body: plain(t.html) })),
    ...getPartners().map((p) => ({ title: p.name, path: `/partners/${p.slug}`, type: "Partner", text: p.description, body: `${p.focus} ${plain(p.html)}` })),
    ...getAuthors().map((a) => ({ title: a.name, path: `/authors/${a.slug}`, type: "Author", text: a.bio, body: plain(a.html) })),
    ...pages().map((p) => ({ ...p, type: "Page" })),
  ];
  return Response.json(items);
}
