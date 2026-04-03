"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MoveRight, Scissors, Sparkles } from "lucide-react";
import type { MetamorphosesContent } from "@/lib/directus";

interface BeforeAfterProps {
  before: string;
  after: string;
  beforeLabel: string;
  afterLabel: string;
  helperLabel: string;
}

function BeforeAfterSlider({ before, after, beforeLabel, afterLabel, helperLabel }: BeforeAfterProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const boundsRef = useRef<{ left: number; width: number }>({ left: 0, width: 1 });

  useEffect(() => {
    if (!containerRef.current) return;

    const updateBounds = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      boundsRef.current = { left: rect.left, width: Math.max(rect.width, 1) };
    };

    updateBounds();

    const observer = new ResizeObserver(() => updateBounds());
    observer.observe(containerRef.current);
    window.addEventListener("scroll", updateBounds, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateBounds);
    };
  }, []);

  const updateFromClientX = (clientX: number) => {
    const { left, width } = boundsRef.current;
    const position = ((clientX - left) / width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
    updateFromClientX(event.clientX);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" && !isDragging) return;
    updateFromClientX(event.clientX);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.releasePointerCapture(event.pointerId);
    setIsDragging(false);
  };

  return (
    <div 
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="relative w-full aspect-[4/5] md:aspect-video rounded-[32px] overflow-hidden cursor-ew-resize select-none border border-white/10 group touch-none"
    >
      <Image src={after} alt="Po metamorfozie" fill className="object-cover" />

      <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 z-20">
         <span className="text-white text-xs font-bold uppercase tracking-widest">{afterLabel}</span>
      </div>

      <div 
        className="absolute inset-0 z-10 overflow-hidden" 
        style={{ width: `${sliderPosition}%` }}
      >
        <Image src={before} alt="Przed metamorfozą" fill className="object-cover" />
        <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
           <span className="text-white text-xs font-bold uppercase tracking-widest">{beforeLabel}</span>
        </div>
      </div>

      <div 
        className="absolute top-0 bottom-0 z-20 w-1 bg-gold hover:w-1.5 transition-all cursor-ew-resize flex items-center justify-center translate-x-[-50%]"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="w-10 h-10 rounded-full bg-gold border-4 border-[#0B0B0B] flex items-center justify-center shadow-2xl">
           <div className="flex gap-1">
              <ChevronLeft className="w-3 h-3 text-black fill-black" />
              <ChevronRight className="w-3 h-3 text-black fill-black" />
           </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-gold/30 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
         <p className="text-white text-sm font-medium flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gold" /> {helperLabel}
         </p>
      </div>
    </div>
  );
}

interface MetamorphosesProps {
  data?: MetamorphosesContent;
}

