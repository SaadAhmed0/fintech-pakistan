import Link from "next/link";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { getTopics } from "@/lib/content";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { page } from "@/lib/cms";

export function generateMetadata() {
  return pageMetadata({ ...page("topicsPage").seo, path: "/topics" });
}

export default function Topics() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Topics", path: "/topics" }])} />
      <PageHero id="topics-title" title={page("topicsPage").hero.title} lede={page("topicsPage").hero.lede || undefined} />
      <section className="block band paper" aria-label="Topics">
        <div className="wrap grid-3">
          {getTopics().map((t) => (
            <Link key={t.slug} className="card" href={`/topics/${t.slug}`}><h2>{t.name}</h2><p>{t.description}</p></Link>
          ))}
        </div>
      </section>
    </>
  );
}
