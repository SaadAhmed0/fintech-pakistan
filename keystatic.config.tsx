// The admin at /admin (served by Keystatic at /keystatic). Every collection and
// singleton here maps to files in content/, so the site, Claude and the admin
// all read and write the same Markdown and JSON.
import { collection, config, fields, singleton, type ComponentSchema } from "@keystatic/core";
import { block, repeating, wrapper } from "@keystatic/core/content-components";

const REPO = "SaadAhmed0/fintech-pakistan";

// Local files under `npm run dev`, GitHub everywhere else. Set
// NEXT_PUBLIC_KEYSTATIC_STORAGE=github to use GitHub while developing.
const useGithub = process.env.NODE_ENV === "production" || process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "github";

/* ---------- Shared fields ---------- */

const description = (min = 150, max = 160) =>
  fields.text({
    label: "Description",
    description: `${min} to ${max} characters. Used as the meta description, the social preview text and the intro under the headline.`,
    multiline: true,
    validation: { length: { min, max } },
  });

const sources = fields.array(
  fields.object({
    title: fields.text({ label: "Title", description: "Publisher, Headline (date)", validation: { length: { min: 1 } } }),
    url: fields.url({ label: "URL", validation: { isRequired: true } }),
  }),
  { label: "Sources", description: "Every number needs a source here.", itemLabel: (p) => p.fields.title.value || "Source" },
);

const faqs = fields.array(
  fields.object({
    q: fields.text({ label: "Question", validation: { length: { min: 1 } } }),
    a: fields.text({ label: "Answer", multiline: true, validation: { length: { min: 1 } } }),
  }),
  { label: "FAQs", description: "Optional. Shown at the end and added as FAQ schema for Google.", itemLabel: (p) => p.fields.q.value || "Question" },
);

const label = fields.select({
  label: "Label",
  description: "Partner or Sponsored on any paid or client content.",
  options: [
    { label: "None", value: "none" },
    { label: "Partner", value: "Partner" },
    { label: "Sponsored", value: "Sponsored" },
  ],
  defaultValue: "none",
});

const textList = (labelText: string, desc?: string) =>
  fields.array(fields.text({ label: labelText }), { label: labelText, description: desc, itemLabel: (p) => p.value || labelText });

const link = () =>
  fields.object({
    label: fields.text({ label: "Text", validation: { length: { min: 1 } } }),
    href: fields.text({ label: "Link", description: "A path such as /news, or a full URL.", validation: { length: { min: 1 } } }),
  });

const links = (labelText: string) => fields.array(link(), { label: labelText, itemLabel: (p) => p.fields.label.value || "Link" });

const seo = (defaultTitle = "") =>
  fields.object(
    {
      title: fields.text({ label: "Page title (for Google)", description: "Stay within 60 characters.", defaultValue: defaultTitle, validation: { length: { min: 1, max: 70 } } }),
      description: fields.text({ label: "Meta description", multiline: true, description: "120 to 160 characters.", validation: { length: { min: 50, max: 170 } } }),
    },
    { label: "Search and sharing" },
  );

const hero = () =>
  fields.object(
    {
      title: fields.text({ label: "Headline", validation: { length: { min: 1 } } }),
      lede: fields.text({ label: "Intro", multiline: true }),
    },
    { label: "Top of the page" },
  );

const card = () =>
  fields.object({
    label: fields.text({ label: "Small label", description: "The short line above the card title." }),
    title: fields.text({ label: "Title", validation: { length: { min: 1 } } }),
    text: fields.text({ label: "Text", multiline: true }),
    href: fields.text({ label: "Link (optional)", description: "Makes the whole card clickable. A path such as /events." }),
    linkText: fields.text({ label: "Link text", description: "Shown at the bottom of a linked card." }),
  });

const cards = (labelText = "Cards") => fields.array(card(), { label: labelText, itemLabel: (p) => p.fields.title.value || "Card" });

const section = (labelText: string) =>
  fields.object(
    {
      heading: fields.text({ label: "Heading", validation: { length: { min: 1 } } }),
      intro: fields.text({ label: "Intro (optional)", multiline: true }),
      cards: cards(),
    },
    { label: labelText },
  );

const steps = (labelText: string) =>
  fields.array(
    fields.object({ title: fields.text({ label: "Title", validation: { length: { min: 1 } } }), text: fields.text({ label: "Text", multiline: true }) }),
    { label: labelText, itemLabel: (p) => p.fields.title.value || "Step" },
  );

