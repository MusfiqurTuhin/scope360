"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * A 360° instrument. The Scope360 mark sits at the hub and every capability sits
 * out on the rim at its own 30° stop — twelve stops to a full revolution. A
 * marker steps from one stop to the next, lighting each capability in turn.
 *
 * Labels are positioned by angle but never rotated: text on the right half is
 * anchored from its left edge, text on the left half from its right edge, and
 * text at top and bottom is centred. That keeps every word horizontal and
 * readable at any point on the circle, and keeps the whole thing inside its box.
 *
 * All capabilities are always in the DOM for screen readers and non-JS visitors.
 */

const CAPABILITIES = [
  // Ordered so each pillar owns a contiguous 120° arc of the dial.
  // Running It — from the top.
  "Facility Operations", // 0° — top
  "Round-the-Clock Support",
  "Equipment & Assets",
  "Buying & Suppliers",
  // On the Ground — through the bottom.
  "Civil Works",
  "Site Management",
  "Experiential Events", // 180° — bottom
  "Field Teams",
  // Digital & Data — back up the left.
  "Websites & Apps",
  "Reports & Screens",
  "Ticketing & Entry",
  "Internal Tools",
];

const STEP_DEGREES = 360 / CAPABILITIES.length; // 30°
const DWELL_MS = 1400;

/** Radius of the label ring, as a percentage of the box. */
const LABEL_RADIUS = 44;

type Placement = { left: string; top: string; translate: string; align: string };

function placeLabel(index: number): Placement {
  // Stop 0 sits at the top; angles run clockwise from there.
  const radians = ((index * STEP_DEGREES - 90) * Math.PI) / 180;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);

  const left = 50 + LABEL_RADIUS * cos;
  const top = 50 + LABEL_RADIUS * sin;

  // Anchor away from the circle so labels never sit on top of the rim.
  let translate: string;
  let align: string;
  if (cos > 0.25) {
    translate = "translate(0, -50%)";
    align = "text-left";
  } else if (cos < -0.25) {
    translate = "translate(-100%, -50%)";
    align = "text-right";
  } else {
    translate = "translate(-50%, -50%)";
    align = "text-center";
  }

  return { left: `${left}%`, top: `${top}%`, translate, align };
}

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

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[17rem] sm:max-w-[22rem] md:max-w-[24rem] lg:max-w-[min(20rem,46vh)] xl:max-w-[min(26rem,50vh)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Instrument rotation={markerRotation} activeSlot={activeSlot} running={running} />

      {/* One label per stop, out on the rim. */}
      {CAPABILITIES.map((capability, i) => {
        const { left, top, translate, align } = placeLabel(i);
        const isActive = running && i === activeSlot;
        return (
          <span
            key={capability}
            aria-current={isActive ? "true" : undefined}
            className={`absolute hidden w-[5.5rem] leading-tight md:block lg:w-[6.5rem] xl:w-[9rem] ${align} ${
              isActive
                ? "font-display text-amber-brand text-sm lg:text-base xl:text-xl"
                : "text-[0.5rem] uppercase tracking-[0.1em] text-ink-200 lg:text-[0.55rem] xl:text-[0.65rem]"
            }`}
            style={{
              left,
              top,
              transform: translate,
              opacity: isActive ? 1 : 0.3,
              transition: "opacity 380ms ease, color 380ms ease",
            }}
          >
            {capability}
          </span>
        );
      })}

      {/* Hub: the mark. */}
      <div className="absolute inset-[31%] flex flex-col items-center justify-center text-center">
        <Image
          src="/logo-light.png"
          alt="Scope360"
          width={1400}
          height={869}
          priority
          className="w-24 opacity-90 sm:w-28 lg:w-32"
        />
        {running ? (
          <span
            key={CAPABILITIES[activeSlot]}
            className="animate-rise font-display mt-3 block text-base leading-tight text-amber-brand md:hidden"
          >
            {CAPABILITIES[activeSlot]}
          </span>
        ) : null}
        <span className="mt-2 text-[0.5rem] uppercase tracking-[0.28em] text-amber-brand/60 sm:text-[0.55rem]">
          {running ? `${activeSlot + 1} of ${CAPABILITIES.length}` : "360° coverage"}
        </span>
      </div>
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
          <stop offset="0%" stopColor="#f5b42a" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#f5b42a" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* The rim sits inside the label ring, so labels clear it. */}
      <circle cx="200" cy="200" r="96" fill="url(#orb-core)" />
      <circle cx="200" cy="200" r="140" stroke="url(#orb-ring)" strokeWidth="1.3" />
      <circle cx="200" cy="200" r="114" stroke="#f5b42a" strokeOpacity="0.16" strokeWidth="1" strokeDasharray="2 9" />
      <circle cx="200" cy="200" r="86" stroke="#f5efe6" strokeOpacity="0.08" strokeWidth="1" />

      {ticks.map((angle) => (
        <line
          key={angle}
          x1="200"
          y1="60"
          x2="200"
          y2={angle % 30 === 0 ? 74 : 66}
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
          cy="140"
          r={running && i === activeSlot ? 5 : 2.5}
          fill={running && i === activeSlot ? "#ffd47a" : "#f5b42a"}
          fillOpacity={running && i === activeSlot ? 1 : 0.3}
          transform={`rotate(${angle} 200 200)`}
          style={{ transition: "r 320ms ease, fill-opacity 320ms ease" }}
        />
      ))}

      {/* The marker, stepping 30° at a time round the full circle. */}
      {running ? (
        <g
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: "200px 200px",
            transition: "transform 620ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <line x1="200" y1="96" x2="200" y2="140" stroke="#f5b42a" strokeOpacity="0.6" strokeWidth="1.5" />
          <circle cx="200" cy="140" r="9" fill="none" stroke="#ffd47a" strokeOpacity="0.9" strokeWidth="1.5" />
        </g>
      ) : null}
    </svg>
  );
}
