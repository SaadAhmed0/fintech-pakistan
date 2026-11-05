import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import PostList from "@/components/PostList";
import { getGuides } from "@/lib/content";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Guides to Stablecoins and USD Accounts",
  description: "Plain-English guides to stablecoins, USD accounts, payments and regulation for people and companies in Pakistan, with sources and a clear update date.",
  path: "/guides",
});

export default function Guides() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Guides", path: "/guides" }])} />
      <PageHero id="guides-title" title="Guides"
        lede="Explainers on stablecoins, USD accounts, payments and regulation in Pakistan. General information, not financial advice." />
      <PostList posts={getGuides()} />
    </>
  );
}
