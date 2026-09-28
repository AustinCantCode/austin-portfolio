"use client";

import { useState } from "react";
import { site } from "@data/site";
import { track } from "@components/client/analytics";

const field =
  "rounded-[14px] border-0 bg-tile text-[17px] font-normal text-fg placeholder:text-fg-2";

/** Opens the visitor's email app with the message filled in. */
export function ContactForm() {
  const [status, setStatus] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const name = String(f.get("name") ?? "");
        const email = String(f.get("email") ?? "");
        const message = String(f.get("message") ?? "");
        const body = encodeURIComponent(`${message}\n\n${name} (${email})`);
        track("contact_click", { channel: "form" });
        window.location.href = `${site.contact.mailto}?subject=${encodeURIComponent(`Hello from ${name}`)}&body=${body}`;
        setStatus("Opening your email app…");
      }}
      className="flex min-w-0 flex-[1.5_1_420px] flex-col gap-4"
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-4">
        <label className="flex flex-col gap-1.5 text-[14px] font-medium">
          Name
          <input
            name="name"
            required
            autoComplete="name"
            placeholder="Your name"
            className={`${field} h-[52px] px-[18px]`}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-[14px] font-medium">
          Email
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={`${field} h-[52px] px-[18px]`}
          />
        </label>
      </div>
      <label className="flex flex-col gap-1.5 text-[14px] font-medium">
        Message
        <textarea
          name="message"
          required
          rows={6}
          placeholder="Tell me about the role or project"
          className={`${field} resize-y px-[18px] py-4 leading-[1.5]`}
        />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="inline-flex h-12 items-center gap-2 rounded-full border-0 bg-accent px-7 text-[17px] font-medium text-white transition-[background-color,transform] duration-200 hover:bg-accent-hover active:scale-[.97]"
        >
          Send message
        </button>
        <p aria-live="polite" className="text-[14px] text-fg-2">
          {status}
        </p>
      </div>
    </form>
  );
}
