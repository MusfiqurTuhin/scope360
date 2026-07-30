import { Eyebrow } from "@/components/ui";

export function PageHero({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/5">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-48 h-[34rem] w-[34rem] rounded-full bg-radial from-amber-brand/14 to-transparent blur-2xl"
      />
      <div className="container-page relative py-20 md:py-28">
        <div className="animate-rise max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-7 text-(length:--text-h1) font-semibold leading-[1.03] tracking-tight text-white text-balance">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-200/72">{lede}</p>
        </div>
      </div>
    </section>
  );
}
