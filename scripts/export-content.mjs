/**
 * Copies the site's content out into a folder of properly named files,
 * ready to copy onto a USB drive or share:
 *
 *   pnpm export            → ./export
 *   pnpm export "D:/Backup" → any folder
 *
 * Every image, video and PDF the content uses is copied under a readable
 * name (Projects/Calibrium/Cover.png, Certificates/AWS - SCS/…), and each
 * entry's words go in a .txt file beside them (posts as .md).
 *
 * The files in public/ keep the CMS's own names (items/0/image.png):
 * Keystatic renames an image back to that pattern every time its entry
 * is saved, so renaming them in place wouldn't last.
 */
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { basename, extname, join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const CONTENT = join(ROOT, "content");
const PUBLIC = join(ROOT, "public");
const OUT = resolve(process.argv[2] ?? join(ROOT, "export"));

/** Folder names for each collection. */
const COLLECTIONS = {
  projects: "Projects",
  "small-apps": "Small Apps",
  graphics: "Graphic Design",
  ventures: "Ventures",
  certificates: "Certificates",
  events: "Events",
  testimonials: "Testimonials",
  writing: "Writing",
};

/** Folder names for the one-off pages (content/*.json). */
const PAGES = {
  site: "Site",
  home: "Homepage",
  about: "About",
  cv: "CV",
  stillgood: "StillGood Page",
  skills: "Skills",
  pages: "Pages and SEO",
  navigation: "Navigation",
  categories: "Categories",
};

// Keys that only hold other things, so they add nothing to a name.
const SILENT = new Set(["image", "items", "media", "src", "file", "value"]);
// Keys that aren't worth putting in the text files.
const SKIP_TEXT = new Set(["fit", "bare", "position", "order", "permission"]);

const UPPER = new Set(["ai", "cv", "seo", "url", "ui", "ux", "cta"]);
const human = (key) =>
  String(key)
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .split(" ")
    .map((w) => (UPPER.has(w.toLowerCase()) ? w.toUpperCase() : w))
    .join(" ")
    .replace(/^./, (c) => c.toUpperCase());

/** A name that is safe on Windows, macOS and FAT32 USB drives. */
const safe = (s) =>
  String(s)
    .replace(/[\\/:*?"<>|]+/g, " - ")
    .replace(/[\u0000-\u001f]/g, "")
    .replace(/\s+/g, " ")
    .replace(/^[\s.-]+|[\s.]+$/g, "")
    .slice(0, 110) || "Untitled";

const labelOf = (o) =>
  o && typeof o === "object" && !Array.isArray(o)
    ? [o.title, o.name, o.label, o.alt, o.issuerGroup].find(
        (v) => typeof v === "string" && v.trim(),
      )
    : undefined;

/** A path in the content that points at a file in public/. */
const assetOf = (v) =>
  typeof v === "string" &&
  /^\/[^\s]+\.[a-z0-9]{2,5}$/i.test(v) &&
  existsSync(join(PUBLIC, decodeURIComponent(v)))
    ? join(PUBLIC, decodeURIComponent(v))
    : null;

let copied = 0;
const used = new Map();

/** Copy a file into `dir` as `name`, adding (2), (3)… if the name is taken. */
function place(src, dir, name) {
  mkdirSync(dir, { recursive: true });
  const ext = extname(src).toLowerCase();
  const stem = safe(name);
  let file = `${stem}${ext}`;
  for (let n = 2; used.has(join(dir, file).toLowerCase()); n++)
    file = `${stem} (${n})${ext}`;
  used.set(join(dir, file).toLowerCase(), true);
  copyFileSync(src, join(dir, file));
  copied++;
}

/**
 * Walk an entry: copy each file it points at, named after the path to it
 * (Story - What We Designed, Gallery 2), and collect its words.
 */
function walk(value, trail, dir, lines, prefix) {
  const src = assetOf(value);
  if (src) {
    const name = [prefix, ...trail].filter(Boolean).join(" - ") || "Image";
    place(src, dir, name);
    return;
  }
  // A plain list of words (skills, tags) reads best on one line.
  if (
    Array.isArray(value) &&
    value.length &&
    value.every((v) => typeof v === "string" && !assetOf(v))
  ) {
    lines.push(`${trail.join(" › ")}: ${value.join(", ")}`);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, i) => {
      const label = labelOf(item);
      const key = trail.length ? trail : [];
      walk(item, [...key, label ?? String(i + 1)], dir, lines, prefix);
    });
    return;
  }
  if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      if (SKIP_TEXT.has(k)) continue;
      // A picture's own label names the file, not its "image" key.
      const seg = SILENT.has(k) ? null : human(k);
      walk(v, seg ? [...trail, seg] : trail, dir, lines, prefix);
    }
    return;
  }
  if (typeof value === "string" && value.trim() && !value.startsWith("/")) {
    const heading = trail.filter(Boolean).join(" › ") || "Text";
    lines.push(
      value.includes("\n") || value.length > 90
        ? `${heading}:\n${value.trim()}\n`
        : `${heading}: ${value.trim()}`,
    );
  } else if (typeof value === "boolean" && value) {
    lines.push(`${trail.filter(Boolean).join(" › ")}: yes`);
  }
}

