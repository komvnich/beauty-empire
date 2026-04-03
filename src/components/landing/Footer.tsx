"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Phone, MapPin, MoveRight } from "lucide-react";
import type { SiteContactContent } from "@/lib/directus";

const FALLBACK_CONTACT: SiteContactContent = {
  address: "ul. Marszałkowska 55, Warszawa",
  mapsUrl: "https://maps.google.com/?q=ul.+Marszałkowska+55,+Warszawa",
  phoneDisplay: "+48 555 123 456",
  phoneHref: "tel:+48555123456",
  email: "kontakt@beautyempire.pl",
  emailHref: "mailto:kontakt@beautyempire.pl",
  instagramUrl: "https://instagram.com/beautyempire",
  facebookUrl: "https://facebook.com/beautyempire",
};

interface FooterProps {
  contact?: SiteContactContent;
}

export function Footer({ contact }: FooterProps) {
  const c = contact ?? FALLBACK_CONTACT;
  const handleScrollToContact = () => {
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-card-dark py-20 px-4 lg:px-32 flex flex-col gap-12 border-t border-white/5 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 w-full">
        <div className="flex flex-col lg:items-start gap-8">
           <Link href="/" className="flex items-center gap-5 group">
             <div className="relative w-16 h-16 transition-transform group-hover:scale-105 duration-300">
               <Image 
                 src="/images/logo.png" 
                 alt="Beauty Empire Logo" 
                 fill 
                 className="object-contain"
               />
             </div>
             <div className="flex flex-col gap-1">
               <span className="font-serif font-medium text-2xl tracking-[0.2em] text-white group-hover:text-gold transition-colors uppercase">
                 BEAUTY EMPIRE
               </span>
               <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold font-bold">
                 WARSAW
               </span>
             </div>
           </Link>
           
           <div className="flex flex-col sm:flex-row gap-10">
             <a href={c.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white/60 hover:text-gold transition-colors">
               <MapPin className="w-5 h-5 text-gold" />
               <span className="text-sm font-medium">{c.address}</span>
             </a>
             <a href={c.phoneHref} className="flex items-center gap-4 text-white/60 hover:text-gold transition-colors">
               <Phone className="w-5 h-5 text-gold" />
               <span className="text-sm font-medium">{c.phoneDisplay}</span>
             </a>
           </div>
        </div>

        <div className="flex items-center gap-6">
          <Link href={c.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-black text-white/50 transition-all transform hover:scale-110">
            <Instagram className="w-5 h-5" />
          </Link>
          <Link href={c.facebookUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-black text-white/50 transition-all transform hover:scale-110">
            <Facebook className="w-5 h-5" />
          </Link>
          <button
            onClick={handleScrollToContact}
            className="flex items-center gap-4 bg-gold text-black px-10 py-4 rounded-full text-base font-black hover:bg-gold/90 transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-gold/30 uppercase tracking-widest ring-4 ring-gold/10"
          >
            Zarezerwuj <MoveRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pt-12 border-t border-white/10 w-full">
        <p className="font-sans text-sm text-white/30 text-center lg:text-left">
          © {new Date().getFullYear()} Beauty Empire Warsaw. Wszelkie prawa zastrzeżone.
        </p>
        <div className="flex gap-10">
          {/* TODO: Replace with actual policy page URLs when available */}
          {["Polityka Prywatności", "Regulamin", "Cookie Policy"].map((item) => (
            <Link key={item} href="#" className="text-sm text-white/30 hover:text-gold transition-colors">
              {item}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
