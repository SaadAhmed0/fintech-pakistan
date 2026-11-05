import type { NextConfig } from "next";

// The live site used /insights and /podcast. Each old URL goes straight to its
// new home in one hop, so links and rankings carry over.
const NEWS = ["fintech-pakistan-crypto-awaz-partnership", "pakistan-digital-payments-92-percent", "pakistan-remittances-fy26-record"];
const GUIDES = ["raast-instant-payments-explained", "pvara-virtual-asset-licensing", "pakistan-digital-banks-status", "why-fintech-pakistan-exists"];
const OLD_TOPICS: [string, string][] = [["payments", "/topics/payments"], ["rails", "/topics/payments"], ["corridors", "/topics/remittances"], ["banking", "/topics/banking"], ["regulation", "/topics/regulation"], ["from-us", "/news"]];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Lets phones and other devices on the local network load the dev server.
  // Next.js blocks this by default, and the page then never becomes interactive.
  allowedDevOrigins: ["192.168.*.*"],
  async redirects() {
    return [
      { source: "/insights/feed.xml", destination: "/rss.xml", permanent: true },
      ...NEWS.map((s) => ({ source: `/insights/${s}`, destination: `/news/${s}`, permanent: true })),
      ...GUIDES.map((s) => ({ source: `/insights/${s}`, destination: `/guides/${s}`, permanent: true })),
      ...OLD_TOPICS.map(([s, destination]) => ({ source: `/insights/topic/${s}`, destination, permanent: true })),
      { source: "/insights", destination: "/news", permanent: true },
      { source: "/podcast", destination: "/news", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
