import type { Dictionary } from "../app/[lang]/dictionaries";
import { client } from "./client";
import { isSanityConfigured } from "./env";
import { urlFor } from "./imageUrl";
import {
  HERO_BANNERS_QUERY,
  HOMEPAGE_QUERY,
  PARTNERS_QUERY,
  SITE_SETTINGS_QUERY,
  TEAM_MEMBERS_QUERY,
  TESTIMONIALS_QUERY,
} from "./queries";
import type {
  HeroBannerData,
  HomepageData,
  PartnerData,
  SiteSettingsData,
  TeamMemberData,
  TestimonialData,
} from "./types";

const REVALIDATE = { next: { revalidate: 60 } } as const;

async function fetchSanity<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!isSanityConfigured) return null;
  try {
    return await client.fetch<T>(query, params, REVALIDATE);
  } catch {
    return null;
  }
}

type RawSiteSettings = {
  email?: string;
  phone?: string;
  addressSk?: string;
  addressEn?: string;
  openingHoursSk?: string;
  openingHoursEn?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  linkedinUrl?: string;
  tiktokUrl?: string;
  mapEmbedUrl?: string;
};

export async function getSiteSettings(lang: string): Promise<SiteSettingsData | null> {
  const raw = await fetchSanity<RawSiteSettings>(SITE_SETTINGS_QUERY);
  if (!raw) return null;

  const isSk = lang === "sk";
  const socialLinks: { label: string; href: string }[] = [];

  if (raw.instagramUrl) socialLinks.push({ label: "Instagram", href: raw.instagramUrl });
  if (raw.facebookUrl) socialLinks.push({ label: "Facebook", href: raw.facebookUrl });
  if (raw.linkedinUrl) socialLinks.push({ label: "LinkedIn", href: raw.linkedinUrl });
  if (raw.tiktokUrl) socialLinks.push({ label: "TikTok", href: raw.tiktokUrl });

  return {
    email: raw.email,
    phone: raw.phone,
    address: isSk ? raw.addressSk : raw.addressEn ?? raw.addressSk,
    openingHours: isSk ? raw.openingHoursSk : raw.openingHoursEn ?? raw.openingHoursSk,
    socialLinks,
    mapEmbedUrl: raw.mapEmbedUrl,
  };
}

type RawHomepage = {
  heroTitleSk?: string;
  heroTitleHighlightSk?: string;
  heroTitleEn?: string;
  heroTitleHighlightEn?: string;
  partnersLabelSk?: string;
  partnersTitleSk?: string;
  partnersSubtitleSk?: string;
  partnersLabelEn?: string;
  partnersTitleEn?: string;
  partnersSubtitleEn?: string;
  testimonialsLabelSk?: string;
  testimonialsTitleSk?: string;
  testimonialsSubtitleSk?: string;
  testimonialsLabelEn?: string;
  testimonialsTitleEn?: string;
  testimonialsSubtitleEn?: string;
};

export async function getHomepageContent(
  lang: string,
  dict: Dictionary
): Promise<HomepageData> {
  const raw = await fetchSanity<RawHomepage>(HOMEPAGE_QUERY);
  const isSk = lang === "sk";

  return {
    heroTitle: (isSk ? raw?.heroTitleSk : raw?.heroTitleEn) || dict.home.heroTitle,
    heroTitleHighlight:
      (isSk ? raw?.heroTitleHighlightSk : raw?.heroTitleHighlightEn) ||
      dict.home.heroTitleHighlight,
    partners: {
      label:
        (isSk ? raw?.partnersLabelSk : raw?.partnersLabelEn) || dict.partners.label,
      title:
        (isSk ? raw?.partnersTitleSk : raw?.partnersTitleEn) || dict.partners.title,
      subtitle:
        (isSk ? raw?.partnersSubtitleSk : raw?.partnersSubtitleEn) ||
        dict.partners.subtitle,
    },
    testimonials: {
      label:
        (isSk ? raw?.testimonialsLabelSk : raw?.testimonialsLabelEn) ||
        dict.testimonials.label,
      title:
        (isSk ? raw?.testimonialsTitleSk : raw?.testimonialsTitleEn) ||
        dict.testimonials.title,
      subtitle:
        (isSk ? raw?.testimonialsSubtitleSk : raw?.testimonialsSubtitleEn) ||
        dict.testimonials.subtitle,
    },
  };
}

