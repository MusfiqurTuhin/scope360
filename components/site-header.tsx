"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/lib/content";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-ink-950/85 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="container-page flex h-18 items-center justify-between gap-6">
        <Link
          href="/"
          aria-label="Scope360 home"
          className="relative z-10 flex items-center"
        >
          <Image
            src="/logo-light.png"
            alt="Scope360"
            width={1400}
            height={869}
            priority
            className="h-9 w-auto md:h-10"
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "text-amber-brand"
                    : "text-ink-200/70 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="ml-3 rounded-full bg-amber-brand px-5 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-amber-soft"
          >
            Start a project
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden className="flex flex-col gap-1.5">
            <span
              className={`block h-px w-5 bg-current transition ${open ? "translate-y-[3px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-5 bg-current transition ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-white/10 bg-ink-950 lg:hidden"
        >
          <nav aria-label="Mobile" className="container-page flex flex-col py-6">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-white/5 py-4 text-lg font-medium text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-6 rounded-full bg-amber-brand px-6 py-3.5 text-center text-sm font-semibold text-ink-950"
            >
              Start a project
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
