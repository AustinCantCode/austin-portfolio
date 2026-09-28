#!/usr/bin/env node
/**
 * Turns the CMS content (content/, edited at /keystatic) into the JSON the
 * site imports (src/data/generated/). Runs before `next dev` and
 * `next build`; `--watch` regenerates whenever content changes.
 *
 * - Collections (content/<name>/*.json) become arrays sorted by `order`,
 *   with each entry's file name as its `slug`.
 * - Singletons (content/<name>.json) are copied as they are.
 * - Image paths (/images/…) become { src, width, height, blurDataURL },
 *   the same shape as a static image import, so next/image can size and
 *   blur them.
 */
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  watch,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { imageSize } from "image-size";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT = path.join(ROOT, "content");
const PUBLIC = path.join(ROOT, "public");
const OUT = path.join(ROOT, "src/data/generated");
const CACHE = path.join(ROOT, "node_modules/.cache/content-images.json");
const IMAGE = /^\/images\/.+\.(png|jpe?g|webp|gif|avif)$/i;

let cache = {};
try {
  cache = JSON.parse(readFileSync(CACHE, "utf8"));
} catch {}

const warnings = [];

async function resolveImage(url) {
  const file = path.join(PUBLIC, decodeURIComponent(url));
  if (!existsSync(file)) {
    warnings.push(`Missing image ${url}`);
    return null;
  }
  const { size, mtimeMs } = statSync(file);
  const key = `${url}:${size}:${mtimeMs}`;
  if (!cache[key]) {
    const buf = readFileSync(file);
    const { width, height } = imageSize(buf);
    // An 8px preview, like Next's static imports, shown while loading.
    const tiny = await sharp(buf)
      .resize(8, 8, { fit: "inside" })
      .webp({ quality: 70 })
      .toBuffer();
    cache[key] = {
      width,
      height,
      blurDataURL: `data:image/webp;base64,${tiny.toString("base64")}`,
    };
  }
  return { src: url, ...cache[key] };
}

/** Replaces every image path in a value with its image object. */
async function resolve(value) {
  if (typeof value === "string") {
    return IMAGE.test(value) ? resolveImage(value) : value;
  }
  if (Array.isArray(value)) return Promise.all(value.map(resolve));
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = await resolve(v);
    return out;
  }
  return value;
}

const readJson = (file) => JSON.parse(readFileSync(file, "utf8"));

async function generate() {
  warnings.length = 0;
  mkdirSync(OUT, { recursive: true });
  const written = [];
  for (const name of readdirSync(CONTENT).sort()) {
    const full = path.join(CONTENT, name);
    let data;
    if (statSync(full).isDirectory()) {
      const entries = readdirSync(full)
        .filter((f) => f.endsWith(".json"))
        .map((f) => ({
          slug: f.slice(0, -5),
          ...readJson(path.join(full, f)),
        }));
      entries.sort(
        (a, b) =>
          (a.order ?? 100) - (b.order ?? 100) || a.slug.localeCompare(b.slug),
      );
      data = entries;
    } else if (name.endsWith(".json")) {
      data = readJson(full);
    } else continue;
    const key = name.replace(/\.json$/, "");
    const json = JSON.stringify(await resolve(data), null, 1) + "\n";
    const out = path.join(OUT, `${key}.json`);
    // Only rewrite changed files, so the dev server reloads just what changed.
    if (!existsSync(out) || readFileSync(out, "utf8") !== json) {
      writeFileSync(out, json);
      written.push(key);
    }
  }
  mkdirSync(path.dirname(CACHE), { recursive: true });
  writeFileSync(CACHE, JSON.stringify(cache));
  for (const w of warnings) console.warn(`[content] ${w}`);
  console.log(
    `[content] ${written.length ? `updated ${written.join(", ")}` : "up to date"}`,
  );
}

await generate();

if (process.argv.includes("--watch")) {
  let timer;
  const again = () => {
    clearTimeout(timer);
    timer = setTimeout(() => generate().catch((e) => console.error(e)), 150);
  };
  watch(CONTENT, { recursive: true }, again);
  watch(path.join(PUBLIC, "images"), { recursive: true }, again);
  console.log("[content] watching content/ for changes");
}
