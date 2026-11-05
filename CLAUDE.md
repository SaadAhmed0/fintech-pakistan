# Fintech Pakistan website

Next.js (App Router) news and company directory covering stablecoin neobanks and fintechs entering or serving Pakistan. Every page is statically generated. Local incumbents like SadaPay and NayaPay are covered only as context. SEO plan: `docs/seo-strategy.md`.

## Where things live

| What | Where |
| --- | --- |
| Site settings (URL, contact email, WhatsApp link, socials, team, Rails Summit date) | `lib/site.ts` |
| News | `content/news/<slug>.md`, published at `/news/<slug>` |
| Guides | `content/guides/<slug>.md`, published at `/guides/<slug>` |
| Company directory | `content/companies/<slug>.md`, published at `/companies/<slug>` |
| Comparisons | `content/compare/<a>-vs-<b>.md`, published at `/compare/<a>-vs-<b>` |
| Topics | `content/topics/<slug>.md`, published at `/topics/<slug>` |
| Authors | `content/authors/<slug>.md`, published at `/authors/<slug>` |
| Cover images, when a post has a real one | `public/covers/` |
| All content loading | `lib/content.ts` |
| News and guide layout | `components/PostLayout.tsx` |
| Partners (cards, partner pages, footer links) | `content/partners/<slug>.md`, logos in `public/partners/` |
| Page copy | `app/<page>/page.tsx` |
| Map on the company directory (geometry from Natural Earth) | `lib/pakistan-map.ts`, drawn by `components/PakistanMap.tsx` |
| Design tokens and all styles | `app/globals.css` (`:root` block at the top) |
| Charts and their sources | `lib/charts.ts`, drawn by `components/Figure.tsx` |
| Figures in the top bar | `components/DataStrip.tsx` |
| SEO helpers and structured data | `lib/seo.ts` |
| Social share image design | `lib/og.tsx` |

## Design rules (apply to every edit)

This is a publication, not a product page.

- Headlines and real data lead. Use images only when they show something real, never as decoration.
- Charts come from `lib/charts.ts`, always with a source. Place them with `<div data-chart="key"></div>` in a post.
- Serif for reading, sans for navigation, forest green fronts, lime only on forest.
- No animation, gradients or two-tone headlines. Lines, not boxes.
- Headlines say plainly what the section or story is. No slogans.
- Show reading time only from three minutes up.

## Content rules (apply to every edit)

- Never use em dashes. Use commas, periods or parentheses.
- Never invent facts, figures, quotes, testimonials, partners or features. Every number in an article needs a source in its frontmatter `sources` list. If a fact can't be sourced, leave it out and say so.
- No placeholder copy ("Lorem ipsum", "Coming soon", "Sample"). If a value is missing, leave the setting empty in `lib/site.ts`; the UI hides what isn't set.
- British-leaning spelling as already used on the site ("licence" as a noun, "programme").
- Headlines are specific to Pakistan fintech, never generic marketing lines.

## Adding an article

Use the `write-insight` skill (`.claude/skills/write-insight/SKILL.md`). In short: copy `content/news/_template.md` or `content/guides/_template.md` to `<keyword-rich-slug>.md` in the same folder, fill in the frontmatter, use `##` for section headings (they build the table of contents), then run `npm run build` to check it. The post appears in the sitemap, `/rss.xml`, the news sitemap (news only, for two days) and matching topic pages with no extra work.

The build fails if a required field is missing, the description is outside 150 to 160 characters, the filename isn't a clean slug, the author has no file in `content/authors/`, or a cover image has no alt text. `draft: true` keeps a post out of production builds (it still shows under `npm run dev`).

```yaml
---
title: "Headline shown on the page"   # stay within 60 characters where you can
description: "150 to 160 characters. Used as the meta description, social text and intro."
date: 2026-10-22         # news: include the time, such as 2026-10-22T14:30:00+05:00
updated: ""              # YYYY-MM-DD when facts change
author: FP Admin         # must match a file in content/authors/
tags: [Stablecoins]      # first tag is the main one. Tags matching content/topics link to that topic
coverImage: ""           # optional, such as /covers/my-post.webp in public/ (1600 x 900)
coverAlt: ""             # required when coverImage is set
draft: false             # true hides it from the production build
label: ""                # Partner or Sponsored on any paid or client content
lead: false              # true puts this at the top of the homepage. Keep it on one post
chart: ""                # optional, a key from lib/charts.ts, shown beside this story on the homepage
keyPoints: []            # optional, 3 or 4 short points shown as "In short"
faqs: []                 # optional: - q: "Question" then a: "Answer". Adds FAQ schema
sources:
  - title: "Publisher, Headline (date)"
    url: "https://..."
---
```

Optional rich blocks inside the Markdown (raw HTML):

- Pull quote: `<p class="pull">Plain part. <em>Highlighted part.</em></p>`
- Timeline: `<ul class="timeline"><li><span class="when">March 2026</span><span>What happened.</span></li></ul>`
- Status list: `<ul class="status"><li><b>Name</b><span class="pill live-pill">Live</span><p>Detail.</p></li></ul>` (pill classes: `live-pill`, `pilot`, or none)
- Internal links: `[Read how Raast works](/guides/raast-instant-payments-explained)`. Link related articles to each other; it helps SEO.

## Adding a company

Copy `content/companies/_template.md`. Never guess: leave unconfirmed fields empty and the page shows "Needs verification". Use `pakistanAvailability: yes` only when the company says so itself, and `reported` when only a third party does. Any paid or client relationship needs `label: Partner` or `label: Sponsored`. `pick` marks our top pick: it lists first and must state why, plus any conflict of interest. A profile stays `noindex` and out of the sitemap until it has an availability value, a `lastVerified` date, two or more sources and 60+ words in the body. The first mention of a company in any post links to its profile automatically, using its name and `aliases`.

## Adding a comparison

A comparison page only exists if `content/compare/<a>-vs-<b>.md` exists (copy the template). Both companies need files, and the body needs 250+ words of real analysis. Never generate comparison pages from pairs of companies.

## Adding or editing a partner

Create `content/partners/<slug>.md`. The partner then appears on the home page, `/partners`, its own page at `/partners/<slug>`, the footer and the sitemap.

```yaml
---
name: Karsa
type: Partner                 # or "Community partner"
focus: Multi-currency business banking
description: "One sentence, 120 to 160 characters. Meta description and hero lede."
website: https://gokarsa.com
logo: { src: /partners/karsa.png, width: 480, height: 166 }  # white or colour logo, shown on a dark tile
showName: false               # true for icon-only logos, so the name shows beside the icon
order: 2                      # position in partner lists
sameAs: [https://x.com/Go_Karsa]   # official social profiles
related: [insight-slug]       # Insights articles to show on the partner page
sources:
  - title: "Publisher, Headline (date)"
    url: "https://..."
---
```

Body: `## About <name>`, then what they do and what the partnership covers. Only describe what the partner or a cited source says. Attribute self-descriptions ("describes itself as").

## SEO that is automatic

Canonical URLs, Open Graph and Twitter tags, a branded share image per post and company, `sitemap.xml`, `news-sitemap.xml`, `robots.txt`, RSS at `/rss.xml`, and JSON-LD (Organization, WebSite with SearchAction, NewsArticle, Article, BreadcrumbList, FAQPage, ProfilePage, and Event once `site.summit.date` is set). New posts, companies and topics appear in all of these with no extra work.

## Commands

- `npm run dev`: local preview at http://localhost:3000
- `npm run build`: production build. Run it after every content change; it fails on missing frontmatter.
- `npm run typecheck`
