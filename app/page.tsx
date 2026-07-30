import Link from "next/link";
import {
  ButtonLink,
  Card,
  Eyebrow,
  Section,
  SectionHeading,
  Stat,
} from "@/components/ui";
import {
  company,
  differentiators,
  engagements,
  governance,
  methodology,
  pillars,
} from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PillarsSection />
      <DifferentiatorsSection />
      <MethodSection />
      <EngagementsSection />
      <GovernanceSection />
      <CtaSection />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-56 h-[46rem] w-[46rem] rounded-full bg-radial from-amber-brand/18 via-amber-brand/4 to-transparent blur-2xl"
      />
      <div aria-hidden className="grain pointer-events-none absolute inset-0 opacity-40" />

      <div className="container-page relative py-24 md:py-36">
        <div className="animate-rise max-w-4xl">
          <Eyebrow>{company.tagline}</Eyebrow>
          <h1 className="mt-8 text-(length:--text-display) font-semibold leading-[0.95] tracking-tight text-white text-balance">
            One partner for the build,
            <br className="hidden sm:block" /> the platform, and{" "}
            <span className="text-amber-brand">everything after.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-200/75 md:text-xl">
            Scope360 orchestrates complex initiatives from initial concept to
            long-term operational viability — bridging rigorous field
            experience, robust supply chains, and advanced technology.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact">Start a project</ButtonLink>
            <ButtonLink href="/capabilities" variant="ghost">
              Explore capabilities
            </ButtonLink>
          </div>
        </div>

        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <Stat value="360°" label="Physical, digital, and operational scope under one contract" />
          <Stat value="03" label="Integrated delivery pillars, not disconnected vendors" />
          <Stat value="24/7" label="Operational monitoring and dedicated helpdesk support" />
          <Stat value="M&E" label="Analytics frameworks embedded in every engagement" />
        </div>
      </div>
    </section>
  );
}

function PillarsSection() {
  return (
    <Section id="pillars" className="border-t border-white/5">
      <SectionHeading
        eyebrow="Core capabilities"
        title="The three 360° pillars"
        lede="Together they form a complete delivery architecture — capable of rapid mobilization and long-horizon enterprise programs alike."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {pillars.map((pillar) => (
          <Card key={pillar.slug} className="flex flex-col">
            <span className="text-xs font-semibold tracking-[0.24em] text-amber-brand">
              {pillar.index}
            </span>
            <h3 className="mt-5 text-xl font-semibold leading-snug text-white">
              {pillar.name}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-ink-200/70">
              {pillar.lede}
            </p>
            <ul className="mt-7 flex-1 space-y-3 border-t border-white/8 pt-6">
              {pillar.services.map((service) => (
                <li
                  key={service.title}
                  className="flex gap-3 text-sm text-ink-200/70"
                >
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-brand" />
                  <span className="font-medium text-white/90">
                    {service.title}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href={`/capabilities#${pillar.slug}`}
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-amber-brand transition hover:gap-3"
            >
              View detail <span aria-hidden>&rarr;</span>
            </Link>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function DifferentiatorsSection() {
  return (
    <Section className="border-t border-white/5 bg-ink-900/40">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          eyebrow="Why Scope360"
          title="Accountability that does not fragment at the handover."
          lede="Most programs fail in the seams between vendors. We remove the seams."
        />
        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/8 sm:grid-cols-2">
          {differentiators.map((item) => (
            <div key={item.title} className="bg-ink-950 p-7">
              <h3 className="text-base font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-200/65">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function MethodSection() {
  return (
    <Section className="border-t border-white/5">
      <SectionHeading
        eyebrow="Methodology"
        title="A repeatable delivery system"
        lede="Every engagement runs the same four-stage model, so scope, risk, and reporting stay legible from day one."
      />
      <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/8 md:grid-cols-2 lg:grid-cols-4">
        {methodology.map((stage) => (
          <li key={stage.step} className="bg-ink-950 p-8">
            <span className="text-4xl font-semibold tracking-tight text-white/12">
              {stage.step}
            </span>
            <h3 className="mt-5 text-lg font-semibold text-white">
              {stage.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-200/65">
              {stage.body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function EngagementsSection() {
  return (
    <Section className="border-t border-white/5 bg-ink-900/40">
      <SectionHeading
        eyebrow="Representative engagements"
        title="Where the model is applied"
      />
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {engagements.map((item) => (
          <Card key={item.sector}>
            <h3 className="text-lg font-semibold text-white">{item.sector}</h3>
            <p className="mt-4 text-sm leading-relaxed text-ink-200/70">
              {item.body}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
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
  );
}

function GovernanceSection() {
  return (
    <Section className="border-t border-white/5">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <SectionHeading
          eyebrow="Governance"
          title={governance.headline}
          lede={governance.body}
        />
        <ul className="grid gap-3">
          {governance.pillars.map((item) => (
            <li
              key={item}
              className="flex items-center gap-4 rounded-xl border border-white/10 bg-ink-900/60 px-6 py-5 text-sm text-white/85"
            >
              <span
                aria-hidden
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-amber-brand/50 text-[10px] text-amber-brand"
              >
                &#10003;
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function CtaSection() {
  return (
    <section className="relative overflow-hidden border-t border-white/5">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-96 bg-radial from-amber-brand/12 to-transparent blur-2xl"
      />
      <div className="container-page relative py-24 text-center md:py-32">
        <h2 className="mx-auto max-w-3xl text-(length:--text-h1) font-semibold leading-[1.05] tracking-tight text-white text-balance">
          Ready to execute?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-ink-200/70">
          Bring us the scope, the constraints, and the deadline. We will come
          back with the architecture.
        </p>
        <div className="mt-10 flex justify-center">
          <ButtonLink href="/contact">Talk to Scope360</ButtonLink>
        </div>
      </div>
    </section>
  );
}
