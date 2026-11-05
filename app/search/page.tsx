import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import SearchClient from "@/components/SearchClient";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Search",
  description: "Search Fintech Pakistan's news, guides and company directory.",
  path: "/search",
  noindex: true,
});

export default function Search() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Search", path: "/search" }])} />
      <PageHero id="search-title" title="Search" />
      <section className="block band paper" aria-label="Search">
        <div className="wrap"><Suspense><SearchClient /></Suspense></div>
      </section>
    </>
  );
}
