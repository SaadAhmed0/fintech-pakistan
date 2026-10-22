---
name: write-insight
description: Write, edit or update a Fintech Pakistan Insights article (content/insights/*.md) with sourced facts and SEO frontmatter. Use when asked to add a blog post, article or insight, or to update figures in an existing one.
---

# Write an Insights article

1. **Pin down the topic and angle.** One clear question the article answers for people building fintech in Pakistan. If the user hasn't given an angle, propose one and confirm.
2. **Research before writing.** Use web search for primary sources first (State Bank of Pakistan, PVARA, SECP, PTA, company press releases), then reputable coverage (Profit, ProPakistani, Dawn, Business Recorder, Arab News). Record each source's title, publisher, date and URL. Do not use a figure you could not trace to a source.
3. **Check existing articles** in `content/insights/` so you don't duplicate one, and find two or more to link to internally.
4. **Write the file** `content/insights/<slug>.md`:
   - Slug: lowercase, hyphenated, contains the main search phrase (e.g. `pakistan-qr-payments-raast-p2m`).
   - Frontmatter exactly as documented in `CLAUDE.md`. `description` 120 to 160 characters. `seoTitle` under 60 characters with the main keyword near the front.
   - Open with the single most important fact in the first two sentences.
   - Use `##` section headings phrased the way people search ("How Raast works", "Who is licensed").
   - 400 to 1,200 words. Short paragraphs. One pull quote at most.
   - End with a "why it matters for builders" style section.
   - No em dashes, no invented numbers, quotes or companies.
5. **Verify.** Run `npm run build`. Then report: the URL path, the sources used, and anything you could not verify and left out.
6. **Updating an article:** change the facts, add or replace sources, and set `updated:` to today. Keep the slug unchanged so links and rankings survive.
