import { NextResponse, type NextRequest } from "next/server";

/**
 * First lock on the CMS: a password before /keystatic or its API load at
 * all (the browser's own sign-in prompt). Live site only; the local editor
 * is reachable from this computer alone (see the dev script). The second
 * lock, a GitHub account allowlist, is in src/lib/cms-guard.ts.
 */
export const config = {
  matcher: ["/keystatic", "/keystatic/:path*", "/api/keystatic/:path*"],
};

const REALM = 'Basic realm="Austin Sia CMS", charset="UTF-8"';
const HEADERS = {
  "X-Robots-Tag": "noindex, nofollow",
  "Cache-Control": "no-store",
};

/** Compares in constant time, so response timing reveals nothing. */
function same(a: string, b: string) {
  const x = new TextEncoder().encode(a);
  const y = new TextEncoder().encode(b);
  let diff = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++)
    diff |= (x[i] ?? 0) ^ (y[i] ?? 0);
  return diff === 0;
}

/** The password from an "Authorization: Basic …" header (user is ignored). */
function passwordFrom(header: string | null) {
  if (!header?.startsWith("Basic ")) return null;
  try {
    const bytes = Uint8Array.from(atob(header.slice(6).trim()), (c) =>
      c.charCodeAt(0),
    );
    const decoded = new TextDecoder().decode(bytes);
    const colon = decoded.indexOf(":");
    return colon === -1 ? null : decoded.slice(colon + 1);
  } catch {
    return null;
  }
}

export function middleware(req: NextRequest) {
  if (process.env.NODE_ENV !== "production") return NextResponse.next();

  const expected = process.env.CMS_PASSWORD;
  // Fail closed: without a password configured, the CMS stays shut.
  if (!expected) {
    return new NextResponse(
      "CMS locked: set CMS_PASSWORD in Vercel (see docs/CMS.md).",
      { status: 503, headers: HEADERS },
    );
  }

  const given = passwordFrom(req.headers.get("authorization"));
  if (given === null || !same(given, expected)) {
    return new NextResponse("Password required.", {
      status: 401,
      headers: { ...HEADERS, "WWW-Authenticate": REALM },
    });
  }

  const res = NextResponse.next();
  for (const [k, v] of Object.entries(HEADERS)) res.headers.set(k, v);
  return res;
}
