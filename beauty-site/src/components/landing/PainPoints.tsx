"use client";

import { Wind, Scissors, Hourglass } from "lucide-react";

export function PainPoints() {
  const points = [
    {
      title: "Cienkie i rzadkie",
      description: "Brakuje im objętości nawet po stylizacji, przez co fryzura wydaje się płaska.",
      icon: Wind,
    },
    {
      title: "Zniszczone koloryzacją",
      description: "Częste rozjaśnianie sprawiło, że końcówki urywają się i nie chcą rosnąć.",
      icon: Scissors,
    },
    {
      title: "Krótkie i niesforne",
      description: "Zapuściłaś boba, ale marzysz o długich pasmach bez wielomiesięcznego czekania.",
      icon: Hourglass,
    },
  ];

  return (
    <section id="o-nas" className="w-full bg-[#0B0B0B] py-32 px-4 lg:px-32 flex flex-col items-center gap-20">
      <div className="text-center flex flex-col gap-6 max-w-[800px]">
        <h2 className="text-5xl font-bold leading-tight text-white mb-4">
          Dla kogo jest ten <span className="text-[#C09448]">zabieg?</span>
        </h2>
        <p className="font-sans text-xl text-white/50 leading-relaxed max-w-[600px] mx-auto">
          Jeśli zmagasz się z którymś z tych problemów, jesteś w dobrym miejscu.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
        {points.map((point, idx) => (
          <div 
            key={idx}
            className="flex flex-col gap-8 bg-[#0B0B0B] p-10 rounded-[24px] border border-white/5 hover:border-[#C09448]/50 transition-all hover:bg-[#1E1E27]/50 group"
          >
            <div className="w-16 h-16 rounded-full bg-[#13373F] flex items-center justify-center group-hover:bg-[#C09448] transition-all transform group-hover:scale-110">
              <point.icon className="w-8 h-8 text-[#C09448] group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="font-serif text-3xl font-medium text-white group-hover:text-[#C09448] transition-colors leading-tight">
                {point.title}
              </h3>
              <p className="font-sans text-lg text-white/60 leading-relaxed">
                {point.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
