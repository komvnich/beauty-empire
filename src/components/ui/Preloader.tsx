"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setIsFading(true), 1800);
    const hideTimer = setTimeout(() => setIsVisible(false), 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] bg-bg-dark flex flex-col items-center justify-center gap-6 transition-all duration-700 ${
        isFading ? "opacity-0 scale-105" : "opacity-100 scale-100"
      }`}
    >
      <div className="relative w-28 h-28 animate-pulse">
        <Image
          src="/images/logo.png"
          alt="Beauty Empire"
          fill
          className="object-contain"
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xl tracking-[0.3em] text-white uppercase font-bold">
          Beauty Empire
        </span>
        <span className="text-[10px] tracking-[0.6em] text-gold uppercase font-bold">
          Warsaw
        </span>
      </div>
      <div className="w-16 h-[2px] bg-gold/30 rounded-full overflow-hidden mt-4">
        <div className="h-full bg-gold rounded-full animate-[loading_1.8s_ease-in-out]" />
      </div>
    </div>
  );
}
