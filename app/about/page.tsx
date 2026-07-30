import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ButtonLink, Card, Section, SectionHeading } from "@/components/ui";
import { company, differentiators, pillars } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Scope360 is a premier, full-service execution partner delivering end-to-end physical, digital, and operational solutions.",
};

const capabilities = [
  {
    title: "Technical leadership",
    body: "Architecture, infrastructure, database planning, code review, and deployment discipline.",
  },
  {
    title: "Programme & delivery",
    body: "Project organization, milestone control, vendor coordination, and risk management.",
  },
  {
    title: "Field operations",
    body: "Mobilization, on-site supervision, permitting, safety frameworks, and logistics.",
  },
  {
    title: "Brand & interface",
    body: "UI/UX planning, identity systems, motion design, and visual consistency across products.",
  },
  {
    title: "Client operations",
    body: "Documentation, reporting, communication cadence, and stakeholder management.",
  },
  {
    title: "Quality assurance",
    body: "Testing, data accuracy, performance validation, and edge-case verification before handover.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A single, authoritative partner for initiatives that cannot fail."
        lede={company.about[1]}
      />

      <Section className="border-b border-white/5">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-ink-900/60 p-9">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-brand">
              Our Vision
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/85">
              {company.vision}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-ink-900/60 p-9">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-brand">
              Our Mission
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/85">
              {company.mission}
            </p>
          </div>
        </div>

        <p className="mt-12 max-w-3xl text-lg leading-relaxed text-ink-200/72">
          {company.about[0]}
        </p>
      </Section>

      <Section className="border-b border-white/5 bg-ink-900/40">
        <SectionHeading
          eyebrow="Operating strength"
          title="Structured by capability, not by job title"
          lede="A cross-functional bench that covers engineering, field operations, design, and client operations under one delivery structure."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((item) => (
            <Card key={item.title}>
              <h3 className="text-base font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-200/70">
                {item.body}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="border-b border-white/5">
        <SectionHeading eyebrow="What sets us apart" title="Four commitments" />
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
          {differentiators.map((item) => (
            <div key={item.title} className="bg-ink-950 p-8">
              <h3 className="text-base font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-200/65">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="flex flex-col items-start gap-8 rounded-2xl border border-white/10 bg-ink-900/60 p-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              {company.tagline}
            </h2>
            <p className="mt-3 max-w-xl text-sm text-ink-200/65">
              {pillars.length} integrated pillars. One contract. One accountable
              partner.
            </p>
          </div>
          <ButtonLink href="/contact">Talk to us</ButtonLink>
        </div>
      </Section>
    </>
  );
}
