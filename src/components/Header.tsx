"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";

export default function Header() {
  const t = useTranslations("nav");
  const tLang = useTranslations("language");
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { href: "/about", label: t("about") },
    { href: "/products", label: t("products") },
    { href: "/portfolio", label: t("portfolio") },
    { href: "/artikel", label: t("articles") },
    { href: "/contact", label: t("contact") },
  ];

  const languages = [
    { code: "zh", label: tLang("zh") },
    { code: "en", label: tLang("en") },
    { code: "id", label: tLang("id") },
  ];

  return (
    <header className="site-header">
      <Link className="brand header-brand" href="/" aria-label="PT KWD PURIFIED COLOUR BOARD — Home">
        <span className="brand-symbol">
          <img src="/kwd-symbol.png" alt="" width="383" height="233" />
        </span>
        <span className="brand-type">
          <b>PT.KWD</b>
          <small>PURIFIED COLOUR BOARD</small>
        </span>
      </Link>

      <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-7">
        {navItems.map((item) =>
          item.href.startsWith("#") ? (
            <a key={item.href} href={item.href} className="text-[#43556a] text-[11px] tracking-wide hover:text-[var(--blue)] transition-colors duration-200">
              {item.label}
            </a>
          ) : (
            <Link key={item.href} href={item.href} className="text-[#43556a] text-[11px] tracking-wide hover:text-[var(--blue)] transition-colors duration-200">
              {item.label}
            </Link>
          )
        )}
      </nav>

      <div className="flex items-center gap-2 justify-self-end">
        <div className="languages hidden sm:flex">
          {languages.map((lang) => (
            <Link
              key={lang.code}
              href={pathname}
              locale={lang.code as "id" | "en" | "zh"}
              className={lang.code === locale ? "active" : ""}
              aria-pressed={lang.code === locale}
            >
              {lang.label}
            </Link>
          ))}
        </div>
        <button
          className="lg:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className="w-5 h-[1.5px] bg-[var(--ink)]" />
          <span className="w-5 h-[1.5px] bg-[var(--ink)]" />
          <span className="w-5 h-[1.5px] bg-[var(--ink)]" />
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white/97 border-b border-[var(--line)] shadow-lg z-50 px-6 py-6 flex flex-col gap-4">
          {navItems.map((item) =>
            item.href.startsWith("#") ? (
              <a key={item.href} href={item.href} className="text-[#43556a] text-sm" onClick={() => setMobileOpen(false)}>
                {item.label}
              </a>
            ) : (
              <Link key={item.href} href={item.href} className="text-[#43556a] text-sm" onClick={() => setMobileOpen(false)}>
                {item.label}
              </Link>
            )
          )}
          <div className="flex gap-2 mt-2">
            {languages.map((lang) => (
              <Link
                key={lang.code}
                href={pathname}
                locale={lang.code as "id" | "en" | "zh"}
                className={`text-xs px-2 py-1 ${lang.code === locale ? "text-[var(--blue)] font-bold border-b-2 border-[var(--blue)]" : "text-[#5f7185]"}`}
                onClick={() => setMobileOpen(false)}
              >
                {lang.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
