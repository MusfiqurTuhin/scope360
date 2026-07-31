"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Eyebrow } from "@/components/ui";
import { MagneticButton } from "@/components/effects";
import { Reveal, ScrambleText } from "@/components/motion";
import { company } from "@/lib/content";

/**
 * Four candidate hero treatments, shown side by side for a design decision.
 * They share identical copy and structure so only the visual differs.
 */

const HERO_LINES = [
  { text: "One partner", accent: false },
  { text: "from concept", accent: false },
  { text: "to ground reality —", accent: false },
  { text: "and everything after.", accent: true },
];

const READINGS = [
  { value: "360°", label: "Physical, digital, and operational scope under one contract" },
  { value: "03", label: "Integrated delivery pillars, not disconnected vendors" },
  { value: "24/7", label: "Operational monitoring and dedicated helpdesk support" },
  { value: "M&E", label: "Analytics frameworks embedded in every engagement" },
];

function useReduced(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return reduced;
}

function HeroCopy() {
  return (
    <>
      <div className="animate-rise">
        <Eyebrow>
          <ScrambleText text={company.tagline} />
        </Eyebrow>
      </div>

      <h1 className="font-display mt-5 text-(length:--text-display) leading-[1.02] text-ink-100 text-balance">
        {HERO_LINES.map((line, index) => (
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
          We take on big, complicated projects and see them all the way through —
          from the first conversation to the day-to-day running of it, long after
          everyone else has gone home.
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
    </>
  );
}

/** Shared figures row, used by every variant so the visual is the only difference. */
function ReadingsRow() {
  return (
    <Reveal delay={880}>
      <dl className="mt-9 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-white/10 pt-6 sm:gap-x-10 lg:grid-cols-4">
        {READINGS.map((r) => (
          <div key={r.value}>
            <dt className="font-display text-2xl text-amber-brand md:text-3xl">{r.value}</dt>
            <dd className="mt-1 text-xs leading-snug text-ink-200/60">{r.label}</dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}

function Shell({ visual }: { visual: ReactNode }) {
  return (
    <section className="relative overflow-hidden">
      {visual}
      <div className="container-page relative z-10 py-[clamp(1.75rem,4.5vh,4.5rem)]">
        <div className="max-w-3xl">
          <HeroCopy />
        </div>
        <ReadingsRow />
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- A: corner radar */

export function HeroCornerRadar() {
  const rings = [340, 470, 600, 730, 860];
  return (
    <Shell
      visual={
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <svg
            className="absolute bottom-[-30%] right-[-14%] h-[150%] w-auto opacity-70"
            viewBox="0 0 900 900"
            fill="none"
          >
            <defs>
              <linearGradient id="cr-arc" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#f5b42a" stopOpacity="0.1" />
                <stop offset="55%" stopColor="#f5b42a" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#ffd47a" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            {rings.map((r, i) => (
              <circle
                key={r}
                cx="900"
                cy="900"
                r={r}
                stroke="url(#cr-arc)"
                strokeWidth={i % 2 === 0 ? 2 : 1.2}
                strokeDasharray={i % 2 === 0 ? undefined : "3 12"}
                className="animate-corner-breathe"
                style={{ animationDelay: `${i * 700}ms`, transformOrigin: "900px 900px" }}
              />
            ))}
            {/* Sweep arm pivoting from the corner. */}
            <g className="animate-corner-sweep" style={{ transformOrigin: "900px 900px" }}>
              <line x1="900" y1="900" x2="900" y2="20" stroke="#f5b42a" strokeOpacity="0.5" strokeWidth="1.5" />
              <circle cx="900" cy="120" r="5" fill="#f5b42a" />
            </g>
          </svg>
        </div>
      }
    />
  );
}

/* ------------------------------------------------------- B: full-bleed fingerprint */

export function HeroFingerprint() {
  const arcs = Array.from({ length: 16 }, (_, i) => 90 + i * 46);
  return (
    <Shell
      visual={
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <svg
            className="animate-print-drift absolute left-1/2 top-1/2 h-[190%] w-[190%] -translate-x-1/2 -translate-y-1/2 opacity-[0.5]"
            viewBox="0 0 1400 1400"
            fill="none"
          >
            {arcs.map((r, i) => (
              <ellipse
                key={r}
                cx="700"
                cy="700"
                rx={r}
                ry={r * 0.78}
                stroke="#f5b42a"
                strokeOpacity={0.05 + (i % 4) * 0.03}
                strokeWidth={i % 3 === 0 ? 1.6 : 0.8}
                strokeDasharray={i % 5 === 0 ? "160 90" : i % 3 === 0 ? "420 160" : undefined}
                transform={`rotate(${i * 4} 700 700)`}
              />
            ))}
          </svg>
        </div>
      }
    />
  );
}

/* ------------------------------------------------------------- C: scanline reveal */

export function HeroScanline() {
  const reduced = useReduced();
  return (
    <Shell
      visual={
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,rgba(245,180,42,0.28)_1px,transparent_0)] [background-size:44px_44px] opacity-40" />
          {!reduced ? (
            <>
              <div className="animate-scanline absolute inset-x-0 h-px bg-linear-to-r from-transparent via-amber-brand to-transparent shadow-[0_0_28px_6px_rgba(245,180,42,0.28)]" />
              <div className="animate-scanline absolute inset-x-0 h-40 bg-linear-to-b from-amber-brand/12 to-transparent" />
            </>
          ) : null}
        </div>
      }
    />
  );
}

/* --------------------------------------------------------- D: three-pillar diagram */

const PILLAR_BARS = [
  { key: "01", name: "Physical", height: "58%" },
  { key: "02", name: "Digital", height: "82%" },
  { key: "03", name: "Managed", height: "68%" },
];

export function HeroPillars() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [grown, setGrown] = useState(false);
  const reduced = useReduced();

  useEffect(() => {
    const id = window.setTimeout(() => setGrown(true), 400);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="container-page relative z-10 py-[clamp(1.75rem,4.5vh,4.5rem)]">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <div>
            <HeroCopy />
          </div>

          <div ref={ref} className="relative h-64 sm:h-72 lg:h-80" aria-hidden>
            <div className="absolute inset-x-0 bottom-8 flex h-full items-end justify-center gap-5 sm:gap-7">
              {PILLAR_BARS.map((bar, i) => (
                <div key={bar.key} className="group flex h-full w-20 flex-col justify-end sm:w-24">
                  <span className="mb-2 text-center text-[0.65rem] tracking-[0.18em] text-amber-brand/70">
                    {bar.key}
                  </span>
                  <div
                    className="w-full rounded-t-lg border border-amber-brand/30 bg-linear-to-t from-amber-brand/25 to-amber-brand/5 transition-[height] duration-1000 ease-out group-hover:from-amber-brand/40"
                    style={{
                      height: reduced || grown ? bar.height : "0%",
                      transitionDelay: `${i * 180}ms`,
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="absolute inset-x-0 bottom-8 h-px bg-linear-to-r from-transparent via-amber-brand/50 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex justify-center gap-5 sm:gap-7">
              {PILLAR_BARS.map((bar) => (
                <span
                  key={bar.key}
                  className="w-20 text-center text-[0.7rem] uppercase tracking-[0.14em] text-ink-200/55 sm:w-24"
                >
                  {bar.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <ReadingsRow />
      </div>
    </section>
  );
}
