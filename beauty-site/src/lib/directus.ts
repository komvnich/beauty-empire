import { createDirectus, rest } from '@directus/sdk';

export interface NavItem {
  label: string;
  href: string;
}

export interface NavigationTranslation {
  languages_id: number;
  cta_label: string;
  items: NavItem[];
}

export interface NavigationSettings {
  id: number;
  translations: NavigationTranslation[];
}

export interface HeroTranslation {
  languages_id: number;
  pre_title: string;
  title_white: string;
  title_gold: string;
  description: string;
  cta_primary: string;
  cta_secondary: string;
}

export interface HeroSettings {
  image_desktop?: string;
  image_mobile?: string;
  translations: HeroTranslation[];
}

export interface Schema {
  navigation_settings: NavigationSettings[];
  hero_settings: HeroSettings;
  stats_settings: StatsSettings;
  benefits_settings: BenefitsSettings;
  author_method_settings: AuthorMethodSettings;
  about_salon_settings: AboutSalonSettings;
  services_settings: ServicesSettings;
  metamorphoses_settings: MetamorphosesSettings;
  process_settings: ProcessSettings;
  education_settings: EducationSettings;
  reviews_settings: ReviewsSettings;
  faq_settings: FaqSettings;
  faq_items: FaqItemRecord[];
  blog_settings: BlogSettings;
  blog_posts: BlogPost[];
  site_contact: SiteContactRow;
  seo_settings: SeoSettingsRecord;
}

export interface StatsItem {
  label: string;
  value: string;
}

export interface StatsTranslation {
  languages_id: number;
  stat_1_label: string;
  stat_1_value: string;
  stat_2_label: string;
  stat_2_value: string;
  stat_3_label: string;
  stat_3_value: string;
  stat_4_label: string;
  stat_4_value: string;
  stat_5_label: string;
  stat_5_value: string;
}

export interface StatsSettings {
  translations: StatsTranslation[];
}

export interface BenefitItem {
  title: string;
  description: string;
}

export interface BenefitsTranslation {
  languages_id: number;
  heading_white: string;
  heading_gold: string;
  cta_label: string;
  benefit_1_title: string;
  benefit_1_description: string;
  benefit_2_title: string;
  benefit_2_description: string;
  benefit_3_title: string;
  benefit_3_description: string;
  benefit_4_title: string;
  benefit_4_description: string;
}

export interface BenefitsSettings {
  image: string;
  translations: BenefitsTranslation[];
}

export interface AuthorMethodSettings {
  image: string;
  translations: AuthorMethodTranslation[];
}

export interface AuthorMethodTranslation {
  languages_id: number;
  heading_before: string;
  heading_highlight: string;
  heading_after: string;
  paragraph_primary: string;
  paragraph_secondary: string;
  section_title: string;
  cta_label: string;
  point_1: string;
  point_2: string;
  point_3: string;
  point_4: string;
  point_5: string;
  point_6: string;
  point_7: string;
}

export interface AboutSalonSettings {
  image: string;
  translations: AboutSalonTranslation[];
}

export interface AboutSalonTranslation {
  languages_id: number;
  heading_before: string;
  heading_highlight: string;
  heading_after: string;
  paragraph_1: string;
  paragraph_2: string;
  paragraph_3: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  priceUsd: string;
  detailsMarkdown: string;
  image: string;
}

export interface ServicesTranslation {
  languages_id: number;
  heading_white: string;
  heading_gold: string;
  description: string;
  service_1_title: string;
  service_1_description: string;
  service_1_price_usd: string;
  service_1_details_markdown: string;
  service_1_image: string | null;
  service_2_title: string;
  service_2_description: string;
  service_2_price_usd: string;
  service_2_details_markdown: string;
  service_2_image: string | null;
  service_3_title: string;
  service_3_description: string;
  service_3_price_usd: string;
  service_3_details_markdown: string;
  service_3_image: string | null;
  service_4_title: string;
  service_4_description: string;
  service_4_price_usd: string;
  service_4_details_markdown: string;
  service_4_image: string | null;
  service_5_title: string;
  service_5_description: string;
  service_5_price_usd: string;
  service_5_details_markdown: string;
  service_5_image: string | null;
  service_6_title: string;
  service_6_description: string;
  service_6_price_usd: string;
  service_6_details_markdown: string;
  service_6_image: string | null;
}

export interface ServicesSettings {
  translations: ServicesTranslation[];
}

export interface MetamorphosisCase {
  beforeImage: string;
  afterImage: string;
  title: string;
  summary: string;
}

export interface MetamorphosisAchievement {
  title: string;
  description: string;
}

export interface MetamorphosesTranslation {
  languages_id: number;
  badge_label: string;
  heading_white: string;
  heading_gold: string;
  description: string;
  cta_label: string;
  before_label: string;
  after_label: string;
  helper_label: string;
  case_label_prefix: string;
  case_1_title: string;
  case_1_summary: string;
  case_1_before_image: string | null;
  case_1_after_image: string | null;
  case_2_title: string;
  case_2_summary: string;
  case_2_before_image: string | null;
  case_2_after_image: string | null;
  case_3_title: string;
  case_3_summary: string;
  case_3_before_image: string | null;
  case_3_after_image: string | null;
  achievement_1_title: string;
  achievement_1_description: string;
  achievement_2_title: string;
  achievement_2_description: string;
  achievement_3_title: string;
  achievement_3_description: string;
  achievement_4_title: string;
  achievement_4_description: string;
}

export interface MetamorphosesSettings {
  translations: MetamorphosesTranslation[];
}

export interface ProcessStep {
  icon: string;
  title: string;
  description: string;
}

export interface ProcessTranslation {
  languages_id: number;
  heading_before: string;
  heading_highlight: string;
  heading_after: string;
  cta_label: string;
  image: string | null;
  step_1_icon: string;
  step_1_title: string;
  step_1_description: string;
  step_2_icon: string;
  step_2_title: string;
  step_2_description: string;
  step_3_icon: string;
  step_3_title: string;
  step_3_description: string;
  step_4_icon: string;
  step_4_title: string;
  step_4_description: string;
  step_5_icon: string;
  step_5_title: string;
  step_5_description: string;
}

export interface ProcessSettings {
  translations: ProcessTranslation[];
}

export interface EducationTranslation {
  languages_id: number;
  heading_before: string;
  heading_highlight: string;
  intro_primary: string;
  intro_secondary: string;
  key_title: string;
  key_description: string;
  guide_button_label: string;
  guide_file: string | null;
  warning_badge_label: string;
  warning_text: string;
  warning_point_1: string;
  warning_point_2: string;
  warning_point_3: string;
  quote_text: string;
}

