import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import PostList from "@/components/PostList";
import { getNews } from "@/lib/content";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { page } from "@/lib/cms";

export function generateMetadata() {
  return pageMetadata({ ...page("newsPage").seo, path: "/news" });
}

export default function News() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "News", path: "/news" }])} />
      <PageHero id="news-title" title={page("newsPage").hero.title} lede={page("newsPage").hero.lede || undefined} />
      <PostList posts={getNews()} />
    </>
  );
}
