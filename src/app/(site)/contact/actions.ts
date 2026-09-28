"use server";

import { headers } from "next/headers";
import { site } from "@data/site";
import { validate, type Errors, type Values } from "./validate";

export type SendState =
  | { status: "idle" }
  | { status: "sent"; name: string }
  | { status: "invalid"; errors: Errors; values: Values }
  | { status: "failed"; values: Values; reason: "config" | "send" | "limit" };

// A few messages per visitor per ten minutes. In memory, so it resets when
// a server instance restarts; it only needs to slow down scripted spam.
const WINDOW = 10 * 60 * 1000;
const MAX = 5;
const recent = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW);
  hits.push(now);
  recent.set(ip, hits);
  return hits.length > MAX;
}

/**
 * Sends a contact message to Austin's inbox through Resend
 * (RESEND_API_KEY; CONTACT_FROM once a sending domain is verified).
 */
export async function sendMessage(
  _prev: SendState,
  form: FormData,
): Promise<SendState> {
  const values: Values = {
    name: String(form.get("name") ?? "").trim(),
    email: String(form.get("email") ?? "").trim(),
    message: String(form.get("message") ?? "").trim(),
  };

  // Spam checks: a hidden field people never fill in, and a form that was
  // on screen for at least three seconds (bots post instantly). Both look
  // like a success to the bot.
  const started = Number(form.get("started") ?? 0);
  if (
    String(form.get("company") ?? "") ||
    !started ||
    Date.now() - started < 3000
  ) {
    return { status: "sent", name: values.name };
  }

  const errors = validate(values);
  if (Object.keys(errors).length) return { status: "invalid", errors, values };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return { status: "failed", values, reason: "limit" };

  const key = process.env.RESEND_API_KEY;
  if (!key) return { status: "failed", values, reason: "config" };

  try {
    // RESEND_API_URL only exists so tests can point at a mock server.
    const url = process.env.RESEND_API_URL || "https://api.resend.com/emails";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>",
        to: [site.contact.email],
        reply_to: values.email,
        subject: `New message from ${values.name}`,
        text: `${values.message}\n\n— ${values.name} <${values.email}>\nSent from the contact form on ${site.url}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("[contact] Resend error", res.status, await res.text());
      return { status: "failed", values, reason: "send" };
    }
  } catch (e) {
    console.error("[contact] send failed", e);
    return { status: "failed", values, reason: "send" };
  }
  return { status: "sent", name: values.name };
}
