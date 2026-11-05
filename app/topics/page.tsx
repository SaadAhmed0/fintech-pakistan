import Link from "next/link";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { getTopics } from "@/lib/content";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Topics",
  description: "Browse Fintech Pakistan by topic: stablecoins, USD accounts, regulation, freelancers, payments, remittances and banking, with the news and companies behind each.",
  path: "/topics",
});

export default function Topics() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Topics", path: "/topics" }])} />
      <PageHero id="topics-title" eyebrow="Topics" title={<>Everything we cover, <span className="soft">by topic.</span></>} />
      <section className="block band paper" aria-label="Topics">
        <div className="wrap grid-3">
          {getTopics().map((t) => (
            <Link key={t.slug} className="card card-light" href={`/topics/${t.slug}`}><h2>{t.name}</h2><p>{t.description}</p></Link>
          ))}
        </div>
      </section>
    </>
  );
}
