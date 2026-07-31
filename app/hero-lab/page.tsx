import type { Metadata } from "next";
import {
  HeroCornerRadar,
  HeroFingerprint,
  HeroPillars,
  HeroScanline,
} from "@/components/hero-variants";
import { HeroScope } from "@/components/hero-scope";

export const metadata: Metadata = {
  title: "Hero options",
  description: "Side-by-side comparison of candidate hero treatments.",
  robots: { index: false, follow: false },
};

const OPTIONS = [
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
