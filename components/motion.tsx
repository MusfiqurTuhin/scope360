"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

/**
 * Reveals children once they enter the viewport. Falls back to visible-on-mount
 * when IntersectionObserver is unavailable or motion is reduced, so content is
 * never trapped behind an animation that will not run.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  variant = "up",
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  variant?: "up" | "left" | "right" | "scale" | "blur";
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  const hidden: Record<string, string> = {
    up: "translate3d(0, 28px, 0)",
    left: "translate3d(-28px, 0, 0)",
    right: "translate3d(28px, 0, 0)",
    scale: "scale(0.965)",
    blur: "translate3d(0, 14px, 0)",
  };

  const style: CSSProperties = {
    opacity: shown ? 1 : 0,
    transform: shown ? "none" : hidden[variant],
    filter: variant === "blur" && !shown ? "blur(10px)" : "blur(0px)",
    transitionProperty: "opacity, transform, filter",
    transitionDuration: "820ms",
    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    transitionDelay: `${delay}ms`,
    willChange: shown ? "auto" : "opacity, transform",
  };

  return (
    <Tag ref={ref} style={style} className={className}>
      {children}
    </Tag>
  );
}

/** Staggers a list of children through Reveal without hand-tuning each delay. */
export function Stagger({
  children,
  step = 90,
  start = 0,
  variant = "up",
  className = "",
}: {
  children: ReactNode[];
  step?: number;
  start?: number;
  variant?: "up" | "left" | "right" | "scale" | "blur";
  className?: string;
}) {
  return (
    <>
      {children.map((child, index) => (
        <Reveal
          key={index}
          delay={start + index * step}
          variant={variant}
          className={className}
        >
          {child}
        </Reveal>
      ))}
    </>
  );
}

/** Counts up to a numeric target when scrolled into view. */
export function CountUp({
  to,
  suffix = "",
  prefix = "",
  duration = 1400,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setValue(to);
      return;
    }

    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setValue(to);
      return;
    }

    let frame = 0;
    let startedAt = 0;

    const tick = (now: number) => {
      if (!startedAt) startedAt = now;
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * to));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            frame = requestAnimationFrame(tick);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, duration, reduced]);

  return (
    <span ref={ref}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>*";

/** Decodes text glyph-by-glyph on first view — the x.ai terminal flourish. */
export function ScrambleText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [output, setOutput] = useState(text);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setOutput(text);
      return;
    }

    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    let frame = 0;
    let tick = 0;

    const run = () => {
      tick += 1;
      const revealed = Math.floor(tick / 2);
      setOutput(
        text
          .split("")
          .map((char, index) => {
            if (index < revealed || char === " ") return char;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join(""),
      );
      if (revealed <= text.length) frame = requestAnimationFrame(run);
      else setOutput(text);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            frame = requestAnimationFrame(run);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.6 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [text, reduced]);

  return (
    <span ref={ref} aria-label={text}>
      <span aria-hidden>{output}</span>
    </span>
  );
}
