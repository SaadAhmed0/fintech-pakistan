# Fintech Pakistan

The website for Fintech Pakistan: news and a company directory covering stablecoin neobanks and fintechs entering or serving Pakistan. Built with Next.js (App Router), fully static.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
```

## Before launch

Fill these in `lib/site.ts` (empty values are hidden on the site, never shown as placeholders):

- `contactEmail`
- `social` links
- `team` bios and LinkedIn links
- `summit.date` and `summit.venue`

Set `NEXT_PUBLIC_SITE_URL` in your host (see `.env.example`) if the domain is not `https://fintechpakistan.com`.
Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` to the token from Google Search Console if
you choose HTML-tag verification. The token is added to every page's `<head>`.

## Deploy

Works on Vercel with zero config: import the repo and deploy. In Google Search
Console, add the `https://fintechpakistan.com/` URL-prefix property, verify it,
submit `https://fintechpakistan.com/sitemap.xml`, and request indexing for the
homepage and important new pages. Search Console is required to see indexing
status and crawl errors; submitting a sitemap does not guarantee rankings.

## Managing content with Claude

See `CLAUDE.md`. News and guides are Markdown files in `content/news/` and `content/guides/` (copy `_template.md`). Company profiles live in `content/companies/`. The SEO plan is in `docs/seo-strategy.md`. Ask Claude to "write an insight about ..." and it follows the `write-insight` skill.
