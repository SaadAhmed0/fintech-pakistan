import Link from "next/link";
import { getPartners } from "@/lib/content";
import PartnerLogo from "./PartnerLogo";

export default function Partners({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  return (
    <div className="grid-3">
      {getPartners().map((p) => (
        <Link key={p.slug} className="pcard" href={`/partners/${p.slug}`}>
          <PartnerLogo partner={p} />
          <span className="pcard-body">
            <span className="label">{p.type}</span>
            <H>{p.name}</H>
            <span className="pcard-focus">{p.focus}</span>
            <span className="go">VIEW PARTNER →</span>
          </span>
        </Link>
      ))}
    </div>
  );
}
