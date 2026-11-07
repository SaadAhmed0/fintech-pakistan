import Link from "next/link";

// Links to the WhatsApp invite once it is set in Site settings. Until then it
// sends people to the contact page so the button never dead-ends.
export default function WhatsAppButton({ invite, label = "Join on WhatsApp" }: { invite: string; label?: string }) {
  if (invite) {
    return <a className="btn btn-signal" href={invite} target="_blank" rel="noopener">{label}</a>;
  }
  return <Link className="btn btn-signal" href="/contact?topic=Community%20question">Ask how to join</Link>;
}
