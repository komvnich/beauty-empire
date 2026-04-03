"use client";

import Image from "next/image";
import { MoveRight } from "lucide-react";

export function PricingCTA() {
  const handleScrollToContact = () => {
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="kontakt-cta" className="relative w-full h-[800px] overflow-hidden flex items-center justify-center p-4 lg:p-32 group">
      <Image
        src="/images/generated-1773863400218.png"
        alt="Pricing Consultations"
        fill
        className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-[#0B0B0B]/85" />

      <div className="relative z-10 w-full max-w-[900px] flex flex-col items-center text-center gap-10 p-12 lg:p-20 border border-[#C09448]/30 rounded-[4px] bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm shadow-2xl shadow-[#C09448]/10 animate-in fade-in zoom-in-95 duration-1000">
        <h2 className="font-serif text-4xl lg:text-5xl leading-tight text-[#C09448]">
          Poznaj cenę swojego <br />
          przedłużania włosów
        </h2>
        <p className="font-sans text-lg lg:text-xl text-white/90 max-w-[700px] leading-relaxed">
          Umów się na bezpłatną konsultację i sprawdź, jaki efekt możemy stworzyć dla Ciebie oraz ile będzie kosztować.
        </p>
        <button
          onClick={handleScrollToContact}
          className="flex items-center gap-4 bg-[#C09448] text-white px-12 py-5 rounded-full text-base lg:text-lg font-bold hover:bg-[#A67F3D] transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-[#C09448]/30 uppercase tracking-widest ring-4 ring-[#C09448]/10"
        >
          Umów bezpłatną konsultację <MoveRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
