"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * A 360° instrument with the Scope360 mark at its hub.
 *
 * A marker steps 30° round the rim every few seconds — one stop per capability,
 * twelve stops to a full revolution — and the capability at that stop is named
 * in the hub beneath the logo. The brand sits at the centre of everything the
 * company covers, which is the point the name is making.
 *
 * Naming in the hub rather than on the rim keeps every label horizontal and
 * readable, and means nothing can collide with the headline or clip off-screen.
 *
 * All capabilities stay in the DOM, so the content is complete for screen
 * readers, crawlers, and anyone without JavaScript.
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

const STEP_DEGREES = 360 / CAPABILITIES.length; // 30°
const DWELL_MS = 2600;

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

  // Keeps increasing rather than wrapping, so the marker never spins backwards
  // to get from the twelfth capability to the first.
  const markerRotation = index * STEP_DEGREES;
  const activeSlot = index % CAPABILITIES.length;
  const active = CAPABILITIES[activeSlot] ?? CAPABILITIES[0];

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[20rem] sm:max-w-[24rem] lg:max-w-[min(30rem,52vh)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Instrument rotation={markerRotation} activeSlot={activeSlot} running={running} />

      {/* Hub: the mark, and the capability currently under the marker. */}
      <div className="absolute inset-[19%] flex flex-col items-center justify-center text-center">
        <Image
          src="/logo-light.png"
          alt="Scope360"
          width={1400}
          height={869}
          priority
          className="w-24 opacity-90 sm:w-28 lg:w-36"
        />

        {running ? (
          <>
            <span
              key={active}
              className="animate-rise font-display mt-4 block text-lg leading-tight text-amber-brand sm:text-xl lg:text-2xl"
            >
              {active}
            </span>
            <span className="mt-2 text-[0.55rem] uppercase tracking-[0.3em] text-ink-200/45">
              {activeSlot + 1} of {CAPABILITIES.length}
            </span>
          </>
        ) : (
          <span className="mt-3 text-[0.55rem] uppercase tracking-[0.3em] text-amber-brand/70">
            360&deg; coverage
          </span>
        )}
      </div>

      {/* Always present for assistive tech and non-JavaScript readers. */}
      <ul className="sr-only">
        {CAPABILITIES.map((capability) => (
          <li key={capability}>{capability}</li>
        ))}
      </ul>
    </div>
  );
}

function Instrument({
  rotation,
  activeSlot,
  running,
}: {
  rotation: number;
  activeSlot: number;
  running: boolean;
}) {
  const ticks = Array.from({ length: 72 }, (_, i) => i * 5);
  const stops = Array.from({ length: 12 }, (_, i) => i * STEP_DEGREES);

  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
      <defs>
        <linearGradient id="orb-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f5b42a" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#f5b42a" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#ffd47a" stopOpacity="0.35" />
        </linearGradient>
        <radialGradient id="orb-core">
          <stop offset="0%" stopColor="#f5b42a" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#f5b42a" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="200" cy="200" r="118" fill="url(#orb-core)" />
      <circle cx="200" cy="200" r="194" stroke="url(#orb-ring)" strokeWidth="1.3" />
      <circle cx="200" cy="200" r="158" stroke="#f5b42a" strokeOpacity="0.16" strokeWidth="1" strokeDasharray="2 9" />
      <circle cx="200" cy="200" r="120" stroke="#f5efe6" strokeOpacity="0.08" strokeWidth="1" />

      {/* Fine graduations. */}
      {ticks.map((angle) => (
        <line
          key={angle}
          x1="200"
          y1="8"
          x2="200"
          y2={angle % 30 === 0 ? 24 : 14}
          stroke="#f5b42a"
          strokeOpacity={angle % 30 === 0 ? 0.5 : 0.18}
          strokeWidth={angle % 30 === 0 ? 1.5 : 1}
          transform={`rotate(${angle} 200 200)`}
        />
      ))}

      {/* One stop per capability; the current one lights up. */}
      {stops.map((angle, i) => (
        <circle
          key={angle}
          cx="200"
          cy="34"
          r={running && i === activeSlot ? 5 : 2.5}
          fill={running && i === activeSlot ? "#ffd47a" : "#f5b42a"}
          fillOpacity={running && i === activeSlot ? 1 : 0.28}
          transform={`rotate(${angle} 200 200)`}
          style={{ transition: "r 500ms ease, fill-opacity 500ms ease" }}
        />
      ))}

      {/* The marker, stepping 30° at a time round the full circle. */}
      {running ? (
        <g
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: "200px 200px",
            transition: "transform 1000ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <line x1="200" y1="52" x2="200" y2="118" stroke="#f5b42a" strokeOpacity="0.55" strokeWidth="1.5" />
          <circle cx="200" cy="34" r="9" fill="none" stroke="#ffd47a" strokeOpacity="0.9" strokeWidth="1.5" />
        </g>
      ) : null}
    </svg>
  );
}
