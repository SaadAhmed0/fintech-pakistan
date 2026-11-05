import { notFound } from "next/navigation";
import PostLayout from "@/components/PostLayout";
import { getGuides, getPost, getRelated } from "@/lib/content";
import { postMetadata } from "@/lib/seo";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getGuides().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost("guides", slug);
  return p ? postMetadata(p) : {};
}

export default async function Guide({ params }: Props) {
  const { slug } = await params;
  const p = getPost("guides", slug);
  if (!p) notFound();
  return <PostLayout post={p} related={getRelated(p)} />;
}
