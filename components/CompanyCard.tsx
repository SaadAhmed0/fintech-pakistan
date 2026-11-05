import Link from "next/link";
import type { Availability, Company } from "@/lib/content";

export type CompanyCardData = Pick<Company, "slug" | "path" | "name" | "description" | "pakistanAvailability" | "usdAccount" | "card" | "stablecoins" | "label">;

export const AVAILABILITY: Record<Availability, string> = {
  yes: "Says it serves Pakistan",
  reported: "Reported in Pakistan",
  no: "Not available in Pakistan",
  "": "Needs verification",
};

export default function CompanyCard({ company: c, headingLevel = 3 }: { company: CompanyCardData; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  return (
    <Link className="card card-light ccard" href={c.path}>
      <span className="label">{AVAILABILITY[c.pakistanAvailability]}{c.label && ` · ${c.label}`}</span>
      <H>{c.name}</H>
      <p>{c.description}</p>
      <span className="ccard-tags">
        {c.usdAccount && <span>USD account</span>}
        {c.card && <span>Card</span>}
        {c.stablecoins.map((s) => <span key={s}>{s}</span>)}
      </span>
    </Link>
  );
}

export const UNKNOWN = "Needs verification";
const yesNo = (v: boolean | null) => (v === null ? UNKNOWN : v ? "Yes" : "No");
const listOr = (v: string[]) => (v.length ? v.join(", ") : UNKNOWN);

export function companyFacts(c: Company): [string, string][] {
  return [
    ["Pakistan availability", AVAILABILITY[c.pakistanAvailability]],
    ["PVARA status", c.pvaraStatus || UNKNOWN],
    ["USD account", yesNo(c.usdAccount)],
    ["Card", yesNo(c.card)],
    ["Stablecoins", listOr(c.stablecoins)],
    ["Fees", c.fees || UNKNOWN],
    ["KYC", c.kyc || UNKNOWN],
    ["Licences", listOr(c.licenses)],
    ["Regulators", listOr(c.regulators)],
    ["Founded", c.founded || UNKNOWN],
    ["Headquarters", c.hq || UNKNOWN],
  ];
}
