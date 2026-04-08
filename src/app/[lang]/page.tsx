import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import Link from "next/link";
import { ScrollRevealInit } from "@/components/scroll-reveal";
import { EyeAnimation } from "@/components/eye-animation";

/* ── Lace ornament — intricate scrollwork accent ── */
function LaceOrnament({ color = "#b85c3a", className = "" }: { color?: string; className?: string }) {
  return (
    <svg className={`w-48 sm:w-64 h-auto ${className}`} viewBox="0 0 260 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M130 10 Q135 20 130 32 Q125 20 130 10Z" fill={color} opacity="0.25" />
      <path d="M130 10 Q140 18 140 28 Q135 22 130 32 Q133 18 130 10Z" fill={color} opacity="0.15" />
      <path d="M130 10 Q120 18 120 28 Q125 22 130 32 Q127 18 130 10Z" fill={color} opacity="0.15" />
      <path d="M130 32 Q137 28 143 32 Q137 36 130 32Z" fill={color} opacity="0.2" />
      <path d="M130 32 Q123 28 117 32 Q123 36 130 32Z" fill={color} opacity="0.2" />
      <circle cx="130" cy="22" r="1.5" fill={color} opacity="0.35" />
      <path d="M115 25 C108 15, 95 12, 88 20 C82 27, 88 34, 95 30" stroke={color} strokeWidth="0.7" opacity="0.3" fill="none" />
      <path d="M95 30 C100 27, 98 22, 92 24" stroke={color} strokeWidth="0.5" opacity="0.2" fill="none" />
      <path d="M88 20 C82 14, 70 14, 65 22 C60 30, 68 34, 74 28" stroke={color} strokeWidth="0.6" opacity="0.2" fill="none" />
      <path d="M74 28 C78 25, 76 20, 70 23" stroke={color} strokeWidth="0.4" opacity="0.15" fill="none" />
      <path d="M100 22 Q95 18 90 22 Q95 26 100 22Z" fill={color} opacity="0.12" />
      <path d="M78 22 Q73 19 68 22 Q73 25 78 22Z" fill={color} opacity="0.08" />
      <circle cx="105" cy="28" r="1" fill={color} opacity="0.2" />
      <circle cx="82" cy="26" r="0.8" fill={color} opacity="0.15" />
      <path d="M65 22 C58 18, 48 22, 42 20" stroke={color} strokeWidth="0.4" opacity="0.12" fill="none" />
      <path d="M42 20 C36 18, 28 22, 22 21" stroke={color} strokeWidth="0.3" opacity="0.08" fill="none" strokeDasharray="3 4" />
      <circle cx="60" cy="21" r="0.6" fill={color} opacity="0.1" />
      <path d="M145 25 C152 15, 165 12, 172 20 C178 27, 172 34, 165 30" stroke={color} strokeWidth="0.7" opacity="0.3" fill="none" />
      <path d="M165 30 C160 27, 162 22, 168 24" stroke={color} strokeWidth="0.5" opacity="0.2" fill="none" />
      <path d="M172 20 C178 14, 190 14, 195 22 C200 30, 192 34, 186 28" stroke={color} strokeWidth="0.6" opacity="0.2" fill="none" />
      <path d="M186 28 C182 25, 184 20, 190 23" stroke={color} strokeWidth="0.4" opacity="0.15" fill="none" />
      <path d="M160 22 Q165 18 170 22 Q165 26 160 22Z" fill={color} opacity="0.12" />
      <path d="M182 22 Q187 19 192 22 Q187 25 182 22Z" fill={color} opacity="0.08" />
      <circle cx="155" cy="28" r="1" fill={color} opacity="0.2" />
      <circle cx="178" cy="26" r="0.8" fill={color} opacity="0.15" />
      <path d="M195 22 C202 18, 212 22, 218 20" stroke={color} strokeWidth="0.4" opacity="0.12" fill="none" />
      <path d="M218 20 C224 18, 232 22, 238 21" stroke={color} strokeWidth="0.3" opacity="0.08" fill="none" strokeDasharray="3 4" />
      <circle cx="200" cy="21" r="0.6" fill={color} opacity="0.1" />
    </svg>
  );
}

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
          EYE HERO — scroll-driven reveal on parchment
          ═══════════════════════════════════════════ */}
      <EyeAnimation />

      {/* All content below is locked until eye animation completes */}
      <div id="page-content" style={{ height: 0, overflow: "hidden", opacity: 0 }}>

      {/* ═══════════════════════════════════════════
          BRAND INTRO — flows from parchment hero
          ═══════════════════════════════════════════ */}
      <section className="relative py-32 sm:py-44 px-6 bg-[#f0ede6]">
        <div className="max-w-[900px] mx-auto text-center">
          <LaceOrnament className="mx-auto mb-10 opacity-50" />
          <h1
            data-text-reveal=""
            className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-7xl font-light italic leading-[1.1] tracking-tight text-[#2d2926] whitespace-pre-line mb-10"
          >
            {dict.home.hero.title}
          </h1>
          <p data-reveal="up" data-reveal-delay="0.2" className="text-base sm:text-lg text-[#2d2926]/50 max-w-xl mx-auto mb-14 leading-relaxed">
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
          PHILOSOPHY — sage-tinted bg, pull quote
          ═══════════════════════════════════════════ */}
      <section className="relative py-28 sm:py-40 px-6 bg-[#2d2926] grain">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid md:grid-cols-[1fr_1px_1fr] gap-12 md:gap-16 items-start">
            <div data-reveal="up">
              <p className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl lg:text-4xl font-light italic leading-[1.35] text-[#f0ede6]/90">
                &ldquo;{dict.home.mission.title}&rdquo;
              </p>
            </div>
            <div className="hidden md:block w-px bg-[#f0ede6]/10 self-stretch" />
            <div data-reveal="up" data-reveal-delay="0.2" className="flex flex-col justify-center">
              <hr className="thin-rule text-[#f0ede6] mb-8 md:hidden" />
              <p className="text-sm sm:text-base text-[#f0ede6]/50 leading-[1.8]">
                {dict.home.mission.description}
              </p>
              <LaceOrnament color="#d4af7a" className="mt-10 opacity-30" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SERVICES — warm parchment, three cards
          ═══════════════════════════════════════════ */}
      <section className="relative py-28 sm:py-40 px-6 bg-[#f0ede6]">
        <div className="max-w-[1100px] mx-auto">
          <div className="mb-20">
            <p data-reveal="up" className="label text-[#b85c3a]/70 mb-4">
              {dict.home.services.tagline}
            </p>
            <h2 data-reveal="up" data-reveal-delay="0.1" className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-light italic text-[#2d2926] tracking-tight mb-6">
              {dict.home.services.title}
            </h2>
            <LaceOrnament className="opacity-35" />
          </div>

          <div data-stagger="up" className="grid md:grid-cols-3 gap-0 border-t border-[#2d2926]/10">
            {dict.home.services.items.slice(0, 3).map((svc: { name: string; description: string; duration: string; level: string }) => (
              <div
                key={svc.name}
                className="group relative py-10 md:px-8 first:md:pl-0 last:md:pr-0 border-b md:border-b-0 md:border-r last:border-r-0 border-[#2d2926]/10 transition-all duration-500"
              >
                <p className="label text-[#8a9e85] mb-4">{svc.level}</p>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-normal text-[#2d2926] mb-3">
                  {svc.name}
                </h3>
                <p className="text-sm text-[#2d2926]/50 leading-relaxed mb-6 max-w-[280px]">
                  {svc.description}
                </p>
                <Link
                  href={`/${lang}/programs`}
                  className="inline-flex items-center gap-2 text-[#b85c3a] label link-hover transition-colors duration-300 group-hover:text-[#2d2926]"
                >
                  Learn more <span className="text-lg leading-none">&rarr;</span>
                </Link>
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#b85c3a] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ABOUT — dark accent section, asymmetric
          ═══════════════════════════════════════════ */}
      <section className="relative py-28 sm:py-40 px-6 bg-[#2d2926] grain">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid md:grid-cols-[1fr_1.2fr] gap-16 items-center">
            <div>
              <p data-reveal="up" className="label text-[#d4af7a]/50 mb-6">
                Our Story
              </p>
              <h2 data-reveal="up" data-reveal-delay="0.1" className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-light italic text-[#f0ede6] tracking-tight mb-8">
                {dict.about.history.title}
              </h2>
              <p data-reveal="up" data-reveal-delay="0.2" className="text-sm sm:text-base text-[#f0ede6]/50 leading-[1.8] mb-8">
                {dict.about.history.content}
              </p>
              <LaceOrnament color="#d4af7a" className="opacity-25 mb-6" />
              <p data-reveal="up" data-reveal-delay="0.3" className="label text-[#d4af7a]/30">
                Est. 2024
              </p>
            </div>
            <div data-reveal="up" data-reveal-delay="0.2" className="relative md:translate-y-12">
              <div className="aspect-[3/4] bg-[#1e1916] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80"
                  alt="Meditation and wellness"
                  className="w-full h-full object-cover opacity-70"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WHY SYRENA — soft warm background
          ═══════════════════════════════════════════ */}
      <section className="relative py-28 sm:py-40 px-6 bg-[#e8e2d8]">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-20">
            <p data-reveal="up" className="label text-[#b85c3a]/70 mb-4">
              {dict.home.philosophy.tagline}
            </p>
            <h2 data-reveal="up" data-reveal-delay="0.1" className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-light italic text-[#2d2926] tracking-tight mb-6">
              {dict.home.philosophy.title}
            </h2>
            <LaceOrnament className="mx-auto opacity-35" />
          </div>

          <div data-stagger="up" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#2d2926]/6">
            {dict.home.philosophy.items.map((item: { title: string; description: string; icon: string }) => (
              <div
                key={item.title}
                className="bg-[#e8e2d8] p-8 sm:p-10 group"
              >
                <h3 className="font-[family-name:var(--font-display)] text-xl font-light italic text-[#2d2926] mb-3">
                  {item.title}
                </h3>
                <p className="text-xs text-[#2d2926]/45 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SCHEDULE — parchment, list layout
          ═══════════════════════════════════════════ */}
      <section className="relative py-28 sm:py-40 px-6 bg-[#f0ede6]">
        <div className="max-w-[900px] mx-auto">
          <div className="mb-16">
            <p data-reveal="up" className="label text-[#8a9e85] mb-4">
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
                  <span className="text-base sm:text-lg font-normal text-[#2d2926] group-hover:text-[#b85c3a] transition-colors duration-300">
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
          TESTIMONIALS — dark accent
          ═══════════════════════════════════════════ */}
      <section className="relative py-28 sm:py-40 px-6 bg-[#2d2926] grain">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-20">
            <p data-reveal="up" className="label text-[#d4af7a]/50 mb-4">
              {dict.home.testimonials.tagline}
            </p>
            <h2 data-reveal="up" data-reveal-delay="0.1" className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-light italic text-[#f0ede6] tracking-tight mb-6">
              {dict.home.testimonials.title}
            </h2>
            <LaceOrnament color="#d4af7a" className="mx-auto opacity-25" />
          </div>

          <div data-stagger="up" className="grid md:grid-cols-3 gap-px bg-[#f0ede6]/5">
            {dict.home.testimonials.items.map((t: { quote: string; name: string; location: string }) => (
              <div
                key={t.name}
                className="bg-[#2d2926] p-8 sm:p-10"
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
          CTA — warm parchment, inviting
          ═══════════════════════════════════════════ */}
      <section className="relative py-32 sm:py-44 px-6 bg-[#e8e2d8]">
        <div className="max-w-[800px] mx-auto text-center">
          <LaceOrnament className="mx-auto mb-12 opacity-40" />
          <h2 data-reveal="up" className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-6xl font-light italic text-[#2d2926] tracking-tight mb-8 leading-[1.15]">
            {dict.home.cta.title}
          </h2>
          <p data-reveal="up" data-reveal-delay="0.2" className="text-base text-[#2d2926]/45 mb-14 leading-relaxed max-w-lg mx-auto">
            {dict.home.cta.description}
          </p>
          <div data-reveal="scale" data-reveal-delay="0.4">
            <Link
              href={`/${lang}/contact`}
              className="inline-block px-12 py-4 bg-[#b85c3a] text-[#f0ede6] label tracking-[0.12em] hover:bg-[#2d2926] transition-all duration-500"
            >
              {dict.home.cta.button}
            </Link>
            <p className="mt-8 label text-[#2d2926]/25" style={{ fontSize: "0.6rem" }}>
              {dict.home.cta.note}
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER — dark, minimal
          ═══════════════════════════════════════════ */}
      <footer className="relative py-16 px-6 bg-[#2d2926] grain">
        <div className="max-w-[1100px] mx-auto">
          <LaceOrnament color="#d4af7a" className="mx-auto mb-12 opacity-15" />
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            <div>
              <p className="label text-[#f0ede6]/25 mb-3">Syrena Holistic</p>
              <p className="text-sm text-[#f0ede6]/30 leading-relaxed">
                hello@syrenaholistic.com
              </p>
            </div>
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
