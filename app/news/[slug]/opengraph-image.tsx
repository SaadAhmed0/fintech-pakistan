import { getNews, getPost } from "@/lib/content";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Fintech Pakistan news";

export function generateStaticParams() {
  return getNews().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost("news", slug)!;
  return ogImage({ eyebrow: `News · ${p.tags[0]}`, title: p.title, footer: `${p.readingTime} MIN READ` });
}
