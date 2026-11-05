import Link from "next/link";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Editorial Policy",
  description: "How Fintech Pakistan sources facts, verifies company data, labels partner and sponsored content, and corrects mistakes across its news, guides and directory.",
  path: "/editorial-policy",
});

const SECTIONS: { id: string; title: string; body: string[] }[] = [
  { id: "sources", title: "How we source facts", body: [
    "We start with the people who publish the information: regulators such as the State Bank of Pakistan, PVARA and SECP, then company documents, then reputable reporting.",
    "Every number links to where it came from. If we can't trace a fact to a source, we leave it out and say so.",
    "We separate what a company says about itself, what a third party reports, and what a regulator has confirmed.",
  ] },
  { id: "directory", title: "How the company directory works", body: [
    "We never guess a company's fees, licences or availability. Anything unconfirmed shows as Needs verification.",
    "Each profile shows a last verified date, which is the day we last checked its sources. It does not mean the company or a regulator confirmed the profile.",
    "Says it serves Pakistan means the company states this itself. Reported in Pakistan means a third party states it and the company has not confirmed it to us.",
    "A profile stays out of search engines until it has enough sourced information to be useful.",
  ] },
  { id: "partners", title: "Partner and sponsored content", body: [
    "Some companies we cover are partners of Fintech Pakistan. Their profiles and any related posts carry a Partner label and a disclosure.",
    "Anything paid for carries a Sponsored label and a disclosure.",
    "A listing in the directory is not an endorsement, and a commercial relationship does not change the facts we state about a company.",
    "Our pick marks the company we currently rate highest for Pakistan. It is our own opinion, and if a pick is a partner, the profile says so next to it.",
  ] },
  { id: "advice", title: "Not financial advice", body: [
    "Our guides and profiles are general information, not financial, legal or tax advice. Rules, fees and availability change, so check with the provider and your own adviser before you act.",
  ] },
  { id: "corrections", title: "Updates and corrections", body: [
    "When the facts in a post change, we correct it and show the updated date. The URL stays the same.",
  ] },
];

export default function EditorialPolicy() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Editorial Policy", path: "/editorial-policy" }])} />
      <PageHero id="policy-title" title="Editorial policy"
        lede="Fintech Pakistan covers money, so accuracy comes first. These are the standards behind our news, guides and company directory." />
      <section className="block band paper" aria-label="Policy">
        <div className="article">
          <div className="article-body">
            {SECTIONS.map((s) => (
              <div key={s.id} id={s.id} className="policy-section">
                <h2>{s.title}</h2>
                {s.body.map((p) => <p key={p}>{p}</p>)}
              </div>
            ))}
            <p>Spotted a mistake? <Link href="/contact">Tell us</Link> and we&apos;ll check it.</p>
          </div>
        </div>
      </section>
    </>
  );
}
