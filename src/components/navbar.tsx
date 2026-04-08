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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.includes("/intranet")) return null;

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
          ? "bg-transparent"
          : "bg-[#2d2926] border-b border-[#f0ede6]/10"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 flex items-center justify-between h-16">
        {/* Logo / studio name */}
        <Link
          href={`/${lang}`}
          className={`font-[family-name:var(--font-display)] text-lg font-light italic tracking-wide transition-colors duration-300 ${
            isTransparent ? "text-[#2d2926]/70" : "text-[#f0ede6]/80"
          }`}
        >
          {dict.metadata.title}
        </Link>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`label link-hover transition-colors duration-300 ${
                isTransparent
                  ? pathname === link.href
                    ? "text-[#b85c3a]"
                    : "text-[#2d2926]/40 hover:text-[#2d2926]/80"
                  : pathname === link.href
                    ? "text-[#d4af7a]"
                    : "text-[#f0ede6]/40 hover:text-[#f0ede6]/80"
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
                className="label px-5 py-2 border border-[#b85c3a] text-[#b85c3a] hover:bg-[#b85c3a] hover:text-[#f0ede6] transition-all duration-300"
              >
                {dict.nav.intranet}
              </Link>
            ) : (
              <Link
                href={`/${intranetLang}/signin`}
                className="label px-5 py-2 border border-[#b85c3a] text-[#b85c3a] hover:bg-[#b85c3a] hover:text-[#f0ede6] transition-all duration-300"
              >
                {dict.nav.signIn}
              </Link>
            )
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`sm:hidden p-2 transition-colors duration-300 ${isTransparent ? "text-[#2d2926]/60" : "text-[#f0ede6]/60"}`}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden bg-[#2d2926] border-t border-[#f0ede6]/10 px-6 py-6 space-y-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block label ${
                pathname === link.href ? "text-[#d4af7a]" : "text-[#f0ede6]/50"
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
                <Link href={`/${intranetLang}/intranet`} onClick={() => setMenuOpen(false)} className="block label text-[#b85c3a]">
                  {dict.nav.intranet}
                </Link>
              ) : (
                <Link href={`/${intranetLang}/signin`} onClick={() => setMenuOpen(false)} className="block label text-[#b85c3a]">
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
