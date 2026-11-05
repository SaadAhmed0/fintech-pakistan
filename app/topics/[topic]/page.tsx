import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CompanyCard from "@/components/CompanyCard";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import PostCard from "@/components/PostCard";
import { getCompaniesByTopic, getPostsByTopic, getTopic, getTopics, topicItemCount } from "@/lib/content";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ topic: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getTopics().map((t) => ({ topic: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic } = await params;
  const t = getTopic(topic);
  if (!t) return {};
  // A topic with under two items would be thin, so it stays out of search until it fills up.
  return pageMetadata({ title: `${t.name} in Pakistan`, description: t.description, path: `/topics/${t.slug}`, noindex: topicItemCount(t.slug) < 2 });
}

export default async function TopicPage({ params }: Props) {
  const { topic } = await params;
  const t = getTopic(topic);
  if (!t) notFound();
  const posts = getPostsByTopic(t.slug);
  const companies = getCompaniesByTopic(t.slug);
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Topics", path: "/topics" }, { name: t.name, path: `/topics/${t.slug}` }])} />
      <PageHero id="topic-title" eyebrow="Topic" title={<>{t.name} <span className="soft">in Pakistan.</span></>} lede={t.description} />
      <section className="block band paper" aria-label="Overview">
        <div className="article"><div className="article-body" dangerouslySetInnerHTML={{ __html: t.html }} /></div>
      </section>
      {companies.length > 0 && (
        <section className="block band white" aria-labelledby="topic-companies">
          <div className="wrap">
            <div className="head"><h2 id="topic-companies">Companies</h2></div>
            <div className="grid-3">{companies.map((c) => <CompanyCard key={c.slug} company={c} />)}</div>
          </div>
        </section>
      )}
      {posts.length > 0 && (
        <section className="block band paper" aria-labelledby="topic-posts">
          <div className="wrap">
            <div className="head"><h2 id="topic-posts">News and guides</h2></div>
            <div className="grid-3">{posts.map((p) => <PostCard key={p.path} post={p} />)}</div>
          </div>
        </section>
      )}
    </>
  );
}
