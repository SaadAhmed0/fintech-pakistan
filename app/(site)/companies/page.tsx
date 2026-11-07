import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import CompanyDirectory from "@/components/CompanyDirectory";
import PakistanMap from "@/components/PakistanMap";
import { getCompanies } from "@/lib/content";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { page } from "@/lib/cms";

export function generateMetadata() {
  return pageMetadata({ ...page("companiesPage").seo, path: "/companies" });
}

export default function Companies() {
  const companies = getCompanies().map(({ slug, path, name, description, pakistanAvailability, usdAccount, card, stablecoins, label, pick }) =>
    ({ slug, path, name, description, pakistanAvailability, usdAccount, card, stablecoins, label, pick }));
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Companies", path: "/companies" }])} />
      <PageHero id="companies-title" title={page("companiesPage").hero.title} lede={page("companiesPage").hero.lede || undefined} aside={<PakistanMap />} />
      <section className="block band paper" aria-label="Companies">
        <div className="wrap"><CompanyDirectory companies={companies} /></div>
      </section>
    </>
  );
}
