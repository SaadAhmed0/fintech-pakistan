# Fintech Pakistan website

Next.js (App Router) news and company directory covering stablecoin neobanks and fintechs entering or serving Pakistan. Every page is statically generated, and all content is edited in a Keystatic admin at `/admin` (served at `/keystatic`). Local incumbents like SadaPay and NayaPay are covered only as context. SEO plan: `docs/seo-strategy.md`.

## Where things live

All content lives in `content/` and is edited in the admin. Claude edits the same files, so changes made either way show up in both. Never hardcode copy in a page or component: add a field in `keystatic.config.tsx` and read it.

| What | Where |
| --- | --- |
| Admin schema (every field, collection and page) | `keystatic.config.tsx` |
| Site settings (name, contact email, WhatsApp link, socials, team, top bar figures, join popup) | `content/settings/site.json` |
| Main menu and footer columns | `content/settings/navigation.json` |
| Page copy (homepage, about, our story, team, community, events, partners, contact, editorial policy, section headers, 404) and the Rails Summit date | `content/pages/` |
| News | `content/news/<slug>.md`, published at `/news/<slug>` |
| Guides | `content/guides/<slug>.md`, published at `/guides/<slug>` |
| Company directory | `content/companies/<slug>.md`, published at `/companies/<slug>` |
| Comparisons | `content/compare/<a>-vs-<b>.md`, published at `/compare/<a>-vs-<b>` |
| Topics (the categories) | `content/topics/<slug>.md`, published at `/topics/<slug>` |
| Authors | `content/authors/<slug>.md`, published at `/authors/<slug>` |
| Charts and their sources | `content/charts/<key>.json`, drawn by `components/Figure.tsx` |
| Partners (cards, partner pages, footer links) | `content/partners/<slug>.md`, logos in `public/partners/<slug>/` |
| File formats to copy when writing by hand | `content/_templates/` |
| Cover images, when a post has a real one | `public/covers/<slug>/` |
| Images inside articles | `public/images/<news or guides>/<slug>/` |
| Brand kit logos | `public/brand/`, header and footer lockup in `components/Logo.tsx` |
| Content loading | `lib/content.ts` (collections), `lib/cms.ts` (pages, settings, charts), `lib/markdoc.ts` (article bodies) |
| News and guide layout | `components/PostLayout.tsx` |
| Site frame (top bar, header, footer, dialogs) | `components/SiteFrame.tsx`, used by `app/(site)/layout.tsx` |
| Map on the company directory (geometry from Natural Earth) | `lib/pakistan-map.ts`, drawn by `components/PakistanMap.tsx` |
| Design tokens and all styles | `app/globals.css` (`:root` block at the top) |
| SEO helpers and structured data | `lib/seo.ts` |
| Social share image design | `lib/og.tsx` |

## Design rules (apply to every edit)

This is a publication, not a product page.

- Headlines and real data lead. Use images only when they show something real, never as decoration.
- Charts come from `content/charts/`, always with a source. Place them with `{% chart name="key" /%}` in a post.
- Serif for reading, sans for navigation, forest green fronts, lime only on forest.
- No animation, gradients or two-tone headlines. Lines, not boxes.
- Headlines say plainly what the section or story is. No slogans.
- Show reading time only from three minutes up.

## Content rules (apply to every edit)

- Never use em dashes. Use commas, periods or parentheses.
- Never invent facts, figures, quotes, testimonials, partners or features. Every number in an article needs a source in its frontmatter `sources` list. If a fact can't be sourced, leave it out and say so.
- No placeholder copy ("Lorem ipsum", "Coming soon", "Sample"). If a value is missing, leave the field empty in the admin; the UI hides what isn't set.
- British-leaning spelling as already used on the site ("licence" as a noun, "programme").
- Headlines are specific to Pakistan fintech, never generic marketing lines.

## Adding an article

Use the `write-insight` skill (`.claude/skills/write-insight/SKILL.md`). In short: copy `content/_templates/news.md` or `guides.md` to `content/news/<keyword-rich-slug>.md` (or `content/guides/`), fill in the frontmatter, use `##` for section headings (they build the table of contents), then run `npm run build` to check it. The post appears in the admin, the sitemap, `/rss.xml`, the news sitemap (news only, for two days) and matching topic pages with no extra work.

`npm run build` first checks every content file against the admin schema (`npm run check:content`), then fails if a required field is missing, the description is outside 150 to 160 characters, the filename isn't a clean slug, the author or a topic has no file, a chart key has no file in `content/charts/`, or a cover image has no alt text. `draft: true` keeps a post out of production builds (it still shows under `npm run dev`). New posts created in the admin start as drafts.

