import Image from "next/image";
import Link from "next/link";
import { company, navigation, pillars } from "@/lib/content";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ink-950">
      <div className="container-page grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4 lg:py-14">
        <div className="lg:col-span-2">
          <Image
            src="/logo-light.png"
            alt="Scope360"
            width={1400}
            height={869}
            className="h-10 w-auto"
          />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-200/60">
            {company.support}
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.24em] text-ink-400">
            {company.voice}
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
            Company
          </h3>
          <ul className="mt-5 space-y-3">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-ink-200/60 transition hover:text-amber-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
            Pillars
          </h3>
          <ul className="mt-5 space-y-3">
            {pillars.map((pillar) => (
              <li key={pillar.slug}>
                <Link
                  href={`/capabilities#${pillar.slug}`}
                  className="text-sm text-ink-200/60 transition hover:text-amber-brand"
                >
                  {pillar.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-ink-400 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {year} {company.name}. All rights reserved.
          </p>
          <p>Licences, registrations, and compliance records available on request.</p>
        </div>
      </div>
    </footer>
  );
}
