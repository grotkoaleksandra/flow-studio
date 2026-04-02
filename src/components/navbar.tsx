"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/i18n/types";
import { type Locale, INTRANET_LOCALES } from "@/i18n/config";
import { LanguageSwitcher } from "./language-switcher";
import { useAuth } from "@/contexts/auth-context";
import { useState, useEffect } from "react";

export function Navbar({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, loading } = useAuth();

  const intranetLang = INTRANET_LOCALES.includes(lang) ? lang : "en";

  // Track scroll for navbar transparency
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.includes("/intranet")) {
    return null;
  }

  // Check if we're on the home page (hero has dark bg)
  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;
  const isTransparent = isHome && !scrolled && !menuOpen;

  const links = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/programs`, label: dict.nav.programs },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isTransparent
          ? "bg-transparent border-transparent"
          : "bg-white/90 backdrop-blur-md border-b border-sand shadow-sm"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <Link
          href={`/${lang}`}
          className={`text-xl font-light tracking-wide transition-colors duration-300 ${
            isTransparent ? "text-[#0A36C2]/60" : "text-charcoal"
          }`}
        >
          {dict.metadata.title}
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-light tracking-wide transition-colors duration-300 ${
                isTransparent
                  ? pathname === link.href
                    ? "text-[#0A36C2]/70"
                    : "text-[#0A36C2]/40 hover:text-[#0A36C2]/70"
                  : pathname === link.href
                    ? "text-sage-dark"
                    : "text-muted hover:text-charcoal"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher lang={lang} />
          {!loading && (
            user ? (
              <Link
                href={`/${intranetLang}/intranet`}
                className={`text-sm font-medium px-5 py-2 rounded-full transition-all duration-300 ${
                  isTransparent
                    ? "bg-[#0A36C2]/10 border border-[#0A36C2]/20 text-[#0A36C2] hover:bg-[#0A36C2]/20"
                    : "bg-sage text-white hover:bg-sage-dark"
                }`}
              >
                {dict.nav.intranet}
              </Link>
            ) : (
              <Link
                href={`/${intranetLang}/signin`}
                className={`text-sm font-medium px-5 py-2 rounded-full transition-all duration-300 ${
                  isTransparent
                    ? "bg-[#0A36C2]/10 border border-[#0A36C2]/20 text-[#0A36C2] hover:bg-[#0A36C2]/20"
                    : "bg-sage text-white hover:bg-sage-dark"
                }`}
              >
                {dict.nav.signIn}
              </Link>
            )
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`sm:hidden p-2 transition-colors ${isTransparent ? "text-white" : "text-charcoal"}`}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden border-t border-sand bg-white/95 backdrop-blur-md px-6 py-6 space-y-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block text-sm font-light tracking-wide ${
                pathname === link.href ? "text-sage-dark" : "text-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <LanguageSwitcher lang={lang} />
          </div>
          {!loading && (
            <div className="pt-2">
              {user ? (
                <Link
                  href={`/${intranetLang}/intranet`}
                  onClick={() => setMenuOpen(false)}
                  className="block text-sm font-medium text-sage-dark"
                >
                  {dict.nav.intranet}
                </Link>
              ) : (
                <Link
                  href={`/${intranetLang}/signin`}
                  onClick={() => setMenuOpen(false)}
                  className="block text-sm font-medium text-sage-dark"
                >
                  {dict.nav.signIn}
                </Link>
              )}
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
