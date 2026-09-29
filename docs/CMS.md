# Editing the site (CMS)

Everything you see on the site (projects, small apps, artwork, certificates,
events, the homepage, About, CV, skills, the StillGood page, the work areas, and each
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
2. Open <http://127.0.0.1:3000/keystatic>. (The editor only answers on your
   own computer, never on your Wi-Fi network, so no password is needed here.)
3. Edit and **Save**. The page updates straight away at
   <http://127.0.0.1:3000>. The "open" icon next to Save jumps to the page.
4. Commit and push the changed files in `content/` and `public/` as usual.

## Connect the live CMS (once)

The live editor logs you in with GitHub and commits for you. Setting that up
takes about five minutes:

1. Create `.env.local` in the repo root with this line:
   ```
   NEXT_PUBLIC_KEYSTATIC_STORAGE=github
   ```
2. Run `pnpm dev` and open <http://127.0.0.1:3000/keystatic>. Keystatic offers
   to **create a GitHub App**. Follow it and install the app on the
   `austincantcode/austin-portfolio` repo. Keystatic then adds four values to
   your `.env` file:
   `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`,
   `KEYSTATIC_SECRET` and `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`.
3. In the GitHub App's settings (GitHub → Settings → Developer settings →
   GitHub Apps → your app):
   - add this **Callback URL**:
     `https://austinsia.com/api/keystatic/github/oauth/callback`
   - under **Advanced → Make this GitHub App private** (or "Where can this
     GitHub App be installed?"), choose **Only on this account**.
4. In Vercel → Project → Settings → Environment Variables, add those four
   values, plus the two locks from [Security](#security) (`CMS_PASSWORD` and
   `CMS_ALLOWED_USERS`), for Production (and Preview if you want to edit on
   previews).
5. Redeploy, then open `https://austinsia.com/keystatic`: enter the CMS
   password, then sign in with GitHub.
6. Remove the `NEXT_PUBLIC_KEYSTATIC_STORAGE=github` line from `.env.local`,
   so editing on your computer saves to local files again.

Until this is done, `/keystatic` on the live site shows a "CMS not connected
yet" page, and the site itself works normally.

The editor saves to the branch picked in its top-left menu. Pick the branch
Vercel deploys from (`master`, this repo's default branch).

## Security

Three locks stand between the internet and your content:

1. **A password** (`CMS_PASSWORD`). Before `/keystatic` or its API load at
   all, the browser asks for it (any username works). Use a long random one
   from a password manager. If it isn't set, the live CMS stays locked.
2. **Your GitHub account only** (`CMS_ALLOWED_USERS=AustinCantCode`; add
   more usernames separated by commas). Anyone else who signs in with GitHub
   is signed straight back out and their token is cancelled. If it isn't
   set, nobody can sign in.
3. **GitHub's own permissions.** Saving means committing to the repo, which
   only accounts with write access can do.

Also:

- **Make the repo private**: GitHub → the repo → Settings → General →
  Danger Zone → Change visibility → Private. Everything the CMS saves
  (drafts, "Notes for me", testimonials) is kept in the repo and its history,
  so a public repo would let anyone read it. Nothing on the site loads files
  from the repo, and Vercel deploys private repos normally.
- **Only paste testimonials you have permission to use.** Even unticked ones
  are saved in the repo's history.
- The editor on your computer (`pnpm dev`) needs no password because it only
  answers on `127.0.0.1`. The live site never edits local files.

## Common tasks

**Add a project.** Work → Projects → **Add**. Fill in the title (the URL is
made from it), pick categories and a device frame (Laptop for websites, Phone
for apps, None for photos and artwork), then add a cover image. **Order**
decides where it appears (lower first). To show it on the homepage, add it to
Homepage → Featured projects.

**Write a longer case study.** Open the project → **Case study sections** →
**Add** a section per part of the story (for example "The challenge", "What
I built", "Results"). Leave a blank line between paragraphs; add an image or a
short callout if it helps. Once a project has sections, its page shows them
with an "On this page" list instead of Problem / What I did / Outcome. Add
**Results** for the big figures, only real, checkable facts. **Notes for me**
is never shown on the site: the six drafted case studies (StillGood,
Calibrium, ITE, KiasuParents, Glovida-RX, Frésko) list there what to check.

**Write a post.** Writing → **Add**. New posts start as **Draft**: they show
on your computer (`pnpm dev`, with a "Draft" badge) but never on the live
site. Untick Draft to publish; the post then appears at `/writing`, in the
sitemap and the RSS feed (`/writing/rss.xml`). Writing isn't linked from the
nav or the About page. Use "Heading 2"
for sections (three or more add an "On this page" list), and drop images
straight into the text. Three drafts are waiting for you to edit; their
notes say what to add.

**Retake a website screenshot at 1920×1080.** Website projects show in a
tablet whose screen takes the screenshot's own shape, so a full 1920×1080
shot looks like a real desktop screen. A normal screenshot of your browser
window comes out short and wide (the tabs and address bar take up height),
so capture just the page instead:

1. Open the site in Chrome and press F12 (Cmd+Option+I on a Mac) to open
   DevTools.
2. Turn on the device toolbar (the phone-and-tablet icon, or Ctrl+Shift+M /
   Cmd+Shift+M).
3. Pick **Responsive**, then type **1920** × **1080** in the size boxes. If a
   "DPR" box shows (⋮ → Add device pixel ratio), set it to 1 so the file is
   exactly 1920×1080 (2 gives a sharper 3840×2160, also fine). The zoom
   menu doesn't affect the screenshot.
4. Open the device toolbar's **⋮** menu → **Capture screenshot**. Chrome saves
   a PNG of exactly the visible page (not "Capture full size screenshot", which
   is the whole scroll length). Close any cookie or chat pop-ups first.
5. In the CMS, open the project → **Cover image** → replace the image, check
   the alt text, and save.

Phone apps: do the same at **390** × **844** (an iPhone-sized screen) and
upload it as the project's **Single app screen**.

**Update the CV.** About → CV holds everything on the `/cv` page: the
role line, profile, experience, education, side projects, soft skills and
awards. The downloadable PDF (`public/AustinResume.pdf`) is made from the
same content, in the original one-page layout. After editing the CV, run
`pnpm cv:pdf` on your computer and commit the new PDF. It needs a Chromium
once: `npx playwright install chromium` (or set `CHROME_PATH` to your
Chrome).

**Change the homepage.** Site → Homepage has every section: the timeline,
What I Do (including its four project thumbnails and photo), Featured Projects,
the numbers and the contact tiles.

**Add a certificate.** About → Certificates → open its group (for example
"AWS / SCS") → **Add** under Certificates. New group? **Add** a new entry.

**Feature an event.** About → Events → tick **Feature this event** on one
event (untick the old one). **Link (optional)** adds a link under it, such
as "See what it became" → /stillgood.

**Add photos and videos to an event** (for example your graduation). Open
the event → **More photos and videos** → **Add** one per photo or video.
The event's card then gets a "View Photos" button that opens them full
screen. For a video, upload the MP4 and a still photo to show before it
plays. Keep each video under about 20 MB (1080p, H.264, a minute or two):
every file is saved in the repo, and big ones slow down saving and
deploying. On a Mac, QuickTime → File → Export As → 1080p does this.

**Add a letter of recommendation.** About → **Letters of recommendation**
→ **Add**. Upload a scan or photo of the letter, fill in their name, role
and company, and pick one or two sentences for the **Excerpt**. Typing out
the **Full text** lets screen readers, Google and the chatbot read it. Only
add letters the writer is happy to have published.

**Add a testimonial.** About → Testimonials → **Add**. Paste their words
exactly, add their name, role and company, and pick the project it's about
(it then also appears on that case study). Tick **They agreed to be quoted**;
quotes without it never appear. Tick **Lead quote** on the one to show
largest. The Testimonials section stays hidden until there's at least one.

**Awards on the homepage.** About → Certificates → open a group → tick
**Show on the homepage** on a certificate. Achievements shows every ticked one.

**Client names.** Site → Homepage → Clients strip. Add a logo to replace a
name with the client's logo (shown in one colour to match the site).

**Photos over the years.** About → Photos over the years → add two or more
photos (oldest first) with the year. They replace the round portrait with a
stack visitors can drag or tap through.

**Timeline links and logos.** Site → Homepage → My Journey → open a
milestone to add a small logo or links such as "Case study" → /projects/fresko.

**Work areas.** Development, Design and Ventures each have their own page
(`/development`, `/design`, `/ventures`) with their own selector.
Site → Work areas sets each area's name and the line under its page title;
Site → Pages & SEO holds each page's heading and search text. The groups on
the Development and Design pages are set in code
(`src/app/(site)/_work/areas.ts`).

**Search results.** Site → Pages & SEO holds each page's title and
description for Google (about 60 and 160 characters at most).

## Services to switch on (Vercel environment variables)

| Variable            | What it turns on                                                                                                                                                                             |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`    | The contact form sends messages to your inbox (resend.com, free tier). Until it's set, the form offers to email you instead.                                                                 |
| `CONTACT_FROM`      | Optional. The sender, e.g. `Austin Sia <hello@austinsia.com>`, once you verify your domain in Resend.                                                                                        |
| `CMS_PASSWORD`      | Required for the live CMS: the password asked before `/keystatic` opens. See [Security](#security).                                                                                          |
| `CMS_ALLOWED_USERS` | Required for the live CMS: GitHub usernames allowed to sign in, e.g. `AustinCantCode`.                                                                                                       |
| `ANTHROPIC_API_KEY` | The "Ask about Austin" chat button (console.anthropic.com). It stays hidden until the key is set. Answers come only from the site's content, a few sentences each, with a per-visitor limit. |
| `ASK_MODEL`         | Optional. The Claude model for the chat; defaults to `claude-haiku-4-5`, the fastest and cheapest.                                                                                           |

The chat's greeting, button text and suggested questions are under
Site → Ask Austin (chatbot).

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
- Locks: `src/middleware.ts` (the password, production only) and
  `src/lib/cms-guard.ts` (the GitHub account allowlist, checked when a
  sign-in or token refresh completes in
  `src/app/api/keystatic/[...params]/route.ts`).
