import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import Link from "next/link";
import { ScrollRevealInit } from "@/components/scroll-reveal";
import { WaveDivider, WaveDividerAlt } from "@/components/wave-divider";

function LotusIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M32 52 C32 52 20 42 20 30 C20 20 28 16 32 12 C36 16 44 20 44 30 C44 42 32 52 32 52Z" />
      <path d="M32 52 C32 52 12 46 10 34 C8 24 18 18 24 16" opacity="0.5" />
      <path d="M32 52 C32 52 52 46 54 34 C56 24 46 18 40 16" opacity="0.5" />
    </svg>
  );
}

function VideoIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="14" height="14" rx="2" />
      <path d="M16 10l4.5-2.5v9L16 14" />
    </svg>
  );
}

function GlobeIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <ellipse cx="12" cy="12" rx="4" ry="10" />
      <path d="M2 12h20" />
    </svg>
  );
}

function HeartIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

const ICONS: Record<string, ({ className }: { className?: string }) => React.ReactNode> = {
  video: VideoIcon,
  globe: GlobeIcon,
  heart: HeartIcon,
  lotus: LotusIcon,
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = rawLang as Locale;
  const dict = await getDictionary(lang);

  return (
    <>
      <ScrollRevealInit />

      {/* ─── HERO ─── */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#5e6d52] via-[#8a9a7b] to-[#c4956a] animate-gradient grain">
        {/* Floating organic shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[8%] w-72 h-72 rounded-full bg-white/5 animate-float blur-sm" />
          <div className="absolute top-[30%] right-[12%] w-48 h-48 rounded-full bg-white/8 animate-float-slow blur-sm" />
          <div className="absolute bottom-[20%] left-[20%] w-56 h-56 rounded-full bg-white/5 animate-float-slower blur-sm" />
          <div className="absolute top-[60%] right-[30%] w-36 h-36 rounded-full bg-white/6 animate-breathe" />
          <div className="absolute top-[15%] right-[40%] w-64 h-64 rounded-full bg-white/4 animate-breathe-slow" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <div className="mb-8 flex justify-center">
            <LotusIcon className="w-16 h-16 text-white/60 animate-float-slow" />
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light leading-[1.1] tracking-tight whitespace-pre-line mb-8">
            {dict.home.hero.title}
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            {dict.home.hero.subtitle}
          </p>
          <Link
            href={`/${lang}/programs`}
            className="inline-block px-10 py-4 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 text-white rounded-full font-medium tracking-wide transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-white/10"
          >
            {dict.home.hero.cta}
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/50">
          <span className="text-xs tracking-[0.2em] uppercase">{dict.home.hero.scroll}</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
        </div>
      </section>

      <WaveDivider from="#8a9a7b" to="#faf8f5" />

      {/* ─── MISSION ─── */}
      <section className="py-24 sm:py-32 px-6 bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <div className="reveal">
            <div className="w-16 h-px bg-warm mx-auto mb-8 animate-line-grow" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-charcoal mb-8 tracking-tight">
              {dict.home.mission.title}
            </h2>
          </div>
          <p className="reveal reveal-delay-1 text-lg sm:text-xl text-muted leading-relaxed font-light">
            {dict.home.mission.description}
          </p>
        </div>
      </section>

      {/* ─── WHY FLOW STUDIO ─── */}
      <section className="py-24 sm:py-32 px-6 bg-sand-light">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="reveal text-sm tracking-[0.3em] uppercase text-warm mb-4 font-medium">
              {dict.home.philosophy.tagline}
            </p>
            <h2 className="reveal reveal-delay-1 text-3xl sm:text-4xl lg:text-5xl font-light text-charcoal tracking-tight">
              {dict.home.philosophy.title}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {dict.home.philosophy.items.map((item: { title: string; description: string; icon: string }, i: number) => {
              const Icon = ICONS[item.icon] || LotusIcon;
              return (
                <div
                  key={item.title}
                  className={`reveal reveal-delay-${i + 1} group text-center p-8 rounded-3xl bg-white/60 backdrop-blur-sm border border-sand hover:border-sage-light transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-sage/5`}
                >
                  <div className="w-14 h-14 mx-auto mb-6 text-sage group-hover:text-sage-dark transition-colors duration-500">
                    <Icon className="w-full h-full" />
                  </div>
                  <h3 className="text-lg font-medium text-charcoal mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <WaveDividerAlt from="#f5f0ea" to="#faf8f5" />

      {/* ─── CLASSES ─── */}
      <section className="py-24 sm:py-32 px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <p className="reveal text-sm tracking-[0.3em] uppercase text-warm mb-4 font-medium">
              {dict.home.classes.tagline}
            </p>
            <h2 className="reveal reveal-delay-1 text-3xl sm:text-4xl lg:text-5xl font-light text-charcoal tracking-tight">
              {dict.home.classes.title}
            </h2>
          </div>

          <div className="space-y-6">
            {dict.home.classes.items.map((cls: { name: string; description: string; duration: string; level: string }, i: number) => (
              <div
                key={cls.name}
                className={`reveal reveal-delay-${(i % 4) + 1} group relative overflow-hidden rounded-2xl border border-sand hover:border-sage-light bg-white/40 backdrop-blur-sm transition-all duration-500 hover:shadow-xl hover:shadow-sage/5`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 p-6 sm:p-8">
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-charcoal mb-2 group-hover:text-sage-dark transition-colors duration-300">
                      {cls.name}
                    </h3>
                    <p className="text-muted text-sm leading-relaxed font-light">
                      {cls.description}
                    </p>
                  </div>
                  <div className="flex gap-4 text-xs tracking-wider uppercase shrink-0">
                    <span className="px-4 py-2 rounded-full bg-sage/10 text-sage-dark font-medium">
                      {cls.duration}
                    </span>
                    <span className="px-4 py-2 rounded-full bg-warm/10 text-warm-dark font-medium">
                      {cls.level}
                    </span>
                  </div>
                </div>
                {/* Hover accent line */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-sage via-warm to-sage scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider from="#faf8f5" to="#f5f0ea" />

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 sm:py-32 px-6 bg-sand-light">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <p className="reveal text-sm tracking-[0.3em] uppercase text-warm mb-4 font-medium">
              {dict.home.testimonials.tagline}
            </p>
            <h2 className="reveal reveal-delay-1 text-3xl sm:text-4xl lg:text-5xl font-light text-charcoal tracking-tight">
              {dict.home.testimonials.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {dict.home.testimonials.items.map((t: { quote: string; name: string; location: string }, i: number) => (
              <div
                key={t.name}
                className={`reveal reveal-delay-${i + 1} p-8 rounded-3xl bg-white/60 backdrop-blur-sm border border-sand`}
              >
                <div className="text-4xl text-sage/30 font-serif mb-4">&ldquo;</div>
                <p className="text-charcoal/80 leading-relaxed mb-6 font-light italic">
                  {t.quote}
                </p>
                <div>
                  <p className="text-sm font-medium text-charcoal">{t.name}</p>
                  <p className="text-xs text-muted mt-1">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDividerAlt from="#f5f0ea" to="#5e6d52" />

      {/* ─── CTA ─── */}
      <section className="relative py-32 sm:py-40 px-6 bg-gradient-to-br from-[#5e6d52] via-[#6b7d5e] to-[#8a9a7b] overflow-hidden grain">
        {/* Floating shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-40 h-40 rounded-full bg-white/5 animate-breathe" />
          <div className="absolute bottom-[20%] right-[15%] w-56 h-56 rounded-full bg-white/4 animate-breathe-slow" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
          <h2 className="reveal text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mb-6">
            {dict.home.cta.title}
          </h2>
          <p className="reveal reveal-delay-1 text-lg text-white/70 mb-12 font-light leading-relaxed">
            {dict.home.cta.description}
          </p>
          <div className="reveal reveal-delay-2">
            <Link
              href={`/${lang}/contact`}
              className="inline-block px-12 py-4 bg-white text-sage-dark hover:bg-white/90 rounded-full font-medium tracking-wide transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-black/20"
            >
              {dict.home.cta.button}
            </Link>
            <p className="mt-6 text-sm text-white/50 tracking-wide">
              {dict.home.cta.note}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
