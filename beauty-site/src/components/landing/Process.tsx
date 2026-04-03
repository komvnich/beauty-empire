"use client";

import Image from "next/image";
import { MoveRight } from "lucide-react";
import type { ProcessContent } from "@/lib/directus";

interface ProcessProps {
  data?: ProcessContent;
}

export function Process({ data }: ProcessProps) {
  const fallbackContent: ProcessContent = {
    headingBefore: "Jak wygląda profesjonalne",
    headingHighlight: "przedłużanie",
    headingAfter: "włosów?",
    ctaLabel: "Chcę efekt „wow”",
    image: "/images/generated-1773861813065.png",
    steps: [
    {
      title: "Konsultacja",
      description:
        "Analizujemy długość, gęstość i strukturę Twoich włosów, aby dobrać najlepszą metodę i idealny efekt.",
      icon: "01",
    },
    {
      title: "Indywidualny dobór włosów",
      description:
        "Dobieramy idealny kolor, długość i gramaturę włosów premium, które wyglądają jak Twoje naturalne.",
      icon: "02",
    },
    {
      title: "Przygotowanie włosów",
      description:
        "Oczyszczamy и przygotowujemy pasma, aby zapewnić trwałość i bezpieczeństwo przedłużania.",
      icon: "03",
    },
    {
      title: "Przedłużanie włosów",
      description:
        "Stylistka wykonuje zabieg autorską metodą keratynową – kapsułki są niewidoczne и ultra-małe.",
      icon: "04",
    },
    {
      title: "Metamorfoza",
      description:
        "Na koniec wykonujemy stylizację – cieszysz się gęstymi, długimi włosami bez efektu sztuczności.",
      icon: "05",
    },
    ]
  };
  const content = data || fallbackContent;
  const steps = content.steps;

  const handleScrollToContact = () => {
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="proces" className="w-full bg-[#0B0B0B] py-32 px-4 lg:px-32 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24 overflow-hidden">
      <div className="flex flex-col gap-12 lg:gap-20">
        <h2 className="font-serif text-5xl leading-[1.15] text-white">
          {content.headingBefore} <br />
          <span className="text-[#C09448]">{content.headingHighlight}</span> {content.headingAfter}
        </h2>

        <div className="flex flex-col gap-10">
          {steps.map((step, idx) => (
            <div key={idx} className="flex gap-4 group">
              <div className="w-16 h-16 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C09448] rounded-full transition-colors relative z-10">
                <span className="text-2xl font-black text-[#C09448] group-hover:text-black transition-colors">
                  {step.icon}
                </span>
                {idx < steps.length - 1 && (
                  <div className="absolute top-16 left-1/2 -translate-x-1/2 w-0.5 h-16 bg-white/5 group-hover:bg-[#C09448]/20 transition-all z-0" />
                )}
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <h3 className="font-serif text-2xl font-medium text-white group-hover:text-[#C09448] transition-colors">
                  {step.title}
                </h3>
                <p className="font-sans text-white/60 text-lg leading-relaxed max-w-[450px]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <button
            onClick={handleScrollToContact}
            className="flex items-center gap-3 bg-gold text-black px-12 py-5 rounded-full text-base font-black hover:bg-gold/90 transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-gold/20 uppercase tracking-widest mt-4 w-fit"
          >
            {content.ctaLabel} <MoveRight className="w-5 h-5" />
          </button>
      </div>

      <div className="relative w-full lg:w-[500px] h-[700px] flex-shrink-0 rounded-[24px] group overflow-hidden">
        <Image
          src={content.image || fallbackContent.image}
          alt="Hair Extension Process"
          fill
          className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
    </section>
  );
}
