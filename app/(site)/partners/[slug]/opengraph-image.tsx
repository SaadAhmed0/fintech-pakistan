import { getPartner, getPartners } from "@/lib/content";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Fintech Pakistan partner";

export function generateStaticParams() {
  return getPartners().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPartner(slug)!;
  return ogImage({ eyebrow: `${p.type} · ${p.focus}`, title: `${p.name} × Fintech Pakistan`, footer: p.website.replace(/^https?:\/\//, "").toUpperCase() });
}
