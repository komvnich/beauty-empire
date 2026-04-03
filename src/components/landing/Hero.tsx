"use client";

import { useRef } from "react";
import Image from "next/image";
import { MoveRight } from "lucide-react";

interface HeroProps {
  data?: {
    preTitle?: string;
    titleWhite: string;
    titleGold: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary?: string;
    imageDesktop?: string;
    imageMobile?: string;
  }
}

export function Hero({ data }: HeroProps) {
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!imageRef.current) return;
    const { clientX, clientY, currentTarget } = e;
    const { width, height } = currentTarget.getBoundingClientRect();
    const x = ((clientX / width) - 0.5) * 30;
    const y = ((clientY / height) - 0.5) * 30;
    imageRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
  };

  const handleMouseLeave = () => {
    if (!imageRef.current) return;
    imageRef.current.style.transform = "translate(0, 0) scale(1)";
  };

  const handleScrollToContact = () => {
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
  };

  // Fallback defaults if data is undefined
  const content = data || {
    preTitle: "METAMORPHOSE SENSATION",
    titleWhite: "Przedłużanie włosów",
    titleGold: "WARSZAWA PREMIUM",
    description: "Autorska metoda keratynowa i włosy najwyższej jakości.",
    ctaPrimary: "Umów się",
    imageDesktop: "/images/generated-1773861590996.png"
  };

  const heroImage = content.imageDesktop || "/images/generated-1773861590996.png";

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative isolate flex min-h-[100svh] w-full flex-col items-start justify-center overflow-hidden px-4 py-16 lg:px-32 lg:py-24 pt-[max(6rem,calc(5rem+env(safe-area-inset-top,0px)))]"
    >
      <div ref={imageRef} className="pointer-events-none absolute inset-[-30px] z-0 transition-transform duration-300 ease-out">
        <Image
          src={heroImage}
          alt="Beauty Empire Warsaw Hero"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] bg-[#0B0B0B]/75" />

      <div className="relative z-10 flex w-full max-w-[900px] flex-col gap-8 animate-in fade-in slide-in-from-left-10 duration-1000">
        <div className="flex flex-col gap-2">
            {content.preTitle && (
                <span className="text-gold font-medium tracking-[0.3em] text-sm uppercase">
                    {content.preTitle}
                </span>
            )}
            <h1 className="text-4xl md:text-6xl font-medium leading-[1.1] text-white tracking-tight uppercase">
                {content.titleWhite} <br />
                <span className="text-gold">{content.titleGold}</span>
            </h1>
        </div>
        
        <p className="font-sans text-lg md:text-xl text-white/80 max-w-[700px] leading-relaxed">
          {content.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6 mt-6">
          <button
            onClick={handleScrollToContact}
            className="group flex items-center gap-3 bg-gold text-black px-12 py-6 rounded-full text-base font-black hover:bg-gold/90 transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-gold/30 uppercase tracking-widest"
          >
            {content.ctaPrimary} <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          {content.ctaSecondary && (
            <button
                onClick={() => document.getElementById("cennik")?.scrollIntoView({ behavior: "smooth" })}
                className="text-white/60 hover:text-white transition-colors border-b border-white/20 pb-1 text-sm tracking-widest uppercase"
            >
                {content.ctaSecondary}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