```yaml
---
title: "Headline shown on the page"   # stay within 60 characters where you can
description: "150 to 160 characters. Used as the meta description, social text and intro."
date: 2026-10-22T14:30   # news: Pakistan time, no zone. Guides: 2026-10-22
updated: 2026-10-23      # optional, YYYY-MM-DD when facts change. Leave the key out otherwise
author: fp-admin         # a file name in content/authors/
mainTopic: stablecoins   # a file name in content/topics/, shown as the label
otherTopics: []          # more topic file names
fromUs: false            # true for posts about Fintech Pakistan itself (kept off the homepage)
coverImage: /covers/my-post/coverImage.webp   # optional (1600 x 900). Leave the key out if none
coverAlt: ""             # required when coverImage is set
draft: false             # true hides it from the production build
label: none              # none, Partner or Sponsored. Partner or Sponsored on any paid or client content
lead: false              # true puts this at the top of the homepage. Keep it on one post
chart: remittance-sources  # optional, a file name in content/charts/, shown beside this story on the homepage
keyPoints: []            # optional, 3 or 4 short points shown as "In short"
faqs: []                 # optional: - q: "Question" then a: "Answer". Adds FAQ schema
sources:
  - title: "Publisher, Headline (date)"
    url: "https://..."
---
```

Rich blocks inside the body are Markdoc tags. Raw HTML is not rendered.

- Pull quote: `{% pull %}Plain part. _Highlighted part._{% /pull %}`
- Timeline: `{% timeline %}` containing `{% timeline-item when="March 2026" %}What happened.{% /timeline-item %}`, then `{% /timeline %}`
- Status list: `{% status %}` containing `{% status-item name="Name" pill="Live · Jan 2025" style="live" %}Detail.{% /status-item %}`, then `{% /status %}` (style: `live`, `pilot` or `plain`)
- Chart: `{% chart name="chart-key" /%}`
- Internal links: `[Read how Raast works](/guides/raast-instant-payments-explained)`. Link related articles to each other; it helps SEO.

## Adding a company

Add it in the admin, or copy `content/_templates/companies.md`. Never guess: leave unconfirmed fields empty and the page shows "Needs verification". Use `pakistanAvailability: yes` only when the company says so itself, `reported` when only a third party does, and `unknown` otherwise. `usdAccount` and `card` are `yes`, `no` or `unknown`. Any paid or client relationship needs `label: Partner` or `label: Sponsored` (otherwise `label: none`). `pick` marks our top pick: it lists first and must state why, plus any conflict of interest. A profile stays `noindex` and out of the sitemap until it has an availability value, a `lastVerified` date, two or more sources and 60+ words in the body. The first mention of a company in any post links to its profile automatically, using its name and `aliases`.

## Adding a comparison

A comparison page only exists if `content/compare/<a>-vs-<b>.md` exists (add it in the admin, or copy `content/_templates/compare.md`). Both companies need files, and the body needs 250+ words of real analysis. Never generate comparison pages from pairs of companies.

## Adding or editing a partner

Add it in the admin under Partners, or create `content/partners/<slug>.md`. The partner then appears on the home page, `/partners`, its own page at `/partners/<slug>`, the footer and the sitemap.

```yaml
---
name: Karsa
type: Partner                 # or "Community partner"
focus: Multi-currency business banking
description: "One sentence, 120 to 160 characters. Meta description and hero lede."
website: https://gokarsa.com
logo: /partners/karsa/logo.png  # white or colour logo, shown on a dark tile
logoWidth: 480
logoHeight: 166
showName: false               # true for icon-only logos, so the name shows beside the icon
order: 2                      # position in partner lists
sameAs: [https://x.com/Go_Karsa]   # official social profiles
relatedNews: []               # news file names to show on the partner page
relatedGuides: [raast-instant-payments-explained]
sources:
  - title: "Publisher, Headline (date)"
    url: "https://..."
---
```

Body: `## About <name>`, then what they do and what the partnership covers. Only describe what the partner or a cited source says. Attribute self-descriptions ("describes itself as").

## SEO that is automatic

Canonical URLs, Open Graph and Twitter tags, a branded share image per post and company, `sitemap.xml`, `news-sitemap.xml`, `robots.txt`, RSS at `/rss.xml`, and JSON-LD (Organization, WebSite with SearchAction, NewsArticle, Article, BreadcrumbList, FAQPage, ProfilePage, and Event once the Rails Summit date is set under Pages, Events). New posts, companies and topics appear in all of these with no extra work.

## Commands

- `npm run dev`: local preview at http://localhost:3000, admin at http://localhost:3000/admin (edits local files)
- `npm run build`: checks content against the admin schema, then builds. Run it after every content change; it fails on missing frontmatter.
- `npm run check:content`: only the content check
- `npm run typecheck`
