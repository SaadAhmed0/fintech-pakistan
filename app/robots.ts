import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // The admin and its API are for editors only.
    rules: [{ userAgent: "*", allow: "/", disallow: ["/keystatic", "/api/", "/admin"] }],
    sitemap: [absoluteUrl("/sitemap.xml"), absoluteUrl("/news-sitemap.xml")],
  };
}