export interface EducationSettings {
  translations: EducationTranslation[];
}

export interface ReviewsTranslation {
  languages_id: number;
  heading_before: string;
  heading_highlight: string;
  heading_after: string;
  review_1_name: string;
  review_1_comment: string;
  review_1_rating: number;
  review_2_name: string;
  review_2_comment: string;
  review_2_rating: number;
  review_3_name: string;
  review_3_comment: string;
  review_3_rating: number;
}

export interface ReviewsSettings {
  translations: ReviewsTranslation[];
}

export interface FaqSettingsTranslationRow {
  languages_id: number;
  heading: string;
}

export interface FaqSettings {
  id: number;
  translations: FaqSettingsTranslationRow[];
}

export interface FaqItemTranslationRow {
  languages_id: number;
  question: string;
  answer: string;
}

export interface FaqItemRecord {
  id: number;
  sort: number;
  faq_settings_id: number;
  translations: FaqItemTranslationRow[];
}

export interface BlogSettingsTranslation {
  languages_id: number;
  heading_white: string;
  heading_gold: string;
  description: string;
  read_more_label: string;
}

export interface BlogSettings {
  translations: BlogSettingsTranslation[];
}

export interface BlogPostTranslation {
  languages_id: number;
  title: string;
  excerpt: string;
  content_html: string;
  content_lexical: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  og_title?: string | null;
  og_description?: string | null;
  seo_og_image?: string | null;
}

export interface BlogPost {
  id: number;
  slug: string;
  cover_image: string | null;
  video_url: string | null;
  author_name: string;
  reading_minutes: number;
  published_at: string | null;
  status: string;
  translations: BlogPostTranslation[];
}

interface DirectusItemsResponse<T> {
  data: T;
}

type JsonValue = string | number | boolean | null | JsonObject | JsonValue[];
interface JsonObject {
  [key: string]: JsonValue;
}

interface NavigationTranslationDto {
  languages_id: number;
  cta_label: string;
  items: NavItem[];
}

interface NavigationSettingsDto {
  id: number;
  translations: NavigationTranslationDto[];
}

interface HeroTranslationDto {
  languages_id: number;
  pre_title: string;
  title_white: string;
  title_gold: string;
  description: string;
  cta_primary: string;
  cta_secondary: string;
}

interface HeroSettingsDto {
  pre_title?: string | null;
  title_white?: string | null;
  title_gold?: string | null;
  description?: string | null;
  cta_primary?: string | null;
  cta_secondary?: string | null;
  image_desktop?: string | null;
  image_mobile?: string | null;
  translations?: HeroTranslationDto[];
}

interface StatsTranslationDto {
  languages_id: number;
  stat_1_label: string;
  stat_1_value: string;
  stat_2_label: string;
  stat_2_value: string;
  stat_3_label: string;
  stat_3_value: string;
  stat_4_label: string;
  stat_4_value: string;
  stat_5_label: string;
  stat_5_value: string;
}

interface StatsSettingsDto {
  translations?: StatsTranslationDto[];
}

interface BenefitsTranslationDto {
  languages_id: number;
  heading_white: string;
  heading_gold: string;
  cta_label: string;
  benefit_1_title: string;
  benefit_1_description: string;
  benefit_2_title: string;
  benefit_2_description: string;
  benefit_3_title: string;
  benefit_3_description: string;
  benefit_4_title: string;
  benefit_4_description: string;
}

interface BenefitsSettingsDto {
  image?: string | null;
  translations?: BenefitsTranslationDto[];
}

interface AuthorMethodTranslationDto {
  languages_id: number;
  heading_before: string;
  heading_highlight: string;
  heading_after: string;
  paragraph_primary: string;
  paragraph_secondary: string;
  section_title: string;
  cta_label: string;
  point_1: string;
  point_2: string;
  point_3: string;
  point_4: string;
  point_5: string;
  point_6: string;
  point_7: string;
}

interface AuthorMethodSettingsDto {
  image?: string | null;
  translations?: AuthorMethodTranslationDto[];
}

interface AboutSalonTranslationDto {
  languages_id: number;
  heading_before: string;
  heading_highlight: string;
  heading_after: string;
  paragraph_1: string;
  paragraph_2: string;
  paragraph_3: string;
}

interface AboutSalonSettingsDto {
  image?: string | null;
  translations?: AboutSalonTranslationDto[];
}

interface ServicesTranslationDto {
  languages_id: number;
  heading_white: string;
  heading_gold: string;
  description: string;
  service_1_title: string;
  service_1_description: string;
  service_1_price_usd: string;
  service_1_details_markdown: string;
  service_1_image?: string | null;
  service_2_title: string;
  service_2_description: string;
  service_2_price_usd: string;
  service_2_details_markdown: string;
  service_2_image?: string | null;
  service_3_title: string;
  service_3_description: string;
  service_3_price_usd: string;
  service_3_details_markdown: string;
  service_3_image?: string | null;
  service_4_title: string;
  service_4_description: string;
  service_4_price_usd: string;
  service_4_details_markdown: string;
  service_4_image?: string | null;
  service_5_title: string;
  service_5_description: string;
  service_5_price_usd: string;
  service_5_details_markdown: string;
  service_5_image?: string | null;
  service_6_title: string;
  service_6_description: string;
  service_6_price_usd: string;
  service_6_details_markdown: string;
  service_6_image?: string | null;
}

interface ServicesSettingsDto {
  translations?: ServicesTranslationDto[];
}

interface MetamorphosesTranslationDto {
  languages_id: number;
  badge_label: string;
  heading_white: string;
  heading_gold: string;
  description: string;
  cta_label: string;
  before_label: string;
  after_label: string;
  helper_label: string;
  case_label_prefix: string;
  case_1_title: string;
  case_1_summary: string;
  case_1_before_image?: string | null;
  case_1_after_image?: string | null;
  case_2_title: string;
  case_2_summary: string;
  case_2_before_image?: string | null;
  case_2_after_image?: string | null;
  case_3_title: string;
  case_3_summary: string;
  case_3_before_image?: string | null;
  case_3_after_image?: string | null;
  achievement_1_title: string;
  achievement_1_description: string;
  achievement_2_title: string;
  achievement_2_description: string;
  achievement_3_title: string;
  achievement_3_description: string;
  achievement_4_title: string;
  achievement_4_description: string;
}

interface MetamorphosesSettingsDto {
  translations?: MetamorphosesTranslationDto[];
}

