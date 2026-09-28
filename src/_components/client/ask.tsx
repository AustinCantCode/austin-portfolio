"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@lib/utils";
import { Icon } from "../icon";
import { track } from "./analytics";
import { EASE, useReducedMotionPref } from "./motion";

type Msg = { role: "user" | "assistant"; content: string; error?: boolean };

/** Links, bold and bullet lists: all the formatting answers use. */
function Inline({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)\s]+\)|\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) => {
        const link = p.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
        if (link) {
          const [, label, href] = link;
          return href.startsWith("/") ? (
            <Link
              key={i}
              href={href}
              className="underline underline-offset-[3px]"
            >
              {label}
            </Link>
          ) : /^(https?:|mailto:)/.test(href) ? (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-[3px]"
            >
              {label}
            </a>
          ) : (
            <Fragment key={i}>{label}</Fragment>
          );
        }
        const bold = p.match(/^\*\*([^*]+)\*\*$/);
        if (bold) return <strong key={i}>{bold[1]}</strong>;
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}

function Answer({ text }: { text: string }) {
  const blocks = text.trim().split(/\n{2,}/);
  return (
    <div className="flex flex-col gap-2.5">
      {blocks.map((b, i) => {
        const rows = b.split("\n");
        if (rows.every((r) => /^\s*[-*•]\s+/.test(r)))
          return (
            <ul key={i} className="m-0 flex list-disc flex-col gap-1 pl-5">
              {rows.map((r, k) => (
                <li key={k}>
                  <Inline text={r.replace(/^\s*[-*•]\s+/, "")} />
                </li>
              ))}
            </ul>
          );
        return (
          <p key={i}>
            <Inline text={b} />
          </p>
        );
      })}
    </div>
  );
}

const pickThree = (pool: string[]) =>
  [...pool].sort(() => Math.random() - 0.5).slice(0, 3);

/**
 * "Ask about Austin": a small chat panel that answers questions from the
 * site's own content (api/ask). Only mounted when the API key is set.
 */
