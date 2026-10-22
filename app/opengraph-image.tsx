import { ogImage, ogSize } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: ${site.tagline}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Community · Podcast · Events · Insights", title: site.tagline, footer: site.url.replace(/^https?:\/\//, "").toUpperCase() });
}
