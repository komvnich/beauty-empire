import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import type { BlogListContent } from "@/lib/directus";

interface PriceListProps {
  data?: BlogListContent;
}

export function PriceList({ data }: PriceListProps) {
  const fallbackData: BlogListContent = {
    headingWhite: "Poznaj nasze",
    headingGold: "blogi",
    description: "Praktyczne poradniki, trendy i profesjonalne wskazówki dotyczące przedłużania oraz pielęgnacji włosów.",
    readMoreLabel: "Czytaj artykuł",
    items: [
      {
        slug: "pielegnacja-przedluzanych-wlosow",
        title: "Jak dbać o przedłużane włosy każdego dnia",
        excerpt: "Najważniejsze zasady pielęgnacji, które wydłużają trwałość efektu i chronią Twoje naturalne włosy.",
        coverImage: "/images/generated-1773862999493.png",
        authorName: "Anna Kowalska",
        readingMinutes: 8,
        publishedAt: "2026-03-31"
      },
      {
        slug: "konsultacja-przed-zabiegiem",
        title: "Dlaczego konsultacja przed zabiegiem jest kluczowa",
        excerpt: "Wyjaśniamy, jakie decyzje podejmujemy podczas konsultacji i jak wpływają one na końcowy rezultat.",
        coverImage: "/images/generated-1773863015092.png",
        authorName: "Marta Zielinska",
        readingMinutes: 6,
        publishedAt: "2026-03-31"
      },
      {
        slug: "fakty-i-mity-o-przedluzaniu",
        title: "Fakty i mity o przedłużaniu włosów",
        excerpt: "Rozprawiamy się z najczęstszymi mitami i pokazujemy, jak wygląda nowoczesne, bezpieczne przedłużanie.",
        coverImage: "/images/generated-1773863050148.png",
        authorName: "Katarzyna Nowak",
        readingMinutes: 7,
        publishedAt: "2026-03-31"
      },
      {
        slug: "jak-dobrac-kolor-i-strukture",
        title: "Jak dobrać idealny kolor i strukturę pasm",
        excerpt: "Praktyczny przewodnik, jak osiągnąć naturalny efekt dzięki poprawnemu doborowi włosów.",
        coverImage: "/images/generated-1773863015092.png",
        authorName: "Paulina Maj",
        readingMinutes: 9,
        publishedAt: "2026-03-31"
      },
      {
        slug: "najczestsze-bledy-w-pielegnacji",
        title: "Najczęstsze błędy w pielęgnacji po zabiegu",
        excerpt: "Sprawdź, czego unikać po przedłużaniu, aby utrzymać efekt premium przez długi czas.",
        coverImage: "/images/generated-1773862999493.png",
        authorName: "Aleksandra Wisniewska",
        readingMinutes: 10,
        publishedAt: "2026-03-31"
      }
    ]
  };
  const content = data || fallbackData;

  return (
    <section id="cennik" className="w-full bg-[#1A1A22] py-32 px-4 lg:px-32">
      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        <div className="flex flex-col gap-6 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-medium text-white leading-tight">
            {content.headingWhite} <span className="text-gold">{content.headingGold}</span>
          </h2>
          <p className="font-sans text-xl text-white/70 leading-relaxed">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.items.map((item) => (
            <article key={item.slug} className="group bg-[#23232D] rounded-[28px] overflow-hidden border border-white/10 hover:border-gold/40 transition-all duration-300">
              <Link href={`/blog/${item.slug}`} className="block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.coverImage || "/images/generated-1773862999493.png"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                </div>
              </Link>
              <div className="p-7 flex flex-col gap-4">
                <p className="text-white/40 text-xs uppercase tracking-[0.25em]">
                  {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : ""}
                </p>
                <p className="text-white/55 text-sm font-sans">
                  {item.authorName} • {item.readingMinutes} min
                </p>
                <h3 className="text-white text-2xl font-semibold leading-tight">
                  {item.title}
                </h3>
                <p className="text-white/75 leading-8 text-lg font-sans min-h-24">
                  {item.excerpt}
                </p>
                <Link
                  href={`/blog/${item.slug}`}
                  className="mt-2 inline-flex items-center gap-2 text-gold font-semibold hover:text-white transition-colors"
                >
                  {content.readMoreLabel} <MoveRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
