# Editing the site (CMS)

Everything you see on the site (projects, small apps, artwork, certificates,
events, the homepage, About, CV, skills, the StillGood page, menus, and each
page's search title and description) is edited in **Keystatic**, a content
editor built into the site at **`/keystatic`**.

Saving in the editor writes files into this repo:

| What              | Where it's saved                                 |
| ----------------- | ------------------------------------------------ |
| Text and settings | `content/` (one JSON file per project, event, …) |
| Images            | `public/images/<section>/<entry>/…`              |
| Demo videos       | `public/videos/<section>/<entry>/…`              |

On the live site, every save is a commit to GitHub, and Vercel redeploys in
about a minute. Nothing needs a database.

## Editing on your computer

1. `pnpm install`, then `pnpm dev`.
2. Open <http://localhost:3000/keystatic>.
3. Edit and **Save**. The page updates straight away at
   <http://localhost:3000>. The "open" icon next to Save jumps to the page.
4. Commit and push the changed files in `content/` and `public/` as usual.

## Connect the live CMS (once)

The live editor logs you in with GitHub and commits for you. Setting that up
takes about five minutes:

1. Create `.env.local` in the repo root with this line:
   ```
   NEXT_PUBLIC_KEYSTATIC_STORAGE=github
   ```
2. Run `pnpm dev` and open <http://localhost:3000/keystatic>. Keystatic offers
   to **create a GitHub App**. Follow it and install the app on the
   `austincantcode/austin-portfolio` repo. Keystatic then adds four values to
   your `.env` file:
   `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`,
   `KEYSTATIC_SECRET` and `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`.
3. In the GitHub App's settings (GitHub → Settings → Developer settings →
   GitHub Apps → your app), add this **Callback URL**:
   `https://austinsia.com/api/keystatic/github/oauth/callback`
4. In Vercel → Project → Settings → Environment Variables, add those four
   values for Production (and Preview if you want to edit on previews).
5. Redeploy, then open `https://austinsia.com/keystatic` and sign in.
6. Remove the `NEXT_PUBLIC_KEYSTATIC_STORAGE=github` line from `.env.local`,
   so editing on your computer saves to local files again.

Until this is done, `/keystatic` on the live site shows a "CMS not connected
yet" page, and the site itself works normally.

The editor saves to the branch picked in its top-left menu. Pick the branch
Vercel deploys from (normally `main`).

## Common tasks

**Add a project.** Work → Projects → **Add**. Fill in the title (the URL is
made from it), pick categories and a device frame (Laptop for websites, Phone
for apps, None for photos and artwork), then add a cover image. **Order**
decides where it appears (lower first). To show it on the homepage, add it to
Homepage → Selected work.

**Change the homepage.** Site → Homepage has every section: the timeline,
What I do (including its four project thumbnails and photo), Selected work,
the numbers and the contact tiles.

**Add a certificate.** About → Certificates → open its group (for example
"AWS / SCS") → **Add** under Certificates. New group? **Add** a new entry.

**Feature an event.** About → Events → tick **Feature this event** on one
event (untick the old one).

**Add a testimonial.** About → Testimonials → **Add**. Paste their words
exactly, add their name, role and company, and pick the project it's about
(it then also appears on that case study). Tick **They agreed to be quoted**;
quotes without it never appear. Tick **Lead quote** on the one to show
largest. The "Kind words." section stays hidden until there's at least one.

**Awards on the homepage.** About → Certificates → open a group → tick
**Show on the homepage** on a certificate. Recognition shows every ticked one.

**Client names.** Site → Homepage → Clients strip. Add a logo to replace a
name with the client's logo (shown in one colour to match the site).

**Menus.** Site → Menus sets the line and the three featured projects in the
Development and Design menus.

**Search results.** Site → Pages & SEO holds each page's title and
description for Google (about 60 and 160 characters at most).

## Good to know

- **Images keep their own shape.** Upload the real screenshot or photo; it's
  never cropped. Mockups that already show phones: tick "Mockup (no device
  frame)".
- **Alt text** describes an image for screen readers and search. Keep it short
  and specific.
- **Icons** are Iconify names such as `lucide:code-xml`. Browse them at
  <https://icones.js.org>.
- **Don't rename or move files** in `public/images` by hand; the editor
  manages them.
- **What stays in code:** the list of work categories (their URLs and page
  layouts) and the page designs. Category names, blurbs and search titles are
  editable under Site → Work categories.

## How it works (for developers)

- `keystatic.config.ts` is the schema.
- `scripts/content.mjs` turns `content/` into `src/data/generated/*.json`
  (gitignored), adding each image's size and a tiny blur preview so
  `next/image` can lay it out and fade it in. It runs before `next dev`
  (watching for changes), `next build` and after `pnpm install`.
- `src/data/*.ts` read the generated JSON and keep the same exports the
  components always used (`projects`, `site`, `home`, …).
- The site's layout lives in `src/app/(site)`, so `/keystatic` renders without
  the site's nav, footer and styles.
