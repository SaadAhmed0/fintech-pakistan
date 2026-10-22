import { getAllPosts, getPost } from "@/lib/posts";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Fintech Pakistan Insights";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug)!;
  return ogImage({ eyebrow: `Insights · ${p.tag}`, title: p.title, footer: `${p.readingTime} MIN READ` });
}
