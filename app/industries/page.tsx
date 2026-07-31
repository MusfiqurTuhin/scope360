import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ButtonLink, Card, Section, SectionHeading } from "@/components/ui";
import { engagements, pillars } from "@/lib/content";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "The kind of work Scope360 takes on for government, for large companies, and for venues.",
};

const applications = [
  {
    title: "Citywide campaigns & exhibitions",
    body: "Getting people and materials to several sites, permits, custom building, and supervision on the ground — all to one plan.",
  },
  {
    title: "Office fit-outs & facility upgrades",
    body: "Construction, sound and lighting, and handing the space back in stages so you can keep working.",
  },
  {
    title: "Hybrid & global conferences",
    body: "Planning the space, sign-up pages, and live numbers covering people in the room and people watching online.",
  },
  {
    title: "Ticketing & entry",
    body: "Ticketing joined up with fingerprint readers and tap cards, installed and supported by us.",
  },
  {
    title: "Live progress screens",
    body: "Your information kept safely in one place, with clear screens showing how the work is going from day one.",
  },
  {
    title: "Managed facility operations",
    body: "Vehicles, energy use, security and waste, with agreed response times.",
  },
];

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="For work where getting it wrong is expensive."
        lede="Government programmes, corporate sites, and large events. Different worlds, same need — somebody who will actually get it done."
      />

      <Section className="border-b border-white/5">
        <div className="grid gap-6 md:grid-cols-3">
          {engagements.map((item) => (
            <Card key={item.sector} className="flex flex-col">
              <h2 className="text-xl font-semibold text-white">{item.sector}</h2>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-200/70">
                {item.body}
              </p>
              <ul className="mt-7 flex flex-wrap gap-2 border-t border-white/8 pt-6">
                {item.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-white/12 px-3 py-1 text-xs text-ink-200/60"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="border-b border-white/5 bg-ink-900/40">
        <SectionHeading
          eyebrow="Applications"
          title="What we usually get asked to do"
          layout="split"
        />
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/8 md:grid-cols-2 lg:grid-cols-3">
          {applications.map((item) => (
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
              Every engagement draws on all three pillars.
            </h2>
            <p className="mt-3 max-w-xl text-sm text-ink-200/65">
              {pillars.map((p) => p.name.replace(" 360°", "")).join(" · ")}
            </p>
          </div>
          <ButtonLink href="/capabilities" variant="ghost">
            See capabilities
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
