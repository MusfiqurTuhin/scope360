"use client";

import { useEffect, useState } from "react";
import { ScopeDial } from "@/components/scope-dial";

/**
 * The hero figures presented inside the scope dial rather than on a panel over
 * it. One reading is shown at a time and the dial's cardinal markers indicate
 * which, so the instrument itself carries the content instead of being covered.
 *
 * All four readings are always in the DOM, so the content is complete for search
 * engines, screen readers, and anyone without JavaScript; only visibility cycles.
 */

const READINGS = [
  { value: "360°", label: "Physical, digital, and operational scope under one contract" },
  { value: "03", label: "Integrated delivery pillars, not disconnected vendors" },
  { value: "24/7", label: "Operational monitoring and dedicated helpdesk support" },
  { value: "M&E", label: "Analytics frameworks embedded in every engagement" },
] as const;

const INTERVAL_MS = 3500;

export function HeroScope() {
  const [active, setActive] = useState(0);
  const [cycling, setCycling] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    // Only start cycling once the client can actually animate. Until then every
    // reading stays visible, so nothing is hidden from a non-JS render.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setCycling(true);
  }, []);

  useEffect(() => {
    if (!cycling || paused) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % READINGS.length),
      INTERVAL_MS,
    );
    return () => window.clearInterval(id);
  }, [cycling, paused]);

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[17rem] sm:max-w-[20rem] lg:max-w-[min(24rem,42vh)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <ScopeDial className="absolute inset-0 h-full w-full" activeQuadrant={cycling ? active : -1} />

      {/* Readings, centred in the dial behind a lens disc so the sweep never
          reduces their contrast. */}
      <div className="absolute inset-[20%] flex items-center justify-center">
        <div
          aria-hidden
          className="absolute inset-0 rounded-full bg-ink-950/55 shadow-[inset_0_0_40px_rgba(245,180,42,0.07)] backdrop-blur-[2px]"
        />
        {cycling ? (
          <ul className="relative z-10 h-full w-full">
            {READINGS.map((reading, index) => (
              <li
                key={reading.value}
                aria-hidden={index !== active}
                className="absolute inset-0 flex flex-col items-center justify-center text-center transition-[opacity,transform] duration-700 ease-out"
                style={{
                  opacity: index === active ? 1 : 0,
                  transform: index === active ? "scale(1)" : "scale(0.94)",
                  pointerEvents: index === active ? "auto" : "none",
                }}
              >
                <span className="font-display text-4xl leading-none text-amber-brand sm:text-5xl lg:text-6xl">
                  {reading.value}
                </span>
                <span className="mt-3 max-w-[15rem] text-xs leading-snug text-ink-200/70 sm:text-sm">
                  {reading.label}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          // Static fallback: reduced motion, or before hydration.
          <ul className="relative z-10 grid w-full gap-2">
            {READINGS.map((reading) => (
              <li key={reading.value} className="flex items-baseline justify-center gap-3 text-center">
                <span className="font-display text-xl text-amber-brand sm:text-2xl">
                  {reading.value}
                </span>
                <span className="max-w-[13rem] text-left text-[0.7rem] leading-snug text-ink-200/70 sm:text-xs">
                  {reading.label}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Manual controls, so the cycle is never the only way to reach a reading. */}
      {cycling ? (
        <div className="absolute inset-x-0 -bottom-1 flex items-center justify-center gap-2.5">
          {READINGS.map((reading, index) => (
            <button
              key={reading.value}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show reading: ${reading.value}`}
              aria-current={index === active}
              className={`h-1.5 rounded-full transition-all duration-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-brand ${
                index === active ? "w-7 bg-amber-brand" : "w-1.5 bg-ink-100/25 hover:bg-ink-100/50"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
