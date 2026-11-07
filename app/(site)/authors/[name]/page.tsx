import { notFound } from "next/navigation";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import PostCard from "@/components/PostCard";
import { getAuthor, getAuthors, getPostsByAuthor } from "@/lib/content";
import { authorLd, breadcrumbLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ name: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAuthors().map((a) => ({ name: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;
  const a = getAuthor(name);
  return a ? pageMetadata({ title: `${a.name}, ${a.role}`, description: a.bio, path: `/authors/${a.slug}` }) : {};
}

export default async function AuthorPage({ params }: Props) {
  const { name } = await params;
  const a = getAuthor(name);
  if (!a) notFound();
  const posts = getPostsByAuthor(a.slug);
  return (
    <>
      <JsonLd data={[authorLd(a), breadcrumbLd([{ name: a.name, path: `/authors/${a.slug}` }])]} />
      <PageHero id="author-title" eyebrow={a.role} title={a.name} lede={a.bio} />
      <section className="block band paper" aria-label="Biography">
        <div className="article"><div className="article-body" dangerouslySetInnerHTML={{ __html: a.html }} /></div>
      </section>
      {posts.length > 0 && (
        <section className="block band white" aria-labelledby="author-posts">
          <div className="wrap">
            <div className="head"><h2 id="author-posts">Latest from <span className="soft-accent">{a.name}.</span></h2></div>
            <div className="grid-3">{posts.map((p) => <PostCard key={p.path} post={p} />)}</div>
          </div>
        </section>
      )}
    </>
  );
}
