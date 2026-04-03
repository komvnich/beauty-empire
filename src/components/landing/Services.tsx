"use client";

import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { createPortal } from "react-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ServiceItem, ServicesContent } from "@/lib/directus";

interface ServicesProps {
  data?: ServicesContent;
  locale?: string;
}

export function Services({ data, locale = "pl-PL" }: ServicesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [bookingService, setBookingService] = useState<ServiceItem | null>(null);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    phone: "",
    email: "",
    note: ""
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const fallbackServices: ServiceItem[] = [
    {
      title: "Przedłużanie włosów",
      description: "Profesjonalne doczepianie włosów metodą keratynowa.",
      image: "/images/generated-1773862999493.png",
      priceUsd: "490",
      detailsMarkdown:
        "## Zakres usługi\n- dobór pasm premium\n- aplikacja metodą keratynową\n- wyrównanie i stylizacja końcowa\n\n## Efekt\nNaturalne przedłużenie i pełna lekkość noszenia.",
    },
    {
      title: "Zagęszczanie włosów",
      description: "Idealne rozwiązanie dla cienkich i rzadkich włosów.",
      image: "/images/generated-1773863015092.png",
      priceUsd: "390",
      detailsMarkdown:
        "## Dla kogo\nDla osób z mniejszą objętością, które chcą naturalnego efektu.\n\n## Co obejmuje\n- konsultacja i plan zagęszczenia\n- dobór koloru i długości\n- aplikacja pasm premium",
    },
    {
      title: "Regeneracja włosów",
      description: "Zabiegi odbudowujące strukturę włosów i poprawiające ich kondycję.",
      image: "/images/generated-1773863050148.png",
      priceUsd: "290",
      detailsMarkdown:
        "## Co zyskujesz\n- intensywne odżywienie włókna włosa\n- wygładzenie i połysk\n- plan pielęgnacji podtrzymującej",
    },
    {
      title: "Dobór pielęgnacji domowej",
      description: "Indywidualnie dobrana pielęgnacja dopasowana do Twojego typu włosów.",
      image: "/images/generated-1773863101155.png",
      priceUsd: "90",
      detailsMarkdown:
        "## Konsultacja premium\n- analiza stanu włosów i skóry głowy\n- rekomendowany zestaw produktów\n- harmonogram pielęgnacji na 30 dni",
    },
  ];

  const content = data || {
    headingWhite: "Przedłużanie włosów Warszawa -",
    headingGold: "nasze usługi",
    description: "Wybierz profesjonalną usługę dopasowaną do Twoich potrzeb i ciesz się spektakularnym efektem.",
    items: fallbackServices
  };

  const services = content.items.length > 0 ? content.items : fallbackServices;

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!selectedService && !bookingService) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedService, bookingService]);

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  const handleCloseBookingModal = () => {
    setBookingService(null);
    setBookingSubmitted(false);
  };

  const handleModalBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleCloseModal();
    }
  };

  const handleBookingBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleCloseBookingModal();
    }
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (bookingService) {
          handleCloseBookingModal();
          return;
        }
        handleCloseModal();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const getServiceImage = (service: ServiceItem) => {
    if (service.image) return service.image;
    return fallbackServices[0].image;
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 20, scale: 0.98 }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const getTotalDots = () => {
    if (services.length <= itemsPerView) return 1;
    return services.length - itemsPerView + 1;
  };

  const totalDots = getTotalDots();

  const isPolish = locale === "pl-PL" || locale === "pl";
  const isUkrainian = locale === "uk-UA" || locale === "uk" || locale === "ua";

  const formatPrice = (priceUsd: string) => {
    if (isPolish) return `Od ${priceUsd} zł`;
    if (isUkrainian) return `Від ${priceUsd} ₴`;
    return `From $${priceUsd}`;
  };

  const detailsLabel = isPolish ? "Szczegóły" : isUkrainian ? "Деталі" : "Details";
  const bookLabel = isPolish ? "Umów usługę" : isUkrainian ? "Записатися" : "Book service";
  const bookingTitle = isPolish ? "Rezerwacja usługi" : isUkrainian ? "Запис на послугу" : "Service booking";
  const bookingSubtitle = isPolish ? "Wypełnij formularz, a oddzwonimy i potwierdzimy termin." : isUkrainian ? "Заповніть форму, і ми зв'яжемося для підтвердження дати." : "Fill in the form and we will contact you to confirm the appointment.";
  const bookingSuccess = isPolish ? "Dziękujemy! Zgłoszenie zostało zapisane." : isUkrainian ? "Дякуємо! Заявку збережено." : "Thank you! Your request has been saved.";
  const bookingNameLabel = isPolish ? "Imię" : isUkrainian ? "Ім'я" : "Name";
  const bookingPhoneLabel = isPolish ? "Telefon" : isUkrainian ? "Телефон" : "Phone";
  const bookingEmailLabel = "Email";
  const bookingNoteLabel = isPolish ? "Dodatkowe informacje" : isUkrainian ? "Додаткова інформація" : "Additional details";
  const bookingSubmitLabel = isPolish ? "Wyślij zgłoszenie" : isUkrainian ? "Надіслати заявку" : "Submit request";
  const isHtmlDetails = (value: string) => /<\/?[a-z][\s\S]*>/i.test(value);

  const handleBookService = (service: ServiceItem) => {
    setBookingService(service);
    handleCloseModal();
  };

  const handleBookingFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setBookingForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setBookingSubmitted(true);
  };

  useEffect(() => {
    if (activeIndex > totalDots - 1) {
      setActiveIndex(0);
    }
  }, [activeIndex, totalDots]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setItemsPerView(4);
      else if (window.innerWidth >= 640) setItemsPerView(2);
      else setItemsPerView(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScrollUpdate = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll <= 0 || totalDots <= 1) {
        setActiveIndex(0);
        return;
      }

      const scrollPercent = scrollLeft / maxScroll;
      const newIndex = Math.round(scrollPercent * (totalDots - 1));

      if (newIndex !== activeIndex && !isNaN(newIndex)) {
        setActiveIndex(newIndex);
      }
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", handleScrollUpdate);
      return () => el.removeEventListener("scroll", handleScrollUpdate);
    }
  }, [activeIndex, totalDots]);

  const handleScroll = (direction: "prev" | "next") => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const itemWidth = scrollWidth / services.length;
      
      let nextScroll = direction === "next" ? scrollLeft + itemWidth : scrollLeft - itemWidth;
      
      if (nextScroll > maxScroll + 10 && direction === "next") {
        nextScroll = 0;
      } else if (nextScroll < -10 && direction === "prev") {
        nextScroll = maxScroll;
      }
      
      scrollRef.current.scrollTo({ left: nextScroll, behavior: "smooth" });
    }
  };

  return (
    <section id="nasze-usługi" className="w-full bg-[#0B0B0B] py-32 px-4 lg:px-32 flex flex-col gap-20">
      <div className="flex flex-col gap-6 text-left w-full">
        <h2 className="text-5xl font-bold leading-tight text-white mb-2">
          {content.headingWhite} <span className="text-gold">{content.headingGold}</span>
        </h2>
        <p className="font-sans text-xl text-white/50 leading-relaxed max-w-[600px]">
          {content.description}
        </p>
      </div>

      <div className="flex flex-col gap-16 w-full">
        <div 
          ref={scrollRef}
          className="flex w-full overflow-x-auto gap-8 snap-x snap-mandatory pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {services.map((service, idx) => (
            <div 
              key={`${service.title}-${idx}`}
              className="flex-shrink-0 w-full sm:w-[calc(50%-16px)] lg:w-[calc(25%-24px)] flex flex-col gap-8 group snap-start"
            >
              <div className="relative h-[400px] w-full rounded-[24px] overflow-hidden">
                <Image 
                  src={getServiceImage(service)} 
                  alt={service.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-10 left-10 flex flex-col gap-2">
                   <span className="text-gold uppercase tracking-[0.3em] font-black text-[10px]">Beauty Empire</span>
                   <p className="text-white font-bold text-2xl group-hover:text-gold transition-colors underline decoration-gold/30 underline-offset-8">{formatPrice(service.priceUsd)}</p>
                </div>
              </div>
              
              <div className="flex flex-col gap-4 text-left">
                <h3 className="text-2xl font-bold text-white group-hover:text-gold transition-colors leading-tight min-h-[4rem] flex items-end">
                  {service.title}
                </h3>
                <p className="font-sans text-white/60 text-base leading-relaxed">
                  {service.description}
                </p>
                <button
                  onClick={() => setSelectedService(service)}
                  className="mt-2 w-fit border-b border-gold/30 text-gold text-sm uppercase tracking-[0.2em] pb-1 hover:text-white hover:border-white/60 transition-colors"
                >
                  {detailsLabel}
                </button>
                <button
                  onClick={() => handleBookService(service)}
                  className="mt-2 w-fit rounded-full bg-gold px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-black transition-all hover:bg-gold/90 hover:scale-105 active:scale-95"
                >
                  {bookLabel}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* NAVIGATION CONTROLS: [<] DOTS [>] centered at the bottom */}
        <div className="flex items-center justify-center gap-12 w-full border-t border-white/5 pt-12">
          <button 
            onClick={() => handleScroll("prev")}
            className="w-14 h-14 rounded-full border border-gold/30 text-gold flex items-center justify-center hover:bg-gold hover:text-black transition-all transform hover:scale-110 active:scale-95 shadow-lg shadow-gold/10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex gap-3 items-center">
            {Array.from({ length: totalDots }).map((_, idx) => (
              <div 
                key={idx}
                className={`h-2 rounded-full transition-all duration-500 ${
                  activeIndex === idx ? "w-10 bg-gold" : "w-2 bg-white/10"
                }`}
              />
            ))}
          </div>

          <button 
            onClick={() => handleScroll("next")}
            className="w-14 h-14 rounded-full border border-gold/30 text-gold flex items-center justify-center hover:bg-gold hover:text-black transition-all transform hover:scale-110 active:scale-95 shadow-lg shadow-gold/10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {isMounted &&
        createPortal(
          <AnimatePresence>
            {selectedService && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm sm:px-8 sm:py-10"
            onClick={handleModalBackdropClick}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalVariants}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="mx-auto w-full max-w-3xl overflow-hidden rounded-[28px] border border-gold/20 bg-[#111117] shadow-2xl shadow-gold/10"
            >
              <div className="flex max-h-[90vh] flex-col">
                <div className="relative h-[220px] sm:h-[280px]">
                  <Image
                    src={getServiceImage(selectedService)}
                    alt={selectedService.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                </div>
                <div className="flex h-full min-h-0 flex-col">
                  <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-6">
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] uppercase tracking-[0.35em] text-gold">Beauty Empire</span>
                      <h3 className="text-2xl font-bold text-white">{selectedService.title}</h3>
                      <p className="text-lg font-bold text-gold">{formatPrice(selectedService.priceUsd)}</p>
                    </div>
                    <button
                      onClick={handleCloseModal}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold transition-all hover:bg-gold hover:text-black"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="max-h-[45vh] overflow-y-auto px-6 py-6">
                    <div className="max-w-none text-white/85 [&_a]:text-gold [&_a]:underline [&_a]:decoration-gold/40 [&_blockquote]:border-l [&_blockquote]:border-gold/30 [&_blockquote]:pl-4 [&_em]:text-white [&_h1]:mb-3 [&_h1]:mt-6 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-white [&_h2]:mb-3 [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white [&_h3]:mb-2 [&_h3]:mt-5 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-white [&_li]:mb-2 [&_li]:text-white/80 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_p]:mb-4 [&_p]:leading-relaxed [&_strong]:font-semibold [&_strong]:text-gold [&_ul]:my-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
                      {isHtmlDetails(selectedService.detailsMarkdown) ? (
                        <div dangerouslySetInnerHTML={{ __html: selectedService.detailsMarkdown }} />
                      ) : (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {selectedService.detailsMarkdown}
                        </ReactMarkdown>
                      )}
                    </div>
                    <button
                      onClick={() => handleBookService(selectedService)}
                      className="mt-6 w-full rounded-full bg-gold px-8 py-4 text-sm font-black uppercase tracking-[0.2em] text-black transition-all hover:bg-gold/90 hover:scale-[1.01] active:scale-95"
                    >
                      {bookLabel}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}

      {isMounted &&
        createPortal(
          <AnimatePresence>
            {bookingService && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={overlayVariants}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="fixed inset-0 z-[130] flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-sm sm:px-8 sm:py-10"
                onClick={handleBookingBackdropClick}
              >
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={modalVariants}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="mx-auto w-full max-w-5xl overflow-hidden rounded-[28px] border border-gold/20 bg-[#111117] shadow-2xl shadow-gold/10"
                >
                  <div className="grid max-h-[90vh] grid-cols-1 lg:grid-cols-2">
                    <div className="relative flex min-h-[280px] flex-col justify-end p-8">
                      <Image
                        src={getServiceImage(bookingService)}
                        alt={bookingService.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                      <div className="relative z-10 flex flex-col gap-3">
                        <span className="text-[10px] uppercase tracking-[0.35em] text-gold">Beauty Empire</span>
                        <h3 className="text-3xl font-bold leading-tight text-white">{bookingService.title}</h3>
                        <p className="text-lg font-bold text-gold">{formatPrice(bookingService.priceUsd)}</p>
                        <p className="text-sm leading-relaxed text-white/70">{bookingService.description}</p>
                      </div>
                    </div>
                    <div className="relative overflow-y-auto p-8 lg:p-10">
                      <button
                        onClick={handleCloseBookingModal}
                        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold transition-all hover:bg-gold hover:text-black"
                      >
                        <X className="h-5 w-5" />
                      </button>
                      <div className="flex flex-col gap-3 pr-12">
                        <h3 className="text-2xl font-bold text-white">{bookingTitle}</h3>
                        <p className="text-white/60">{bookingSubtitle}</p>
                      </div>
                      {bookingSubmitted ? (
                        <div className="mt-8 rounded-2xl border border-gold/20 bg-gold/10 px-6 py-5 text-white">
                          <p className="font-medium">{bookingSuccess}</p>
                        </div>
                      ) : (
                        <form onSubmit={handleBookingSubmit} className="mt-8 flex flex-col gap-6">
                          <div className="flex flex-col gap-2">
                            <label className="text-xs uppercase tracking-[0.2em] text-white/40">{bookingNameLabel}</label>
                            <input
                              name="name"
                              value={bookingForm.name}
                              onChange={handleBookingFormChange}
                              required
                              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/25 focus:border-gold focus:outline-none"
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="text-xs uppercase tracking-[0.2em] text-white/40">{bookingPhoneLabel}</label>
                            <input
                              name="phone"
                              value={bookingForm.phone}
                              onChange={handleBookingFormChange}
                              required
                              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/25 focus:border-gold focus:outline-none"
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="text-xs uppercase tracking-[0.2em] text-white/40">{bookingEmailLabel}</label>
                            <input
                              type="email"
                              name="email"
                              value={bookingForm.email}
                              onChange={handleBookingFormChange}
                              required
                              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/25 focus:border-gold focus:outline-none"
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="text-xs uppercase tracking-[0.2em] text-white/40">{bookingNoteLabel}</label>
                            <textarea
                              name="note"
                              value={bookingForm.note}
                              onChange={handleBookingFormChange}
                              rows={4}
                              className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/25 focus:border-gold focus:outline-none"
                            />
                          </div>
                          <button
                            type="submit"
                            className="mt-2 w-full rounded-full bg-gold px-8 py-4 text-sm font-black uppercase tracking-[0.2em] text-black transition-all hover:bg-gold/90 hover:scale-[1.01] active:scale-95"
                          >
                            {bookingSubmitLabel}
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
