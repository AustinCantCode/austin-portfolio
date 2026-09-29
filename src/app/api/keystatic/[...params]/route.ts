import { makeRouteHandler } from "@keystatic/next/route-handler";
import config, { cmsEnabled } from "../../../../../keystatic.config";
import { guardLogin } from "@lib/cms-guard";

export const runtime = "nodejs";

// Until the CMS's GitHub App is set up (docs/CMS.md), the live site has no
// CMS API; the admin page explains how to connect it.
const off = () => new Response("Not found", { status: 404 });

// Keystatic throws when its GitHub App secrets are missing; answer with a
// clear message instead of a crash.
let handler: ReturnType<typeof makeRouteHandler> | null = null;
let setupError = "";
if (cmsEnabled) {
  try {
    handler = makeRouteHandler({ config });
  } catch (e) {
    setupError = e instanceof Error ? e.message : String(e);
    console.error("[keystatic]", setupError);
  }
}
const misconfigured = () =>
  new Response(
    "CMS not fully set up: add KEYSTATIC_GITHUB_CLIENT_ID, KEYSTATIC_GITHUB_CLIENT_SECRET and KEYSTATIC_SECRET in Vercel (see docs/CMS.md).",
    { status: 503, headers: { "Cache-Control": "no-store" } },
  );

// Sign-in and token refresh are where a GitHub session starts, so that's
// where the account allowlist is checked (src/lib/cms-guard.ts).
const GUARDED = /\/api\/keystatic\/github\/(oauth\/callback|refresh-token)\/?$/;

function wrap(run: (req: Request) => Promise<Response>) {
  return async (req: Request) => {
    const res = await run(req);
    return GUARDED.test(new URL(req.url).pathname) ? guardLogin(res) : res;
  };
}

const fallback = setupError ? misconfigured : off;
export const GET = handler ? wrap(handler.GET) : fallback;
export const POST = handler ? wrap(handler.POST) : fallback;