interface ProcessTranslationDto {
  languages_id: number;
  heading_before: string;
  heading_highlight: string;
  heading_after: string;
  cta_label: string;
  image?: string | null;
  step_1_icon: string;
  step_1_title: string;
  step_1_description: string;
  step_2_icon: string;
  step_2_title: string;
  step_2_description: string;
  step_3_icon: string;
  step_3_title: string;
  step_3_description: string;
  step_4_icon: string;
  step_4_title: string;
  step_4_description: string;
  step_5_icon: string;
  step_5_title: string;
  step_5_description: string;
}

interface ProcessSettingsDto {
  translations?: ProcessTranslationDto[];
}

interface EducationTranslationDto {
  languages_id: number;
  heading_before: string;
  heading_highlight: string;
  intro_primary: string;
  intro_secondary: string;
  key_title: string;
  key_description: string;
  guide_button_label: string;
  guide_file?: string | null;
  warning_badge_label: string;
  warning_text: string;
  warning_point_1: string;
  warning_point_2: string;
  warning_point_3: string;
  quote_text: string;
}

interface EducationSettingsDto {
  translations?: EducationTranslationDto[];
}

interface ReviewsTranslationDto {
  languages_id: number;
  heading_before: string;
  heading_highlight: string;
  heading_after: string;
  review_1_name: string;
  review_1_comment: string;
  review_1_rating: number;
  review_2_name: string;
  review_2_comment: string;
  review_2_rating: number;
  review_3_name: string;
  review_3_comment: string;
  review_3_rating: number;
}

interface ReviewsSettingsDto {
  translations?: ReviewsTranslationDto[];
}

interface FaqSettingsTranslationDto {
  languages_id: number;
  heading: string;
}

interface FaqSettingsDto {
  id: number;
  translations?: FaqSettingsTranslationDto[];
}

interface FaqItemTranslationDto {
  languages_id: number;
  question: string;
  answer: string;
}

interface FaqItemDto {
  id: number;
  sort: number;
  faq_settings_id: number;
  translations?: FaqItemTranslationDto[];
}

interface SiteContactDto {
  address?: string | null;
  maps_url?: string | null;
  phone_display?: string | null;
  phone_href?: string | null;
  email?: string | null;
  email_href?: string | null;
  instagram_url?: string | null;
  facebook_url?: string | null;
}

interface BlogSettingsTranslationDto {
  languages_id: number;
  heading_white: string;
  heading_gold: string;
  description: string;
  read_more_label: string;
}

interface BlogSettingsDto {
  translations?: BlogSettingsTranslationDto[];
}

interface BlogPostTranslationDto {
  languages_id: number;
  title: string;
  excerpt: string;
  content_html: string;
  content_lexical?: JsonValue;
  meta_title?: string | null;
  meta_description?: string | null;
  og_title?: string | null;
  og_description?: string | null;
  seo_og_image?: string | null;
}

interface SeoSettingsTranslationDto {
  languages_id: number;
  meta_title?: string | null;
  meta_description?: string | null;
  og_title?: string | null;
  og_description?: string | null;
  og_image?: string | null;
  robots?: string | null;
}

interface SeoSettingsDto {
  id?: number;
  site_url?: string | null;
  twitter_site?: string | null;
  translations?: SeoSettingsTranslationDto[];
}

interface BlogPostDto {
  id: number;
  slug: string;
  cover_image?: string | null;
  video_url?: string | null;
  author_name?: string;
  reading_minutes?: number;
  published_at?: string | null;
  status?: string | null;
  translations?: BlogPostTranslationDto[];
}

export interface HeroContent {
  preTitle: string;
  titleWhite: string;
  titleGold: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  imageDesktop: string;
  imageMobile: string;
}

export interface StatsContent {
  items: StatsItem[];
}

export interface BenefitsContent {
  headingWhite: string;
  headingGold: string;
  ctaLabel: string;
  image: string;
  items: BenefitItem[];
}

export interface AuthorMethodContent {
  headingBefore: string;
  headingHighlight: string;
  headingAfter: string;
  paragraphPrimary: string;
  paragraphSecondary: string;
  sectionTitle: string;
  ctaLabel: string;
  image: string;
  points: string[];
}

export interface AboutSalonContent {
  headingBefore: string;
  headingHighlight: string;
  headingAfter: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  image: string;
}

export interface ServicesContent {
  headingWhite: string;
  headingGold: string;
  description: string;
  items: ServiceItem[];
}

export interface MetamorphosesContent {
  badgeLabel: string;
  headingWhite: string;
  headingGold: string;
  description: string;
  ctaLabel: string;
  beforeLabel: string;
  afterLabel: string;
  helperLabel: string;
  caseLabelPrefix: string;
  cases: MetamorphosisCase[];
  achievements: MetamorphosisAchievement[];
}

export interface ProcessContent {
  headingBefore: string;
  headingHighlight: string;
  headingAfter: string;
  ctaLabel: string;
  image: string;
  steps: ProcessStep[];
}

export interface EducationContent {
  headingBefore: string;
  headingHighlight: string;
  introPrimary: string;
  introSecondary: string;
  keyTitle: string;
  keyDescription: string;
  guideButtonLabel: string;
  guideFileUrl: string;
  warningBadgeLabel: string;
  warningText: string;
  warningPoints: string[];
  quoteText: string;
}

export interface BlogCardItem {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  authorName: string;
  readingMinutes: number;
  publishedAt: string;
}

export interface BlogListContent {
  headingWhite: string;
  headingGold: string;
  description: string;
  readMoreLabel: string;
  items: BlogCardItem[];
}

export interface BlogPostContent {
  slug: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  contentLexical: string;
  coverImage: string;
  videoUrl: string;
  authorName: string;
  readingMinutes: number;
  publishedAt: string;
  seoMetaTitle: string;
  seoMetaDescription: string;
  seoOgTitle: string;
  seoOgDescription: string;
  seoOgImageUrl: string;
}

export interface ReviewItem {
  name: string;
  comment: string;
  rating: number;
}

export interface ReviewsContent {
  headingBefore: string;
  headingHighlight: string;
  headingAfter: string;
  items: ReviewItem[];
}

export interface FaqListItem {
  question: string;
  answer: string;
}

export interface FaqContent {
  heading: string;
  items: FaqListItem[];
}

export interface SiteContactRow {
  address: string;
  maps_url: string;
  phone_display: string;
  phone_href: string;
  email: string;
  email_href: string;
  instagram_url: string;
  facebook_url: string;
}

export interface SiteContactContent {
  address: string;
  mapsUrl: string;
  phoneDisplay: string;
  phoneHref: string;
  email: string;
  emailHref: string;
  instagramUrl: string;
  facebookUrl: string;
}

