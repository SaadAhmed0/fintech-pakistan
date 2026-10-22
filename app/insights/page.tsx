import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import InsightsList from "@/components/InsightsList";
import { getAllPosts } from "@/lib/posts";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Insights: Sourced Analysis of Pakistan Fintech",
  description: "Short, sourced reads on payments, Raast, digital banks, remittance corridors and regulation in Pakistan. Every number links to where it came from.",
  path: "/insights",
});

export default function Insights() {
  const posts = getAllPosts();
  const blogLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": absoluteUrl("/insights#blog"),
    name: `${site.name} Insights`,
    url: absoluteUrl("/insights"),
    publisher: { "@id": absoluteUrl("/#organization") },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: absoluteUrl(`/insights/${p.slug}`),
      datePublished: p.date,
    })),
  };
  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: "Insights", path: "/insights" }]), blogLd]} />
      <PageHero id="insights-title" eyebrow="Insights" title={<>What&apos;s moving <span className="soft">Pakistan&apos;s money.</span></>}
        lede="Short, sourced reads on payments, banking, corridors and regulation in Pakistan. Every number links back to where it came from." />
      <InsightsList posts={posts} />
    </>
  );
}
