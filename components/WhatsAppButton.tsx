import Link from "next/link";
import { site } from "@/lib/site";

// Links to the WhatsApp invite once it is set in lib/site.ts. Until then it
// sends people to the contact page so the button never dead-ends.
export default function WhatsAppButton({ label = "Join on WhatsApp" }: { label?: string }) {
  if (site.whatsappInvite) {
    return <a className="btn btn-signal" href={site.whatsappInvite} target="_blank" rel="noopener">{label} <span className="arrow">→</span></a>;
  }
  return <Link className="btn btn-signal" href="/contact?topic=Community%20question">Ask how to join <span className="arrow">→</span></Link>;
}
