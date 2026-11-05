import { getAllPosts, getAuthors, getCompanies, getComparisons, getPartners, getTopics } from "@/lib/content";
import { site } from "@/lib/site";

export const dynamic = "force-static";

const plain = (html: string) => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

// Every page on the site, with its full text, so anything a reader remembers can be found.
const PAGES = [
  { title: "Community", path: "/community", text: "A free WhatsApp community for people building fintech in Pakistan.", body: "join whatsapp channels general news regulation ask help jobs opportunities meetups house rules" },
  { title: "Events", path: "/events", text: "FP Live meetups, closed-door roundtables and the Rails Summit.", body: "fp live meetups roundtables rails summit lahore speak sponsor" },
  { title: "Partners", path: "/partners", text: "Work with Fintech Pakistan on events, community and launches.", body: "partner sponsor launch pr agency market entry" },
  { title: "About", path: "/about", text: "What Fintech Pakistan is and what we do.", body: "about missing block mission" },
  { title: "Our Story", path: "/our-story", text: "How two colleagues at Sorbet became Pakistan's launch partner.", body: "story founders sorbet launch partner agency" },
  { title: "Team", path: "/team", text: "The team behind Fintech Pakistan.", body: site.team.map((m) => `${m.name} ${m.role}`).join(" ") },
  { title: "Contact", path: "/contact", text: "Reach us on LinkedIn for partnerships, press or speaking.", body: "contact linkedin press speaking partnership" },
  { title: "Editorial Policy", path: "/editorial-policy", text: "How we source facts, label partners and correct mistakes.", body: "editorial policy sources corrections sponsored partner disclosure verification" },
];

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
    ...PAGES.map((p) => ({ ...p, type: "Page" })),
  ];
  return Response.json(items);
}
