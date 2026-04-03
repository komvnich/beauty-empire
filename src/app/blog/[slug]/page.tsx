import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { ArrowLeft } from "lucide-react";
import { LexicalRenderer } from "@/components/blog/LexicalRenderer";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { getBlogPostData, getBlogSlugs, getNavigation, getSiteContactData, getSeoSiteConfig, getOgLocaleForLang } from "@/lib/directus";
import { buildBlogPostMetadata, STATIC_FALLBACK_DESC, STATIC_FALLBACK_TITLE } from "@/lib/seo-metadata";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = (await cookies()).get("NEXT_LOCALE")?.value || "pl-PL";
  const [post, site] = await Promise.all([getBlogPostData(slug, locale), getSeoSiteConfig()]);
  if (!post) {
    return { title: STATIC_FALLBACK_TITLE, description: STATIC_FALLBACK_DESC };
  }
  const ogLocale = getOgLocaleForLang(locale);
  return buildBlogPostMetadata(post, site, slug, ogLocale);
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const locale = (await cookies()).get("NEXT_LOCALE")?.value || "pl-PL";
  const [navData, post, siteContact] = await Promise.all([
    getNavigation(locale),
    getBlogPostData(slug, locale),
    getSiteContactData(),
  ]);
  if (!post) notFound();
  const formattedDate = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "";

  return (
    <main className="min-h-screen bg-[#0B0B0B]">
      <Header navItems={navData.items} ctaLabel={navData.cta_label} currentLang={locale} />
      <article className="pt-20 lg:pt-24">
        <div className="relative w-full overflow-hidden border-y border-white/10">
          <div className="pointer-events-none absolute inset-0">
            <Image
              src={post.coverImage || "/images/generated-1773862999493.png"}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/45 to-[#0B0B0B]" />
          </div>
          <div className="relative z-10 mx-auto flex min-h-[min(52svh,36rem)] w-full max-w-5xl flex-col items-center justify-center px-4 py-14 text-center md:min-h-[min(48svh,32rem)] lg:px-8 lg:py-20">
            <nav className="mb-6 w-full text-center text-sm text-white/70 font-sans">
              <ol className="flex flex-wrap items-center justify-center gap-2">
                <li><Link href="/" className="hover:text-gold transition-colors">Strona glowna</Link></li>
                <li className="text-white/40">/</li>
                <li><Link href="/#cennik" className="hover:text-gold transition-colors">Blog</Link></li>
                <li className="text-white/40">/</li>
                <li className="max-w-full break-words text-white">{post.title}</li>
              </ol>
            </nav>

            <h1 className="text-white text-4xl font-medium leading-tight md:text-5xl lg:text-6xl">
              {post.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-white/85 text-sm md:text-base font-sans">
              <span className="text-gold/90 uppercase tracking-[0.2em]">{formattedDate}</span>
              <span className="text-white/35">•</span>
              <span>{post.authorName}</span>
              <span className="text-white/35">•</span>
              <span>{post.readingMinutes} min czytania</span>
            </div>
          </div>
        </div>

        <div className="px-4 lg:px-32 py-12 lg:py-16">
          <div className="max-w-4xl mx-auto flex flex-col gap-10">
            <Link href="/" className="inline-flex items-center gap-2 text-gold hover:text-white transition-colors w-fit">
              <ArrowLeft className="w-4 h-4" /> Wroc na strone glowna
            </Link>

            <p className="text-white/80 text-2xl leading-10 font-sans">
              {post.excerpt}
            </p>

            {post.contentLexical ? (
              <LexicalRenderer value={post.contentLexical} />
            ) : (
              <section
                className="prose prose-invert max-w-none
                prose-headings:text-white prose-p:text-white/85 prose-li:text-white/85
                prose-strong:text-white prose-a:text-gold hover:prose-a:text-white prose-img:rounded-2xl
                prose-p:text-xl prose-p:leading-9 prose-li:text-xl prose-li:leading-9 prose-headings:font-medium"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
              />
            )}
          </div>
        </div>
      </article>
      <Footer contact={siteContact || undefined} />
    </main>
  );
}
