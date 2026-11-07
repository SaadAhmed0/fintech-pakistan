import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Newsreader } from "next/font/google";
import { site } from "@/lib/site";

const serif = Newsreader({ subsets: ["latin"], variable: "--font-serif", display: "optional" });
const body = Instrument_Sans({ subsets: ["latin"], variable: "--font-body", display: "optional" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: ${site.tagline.replace(/\.$/, "")}`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  alternates: {
    canonical: site.url,
    types: { "application/rss+xml": [{ url: "/rss.xml", title: site.name }] },
  },
  openGraph: { type: "website", siteName: site.name, locale: site.locale, url: site.url },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0C3B2A",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Root of every route. The public site adds its frame in app/(site)/layout.tsx,
// and the admin in app/keystatic/layout.tsx.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-PK" className={`${serif.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
