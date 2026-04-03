"use client";

import { CheckCircle2, MoveRight } from "lucide-react";
import Image from "next/image";
import type { AuthorMethodContent } from "@/lib/directus";

interface AuthorMethodProps {
  data?: AuthorMethodContent;
}

export function AuthorMethod({ data }: AuthorMethodProps) {
  const content = data || {
    headingBefore: "Poznaj naszą",
    headingHighlight: "autorską metodę",
    headingAfter: "keratynową",
    paragraphPrimary:
      "Nasza autorska metoda przedłużania włosów została stworzona dla kobiet, które oczekują maksymalnie naturalnego efektu bez komпроmisów. To idealne rozwiązanie zarówno dla osób z cienkimi, delikatnymi włosami, jak i dla tych, które chcą uzyskać spektakularną objętość i długość bez obciążania swoich naturalnych włosów.",
    paragraphSecondary:
      "Dzięki indywidualnemu dopasowaniu kapsułek oraz pracy na włosach premium, efekt jest lekki, komfortowy i niemal niewyczuwalny.",
    sectionTitle: "Dlaczego nasza metoda?",
    ctaLabel: "Umów bezpłatną konsultację",
    image: "/images/generated-1773861813065.png",
    points: [
      "ultra-cienkie, niewidoczne kapsułki keratynowe",
      "indywidualny dobór wielkości kapsułek do struktury włosów",
      "bezpieczna metoda nawet dla cienkich i delikatnych włosów",
      "komfort noszenia – bez ciągnięcia i dyskomfortu",
      "trwały efekt na wiele tygodni",
      "naturalny wygląd – efekt jak Twoje własne włosy",
      "możliwość noszenia wysokich upięć i kucyków",
    ],
  };

  const handleScrollToContact = () => {
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="metoda" className="w-full bg-[#0B0B0B] py-32 px-4 lg:px-32">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
        <div className="flex-1 flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl md:text-5xl font-medium text-white leading-tight">
              {content.headingBefore} <span className="text-gold">{content.headingHighlight}</span> {content.headingAfter}
            </h2>
            <p className="font-sans text-xl text-white/70 leading-relaxed">
              {content.paragraphPrimary}
            </p>
            <p className="font-sans text-lg text-white/50 leading-relaxed">
              {content.paragraphSecondary}
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <h3 className="text-2xl font-bold text-white">{content.sectionTitle}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.points.map((item) => (
                <div key={item} className="flex gap-3 items-start group">
                  <CheckCircle2 className="w-6 h-6 text-gold shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-white/80 font-sans text-base">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleScrollToContact}
            className="flex items-center gap-3 bg-gold text-black px-12 py-5 rounded-full text-base font-black hover:bg-gold/90 transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-gold/20 uppercase tracking-widest mt-4 w-fit"
          >
            {content.ctaLabel} <MoveRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 relative aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl shadow-gold/5">
          <Image
            src={content.image || "/images/generated-1773861813065.png"}
            alt="Autorska metoda keratynowa"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}
