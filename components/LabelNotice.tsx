import Link from "next/link";
import type { Label } from "@/lib/content";

const TEXT: Record<Exclude<Label, "">, string> = {
  Partner: "has a commercial or community relationship with Fintech Pakistan.",
  Sponsored: "is paid content. The sponsor paid for this to appear on Fintech Pakistan.",
};

// The disclosure shown on anything paid or client-related.
export default function LabelNotice({ label, subject = "This content" }: { label: Exclude<Label, "">; subject?: string }) {
  const text = label === "Partner" ? `${subject} involves a company that ${TEXT.Partner}` : `${subject} ${TEXT.Sponsored}`;
  return (
    <p className="label-notice">
      <b>{label}</b>
      <span>{text} <Link href="/editorial-policy#partners">How we label this</Link>.</span>
    </p>
  );
}
