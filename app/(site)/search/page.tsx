import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import SearchClient from "@/components/SearchClient";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { page } from "@/lib/cms";

export function generateMetadata() {
  return pageMetadata({ ...page("searchPage").seo, path: "/search", noindex: true });
}

export default function Search() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Search", path: "/search" }])} />
      <PageHero id="search-title" title={page("searchPage").hero.title} lede={page("searchPage").hero.lede || undefined} />
      <section className="block band paper" aria-label="Search">
        <div className="wrap"><Suspense><SearchClient /></Suspense></div>
      </section>
    </>
  );
}
