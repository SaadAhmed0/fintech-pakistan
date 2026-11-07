---
name: write-insight
description: Write, edit or update a Fintech Pakistan news post or guide (content/news/*.md, content/guides/*.md) with sourced facts and SEO frontmatter. Use when asked to add a blog post, article or insight, or to update figures in an existing one.
---

# Write a news post or guide

1. **Pin down the topic and angle.** One clear question the article answers for people building fintech in Pakistan. If the user hasn't given an angle, propose one and confirm.
2. **Research before writing.** Use web search for primary sources first (State Bank of Pakistan, PVARA, SECP, PTA, company press releases), then reputable coverage (Profit, ProPakistani, Dawn, Business Recorder, Arab News). Record each source's title, publisher, date and URL. Do not use a figure you could not trace to a source.
3. **Check existing articles** in `content/news/` and `content/guides/` so you don't duplicate one, and find two or more to link to internally.
4. **Write the file** `content/news/<slug>.md` or `content/guides/<slug>.md`, starting from `content/_templates/news.md` or `guides.md`. These are the same files the Keystatic admin edits, so the post appears there automatically:
   - Slug: lowercase, hyphenated, contains the main search phrase (e.g. `pakistan-qr-payments-raast-p2m`).
   - Frontmatter exactly as in the template. `description` 150 to 160 characters (the build fails otherwise). Keep `title` close to 60 characters where you can, with the main keyword near the front.
   - `author` and the topics are file names (`fp-admin`, `stablecoins`), not display names. News `date` is Pakistan time with no zone (`2026-11-07T12:00`). `label` is `none`, `Partner` or `Sponsored`. Leave out optional keys you don't use rather than writing empty strings.
   - Rich blocks use Markdoc tags, never raw HTML (raw HTML shows as text): `{% pull %}`, `{% timeline %}` with `{% timeline-item when="..." %}`, `{% status %}` with `{% status-item name="..." pill="..." style="live|pilot|plain" %}`, and `{% chart name="<key>" /%}` for a chart in `content/charts/`. The template shows each one.
   - Open with the single most important fact in the first two sentences.
   - Use `##` section headings phrased the way people search ("How Raast works", "Who is licensed").
   - 400 to 1,200 words. Short paragraphs. One pull quote at most.
   - End with a "why it matters for builders" style section.
   - No em dashes, no invented numbers, quotes or companies.
5. **Verify.** Run `npm run build` (it first checks every file against the admin schema). Then report: the URL path, the sources used, and anything you could not verify and left out.
6. **Updating an article:** change the facts, add or replace sources, and set `updated:` to today. Keep the slug unchanged so links and rankings survive.
