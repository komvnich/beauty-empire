import type { Metadata } from "next";
import { getNavigation, getHeroData, getStatsData, getBenefitsData, getAuthorMethodData, getAboutSalonData, getServicesData, getMetamorphosesData, getProcessData, getEducationData, getReviewsData, getFaqData, getSiteContactData, getBlogListData, getLandingSeo } from "@/lib/directus";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Footer } from "@/components/landing/Footer";
import { AnimatedSections } from "@/components/landing/AnimatedSections";
import { buildLandingMetadata } from "@/lib/seo-metadata";
import { cookies } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await cookies()).get("NEXT_LOCALE")?.value || "pl-PL";
  const seo = await getLandingSeo(locale);
  return buildLandingMetadata(seo);
}

export default async function Home() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "pl-PL";
  
  const [navData, heroData, statsData, benefitsData, authorMethodData, aboutSalonData, servicesData, metamorphosesData, processData, educationData, reviewsData, faqData, siteContact, blogData] = await Promise.all([
    getNavigation(locale),
    getHeroData(locale),
    getStatsData(locale),
    getBenefitsData(locale),
    getAuthorMethodData(locale),
    getAboutSalonData(locale),
    getServicesData(locale),
    getMetamorphosesData(locale),
    getProcessData(locale),
    getEducationData(locale),
    getReviewsData(locale),
    getFaqData(locale),
    getSiteContactData(),
    getBlogListData(locale)
  ]);

  const finalHeroData = heroData || {
    preTitle: "METAMORPHOSE SENSATION",
    titleWhite: "Przedłużanie włosów",
    titleGold: "WARSZAWA PREMIUM",
    description: "Autorska metoda keratynowa i włosy najwyższej качества.",
    ctaPrimary: "Umów się",
    ctaSecondary: "Sprawdź cennik",
    imageDesktop: "/images/generated-1773861590996.png"
  };

  return (
    <main className="min-h-screen bg-[#0B0B0B]">
      <Header navItems={navData.items} ctaLabel={navData.cta_label} currentLang={locale} />

      <Hero data={finalHeroData} />
      <AnimatedSections
        statsData={statsData?.items}
        benefitsData={benefitsData || undefined}
        authorMethodData={authorMethodData || undefined}
        aboutSalonData={aboutSalonData || undefined}
        servicesData={servicesData || undefined}
        metamorphosesData={metamorphosesData || undefined}
        processData={processData || undefined}
        educationData={educationData || undefined}
        reviewsData={reviewsData || undefined}
        faqData={faqData || undefined}
        contact={siteContact || undefined}
        blogData={blogData || undefined}
        locale={locale}
      />

      <Footer contact={siteContact || undefined} />
    </main>
  );
}
