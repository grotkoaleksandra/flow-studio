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
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 2);
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
          : "bg-[#fffff8] border-b border-[#002394]/8"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href={`/${lang}`}
          className={`font-[family-name:var(--font-display)] text-lg font-[700] tracking-tight transition-colors duration-300 ${
            isTransparent ? "text-[#002394]/60" : "text-[#002394]"
          }`}
        >
          Syrena
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
                    ? "text-[#002394]"
                    : "text-[#002394]/35 hover:text-[#002394]"
                  : pathname === link.href
                    ? "text-[#002394]"
                    : "text-[#002394]/35 hover:text-[#002394]"
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
                className="btn-pill btn-pill-green text-xs py-2 px-5"
              >
                {dict.nav.intranet}
              </Link>
            ) : (
              <Link
                href={`/${intranetLang}/signin`}
                className="btn-pill btn-pill-green text-xs py-2 px-5"
              >
                {dict.nav.signIn}
              </Link>
            )
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden p-2 text-[#002394]/60"
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
        <div className="sm:hidden bg-[#fffff8] border-t border-[#002394]/8 px-6 py-6 space-y-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block label ${
                pathname === link.href ? "text-[#002394]" : "text-[#002394]/40"
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
                <Link href={`/${intranetLang}/intranet`} onClick={() => setMenuOpen(false)} className="block label text-[#85ff9f]">
                  {dict.nav.intranet}
                </Link>
              ) : (
                <Link href={`/${intranetLang}/signin`} onClick={() => setMenuOpen(false)} className="block label text-[#85ff9f]">
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
