"use client";

import { CheckCircle, MoveRight } from "lucide-react";
import Image from "next/image";
import type { BenefitsContent } from "@/lib/directus";

interface BenefitsProps {
  data?: BenefitsContent;
}

export function Benefits({ data }: BenefitsProps) {
  const content = data || {
    headingWhite: "Co osiągniesz dzięki",
    headingGold: "przedłużaniu włosów?",
    ctaLabel: "Chcę taki efekt",
    image: "/images/generated-1773862999493.png",
    items: [
    {
      title: "Włosy premium – dziewicze i farbowane",
      description:
        "Wyłącznie naturalne włosy najwyższej klasy, dostępne tylko u nas.",
    },
    {
      title: "Autorska metoda keratynowa",
      description:
        "Bezpieczna, lekka i całkowicie niewidoczna technika przedłużania.",
    },
    {
      title: "Niewidoczne, ultra cienkie kapsułki",
      description:
        "Komfort noszenia i naturalny efekt nawet przy wysokich upięciach.",
    },
    {
      title: "Indywidualne dopasowanie",
      description:
        "Każda aplikacja jest dobierana do struktury Twoich naturalnych włosów.",
    },
    ],
  };

  return (
    <section className="w-full bg-[#0B0B0B] py-32 px-4 lg:px-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center max-w-7xl mx-auto">
        <div className="relative aspect-[4/5] lg:aspect-square rounded-[32px] overflow-hidden shadow-2xl shadow-emerald-deep/20">
          <Image
            src={content.image || "/images/generated-1773862999493.png"}
            alt="Metamorfoza włosów"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <h2 className="text-5xl font-bold leading-tight text-white mb-2 max-w-[500px]">
              {content.headingWhite} <br />
              <span className="text-gold">{content.headingGold}</span>
            </h2>
          </div>

          <div className="flex flex-col gap-10">
            {content.items.map((benefit) => (
              <div
                key={`${benefit.title}-${benefit.description}`}
                className="flex gap-6 group transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-deep/50 border border-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold transition-all">
                  <CheckCircle className="w-7 h-7 text-white transition-colors" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-bold text-white group-hover:text-gold transition-colors leading-tight">
                    {benefit.title}
                  </h3>
                  <p className="font-sans text-white/50 text-base leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => document.getElementById("nasze-usługi")?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-3 bg-gold text-black px-12 py-5 rounded-full text-base font-black hover:bg-gold/90 transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-gold/20 uppercase tracking-widest mt-4 w-fit"
          >
            {content.ctaLabel} <MoveRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
