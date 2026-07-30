"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

/** Thin amber progress rail pinned under the header. */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-60 h-px bg-transparent"
    >
      <div
        className="h-full origin-left bg-linear-to-r from-amber-deep via-amber-brand to-amber-soft"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

/**
 * Soft amber spotlight that trails the pointer. Desktop and fine-pointer only —
 * it is decorative and must never interfere with touch or reduced-motion users.
 */
export function CursorSpotlight() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setEnabled(true);

    let frame = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const render = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      const node = ref.current;
      if (node) {
        node.style.transform = `translate3d(${currentX - 300}px, ${currentY - 300}px, 0)`;
      }
      frame = requestAnimationFrame(render);
    };

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 h-150 w-150 rounded-full opacity-45 mix-blend-screen blur-3xl"
      style={{
        background:
          "radial-gradient(circle, rgba(245,180,42,0.14) 0%, rgba(245,180,42,0.05) 40%, transparent 70%)",
      }}
    />
  );
}

/** Soft, painterly washes and paper grain. Pure CSS motion, no per-frame JS. */
export function GridBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="grain absolute inset-0 opacity-[0.5]" />
      <div className="animate-orb-a absolute -left-52 top-[12%] h-[42rem] w-[42rem] rounded-full bg-radial from-amber-brand/12 via-amber-deep/5 to-transparent blur-3xl" />
      <div className="animate-orb-b absolute -right-56 top-[58%] h-[48rem] w-[48rem] rounded-full bg-radial from-amber-deep/10 to-transparent blur-3xl" />
      <div className="animate-float absolute left-[35%] top-[35%] h-[30rem] w-[30rem] rounded-full bg-radial from-ink-100/4 to-transparent blur-3xl" />
    </div>
  );
}

/** Infinite capability ticker. Duplicated track keeps the loop seamless. */
export function Marquee({ items }: { items: string[] }) {
  const track = [...items, ...items];

  return (
    <div
      aria-hidden
      className="relative flex overflow-hidden border-y border-white/8 py-5 [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]"
    >
      <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10">
        {track.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex shrink-0 items-center gap-10 text-sm font-medium tracking-tight whitespace-nowrap text-ink-200/45"
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-amber-brand/60" />
          </span>
        ))}
      </div>
    </div>
  );
}

/** Card whose border glow tracks the pointer across its surface. */
export function SpotlightCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    node.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-ink-900/70 p-7 transition-[transform,border-color,background-color] duration-500 hover:-translate-y-1 hover:border-amber-brand/40 hover:bg-ink-800/60 ${className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), rgba(245,180,42,0.10), transparent 65%)",
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-amber-brand/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="relative">{children}</div>
    </div>
  );
}

/** Primary CTA with a sheen sweep and subtle pointer-follow displacement. */
export function MagneticButton({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  function onPointerMove(event: React.PointerEvent<HTMLAnchorElement>) {
    const node = ref.current;
    if (!node) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.18;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.3;
    node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  function reset() {
    const node = ref.current;
    if (node) node.style.transform = "translate3d(0,0,0)";
  }

  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold tracking-tight transition-[background-color,border-color,color,transform] duration-300 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-amber-brand";
  const styles =
    variant === "primary"
      ? "bg-amber-brand text-ink-950 hover:bg-amber-soft"
      : "border border-white/15 text-white hover:border-amber-brand/60 hover:text-amber-brand";

  return (
    <Link
      ref={ref}
      href={href}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      className={`${base} ${styles} ${className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
      <span className="relative">{children}</span>
      <span
        aria-hidden
        className="relative transition-transform duration-300 group-hover:translate-x-1"
      >
        &rarr;
      </span>
    </Link>
  );
}
