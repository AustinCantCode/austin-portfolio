/**
 * The CMS password (CMS_PASSWORD), asked for with the browser's own
 * sign-in prompt. src/middleware.ts checks it before /keystatic or its
 * API load, and the API route checks it again itself, so the CMS stays
 * locked even if a request ever gets past the middleware.
 */

const REALM = 'Basic realm="Austin Sia CMS", charset="UTF-8"';

/** Headers for every CMS response: private, unindexed, never framed. */
export const CMS_HEADERS = {
  "X-Robots-Tag": "noindex, nofollow",
  "Cache-Control": "no-store",
  "X-Frame-Options": "DENY",
  "Content-Security-Policy": "frame-ancestors 'none'",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "same-origin",
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

/**
 * Null when the request may reach the CMS; otherwise the response to send
 * instead. Only the live site asks: the editor on your computer answers
 * on 127.0.0.1 alone (see the dev script).
 */
export function passwordGate(req: Request): Response | null {
  if (process.env.NODE_ENV !== "production") return null;
  const expected = process.env.CMS_PASSWORD;
  // Fail closed: without a password configured, the CMS stays shut.
  if (!expected)
    return new Response(
      "CMS locked: set CMS_PASSWORD in Vercel (see docs/CMS.md).",
      { status: 503, headers: CMS_HEADERS },
    );
  const given = passwordFrom(req.headers.get("authorization"));
  if (given !== null && same(given, expected)) return null;
  return new Response("Password required.", {
    status: 401,
    headers: { ...CMS_HEADERS, "WWW-Authenticate": REALM },
  });
}
