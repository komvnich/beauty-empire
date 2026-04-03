"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Stats } from "@/components/landing/Stats";
import { Benefits } from "@/components/landing/Benefits";
import { AuthorMethod } from "@/components/landing/AuthorMethod";
import { AboutSalon } from "@/components/landing/AboutSalon";
import { Services } from "@/components/landing/Services";
import { Metamorphoses } from "@/components/landing/Metamorphoses";
import { Process } from "@/components/landing/Process";
import { Education } from "@/components/landing/Education";
import { Reviews } from "@/components/landing/Reviews";
import { PriceList } from "@/components/landing/PriceList";
import { PricingCTA } from "@/components/landing/PricingCTA";
import { FAQList } from "@/components/landing/FAQList";
import { ContactForm } from "@/components/landing/ContactForm";
import type { AboutSalonContent, AuthorMethodContent, BenefitsContent, BlogListContent, EducationContent, FaqContent, MetamorphosesContent, ProcessContent, ReviewsContent, ServicesContent, SiteContactContent, StatsItem } from "@/lib/directus";

interface AnimatedSectionsProps {
  statsData?: StatsItem[];
  benefitsData?: BenefitsContent;
  authorMethodData?: AuthorMethodContent;
  aboutSalonData?: AboutSalonContent;
  servicesData?: ServicesContent;
  metamorphosesData?: MetamorphosesContent;
  processData?: ProcessContent;
  educationData?: EducationContent;
  reviewsData?: ReviewsContent;
  faqData?: FaqContent;
  contact?: SiteContactContent;
  blogData?: BlogListContent;
  locale?: string;
}

export function AnimatedSections({ statsData, benefitsData, authorMethodData, aboutSalonData, servicesData, metamorphosesData, processData, educationData, reviewsData, faqData, contact, blogData, locale }: AnimatedSectionsProps) {
  return (
    <>
      <ScrollReveal>
        <Stats data={statsData} />
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <Benefits data={benefitsData} />
      </ScrollReveal>
      <ScrollReveal>
        <AuthorMethod data={authorMethodData} />
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <AboutSalon data={aboutSalonData} />
      </ScrollReveal>
      <ScrollReveal>
        <Services data={servicesData} locale={locale} />
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <Metamorphoses data={metamorphosesData} />
      </ScrollReveal>
      <ScrollReveal>
        <Process data={processData} />
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <Education data={educationData} />
      </ScrollReveal>
      <ScrollReveal>
        <Reviews data={reviewsData} />
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <PriceList data={blogData} />
      </ScrollReveal>
      <ScrollReveal>
        <PricingCTA />
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <FAQList data={faqData} />
      </ScrollReveal>
      <ScrollReveal>
        <ContactForm contact={contact} />
      </ScrollReveal>
    </>
  );
}
