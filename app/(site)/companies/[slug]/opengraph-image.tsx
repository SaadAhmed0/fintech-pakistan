import { getCompanies, getCompany } from "@/lib/content";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Fintech Pakistan company profile";

export function generateStaticParams() {
  return getCompanies().map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCompany(slug)!;
  return ogImage({ eyebrow: "Company profile", title: `${c.name} in Pakistan`, footer: c.lastVerified ? `LAST VERIFIED ${c.lastVerified}` : "NEEDS VERIFICATION" });
}
