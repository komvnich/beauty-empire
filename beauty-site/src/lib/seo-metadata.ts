import type { Metadata } from "next";
import type { BlogPostContent, LandingSeoPayload, SeoSiteConfig } from "@/lib/directus";
import { SEO_STATIC_FALLBACK_DESCRIPTION, SEO_STATIC_FALLBACK_TITLE } from "@/lib/directus";

export function defaultMetadataBase(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  try {
    const normalized = raw.endsWith("/") ? raw.slice(0, -1) : raw;
    return new URL(normalized);
  } catch {
    return new URL("http://localhost:3000");
  }
}

function normalizeBaseUrl(url: string): string {
  const t = url.trim();
  return t.endsWith("/") ? t.slice(0, -1) : t;
}

function parseRobots(directive: string): Metadata["robots"] {
  const s = directive.toLowerCase();
  return {
    index: !s.includes("noindex"),
    follow: !s.includes("nofollow"),
  };
}

function twitterHandle(raw: string): string | undefined {
  const t = raw.trim().replace(/^@/, "");
  return t ? `@${t}` : undefined;
}

function resolveMetadataBase(siteUrl: string): URL {
  const baseStr = normalizeBaseUrl(siteUrl || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");
  try {
    return new URL(baseStr);
  } catch {
    return defaultMetadataBase();
  }
}

export function buildLandingMetadata(seo: LandingSeoPayload): Metadata {
  const metadataBase = resolveMetadataBase(seo.siteUrl);
  const baseStr = normalizeBaseUrl(seo.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || metadataBase.origin);

  const title = seo.metaTitle.trim() || SEO_STATIC_FALLBACK_TITLE;
  const description = seo.metaDescription.trim() || SEO_STATIC_FALLBACK_DESCRIPTION;
  const ogTitle = seo.ogTitle.trim() || title;
  const ogDescription = seo.ogDescription.trim() || description;
  const canonical = `${baseStr}/`;

  const ogImage = seo.ogImageUrl.trim();
  const images = ogImage ? [{ url: ogImage }] : [];

  return {
    metadataBase,
    title,
    description,
    robots: parseRobots(seo.robots),
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: seo.ogLocale,
      url: canonical,
      siteName: "BEAUTY EMPIRE",
      title: ogTitle,
      description: ogDescription,
      ...(images.length ? { images } : {}),
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      site: twitterHandle(seo.twitterSite),
      title: ogTitle,
      description: ogDescription,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export function buildBlogPostMetadata(
  post: BlogPostContent,
  site: SeoSiteConfig,
  slug: string,
  ogLocale: string,
): Metadata {
  const metadataBase = resolveMetadataBase(site.siteUrl);
  const baseStr = normalizeBaseUrl(site.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || metadataBase.origin);

  const title = post.seoMetaTitle;
  const description = post.seoMetaDescription;
  const ogTitle = post.seoOgTitle;
  const ogDescription = post.seoOgDescription;
  const imageUrl = post.seoOgImageUrl.trim();
  const canonical = `${baseStr}/blog/${encodeURIComponent(slug)}`;

  const images = imageUrl ? [{ url: imageUrl }] : [];

  return {
    metadataBase,
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      locale: ogLocale,
      url: canonical,
      siteName: "BEAUTY EMPIRE",
      title: ogTitle,
      description: ogDescription,
      publishedTime: post.publishedAt || undefined,
      authors: [post.authorName],
      ...(images.length ? { images } : {}),
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      site: twitterHandle(site.twitterSite),
      title: ogTitle,
      description: ogDescription,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
  };
}

export { SEO_STATIC_FALLBACK_DESCRIPTION as STATIC_FALLBACK_DESC, SEO_STATIC_FALLBACK_TITLE as STATIC_FALLBACK_TITLE };
