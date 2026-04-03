"use client";

import { CheckCircle2, FileDown, AlertTriangle } from "lucide-react";
import type { EducationContent } from "@/lib/directus";

interface EducationProps {
  data?: EducationContent;
}

export function Education({ data }: EducationProps) {
  const fallbackData: EducationContent = {
    headingBefore: "Czy przedłużanie włosów",
    headingHighlight: "niszczy włosy?",
    introPrimary: "Przy prawidłowym wykonaniu oraz regularnej korekcie przedłużanie włosów nie niszczy naturalnych włosów i pozwala im swobodnie rosnąć.",
    introSecondary: "Nasze stylistki specjalizują się w bardzo delikatnym przedłużaniu, wykorzystując indywidualnie dobrane kapsułki, które są dopasowane do struktury i gęstości włosów.",
    keyTitle: "Klucz do pięknego efektu",
    keyDescription: "Dbamy nie tylko o sam zabieg, ale również o Twoje włosy po wyjściu z salonu. Każda klientka otrzymuje od nas dokładne wskazówki: jak prawidłowo nosić przedłużane włosy, jak je pielęgnować i jakich produktów używać.",
    guideButtonLabel: "Pobierz darmowy poradnik PDF",
    guideFileUrl: "/poradnik-pielegnacji.pdf",
    warningBadgeLabel: "Bardzo ważne",
    warningText: "Regularnie kontrolujemy stan przedłużania i przypominamy o odpowiednim terminie korekty.",
    warningPoints: ["włosy pozostają w dobrej kondycji", "efekt wygląda naturalnie", "noszenie jest komfortowe"],
    quoteText: "„Przedłużanie włosów to zawsze współpraca stylisty i klientki. Tylko dzięki odpowiedniej pielęgnacji możemy uzyskać piękny, trwały i bezpieczny efekt.”"
  };
  const content = data || fallbackData;

  return (
    <section id="edukacja" className="w-full bg-[#1A1A22] py-32 px-4 lg:px-32">
      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="flex-1 flex flex-col gap-8">
            <h2 className="text-4xl md:text-5xl font-medium text-white leading-tight">
              {content.headingBefore} <span className="text-gold">{content.headingHighlight}</span>
            </h2>
            <p className="font-sans text-xl text-white/70 leading-relaxed">
              {content.introPrimary}
            </p>
            <p className="font-sans text-lg text-white/50 leading-relaxed">
              {content.introSecondary}
            </p>
          </div>

          <div className="flex-1 bg-[#23232D] p-10 rounded-[32px] border border-gold/10 flex flex-col gap-8 shadow-xl shadow-black/20">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                 <CheckCircle2 className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-2xl font-bold text-white">{content.keyTitle}</h3>
            </div>
            <p className="font-sans text-white/60 text-lg leading-relaxed">
              {content.keyDescription}
            </p>
            <a 
              href={content.guideFileUrl || fallbackData.guideFileUrl}
              download
              className="flex items-center justify-center gap-3 bg-white/5 border border-gold/30 text-gold px-8 py-5 rounded-full text-base font-bold hover:bg-gold hover:text-black transition-all group"
            >
              <FileDown className="w-5 h-5 group-hover:bounce" />
              {content.guideButtonLabel}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           <div className="flex flex-col gap-6 p-8 rounded-[24px] bg-black/20 border border-white/5">
              <div className="flex items-center gap-3 text-gold">
                 <AlertTriangle className="w-5 h-5" />
                 <span className="font-bold uppercase tracking-wider text-sm">{content.warningBadgeLabel}</span>
              </div>
              <p className="text-white/80 font-sans leading-relaxed">
                {content.warningText}
              </p>
              <ul className="flex flex-col gap-3">
                 {content.warningPoints.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-white/50 text-sm italic">
                       <CheckCircle2 className="w-4 h-4 text-gold/40" />
                       {item}
                    </li>
                 ))}
              </ul>
           </div>
           
           <div className="md:col-span-1 lg:col-span-2 flex items-center p-8 rounded-[24px] bg-gold/5 border border-gold/10">
              <p className="text-white/90 font-serif text-2xl italic leading-relaxed text-center w-full">
                {content.quoteText}
              </p>
           </div>
        </div>
      </div>
    </section>
  );
}