export interface SeoSettingsTranslationRow {
  languages_id: number;
  meta_title: string;
  meta_description: string;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  robots: string | null;
}

export interface SeoSettingsRecord {
  id: number;
  site_url: string;
  twitter_site: string | null;
  translations: SeoSettingsTranslationRow[];
}

export interface LandingSeoPayload {
  siteUrl: string;
  twitterSite: string;
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  ogImageUrl: string;
  robots: string;
  ogLocale: string;
}

export interface SeoSiteConfig {
  siteUrl: string;
  twitterSite: string;
}

export const SEO_STATIC_FALLBACK_TITLE = 'BEAUTY EMPIRE | Przedłużanie Włosów Warszawa';
export const SEO_STATIC_FALLBACK_DESCRIPTION =
  'Ekskluzywne przedłużanie włosów w Warszawie. Metamorfozy, które odmienią Twoje życie. Zarezerwuj darmową konsultację.';

function trimTrailingSlash(url: string): string {
  return url.replace(/\/+$/, '');
}

const directusApiUrl = trimTrailingSlash(
  process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055'
);

const directusAssetsBaseUrl = trimTrailingSlash(
  process.env.NEXT_PUBLIC_DIRECTUS_ASSETS_URL?.trim() || directusApiUrl
);

const LANG_MAP: Record<string, number> = {
  'pl-PL': 1,
  pl: 1,
  'ru-RU': 2,
  ru: 2,
  'uk-UA': 4,
  uk: 4,
  ua: 4,
  'en-US': 3
  ,
  en: 3
};

export const directus = createDirectus<Schema>(directusApiUrl).with(rest());

export function getAssetUrl(assetId: string | null) {
  if (!assetId) return '';
  return `${directusAssetsBaseUrl}/assets/${assetId}`;
}

function normalizeLangCode(langCode: string): string {
  if (LANG_MAP[langCode]) return langCode;
  const shortCode = langCode.split('-')[0]?.toLowerCase() ?? '';
  return LANG_MAP[shortCode] ? shortCode : 'pl-PL';
}

const OG_LOCALE_BY_LANG_ID: Record<number, string> = {
  1: 'pl_PL',
  2: 'ru_RU',
  3: 'en_US',
  4: 'uk_UA',
};

export function getOgLocaleForLang(langCode: string): string {
  const normalized = normalizeLangCode(langCode);
  const id = LANG_MAP[normalized] ?? LANG_MAP['pl-PL'];
  return OG_LOCALE_BY_LANG_ID[id] ?? 'pl_PL';
}

function stripToPlainMetaDescription(source: string, maxLen: number): string {
  const plain = source.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  if (plain.length <= maxLen) return plain;
  return `${plain.slice(0, maxLen - 1).trimEnd()}…`;
}

async function fetchFromDirectus<T>(collection: string, fields: string = '*'): Promise<T | null> {
    const res = await fetch(
      `${directusApiUrl}/items/${collection}?fields=${fields}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
        next: { revalidate: 0 }
      }
    );
    if (!res.ok) return null;
    const body = (await res.json()) as DirectusItemsResponse<T>;
    const { data } = body;
    return data;
}

async function fetchDirectusList<T>(collection: string, query: string): Promise<T[] | null> {
  const res = await fetch(`${directusApiUrl}/items/${collection}?${query}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
    next: { revalidate: 0 }
  });
  if (!res.ok) return null;
  const body = (await res.json()) as { data: T[] };
  return body.data ?? null;
}

export async function getNavigation(langCode: string = 'pl-PL') {
  try {
    const normalizedLang = normalizeLangCode(langCode);
    const targetId = LANG_MAP[normalizedLang] || LANG_MAP['pl-PL'];
    const data = await fetchFromDirectus<NavigationSettingsDto[] | NavigationSettingsDto>('navigation_settings', 'id,translations.*');
    
    if (!data) return { items: [], cta_label: 'Umów się' };
    const entry = Array.isArray(data) ? data[0] : data;
    const translation = entry.translations?.find((t) => t.languages_id === targetId) || entry.translations?.[0];

    return {
      items: translation?.items || [],
      cta_label: translation?.cta_label || 'Umów się'
    };
  } catch (error) {
    console.error('Error fetching navigation:', error);
    return { items: [], cta_label: 'Umów się' };
  }
}

export async function getHeroData(langCode: string = 'pl-PL') {
  try {
    const normalizedLang = normalizeLangCode(langCode);
    const targetId = LANG_MAP[normalizedLang] || LANG_MAP['pl-PL'];
    const data =
      (await fetchFromDirectus<HeroSettingsDto[] | HeroSettingsDto>('hero_settings', '*,translations.*')) ??
      (await fetchFromDirectus<HeroSettingsDto[] | HeroSettingsDto>('hero_settings', '*'));
    
    if (!data) return null;
    const entry = Array.isArray(data) ? data[0] : data;
    if (!entry) return null;

    const translation = entry.translations?.find((t) => t.languages_id === targetId) || entry.translations?.[0];

    const preTitle = translation?.pre_title ?? entry.pre_title;
    const titleWhite = translation?.title_white ?? entry.title_white;
    const titleGold = translation?.title_gold ?? entry.title_gold;
    const description = translation?.description ?? entry.description;
    const ctaPrimary = translation?.cta_primary ?? entry.cta_primary;
    const ctaSecondary = translation?.cta_secondary ?? entry.cta_secondary;

    if (!preTitle || !titleWhite || !titleGold || !description || !ctaPrimary) return null;

    const hero: HeroContent = {
      preTitle,
      titleWhite,
      titleGold,
      description,
      ctaPrimary,
      ctaSecondary: ctaSecondary ?? '',
      imageDesktop: getAssetUrl(entry.image_desktop ?? null),
      imageMobile: getAssetUrl(entry.image_mobile ?? null)
    };

    return hero;
  } catch (error) {
    console.error('Error fetching hero data:', error);
    return null;
  }
}

export async function getStatsData(langCode: string = 'pl-PL'): Promise<StatsContent | null> {
  try {
    const normalizedLang = normalizeLangCode(langCode);
    const targetId = LANG_MAP[normalizedLang] || LANG_MAP['pl-PL'];
    const data = await fetchFromDirectus<StatsSettingsDto[] | StatsSettingsDto>('stats_settings', 'translations.*');
    if (!data) return null;

    const entry = Array.isArray(data) ? data[0] : data;
    if (!entry?.translations?.length) return null;

    const translation = entry.translations.find((t) => t.languages_id === targetId) || entry.translations[0];
    if (!translation) return null;

    const items: StatsItem[] = [
      { label: translation.stat_1_label, value: translation.stat_1_value },
      { label: translation.stat_2_label, value: translation.stat_2_value },
      { label: translation.stat_3_label, value: translation.stat_3_value },
      { label: translation.stat_4_label, value: translation.stat_4_value },
      { label: translation.stat_5_label, value: translation.stat_5_value }
    ];

    if (items.some((item) => !item.label || !item.value)) return null;

    return { items };
  } catch (error) {
    console.error('Error fetching stats data:', error);
    return null;
  }
}