export function Ask({
  button,
  greeting,
  prompts,
}: {
  button: string;
  greeting: string;
  prompts: string[];
}) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [suggested, setSuggested] = useState<string[]>([]);
  const reduced = useReducedMotionPref();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Shuffled on the client only, so server and browser render the same.
  useEffect(() => setSuggested(pickThree(prompts)), [prompts]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTo({ top: log.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const close = () => {
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  async function ask(question: string) {
    const q = question.trim();
    if (!q || busy) return;
    const history: Msg[] = [
      ...messages.filter((m) => !m.error),
      { role: "user", content: q },
    ];
    setMessages([
      ...messages,
      { role: "user", content: q },
      { role: "assistant", content: "" },
    ]);
    setInput("");
    setBusy(true);
    track("ask_question", { turn: history.length });
    const update = (content: string, error = false) =>
      setMessages((m) => [
        ...m.slice(0, -1),
        { role: "assistant", content, error },
      ]);
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map(({ role, content }) => ({ role, content })),
        }),
      });
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        update(data.error || "Something went wrong. Please try again.", true);
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let text = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        update(text);
      }
      if (!text.trim())
        update("Sorry, I couldn't answer that. Try asking another way.", true);
    } catch {
      update(
        "I couldn't reach the server. Check your connection and try again.",
        true,
      );
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
    if (e.key === "Tab" && panelRef.current) {
      const f = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  const panelMotion = useMemo(
    () =>
      reduced
        ? {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
          }
        : {
            initial: { opacity: 0, y: 24, scale: 0.98 },
            animate: { opacity: 1, y: 0, scale: 1 },
            exit: {
              opacity: 0,
              y: 16,
              scale: 0.98,
              transition: { duration: 0.16 },
            },
            transition: {
              type: "spring" as const,
              stiffness: 380,
              damping: 32,
            },
          },
    [reduced],
  );

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            key="ask-trigger"
            ref={triggerRef}
            type="button"
            data-intro-hide=""
            onClick={() => {
              setOpen(true);
              track("ask_open");
            }}
            aria-haspopup="dialog"
            aria-label={button}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8, transition: { duration: 0.12 } }}
            transition={{ duration: 0.4, ease: EASE, delay: reduced ? 0 : 0.3 }}
            className="press fixed right-[max(16px,env(safe-area-inset-right))] bottom-[calc(64px+env(safe-area-inset-bottom)+14px)] z-[58] inline-flex h-12 items-center gap-2 rounded-full border border-hairline bg-menu px-4 text-[15px] font-medium text-fg shadow-[var(--shadow-menu)] transition-colors hover:bg-pill lg:bottom-6 lg:px-5"
          >
            <Icon name="sparkles" size={18} className="text-accent-text" />
            <span className="hidden sm:inline">{button}</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            key="ask-panel"
            ref={panelRef}
            role="dialog"
            aria-modal="false"
            aria-labelledby="ask-title"
            onKeyDown={onKeyDown}
            {...panelMotion}
            className="fixed inset-x-0 bottom-[calc(64px+env(safe-area-inset-bottom))] z-[63] flex max-h-[min(78vh,640px)] flex-col overflow-hidden rounded-t-[24px] border border-hairline bg-menu text-fg shadow-[var(--shadow-menu)] lg:inset-x-auto lg:right-6 lg:bottom-6 lg:w-[400px] lg:rounded-[24px]"
          >
            <div className="flex items-center justify-between gap-3 border-b border-hairline py-3.5 pr-3 pl-5">
              <h2
                id="ask-title"
                className="font-display flex items-center gap-2 text-[22px] leading-none font-bold"
              >
                <Icon name="sparkles" size={18} className="text-accent-text" />
                {button}
              </h2>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setMessages([]);
                      setSuggested(pickThree(prompts));
                      inputRef.current?.focus();
                    }}
                    disabled={busy}
                    className="h-9 rounded-full px-3 text-[13px] font-medium text-fg-2 transition-colors hover:bg-pill hover:text-fg disabled:opacity-50"
                  >
                    Start over
                  </button>
                )}
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="grid size-9 place-items-center rounded-full text-fg transition-colors hover:bg-pill"
                >
                  <Icon name="x" size={18} />
                </button>
              </div>
            </div>

            <div
              ref={logRef}
              role="log"
              aria-live="polite"
              aria-busy={busy}
              className="flex min-h-[160px] flex-1 flex-col gap-4 overflow-y-auto overscroll-contain px-5 py-5 text-[15px] leading-[1.55]"
            >
              <p className="text-fg-2">{greeting}</p>
              {messages.length === 0 && suggested.length > 0 && (
                <div className="flex flex-col items-start gap-2">
                  <p className="text-[13px] text-fg-2">Try asking:</p>
                  {suggested.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => ask(s)}
                      className="rounded-full bg-pill px-3.5 py-2 text-left text-[14px] font-medium text-fg transition-colors hover:bg-well"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              {messages.map((m, i) =>
                m.role === "user" ? (
                  <p
                    key={i}
                    className="max-w-[85%] self-end rounded-[18px] rounded-br-[6px] bg-pill px-4 py-2.5 text-fg"
                  >
                    <span className="sr-only">You asked: </span>
                    {m.content}
                  </p>
                ) : (
                  <div
                    key={i}
                    className={cn(
                      "max-w-full",
                      m.error ? "text-fg-2" : "text-fg",
                    )}
                  >
                    {m.content ? (
                      <Answer text={m.content} />
                    ) : (
                      <span className="inline-flex gap-1" aria-label="Thinking">
                        {[0, 1, 2].map((d) => (
                          <motion.span
                            key={d}
                            className="size-1.5 rounded-full bg-fg-2"
                            animate={
                              reduced ? undefined : { opacity: [0.3, 1, 0.3] }
                            }
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              delay: d * 0.15,
                            }}
                          />
                        ))}
                      </span>
                    )}
                  </div>
                ),
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
              className="flex flex-col gap-2 border-t border-hairline px-4 pt-3 pb-3"
            >
              <div className="flex items-end gap-2">
                <label htmlFor="ask-input" className="sr-only">
                  Your question
                </label>
                <textarea
                  id="ask-input"
                  ref={inputRef}
                  rows={1}
                  maxLength={500}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      ask(input);
                    }
                  }}
                  placeholder="Ask a question"
                  className="max-h-[120px] min-h-[44px] flex-1 resize-none rounded-[14px] border-0 bg-tile px-4 py-[11px] text-[15px] leading-[1.45] text-fg placeholder:text-fg-2"
                />
                <button
                  type="submit"
                  disabled={busy || !input.trim()}
                  aria-label="Send question"
                  className="press grid size-11 flex-none place-items-center rounded-full bg-accent text-on-accent transition-colors hover:bg-accent-hover disabled:opacity-40"
                >
                  <Icon name="arrow-right" size={18} className="-rotate-90" />
                </button>
              </div>
              <p className="px-1 text-[12px] leading-[1.4] text-fg-2">
                Answers are written by AI from this site&apos;s content and can
                be wrong. For anything important,{" "}
                <Link
                  href="/contact"
                  onClick={close}
                  className="underline underline-offset-2"
                >
                  contact Austin
                </Link>
                .
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