type RawHeroBanner = {
  _id: string;
  type: "logoAnimation" | "image" | "video";
  duration?: number;
  heroTitleSk?: string;
  heroTitleHighlightSk?: string;
  heroTitleEn?: string;
  heroTitleHighlightEn?: string;
  image?: { asset: object; alt?: string };
  overlayTitleSk?: string;
  overlayTitleEn?: string;
  videoFileUrl?: string;
  videoUrl?: string;
  ctaLabelSk?: string;
  ctaLabelEn?: string;
  ctaHref?: string;
};

export async function getHeroBanners(lang: string): Promise<HeroBannerData[]> {
  const raw = await fetchSanity<RawHeroBanner[]>(HERO_BANNERS_QUERY);
  if (!raw?.length) return [];

  const isSk = lang === "sk";

  return raw.map((banner) => ({
    _id: banner._id,
    type: banner.type,
    duration: banner.duration ?? 10,
    heroTitle: isSk ? banner.heroTitleSk : banner.heroTitleEn ?? banner.heroTitleSk,
    heroTitleHighlight: isSk
      ? banner.heroTitleHighlightSk
      : banner.heroTitleHighlightEn ?? banner.heroTitleHighlightSk,
    imageUrl: banner.image?.asset
      ? urlFor(banner.image).width(2560).fit("max").auto("format").url()
      : undefined,
    imageAlt: banner.image?.alt ?? "",
    overlayTitle: isSk
      ? banner.overlayTitleSk
      : banner.overlayTitleEn ?? banner.overlayTitleSk,
    videoUrl: banner.videoFileUrl ?? banner.videoUrl,
    ctaLabel: isSk ? banner.ctaLabelSk : banner.ctaLabelEn ?? banner.ctaLabelSk,
    ctaHref: banner.ctaHref,
  }));
}

type RawPartner = {
  _id: string;
  name: string;
  logo: { asset: object; alt?: string };
  url?: string;
};

export async function getPartners(): Promise<PartnerData[]> {
  const raw = await fetchSanity<RawPartner[]>(PARTNERS_QUERY);
  if (!raw?.length) return [];

  return raw
    .filter((p) => p.logo?.asset)
    .map((p) => ({
      _id: p._id,
      name: p.name,
      logoUrl: urlFor(p.logo).width(400).height(200).fit("max").url(),
      logoAlt: p.logo.alt ?? p.name,
      url: p.url,
    }));
}

type RawTestimonial = {
  _id: string;
  quoteSk: string;
  quoteEn?: string;
  authorName: string;
  authorRoleSk?: string;
  authorRoleEn?: string;
};

export async function getTestimonials(lang: string): Promise<TestimonialData[]> {
  const raw = await fetchSanity<RawTestimonial[]>(TESTIMONIALS_QUERY);
  if (!raw?.length) return [];

  const isSk = lang === "sk";

  return raw.map((t) => ({
    _id: t._id,
    quote: isSk ? t.quoteSk : t.quoteEn ?? t.quoteSk,
    authorName: t.authorName,
    authorRole: isSk ? t.authorRoleSk : t.authorRoleEn ?? t.authorRoleSk,
  }));
}

type RawTeamMember = {
  _id: string;
  name: string;
  initials: string;
  roleSk: string;
  roleEn?: string;
  focusSk: string;
  focusEn?: string;
  descriptionSk: string;
  descriptionEn?: string;
};

export async function getTeamMembers(lang: string): Promise<TeamMemberData[]> {
  const raw = await fetchSanity<RawTeamMember[]>(TEAM_MEMBERS_QUERY);
  if (!raw?.length) return [];

  const isSk = lang === "sk";

  return raw.map((m) => ({
    _id: m._id,
    name: m.name,
    initials: m.initials,
    role: isSk ? m.roleSk : m.roleEn ?? m.roleSk,
    focus: isSk ? m.focusSk : m.focusEn ?? m.focusSk,
    description: isSk ? m.descriptionSk : m.descriptionEn ?? m.descriptionSk,
  }));
}
