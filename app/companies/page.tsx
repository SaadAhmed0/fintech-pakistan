import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import CompanyDirectory from "@/components/CompanyDirectory";
import { getCompanies } from "@/lib/content";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Stablecoin Neobanks in Pakistan: Directory",
  description: "A sourced directory of stablecoin neobanks and fintechs serving Pakistan. Filter by USD account, card and stablecoin, and see when each was last verified.",
  path: "/companies",
});

export default function Companies() {
  const companies = getCompanies().map(({ slug, path, name, description, pakistanAvailability, usdAccount, card, stablecoins, label, pick }) =>
    ({ slug, path, name, description, pakistanAvailability, usdAccount, card, stablecoins, label, pick }));
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Companies", path: "/companies" }])} />
      <PageHero id="companies-title" eyebrow="Company directory" title={<>Who actually serves <span className="soft">Pakistan.</span></>}
        lede="Every profile shows what is confirmed, what is only reported, and when we last checked. If we can't source a fact, we leave it blank and say so." />
      <section className="block band paper" aria-label="Companies">
        <div className="wrap"><CompanyDirectory companies={companies} /></div>
      </section>
    </>
  );
}
