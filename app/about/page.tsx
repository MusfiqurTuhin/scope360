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
    title: "Field operations",
    body: "Mobilization, on-site supervision, permitting, safety frameworks, and logistics.",
  },
  {
    title: "Programme & delivery",
    body: "Project organization, milestone control, vendor coordination, and risk management.",
  },
  {
    title: "Procurement & supply chain",
    body: "Vendor panels, framework contracts, freight coordination, and asset governance.",
  },
  {
    title: "Build & fabrication",
    body: "Civil works, custom fabrication, AV and lighting architecture, and spatial planning.",
  },
  {
    title: "Digital & data",
    body: "Registration platforms, operational dashboards, automation, and M&E reporting.",
  },
  {
    title: "Client operations & QA",
    body: "Documentation, reporting cadence, stakeholder management, and pre-handover verification.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="One partner for the jobs that cannot go wrong."
        lede={company.about[1]}
      />

      <Section className="border-b border-white/5">
        <div className="grid gap-10 lg:grid-cols-2">
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
          title="Built around what we can do, not job titles"
          lede="One team covering site work, building, buying, technology, and looking after the client — all under the same roof."
          layout="split"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
        <SectionHeading eyebrow="What sets us apart" title="What you can hold us to" />
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
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
        <div className="flex flex-col items-start gap-6 rounded-2xl border border-white/10 bg-ink-900/60 p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-3xl leading-tight text-ink-100">
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
