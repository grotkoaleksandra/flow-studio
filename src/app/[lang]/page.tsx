import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import Link from "next/link";
import { ScrollRevealInit } from "@/components/scroll-reveal";
import { EyeAnimation } from "@/components/eye-animation";

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

      {/* ═══════════════════════════════════════════
          EYE HERO — scroll-driven reveal on dark bg
          ═══════════════════════════════════════════ */}
      <EyeAnimation />

      {/* All content below is locked until eye animation completes */}
      <div id="page-content" style={{ height: 0, overflow: "hidden", opacity: 0 }}>

      {/* ═══════════════════════════════════════════
          BRAND INTRO — first content after eye unlocks
          Dark section with large italic serif
          ═══════════════════════════════════════════ */}
      <section className="relative py-32 sm:py-44 px-6 bg-[#2d2926] grain">
        <div className="max-w-[900px] mx-auto text-center">
          <p data-reveal="up" className="label text-[#d4af7a]/60 mb-8">
            {dict.home.hero.scroll}
          </p>
          <h1
            data-text-reveal=""
            className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-7xl font-light italic leading-[1.1] tracking-tight text-[#f0ede6] whitespace-pre-line mb-10"
          >
            {dict.home.hero.title}
          </h1>
          <p data-reveal="up" data-reveal-delay="0.2" className="text-base sm:text-lg text-[#f0ede6]/50 max-w-xl mx-auto mb-14 leading-relaxed font-light">
            {dict.home.hero.subtitle}
          </p>
          <div data-reveal="scale" data-reveal-delay="0.4">
            <Link
              href={`/${lang}/programs`}
              className="inline-block px-10 py-4 border border-[#b85c3a] text-[#b85c3a] font-[family-name:var(--font-body)] label tracking-[0.12em] hover:bg-[#b85c3a] hover:text-[#f0ede6] transition-all duration-500"
            >
              {dict.home.hero.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PHILOSOPHY — dark bg, pull quote + paragraph
          ═══════════════════════════════════════════ */}
      <section className="relative py-28 sm:py-40 px-6 bg-[#1e1916] grain">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid md:grid-cols-[1fr_1px_1fr] gap-12 md:gap-16 items-start">
            {/* Pull quote */}
            <div data-reveal="up">
              <p className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl lg:text-4xl font-light italic leading-[1.35] text-[#f0ede6]/90">
                &ldquo;{dict.home.mission.title}&rdquo;
              </p>
            </div>

            {/* Thin vertical rule — hidden on mobile */}
            <div className="hidden md:block w-px bg-[#f0ede6]/10 self-stretch" />

            {/* Description */}
            <div data-reveal="up" data-reveal-delay="0.2" className="flex flex-col justify-center">
              <hr className="thin-rule text-[#f0ede6] mb-8 md:hidden" />
              <p className="text-sm sm:text-base text-[#f0ede6]/45 leading-[1.8] font-light">
                {dict.home.mission.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SERVICES — parchment bg, three cards
          ═══════════════════════════════════════════ */}
      <section className="relative py-28 sm:py-40 px-6 bg-[#f0ede6]">
        <div className="max-w-[1100px] mx-auto">
          <div className="mb-20">
            <p data-reveal="up" className="label text-[#b85c3a]/70 mb-4">
              {dict.home.services.tagline}
            </p>
            <h2 data-reveal="up" data-reveal-delay="0.1" className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-light italic text-[#2d2926] tracking-tight">
              {dict.home.services.title}
            </h2>
          </div>

          <div data-stagger="up" className="grid md:grid-cols-3 gap-0 border-t border-[#2d2926]/10">
            {dict.home.services.items.slice(0, 3).map((svc: { name: string; description: string; duration: string; level: string }) => (
              <div
                key={svc.name}
                className="group py-10 md:px-8 first:md:pl-0 last:md:pr-0 border-b md:border-b-0 md:border-r last:border-r-0 border-[#2d2926]/10 transition-all duration-500"
              >
                <p className="label text-[#2d2926]/40 mb-4">{svc.level}</p>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-light italic text-[#2d2926] mb-3">
                  {svc.name}
                </h3>
                <p className="text-sm text-[#2d2926]/50 leading-relaxed font-light mb-6 max-w-[280px]">
                  {svc.description}
                </p>
                <Link
                  href={`/${lang}/programs`}
                  className="inline-flex items-center gap-2 text-[#b85c3a] label link-hover transition-colors duration-300 group-hover:text-[#2d2926]"
                >
                  Learn more <span className="text-lg leading-none">&rarr;</span>
                </Link>
                {/* Hover left border accent */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#b85c3a] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ABOUT — dark section, asymmetric layout
          ═══════════════════════════════════════════ */}
      <section className="relative py-28 sm:py-40 px-6 bg-[#2d2926] grain">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid md:grid-cols-[1fr_1.2fr] gap-16 items-center">
            {/* Text left */}
            <div>
              <p data-reveal="up" className="label text-[#d4af7a]/50 mb-6">
                Our Story
              </p>
              <h2 data-reveal="up" data-reveal-delay="0.1" className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-light italic text-[#f0ede6] tracking-tight mb-8">
                {dict.about.history.title}
              </h2>
              <p data-reveal="up" data-reveal-delay="0.2" className="text-sm sm:text-base text-[#f0ede6]/45 leading-[1.8] font-light mb-8">
                {dict.about.history.content}
              </p>
              <p data-reveal="up" data-reveal-delay="0.3" className="label text-[#d4af7a]/30">
                Est. 2024
              </p>
            </div>

            {/* Image placeholder right — offset */}
            <div data-reveal="up" data-reveal-delay="0.2" className="relative md:translate-y-12">
              <div className="aspect-[3/4] bg-[#1e1916] flex items-center justify-center">
                <span className="font-[family-name:var(--font-display)] text-lg italic text-[#f0ede6]/15">
                  [ image ]
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WHY SYRENA — parchment bg, philosophy cards
          ═══════════════════════════════════════════ */}
      <section className="relative py-28 sm:py-40 px-6 bg-[#f0ede6]">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-20">
            <p data-reveal="up" className="label text-[#b85c3a]/70 mb-4">
              {dict.home.philosophy.tagline}
            </p>
            <h2 data-reveal="up" data-reveal-delay="0.1" className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-light italic text-[#2d2926] tracking-tight">
              {dict.home.philosophy.title}
            </h2>
          </div>

          <div data-stagger="up" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#2d2926]/8">
            {dict.home.philosophy.items.map((item: { title: string; description: string; icon: string }) => (
              <div
                key={item.title}
                className="bg-[#f0ede6] p-8 sm:p-10 group"
              >
                <h3 className="font-[family-name:var(--font-display)] text-xl font-light italic text-[#2d2926] mb-3">
                  {item.title}
                </h3>
                <p className="text-xs text-[#2d2926]/40 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SCHEDULE — parchment bg, list layout
          ═══════════════════════════════════════════ */}
      <section className="relative py-28 sm:py-40 px-6 bg-[#f0ede6]">
        <div className="max-w-[900px] mx-auto">
          <div className="mb-16">
            <p data-reveal="up" className="label text-[#b85c3a]/70 mb-4">
              Weekly Rhythm
            </p>
            <h2 data-reveal="up" data-reveal-delay="0.1" className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-light italic text-[#2d2926] tracking-tight">
              Classes &amp; Gatherings
            </h2>
          </div>

          <div data-stagger="up">
            {[
              { day: "Monday", name: "Gentle Hatha Flow", time: "7:00 AM" },
              { day: "Tuesday", name: "Tarot Circle", time: "7:30 PM" },
              { day: "Wednesday", name: "Vinyasa & Breathwork", time: "6:30 AM" },
              { day: "Thursday", name: "Energy Healing Session", time: "6:00 PM" },
              { day: "Friday", name: "Sound Bath Ceremony", time: "7:00 PM" },
              { day: "Saturday", name: "Yoga Under the Stars", time: "8:00 PM" },
              { day: "Sunday", name: "Restorative & Meditation", time: "10:00 AM" },
            ].map((cls) => (
              <div
                key={cls.day}
                className="flex items-baseline justify-between py-5 border-b border-[#2d2926]/8 group"
              >
                <div className="flex items-baseline gap-6 sm:gap-10">
                  <span className="label text-[#2d2926]/35 w-24 shrink-0">{cls.day}</span>
                  <span className="font-[family-name:var(--font-display)] text-lg sm:text-xl font-light italic text-[#2d2926] group-hover:text-[#b85c3a] transition-colors duration-300">
                    {cls.name}
                  </span>
                </div>
                <span className="label text-[#2d2926]/30 shrink-0">{cls.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TESTIMONIALS — dark bg
          ═══════════════════════════════════════════ */}
      <section className="relative py-28 sm:py-40 px-6 bg-[#1e1916] grain">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-20">
            <p data-reveal="up" className="label text-[#d4af7a]/50 mb-4">
              {dict.home.testimonials.tagline}
            </p>
            <h2 data-reveal="up" data-reveal-delay="0.1" className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-light italic text-[#f0ede6] tracking-tight">
              {dict.home.testimonials.title}
            </h2>
          </div>

          <div data-stagger="up" className="grid md:grid-cols-3 gap-px bg-[#f0ede6]/5">
            {dict.home.testimonials.items.map((t: { quote: string; name: string; location: string }) => (
              <div
                key={t.name}
                className="bg-[#1e1916] p-8 sm:p-10"
              >
                <p className="font-[family-name:var(--font-display)] text-base sm:text-lg italic text-[#f0ede6]/60 leading-relaxed mb-8">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-normal text-[#f0ede6]/80">{t.name}</p>
                  <p className="label text-[#d4af7a]/30 mt-1" style={{ fontSize: "0.65rem" }}>{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA — deep dark section with large serif
          ═══════════════════════════════════════════ */}
      <section className="relative py-32 sm:py-44 px-6 bg-[#2d2926] grain">
        <div className="max-w-[800px] mx-auto text-center">
          <hr data-reveal="up" className="thin-rule text-[#f0ede6] max-w-[60px] mx-auto mb-12" />
          <h2 data-reveal="up" className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-6xl font-light italic text-[#f0ede6] tracking-tight mb-8 leading-[1.15]">
            {dict.home.cta.title}
          </h2>
          <p data-reveal="up" data-reveal-delay="0.2" className="text-base text-[#f0ede6]/40 mb-14 font-light leading-relaxed max-w-lg mx-auto">
            {dict.home.cta.description}
          </p>
          <div data-reveal="scale" data-reveal-delay="0.4">
            <Link
              href={`/${lang}/contact`}
              className="inline-block px-12 py-4 border border-[#b85c3a] text-[#b85c3a] label tracking-[0.12em] hover:bg-[#b85c3a] hover:text-[#f0ede6] transition-all duration-500"
            >
              {dict.home.cta.button}
            </Link>
            <p className="mt-8 label text-[#f0ede6]/20" style={{ fontSize: "0.6rem" }}>
              {dict.home.cta.note}
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER — dark, minimal
          ═══════════════════════════════════════════ */}
      <footer className="relative py-16 px-6 bg-[#1e1916] grain">
        <div className="max-w-[1100px] mx-auto">
          <hr className="thin-rule text-[#f0ede6] mb-12" />
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            {/* Left — address & email */}
            <div>
              <p className="label text-[#f0ede6]/25 mb-3">Syrena Holistic</p>
              <p className="text-sm text-[#f0ede6]/30 font-light leading-relaxed">
                hello@syrenaholistic.com
              </p>
            </div>

            {/* Right — sign-off phrase */}
            <p className="font-[family-name:var(--font-display)] text-xl sm:text-2xl italic text-[#f0ede6]/20 font-light">
              See beyond the ordinary.
            </p>
          </div>

          <div className="mt-12 pt-6 border-t border-[#f0ede6]/5">
            <p className="label text-[#f0ede6]/15" style={{ fontSize: "0.6rem" }}>
              &copy; {new Date().getFullYear()} Syrena Holistic. {dict.footer.rights}
            </p>
          </div>
        </div>
      </footer>

      </div>{/* end #page-content */}
    </>
  );
}
