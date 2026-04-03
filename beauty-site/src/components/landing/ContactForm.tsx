"use client";

import { useEffect, useState } from "react";
import { MapPin, Phone, Mail, Instagram, Facebook, Send } from "lucide-react";
import Link from "next/link";
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

interface ContactFormProps {
  contact?: SiteContactContent;
}

export function ContactForm({ contact }: ContactFormProps) {
  const c = contact ?? FALLBACK_CONTACT;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  useEffect(() => {
    const handleServiceSelected = (event: Event) => {
      const customEvent = event as CustomEvent<{ serviceTitle?: string }>;
      const selectedService = customEvent.detail?.serviceTitle?.trim();
      if (!selectedService) return;

      setFormData((prev) => {
        const nextMessage = prev.message
          ? prev.message
          : `Chciałabym umówić usługę: ${selectedService}.`;
        return {
          ...prev,
          service: selectedService,
          message: nextMessage
        };
      });
    };

    window.addEventListener("beauty:service-selected", handleServiceSelected as EventListener);
    return () => window.removeEventListener("beauty:service-selected", handleServiceSelected as EventListener);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section id="kontakt" className="w-full bg-card-dark py-32 px-4 lg:px-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Left: Contact Info */}
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-6">
            <h2 className="text-5xl font-bold leading-tight text-white">
              Skontaktuj się <span className="text-gold">z nami</span>
            </h2>
            <p className="text-xl text-white/50 leading-relaxed max-w-[500px]">
              Masz pytania? Chcesz umówić się na konsultację? Napisz do nas —
              odpowiemy najszybciej jak to możliwe.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-5 group">
              <div className="w-14 h-14 rounded-full bg-emerald-deep/50 border border-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold transition-all">
                <MapPin className="w-6 h-6 text-gold group-hover:text-black transition-colors" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white/40 text-sm uppercase tracking-wider">
                  Adres
                </span>
                <a
                  href={c.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-lg font-medium hover:text-gold transition-colors"
                >
                  {c.address}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-5 group">
              <div className="w-14 h-14 rounded-full bg-emerald-deep/50 border border-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold transition-all">
                <Phone className="w-6 h-6 text-gold group-hover:text-black transition-colors" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white/40 text-sm uppercase tracking-wider">
                  Telefon
                </span>
                <a href={c.phoneHref} className="text-white text-lg font-medium hover:text-gold transition-colors">
                  {c.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-5 group">
              <div className="w-14 h-14 rounded-full bg-emerald-deep/50 border border-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold transition-all">
                <Mail className="w-6 h-6 text-gold group-hover:text-black transition-colors" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white/40 text-sm uppercase tracking-wider">
                  Email
                </span>
                <a href={c.emailHref} className="text-white text-lg font-medium hover:text-gold transition-colors">
                  {c.email}
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <Link
              href={c.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-black text-white/50 transition-all transform hover:scale-110"
            >
              <Instagram className="w-5 h-5" />
            </Link>
            <Link
              href={c.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-black text-white/50 transition-all transform hover:scale-110"
            >
              <Facebook className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Right: Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 bg-bg-dark rounded-[32px] p-10 lg:p-14 border border-white/5"
        >
          <div className="flex flex-col gap-3">
            <label
              htmlFor="contact-name"
              className="text-white/40 text-sm uppercase tracking-wider"
            >
              Imię
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Twoje imię"
              className="w-full bg-transparent border-b border-white/10 py-4 text-white text-lg placeholder:text-white/20 focus:border-gold focus:outline-none transition-colors"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label
              htmlFor="contact-email"
              className="text-white/40 text-sm uppercase tracking-wider"
            >
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="twoj@email.com"
              className="w-full bg-transparent border-b border-white/10 py-4 text-white text-lg placeholder:text-white/20 focus:border-gold focus:outline-none transition-colors"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label
              htmlFor="contact-phone"
              className="text-white/40 text-sm uppercase tracking-wider"
            >
              Telefon
            </label>
            <input
              id="contact-phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+48 ..."
              className="w-full bg-transparent border-b border-white/10 py-4 text-white text-lg placeholder:text-white/20 focus:border-gold focus:outline-none transition-colors"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label
              htmlFor="contact-service"
              className="text-white/40 text-sm uppercase tracking-wider"
            >
              Usługa
            </label>
            <input
              id="contact-service"
              type="text"
              name="service"
              value={formData.service}
              onChange={handleChange}
              placeholder="Wybierz usługę z sekcji powyżej"
              className="w-full bg-transparent border-b border-white/10 py-4 text-white text-lg placeholder:text-white/20 focus:border-gold focus:outline-none transition-colors"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label
              htmlFor="contact-message"
              className="text-white/40 text-sm uppercase tracking-wider"
            >
              Wiadomość
            </label>
            <textarea
              id="contact-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Opisz swoje potrzeby..."
              rows={4}
              className="w-full bg-transparent border-b border-white/10 py-4 text-white text-lg placeholder:text-white/20 focus:border-gold focus:outline-none transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-3 bg-gold text-black px-12 py-5 rounded-full text-base font-black hover:bg-gold/90 transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-gold/20 uppercase tracking-widest mt-4 w-full"
          >
            Wyślij wiadomość <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </section>
  );
}
