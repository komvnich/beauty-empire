"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FaqContent } from "@/lib/directus";

const FALLBACK_FAQ: FaqContent = {
  heading: "Najczęściej zadawane pytania",
  items: [
    {
      question: "Czy przedłużanie włosów niszczy włosy?",
      answer:
        "Przy prawidłowym wykonaniu oraz regularnej korekcie przedłużanie włosów nie niszczy naturalnych włosów. W naszym salonie stosujemy delikatne metody oraz indywidualnie dobieramy kapsułki, dzięki czemu włosy pozostają w dobrej kondycji i mogą swobodnie rosnąć.",
    },
    {
      question: "Ile utrzymuje się przedłużanie włosów?",
      answer:
        "Efekt przedłużania włosów utrzymuje się zazwyczaj od 2,5 do 3 miesięcy. Po tym czasie zalecana jest korekta, aby zachować naturalny wygląd oraz komfort noszenia.",
    },
    {
      question: "Czy kapsułki są widoczne?",
      answer:
        "Nie. Stosujemy niewidoczne, ultra cienkie kapsułki, które są dopasowane do struktury włosów. Dzięki temu przedłużanie wygląda bardzo naturalnie, nawet przy wysokich upięciach.",
    },
    {
      question: "Czy można robić kucyk i upięcia?",
      answer:
        "Tak. Nasza metoda pozwala na noszenie wysokiego kucyka, koków oraz innych fryzur bez widocznych łączeń.",
    },
    {
      question: "Ile trwa zabieg przedłużania włosów?",
      answer:
        "Zabieg trwa zazwyczaj od 2 do 4 godzin, w zależności od ilości włosów oraz wybranego efektu.",
    },
    {
      question: "Ile kosztuje przedłużanie włosów w Warszawie?",
      answer:
        "Cena zależy od długości włosów, ilości (gramatury) oraz efektu końcowego. Dlatego każda wycena jest indywidualna. Najlepiej umówić się na bezpłatną konsultację, aby poznać dokładny koszt.",
    },
    {
      question: "Czy można farbować przedłużane włosy?",
      answer:
        "Tak, jednak zalecamy wykonywanie koloryzacji w naszym salonie. Dzięki temu możemy dobrać odpowiednie produkty i zachować jakość włosów.",
    },
    {
      question: "Jak dbać o przedłużane włosy?",
      answer:
        "Pielęgnacja jest kluczowa dla trwałości efektu. Każda klientka otrzymuje od nas dokładne wskazówki oraz indywidualnie dobraną pielęgnację domową. Możesz również pobrać nasz poradnik PDF z instrukcją pielęgnacji.",
    },
    {
      question: "Czy przedłużane włosy są wygodne?",
      answer:
        "Tak. Dzięki lekkim kapsułkom i odpowiedniemu rozłożeniu ciężaru włosy są komfortowe i praktycznie niewyczuwalne.",
    },
    {
      question: "Czy można myć włosy normalnie?",
      answer:
        "Tak. Włosy można myć normalnie, jednak ważne jest stosowanie odpowiednich produktów i techniki mycia.",
    },
    {
      question: "Czy przedłużanie włosów jest dla każdego?",
      answer:
        "W większości przypadków tak. Podczas konsultacji oceniamy stan włosów i dobieramy najlepszą metodę, aby zabieg był bezpieczny i skuteczny.",
    },
    {
      question: "Jak często trzeba robić korektę?",
      answer:
        "Korekta wykonywana jest zazwyczaj co 2,5–3 miesiące, w zależności od tempa wzrostu włosów.",
    },
    {
      question: "Czy można spać w przedłużanych włosach?",
      answer:
        "Tak, jednak zalecamy związywanie włosów w luźny warkocz lub kucyk na noc.",
    },
    {
      question: "Czy przedłużane włosy się plączą?",
      answer:
        "Nie, jeśli są odpowiednio pielęgnowane. Dlatego tak ważne jest stosowanie zaleconych kosmetyków i regularna pielęgnacja.",
    },
  ],
};

interface FAQListProps {
  data?: FaqContent;
}

export function FAQList({ data }: FAQListProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const content = data ?? FALLBACK_FAQ;

  return (
    <section id="faq" className="w-full bg-[#0B0B0B] py-32 px-4 lg:px-32 flex flex-col items-center gap-16">
      <h2 className="font-serif text-5xl font-medium text-white text-center">{content.heading}</h2>

      <div className="flex flex-col gap-6 w-full max-w-[800px]">
        {content.items.map((faq, idx) => (
          <div
            key={idx}
            className={cn(
              "p-8 rounded-[16px] border transition-all cursor-pointer group",
              openIdx === idx
                ? "bg-[#1E1E27] border-[#C09448]/50 shadow-lg shadow-[#C09448]/5"
                : "bg-white/5 border-white/5 hover:border-white/10"
            )}
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
          >
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <HelpCircle
                  className={cn(
                    "w-6 h-6 transition-colors",
                    openIdx === idx ? "text-[#C09448]" : "text-white/20"
                  )}
                />
                <h3 className="font-serif text-xl font-medium text-white transition-colors group-hover:text-[#C09448]">
                  {faq.question}
                </h3>
              </div>
              <ChevronDown
                className={cn(
                  "w-6 h-6 transition-transform duration-300",
                  openIdx === idx ? "rotate-180 text-[#C09448]" : "text-white/20"
                )}
              />
            </div>

            <div
              className={cn(
                "grid transition-all duration-300 overflow-hidden",
                openIdx === idx ? "grid-rows-[1fr] mt-6 opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="min-h-0">
                <p className="font-sans text-lg text-white/60 leading-relaxed border-t border-white/5 pt-6">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
