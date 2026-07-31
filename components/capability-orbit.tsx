"use client";

import { useEffect, useState } from "react";

/**
 * A 360° ring carrying every capability. The ring steps round one position at a
 * time, bringing each capability to the reading point in turn — the circle does
 * what the brand name says: covers the whole 360, one discipline at a time.
 *
 * The ring is centred just beyond the right edge, so only its left arc crosses
 * the hero. Capabilities rotate up into that arc, hold at the reading point,
 * then travel on.
 *
 * Every capability stays in the DOM at all times, so the content is complete for
 * screen readers, crawlers, and anyone without JavaScript.
 */

const CAPABILITIES = [
  "Civil Works",
  "Experiential Events",
  "Field Mobilization",
  "Site Management",
  "Digital Ecosystems",
  "Advanced Analytics",
  "AI & Automation",
  "Platform Engineering",
  "Strategic Procurement",
  "Asset Lifecycle",
  "Enterprise Support",
  "Facility Operations",
];

/** 12 capabilities around a full circle — one every 30 degrees. */
const STEP_DEGREES = 360 / CAPABILITIES.length;
const READING_ANGLE = 180; // due left, facing the headline
const DWELL_MS = 2400;

export function CapabilityOrbit() {
  const [index, setIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setRunning(true);
  }, []);

  useEffect(() => {
    if (!running || paused) return;
    const id = window.setInterval(() => setIndex((i) => i + 1), DWELL_MS);
    return () => window.clearInterval(id);
  }, [running, paused]);

  // The index keeps increasing rather than wrapping, so the ring never spins
  // backwards to get from the last capability to the first.
  const ringRotation = READING_ANGLE - index * STEP_DEGREES;
  const activeSlot = index % CAPABILITIES.length;

  if (!running) {
    // Reduced motion, or before hydration: a plain readable list.
    return (
      <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-ink-200/65">
        {CAPABILITIES.map((capability) => (
          <li key={capability} className="flex items-center gap-2">
            <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-amber-brand" />
            {capability}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div
      aria-label="Capabilities"
      className="pointer-events-auto absolute inset-y-0 right-0 w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Ring graphics, centred on the same point as the labels. */}
      <div className="absolute right-[-11rem] top-1/2 h-0 w-0 sm:right-[-9rem] lg:right-[-8rem]">
        <RingGraphics rotation={ringRotation} />

        {/* The reading point: a bracket the active capability arrives at. */}
        <span
          aria-hidden
          className="absolute top-0 hidden h-9 w-px -translate-y-1/2 bg-linear-to-b from-transparent via-amber-brand to-transparent lg:block lg:[--r:23rem] xl:[--r:25rem]"
          style={{ left: "calc(var(--r) * -1)" }}
        />

        <div
          className="absolute left-0 top-0 hidden h-0 w-0 transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] lg:block lg:[--r:23rem] xl:[--r:25rem]"
          style={{ transform: `rotate(${ringRotation}deg)` }}
        >
          {CAPABILITIES.map((capability, i) => {
            const slotAngle = i * STEP_DEGREES;
            const isActive = i === activeSlot;
            return (
              <div
                key={capability}
                className="absolute left-0 top-0 h-0 w-0"
                style={{ transform: `rotate(${slotAngle}deg) translateX(var(--r))` }}
              >
                <span
                  aria-current={isActive ? "true" : undefined}
                  className={`block w-72 whitespace-nowrap pr-4 text-right ${
                    isActive
                      ? "font-display text-2xl text-amber-brand opacity-100 sm:text-3xl lg:text-4xl"
                      : "text-[0.65rem] uppercase tracking-[0.18em] text-ink-200 opacity-20 sm:text-xs"
                  }`}
                  style={{
                    transform: `translate(-100%, -50%) rotate(${-(slotAngle + ringRotation)}deg)`,
                    transformOrigin: "100% 50%",
                    // The counter-rotation must animate on exactly the same curve
                    // as the ring, or the labels tilt while the ring is turning.
                    transition:
                      "transform 1100ms cubic-bezier(0.22,1,0.36,1), opacity 700ms ease, color 700ms ease",
                  }}
                >
                  {capability}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/** Concentric rings and a tick every 30° — one tick per capability slot. */
function RingGraphics({ rotation }: { rotation: number }) {
  const ticks = Array.from({ length: 72 }, (_, i) => i * 5);

  return (
    <div
      aria-hidden
      className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 opacity-50 sm:h-[36rem] sm:w-[36rem] sm:opacity-70 lg:h-[46rem] lg:w-[46rem] lg:opacity-100 xl:h-[50rem] xl:w-[50rem]"
    >
      <svg viewBox="0 0 400 400" className="h-full w-full" fill="none">
        <defs>
          <linearGradient id="orbit-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f5b42a" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#f5b42a" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#ffd47a" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        <circle cx="200" cy="200" r="196" stroke="url(#orbit-ring)" strokeWidth="1.2" />
        <circle cx="200" cy="200" r="168" stroke="#f5b42a" strokeOpacity="0.14" strokeWidth="1" strokeDasharray="2 9" />
        <circle cx="200" cy="200" r="132" stroke="#f5efe6" strokeOpacity="0.06" strokeWidth="1" />

        <g
          className="transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `rotate(${rotation}deg)`, transformOrigin: "200px 200px" }}
        >
          {ticks.map((angle) => {
            const major = angle % 30 === 0;
            return (
              <line
                key={angle}
                x1="200"
                y1="4"
                x2="200"
                y2={major ? 20 : 11}
                stroke="#f5b42a"
                strokeOpacity={major ? 0.6 : 0.22}
                strokeWidth={major ? 1.6 : 1}
                transform={`rotate(${angle} 200 200)`}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}
