# Setting up the website admin (for Saad)

The website now has an admin at **fintechpakistan.com/admin** where we can edit every post, page, chart and setting without touching code. Each time someone clicks Save, the admin commits the change to the GitHub repo and Vercel redeploys the site in a minute or two.

People sign in to the admin with their GitHub account. For that to work, the repo needs a **GitHub App**. You own the repo, so you need to create the app and install it. It takes about 15 minutes, once.

## What you need

- Owner access to `SaadAhmed0/fintech-pakistan` on GitHub (you have this)
- Access to the project's Vercel settings
- Node.js installed, and the repo cloned on your computer

## 1. Get the latest code

Merge the open pull request `nauman/ignore-env` first. It fixes a blank setup page and makes sure the secret keys never get committed.

Then, in the project folder:

```bash
git checkout main
git pull
npm install
```

## 2. Point the local admin at GitHub

Create a file called `.env.local` in the project folder containing this one line:

```
NEXT_PUBLIC_KEYSTATIC_STORAGE=github
```

Git ignores this file, so it stays on your computer.

## 3. Start the site on your computer

```bash
npm run dev
```

Wait until it says it's ready, then open this address in your browser. Use `127.0.0.1`, not `localhost`:

**http://127.0.0.1:3000/keystatic/setup**

You should see a "Keystatic Setup" box.

## 4. Create the GitHub App

On the setup page:

1. **Deployed App URL:** `https://fintechpakistan.com`
2. **GitHub organization:** leave it empty. The repo is on your personal account.
3. Click **Create GitHub App**.

GitHub opens and asks you to name the app. Use something like `Fintech Pakistan Admin` (the name must be unique across GitHub, so add a word if it's taken). Then click **Create GitHub App**.

GitHub sends you back to your computer, and Keystatic saves four keys into a file called `.env` in the project folder:

```
KEYSTATIC_GITHUB_CLIENT_ID=...
KEYSTATIC_GITHUB_CLIENT_SECRET=...
KEYSTATIC_SECRET=...
NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=...
```

**Never commit or share `.env`.** Git already ignores it. Send the values only through Vercel, as in step 6.

## 5. Install the app on the repo

GitHub should offer to install the app straight away. If not, open your app's page at `https://github.com/apps/<your-app-name>` and click **Install**.

- Choose your account.
- Choose **Only select repositories**, then pick `fintech-pakistan`.
- Click **Install**.

## 6. Check the callback addresses

On GitHub, go to **Settings → Developer settings → GitHub Apps → your app → General**. Under **Callback URL**, make sure both of these are listed. Add any that are missing with **Add Callback URL**, then click **Save changes** at the bottom:

```
https://fintechpakistan.com/api/keystatic/github/oauth/callback
http://127.0.0.1:3000/api/keystatic/github/oauth/callback
```

## 7. Add the keys to Vercel

1. Open the project in Vercel, then **Settings → Environment Variables**.
2. Add the four values from your `.env` file, each with the same name: `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET` and `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`. Tick **Production** and **Preview** for each.
3. Go to **Deployments**, open the menu (⋯) on the latest deployment, and click **Redeploy**.

The redeploy is needed. The site only picks up new keys when it is built again.

## 8. Test it

1. Open **https://fintechpakistan.com/admin**.
2. Click **Log in with GitHub**, then **Authorize**.
3. You should see the dashboard with News, Guides, Companies, Pages and Settings.

To check that saving works, open any page under **Pages**, change one word, click **Save**, and check that a new commit appears on GitHub. Then change it back.

## 9. Give others access

Anyone who should edit the site needs **Write** access to the repo: **repo Settings → Collaborators → Add people**. Nauman needs this too, if he doesn't already have it. Each person then logs in at `/admin` with their own GitHub account, and their saves show up under their name.

## If something goes wrong

| What you see | What to do |
| --- | --- |
| A white page at the setup address | Make sure the `nauman/ignore-env` pull request is merged and pulled, and use `127.0.0.1`, not `localhost`. Restart `npm run dev`. |
| The live admin says it is not connected to GitHub | The keys are missing in Vercel, or the site wasn't redeployed after adding them. |
| Login keeps sending you back to the login screen | The `fintechpakistan.com` callback address from step 6 is missing. |
| "Repository not found" after login | The app isn't installed on `fintech-pakistan` (step 5), or your account lacks Write access. |
| A key may have leaked | In the GitHub App settings, generate a new client secret, then update it in Vercel and redeploy. |

Questions: ask Nauman. The technical details are in `README.md` under "The admin".
