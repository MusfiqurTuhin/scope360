import type { Metadata } from "next";
import {
  HeroCornerRadar,
  HeroFingerprint,
  HeroPillars,
  HeroScanline,
} from "@/components/hero-variants";
import { HeroScope } from "@/components/hero-scope";
import { CapabilityOrbit } from "@/components/capability-orbit";
import { Eyebrow } from "@/components/ui";
import { MagneticButton } from "@/components/effects";
import { Reveal, ScrambleText } from "@/components/motion";
import { company } from "@/lib/content";

export const metadata: Metadata = {
  title: "Hero options",
  description: "Side-by-side comparison of candidate hero treatments.",
  robots: { index: false, follow: false },
};

function HeroCapabilityOrbit() {
  const lines = [
    { text: "One partner", accent: false },
    { text: "from concept", accent: false },
    { text: "to ground reality —", accent: false },
    { text: "and everything after.", accent: true },
  ];
  return (
    <section className="relative overflow-hidden">
      <div className="container-page relative z-10 py-[clamp(1.75rem,4.5vh,4.5rem)]">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div>
          <div className="animate-rise">
            <Eyebrow>
              <ScrambleText text={company.tagline} />
            </Eyebrow>
          </div>
          <h1 className="font-display mt-5 text-(length:--text-display) leading-[1.02] text-ink-100 text-balance">
            {lines.map((line, i) => (
              <span key={line.text} className="line-mask">
                <span
                  className={`animate-line block ${line.accent ? "text-sheen" : ""}`}
                  style={{ animationDelay: `${160 + i * 110}ms` }}
                >
                  {line.text}{" "}
                </span>
              </span>
            ))}
          </h1>
          <Reveal delay={620}>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-ink-200/75 sm:text-base md:text-lg">
              We take on big, complicated projects and see them all the way
              through — from the first conversation to the day-to-day running of
              it, long after everyone else has gone home.
            </p>
          </Reveal>
          <Reveal delay={740}>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <MagneticButton href="/contact">Start a project</MagneticButton>
              <MagneticButton href="/capabilities" variant="ghost">
                Explore capabilities
              </MagneticButton>
            </div>
          </Reveal>
        </div>
        <CapabilityOrbit />
        </div>
      </div>
    </section>
  );
}

const OPTIONS = [
  {
    id: "e",
    name: "E — Capability orbit (new)",
    note: "Every capability rides a 360° ring. It steps round one position every 2.4s, bringing each discipline to the reading point in turn.",
    render: <HeroCapabilityOrbit />,
  },
  {
    id: "a",
    name: "A — Corner radar sweep",
    note: "Quarter arcs expanding from the bottom-right, with an arm sweeping through 90°. Headline sits completely clear; figures return to a row.",
    render: <HeroCornerRadar />,
  },
  {
    id: "b",
    name: "B — Full-bleed fingerprint",
    note: "The logo's own ridged arcs blown up across the whole hero, rotating very slowly. No discrete object at all.",
    render: <HeroFingerprint />,
  },
  {
    id: "c",
    name: "C — Scanline reveal",
    note: "A survey line sweeping down over a faint measurement grid. The most restrained of the four.",
    render: <HeroScanline />,
  },
  {
    id: "d",
    name: "D — Three-pillar diagram",
    note: "Literal rather than abstract: the three pillars build upward as columns on load.",
    render: <HeroPillars />,
  },
  {
    id: "current",
    name: "Current — Scope dial (for reference)",
    note: "What is on the live site now, for comparison.",
    render: (
      <section className="relative overflow-hidden">
        <div className="container-page relative py-[clamp(1.75rem,4.5vh,4.5rem)]">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
            <div className="text-ink-200/60">
              <p className="text-sm">
                Headline and buttons omitted here — see the live site. The dial is
                shown alone so you can judge the visual on its own.
              </p>
            </div>
            <HeroScope />
          </div>
        </div>
      </section>
    ),
  },
];

export default function HeroLabPage() {
  return (
    <div className="pb-24">
      <div className="container-page py-10">
        <h1 className="font-display text-3xl text-ink-100">Hero options</h1>
        <p className="mt-3 max-w-2xl text-sm text-ink-200/65">
          Five treatments, same copy in each so only the visual differs. Scroll
          through and tell me a letter. Nothing here is on the live site.
        </p>
      </div>

      {OPTIONS.map((option) => (
        <section key={option.id} className="border-t border-white/10">
          <div className="container-page py-8">
            <h2 className="font-display text-2xl text-amber-brand">{option.name}</h2>
            <p className="mt-2 max-w-2xl text-sm text-ink-200/60">{option.note}</p>
          </div>
          <div className="border-y border-white/10 bg-ink-950">{option.render}</div>
        </section>
      ))}
    </div>
  );
}
