// Single source of truth for site-wide settings. Edit values here and every
// page, link, schema block and feed updates.

export const site = {
  name: "Fintech Pakistan",
  // Other ways people write the name. Tells Google these searches mean this site.
  alternateNames: ["FintechPakistan", "Fintech PK", "FP"],
  shortName: "FP",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://fintechpakistan.com").replace(/\/$/, ""),
  tagline: "Where Pakistan's fintech connects.",
  description:
    "The community, stage and voice of fintech in Pakistan, and the markets it connects to. For the founders, operators and regulators shaping how money moves here.",
  locale: "en_PK",
  language: "en",

  // Leave empty until ready. Empty values hide the related buttons instead of
  // showing a broken link.
  contactEmail: "",
  whatsappInvite: "https://chat.whatsapp.com/HK87C1F5LOJ1njo4MHvZPg",
  social: {
    linkedin: "",
    x: "",
    youtube: "",
    spotify: "",
  },

  // Shown on /team and in the Organization schema. Empty bio or linkedin values
  // are hidden on the page.
  team: [
    { name: "Nauman Ali Murad", role: "Co-founder", bio: "", linkedin: "" },
    { name: "Saad Ahmed Siddiqui", role: "Co-founder", bio: "", linkedin: "" },
  ],

  summit: {
    name: "The Rails Summit",
    city: "Lahore",
    // ISO date (YYYY-MM-DD). When set, the date shows on the site and an Event
    // schema is added to /events for Google rich results.
    date: "",
    venue: "",
  },
};

export const nav = [
  { href: "/community", label: "Community" },
  { href: "/events", label: "Events" },
  { href: "/insights", label: "Insights" },
  { href: "/partners", label: "Partners" },
  { href: "/about", label: "About" },
  { href: "/our-story", label: "Our Story" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
] as const;

export function absoluteUrl(path = "/") {
  return site.url + (path.startsWith("/") ? path : `/${path}`);
}

export function sameAs(): string[] {
  return Object.values(site.social).filter(Boolean);
}

export function summitWhen() {
  const city = site.summit.city.toUpperCase();
  if (!site.summit.date) return city;
  const d = new Date(site.summit.date + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  return `${d.toUpperCase()} · ${city}`;
}
