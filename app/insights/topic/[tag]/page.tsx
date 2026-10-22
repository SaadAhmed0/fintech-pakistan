import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import InsightsList from "@/components/InsightsList";
import { getPostsByTag, getTags, slugify } from "@/lib/posts";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ tag: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getTags().map((t) => ({ tag: slugify(t) }));
}

function tagName(slug: string) {
  return getTags().find((t) => slugify(t) === slug);
}

export async function generateMetadata({ params }: Props) {
  const { tag } = await params;
  const name = tagName(tag) ?? tag;
  return pageMetadata({
    title: `${name}: Pakistan Fintech Insights`,
    description: `Sourced articles on ${name.toLowerCase()} in Pakistan's fintech market, from Fintech Pakistan.`,
    path: `/insights/topic/${tag}`,
  });
}

export default async function Topic({ params }: Props) {
  const { tag } = await params;
  const name = tagName(tag);
  if (!name) notFound();
  const posts = getPostsByTag(tag);
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Insights", path: "/insights" }, { name, path: `/insights/topic/${tag}` }])} />
      <PageHero id="topic-title" eyebrow={`Insights · ${name}`} title={<>{name} <span className="soft">in Pakistan.</span></>}
        lede={`${posts.length} sourced ${posts.length === 1 ? "read" : "reads"} on ${name.toLowerCase()}.`} />
      <InsightsList posts={posts} current={tag} />
    </>
  );
}
