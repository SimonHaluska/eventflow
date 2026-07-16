export type SiteSettingsData = {
  email?: string;
  phone?: string;
  address?: string;
  openingHours?: string;
  socialLinks: { label: string; href: string }[];
  mapEmbedUrl?: string;
};

export type HomepageSectionData = {
  label: string;
  title: string;
  subtitle: string;
};

export type HomepageData = {
  heroTitle: string;
  heroTitleHighlight: string;
  partners: HomepageSectionData;
  testimonials: HomepageSectionData;
};

export type HeroBannerData = {
  _id: string;
  type: "logoAnimation" | "image" | "video";
  duration: number;
  heroTitle?: string;
  heroTitleHighlight?: string;
  imageUrl?: string;
  imageAlt?: string;
  overlayTitle?: string;
  videoUrl?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export type PartnerData = {
  _id: string;
  name: string;
  logoUrl: string;
  logoAlt: string;
  url?: string;
};

export type TestimonialData = {
  _id: string;
  quote: string;
  authorName: string;
  authorRole?: string;
};

export type TeamMemberData = {
  _id: string;
  name: string;
  initials: string;
  role: string;
  focus: string;
  description: string;
};
