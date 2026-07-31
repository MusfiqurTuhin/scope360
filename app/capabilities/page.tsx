import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ButtonLink, Card, Section, SectionHeading } from "@/components/ui";
import { capabilityStack, pillars } from "@/lib/content";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Three sides to the work: what gets built on the ground, the digital side, and keeping it running afterwards — all under one partner.",
};

export default function CapabilitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title="Not a list of services. A team that finishes things."
        lede="We work in three parts. Any one of them stands on its own — together they cover a project from the ground up to the day it opens, and every day after."
      />

      {pillars.map((pillar, i) => (
        <Section
          key={pillar.slug}
          id={pillar.slug}
          className={`scroll-mt-24 border-b border-white/5 ${i % 2 === 1 ? "bg-ink-900/40" : ""}`}
        >
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <SectionHeading
                eyebrow={`Pillar ${pillar.index}`}
                title={pillar.name}
                lede={pillar.lede}
              />
              <p className="mt-8 rounded-xl border border-amber-brand/25 bg-amber-brand/6 px-6 py-5 text-sm leading-relaxed text-amber-soft">
                <span className="font-semibold text-amber-brand">Outcome —</span>{" "}
                {pillar.outcome}
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {pillar.services.map((service) => (
                <Card key={service.title}>
                  <h3 className="text-base font-semibold text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-200/70">
                    {service.body}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </Section>
      ))}

      <Section className="border-b border-white/5">
        <SectionHeading
          eyebrow="Delivery capability"
          title="What we can put on the ground"
          lede="The mix changes from job to job. What we are able to bring does not."
          layout="split"
        />
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/8 md:grid-cols-2 lg:grid-cols-4">
          {capabilityStack.map((group) => (
            <div key={group.group} className="bg-ink-950 p-8">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-amber-brand">
                {group.group}
              </h3>
              <ul className="mt-6 space-y-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm leading-relaxed text-ink-200/70"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="flex flex-col items-start gap-6 rounded-2xl border border-white/10 bg-ink-900/60 p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-3xl leading-tight text-ink-100">
              Not sure which pillar you need?
            </h2>
            <p className="mt-3 max-w-xl text-sm text-ink-200/65">
              Most projects start with a short piece of work to figure out what
              is actually needed — before you commit to anything.
            </p>
          </div>
          <ButtonLink href="/contact">Request discovery</ButtonLink>
        </div>
      </Section>
    </>
  );
}
