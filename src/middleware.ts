import { NextResponse, type NextRequest } from "next/server";
import { CMS_HEADERS, passwordGate } from "@lib/cms-auth";

/**
 * First lock on the CMS: the password (src/lib/cms-auth.ts) before
 * /keystatic or its API load at all. The API route checks it again, and
 * the second lock, a GitHub account allowlist, is in src/lib/cms-guard.ts.
 */
export const config = {
  matcher: ["/keystatic", "/keystatic/:path*", "/api/keystatic/:path*"],
};

export function middleware(req: NextRequest) {
  const refused = passwordGate(req);
  if (refused) return refused;
  const res = NextResponse.next();
  for (const [k, v] of Object.entries(CMS_HEADERS)) res.headers.set(k, v);
  return res;
}
