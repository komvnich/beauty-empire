"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MoveRight, Menu, X, ChevronDown, Globe } from "lucide-react";
import { setCookie, getCookie } from "cookies-next";

interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  navItems: NavItem[];
  ctaLabel: string;
  currentLang?: string;
}

const languages = [
  { code: "pl-PL", label: "PL", name: "Polski" },
  { code: "ru-RU", label: "RU", name: "Русский" },
  { code: "uk-UA", label: "UA", name: "Українська" },
  { code: "en-US", label: "EN", name: "English" },
];

export function Header({ navItems, ctaLabel, currentLang = "pl-PL" }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => setIsOpen(false);

  const handleScrollToContact = () => {
    handleClose();
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
  };

  const changeLanguage = (code: string) => {
    setCookie("NEXT_LOCALE", code, { maxAge: 60 * 60 * 24 * 30 });
    window.location.reload(); // Quick way to re-fetch translations from server
  };

  const currentLangData = languages.find(l => l.code === currentLang) || languages[0];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 h-[80px] border-b border-white/5 bg-emerald-deep/90 backdrop-blur-md px-4 lg:px-32 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative w-16 h-16 md:w-20 md:h-20 transition-transform group-hover:scale-110 duration-300">
            <Image
              src="/images/logo.png"
              alt="Beauty Empire Logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-serif text-sm md:text-lg tracking-[0.25em] text-white transition-colors group-hover:text-gold uppercase leading-none">
              BEAUTY EMPIRE
            </span>
            <span className="font-sans text-[6px] md:text-[8px] uppercase tracking-[0.6em] text-gold font-bold leading-none">
              WARSAW
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-xs font-medium text-white/80 hover:text-gold transition-colors tracking-wide uppercase"
            >
              {item.label}
            </Link>
          ))}

          {/* Language Switcher */}
          <div className="relative">
            <button 
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 text-white/80 hover:text-gold transition-colors px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-bold"
            >
              <Globe className="w-4 h-4 text-gold" />
              {currentLangData.label}
              <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
            </button>

            {langOpen && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-emerald-deep/95 border border-white/10 rounded-xl overflow-hidden backdrop-blur-xl shadow-2xl">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                        changeLanguage(lang.code);
                        setLangOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-xs font-medium transition-colors hover:bg-gold/10 ${
                      currentLang === lang.code ? 'text-gold bg- gold/5' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleScrollToContact}
            className="flex items-center gap-3 bg-gold text-black px-6 py-2.5 rounded-full text-[10px] font-black hover:bg-gold/90 transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-gold/20 uppercase tracking-widest"
          >
            {ctaLabel} <MoveRight className="w-4 h-4" />
          </button>
        </nav>

        {/* Mobile Header Icons */}
        <div className="flex items-center gap-4 xl:hidden">
            {/* Mobile Lang */}
            <div className="relative">
                <button 
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 text-white/80 px-2 py-1.5 rounded-lg border border-white/10 text-[10px] font-bold"
                >
                    {currentLangData.label}
                </button>
                {langOpen && (
                    <div className="absolute top-full right-0 mt-2 w-32 bg-emerald-deep border border-white/10 rounded-lg shadow-xl z-50">
                        {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className="w-full text-left px-3 py-2 text-[10px] text-white hover:bg-white/10"
                        >
                            {lang.name}
                        </button>
                        ))}
                    </div>
                )}
            </div>
            
            <button
            onClick={() => setIsOpen(true)}
            className="w-10 h-10 flex items-center justify-center text-white hover:text-gold transition-colors"
            >
            <Menu className="w-6 h-6" />
            </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-500 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-emerald-deep/98 backdrop-blur-xl" />

        <div
          className={`relative z-10 flex flex-col items-center justify-between h-full py-10 px-6 transition-transform duration-500 ${
            isOpen ? "translate-y-0" : "-translate-y-10"
          }`}
        >
          {/* Top: Logo + Close */}
          <div className="flex items-center justify-between w-full">
            <Link href="/" className="flex items-center gap-3" onClick={handleClose}>
              <div className="relative w-16 h-16">
                <Image
                  src="/images/logo.png"
                  alt="Beauty Empire Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg tracking-[0.2em] text-white uppercase leading-none font-bold">
                  BEAUTY EMPIRE
                </span>
                <span className="text-[8px] uppercase tracking-[0.5em] text-gold font-bold leading-none">
                  WARSAW
                </span>
              </div>
            </Link>
            <button
              onClick={handleClose}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-black hover:border-gold transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Center: Nav Links */}
          <nav className="flex flex-col items-center gap-8">
            {navItems.map((item, idx) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={handleClose}
                className="text-3xl font-bold text-white hover:text-gold transition-colors tracking-wide"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Bottom: CTA */}
          <button
            onClick={handleScrollToContact}
            className="flex items-center gap-3 bg-gold text-black px-12 py-5 rounded-full text-base font-black hover:bg-gold/90 transition-all shadow-lg shadow-gold/20 uppercase tracking-widest w-full justify-center"
          >
            {ctaLabel} <MoveRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
}
