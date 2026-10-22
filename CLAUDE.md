# Fintech Pakistan website

Next.js (App Router) site for Fintech Pakistan. Every page is statically generated.

## Where things live

| What | Where |
| --- | --- |
| Site settings (URL, contact email, WhatsApp link, socials, Rails Summit date) | `lib/site.ts` |
| Articles (Insights) | `content/insights/<slug>.md` |
| Page copy | `app/<page>/page.tsx` |
| Design tokens and all styles | `app/globals.css` (`:root` block at the top) |
| SEO helpers and structured data | `lib/seo.ts` |
| Social share image design | `lib/og.tsx` |

## Content rules (apply to every edit)

- Never use em dashes. Use commas, periods or parentheses.
- Never invent facts, figures, quotes, testimonials, partners or features. Every number in an article needs a source in its frontmatter `sources` list. If a fact can't be sourced, leave it out and say so.
- No placeholder copy ("Lorem ipsum", "Coming soon", "Sample"). If a value is missing, leave the setting empty in `lib/site.ts`; the UI hides what isn't set.
- British-leaning spelling as already used on the site ("licence" as a noun, "programme").
- Headlines are specific to Pakistan fintech, never generic marketing lines.

## Adding an article

Use the `write-insight` skill (`.claude/skills/write-insight/SKILL.md`). In short: create `content/insights/<keyword-rich-slug>.md` with the frontmatter below, use `##` for section headings (they build the table of contents), then run `npm run build` to check it.

```yaml
---
title: "Headline shown on the page"
seoTitle: "Optional, under 60 characters, for Google results"
description: "One or two sentences, 120 to 160 characters. Used as the dek and meta description."
tag: Payments            # existing tags: Payments, Rails, Banking, Corridors, Regulation, From us
date: 2026-10-22         # publish date, YYYY-MM-DD
updated: 2026-11-01      # optional, set when facts change
author: Fintech Pakistan # optional
featured: false          # true puts it in the big card on /insights
draft: false             # true hides it from the production build
keywords: [primary keyword, secondary keyword]
sources:
  - title: "Publisher, Headline (date)"
    url: "https://..."
---
```

Optional rich blocks inside the Markdown (raw HTML):

- Pull quote: `<p class="pull">Plain part. <em>Highlighted part.</em></p>`
- Timeline: `<ul class="timeline"><li><span class="when">March 2026</span><span>What happened.</span></li></ul>`
- Status list: `<ul class="status"><li><b>Name</b><span class="pill live-pill">Live</span><p>Detail.</p></li></ul>` (pill classes: `live-pill`, `pilot`, or none)
- Internal links: `[Read how Raast works](/insights/raast-instant-payments-explained)`. Link related articles to each other; it helps SEO.

## SEO that is automatic

Canonical URLs, Open Graph and Twitter tags, a branded share image per article, `sitemap.xml`, `robots.txt`, RSS at `/insights/feed.xml`, and JSON-LD (Organization, WebSite, Blog, Article, BreadcrumbList, FAQPage, and Event once `site.summit.date` is set). New articles and topics appear in all of these with no extra work.

## Commands

- `npm run dev`: local preview at http://localhost:3000
- `npm run build`: production build. Run it after every content change; it fails on missing frontmatter.
- `npm run typecheck`