function writeText(dir, name, lines, extra = "") {
  const text = [...lines, extra].filter(Boolean).join("\n").trim();
  if (!text) return;
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, `${safe(name)}.txt`), `${text}\n`);
}

/**
 * Files are named "<entry> - <what it is>", so they still make sense once
 * copied out of their folder. Certificates already have their own titles.
 */
function exportEntry(data, dir, title, body, prefix = title) {
  const lines = [];
  walk(data, [], dir, lines, prefix);
  writeText(dir, title, lines);
  if (body) writeFileSync(join(dir, `${safe(title)}.md`), body);
}

if (existsSync(OUT)) rmSync(OUT, { recursive: true });
mkdirSync(OUT, { recursive: true });

// Collections: one folder per entry (certificates: one per group).
for (const [folder, label] of Object.entries(COLLECTIONS)) {
  const base = join(CONTENT, folder);
  if (!existsSync(base)) continue;
  for (const name of readdirSync(base).sort()) {
    const path = join(base, name);
    let data;
    let body = "";
    if (statSync(path).isDirectory()) {
      const index = join(path, "index.json");
      if (!existsSync(index)) continue;
      data = JSON.parse(readFileSync(index, "utf8"));
      const mdoc = readdirSync(path).find((f) => f.endsWith(".mdoc"));
      if (mdoc) body = readFileSync(join(path, mdoc), "utf8");
    } else if (name.endsWith(".json")) {
      data = JSON.parse(readFileSync(path, "utf8"));
    } else continue;
    const title = safe(labelOf(data) ?? human(basename(name, ".json")));
    exportEntry(
      data,
      join(OUT, label, title),
      title,
      body,
      folder === "certificates" ? "" : title,
    );
  }
}

// One-off pages.
for (const name of readdirSync(CONTENT).sort()) {
  if (!name.endsWith(".json")) continue;
  const key = basename(name, ".json");
  const label = PAGES[key] ?? human(key);
  const data = JSON.parse(readFileSync(join(CONTENT, name), "utf8"));
  exportEntry(data, join(OUT, "Pages", label), label);
}

// Files the site uses that aren't in the CMS.
const extras = [
  ["AustinResume.pdf", "Austin Sia CV"],
  ["AS-Circle-Logo.png", "AS Logo"],
  ["coin-images/profile pic.png", "Coin - Photo side"],
  ["coin-images/AS-Coin-1200.png", "Coin - AS side"],
];
for (const [file, name] of extras) {
  const src = join(PUBLIC, file);
  if (existsSync(src)) place(src, join(OUT, "Site Files"), name);
}

writeFileSync(
  join(OUT, "README.txt"),
  `Austin Sia's portfolio content, exported ${new Date().toISOString().slice(0, 10)}.

Each folder holds one part of the site: its pictures, videos and PDFs
under readable names, and its words in a .txt file (posts as .md).
Make a fresh copy any time with: pnpm export
`,
);

console.log(`Exported ${copied} files to ${OUT}`);
