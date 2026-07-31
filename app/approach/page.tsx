import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ButtonLink, Card, Section, SectionHeading } from "@/components/ui";
import {
  differentiators,
  engagementModels,
  governance,
  methodology,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Approach",
  description:
    "Agree, Plan, Build, Keep it running — the four steps Scope360 follows on every job, the ways we work together, and how we handle permits and safety.",
};

export default function ApproachPage() {
  return (
    <>
      <PageHero
        eyebrow="Approach"
        title="Agree. Plan. Build. Keep it running."
        lede="The same four steps every time, so you always know what is happening, what it costs, and what is coming next."
      />

      <Section className="border-b border-white/5">
        <ol className="grid gap-6 lg:grid-cols-2">
          {methodology.map((stage) => (
            <li key={stage.step}>
              <Card className="h-full">
                <div className="flex items-start gap-6">
                  <span className="text-5xl font-semibold leading-none tracking-tight text-white/10">
                    {stage.step}
                  </span>
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      {stage.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-ink-200/70">
                      {stage.body}
                    </p>
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="border-b border-white/5 bg-ink-900/40">
        <SectionHeading
          eyebrow="How we work together"
          title="Four ways to work with us"
          lede="From a single piece of scoping work through to a team that stays with you for years."
          layout="split"
        />
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
          {engagementModels.map((model) => (
            <div key={model.title} className="bg-ink-950 p-8">
              <h3 className="text-base font-semibold text-white">
                {model.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-200/65">
                {model.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-b border-white/5">
        <SectionHeading
          eyebrow="Operating principles"
          title="What people come to us for"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {differentiators.map((item) => (
            <Card key={item.title}>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-200/70">
                {item.body}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <SectionHeading
            eyebrow="Governance & compliance"
            title="An uncompromising, compliance-first approach"
            lede={governance.body}
          />
          <div>
            <ul className="grid gap-3">
              {governance.pillars.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-white/10 bg-ink-900/60 px-6 py-5 text-sm text-white/85"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-ink-200/60">
              {governance.note}
            </p>
            <ButtonLink href="/contact" variant="ghost" className="mt-8">
              Request compliance pack
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
