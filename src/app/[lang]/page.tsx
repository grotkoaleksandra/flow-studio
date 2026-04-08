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
          EYE HERO — scroll-driven reveal
          ═══════════════════════════════════════════ */}
      <EyeAnimation />

      {/* All content below is locked until eye animation completes */}
      <div id="page-content" style={{ height: 0, overflow: "hidden", opacity: 0 }}>

      {/* ═══════════════════════════════════════════
          INTRO — giant headline on cream
          ═══════════════════════════════════════════ */}
      <section className="py-32 sm:py-44 px-6 bg-[#fffff8]">
        <div className="max-w-[1200px] mx-auto">
          <h1
            data-text-reveal=""
            className="font-[family-name:var(--font-display)] text-[2.5rem] sm:text-[4rem] lg:text-[5.5rem] font-[700] leading-[1.05] tracking-tight text-[#002394] mb-10 max-w-[900px]"
          >
            {dict.home.hero.title}
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-end gap-8 sm:gap-16">
            <p data-reveal="up" data-reveal-delay="0.2" className="text-base sm:text-lg text-[#002394]/50 max-w-lg leading-relaxed">
              {dict.home.hero.subtitle}
            </p>
            <div data-reveal="up" data-reveal-delay="0.4">
              <Link href={`/${lang}/programs`} className="btn-pill btn-pill-green">
                {dict.home.hero.cta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SERVICES — cards with images
          ═══════════════════════════════════════════ */}
      <section className="py-24 sm:py-36 px-6 bg-[#fffff8]">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16 gap-6">
            <div>
              <p data-reveal="up" className="label text-[#85ff9f] mb-4">{dict.home.services.tagline}</p>
              <h2 data-reveal="up" data-reveal-delay="0.1" className="font-[family-name:var(--font-display)] text-3xl sm:text-5xl lg:text-6xl font-[700] text-[#002394] tracking-tight">
                {dict.home.services.title}
              </h2>
            </div>
            <Link href={`/${lang}/programs`} data-reveal="up" className="label text-[#002394] link-hover shrink-0">
              View all &rarr;
            </Link>
          </div>

          <div data-stagger="up" className="grid md:grid-cols-3 gap-6">
            {dict.home.services.items.slice(0, 3).map((svc: { name: string; description: string; duration: string; level: string }, i: number) => {
              const images = [
                "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1600298882525-1ac025c98b68?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80",
              ];
              return (
                <div key={svc.name} className="group">
                  <div className="aspect-[4/3] bg-[#002394]/5 mb-5 overflow-hidden rounded-2xl">
                    <img
                      src={images[i]}
                      alt={svc.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <p className="label text-[#85ff9f] mb-2">{svc.level}</p>
                  <h3 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-[600] text-[#002394] mb-2">
                    {svc.name}
                  </h3>
                  <p className="text-sm text-[#002394]/45 leading-relaxed mb-4">
                    {svc.description}
                  </p>
                  <span className="label text-[#002394]/60 group-hover:text-[#85ff9f] transition-colors duration-300">
                    Learn more &rarr;
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PHILOSOPHY — navy section, bold text
          ═══════════════════════════════════════════ */}
      <section className="py-28 sm:py-40 px-6 bg-[#002394]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p data-reveal="up" className="label text-[#85ff9f] mb-6">{dict.home.philosophy.tagline}</p>
              <h2 data-reveal="up" data-reveal-delay="0.1" className="font-[family-name:var(--font-display)] text-3xl sm:text-5xl lg:text-6xl font-[700] text-[#fffff8] tracking-tight leading-[1.05]">
                {dict.home.mission.title}
              </h2>
            </div>
            <div data-reveal="up" data-reveal-delay="0.2" className="flex flex-col justify-end">
              <p className="text-base text-[#fffff8]/50 leading-[1.8] mb-8">
                {dict.home.mission.description}
              </p>
              <Link href={`/${lang}/about`} className="btn-pill btn-pill-green self-start">
                About us
              </Link>
            </div>
          </div>

          {/* Philosophy items */}
          <div data-stagger="up" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px mt-24 bg-[#fffff8]/10 rounded-2xl overflow-hidden">
            {dict.home.philosophy.items.map((item: { title: string; description: string; icon: string }) => (
              <div key={item.title} className="bg-[#002394] p-8 sm:p-10">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-[600] text-[#fffff8] mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-[#fffff8]/40 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ABOUT — asymmetric with image
          ═══════════════════════════════════════════ */}
      <section className="py-28 sm:py-40 px-6 bg-[#fffff8]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-20 items-center">
            <div data-reveal="up">
              <div className="aspect-[3/4] bg-[#002394]/5 overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80"
                  alt="Meditation and wellness"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <p data-reveal="up" className="label text-[#85ff9f] mb-6">Our Story</p>
              <h2 data-reveal="up" data-reveal-delay="0.1" className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-[700] text-[#002394] tracking-tight mb-8 leading-[1.1]">
                {dict.about.history.title}
              </h2>
              <p data-reveal="up" data-reveal-delay="0.2" className="text-base text-[#002394]/45 leading-[1.8] mb-8">
                {dict.about.history.content}
              </p>
              <p data-reveal="up" data-reveal-delay="0.3" className="label text-[#002394]/25">Est. 2024</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SCHEDULE — clean list
          ═══════════════════════════════════════════ */}
      <section className="py-28 sm:py-40 px-6 bg-[#fffff8] border-t border-[#002394]/8">
        <div className="max-w-[900px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-14 gap-6">
            <div>
              <p data-reveal="up" className="label text-[#85ff9f] mb-4">Weekly Rhythm</p>
              <h2 data-reveal="up" data-reveal-delay="0.1" className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-[700] text-[#002394] tracking-tight">
                Classes &amp; Gatherings
              </h2>
            </div>
            <Link href={`/${lang}/programs`} data-reveal="up" className="label text-[#002394] link-hover shrink-0">
              Full schedule &rarr;
            </Link>
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
              <div key={cls.day} className="flex items-baseline justify-between py-5 border-b border-[#002394]/8 group cursor-pointer">
                <div className="flex items-baseline gap-6 sm:gap-10">
                  <span className="label text-[#002394]/30 w-24 shrink-0">{cls.day}</span>
                  <span className="text-base sm:text-lg font-medium text-[#002394] group-hover:text-[#85ff9f] transition-colors duration-300">
                    {cls.name}
                  </span>
                </div>
                <span className="label text-[#002394]/25 shrink-0">{cls.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TESTIMONIALS — navy bg
          ═══════════════════════════════════════════ */}
      <section className="py-28 sm:py-40 px-6 bg-[#002394]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-20">
            <p data-reveal="up" className="label text-[#85ff9f] mb-4">{dict.home.testimonials.tagline}</p>
            <h2 data-reveal="up" data-reveal-delay="0.1" className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-[700] text-[#fffff8] tracking-tight">
              {dict.home.testimonials.title}
            </h2>
          </div>

          <div data-stagger="up" className="grid md:grid-cols-3 gap-8">
            {dict.home.testimonials.items.map((t: { quote: string; name: string; location: string }) => (
              <div key={t.name} className="bg-[#fffff8]/5 rounded-2xl p-8 sm:p-10">
                <p className="text-base text-[#fffff8]/60 leading-relaxed mb-8">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-medium text-[#fffff8]">{t.name}</p>
                  <p className="label text-[#85ff9f]/60 mt-1" style={{ fontSize: "0.65rem" }}>{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA — cream bg, bold
          ═══════════════════════════════════════════ */}
      <section className="py-32 sm:py-44 px-6 bg-[#fffff8]">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 data-reveal="up" className="font-[family-name:var(--font-display)] text-3xl sm:text-5xl lg:text-[4.5rem] font-[700] text-[#002394] tracking-tight mb-8 leading-[1.05]">
            {dict.home.cta.title}
          </h2>
          <p data-reveal="up" data-reveal-delay="0.2" className="text-base text-[#002394]/45 mb-12 leading-relaxed max-w-lg mx-auto">
            {dict.home.cta.description}
          </p>
          <div data-reveal="scale" data-reveal-delay="0.4" className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${lang}/contact`} className="btn-pill btn-pill-green">
              {dict.home.cta.button}
            </Link>
            <Link href={`/${lang}/programs`} className="btn-pill btn-pill-outline">
              Browse services
            </Link>
          </div>
          <p className="mt-8 label text-[#002394]/20" style={{ fontSize: "0.65rem" }}>
            {dict.home.cta.note}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════ */}
      <footer className="py-16 px-6 bg-[#002394]">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-12">
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-[700] text-[#fffff8] mb-3">Syrena</h3>
              <p className="text-sm text-[#fffff8]/35">hello@syrenaholistic.com</p>
            </div>
            <div className="flex gap-8">
              {[
                { href: `/${lang}`, label: "Home" },
                { href: `/${lang}/about`, label: "About" },
                { href: `/${lang}/programs`, label: "Services" },
                { href: `/${lang}/contact`, label: "Contact" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="label text-[#fffff8]/30 hover:text-[#85ff9f] transition-colors duration-300">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="pt-6 border-t border-[#fffff8]/8">
            <p className="label text-[#fffff8]/15" style={{ fontSize: "0.6rem" }}>
              &copy; {new Date().getFullYear()} Syrena Holistic. {dict.footer.rights}
            </p>
          </div>
        </div>
      </footer>

      </div>{/* end #page-content */}
    </>
  );
}
