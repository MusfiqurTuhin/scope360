import Link from "next/link";
import { Eyebrow, Section, SectionHeading } from "@/components/ui";
import {
  CursorSpotlight,
  MagneticButton,
  SpotlightCard,
} from "@/components/effects";
import { Reveal, ScrambleText, Stagger } from "@/components/motion";
import { CapabilityOrbit } from "@/components/capability-orbit";
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
      <CursorSpotlight />
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

const heroLines = [
  { text: "One partner", accent: false },
  { text: "from concept", accent: false },
  { text: "to ground reality —", accent: false },
  { text: "and everything after.", accent: true },
];

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="animate-orb-a pointer-events-none absolute -right-40 -top-56 h-[46rem] w-[46rem] rounded-full bg-radial from-amber-brand/18 via-amber-brand/4 to-transparent blur-2xl"
      />
      <div aria-hidden className="grain pointer-events-none absolute inset-0 opacity-40" />

      <div className="container-page relative py-[clamp(1.75rem,4.5vh,4.5rem)]">
        <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div>
            <div className="animate-rise">
              <Eyebrow>
                <ScrambleText text={company.tagline} />
              </Eyebrow>
            </div>

            <h1 className="font-display mt-5 text-(length:--text-display) leading-[1.02] text-ink-100 text-balance">
              {heroLines.map((line, index) => (
                <span key={line.text} className="line-mask">
                  <span
                    className={`animate-line block ${line.accent ? "text-sheen" : ""}`}
                    style={{ animationDelay: `${160 + index * 110}ms` }}
                  >
                    {line.text}{" "}
                  </span>
                </span>
              ))}
            </h1>

            <Reveal delay={620}>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-200/75 sm:mt-6 sm:text-base md:text-lg">
                We take on big, complicated projects and see them all the way
                through — from the first conversation to the day-to-day running
                of it, long after everyone else has gone home.
              </p>
            </Reveal>

            <Reveal delay={740}>
              <div className="mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row">
                <MagneticButton href="/contact">Start a project</MagneticButton>
                <MagneticButton href="/capabilities" variant="ghost">
                  Explore capabilities
                </MagneticButton>
              </div>
            </Reveal>

            {/* Part of the hero, so it animates on load. A scroll reveal never
                fires here: the row sits exactly on the fold. */}
            <div className="animate-rise" style={{ animationDelay: "880ms" }}>
              <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-white/10 pt-5 sm:grid-cols-4">
                {[
                  { v: "360\u00b0", l: "Scope under one contract" },
                  { v: "03", l: "Integrated delivery pillars" },
                  { v: "24/7", l: "Monitoring and helpdesk" },
                  { v: "M&E", l: "Analytics in every project" },
                ].map((stat) => (
                  <div key={stat.v}>
                    <dt className="font-display text-xl text-amber-brand md:text-2xl">
                      {stat.v}
                    </dt>
                    <dd className="mt-1 text-xs leading-snug text-ink-200/60">
                      {stat.l}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <CapabilityOrbit />
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
          lede="Between them they cover the whole job — from the building work and the build-out, to the systems that run it and the people who look after it."
          layout="split"
        />
      </Reveal>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
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
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal variant="left">
          <SectionHeading
            eyebrow="Why Scope360"
            title="One team answerable for all of it."
            lede="Most projects come undone in the gaps between suppliers. We do not leave gaps."
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
          lede="Every project runs the same four steps, so you always know where things stand."
          layout="split"
        />
      </Reveal>
      <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/8 md:grid-cols-2 lg:grid-cols-4">
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
          title="The kind of work we take on"
        />
      </Reveal>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
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
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
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
      <div className="container-page relative py-16 text-center md:py-20">
        <Reveal variant="scale">
          <div className="relative mx-auto mb-7 h-12 w-12">
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
          <h2 className="font-display mx-auto max-w-3xl text-(length:--text-h1) leading-[1.08] text-ink-100 text-balance">
            Ready to execute?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-ink-200/70">
            Tell us what you need, what is in the way, and when it has to be
            done. We will come back with a plan.
          </p>
          <div className="mt-10 flex justify-center">
            <MagneticButton href="/contact">Talk to Scope360</MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
