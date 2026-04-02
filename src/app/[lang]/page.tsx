import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import Link from "next/link";
import { ScrollRevealInit } from "@/components/scroll-reveal";
import { WaveDivider, WaveDividerAlt } from "@/components/wave-divider";
import { EyeAnimation } from "@/components/eye-animation";

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

      {/* ─── EYE HERO — scroll-driven reveal ─── */}
      <EyeAnimation />

      {/* ─── BRAND INTRO — first content after eye unlocks ─── */}
      <section className="relative py-32 sm:py-40 px-6 bg-[#faf8f5]">
        <div className="max-w-4xl mx-auto text-center">
          <p data-reveal="up" className="text-sm tracking-[0.4em] uppercase text-[#0A36C2]/60 mb-6 font-medium">
            {dict.home.hero.scroll}
          </p>
          <h1 data-text-reveal="" className="text-4xl sm:text-5xl lg:text-7xl font-light leading-[1.1] tracking-tight text-[#1a1a2e] whitespace-pre-line mb-8">
            {dict.home.hero.title}
          </h1>
          <p data-reveal="up" data-reveal-delay="0.2" className="text-lg sm:text-xl text-[#1a1a2e]/60 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            {dict.home.hero.subtitle}
          </p>
          <div data-reveal="scale" data-reveal-delay="0.4">
            <Link
              href={`/${lang}/programs`}
              className="inline-block px-10 py-4 bg-[#0A36C2] hover:bg-[#0A36C2]/90 text-white rounded-full font-medium tracking-wide transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-[#0A36C2]/20"
            >
              {dict.home.hero.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* ─── MISSION ─── */}
      <section className="py-24 sm:py-32 px-6 bg-[#f5f0ea]">
        <div className="max-w-3xl mx-auto text-center">
          <div data-line-draw="" className="w-16 h-px bg-[#0A36C2]/30 mx-auto mb-8" />
          <h2 data-reveal="up" className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1a1a2e] mb-8 tracking-tight">
            {dict.home.mission.title}
          </h2>
          <p data-reveal="up" data-reveal-delay="0.2" className="text-lg sm:text-xl text-[#1a1a2e]/60 leading-relaxed font-light">
            {dict.home.mission.description}
          </p>
        </div>
      </section>

      {/* ─── WHY SYRENA ─── */}
      <section className="py-24 sm:py-32 px-6 bg-[#faf8f5]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p data-reveal="up" className="text-sm tracking-[0.3em] uppercase text-[#0A36C2]/50 mb-4 font-medium">
              {dict.home.philosophy.tagline}
            </p>
            <h2 data-text-reveal="" className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1a1a2e] tracking-tight">
              {dict.home.philosophy.title}
            </h2>
          </div>

          <div data-stagger="up" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {dict.home.philosophy.items.map((item: { title: string; description: string; icon: string }) => {
              const Icon = ICONS[item.icon] || LotusIcon;
              return (
                <div
                  key={item.title}
                  data-magnetic=""
                  className="group text-center p-8 rounded-3xl bg-white/60 backdrop-blur-sm border border-[#0A36C2]/10 hover:border-[#0A36C2]/25 transition-all duration-500 hover:shadow-lg hover:shadow-[#0A36C2]/5"
                >
                  <div className="w-14 h-14 mx-auto mb-6 text-[#0A36C2]/60 group-hover:text-[#0A36C2] transition-colors duration-500">
                    <Icon className="w-full h-full" />
                  </div>
                  <h3 className="text-lg font-medium text-[#1a1a2e] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[#1a1a2e]/50 text-sm leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── FULL-WIDTH IMAGE BANNER ─── */}
      <section className="relative h-[70vh] bg-[#1a1a2e] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A36C2]/20 via-transparent to-[#1a1a2e]/80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <p data-reveal="up" className="text-sm tracking-[0.4em] uppercase text-white/40 mb-6 font-medium">
              Where Ancient Meets Awakened
            </p>
            <h2 data-text-reveal="" className="text-4xl sm:text-6xl lg:text-8xl font-extralight tracking-tight mb-8 leading-[0.95]">
              See Beyond<br />the Ordinary
            </h2>
            <div data-reveal="up" data-reveal-delay="0.3" className="w-24 h-px bg-white/20 mx-auto" />
          </div>
        </div>
        {/* Placeholder pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-28 sm:py-36 px-6 bg-[#faf8f5]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p data-reveal="up" className="text-sm tracking-[0.3em] uppercase text-[#0A36C2]/50 mb-4 font-medium">
              Your Journey
            </p>
            <h2 data-text-reveal="" className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1a1a2e] tracking-tight">
              How It Works
            </h2>
          </div>

          <div data-stagger="up" className="grid md:grid-cols-3 gap-12 md:gap-8">
            {[
              { step: "01", title: "Choose Your Path", desc: "Explore our offerings — tarot, yoga, energy healing, breathwork, or sound ceremonies. Not sure where to start? Book a free consultation." },
              { step: "02", title: "Set Your Intention", desc: "Before each session, we connect to understand your needs. Every experience is personalized to meet you exactly where you are." },
              { step: "03", title: "Awaken & Integrate", desc: "Each session closes with integration guidance — practices, reflections, and rituals to carry the transformation into your daily life." },
            ].map((item) => (
              <div key={item.step} className="relative text-center group">
                <div className="text-7xl font-extralight text-[#0A36C2]/10 mb-4 group-hover:text-[#0A36C2]/20 transition-colors duration-700">{item.step}</div>
                <h3 className="text-xl font-medium text-[#1a1a2e] mb-3">{item.title}</h3>
                <p className="text-[#1a1a2e]/50 text-sm leading-relaxed font-light max-w-xs mx-auto">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider from="#faf8f5" to="#f5f0ea" />

      {/* ─── SERVICES ─── */}
      <section className="py-24 sm:py-32 px-6 bg-[#f5f0ea]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <p data-reveal="up" className="text-sm tracking-[0.3em] uppercase text-[#0A36C2]/50 mb-4 font-medium">
              {dict.home.services.tagline}
            </p>
            <h2 data-text-reveal="" className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1a1a2e] tracking-tight">
              {dict.home.services.title}
            </h2>
          </div>

          <div data-stagger="left" className="space-y-6">
            {dict.home.services.items.map((svc: { name: string; description: string; duration: string; level: string }) => (
              <div
                key={svc.name}
                data-magnetic=""
                className="group relative overflow-hidden rounded-2xl border border-[#0A36C2]/10 hover:border-[#0A36C2]/25 bg-white/40 backdrop-blur-sm transition-all duration-500 hover:shadow-xl hover:shadow-[#0A36C2]/5"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 p-6 sm:p-8">
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-[#1a1a2e] mb-2 group-hover:text-[#0A36C2] transition-colors duration-300">
                      {svc.name}
                    </h3>
                    <p className="text-[#1a1a2e]/50 text-sm leading-relaxed font-light">
                      {svc.description}
                    </p>
                  </div>
                  <div className="flex gap-4 text-xs tracking-wider uppercase shrink-0">
                    <span className="px-4 py-2 rounded-full bg-[#0A36C2]/8 text-[#0A36C2] font-medium">
                      {svc.duration}
                    </span>
                    <span className="px-4 py-2 rounded-full bg-[#1a1a2e]/5 text-[#1a1a2e]/60 font-medium">
                      {svc.level}
                    </span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#0A36C2] via-[#0A36C2]/50 to-[#0A36C2] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDividerAlt from="#f5f0ea" to="#faf8f5" />

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 sm:py-32 px-6 bg-[#faf8f5]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <p data-reveal="up" className="text-sm tracking-[0.3em] uppercase text-[#0A36C2]/50 mb-4 font-medium">
              {dict.home.testimonials.tagline}
            </p>
            <h2 data-reveal="up" data-reveal-delay="0.15" className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1a1a2e] tracking-tight">
              {dict.home.testimonials.title}
            </h2>
          </div>

          <div data-stagger="scale" className="grid md:grid-cols-3 gap-8">
            {dict.home.testimonials.items.map((t: { quote: string; name: string; location: string }) => (
              <div
                key={t.name}
                data-magnetic=""
                className="p-8 rounded-3xl bg-white/60 backdrop-blur-sm border border-[#0A36C2]/10 hover:border-[#0A36C2]/25 transition-all duration-500 hover:shadow-lg hover:shadow-[#0A36C2]/5"
              >
                <div className="text-4xl text-[#0A36C2]/20 font-serif mb-4">&ldquo;</div>
                <p className="text-[#1a1a2e]/70 leading-relaxed mb-6 font-light italic">
                  {t.quote}
                </p>
                <div>
                  <p className="text-sm font-medium text-[#1a1a2e]">{t.name}</p>
                  <p className="text-xs text-[#1a1a2e]/40 mt-1">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── UPCOMING EVENTS ─── */}
      <section className="py-28 sm:py-36 px-6 bg-[#f5f0ea]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16 gap-6">
            <div>
              <p data-reveal="up" className="text-sm tracking-[0.3em] uppercase text-[#0A36C2]/50 mb-4 font-medium">
                Mark Your Calendar
              </p>
              <h2 data-text-reveal="" className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1a1a2e] tracking-tight">
                Upcoming Gatherings
              </h2>
            </div>
            <Link
              href={`/${lang}/programs`}
              data-reveal="up"
              className="text-sm text-[#0A36C2] font-medium tracking-wide hover:underline underline-offset-4 shrink-0"
            >
              View all events &rarr;
            </Link>
          </div>

          <div data-stagger="up" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { date: "Apr 12", title: "New Moon Tarot Circle", time: "7:00 PM", tag: "Divination" },
              { date: "Apr 18", title: "Breathwork & Sound Bath", time: "6:30 PM", tag: "Ceremony" },
              { date: "Apr 25", title: "Yoga Under the Stars", time: "8:00 PM", tag: "Movement" },
              { date: "May 3", title: "Chakra Balancing Workshop", time: "2:00 PM", tag: "Healing" },
              { date: "May 10", title: "Full Moon Release Ritual", time: "7:30 PM", tag: "Ceremony" },
              { date: "May 17", title: "Intro to Tarot Reading", time: "11:00 AM", tag: "Workshop" },
            ].map((event) => (
              <div
                key={event.title}
                data-magnetic=""
                className="group relative p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-[#0A36C2]/8 hover:border-[#0A36C2]/25 transition-all duration-500 hover:shadow-lg hover:shadow-[#0A36C2]/5 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-xs tracking-wider uppercase text-[#0A36C2]/60 font-medium bg-[#0A36C2]/8 px-3 py-1.5 rounded-full">
                    {event.tag}
                  </div>
                  <span className="text-xs text-[#1a1a2e]/40 font-medium">{event.time}</span>
                </div>
                <div className="text-2xl font-light text-[#0A36C2] mb-2">{event.date}</div>
                <h3 className="text-lg font-medium text-[#1a1a2e] group-hover:text-[#0A36C2] transition-colors duration-300">
                  {event.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GALLERY / ATMOSPHERE ─── */}
      <section className="py-28 sm:py-36 px-6 bg-[#faf8f5]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p data-reveal="up" className="text-sm tracking-[0.3em] uppercase text-[#0A36C2]/50 mb-4 font-medium">
              The Space Between Worlds
            </p>
            <h2 data-text-reveal="" className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1a1a2e] tracking-tight">
              Our Atmosphere
            </h2>
          </div>

          <div data-stagger="scale" className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { h: "h-64", span: "md:col-span-2 md:row-span-2 md:h-full", label: "Sacred Space" },
              { h: "h-48", span: "", label: "Crystal Grid" },
              { h: "h-48", span: "", label: "Singing Bowls" },
              { h: "h-48", span: "", label: "Tarot Altar" },
              { h: "h-48", span: "", label: "Yoga Studio" },
              { h: "h-64", span: "col-span-2", label: "Ceremony Room" },
            ].map((item, i) => (
              <div
                key={i}
                className={`relative rounded-2xl overflow-hidden bg-[#1a1a2e]/5 ${item.h} ${item.span} group cursor-pointer`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[#1a1a2e]/20 text-sm tracking-[0.2em] uppercase font-medium group-hover:text-white/80 transition-colors duration-500">{item.label}</span>
                </div>
                {/* Placeholder dot pattern */}
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "24px 24px" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section className="py-20 sm:py-28 px-6 bg-[#f5f0ea]">
        <div className="max-w-2xl mx-auto text-center">
          <div data-line-draw="" className="w-16 h-px bg-[#0A36C2]/30 mx-auto mb-8" />
          <h2 data-reveal="up" className="text-2xl sm:text-3xl font-light text-[#1a1a2e] mb-4 tracking-tight">
            Whispers from the Ether
          </h2>
          <p data-reveal="up" data-reveal-delay="0.15" className="text-[#1a1a2e]/50 text-sm leading-relaxed font-light mb-10">
            Monthly insights, lunar guidance, and invitations to sacred gatherings — delivered to your inbox.
          </p>
          <div data-reveal="up" data-reveal-delay="0.3" className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-5 py-3.5 rounded-full bg-white/70 border border-[#0A36C2]/10 text-sm text-[#1a1a2e] placeholder:text-[#1a1a2e]/30 focus:outline-none focus:border-[#0A36C2]/30 focus:ring-2 focus:ring-[#0A36C2]/10 transition-all"
            />
            <button className="px-8 py-3.5 bg-[#0A36C2] hover:bg-[#0A36C2]/90 text-white text-sm font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#0A36C2]/20 shrink-0">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <WaveDividerAlt from="#f5f0ea" to="#0a0a1a" />

      {/* ─── CTA ─── */}
      <section className="relative py-32 sm:py-40 px-6 bg-[#0a0a1a] overflow-hidden">
        {/* Subtle glow orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div data-parallax="0.2" className="absolute top-[20%] left-[10%] w-64 h-64 rounded-full bg-[#0A36C2]/5 blur-3xl animate-breathe" />
          <div data-parallax="0.4" className="absolute bottom-[10%] right-[15%] w-80 h-80 rounded-full bg-[#0A36C2]/4 blur-3xl animate-breathe-slow" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
          <h2 data-reveal="up" className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mb-6">
            {dict.home.cta.title}
          </h2>
          <p data-reveal="up" data-reveal-delay="0.2" className="text-lg text-white/50 mb-12 font-light leading-relaxed">
            {dict.home.cta.description}
          </p>
          <div data-reveal="scale" data-reveal-delay="0.4">
            <Link
              href={`/${lang}/contact`}
              className="inline-block px-12 py-4 bg-[#0A36C2] hover:bg-[#0A36C2]/80 text-white rounded-full font-medium tracking-wide transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-[#0A36C2]/30"
            >
              {dict.home.cta.button}
            </Link>
            <p className="mt-6 text-sm text-white/30 tracking-wide">
              {dict.home.cta.note}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