export async function getBenefitsData(langCode: string = 'pl-PL'): Promise<BenefitsContent | null> {
  try {
    const normalizedLang = normalizeLangCode(langCode);
    const targetId = LANG_MAP[normalizedLang] || LANG_MAP['pl-PL'];
    const data = await fetchFromDirectus<BenefitsSettingsDto[] | BenefitsSettingsDto>('benefits_settings', 'image,translations.*');
    if (!data) return null;

    const entry = Array.isArray(data) ? data[0] : data;
    if (!entry?.translations?.length) return null;

    const translation = entry.translations.find((t) => t.languages_id === targetId) || entry.translations[0];
    if (!translation) return null;

    const items: BenefitItem[] = [
      { title: translation.benefit_1_title, description: translation.benefit_1_description },
      { title: translation.benefit_2_title, description: translation.benefit_2_description },
      { title: translation.benefit_3_title, description: translation.benefit_3_description },
      { title: translation.benefit_4_title, description: translation.benefit_4_description }
    ];

    if (!translation.heading_white || !translation.heading_gold || !translation.cta_label || items.some((item) => !item.title || !item.description)) {
      return null;
    }

    return {
      headingWhite: translation.heading_white,
      headingGold: translation.heading_gold,
      ctaLabel: translation.cta_label,
      image: getAssetUrl(entry.image ?? null),
      items
    };
  } catch (error) {
    console.error('Error fetching benefits data:', error);
    return null;
  }
}

export async function getAuthorMethodData(langCode: string = 'pl-PL'): Promise<AuthorMethodContent | null> {
  try {
    const normalizedLang = normalizeLangCode(langCode);
    const targetId = LANG_MAP[normalizedLang] || LANG_MAP['pl-PL'];
    const data = await fetchFromDirectus<AuthorMethodSettingsDto[] | AuthorMethodSettingsDto>('author_method_settings', 'image,translations.*');
    if (!data) return null;

    const entry = Array.isArray(data) ? data[0] : data;
    if (!entry?.translations?.length) return null;

    const translation = entry.translations.find((t) => t.languages_id === targetId) || entry.translations[0];
    if (!translation) return null;

    const points = [
      translation.point_1,
      translation.point_2,
      translation.point_3,
      translation.point_4,
      translation.point_5,
      translation.point_6,
      translation.point_7
    ];

    if (
      !translation.heading_before ||
      !translation.heading_highlight ||
      !translation.heading_after ||
      !translation.paragraph_primary ||
      !translation.paragraph_secondary ||
      !translation.section_title ||
      !translation.cta_label ||
      points.some((point) => !point)
    ) {
      return null;
    }

    return {
      headingBefore: translation.heading_before,
      headingHighlight: translation.heading_highlight,
      headingAfter: translation.heading_after,
      paragraphPrimary: translation.paragraph_primary,
      paragraphSecondary: translation.paragraph_secondary,
      sectionTitle: translation.section_title,
      ctaLabel: translation.cta_label,
      image: getAssetUrl(entry.image ?? null),
      points
    };
  } catch (error) {
    console.error('Error fetching author method data:', error);
    return null;
  }
}

export async function getAboutSalonData(langCode: string = 'pl-PL'): Promise<AboutSalonContent | null> {
  try {
    const normalizedLang = normalizeLangCode(langCode);
    const targetId = LANG_MAP[normalizedLang] || LANG_MAP['pl-PL'];
    const data = await fetchFromDirectus<AboutSalonSettingsDto[] | AboutSalonSettingsDto>('about_salon_settings', 'image,translations.*');
    if (!data) return null;

    const entry = Array.isArray(data) ? data[0] : data;
    if (!entry?.translations?.length) return null;

    const translation = entry.translations.find((t) => t.languages_id === targetId) || entry.translations[0];
    if (!translation) return null;

    if (
      !translation.heading_before ||
      !translation.heading_highlight ||
      !translation.heading_after ||
      !translation.paragraph_1 ||
      !translation.paragraph_2 ||
      !translation.paragraph_3
    ) {
      return null;
    }

    return {
      headingBefore: translation.heading_before,
      headingHighlight: translation.heading_highlight,
      headingAfter: translation.heading_after,
      paragraph1: translation.paragraph_1,
      paragraph2: translation.paragraph_2,
      paragraph3: translation.paragraph_3,
      image: getAssetUrl(entry.image ?? null)
    };
  } catch (error) {
    console.error('Error fetching about salon data:', error);
    return null;
  }
}

export async function getServicesData(langCode: string = 'pl-PL'): Promise<ServicesContent | null> {
  try {
    const normalizedLang = normalizeLangCode(langCode);
    const targetId = LANG_MAP[normalizedLang] || LANG_MAP['pl-PL'];
    const data = await fetchFromDirectus<ServicesSettingsDto[] | ServicesSettingsDto>('services_settings', 'translations.*');
    if (!data) return null;

    const entry = Array.isArray(data) ? data[0] : data;
    if (!entry?.translations?.length) return null;

    const translation = entry.translations.find((t) => t.languages_id === targetId) || entry.translations[0];
    if (!translation) return null;

    const items: ServiceItem[] = [
      {
        title: translation.service_1_title,
        description: translation.service_1_description,
        priceUsd: translation.service_1_price_usd,
        detailsMarkdown: translation.service_1_details_markdown,
        image: getAssetUrl(translation.service_1_image ?? null)
      },
      {
        title: translation.service_2_title,
        description: translation.service_2_description,
        priceUsd: translation.service_2_price_usd,
        detailsMarkdown: translation.service_2_details_markdown,
        image: getAssetUrl(translation.service_2_image ?? null)
      },
      {
        title: translation.service_3_title,
        description: translation.service_3_description,
        priceUsd: translation.service_3_price_usd,
        detailsMarkdown: translation.service_3_details_markdown,
        image: getAssetUrl(translation.service_3_image ?? null)
      },
      {
        title: translation.service_4_title,
        description: translation.service_4_description,
        priceUsd: translation.service_4_price_usd,
        detailsMarkdown: translation.service_4_details_markdown,
        image: getAssetUrl(translation.service_4_image ?? null)
      },
      {
        title: translation.service_5_title,
        description: translation.service_5_description,
        priceUsd: translation.service_5_price_usd,
        detailsMarkdown: translation.service_5_details_markdown,
        image: getAssetUrl(translation.service_5_image ?? null)
      },
      {
        title: translation.service_6_title,
        description: translation.service_6_description,
        priceUsd: translation.service_6_price_usd,
        detailsMarkdown: translation.service_6_details_markdown,
        image: getAssetUrl(translation.service_6_image ?? null)
      }
    ];

    if (
      !translation.heading_white ||
      !translation.heading_gold ||
      !translation.description ||
      items.some((item) => !item.title || !item.description || !item.priceUsd || !item.detailsMarkdown)
    ) {
      return null;
    }

    return {
      headingWhite: translation.heading_white,
      headingGold: translation.heading_gold,
      description: translation.description,
      items
    };
  } catch (error) {
    console.error('Error fetching services data:', error);
    return null;
  }
}

