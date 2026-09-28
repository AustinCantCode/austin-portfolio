"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useActionState, useEffect, useRef, useState } from "react";
import { cn } from "@lib/utils";
import { site } from "@data/site";
import { track } from "@components/client/analytics";
import { EASE, useReducedMotionPref } from "@components/client/motion";
import { Icon } from "@components/icon";
import { sendMessage, type SendState } from "./actions";
import {
  LIMITS,
  validate,
  validateField,
  type Errors,
  type Field,
  type Values,
} from "./validate";

const field =
  "rounded-[14px] border-0 bg-tile text-[17px] font-normal text-fg placeholder:text-fg-2 aria-[invalid=true]:shadow-[inset_0_0_0_2px_var(--danger)]";

const LABELS: Record<Field, string> = {
  name: "Name",
  email: "Email",
  message: "Message",
};
const EMPTY: Values = { name: "", email: "", message: "" };

/** Sends a message to Austin's inbox (see actions.ts). */
export function ContactForm() {
  const [state, action, pending] = useActionState<SendState, FormData>(
    sendMessage,
    { status: "idle" },
  );
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [summary, setSummary] = useState(false);
  const [started, setStarted] = useState(0);
  const [sentName, setSentName] = useState<string | null>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionPref();

  // When the form appeared; the server ignores posts faster than a person.
  useEffect(() => setStarted(Date.now()), [sentName]);

  useEffect(() => {
    if (state.status === "sent") {
      setSentName(state.name);
      setValues(EMPTY);
      setErrors({});
      track("contact_sent", { channel: "form" });
    }
    if (state.status === "invalid") {
      setErrors(state.errors);
      setSummary(true);
    }
    if (state.status === "failed")
      track("contact_failed", { reason: state.reason });
  }, [state]);

  useEffect(() => {
    if (summary) summaryRef.current?.focus();
  }, [summary]);

  const set = (f: Field, v: string) => {
    setValues((s) => ({ ...s, [f]: v }));
    // Once a field has an error, clear it as soon as it's fixed.
    if (errors[f]) setErrors((e) => ({ ...e, [f]: validateField(f, v) }));
  };

  const failed = state.status === "failed" && !pending;
  const mailto = `${site.contact.mailto}?subject=${encodeURIComponent(
    `Hello from ${values.name || "your site"}`,
  )}&body=${encodeURIComponent(values.message)}`;
  const listed = (Object.keys(errors) as Field[]).filter((f) => errors[f]);

  const fade = reduced
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8, transition: { duration: 0.18 } },
        transition: { duration: 0.45, ease: EASE },
      };

  return (
    <div className="min-w-0 flex-[1.5_1_420px]">
      <AnimatePresence mode="wait" initial={false}>
        {sentName !== null ? (
          <motion.div
            key="sent"
            {...fade}
            role="status"
            className="flex flex-col items-start gap-4 rounded-[24px] bg-tile p-[clamp(24px,3vw,36px)]"
          >
            <span className="grid size-12 place-items-center rounded-full bg-accent text-on-accent">
              <Icon name="check" size={22} />
            </span>
            <h3 className="text-[clamp(26px,2.8vw,32px)] leading-[1.1] font-bold">
              Message sent.
            </h3>
            <p className="max-w-[440px] text-[17px] leading-[1.55] text-fg-2">
              Thanks{sentName ? `, ${sentName}` : ""}. It&apos;s in my inbox,
              and I usually reply within a day.
            </p>
            <button
              type="button"
              onClick={() => setSentName(null)}
              className="press mt-1 inline-flex h-11 items-center rounded-full bg-pill px-5 text-[15px] font-medium text-fg transition-colors hover:bg-well"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            {...fade}
            action={action}
            noValidate
            aria-busy={pending}
            onSubmit={(e) => {
              const found = validate(values);
              if (Object.keys(found).length) {
                e.preventDefault();
                setErrors(found);
                setSummary(false);
                // Re-trigger focus even if the summary was already shown.
                requestAnimationFrame(() => setSummary(true));
                return;
              }
              setSummary(false);
              track("contact_click", { channel: "form" });
            }}
            className="flex flex-col gap-4"
          >
            {summary && listed.length > 0 && (
              <div
                ref={summaryRef}
                role="alert"
                tabIndex={-1}
                aria-labelledby="form-errors"
                className="rounded-[16px] bg-tile p-4 shadow-[inset_0_0_0_2px_var(--danger)] outline-none"
              >
                <p id="form-errors" className="text-[15px] font-semibold">
                  Check {listed.length === 1 ? "this field" : "these fields"}{" "}
                  before sending:
                </p>
                <ul className="mt-1.5 flex list-none flex-col gap-1 p-0">
                  {listed.map((f) => (
                    <li key={f}>
                      <a href={`#contact-${f}`} className="text-[15px]">
                        {errors[f]}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Hidden from people; bots that fill it in are ignored. */}
            <div aria-hidden="true" className="absolute left-[-9999px]">
              <label>
                Company
                <input name="company" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <input type="hidden" name="started" value={started} />

            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-4">
              {(["name", "email"] as const).map((f) => (
                <Input
                  key={f}
                  f={f}
                  value={values[f]}
                  error={errors[f]}
                  onChange={(v) => set(f, v)}
                  onBlur={() =>
                    values[f] &&
                    setErrors((e) => ({
                      ...e,
                      [f]: validateField(f, values[f]),
                    }))
                  }
                />
              ))}
            </div>
            <Input
              f="message"
              value={values.message}
              error={errors.message}
              onChange={(v) => set("message", v)}
              onBlur={() =>
                values.message &&
                setErrors((e) => ({
                  ...e,
                  message: validateField("message", values.message),
                }))
              }
            />

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={pending}
                className="press inline-flex h-12 items-center gap-2 rounded-full border-0 bg-accent px-7 text-[17px] font-medium text-on-accent transition-[background-color,opacity] duration-200 hover:bg-accent-hover disabled:cursor-progress disabled:opacity-80"
              >
                {pending && (
                  <motion.span
                    aria-hidden="true"
                    className="size-4 rounded-full border-2 border-current border-t-transparent"
                    animate={reduced ? undefined : { rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.8,
                      ease: "linear",
                    }}
                  />
                )}
                {pending ? "Sending…" : "Send message"}
              </button>
              <p aria-live="polite" className="text-[14px] text-fg-2">
                {pending ? "Sending your message…" : ""}
              </p>
            </div>

            {failed && (
              <div
                role="alert"
                className="rounded-[16px] bg-tile p-4 text-[15px] leading-[1.5] shadow-[inset_0_0_0_2px_var(--danger)]"
              >
                <p className="font-semibold">
                  {state.reason === "limit"
                    ? "That's a few messages in a row."
                    : "Your message wasn't sent."}
                </p>
                <p className="mt-1 text-fg-2">
                  {state.reason === "limit"
                    ? "Wait a few minutes before sending another, or email me directly: "
                    : "Nothing is lost: your text is still here. Try again, or email me directly: "}
                  <a href={mailto}>{site.contact.email}</a>
                </p>
              </div>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Input({
  f,
  value,
  error,
  onChange,
  onBlur,
}: {
  f: Field;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  onBlur: () => void;
}) {
  const id = `contact-${f}`;
  const common = {
    id,
    name: f,
    value,
    required: true,
    maxLength: LIMITS[f],
    "aria-invalid": !!error,
    "aria-describedby": error ? `${id}-error` : undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(e.target.value),
    onBlur,
  };
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[14px] font-medium">
        {LABELS[f]}
      </label>
      {f === "message" ? (
        <textarea
          {...common}
          rows={6}
          placeholder="Tell me about the role or project"
          className={cn(field, "resize-y px-[18px] py-4 leading-[1.5]")}
        />
      ) : (
        <input
          {...common}
          type={f === "email" ? "email" : "text"}
          autoComplete={f === "email" ? "email" : "name"}
          placeholder={f === "email" ? "you@company.com" : "Your name"}
          className={cn(field, "h-[52px] px-[18px]")}
        />
      )}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
            transition={{ duration: 0.2 }}
            className="text-[14px] text-danger"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
