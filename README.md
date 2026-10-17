# WorkLog Public Website

Static public website for the WorkLog iOS app. It contains three routes:

- `/` — Home
- `/privacy/` — Privacy Policy
- `/support/` — Support

The public site uses plain semantic HTML and CSS. It has no browser JavaScript, build step, backend, database, account system, analytics, advertising, tracking, or site-set cookies. The repository's small Node script is only a dependency-free local preview server.

## Preview Locally

From PowerShell:

```powershell
Set-Location -LiteralPath 'C:\Users\cboy2\Documents\WorkLog-Site'
npm.cmd run dev
```

Open:

- <http://localhost:4173/>
- <http://localhost:4173/privacy/>
- <http://localhost:4173/support/>

Stop the local server with `Ctrl+C`.

## Deploy to Vercel

### Vercel dashboard

1. Put this repository in a Git provider account that Vercel can access.
2. In the Vercel dashboard, choose **Add New → Project** and import the repository.
3. Leave the framework preset as **Other**.
4. Leave the build command empty.
5. Leave the output directory empty; the site is served from the repository root.
6. Deploy and verify `/`, `/privacy/`, and `/support/` on the assigned HTTPS domain.
7. Add a custom domain later if desired, then use the final public Privacy and Support URLs in App Store Connect.

### Vercel CLI

After installing and signing in to the Vercel CLI, run from this directory:

```powershell
vercel
```

Review the preview deployment first. When explicitly ready to publish the production site:

```powershell
vercel --prod
```

The checked-in `vercel.json` supplies clean URL behavior and security headers. No environment variables or server-side resources are required.

## Content Maintenance

- Keep `worklogappsupport@gmail.com` current on all pages.
- Update the Privacy Policy effective date whenever its practices materially change.
- Review the website copy against the released WorkLog app before each public version.
- Do not add analytics, tracking scripts, cookies, or third-party embeds without updating the site's privacy disclosures.
