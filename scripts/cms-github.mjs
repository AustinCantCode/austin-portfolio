/**
 * pnpm cms:github — starts the site on your computer with the CMS in
 * GitHub mode (NEXT_PUBLIC_KEYSTATIC_STORAGE=github), without editing
 * .env.local. Use it to create the CMS's GitHub App the first time
 * (docs/CMS.md, "Connect the live CMS"), or to edit the GitHub copy.
 */
import { spawn } from "node:child_process";

const env = { ...process.env, NEXT_PUBLIC_KEYSTATIC_STORAGE: "github" };
const run = (cmd, args) =>
  spawn(cmd, args, {
    stdio: "inherit",
    env,
    shell: process.platform === "win32",
  });

console.log(
  "\nCMS in GitHub mode: open http://127.0.0.1:3000/keystatic and click “Log in with GitHub”.\n",
);
run("node", ["scripts/content.mjs", "--watch"]);
run("npx", ["next", "dev", "--turbopack", "-H", "127.0.0.1"]);
