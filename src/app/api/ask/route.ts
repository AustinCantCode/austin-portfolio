import Anthropic from "@anthropic-ai/sdk";
import { askSystemPrompt } from "@lib/ask-context";

/**
 * "Ask Austin": streams a short answer about Austin, grounded in the
 * site's content. Needs ANTHROPIC_API_KEY; ASK_MODEL overrides the model.
 */
export const runtime = "nodejs";

const MODEL = process.env.ASK_MODEL || "claude-haiku-4-5";
const MAX_TURNS = 6; // messages of history sent to the model
const MAX_QUESTION = 500; // characters
const MAX_ANSWER = 2000; // characters kept from earlier answers

// A handful of questions per visitor per ten minutes. In memory, so it
// resets when a server instance restarts; it's there to stop runaway use.
const WINDOW = 10 * 60 * 1000;
const LIMIT = 12;
const recent = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW);
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 5000) recent.clear();
  return hits.length > LIMIT;
}

const json = (status: number, message: string) =>
  Response.json({ error: message }, { status });

/** Keeps a clean, alternating user/assistant history ending on a question. */
function clean(input: unknown): Anthropic.MessageParam[] | null {
  if (!Array.isArray(input)) return null;
  const out: Anthropic.MessageParam[] = [];
  for (const m of input.slice(-MAX_TURNS)) {
    if (!m || typeof m !== "object") return null;
    const { role, content } = m as { role?: unknown; content?: unknown };
    if (
      (role !== "user" && role !== "assistant") ||
      typeof content !== "string"
    )
      return null;
    const text = content
      .trim()
      .slice(0, role === "user" ? MAX_QUESTION : MAX_ANSWER);
    if (!text) continue;
    if (out.length && out[out.length - 1].role === role) return null;
    out.push({ role, content: text });
  }
  while (out.length && out[0].role !== "user") out.shift();
  if (!out.length || out[out.length - 1].role !== "user") return null;
  return out;
}

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) return json(503, "Ask Austin is off.");

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip))
    return json(429, "That's a lot of questions! Try again in a few minutes.");

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json(400, "Send your question again.");
  }
  const messages = clean((body as { messages?: unknown })?.messages);
  if (!messages) return json(400, "Send your question again.");

  const client = new Anthropic();
  const stream = client.messages.stream({
    model: MODEL,
    // Answers are meant to be a few sentences.
    max_tokens: 500,
    system: [
      {
        type: "text",
        text: askSystemPrompt,
        cache_control: { type: "ephemeral" },
      },
    ],
    messages,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal") {
          controller.enqueue(
            encoder.encode(
              "Sorry, I can't help with that one. Ask me about Austin's work instead.",
            ),
          );
        }
      } catch (error) {
        if (error instanceof Anthropic.RateLimitError) {
          controller.enqueue(
            encoder.encode(
              "\n\nI'm a bit busy right now. Please try again in a minute.",
            ),
          );
        } else if (error instanceof Anthropic.APIError) {
          console.error("[ask] API error", error.status, error.message);
          controller.enqueue(
            encoder.encode(
              "\n\nSomething went wrong on my side. Please try again, or use the contact page.",
            ),
          );
        } else {
          console.error("[ask] stream failed", error);
          controller.enqueue(
            encoder.encode(
              "\n\nSomething went wrong on my side. Please try again, or use the contact page.",
            ),
          );
        }
      } finally {
        controller.close();
      }
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
