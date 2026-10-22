# Fintech Pakistan

The website for Fintech Pakistan: community, podcast, events and sourced insights on fintech in Pakistan. Built with Next.js (App Router), fully static.

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
- `whatsappInvite`
- `social` links
- `summit.date` and `summit.venue`

Set `NEXT_PUBLIC_SITE_URL` in your host (see `.env.example`) if the domain is not `https://fintechpakistan.com`.

## Deploy

Works on Vercel with zero config: import the repo and deploy. After the domain is live, submit `https://<domain>/sitemap.xml` in Google Search Console.

## Managing content with Claude

See `CLAUDE.md`. Articles are Markdown files in `content/insights/`. Ask Claude to "write an insight about ..." and it follows the `write-insight` skill.
