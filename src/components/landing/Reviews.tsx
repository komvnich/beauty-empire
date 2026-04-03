"use client";

import { Star } from "lucide-react";
import type { ReviewsContent } from "@/lib/directus";

const FALLBACK_REVIEWS: ReviewsContent = {
  headingBefore: "Poznaj",
  headingHighlight: "opinie",
  headingAfter: "naszych klientek",
  items: [
    {
      name: "Anna Kowalska",
      comment: "Najlepsze przedłużanie na jakim byłam! Metoda keratynowa jest kompletnie niewyczuwalna.",
      rating: 5,
    },
    {
      name: "Marta Wiśniewska",
      comment: "Włosy premium to naprawdę inna liga. Wyglądają jak moje własne. Polecam z całego serca!",
      rating: 5,
    },
    {
      name: "Katarzyna Nowak",
      comment: "Profesjonalizm na najwyższym poziomie. Efekt wow gwarantowany!",
      rating: 5,
    },
  ],
};

interface ReviewsProps {
  data?: ReviewsContent;
}

export function Reviews({ data }: ReviewsProps) {
  const content = data ?? FALLBACK_REVIEWS;

  return (
    <section id="opinie" className="w-full bg-[#0B0B0B] py-32 px-4 lg:px-32">
      <div className="max-w-7xl mx-auto flex flex-col gap-16 items-center">
        <div className="flex flex-col gap-4 text-center">
          <h2 className="text-4xl md:text-5xl font-medium text-white">
            {content.headingBefore}{" "}
            <span className="text-gold">{content.headingHighlight}</span>{" "}
            {content.headingAfter}
          </h2>
          <div className="flex justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-gold text-gold" />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {content.items.map((review, idx) => (
            <div key={idx} className="bg-[#1E1E27] p-8 rounded-[24px] border border-white/5 flex flex-col gap-6 hover:border-gold/30 transition-all">
              <div className="flex gap-1">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-white/80 font-sans text-lg italic leading-relaxed">
                &ldquo;{review.comment}&rdquo;
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">
                  {review.name[0]}
                </div>
                <span className="text-white font-medium">{review.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
