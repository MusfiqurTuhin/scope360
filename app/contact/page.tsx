import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/ui";
import { engagementModels, methodology } from "@/lib/content";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a Scope360 engagement — discovery, delivery programme, managed retainer, or strategic partnership.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you need. We will tell you how."
        lede="What are you trying to do, what is in the way, and when does it need to be finished? One conversation is usually enough to tell whether we are the right people."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-2xl border border-white/10 bg-ink-900/50 p-8 md:p-10">
            <h2 className="font-display text-2xl text-ink-100">
              Tell us about it
            </h2>
            <p className="mt-2 text-sm text-ink-200/60">
              We read every message and reply within one working day.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <aside className="grid gap-8 self-start">
            <div className="rounded-2xl border border-white/10 bg-ink-900/50 p-8">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-brand">
                How we work together
              </h2>
              <ul className="mt-6 space-y-5">
                {engagementModels.map((model) => (
                  <li key={model.title}>
                    <p className="text-sm font-semibold text-white">
                      {model.title}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-200/60">
                      {model.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-ink-900/50 p-8">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-brand">
                What happens next
              </h2>
              <ol className="mt-6 space-y-4">
                {methodology.map((stage) => (
                  <li key={stage.step} className="flex gap-4">
                    <span className="text-xs font-semibold text-white/25">
                      {stage.step}
                    </span>
                    <span className="text-sm text-ink-200/70">
                      {stage.title}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