/* ---------- Article body ---------- */

const bodyComponents = {
  pull: wrapper({
    label: "Pull quote",
    description: "One per article at most. Put the highlighted part in italics.",
    schema: {},
  }),
  timeline: repeating({
    label: "Timeline",
    description: "Dated events in order.",
    children: ["timeline-item"],
    schema: {},
  }),
  "timeline-item": wrapper({
    label: "Timeline event",
    forSpecificLocations: true,
    ContentView: ({ value, children }) => (
      <div><strong style={{ display: "block", fontSize: 13, opacity: 0.8 }}>{value.when || "Set a date in Edit"}</strong>{children}</div>
    ),
    schema: { when: fields.text({ label: "When", description: "Such as March 2026", validation: { length: { min: 1 } } }) },
  }),
  status: repeating({
    label: "Status list",
    description: "Names with a status pill and a short detail, such as who is live and who is piloting.",
    children: ["status-item"],
    schema: {},
  }),
  "status-item": wrapper({
    label: "Status item",
    forSpecificLocations: true,
    ContentView: ({ value, children }) => (
      <div>
        <strong style={{ display: "block" }}>{value.name || "Set a name in Edit"}{value.pill ? ` · ${value.pill}` : ""}</strong>
        {children}
      </div>
    ),
    schema: {
      name: fields.text({ label: "Name", validation: { length: { min: 1 } } }),
      pill: fields.text({ label: "Pill text (optional)", description: "Such as Live · Jan 2025" }),
      style: fields.select({
        label: "Pill colour",
        options: [
          { label: "Live (green)", value: "live" },
          { label: "Pilot", value: "pilot" },
          { label: "Plain", value: "plain" },
        ],
        defaultValue: "plain",
      }),
    },
  }),
  chart: block({
    label: "Chart",
    description: "A sourced chart from the Charts section.",
    ContentView: ({ value }) => <div style={{ padding: 8, opacity: 0.8 }}>Chart: {String(value.name ?? "none chosen")}</div>,
    schema: { name: fields.relationship({ label: "Chart", collection: "charts", validation: { isRequired: true } }) as ComponentSchema },
  }),
};

const body = (imageDir: string) =>
  fields.markdoc({
    label: "Body",
    extension: "md",
    description: "Use Heading 2 for sections. They build the table of contents.",
    options: {
      heading: [2, 3],
      image: { directory: `public/images/${imageDir}`, publicPath: `/images/${imageDir}/` },
      codeBlock: false,
    },
    components: bodyComponents,
  });

/* ---------- Posts ---------- */

const post = (kind: "news" | "guides") =>
  collection({
    label: kind === "news" ? "News" : "Guides",
    path: `content/${kind}/*`,
    slugField: "title",
    format: { contentField: "content" },
    entryLayout: "content",
    columns: ["title", "date"],
    previewUrl: `/${kind}/{slug}`,
    schema: {
      title: fields.slug({
        name: { label: "Headline", description: "Stay within 60 characters where you can, main keyword near the front.", validation: { length: { min: 1, max: 100 } } },
        slug: { label: "URL", description: `The page lives at /${kind}/<this>. Lowercase words and hyphens. Don't change it after publishing.` },
      }),
      description: description(),
      date:
        kind === "news"
          ? fields.datetime({ label: "Published", description: "Pakistan time.", defaultValue: { kind: "now" }, validation: { isRequired: true } })
          : fields.date({ label: "Published", defaultValue: { kind: "today" }, validation: { isRequired: true } }),
      updated: fields.date({ label: "Updated", description: "Set when facts change. Leave empty otherwise." }),
      author: fields.relationship({ label: "Author", collection: "authors", validation: { isRequired: true } }),
      mainTopic: fields.relationship({ label: "Main topic", description: "Shown as the label on cards and the article.", collection: "topics" }),
      otherTopics: fields.multiRelationship({ label: "Other topics", collection: "topics" }),
      fromUs: fields.checkbox({ label: "About Fintech Pakistan itself", description: "Shows a From us label and keeps the post off the homepage, unless it has a Partner or Sponsored label." }),
      coverImage: fields.image({ label: "Cover image", description: "Optional. 1600 x 900, ideally .webp, under 500 KB. Only real images, never decoration.", directory: "public/covers", publicPath: "/covers/" }),
      coverAlt: fields.text({ label: "Cover image alt text", description: "Required when there is a cover image. Describe what it shows." }),
      draft: fields.checkbox({ label: "Draft", description: "Ticked posts stay off the live site. Untick to publish.", defaultValue: true }),
      label,
      lead: fields.checkbox({ label: "Lead story", description: "Puts this at the top of the homepage. Keep it on one post." }),
      chart: fields.relationship({ label: "Homepage chart", description: "Optional. Shown beside this story on the homepage.", collection: "charts" }),
      keyPoints: textList("Key points", 'Optional. 3 or 4 short points shown as "In short".'),
      faqs,
      sources,
      content: body(kind),
    },
  });

