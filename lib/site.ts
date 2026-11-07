// Site-wide settings. The values are edited in the admin (Site settings, and
// Menu and footer) and stored in content/settings/. Only technical values that
// should not change from the admin live here.
import { has, navigation, page, settings } from "./cms";

function load() {
  const s = settings();
  const events = page("events");
  return {
  name: s.name,
  shortName: s.shortName || s.name,
  // Other ways people write the name. Tells Google these searches mean this site.
  alternateNames: s.alternateNames.filter(has),
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://fintechpakistan.com").replace(/\/$/, ""),
  tagline: s.tagline,
  description: s.description,
  locale: "en_PK",
  language: "en",
  contactEmail: s.contactEmail || "",
  contactLinkedin: s.contactLinkedin || "",
  whatsappInvite: s.whatsappInvite || "",
  social: { linkedin: s.social.linkedin || "", x: s.social.x || "", youtube: s.social.youtube || "" },
  team: s.team.map((m) => ({ name: m.name, role: m.role, bio: m.bio, linkedin: m.linkedin || "" })),
  summit: {
    name: events.summit.name,
    city: events.summit.city,
    // ISO date (YYYY-MM-DD). When set, the date shows on the site and an Event
    // schema is added to /events for Google rich results.
    date: events.summit.date || "",
    venue: events.summit.venue,
  },
  };
}

// Read on every access, so admin edits show on refresh under `npm run dev`.
// Production builds cache the files, so this costs nothing there.
export const site = new Proxy({} as ReturnType<typeof load>, { get: (_, key) => load()[key as keyof ReturnType<typeof load>] });

export type NavLink = { href: string; label: string };
export type NavGroup = { label: string; items: NavLink[] };
export type NavItem = NavLink | NavGroup;

export function getNav(): NavItem[] {
  return navigation().menu.map((m) =>
    m.children.length > 0 ? { label: m.label, items: m.children.map((c) => ({ label: c.label, href: c.href })) } : { label: m.label, href: m.href },
  );
}

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
