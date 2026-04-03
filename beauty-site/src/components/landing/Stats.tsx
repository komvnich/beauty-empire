import type { StatsItem } from "@/lib/directus";

interface StatsProps {
  data?: StatsItem[];
}

export function Stats({ data }: StatsProps) {
  const stats = data || [
    { label: "lat doświadczenia", value: "6+" },
    { label: "wykonanych kapsułek", value: "1 000 000+" },
    { label: "zadowolonych klientek", value: "500+" },
    { label: "wykonanych metamorfoz", value: "3000+" },
    { label: "naturalne włosy", value: "100%" },
  ];

  return (
    <section className="w-full bg-[#1E1E27] py-16 px-4 lg:px-32 flex flex-wrap justify-center lg:justify-between items-center gap-12 border-y border-white/5">
      {stats.map((stat) => (
        <div 
          key={`${stat.value}-${stat.label}`}
          className="flex flex-col items-center gap-2 group hover:transform hover:scale-105 transition-transform cursor-default"
        >
          <span className="font-serif text-4xl font-bold text-gold drop-shadow-sm group-hover:text-white transition-colors">
            {stat.value}
          </span>
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-white/60">
            {stat.label}
          </span>
        </div>
      ))}
    </section>
  );
}