export function Metamorphoses({ data }: MetamorphosesProps) {
  const [activeItem, setActiveItem] = useState(0);
  const fallbackData: MetamorphosesContent = {
    badgeLabel: "Twoja Metamorfoza",
    headingWhite: "Zobacz magiczne",
    headingGold: "efekty",
    description: "Używamy tylko najlepszych włosów premium, aby uzyskać efekt, który zachwyca, a jednocześnie jest całkowicie naturalny.",
    ctaLabel: "Chcę taką zmianę",
    beforeLabel: "Przed",
    afterLabel: "Po",
    helperLabel: "Przesuń, aby zobaczyć różnicę",
    caseLabelPrefix: "Przypadek",
    cases: [
      { beforeImage: "/images/generated-1773862999493.png", afterImage: "/images/generated-1773861590996.png", title: "Spektakularne przedłużenie i zagęszczenie", summary: "Każda metamorfoza to efekt wielogodzinnej, precyzyjnej pracy. Dobieramy odcień pasm, aby idealnie stapiał się z Twoim naturalnym kolorem." },
      { beforeImage: "/images/generated-1773861813065.png", afterImage: "/images/generated-1773863015092.png", title: "Naturalny efekt i idealny kolor", summary: "Precyzyjna koloryzacja i dopasowanie długości pozwalają uzyskać naturalny i luksusowy rezultat." },
      { beforeImage: "/images/generated-1773863050148.png", afterImage: "/images/generated-1773863101155.png", title: "Metamorfoza włosów premium", summary: "Łączymy jakość włosów premium z autorską techniką aplikacji dla maksymalnego komfortu." }
    ],
    achievements: [
      { title: "Gęstość", description: "Spektakularne zagęszczenie rzadkich włosów" },
      { title: "Długość", description: "Natychmiastowy efekt długich pasm" },
      { title: "Kolor", description: "Perfekcyjne stapianie się odcieni" },
      { title: "Komfort", description: "Niewyczuwalne mikrokapsułki" }
    ]
  };
  const content = data || fallbackData;
  const items = content.cases;

  const handleScrollToContact = () => {
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="efekty" className="w-full bg-[#0B0B0B] py-32 px-4 lg:px-32">
      <div className="max-w-7xl mx-auto flex flex-col gap-24">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 border-b border-white/5 pb-16">
          <div className="flex flex-col gap-6 max-w-2xl">
            <div className="flex items-center gap-3 text-gold">
               <Scissors className="w-6 h-6" />
               <span className="text-sm font-black uppercase tracking-[0.3em]">{content.badgeLabel}</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-medium text-white leading-tight">
              {content.headingWhite} <br /> <span className="text-gold italic">{content.headingGold}</span> naszej pracy
            </h2>
            <p className="font-sans text-xl text-white/50 leading-relaxed">
               {content.description}
            </p>
          </div>
          <button
            onClick={handleScrollToContact}
            className="group flex items-center gap-3 bg-gold text-black px-12 py-5 rounded-full text-base font-black hover:bg-gold/90 transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-gold/20 uppercase tracking-widest"
          >
            {content.ctaLabel} <MoveRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-2/3">
               <BeforeAfterSlider 
                  before={items[activeItem].beforeImage || fallbackData.cases[0].beforeImage}
                  after={items[activeItem].afterImage || fallbackData.cases[0].afterImage}
                  beforeLabel={content.beforeLabel}
                  afterLabel={content.afterLabel}
                  helperLabel={content.helperLabel}
               />
            </div>
            
            <div className="w-full lg:w-1/3 flex flex-col gap-8">
               <div className="flex flex-col gap-4">
                  <h3 className="text-3xl font-bold text-white leading-tight">
                     {items[activeItem].title}
                  </h3>
                  <p className="font-sans text-lg text-white/40 leading-relaxed">
                     {items[activeItem].summary}
                  </p>
               </div>

               <div className="flex flex-col gap-4">
                  {items.map((item, idx) => (
                     <button
                        key={idx}
                        onClick={() => setActiveItem(idx)}
                        className={`group flex items-center gap-6 p-4 rounded-2xl border transition-all ${
                           activeItem === idx 
                           ? "bg-[#1E1E27] border-gold/50 shadow-lg shadow-gold/5" 
                           : "bg-white/5 border-white/5 hover:border-white/10"
                        }`}
                     >
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                           <Image src={item.afterImage || fallbackData.cases[0].afterImage} alt={item.title} fill className="object-cover" />
                        </div>
                        <div className="flex flex-col text-left">
                           <span className={`text-xs uppercase font-black tracking-widest transition-colors ${activeItem === idx ? "text-gold" : "text-white/30"}`}>
                              {content.caseLabelPrefix} {idx + 1}
                           </span>
                           <span className={`text-base font-medium transition-colors ${activeItem === idx ? "text-white" : "text-white/60"}`}>
                              {item.title.split(' ').slice(0, 3).join(' ')}...
                           </span>
                        </div>
                     </button>
                  ))}
               </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-20 border-t border-white/5">
           {content.achievements.map((stat, i) => (
              <div key={i} className="flex flex-col gap-4 p-8 rounded-[24px] bg-[#1E1E27]/50 border border-white/5 hover:bg-gold/5 transition-all">
                 {i % 2 === 0 ? <Sparkles className="w-8 h-8 text-gold" /> : <MoveRight className="w-8 h-8 text-gold" />}
                 <h4 className="text-xl font-bold text-white">{stat.title}</h4>
                 <p className="text-white/50 text-sm leading-relaxed">{stat.description}</p>
              </div>
           ))}
        </div>
      </div>
    </section>
  );
}
