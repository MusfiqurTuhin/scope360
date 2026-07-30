import type { ReactNode } from "react";
import { MagneticButton, SpotlightCard } from "@/components/effects";
import { Reveal } from "@/components/motion";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.24em] text-amber-brand">
      <span aria-hidden className="h-px w-8 origin-left bg-amber-brand/60" />
      {children}
    </p>
  );
}

/**
 * Section headings reveal themselves on scroll. Keeping the motion here means
 * every page inherits it without wrapping call sites in animation components.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  layout = "stacked",
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: string;
  align?: "left" | "center";
  /**
   * "split" sets the supporting line beside the title on wide screens. Used
   * wherever the heading spans the full width, so the right half is not left empty.
   */
  layout?: "stacked" | "split";
}) {
  const centered = align === "center";
  const split = layout === "split" && !centered && Boolean(lede);

  return (
    <Reveal>
      <div
        className={
          split
            ? "grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-14"
            : `flex flex-col gap-4 ${centered ? "items-center text-center" : "items-start"}`
        }
      >
        <div className={`flex flex-col gap-4 ${centered ? "items-center text-center" : "items-start"}`}>
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h2 className="font-display max-w-3xl text-(length:--text-h2) leading-[1.12] text-ink-100 text-balance">
            {title}
          </h2>
          {!split && lede ? (
            <p className="max-w-2xl text-base leading-relaxed text-ink-200/75 md:text-lg">
              {lede}
            </p>
          ) : null}
        </div>
        {split && lede ? (
          <p className="max-w-2xl text-base leading-relaxed text-ink-200/75 lg:pb-1">
            {lede}
          </p>
        ) : null}
      </div>
    </Reveal>
  );
}

export function Section({
  children,
  id,
  className = "",
}: {
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={`py-14 md:py-20 ${className}`}>
      <div className="container-page">{children}</div>
    </section>
  );
}

/** Animated CTA. Delegates to the magnetic/sheen button. */
export function ButtonLink({
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
  return (
    <MagneticButton href={href} variant={variant} className={className}>
      {children}
    </MagneticButton>
  );
}

/** Pointer-tracking card that reveals as it scrolls into view. */
export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Reveal variant="blur" className="h-full">
      <SpotlightCard className={`h-full ${className}`}>{children}</SpotlightCard>
    </Reveal>
  );
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-l border-white/10 pl-5">
      <p className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
        {value}
      </p>
      <p className="mt-2 text-sm leading-snug text-ink-200/60">{label}</p>
    </div>
  );
}