export async function getMetamorphosesData(langCode: string = 'pl-PL'): Promise<MetamorphosesContent | null> {
  try {
    const normalizedLang = normalizeLangCode(langCode);
    const targetId = LANG_MAP[normalizedLang] || LANG_MAP['pl-PL'];
    const data = await fetchFromDirectus<MetamorphosesSettingsDto[] | MetamorphosesSettingsDto>('metamorphoses_settings', 'translations.*');
    if (!data) return null;

    const entry = Array.isArray(data) ? data[0] : data;
    if (!entry?.translations?.length) return null;
    const translation = entry.translations.find((t) => t.languages_id === targetId) || entry.translations[0];
    if (!translation) return null;

    const cases: MetamorphosisCase[] = [
      {
        beforeImage: getAssetUrl(translation.case_1_before_image ?? null),
        afterImage: getAssetUrl(translation.case_1_after_image ?? null),
        title: translation.case_1_title,
        summary: translation.case_1_summary
      },
      {
        beforeImage: getAssetUrl(translation.case_2_before_image ?? null),
        afterImage: getAssetUrl(translation.case_2_after_image ?? null),
        title: translation.case_2_title,
        summary: translation.case_2_summary
      },
      {
        beforeImage: getAssetUrl(translation.case_3_before_image ?? null),
        afterImage: getAssetUrl(translation.case_3_after_image ?? null),
        title: translation.case_3_title,
        summary: translation.case_3_summary
      }
    ];

    const achievements: MetamorphosisAchievement[] = [
      { title: translation.achievement_1_title, description: translation.achievement_1_description },
      { title: translation.achievement_2_title, description: translation.achievement_2_description },
      { title: translation.achievement_3_title, description: translation.achievement_3_description },
      { title: translation.achievement_4_title, description: translation.achievement_4_description }
    ];

    if (
      !translation.badge_label ||
      !translation.heading_white ||
      !translation.heading_gold ||
      !translation.description ||
      !translation.cta_label ||
      !translation.before_label ||
      !translation.after_label ||
      !translation.helper_label ||
      !translation.case_label_prefix ||
      cases.some((item) => !item.title || !item.summary) ||
      achievements.some((item) => !item.title || !item.description)
    ) {
      return null;
    }

    return {
      badgeLabel: translation.badge_label,
      headingWhite: translation.heading_white,
      headingGold: translation.heading_gold,
      description: translation.description,
      ctaLabel: translation.cta_label,
      beforeLabel: translation.before_label,
      afterLabel: translation.after_label,
      helperLabel: translation.helper_label,
      caseLabelPrefix: translation.case_label_prefix,
      cases,
      achievements
    };
  } catch (error) {
    console.error('Error fetching metamorphoses data:', error);
    return null;
  }
}

export async function getProcessData(langCode: string = 'pl-PL'): Promise<ProcessContent | null> {
  try {
    const normalizedLang = normalizeLangCode(langCode);
    const targetId = LANG_MAP[normalizedLang] || LANG_MAP['pl-PL'];
    const data = await fetchFromDirectus<ProcessSettingsDto[] | ProcessSettingsDto>('process_settings', 'translations.*');
    if (!data) return null;

    const entry = Array.isArray(data) ? data[0] : data;
    if (!entry?.translations?.length) return null;
    const translation = entry.translations.find((t) => t.languages_id === targetId) || entry.translations[0];
    if (!translation) return null;

    const steps: ProcessStep[] = [
      { icon: translation.step_1_icon, title: translation.step_1_title, description: translation.step_1_description },
      { icon: translation.step_2_icon, title: translation.step_2_title, description: translation.step_2_description },
      { icon: translation.step_3_icon, title: translation.step_3_title, description: translation.step_3_description },
      { icon: translation.step_4_icon, title: translation.step_4_title, description: translation.step_4_description },
      { icon: translation.step_5_icon, title: translation.step_5_title, description: translation.step_5_description }
    ];

    if (
      !translation.heading_before ||
      !translation.heading_highlight ||
      !translation.heading_after ||
      !translation.cta_label ||
      steps.some((step) => !step.icon || !step.title || !step.description)
    ) {
      return null;
    }

    return {
      headingBefore: translation.heading_before,
      headingHighlight: translation.heading_highlight,
      headingAfter: translation.heading_after,
      ctaLabel: translation.cta_label,
      image: getAssetUrl(translation.image ?? null),
      steps
    };
  } catch (error) {
    console.error('Error fetching process data:', error);
    return null;
  }
}

export async function getEducationData(langCode: string = 'pl-PL'): Promise<EducationContent | null> {
  try {
    const normalizedLang = normalizeLangCode(langCode);
    const targetId = LANG_MAP[normalizedLang] || LANG_MAP['pl-PL'];
    const data = await fetchFromDirectus<EducationSettingsDto[] | EducationSettingsDto>('education_settings', 'translations.*');
    if (!data) return null;

    const entry = Array.isArray(data) ? data[0] : data;
    if (!entry?.translations?.length) return null;
    const translation = entry.translations.find((t) => t.languages_id === targetId) || entry.translations[0];
    if (!translation) return null;

    const warningPoints = [
      translation.warning_point_1,
      translation.warning_point_2,
      translation.warning_point_3
    ];

    if (
      !translation.heading_before ||
      !translation.heading_highlight ||
      !translation.intro_primary ||
      !translation.intro_secondary ||
      !translation.key_title ||
      !translation.key_description ||
      !translation.guide_button_label ||
      !translation.warning_badge_label ||
      !translation.warning_text ||
      !translation.quote_text ||
      warningPoints.some((point) => !point)
    ) {
      return null;
    }

    return {
      headingBefore: translation.heading_before,
      headingHighlight: translation.heading_highlight,
      introPrimary: translation.intro_primary,
      introSecondary: translation.intro_secondary,
      keyTitle: translation.key_title,
      keyDescription: translation.key_description,
      guideButtonLabel: translation.guide_button_label,
      guideFileUrl: getAssetUrl(translation.guide_file ?? null),
      warningBadgeLabel: translation.warning_badge_label,
      warningText: translation.warning_text,
      warningPoints,
      quoteText: translation.quote_text
    };
  } catch (error) {
    console.error('Error fetching education data:', error);
    return null;
  }
}

