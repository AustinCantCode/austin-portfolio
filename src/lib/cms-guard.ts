/**
 * Second lock on the CMS: only GitHub accounts listed in CMS_ALLOWED_USERS
 * can sign in. When Keystatic's GitHub sign-in (or token refresh) succeeds,
 * we look up who the token belongs to; anyone else has the token revoked
 * and gets no session. (GitHub itself still decides who can save; the
 * first lock is the password in src/middleware.ts.)
 */

const ACCESS = "keystatic-gh-access-token";
const REFRESH = "keystatic-gh-refresh-token";

/** GitHub usernames allowed to use the CMS, lower-cased. */
export const allowedUsers = (value = process.env.CMS_ALLOWED_USERS ?? "") =>
  value
    .split(",")
    .map((u) => u.trim().toLowerCase())
    .filter(Boolean);

const expire = (name: string) =>
  `${name}=; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;

const page = (title: string, text: string) =>
  `<!doctype html><meta charset="utf-8"><meta name="robots" content="noindex"><title>${title}</title><body style="font-family:system-ui,sans-serif;max-width:520px;margin:15vh auto;padding:0 24px;line-height:1.55"><h1 style="font-size:26px">${title}</h1><p>${text}</p><p><a href="/">Back to the site</a></p></body>`;

function refuse(title: string, text: string) {
  const headers = new Headers({
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-store",
  });
  headers.append("Set-Cookie", expire(ACCESS));
  headers.append("Set-Cookie", expire(REFRESH));
  return new Response(page(title, text), { status: 403, headers });
}

/** The access token a Keystatic response is about to set, if any. */
function newToken(res: Response) {
  for (const c of res.headers.getSetCookie()) {
    const [pair] = c.split(";");
    const eq = pair.indexOf("=");
    if (pair.slice(0, eq).trim() === ACCESS) {
      const value = decodeURIComponent(pair.slice(eq + 1).trim());
      if (value) return value;
    }
  }
  return null;
}

type Options = {
  allowed?: string[];
  enforce?: boolean;
  clientId?: string;
  clientSecret?: string;
  fetch?: typeof fetch;
};

/**
 * Checks a sign-in or refresh response from Keystatic's handler. Passes it
 * through for allowed accounts; otherwise revokes the token and refuses.
 */
export async function guardLogin(res: Response, opts: Options = {}) {
  const token = newToken(res);
  if (!token) return res; // Nothing was issued (e.g. GitHub reported an error).

  const allowed = opts.allowed ?? allowedUsers();
  const enforce =
    opts.enforce ??
    (process.env.NODE_ENV === "production" || allowed.length > 0);
  if (!enforce) return res;
  const doFetch = opts.fetch ?? fetch;
  const clientId = opts.clientId ?? process.env.KEYSTATIC_GITHUB_CLIENT_ID;
  const clientSecret =
    opts.clientSecret ?? process.env.KEYSTATIC_GITHUB_CLIENT_SECRET;

  const revoke = async () => {
    if (!clientId || !clientSecret) return;
    await doFetch(`https://api.github.com/applications/${clientId}/token`, {
      method: "DELETE",
      headers: {
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "austinsia-cms",
      },
      body: JSON.stringify({ access_token: token }),
    }).catch(() => {});
  };

  if (!allowed.length) {
    await revoke();
    return refuse(
      "CMS locked",
      "No GitHub accounts are allowed yet. Set CMS_ALLOWED_USERS in Vercel (see docs/CMS.md).",
    );
  }

  let login = "";
  try {
    const me = await doFetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "austinsia-cms",
      },
    });
    if (me.ok) login = String((await me.json()).login ?? "").toLowerCase();
  } catch {}

  if (login && allowed.includes(login)) return res;

  await revoke();
  return refuse(
    "This account can't use the CMS",
    login
      ? `You're signed in to GitHub as ${login.replace(/[<>&"]/g, "")}, which isn't allowed to edit this site.`
      : "We couldn't confirm your GitHub account, so sign-in was refused. Try again in a minute.",
  );
}
