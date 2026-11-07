# Fintech Pakistan

The website for Fintech Pakistan: news and a company directory covering stablecoin neobanks and fintechs entering or serving Pakistan. Built with Next.js (App Router). Every public page is statically generated, and all content is edited in a Keystatic admin.

## Run it

```bash
npm install
npm run dev            # http://localhost:3000, admin at http://localhost:3000/admin
npm run build          # checks every content file, then builds
npm run check:content  # only the content check
npm start              # serve the production build
```

## The admin

Open `/admin` (it redirects to `/keystatic`). Everything on the site is edited there:

| Admin section | What it edits | Files |
| --- | --- | --- |
| News, Guides, Comparisons | Articles | `content/news/`, `content/guides/`, `content/compare/` |
| Companies, Partners | The directory and partner pages | `content/companies/`, `content/partners/` |
| Topics, Authors | Categories and bylines | `content/topics/`, `content/authors/` |
| Charts | Every chart, with its source | `content/charts/` |
| Pages | Homepage, About, Our Story, Team, Community, Events, Partners, Contact, Editorial policy, section page headers, 404 | `content/pages/` |
| Site settings | Name, description, contact links, WhatsApp invite, socials, team, top bar figures, join popup | `content/settings/site.json` |
| Menu and footer | Main menu, dropdowns, footer columns | `content/settings/navigation.json` |

Under `npm run dev` the admin edits files on your computer. On the live site it signs in with GitHub and every Save is a commit to `main`, which Vercel deploys in a minute or two. Only people with write access to the GitHub repo can sign in.

Posts start as drafts. Untick **Draft** and save to publish.

### Connecting the live admin to GitHub (one time)

1. Run `npm run dev` with `NEXT_PUBLIC_KEYSTATIC_STORAGE=github` in `.env.local`, then open `http://localhost:3000/keystatic`.
2. Follow the prompt to create the Keystatic GitHub App. A repo admin (Saad) needs to approve installing it on `SaadAhmed0/fintech-pakistan`.
3. Keystatic writes `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET` and `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` to `.env.local`. Add all four to Vercel (Project, Settings, Environment Variables) and redeploy.
4. In the GitHub App settings, add `https://fintechpakistan.com/api/keystatic/github/oauth/callback` as a callback URL.

Until step 3 is done the site builds and works normally, and the live admin explains that it is not connected yet.

## Before launch

Fill these in the admin under Site settings (empty values are hidden on the site, never shown as placeholders): contact email, social links, team bios. Set the Rails Summit date and venue under Pages, Events.

Set `NEXT_PUBLIC_SITE_URL` in your host (see `.env.example`) if the domain is not `https://fintechpakistan.com`.
Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` to the token from Google Search Console if
you choose HTML-tag verification. The token is added to every page's `<head>`.

## Deploy

Works on Vercel: import the repo and deploy. In Google Search
Console, add the `https://fintechpakistan.com/` URL-prefix property, verify it,
submit `https://fintechpakistan.com/sitemap.xml`, and request indexing for the
homepage and important new pages. Search Console is required to see indexing
status and crawl errors; submitting a sitemap does not guarantee rankings.

## Brand

Logo files from the brand kit live in `public/brand/` (lockups, icons and marks, SVG masters plus PNGs).

## Managing content with Claude

See `CLAUDE.md`. Claude writes the same files the admin does, so anything it adds shows up in the admin, and anything edited in the admin is what Claude reads. Ask Claude to "write an insight about ..." and it follows the `write-insight` skill. The SEO plan is in `docs/seo-strategy.md`.
