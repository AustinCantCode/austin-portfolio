# 🎨 Austin's Personal Portfolio Website

Welcome to my portfolio webpage!
This portfolio showcases my design and software development work, skills, and projects. Built with a modern tech stack and a responsive UI, it highlights my capabilities in **full-stack software development, design works and entrepreneurial ventures**. I hope you enjoy looking through it!

## 🌐 Live Webpage

https://austinsia.com

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router) / React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4, with design tokens in `src/app/globals.css` (light and dark)
- **Motion:** Framer Motion, three.js (the 3D coin)
- **Icons:** Lucide
- **Analytics:** PostHog (optional) and Vercel Speed Insights
- **Hosting:** Vercel

## 🗂️ Project structure

- `src/app` holds the routes: `/`, `/work`, `/work/[category]`, `/projects/[slug]`, `/stillgood`, `/about` (plus `skills`, `certificates`, `events`), `/cv` and `/contact`.
- `src/data` holds all copy and content as typed modules. Edit these to change what the site says.
- `src/_components` holds the shared UI: nav, footer, tiles, device frames and the coin.

Old URLs (`/homepage`, `/coding`, `/designing`, `/achievements`, `/participation`) redirect to their new pages.

## ⚙️ Development

```bash
pnpm install
pnpm dev
```

To turn on PostHog analytics, set `NEXT_PUBLIC_POSTHOG_KEY` (and optionally `NEXT_PUBLIC_POSTHOG_HOST`). Without a key, analytics stays off.

## 📝 To do

- Add a Calibrium screenshot and an IAL Success Stories screenshot, plus the two "What I do" photos (coding, and a Figma canvas). Placeholders marked "Image coming soon" show where they go; see the `MEDIA` map in `src/data/projects.ts` and `whatIDoPhotos` in `src/data/home.ts`.
- Update `public/AustinResume.pdf`.

StillGood screenshots and the Google Play badge come from the StillGood website (stillgoodapp.org).

## 📬 Contact

If you'd like to collaborate or reach out

- **Email:** [austin.sia1515@gmail.com](mailto:austin.sia1515@gmail.com)
- **LinkedIn:** [linkedin.com/in/austinsia](https://linkedin.com/in/austinsia)
