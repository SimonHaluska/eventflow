import { groq } from "next-sanity";

export const POSTS_QUERY = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    titleSk,
    titleEn,
    slug,
    publishedAt,
    category,
    excerptSk,
    excerptEn,
    mainImage { asset, alt, hotspot, crop }
  }
`;

export const POST_QUERY = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    titleSk,
    titleEn,
    slug,
    publishedAt,
    category,
    excerptSk,
    excerptEn,
    mainImage { asset, alt, hotspot, crop },
    contentSk,
    contentEn
  }
`;

export const POST_SLUGS_QUERY = groq`
  *[_type == "blogPost"] { "slug": slug.current }
`;

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    email,
    phone,
    addressSk,
    addressEn,
    openingHoursSk,
    openingHoursEn,
    instagramUrl,
    facebookUrl,
    linkedinUrl,
    tiktokUrl,
    mapEmbedUrl
  }
`;

export const HOMEPAGE_QUERY = groq`
  *[_type == "homepage"][0] {
    heroTitleSk,
    heroTitleHighlightSk,
    heroTitleEn,
    heroTitleHighlightEn,
    partnersLabelSk,
    partnersTitleSk,
    partnersSubtitleSk,
    partnersLabelEn,
    partnersTitleEn,
    partnersSubtitleEn,
    testimonialsLabelSk,
    testimonialsTitleSk,
    testimonialsSubtitleSk,
    testimonialsLabelEn,
    testimonialsTitleEn,
    testimonialsSubtitleEn
  }
`;

export const HERO_BANNERS_QUERY = groq`
  *[_type == "heroBanner" && active == true] | order(order asc) {
    _id,
    type,
    duration,
    heroTitleSk,
    heroTitleHighlightSk,
    heroTitleEn,
    heroTitleHighlightEn,
    image { asset, alt, hotspot, crop },
    overlayTitleSk,
    overlayTitleEn,
    "videoFileUrl": videoFile.asset->url,
    videoUrl,
    ctaLabelSk,
    ctaLabelEn,
    ctaHref
  }
`;

export const PARTNERS_QUERY = groq`
  *[_type == "partner"] | order(order asc) {
    _id,
    name,
    logo { asset, alt, hotspot, crop },
    url
  }
`;

export const TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial"] | order(order asc) {
    _id,
    quoteSk,
    quoteEn,
    authorName,
    authorRoleSk,
    authorRoleEn
  }
`;

export const TEAM_MEMBERS_QUERY = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    initials,
    roleSk,
    roleEn,
    focusSk,
    focusEn,
    descriptionSk,
    descriptionEn
  }
`;

export const PAGE_SEO_QUERY = groq`*[_type == "pageSeo"][0]`;

export const SERVICES_PAGE_QUERY = groq`*[_type == "servicesPage"][0]`;

export const PRICING_PAGE_QUERY = groq`*[_type == "pricingPage"][0]`;

export const FAQ_PAGE_QUERY = groq`*[_type == "faqPage"][0]`;

export const HOW_IT_WORKS_PAGE_QUERY = groq`*[_type == "howItWorksPage"][0]`;

export const PORTFOLIO_PAGE_QUERY = groq`*[_type == "portfolioPage"][0]`;

export const PORTFOLIO_ITEMS_QUERY = groq`
  *[_type == "portfolioItem"] | order(order asc) {
    _id,
    categorySk,
    categoryEn,
    labelSk,
    labelEn,
    image { asset, alt, hotspot, crop },
    order
  }
`;

export const ABOUT_PAGE_QUERY = groq`*[_type == "aboutPage"][0]`;

export const CONTACT_PAGE_QUERY = groq`*[_type == "contactPage"][0]`;

export const COOKIE_CONSENT_QUERY = groq`*[_type == "cookieConsent"][0]`;

export const PRIVACY_POLICY_QUERY = groq`*[_type == "privacyPolicy"][0]`;

export const BLOG_PAGE_QUERY = groq`*[_type == "blogPage"][0]`;

export const NAVIGATION_SETTINGS_QUERY = groq`*[_type == "navigationSettings"][0]`;
