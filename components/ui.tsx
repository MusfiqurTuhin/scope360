import Link from "next/link";
import type { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.24em] text-amber-brand">
      <span aria-hidden className="h-px w-8 bg-amber-brand/60" />
      {children}
    </p>
  );
}

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
    <div
      className={`flex flex-col gap-5 ${centered ? "items-center text-center" : "items-start"}`}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="max-w-3xl text-(length:--text-h2) font-semibold leading-[1.1] tracking-tight text-white text-balance">
        {title}
      </h2>
      {lede ? (
        <p className="max-w-2xl text-base leading-relaxed text-ink-200/75 md:text-lg">
          {lede}
        </p>
      ) : null}
    </div>
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

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-tight transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-amber-brand";
  const styles =
    variant === "primary"
      ? "bg-amber-brand text-ink-950 hover:bg-amber-soft"
      : "border border-white/15 text-white hover:border-amber-brand/60 hover:text-amber-brand";
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
      <span aria-hidden>&rarr;</span>
    </Link>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-ink-900/70 p-7 transition duration-300 hover:border-amber-brand/40 hover:bg-ink-800/70 ${className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-amber-brand/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      {children}
    </div>
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
