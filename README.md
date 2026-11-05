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

## Deploy

Works on Vercel with zero config: import the repo and deploy. After the domain is live, submit `https://<domain>/sitemap.xml` in Google Search Console.

## Managing content with Claude

See `CLAUDE.md`. News and guides are Markdown files in `content/news/` and `content/guides/` (copy `_template.md`). Company profiles live in `content/companies/`. The SEO plan is in `docs/seo-strategy.md`. Ask Claude to "write an insight about ..." and it follows the `write-insight` skill.
