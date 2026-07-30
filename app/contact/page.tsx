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
        title="Bring us the scope. We will bring the architecture."
        lede="Tell us the objective, the constraints, and the deadline. A discovery conversation is the fastest way to find out whether we are the right partner."
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-2xl border border-white/10 bg-ink-900/50 p-8 md:p-10">
            <h2 className="text-xl font-semibold tracking-tight text-white">
              Project enquiry
            </h2>
            <p className="mt-2 text-sm text-ink-200/60">
              All fields marked are required. We respond within one business day.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <aside className="grid gap-8 self-start">
            <div className="rounded-2xl border border-white/10 bg-ink-900/50 p-8">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-brand">
                Engagement models
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
