import { Reveal } from "./Reveal";
import { SpreadWordmark } from "./SpreadWordmark";

const SPECS = [
  "Bilingual counsel · EN / AR",
  "UAE onshore & DIFC",
  "Advocacy + consultancy",
  "Commercial perspective",
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col overflow-clip bg-navy pt-[100px] pb-10 md:pt-[128px]"
    >
      <div className="wrap grid flex-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative z-10 max-w-[560px]">
          <Reveal>
            <p className="mono-label text-bronze-light mb-5">FS Advocates &amp; Legal Consultants · Dubai, UAE</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-serif font-semibold text-ivory leading-[1.05] text-[clamp(34px,4.6vw,64px)]">
              Strategic legal counsel <em>for a changing world.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="body-copy mt-6 max-w-[42ch] text-muted-on-navy">
              We advise businesses, investors and individuals across the UAE on disputes,
              transactions and complex legal matters — built for people who need clear
              direction, not legal complexity for its own sake.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#expertise"
                className="mono-label inline-flex items-center border border-bronze bg-bronze px-5 py-[13px] text-navy-deep font-bold transition-colors hover:bg-champagne hover:border-champagne"
              >
                Explore Expertise
              </a>
              <a
                href="#contact"
                className="mono-label inline-flex items-center border border-ivory/30 px-5 py-[13px] text-ivory transition-colors hover:border-champagne hover:text-champagne"
              >
                Speak With Us
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="relative z-10">
          <div className="relative aspect-[4/5] w-full max-w-[440px] mx-auto lg:mx-0 lg:ml-auto border border-line-on-navy">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-navy-deep/60 text-center px-8">
              <span className="mono-label text-muted-on-navy">Firm photography</span>
              <span className="font-serif italic text-champagne text-lg">
                Dubai skyline &amp; office interior
              </span>
              <span className="mono-label text-muted-on-navy/70">pending client assets</span>
            </div>
            <span className="absolute -top-px -left-px h-6 w-6 border-t border-l border-bronze" />
            <span className="absolute -bottom-px -right-px h-6 w-6 border-b border-r border-bronze" />
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.3} className="wrap relative z-10 mt-10 flex flex-wrap gap-x-9 gap-y-2 border-t hairline-on-navy pt-4">
        {SPECS.map((s) => (
          <span key={s} className="mono-label text-muted-on-navy">
            {s}
          </span>
        ))}
      </Reveal>

      <div className="absolute inset-x-[-2%] bottom-0 z-0 translate-y-[38%]">
        <SpreadWordmark variant="hero" />
      </div>
    </section>
  );
}
