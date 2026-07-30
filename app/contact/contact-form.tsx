"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { pillars } from "@/lib/content";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "w-full rounded-xl border border-white/12 bg-ink-900/70 px-4 py-3.5 text-sm text-white placeholder:text-ink-400 transition focus:border-amber-brand/60 focus:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result: { ok?: boolean; error?: string } = await response
        .json()
        .catch(() => ({}));

      if (!response.ok || !result.ok) {
        setStatus("error");
        setMessage(result.error ?? "We could not send that. Please try again.");
        return;
      }

      form.reset();
      setStatus("sent");
      setMessage("Got it. We will come back to you within a working day.");
    } catch {
      setStatus("error");
      setMessage("Network error. Please retry or email us directly.");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate={false} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-ink-200/60">
            Full name
          </span>
          <input
            name="name"
            required
            maxLength={120}
            autoComplete="name"
            className={fieldClass}
            placeholder="Your name"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-ink-200/60">
            Work email
          </span>
          <input
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            className={fieldClass}
            placeholder="you@company.com"
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-ink-200/60">
            Organization
          </span>
          <input
            name="organization"
            maxLength={160}
            autoComplete="organization"
            className={fieldClass}
            placeholder="Company or institution"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-ink-200/60">
            What is it about?
          </span>
          <select name="interest" className={fieldClass} defaultValue="">
            <option value="">Pick the closest one</option>
            {pillars.map((pillar) => (
              <option key={pillar.slug} value={pillar.name}>
                {pillar.name}
              </option>
            ))}
            <option value="Multiple pillars">Multiple pillars</option>
          </select>
        </label>
      </div>

      <label className="grid gap-2">
        <span className="text-xs font-medium uppercase tracking-[0.14em] text-ink-200/60">
          What do you need?
        </span>
        <textarea
          name="brief"
          required
          rows={6}
          maxLength={4000}
          className={`${fieldClass} resize-y`}
          placeholder="What you want to happen, anything standing in the way, and when it needs to be done."
        />
      </label>

      <div aria-hidden className="hidden">
        <label>
          Leave this field empty
          <input name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-brand px-7 py-3.5 text-sm font-semibold text-ink-950 transition hover:bg-amber-soft disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send it"}
          <span aria-hidden>&rarr;</span>
        </button>
        <p
          role="status"
          aria-live="polite"
          className={`text-sm ${status === "error" ? "text-red-400" : "text-amber-brand"}`}
        >
          {message}
        </p>
      </div>
    </form>
  );
}
