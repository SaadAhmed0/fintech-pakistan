import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import PostList from "@/components/PostList";
import { getNews } from "@/lib/content";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pakistan Stablecoin and Fintech News",
  description: "Breaking news on stablecoin neobanks and fintechs entering Pakistan: launches, funding and regulation from SBP, PVARA and SECP, with every claim sourced.",
  path: "/news",
});

export default function News() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "News", path: "/news" }])} />
      <PageHero id="news-title" eyebrow="News" title={<>What&apos;s moving <span className="soft">Pakistan&apos;s money.</span></>}
        lede="Launches, funding and regulation for stablecoin neobanks and fintechs entering or serving Pakistan. Every number links back to where it came from." />
      <PostList posts={getNews()} />
    </>
  );
}
