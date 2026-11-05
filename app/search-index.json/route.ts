import { getAllPosts, getCompanies, getTopics } from "@/lib/content";

export const dynamic = "force-static";

export function GET() {
  const items = [
    ...getAllPosts().map((p) => ({ title: p.title, path: p.path, type: p.kind === "news" ? "News" : "Guide", text: p.description })),
    ...getCompanies().map((c) => ({ title: c.name, path: c.path, type: "Company", text: c.description })),
    ...getTopics().map((t) => ({ title: t.name, path: `/topics/${t.slug}`, type: "Topic", text: t.description })),
  ];
  return Response.json(items);
}
