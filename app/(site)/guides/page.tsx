import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import PostList from "@/components/PostList";
import { getGuides } from "@/lib/content";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { page } from "@/lib/cms";

export function generateMetadata() {
  return pageMetadata({ ...page("guidesPage").seo, path: "/guides" });
}

export default function Guides() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Guides", path: "/guides" }])} />
      <PageHero id="guides-title" title={page("guidesPage").hero.title} lede={page("guidesPage").hero.lede || undefined} />
      <PostList posts={getGuides()} />
    </>
  );
}