function clampReviewRating(value: unknown): number {
  const n = typeof value === 'number' ? value : Number(String(value));
  if (!Number.isFinite(n)) return 5;
  return Math.min(5, Math.max(1, Math.round(n)));
}

export async function getReviewsData(langCode: string = 'pl-PL'): Promise<ReviewsContent | null> {
  try {
    const normalizedLang = normalizeLangCode(langCode);
    const targetId = LANG_MAP[normalizedLang] || LANG_MAP['pl-PL'];
    const data = await fetchFromDirectus<ReviewsSettingsDto[] | ReviewsSettingsDto>('reviews_settings', 'translations.*');
    if (!data) return null;

    const entry = Array.isArray(data) ? data[0] : data;
    if (!entry?.translations?.length) return null;
    const translation = entry.translations.find((t) => t.languages_id === targetId) || entry.translations[0];
    if (!translation) return null;

    const items: ReviewItem[] = [
      {
        name: translation.review_1_name,
        comment: translation.review_1_comment,
        rating: clampReviewRating(translation.review_1_rating)
      },
      {
        name: translation.review_2_name,
        comment: translation.review_2_comment,
        rating: clampReviewRating(translation.review_2_rating)
      },
      {
        name: translation.review_3_name,
        comment: translation.review_3_comment,
        rating: clampReviewRating(translation.review_3_rating)
      }
    ];

    if (
      !translation.heading_before ||
      !translation.heading_highlight ||
      !translation.heading_after ||
      items.some((item) => !item.name || !item.comment)
    ) {
      return null;
    }

    return {
      headingBefore: translation.heading_before,
      headingHighlight: translation.heading_highlight,
      headingAfter: translation.heading_after,
      items
    };
  } catch (error) {
    console.error('Error fetching reviews data:', error);
    return null;
  }
}

export async function getFaqData(langCode: string = 'pl-PL'): Promise<FaqContent | null> {
  try {
    const normalizedLang = normalizeLangCode(langCode);
    const targetId = LANG_MAP[normalizedLang] || LANG_MAP['pl-PL'];
    const settingsData = await fetchFromDirectus<FaqSettingsDto[] | FaqSettingsDto>('faq_settings', 'id,translations.*');
    if (!settingsData) return null;

    const settingsEntry = Array.isArray(settingsData) ? settingsData[0] : settingsData;
    if (!settingsEntry?.translations?.length) return null;
    const settingsTranslation =
      settingsEntry.translations.find((t) => t.languages_id === targetId) || settingsEntry.translations[0];
    if (!settingsTranslation?.heading) return null;

    const settingsId = settingsEntry.id;
    const fields = encodeURIComponent('sort,translations.*');
    const itemsRaw = await fetchDirectusList<FaqItemDto>(
      'faq_items',
      `fields=${fields}&filter[faq_settings_id][_eq]=${settingsId}&sort=sort`
    );
    if (!itemsRaw?.length) return null;

    const items: FaqListItem[] = [];
    for (const row of itemsRaw) {
      const tr = row.translations?.find((t) => t.languages_id === targetId) || row.translations?.[0];
      if (!tr?.question || !tr?.answer) return null;
      items.push({ question: tr.question, answer: tr.answer });
    }

    return {
      heading: settingsTranslation.heading,
      items
    };
  } catch (error) {
    console.error('Error fetching FAQ data:', error);
    return null;
  }
}

export async function getSiteContactData(): Promise<SiteContactContent | null> {
  try {
    const data = await fetchFromDirectus<SiteContactDto | SiteContactDto[]>('site_contact', '*');
    if (!data) return null;
    const entry = Array.isArray(data) ? data[0] : data;
    if (!entry) return null;

    const address = entry.address?.trim() ?? '';
    const mapsUrl = entry.maps_url?.trim() ?? '';
    const phoneDisplay = entry.phone_display?.trim() ?? '';
    const phoneHref = entry.phone_href?.trim() ?? '';
    const email = entry.email?.trim() ?? '';
    const emailHref = entry.email_href?.trim() ?? '';
    const instagramUrl = entry.instagram_url?.trim() ?? '';
    const facebookUrl = entry.facebook_url?.trim() ?? '';

    if (!address || !mapsUrl || !phoneDisplay || !phoneHref || !email || !emailHref || !instagramUrl || !facebookUrl) {
      return null;
    }

    return {
      address,
      mapsUrl,
      phoneDisplay,
      phoneHref,
      email,
      emailHref,
      instagramUrl,
      facebookUrl
    };
  } catch (error) {
    console.error('Error fetching site contact data:', error);
    return null;
  }
}

export async function getSeoSiteConfig(): Promise<SeoSiteConfig> {
  const envBase = process.env.NEXT_PUBLIC_SITE_URL?.trim() ?? '';
  try {
    const data = await fetchFromDirectus<SeoSettingsDto | SeoSettingsDto[]>('seo_settings', 'site_url,twitter_site');
    const entry = Array.isArray(data) ? data[0] : data;
    if (!entry) {
      return { siteUrl: envBase, twitterSite: '' };
    }
    return {
      siteUrl: entry.site_url?.trim() || envBase,
      twitterSite: entry.twitter_site?.trim() ?? ''
    };
  } catch (error) {
    console.error('Error fetching SEO site config:', error);
    return { siteUrl: envBase, twitterSite: '' };
  }
}

