import { Eyebrow } from "@/components/ui";
import { Reveal, ScrambleText } from "@/components/motion";

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
        className="animate-orb-a pointer-events-none absolute -right-32 -top-48 h-[34rem] w-[34rem] rounded-full bg-radial from-amber-brand/14 to-transparent blur-2xl"
      />
      <div className="container-page relative py-20 md:py-28">
        <div className="max-w-3xl">
          <div className="animate-rise">
            <Eyebrow>
              <ScrambleText text={eyebrow} />
            </Eyebrow>
          </div>
          <h1 className="font-display mt-7 text-(length:--text-h1) leading-[1.06] text-ink-100 text-balance">
            <span className="line-mask">
              <span className="animate-line block" style={{ animationDelay: "140ms" }}>
                {title}
              </span>
            </span>
          </h1>
          <Reveal delay={420}>
            <p className="mt-6 text-lg leading-relaxed text-ink-200/72">{lede}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
