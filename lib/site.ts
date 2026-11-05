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
    "News and a company directory covering fintechs and stablecoin neobanks entering or serving Pakistan, from launches and funding to SBP, PVARA and SECP rules.",
  locale: "en_PK",
  language: "en",

  // Leave empty until ready. Empty values hide the related buttons instead of
  // showing a broken link.
  contactEmail: "",
  // The contact page sends people here until there is a contact form.
  contactLinkedin: "https://www.linkedin.com/in/naumanmurad/",
  whatsappInvite: "https://chat.whatsapp.com/HK87C1F5LOJ1njo4MHvZPg",
  social: {
    linkedin: "https://www.linkedin.com/company/fintechpakistan/",
    x: "",
    youtube: "",
  },

  // Shown on /team and in the Organization schema. Empty bio or linkedin values
  // are hidden on the page.
  team: [
    { name: "Nauman Ali Murad", role: "Co-founder", bio: "", linkedin: "https://www.linkedin.com/in/naumanmurad/" },
    { name: "Saad Ahmed Siddiqui", role: "Co-founder", bio: "", linkedin: "https://www.linkedin.com/in/saad-ahmed-siddiqui-9ab86819b/" },
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

type NavLink = { href: string; label: string };
type NavGroup = { label: string; items: NavLink[] };

export const nav: (NavLink | NavGroup)[] = [
  { href: "/news", label: "News" },
  { href: "/guides", label: "Guides" },
  { href: "/companies", label: "Companies" },
  { label: "Community", items: [{ href: "/community", label: "Join the community" }, { href: "/events", label: "Events" }] },
  {
    label: "About us",
    items: [
      { href: "/about", label: "About" },
      { href: "/our-story", label: "Our Story" },
      { href: "/team", label: "Team" },
      { href: "/partners", label: "Partners" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

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