export async function getLandingSeo(langCode: string = 'pl-PL'): Promise<LandingSeoPayload> {
  const normalizedLang = normalizeLangCode(langCode);
  const targetId = LANG_MAP[normalizedLang] || LANG_MAP['pl-PL'];
  const ogLocale = getOgLocaleForLang(normalizedLang);
  const envBase = process.env.NEXT_PUBLIC_SITE_URL?.trim() ?? '';

  const fallback: LandingSeoPayload = {
    siteUrl: envBase,
    twitterSite: '',
    metaTitle: SEO_STATIC_FALLBACK_TITLE,
    metaDescription: SEO_STATIC_FALLBACK_DESCRIPTION,
    ogTitle: SEO_STATIC_FALLBACK_TITLE,
    ogDescription: SEO_STATIC_FALLBACK_DESCRIPTION,
    ogImageUrl: '',
    robots: 'index,follow',
    ogLocale
  };

  try {
    const data = await fetchFromDirectus<SeoSettingsDto | SeoSettingsDto[]>(
      'seo_settings',
      'site_url,twitter_site,translations.*'
    );
    if (!data) return fallback;

    const entry = Array.isArray(data) ? data[0] : data;
    if (!entry?.translations?.length) return { ...fallback, siteUrl: entry?.site_url?.trim() || envBase };

    const tr = entry.translations.find((t) => t.languages_id === targetId) || entry.translations[0];
    if (!tr) return { ...fallback, siteUrl: entry.site_url?.trim() || envBase };

    const siteUrl = entry.site_url?.trim() || envBase;
    const twitterSite = entry.twitter_site?.trim() ?? '';
    const metaTitle = tr.meta_title?.trim() || SEO_STATIC_FALLBACK_TITLE;
    const metaDescription = tr.meta_description?.trim() || SEO_STATIC_FALLBACK_DESCRIPTION;
    const ogTitle = tr.og_title?.trim() || metaTitle;
    const ogDescription = tr.og_description?.trim() || metaDescription;
    const ogImageUrl = tr.og_image ? getAssetUrl(tr.og_image) : '';
    const robots = tr.robots?.trim() || 'index,follow';

    return {
      siteUrl,
      twitterSite,
      metaTitle,
      metaDescription,
      ogTitle,
      ogDescription,
      ogImageUrl,
      robots,
      ogLocale
    };
  } catch (error) {
    console.error('Error fetching landing SEO:', error);
    return fallback;
  }
}

export async function getBlogListData(langCode: string = 'pl-PL'): Promise<BlogListContent | null> {
  try {
    const normalizedLang = normalizeLangCode(langCode);
    const targetId = LANG_MAP[normalizedLang] || LANG_MAP['pl-PL'];
    const [settingsData, postsData] = await Promise.all([
      fetchFromDirectus<BlogSettingsDto[] | BlogSettingsDto>('blog_settings', 'translations.*'),
      fetchFromDirectus<BlogPostDto[]>('blog_posts', 'id,slug,cover_image,video_url,author_name,reading_minutes,published_at,status,translations.*')
    ]);

    if (!settingsData || !postsData) return null;
    const settingsEntry = Array.isArray(settingsData) ? settingsData[0] : settingsData;
    if (!settingsEntry?.translations?.length) return null;
    const settingsTranslation = settingsEntry.translations.find((t) => t.languages_id === targetId) || settingsEntry.translations[0];
    if (!settingsTranslation) return null;

    const publishedPosts = postsData.filter((post) => post.status === 'published').slice(0, 6);
    const items: BlogCardItem[] = publishedPosts
      .map((post) => {
        const tr = post.translations?.find((t) => t.languages_id === targetId) || post.translations?.[0];
        if (!tr || !post.slug || !tr.title || !tr.excerpt || !post.author_name || !post.reading_minutes) return null;
        return {
          slug: post.slug,
          title: tr.title,
          excerpt: tr.excerpt,
          coverImage: getAssetUrl(post.cover_image ?? null),
          authorName: post.author_name,
          readingMinutes: post.reading_minutes,
          publishedAt: post.published_at ?? ''
        };
      })
      .filter((item): item is BlogCardItem => item !== null);

    if (!settingsTranslation.heading_white || !settingsTranslation.heading_gold || !settingsTranslation.description || !settingsTranslation.read_more_label) {
      return null;
    }

    return {
      headingWhite: settingsTranslation.heading_white,
      headingGold: settingsTranslation.heading_gold,
      description: settingsTranslation.description,
      readMoreLabel: settingsTranslation.read_more_label,
      items
    };
  } catch (error) {
    console.error('Error fetching blog list data:', error);
    return null;
  }
}

export async function getBlogPostData(slug: string, langCode: string = 'pl-PL'): Promise<BlogPostContent | null> {
  try {
    const normalizedLang = normalizeLangCode(langCode);
    const targetId = LANG_MAP[normalizedLang] || LANG_MAP['pl-PL'];
    const encodedSlug = encodeURIComponent(slug);
    const posts = await fetchFromDirectus<BlogPostDto[]>(
      'blog_posts',
      `id,slug,cover_image,video_url,author_name,reading_minutes,published_at,status,translations.*&filter[slug][_eq]=${encodedSlug}&limit=1`
    );
    if (!posts?.length) return null;

    const post = posts[0];
    if (!post || post.status !== 'published') return null;
    const tr = post.translations?.find((t) => t.languages_id === targetId) || post.translations?.[0];
    if (!tr || !tr.title || !tr.excerpt || !post.slug || !post.author_name || !post.reading_minutes) return null;

    const contentLexical =
      typeof tr.content_lexical === 'string'
        ? tr.content_lexical
        : tr.content_lexical && typeof tr.content_lexical === 'object'
          ? JSON.stringify(tr.content_lexical)
          : '';

    const coverImage = getAssetUrl(post.cover_image ?? null);
    const metaTitle = tr.meta_title?.trim() || tr.title;
    const metaDescription =
      tr.meta_description?.trim() || stripToPlainMetaDescription(tr.excerpt || '', 160);
    const seoOgTitle = tr.og_title?.trim() || metaTitle;
    const seoOgDescription = tr.og_description?.trim() || metaDescription;
    const seoOgFromField = tr.seo_og_image ? getAssetUrl(tr.seo_og_image) : '';
    const seoOgImageUrl = seoOgFromField.trim() || coverImage;

    return {
      slug: post.slug,
      title: tr.title,
      excerpt: tr.excerpt,
      contentHtml: tr.content_html ?? '',
      contentLexical,
      coverImage,
      videoUrl: post.video_url ?? '',
      authorName: post.author_name,
      readingMinutes: post.reading_minutes,
      publishedAt: post.published_at ?? '',
      seoMetaTitle: metaTitle,
      seoMetaDescription: metaDescription,
      seoOgTitle,
      seoOgDescription,
      seoOgImageUrl
    };
  } catch (error) {
    console.error('Error fetching blog post data:', error);
    return null;
  }
}

export async function getBlogSlugs(): Promise<string[]> {
  try {
    const posts = await fetchFromDirectus<BlogPostDto[]>('blog_posts', 'slug,status');
    if (!posts?.length) return [];
    return posts.filter((post) => post.status === 'published' && post.slug).map((post) => post.slug);
  } catch (error) {
    console.error('Error fetching blog slugs:', error);
    return [];
  }
}
