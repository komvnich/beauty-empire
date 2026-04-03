"use client";

import Image from "next/image";
import type { AboutSalonContent } from "@/lib/directus";

interface AboutSalonProps {
  data?: AboutSalonContent;
}

export function AboutSalon({ data }: AboutSalonProps) {
  const content = data || {
    headingBefore: "Eksperci w",
    headingHighlight: "przedłużaniu włosów",
    headingAfter: "w Warszawie",
    paragraph1:
      "W salonie Beauty Empire specjalizujemy się w profesjonalnym przedłużaniu włosów, zagęszczaniu włosów oraz regeneracji i pielęgnacji włosów w Warszawie.",
    paragraph2:
      "Każda metamorfoza jest indywidualnie dopasowana do struktury Twoich włosów. Dobieramy idealny kolor, długość oraz objętość, aby efekt wyglądał naturalnie i harmonijnie.",
    paragraph3:
      "Pracujemy wyłącznie na naturalnych włosach premium, które zapewniają piękny wygląd i komfort noszenia każdego dnia. Dbamy nie tylko o efekt wizualny, ale również o kondycję Twoich naturalnych włosów - naszym celem jest ich zdrowy wzrost i zagęszczenie.",
    image: "/images/generated-1773863101155.png"
  };

  return (
    <section id="o-nas" className="w-full bg-[#1E1E27] py-32 px-4 lg:px-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse gap-20 items-center">
        <div className="flex-1 flex flex-col gap-8">
          <h2 className="text-4xl md:text-5xl font-medium text-white leading-tight">
            {content.headingBefore} <span className="text-gold">{content.headingHighlight}</span> {content.headingAfter}
          </h2>
          <div className="flex flex-col gap-6 font-sans text-lg text-white/70 leading-relaxed">
            <p>{content.paragraph1}</p>
            <p>{content.paragraph2}</p>
            <p>{content.paragraph3}</p>
          </div>
        </div>

        <div className="flex-1 relative">
          <div className="relative aspect-square rounded-[32px] overflow-hidden z-10 shadow-2xl">
            <Image
              src={content.image || "/images/generated-1773863101155.png"}
              alt="Eksperci Beauty Empire"
              fill
              className="object-cover"
            />
          </div>
          {/* Decorative element */}
          <div className="absolute -top-10 -left-10 w-40 h-40 border-2 border-gold/20 rounded-full animate-pulse z-0" />
          <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-gold/5 rounded-full blur-3xl z-0" />
        </div>
      </div>
    </section>
  );
}