/* ---------- Config ---------- */

export default config({
  storage: useGithub ? { kind: "github", repo: REPO } : { kind: "local" },
  ui: {
    brand: {
      name: "Fintech Pakistan",
      // eslint-disable-next-line @next/next/no-img-element
      mark: () => <img src="/brand/fp-app-tile_green.svg" alt="" width={24} height={24} />,
    },
    navigation: {
      Publishing: ["news", "guides", "compare"],
      Directory: ["companies", "partners"],
      "Topics and people": ["topics", "authors"],
      Data: ["charts"],
      Pages: ["home", "about", "ourStory", "team", "community", "events", "partnersPage", "contact", "editorialPolicy", "newsPage", "guidesPage", "companiesPage", "topicsPage", "searchPage", "notFound"],
      Settings: ["settings", "navigation"],
    },
  },
  collections: {
    news: post("news"),
    guides: post("guides"),

    compare: collection({
      label: "Comparisons",
      path: "content/compare/*",
      slugField: "title",
      format: { contentField: "content" },
      entryLayout: "content",
      previewUrl: "/compare/{slug}",
      schema: {
        title: fields.slug({
          name: { label: "Headline", validation: { length: { min: 1 } } },
          slug: { label: "URL", description: "Must be <company-a>-vs-<company-b>, using two company URLs, such as sorbet-vs-karsa." },
        }),
        description: description(),
        date: fields.date({ label: "Published", defaultValue: { kind: "today" }, validation: { isRequired: true } }),
        updated: fields.date({ label: "Updated" }),
        author: fields.relationship({ label: "Author", collection: "authors", validation: { isRequired: true } }),
        draft: fields.checkbox({ label: "Draft", defaultValue: true }),
        sources,
        content: fields.markdoc({
          label: "Analysis",
          extension: "md",
          description: "250+ words: who each one suits and where they differ for someone in Pakistan. The fact table is added automatically.",
          options: { heading: [2, 3], image: false, codeBlock: false },
          components: bodyComponents,
        }),
      },
    }),

    companies: collection({
      label: "Companies",
      path: "content/companies/*",
      slugField: "name",
      format: { contentField: "content" },
      entryLayout: "content",
      previewUrl: "/companies/{slug}",
      schema: {
        name: fields.slug({ name: { label: "Name", validation: { length: { min: 1 } } }, slug: { label: "URL", description: "The profile lives at /companies/<this>." } }),
        description: description(),
        website: fields.url({ label: "Website", validation: { isRequired: true } }),
        aliases: textList("Other names", "Used to auto-link mentions in posts. Case sensitive."),
        founded: fields.text({ label: "Founded (year)" }),
        hq: fields.text({ label: "Headquarters" }),
        licenses: textList("Licences", "As stated by a source."),
        regulators: textList("Regulators", "Named by a source."),
        pvaraStatus: fields.text({ label: "PVARA status", description: "Only what PVARA or a cited report confirms." }),
        stablecoins: textList("Stablecoins", "Such as USDT, USDC."),
        pakistanAvailability: fields.select({
          label: "Available in Pakistan?",
          options: [
            { label: "Unknown (needs verification)", value: "unknown" },
            { label: "Yes, the company says so", value: "yes" },
            { label: "Reported by a third party", value: "reported" },
            { label: "No, confirmed unavailable", value: "no" },
          ],
          defaultValue: "unknown",
        }),
        pakistanNote: fields.text({ label: "Availability note", multiline: true, description: "One or two sentences on where the claim comes from." }),
        usdAccount: fields.select({ label: "USD account", options: [{ label: "Unknown", value: "unknown" }, { label: "Yes", value: "yes" }, { label: "No", value: "no" }], defaultValue: "unknown" }),
        card: fields.select({ label: "Card", options: [{ label: "Unknown", value: "unknown" }, { label: "Yes", value: "yes" }, { label: "No", value: "no" }], defaultValue: "unknown" }),
        fees: fields.text({ label: "Fees", multiline: true, description: "Quote the source and date." }),
        kyc: fields.text({ label: "KYC", multiline: true }),
        topics: fields.multiRelationship({ label: "Topics", collection: "topics" }),
        label,
        pick: fields.text({ label: "Our top pick", multiline: true, description: "Only for our top pick: why, plus any conflict of interest. Leave empty otherwise." }),
        lastVerified: fields.date({ label: "Last verified", description: "The date you last checked the sources." }),
        draft: fields.checkbox({ label: "Draft", defaultValue: true }),
        faqs,
        sources,
        content: fields.markdoc({
          label: "Profile",
          extension: "md",
          description: "What the company does, with claims attributed to their source. 60+ words for the profile to appear in Google.",
          options: { heading: [2, 3], image: false, codeBlock: false },
          components: bodyComponents,
        }),
      },
    }),

    partners: collection({
      label: "Partners",
      path: "content/partners/*",
      slugField: "name",
      format: { contentField: "content" },
      entryLayout: "content",
      previewUrl: "/partners/{slug}",
      schema: {
        name: fields.slug({ name: { label: "Name", validation: { length: { min: 1 } } }, slug: { label: "URL", description: "The page lives at /partners/<this>." } }),
        type: fields.select({ label: "Type", options: [{ label: "Partner", value: "Partner" }, { label: "Community partner", value: "Community partner" }], defaultValue: "Partner" }),
        focus: fields.text({ label: "Focus", description: "A few words, such as Neobank.", validation: { length: { min: 1 } } }),
        description: description(120, 160),
        website: fields.url({ label: "Website", validation: { isRequired: true } }),
        logo: fields.image({ label: "Logo", description: "White or colour logo, shown on a dark tile. PNG or SVG.", directory: "public/partners", publicPath: "/partners/", validation: { isRequired: true } }),
        logoWidth: fields.integer({ label: "Logo width (px)", validation: { isRequired: true, min: 1 }, defaultValue: 480 }),
        logoHeight: fields.integer({ label: "Logo height (px)", validation: { isRequired: true, min: 1 }, defaultValue: 160 }),
        showName: fields.checkbox({ label: "Show name beside the logo", description: "Tick for icon-only logos." }),
        order: fields.integer({ label: "Order", description: "Position in partner lists. Lower comes first.", defaultValue: 10 }),
        sameAs: fields.array(fields.url({ label: "Profile URL" }), { label: "Official social profiles", itemLabel: (p) => p.value || "URL" }),
        relatedNews: fields.multiRelationship({ label: "Related news", collection: "news" }),
        relatedGuides: fields.multiRelationship({ label: "Related guides", collection: "guides" }),
        sources,
        content: fields.markdoc({
          label: "About",
          extension: "md",
          description: "Start with a heading \"About <name>\". Only describe what the partner or a cited source says.",
          options: { heading: [2, 3], image: false, codeBlock: false },
          components: bodyComponents,
        }),
      },
    }),

    topics: collection({
      label: "Topics",
      path: "content/topics/*",
      slugField: "name",
      format: { contentField: "content" },
      previewUrl: "/topics/{slug}",
      schema: {
        name: fields.slug({ name: { label: "Name", validation: { length: { min: 1 } } }, slug: { label: "URL", description: "The page lives at /topics/<this>." } }),
        description: description(),
        content: fields.markdoc({ label: "Intro", extension: "md", options: { heading: false, image: false, codeBlock: false, table: false } }),
      },
    }),

    authors: collection({
      label: "Authors",
      path: "content/authors/*",
      slugField: "name",
      format: { contentField: "content" },
      previewUrl: "/authors/{slug}",
      schema: {
        name: fields.slug({ name: { label: "Name", validation: { length: { min: 1 } } }, slug: { label: "URL", description: "The page lives at /authors/<this>." } }),
        type: fields.select({ label: "Type", options: [{ label: "Person", value: "Person" }, { label: "Organisation (desk byline)", value: "Organization" }], defaultValue: "Person" }),
        role: fields.text({ label: "Role", validation: { length: { min: 1 } } }),
        bio: fields.text({ label: "Short bio", multiline: true, description: "One or two sentences, shown on posts.", validation: { length: { min: 1 } } }),
        sameAs: fields.array(fields.url({ label: "Profile URL" }), { label: "Official profiles", description: "Such as LinkedIn.", itemLabel: (p) => p.value || "URL" }),
        content: fields.markdoc({ label: "Longer biography", extension: "md", options: { heading: false, image: false, codeBlock: false, table: false } }),
      },
    }),

    charts: collection({
      label: "Charts",
      path: "content/charts/*",
      slugField: "title",
      format: { data: "json" },
      schema: {
        title: fields.slug({ name: { label: "Chart title", validation: { length: { min: 1 } } }, slug: { label: "Chart key", description: "Used to place the chart. Don't change it once the chart is in use." } }),
        subtitle: fields.text({ label: "Subtitle", description: "What is measured, and the unit." }),
        type: fields.select({ label: "Type", options: [{ label: "Horizontal bars", value: "bars" }, { label: "Columns", value: "columns" }], defaultValue: "bars" }),
        rows: fields.array(
          fields.object({
            label: fields.text({ label: "Label", validation: { length: { min: 1 } } }),
            value: fields.number({ label: "Value", description: "Sets the bar length.", validation: { isRequired: true } }),
            display: fields.text({ label: "Shown as", description: "Such as $899M or 26.6%.", validation: { length: { min: 1 } } }),
          }),
          { label: "Rows", itemLabel: (p) => `${p.fields.label.value} · ${p.fields.display.value}` },
        ),
        source: fields.text({ label: "Source", description: "Every chart needs one.", validation: { length: { min: 1 } } }),
      },
    }),
  },

  singletons: {
    settings: singleton({
      label: "Site settings",
      path: "content/settings/site",
      format: { data: "json" },
      schema: {
        name: fields.text({ label: "Site name", validation: { length: { min: 1 } } }),
        shortName: fields.text({ label: "Short name", description: "Used when the site is saved to a phone's home screen.", defaultValue: "FP" }),
        alternateNames: textList("Other names", "Other ways people write the name. Helps Google match searches."),
        tagline: fields.text({ label: "Tagline", validation: { length: { min: 1 } } }),
        description: fields.text({ label: "Site description", multiline: true, description: "Used in the footer and as the default meta description.", validation: { length: { min: 1 } } }),
        contactEmail: fields.text({ label: "Contact email", description: "Leave empty to hide." }),
        contactLinkedin: fields.url({ label: "Contact LinkedIn", description: "Where the Contact page sends people." }),
        whatsappInvite: fields.url({ label: "WhatsApp community invite link" }),
        social: fields.object(
          { linkedin: fields.url({ label: "LinkedIn" }), x: fields.url({ label: "X" }), youtube: fields.url({ label: "YouTube" }) },
          { label: "Social profiles", description: "Empty ones are hidden." },
        ),
        team: fields.array(
          fields.object({
            name: fields.text({ label: "Name", validation: { length: { min: 1 } } }),
            role: fields.text({ label: "Role" }),
            bio: fields.text({ label: "Bio", multiline: true }),
            linkedin: fields.url({ label: "LinkedIn" }),
          }),
          { label: "Team", description: "Shown on /team and in Google's data about the organisation.", itemLabel: (p) => p.fields.name.value || "Person" },
        ),
        topBar: fields.array(
          fields.object({
            label: fields.text({ label: "Label", validation: { length: { min: 1 } } }),
            value: fields.text({ label: "Figure", validation: { length: { min: 1 } } }),
            href: fields.text({ label: "Links to", description: "The story with the source." }),
          }),
          { label: "Figures in the top bar", description: "Sourced figures shown above the menu on every page.", itemLabel: (p) => `${p.fields.label.value} ${p.fields.value.value}` },
        ),
        closing: fields.object(
          {
            title: fields.text({ label: "Heading" }),
            text: fields.text({ label: "Text" }),
            buttonLabel: fields.text({ label: "Button text" }),
          },
          { label: "Community band above the footer" },
        ),
        joinDialog: fields.object(
          {
            label: fields.text({ label: "Small label" }),
            title: fields.text({ label: "Heading" }),
            intro: fields.text({ label: "Intro", multiline: true }),
            items: fields.array(
              fields.object({ title: fields.text({ label: "Title" }), channel: fields.text({ label: "Channel" }), text: fields.text({ label: "Text", multiline: true }) }),
              { label: "What's inside", itemLabel: (p) => p.fields.title.value || "Item" },
            ),
            note: fields.text({ label: "Note", multiline: true }),
            buttonLabel: fields.text({ label: "WhatsApp button text" }),
            secondaryLabel: fields.text({ label: "Second button text" }),
          },
          { label: "Join popup", description: "Opens from every Join button." },
        ),
      },
    }),

    navigation: singleton({
      label: "Menu and footer",
      path: "content/settings/navigation",
      format: { data: "json" },
      schema: {
        menu: fields.array(
          fields.object({
            label: fields.text({ label: "Text", validation: { length: { min: 1 } } }),
            href: fields.text({ label: "Link", description: "Leave empty for a dropdown." }),
            children: links("Dropdown links"),
          }),
          { label: "Main menu", itemLabel: (p) => p.fields.label.value || "Item" },
        ),
        joinButtonLabel: fields.text({ label: "Join button text", defaultValue: "Join free" }),
        footerColumns: fields.array(
          fields.object({
            heading: fields.text({ label: "Heading", validation: { length: { min: 1 } } }),
            kind: fields.select({ label: "Contents", options: [{ label: "The links below", value: "links" }, { label: "Partner list (automatic)", value: "partners" }], defaultValue: "links" }),
            links: links("Links"),
          }),
          { label: "Footer columns", itemLabel: (p) => p.fields.heading.value || "Column" },
        ),
        footerTagline: fields.text({ label: "Footer bottom line" }),
      },
    }),

    home: singleton({
      label: "Homepage",
      path: "content/pages/home",
      format: { data: "json" },
      schema: {
        seo: seo(),
        title: fields.text({ label: "Headline", validation: { length: { min: 1 } } }),
        subtitle: fields.text({ label: "Line under the headline" }),
        latestHeading: fields.text({ label: "Latest heading", defaultValue: "Latest" }),
        community: fields.object(
          { title: fields.text({ label: "Heading" }), text: fields.text({ label: "Text", multiline: true }), buttonLabel: fields.text({ label: "Button text" }) },
          { label: "Community box" },
        ),
        numbersHeading: fields.text({ label: "Numbers heading", defaultValue: "The numbers" }),
        numbers: fields.array(
          fields.object({
            value: fields.text({ label: "Figure", validation: { length: { min: 1 } } }),
            text: fields.text({ label: "What it means", validation: { length: { min: 1 } } }),
            href: fields.text({ label: "Links to", description: "The story with the source." }),
          }),
          { label: "Numbers", itemLabel: (p) => `${p.fields.value.value} ${p.fields.text.value}` },
        ),
        numbersChart: fields.relationship({ label: "Chart beside the numbers", collection: "charts" }),
        topicsHeading: fields.text({ label: "Topics heading", defaultValue: "Browse by topic" }),
        eventsHeading: fields.text({ label: "Events heading", defaultValue: "Events" }),
        eventsText: fields.text({ label: "Events line", multiline: true, description: "Shown after the event name and date." }),
      },
    }),

    about: singleton({
      label: "About",
      path: "content/pages/about",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        seo: seo(),
        hero: hero(),
        storyHeading: fields.text({ label: "Story heading" }),
        storyLinks: links("Buttons under the story"),
        beliefs: section("What we believe"),
        what: section("What we do"),
        content: fields.markdoc({ label: "Story", extension: "md", options: { heading: false, image: false, codeBlock: false } }),
      },
    }),

    ourStory: singleton({
      label: "Our Story",
      path: "content/pages/our-story",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        seo: seo(),
        hero: hero(),
        links: links("Buttons at the end"),
        content: fields.markdoc({ label: "Story", extension: "md", options: { heading: [2, 3], image: { directory: "public/images/pages", publicPath: "/images/pages/" }, codeBlock: false }, components: bodyComponents }),
      },
    }),

    team: singleton({
      label: "Team",
      path: "content/pages/team",
      format: { data: "json" },
      schema: {
        seo: seo(),
        hero: hero(),
        teamHeading: fields.text({ label: "Team heading", description: "The people come from Site settings, Team." }),
        involved: section("Get involved"),
      },
    }),

    community: singleton({
      label: "Community",
      path: "content/pages/community",
      format: { data: "json" },
      schema: {
        seo: seo(),
        hero: hero(),
        channels: section("Channels"),
        who: fields.object(
          {
            heading: fields.text({ label: "Heading" }),
            headingAccent: fields.text({ label: "Heading, second part", description: "Shown in a softer colour. Optional." }),
            chips: textList("Who it's for"),
            steps: steps("How to join"),
          },
          { label: "Who it's for" },
        ),
        rules: fields.object(
          { heading: fields.text({ label: "Heading" }), intro: fields.text({ label: "Intro", multiline: true }), items: steps("Rules") },
          { label: "House rules" },
        ),
        faqHeading: fields.text({ label: "FAQ heading" }),
        faqs,
      },
    }),

    events: singleton({
      label: "Events",
      path: "content/pages/events",
      format: { data: "json" },
      schema: {
        seo: seo(),
        hero: hero(),
        flagshipHeading: fields.text({ label: "Flagship heading" }),
        summit: fields.object(
          {
            name: fields.text({ label: "Event name", validation: { length: { min: 1 } } }),
            city: fields.text({ label: "City" }),
            date: fields.date({ label: "Date", description: "When set, the date shows on the site and Google gets event data." }),
            venue: fields.text({ label: "Venue" }),
            text: fields.text({ label: "Description", multiline: true }),
            primary: link(),
            secondary: link(),
          },
          { label: "Flagship event" },
        ),
        formats: section("Formats"),
        host: fields.object(
          {
            heading: fields.text({ label: "Heading" }),
            text: fields.text({ label: "Text", multiline: true }),
            cardLabel: fields.text({ label: "Box heading" }),
            cardText: fields.text({ label: "Box text", multiline: true }),
            links: links("Buttons"),
          },
          { label: "Host an event" },
        ),
      },
    }),

    partnersPage: singleton({
      label: "Partners page",
      path: "content/pages/partners",
      format: { data: "json" },
      schema: {
        seo: seo(),
        hero: hero(),
        button: link(),
        currentHeading: fields.text({ label: "Partner list heading", description: "The partners come from the Partners section." }),
        currentIntro: fields.text({ label: "Partner list intro" }),
        who: section("Who we work with"),
        formats: section("Ways to partner"),
        howHeading: fields.text({ label: "How it works heading" }),
        how: steps("How it works"),
      },
    }),

    contact: singleton({
      label: "Contact",
      path: "content/pages/contact",
      format: { data: "json" },
      schema: {
        seo: seo(),
        hero: hero(),
        buttonLabel: fields.text({ label: "Button text", description: "Links to the Contact LinkedIn in Site settings." }),
        otherHeading: fields.text({ label: "Second section heading" }),
        otherHeadingAccent: fields.text({ label: "Heading, second part", description: "Shown in a softer colour. Optional." }),
        other: cards("Cards"),
      },
    }),

    editorialPolicy: singleton({
      label: "Editorial policy",
      path: "content/pages/editorial-policy",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        seo: seo(),
        hero: hero(),
        content: fields.markdoc({ label: "Policy", extension: "md", options: { heading: [2, 3], image: false, codeBlock: false } }),
      },
    }),

    newsPage: listingPage("News page", "news"),
    guidesPage: listingPage("Guides page", "guides"),
    companiesPage: listingPage("Companies page", "companies"),
    topicsPage: listingPage("Topics page", "topics"),
    searchPage: listingPage("Search page", "search"),

    notFound: singleton({
      label: "Page not found (404)",
      path: "content/pages/not-found",
      format: { data: "json" },
      schema: {
        eyebrow: fields.text({ label: "Small label" }),
        title: fields.text({ label: "Headline" }),
        titleAccent: fields.text({ label: "Headline, second part" }),
        lede: fields.text({ label: "Text", multiline: true }),
        links: links("Buttons"),
      },
    }),
  },
});

function listingPage(labelText: string, file: string) {
  return singleton({
    label: labelText,
    path: `content/pages/${file}`,
    format: { data: "json" },
    schema: { seo: seo(), hero: hero() },
  });
}
