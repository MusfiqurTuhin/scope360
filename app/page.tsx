import Link from "next/link";
import { Eyebrow, Section, SectionHeading } from "@/components/ui";
import {
  CursorSpotlight,
  MagneticButton,
  Marquee,
  SpotlightCard,
} from "@/components/effects";
import { CountUp, Reveal, ScrambleText, Stagger } from "@/components/motion";
import {
  company,
  differentiators,
  engagements,
  governance,
  methodology,
  pillars,
} from "@/lib/content";

const marqueeItems = [
  "Civil Works",
  "Experiential Events",
  "Field Mobilization",
  "Digital Ecosystems",
  "Advanced Analytics",
  "AI & Automation",
  "Strategic Procurement",
  "Asset Lifecycle",
  "Enterprise Support",
  "Facility Operations",
];

export default function HomePage() {
  return (
    <>
      <CursorSpotlight />
      <Hero />
      <Marquee items={marqueeItems} />
      <PillarsSection />
      <DifferentiatorsSection />
      <MethodSection />
      <EngagementsSection />
      <GovernanceSection />
      <CtaSection />
    </>
  );
}

const heroLines = [
  { text: "One partner", accent: false },
  { text: "for the build,", accent: false },
  { text: "the platform, and", accent: false },
  { text: "everything after.", accent: true },
];

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="animate-orb-a pointer-events-none absolute -right-40 -top-56 h-[46rem] w-[46rem] rounded-full bg-radial from-amber-brand/18 via-amber-brand/4 to-transparent blur-2xl"
      />
      <div aria-hidden className="grain pointer-events-none absolute inset-0 opacity-40" />

      <div className="container-page relative py-24 md:py-36">
        <div className="max-w-4xl">
          <div className="animate-rise">
            <Eyebrow>
              <ScrambleText text={company.tagline} />
            </Eyebrow>
          </div>

          <h1 className="mt-8 text-(length:--text-display) font-semibold leading-[0.95] tracking-tight text-white text-balance">
            {heroLines.map((line, index) => (
              <span key={line.text} className="line-mask">
                <span
                  className={`animate-line block ${line.accent ? "text-sheen" : ""}`}
                  style={{ animationDelay: `${160 + index * 110}ms` }}
                >
                  {line.text}
                </span>
              </span>
            ))}
          </h1>

          <Reveal delay={620}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-200/75 md:text-xl">
              Scope360 orchestrates complex initiatives from initial concept to
              long-term operational viability — bridging rigorous field
              experience, robust supply chains, and advanced technology.
            </p>
          </Reveal>

          <Reveal delay={740}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <MagneticButton href="/contact">Start a project</MagneticButton>
              <MagneticButton href="/capabilities" variant="ghost">
                Explore capabilities
              </MagneticButton>
            </div>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <Stagger start={860} step={110}>
            {[
              { value: <>360&deg;</>, label: "Physical, digital, and operational scope under one contract" },
              { value: <CountUp to={3} prefix="0" />, label: "Integrated delivery pillars, not disconnected vendors" },
              { value: <>24/7</>, label: "Operational monitoring and dedicated helpdesk support" },
              { value: <>M&amp;E</>, label: "Analytics frameworks embedded in every engagement" },
            ].map((stat, i) => (
              <div key={i} className="border-l border-white/10 pl-5">
                <p className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm leading-snug text-ink-200/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

function PillarsSection() {
  return (
    <Section id="pillars">
      <Reveal>
        <SectionHeading
          eyebrow="Core capabilities"
          title="The three 360° pillars"
          lede="Together they form a complete delivery architecture — capable of rapid mobilization and long-horizon enterprise programs alike."
        />
      </Reveal>

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        <Stagger step={130} variant="blur">
          {pillars.map((pillar) => (
            <SpotlightCard key={pillar.slug} className="flex h-full flex-col">
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
                    <span
                      aria-hidden
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-brand transition-transform duration-300 group-hover:scale-150"
                    />
                    <span className="font-medium text-white/90">
                      {service.title}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/capabilities#${pillar.slug}`}
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-amber-brand transition-[gap] duration-300 hover:gap-3.5"
              >
                View detail <span aria-hidden>&rarr;</span>
              </Link>
            </SpotlightCard>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}

function DifferentiatorsSection() {
  return (
    <Section className="border-t border-white/5 bg-ink-900/40">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal variant="left">
          <SectionHeading
            eyebrow="Why Scope360"
            title="Accountability that does not fragment at the handover."
            lede="Most programs fail in the seams between vendors. We remove the seams."
          />
        </Reveal>
        <Reveal variant="right" delay={140}>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/8 sm:grid-cols-2">
            {differentiators.map((item) => (
              <div
                key={item.title}
                className="group bg-ink-950 p-7 transition-colors duration-500 hover:bg-ink-900"
              >
                <h3 className="text-base font-semibold text-white transition-colors duration-300 group-hover:text-amber-brand">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-200/65">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function MethodSection() {
  return (
    <Section className="border-t border-white/5">
      <Reveal>
        <SectionHeading
          eyebrow="Methodology"
          title="A repeatable delivery system"
          lede="Every engagement runs the same four-stage model, so scope, risk, and reporting stay legible from day one."
        />
      </Reveal>
      <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/8 md:grid-cols-2 lg:grid-cols-4">
        {methodology.map((stage, index) => (
          <Reveal as="li" key={stage.step} delay={index * 120} variant="scale">
            <div className="group h-full bg-ink-950 p-8 transition-colors duration-500 hover:bg-ink-900">
              <span className="text-4xl font-semibold tracking-tight text-white/12 transition-colors duration-500 group-hover:text-amber-brand/45">
                {stage.step}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-white">
                {stage.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-200/65">
                {stage.body}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

function EngagementsSection() {
  return (
    <Section className="border-t border-white/5 bg-ink-900/40">
      <Reveal>
        <SectionHeading
          eyebrow="Representative engagements"
          title="Where the model is applied"
        />
      </Reveal>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        <Stagger step={130}>
          {engagements.map((item) => (
            <SpotlightCard key={item.sector} className="h-full">
              <h3 className="text-lg font-semibold text-white">{item.sector}</h3>
              <p className="mt-4 text-sm leading-relaxed text-ink-200/70">
                {item.body}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-white/12 px-3 py-1 text-xs text-ink-200/60 transition-colors duration-300 group-hover:border-amber-brand/30"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}

function GovernanceSection() {
  return (
    <Section className="border-t border-white/5">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal variant="left">
          <SectionHeading
            eyebrow="Governance"
            title={governance.headline}
            lede={governance.body}
          />
        </Reveal>
        <ul className="grid gap-3">
          <Stagger step={110} variant="right">
            {governance.pillars.map((item) => (
              <li
                key={item}
                className="group flex items-center gap-4 rounded-xl border border-white/10 bg-ink-900/60 px-6 py-5 text-sm text-white/85 transition-[border-color,transform] duration-400 hover:translate-x-1.5 hover:border-amber-brand/40"
              >
                <span
                  aria-hidden
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-amber-brand/50 text-[10px] text-amber-brand transition-colors duration-300 group-hover:bg-amber-brand group-hover:text-ink-950"
                >
                  &#10003;
                </span>
                {item}
              </li>
            ))}
          </Stagger>
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
        className="animate-orb-b pointer-events-none absolute inset-x-0 bottom-0 h-96 bg-radial from-amber-brand/12 to-transparent blur-2xl"
      />
      <div className="container-page relative py-24 text-center md:py-32">
        <Reveal variant="scale">
          <div className="relative mx-auto mb-10 h-14 w-14">
            <span
              aria-hidden
              className="animate-pulse-ring absolute inset-0 rounded-full border border-amber-brand/50"
            />
            <span
              aria-hidden
              className="animate-float absolute inset-0 flex items-center justify-center rounded-full border border-amber-brand/40 text-amber-brand"
            >
              360&deg;
            </span>
          </div>
          <h2 className="mx-auto max-w-3xl text-(length:--text-h1) font-semibold leading-[1.05] tracking-tight text-white text-balance">
            Ready to execute?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-ink-200/70">
            Bring us the scope, the constraints, and the deadline. We will come
            back with the architecture.
          </p>
          <div className="mt-10 flex justify-center">
            <MagneticButton href="/contact">Talk to Scope360</MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
