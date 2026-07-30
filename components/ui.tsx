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
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";
  return (
    <Reveal>
      <div
        className={`flex flex-col gap-5 ${centered ? "items-center text-center" : "items-start"}`}
      >
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h2 className="font-display max-w-3xl text-(length:--text-h2) leading-[1.12] text-ink-100 text-balance">
          {title}
        </h2>
        {lede ? (
          <p className="max-w-2xl text-base leading-relaxed text-ink-200/75 md:text-lg">
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
    <section id={id} className={`py-20 md:py-28 ${className}`}>
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
