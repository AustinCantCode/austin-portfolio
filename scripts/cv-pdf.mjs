#!/usr/bin/env node
/**
 * Exports the CV as public/AustinResume.pdf, in the same one-page A4
 * layout as the original: name and contact details on top, then Profile;
 * Education beside Experiences; Skills beside Side Projects and
 * Achievements. Content comes from the CMS files (content/cv.json,
 * content/skills.json, content/site.json and the projects), so after
 * editing the CV in the CMS, run `pnpm cv:pdf` and commit the PDF.
 *
 * Needs a Chromium: run `npx playwright install chromium` once, or set
 * CHROME_PATH to a Chrome/Chromium executable.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => JSON.parse(readFileSync(join(root, p), "utf8"));

const cv = read("content/cv.json");
const skills = read("content/skills.json");
const site = read("content/site.json");
const projects = cv.projects.map((slug) =>
  read(`content/projects/${slug}.json`),
);

// Inter, embedded from @fontsource so the PDF looks the same offline.
const font = (w) =>
  `@font-face { font-family: Inter; font-weight: ${w}; src: url(data:font/woff2;base64,${readFileSync(
    join(
      root,
      `node_modules/@fontsource/inter/files/inter-latin-${w}-normal.woff2`,
    ),
  ).toString("base64")}) format("woff2"); }`;

const esc = (s = "") =>
  String(s).replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
  );

const c = site.contact;
const html = `<!doctype html>
<html><head><meta charset="utf-8">
<style>
  ${[400, 700, 800].map(font).join("\n")}
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Inter, system-ui, sans-serif; color: #555; font-size: 8.1pt; line-height: 1.38; }
  .page { width: 210mm; height: 297mm; padding: 10mm 14mm 8mm; display: flex; flex-direction: column; }
  header { text-align: center; }
  h1 { font-size: 27pt; font-weight: 800; letter-spacing: 0.01em; color: #555; line-height: 1.1; }
  .role { font-size: 10.5pt; text-transform: uppercase; letter-spacing: 0.02em; margin-top: 2mm; }
  .contact { margin-top: 2mm; font-size: 8.4pt; display: flex; justify-content: center; gap: 9mm; }
  .contact b { font-weight: 700; }
  hr { border: 0; border-top: 0.8pt solid #777; margin: 2.4mm 0; }
  h2 { font-size: 12.5pt; font-weight: 800; color: #555; margin-bottom: 1.4mm; text-transform: uppercase; }
  h3 { font-size: 9.8pt; font-weight: 700; color: #555; }
  h4 { font-size: 8.3pt; font-weight: 700; color: #555; margin-top: 1.4mm; }
  .cols { display: grid; grid-template-columns: 1fr 1fr; gap: 9mm; }
  .cols.split { position: relative; flex: 1; }
  .cols.split::before { content: ""; position: absolute; left: 50%; top: 0; bottom: 0; border-left: 0.8pt solid #777; }
  .item { margin-bottom: 1.6mm; }
  .date { font-size: 7.9pt; }
  .strong { font-weight: 700; }
  ul { list-style: none; }
  .upper li { text-transform: uppercase; font-size: 7.6pt; }
  .two { columns: 2; column-gap: 4mm; }
</style></head>
<body><div class="page">
  <header>
    <h1>${esc(site.name.toUpperCase())}</h1>
    <p class="role">${esc(cv.role)}</p>
    <p class="contact">
      <span><b>Email:</b> ${esc(c.email)}</span>
      <span><b>Phone Number:</b> ${esc(c.phone)}</span>
      <span><b>LinkedIn:</b> ${esc(c.linkedinLabel)}</span>
    </p>
  </header>
  <hr>
  <section><h2>Profile</h2><p>${esc(cv.profile)}</p></section>
  <hr>
  <div class="cols">
    <section><h2>Education</h2>
      ${cv.education
        .map(
          (
            e,
          ) => `<div class="item"><h3>${esc(e.org)}</h3><p class="date">${esc(e.date)}</p>
          ${e.text
            .split(/,\s*(?=[A-Z])/)
            .map((t) => `<p class="strong">${esc(t)}</p>`)
            .join("")}</div>`,
        )
        .join("")}
    </section>
    <section><h2>Experiences</h2>
      ${cv.experience
        .map(
          (
            x,
          ) => `<div class="item"><h3>${esc(x.org)}</h3><p class="date">${esc(x.date)}</p>
          <p class="strong">${esc(x.role)}</p><p>${esc(x.text)}</p></div>`,
        )
        .join("")}
    </section>
  </div>
  <hr>
  <div class="cols split">
    <section><h2>Skills</h2>
      <h3>Soft Skills</h3>
      <ul class="two">${cv.softSkills.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
      <h3 style="margin-top:2.2mm">Languages</h3>
      <p>${(cv.languages ?? []).map((l) => `${esc(l.name)} (${esc(l.level)})`).join(", ")}</p>
      <h3 style="margin-top:2.2mm">Technical Skills</h3>
      ${skills.groups
        .map((g) => `<h4>${esc(g.name)}</h4><p>${esc(g.items.join(", "))}</p>`)
        .join("")}
    </section>
    <section><h2>Side Projects</h2>
      <ul>${projects
        .map(
          (p) =>
            `<li class="item" style="margin-bottom:1mm"><p class="strong">${esc(p.title)}</p><p>${esc(p.subtext)}</p></li>`,
        )
        .join("")}</ul>
      <h2 style="margin-top:3mm">Achievements</h2>
      <h3>Awards and Certifications</h3>
      <ul class="upper" style="margin-top:1.2mm">${cv.achievements.map((a) => `<li>${esc(a)}</li>`).join("")}</ul>
    </section>
  </div>
</div></body></html>`;

const browser = await chromium.launch(
  process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {},
);
const page = await browser.newPage();
await page.setContent(html, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
const out = join(root, "public/AustinResume.pdf");
writeFileSync(
  out,
  await page.pdf({
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
  }),
);
await browser.close();
console.log("Wrote public/AustinResume.pdf");
