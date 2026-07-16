import type { Dictionary } from "../app/[lang]/dictionaries";
import { client } from "./client";
import { isSanityConfigured } from "./env";
import { cmsText } from "./i18n";
import { urlFor } from "./imageUrl";
import {
  ABOUT_PAGE_QUERY,
  BLOG_PAGE_QUERY,
  CONTACT_PAGE_QUERY,
  COOKIE_CONSENT_QUERY,
  FAQ_PAGE_QUERY,
  HOW_IT_WORKS_PAGE_QUERY,
  NAVIGATION_SETTINGS_QUERY,
  PAGE_SEO_QUERY,
  PORTFOLIO_ITEMS_QUERY,
  PORTFOLIO_PAGE_QUERY,
  PRICING_PAGE_QUERY,
  PRIVACY_POLICY_QUERY,
  SERVICES_PAGE_QUERY,
} from "./queries";

const REVALIDATE = { next: { revalidate: 60 } } as const;

async function fetchSanity<T>(query: string): Promise<T | null> {
  if (!isSanityConfigured) return null;
  try {
    return await client.fetch<T>(query, {}, REVALIDATE);
  } catch {
    return null;
  }
}

type MetaKey = keyof Dictionary["meta"];

const META_PAGE_MAP: Record<MetaKey, { titleSk: string; titleEn: string; descSk: string; descEn: string }> = {
  home: { titleSk: "homeTitleSk", titleEn: "homeTitleEn", descSk: "homeDescSk", descEn: "homeDescEn" },
  contact: { titleSk: "contactTitleSk", titleEn: "contactTitleEn", descSk: "contactDescSk", descEn: "contactDescEn" },
  about: { titleSk: "aboutTitleSk", titleEn: "aboutTitleEn", descSk: "aboutDescSk", descEn: "aboutDescEn" },
  pricing: { titleSk: "pricingTitleSk", titleEn: "pricingTitleEn", descSk: "pricingDescSk", descEn: "pricingDescEn" },
  services: { titleSk: "servicesTitleSk", titleEn: "servicesTitleEn", descSk: "servicesDescSk", descEn: "servicesDescEn" },
  portfolio: { titleSk: "portfolioTitleSk", titleEn: "portfolioTitleEn", descSk: "portfolioDescSk", descEn: "portfolioDescEn" },
  howItWorks: { titleSk: "howItWorksTitleSk", titleEn: "howItWorksTitleEn", descSk: "howItWorksDescSk", descEn: "howItWorksDescEn" },
  privacy: { titleSk: "privacyTitleSk", titleEn: "privacyTitleEn", descSk: "privacyDescSk", descEn: "privacyDescEn" },
};

export async function getPageMeta(
  page: MetaKey,
  lang: string,
  dict: Dictionary
): Promise<{ title: string; description: string }> {
  const raw = await fetchSanity<Record<string, string>>(PAGE_SEO_QUERY);
  const map = META_PAGE_MAP[page];
  const fallback = dict.meta[page];

  return {
    title: cmsText(lang, raw?.[map.titleSk], raw?.[map.titleEn], fallback.title),
    description: cmsText(lang, raw?.[map.descSk], raw?.[map.descEn], fallback.description),
  };
}

export async function getBlogMeta(lang: string): Promise<{ title: string; description: string }> {
  const raw = await fetchSanity<Record<string, string>>(PAGE_SEO_QUERY);
  const isSk = lang === "sk";
  return {
    title: cmsText(lang, raw?.blogTitleSk, raw?.blogTitleEn, "Blog | Momentum Events"),
    description: cmsText(
      lang,
      raw?.blogDescSk,
      raw?.blogDescEn,
      isSk
        ? "Tipy, inšpirácia a zákulisie z eventového sveta."
        : "Tips, inspiration and behind the scenes from the events world."
    ),
  };
}

export async function getServicesContent(
  lang: string,
  dict: Dictionary
): Promise<Dictionary["services"]> {
  const raw = await fetchSanity<{
    labelSk?: string;
    labelEn?: string;
    titleSk?: string;
    titleEn?: string;
    subtitleSk?: string;
    subtitleEn?: string;
    items?: { id: string; titleSk: string; titleEn?: string; descriptionSk?: string; descriptionEn?: string }[];
  }>(SERVICES_PAGE_QUERY);

  if (!raw?.items?.length) return dict.services;

  return {
    label: cmsText(lang, raw.labelSk, raw.labelEn, dict.services.label),
    title: cmsText(lang, raw.titleSk, raw.titleEn, dict.services.title),
    subtitle: cmsText(lang, raw.subtitleSk, raw.subtitleEn, dict.services.subtitle),
    items: raw.items.map((item) => ({
      id: item.id,
      title: cmsText(lang, item.titleSk, item.titleEn, item.titleSk),
      description: cmsText(lang, item.descriptionSk, item.descriptionEn, ""),
    })),
  };
}

type RawPricing = Record<string, unknown> & {
  segments?: {
    segmentId: string;
    labelSk: string;
    labelEn?: string;
    packages?: {
      name: string;
      subtitleSk?: string;
      subtitleEn?: string;
      price: string;
      highlighted?: boolean;
      featuresSk?: string[];
      featuresEn?: string[];
    }[];
  }[];
};

export async function getPricingContent(
  lang: string,
  dict: Dictionary
): Promise<Dictionary["packages"]> {
  const raw = await fetchSanity<RawPricing>(PRICING_PAGE_QUERY);
  if (!raw?.segments?.length) return dict.packages;

  const d = dict.packages;
  return {
    label: cmsText(lang, raw.labelSk as string, raw.labelEn as string, d.label),
    title: cmsText(lang, raw.titleSk as string, raw.titleEn as string, d.title),
    subtitle: cmsText(lang, raw.subtitleSk as string, raw.subtitleEn as string, d.subtitle),
    note: cmsText(lang, raw.noteSk as string, raw.noteEn as string, d.note),
    interested: cmsText(lang, raw.interestedSk as string, raw.interestedEn as string, d.interested),
    inquiryLabel: cmsText(lang, raw.inquiryLabelSk as string, raw.inquiryLabelEn as string, d.inquiryLabel),
    inquiryPackage: cmsText(lang, raw.inquiryPackageSk as string, raw.inquiryPackageEn as string, d.inquiryPackage),
    inquirySubtitle: cmsText(lang, raw.inquirySubtitleSk as string, raw.inquirySubtitleEn as string, d.inquirySubtitle),
    sent: cmsText(lang, raw.sentSk as string, raw.sentEn as string, d.sent),
    form: {
      name: cmsText(lang, raw.formNameSk as string, raw.formNameEn as string, d.form.name),
      email: cmsText(lang, raw.formEmailSk as string, raw.formEmailEn as string, d.form.email),
      phone: cmsText(lang, raw.formPhoneSk as string, raw.formPhoneEn as string, d.form.phone),
      message: cmsText(lang, raw.formMessageSk as string, raw.formMessageEn as string, d.form.message),
      messagePlaceholder: cmsText(
        lang,
        raw.formMessagePlaceholderSk as string,
        raw.formMessagePlaceholderEn as string,
        d.form.messagePlaceholder
      ),
      submit: cmsText(lang, raw.formSubmitSk as string, raw.formSubmitEn as string, d.form.submit),
      cancel: cmsText(lang, raw.formCancelSk as string, raw.formCancelEn as string, d.form.cancel),
    },
    segments: raw.segments.map((segment) => ({
      id: segment.segmentId,
      label: cmsText(lang, segment.labelSk, segment.labelEn, segment.labelSk),
      packages: (segment.packages ?? []).map((pkg) => ({
        name: pkg.name,
        subtitle: cmsText(lang, pkg.subtitleSk, pkg.subtitleEn, pkg.subtitleSk ?? ""),
        price: pkg.price,
        highlighted: pkg.highlighted ?? false,
        features: lang === "sk" ? pkg.featuresSk ?? [] : pkg.featuresEn ?? pkg.featuresSk ?? [],
      })),
    })),
  };
}

export async function getFaqContent(lang: string, dict: Dictionary): Promise<Dictionary["faq"]> {
  const raw = await fetchSanity<{
    labelSk?: string;
    labelEn?: string;
    titleSk?: string;
    titleEn?: string;
    subtitleSk?: string;
    subtitleEn?: string;
    items?: { questionSk: string; questionEn?: string; answerSk: string; answerEn?: string }[];
  }>(FAQ_PAGE_QUERY);

  if (!raw?.items?.length) return dict.faq;

  return {
    label: cmsText(lang, raw.labelSk, raw.labelEn, dict.faq.label),
    title: cmsText(lang, raw.titleSk, raw.titleEn, dict.faq.title),
    subtitle: cmsText(lang, raw.subtitleSk, raw.subtitleEn, dict.faq.subtitle),
    items: raw.items.map((item) => ({
      question: cmsText(lang, item.questionSk, item.questionEn, item.questionSk),
      answer: cmsText(lang, item.answerSk, item.answerEn, item.answerSk),
    })),
  };
}

export async function getHowItWorksContent(
  lang: string,
  dict: Dictionary
): Promise<Dictionary["howItWorks"]> {
  const raw = await fetchSanity<{
    labelSk?: string;
    labelEn?: string;
    titleSk?: string;
    titleEn?: string;
    subtitleSk?: string;
    subtitleEn?: string;
    steps?: { number: string; titleSk: string; titleEn?: string; descriptionSk?: string; descriptionEn?: string }[];
  }>(HOW_IT_WORKS_PAGE_QUERY);

  if (!raw?.steps?.length) return dict.howItWorks;

  return {
    label: cmsText(lang, raw.labelSk, raw.labelEn, dict.howItWorks.label),
    title: cmsText(lang, raw.titleSk, raw.titleEn, dict.howItWorks.title),
    subtitle: cmsText(lang, raw.subtitleSk, raw.subtitleEn, dict.howItWorks.subtitle),
    steps: raw.steps.map((step) => ({
      number: step.number,
      title: cmsText(lang, step.titleSk, step.titleEn, step.titleSk),
      description: cmsText(lang, step.descriptionSk, step.descriptionEn, ""),
    })),
  };
}

export type PortfolioItemView = Dictionary["portfolio"]["items"][number] & {
  imageUrl?: string;
  imageAlt?: string;
};

export type PortfolioContent = Omit<Dictionary["portfolio"], "items"> & {
  items: PortfolioItemView[];
};

export async function getPortfolioContent(
  lang: string,
  dict: Dictionary
): Promise<PortfolioContent> {
  const [pageRaw, itemsRaw] = await Promise.all([
    fetchSanity<Record<string, string | undefined>>(PORTFOLIO_PAGE_QUERY),
    fetchSanity<
      {
        _id: string;
        categorySk: string;
        categoryEn?: string;
        labelSk: string;
        labelEn?: string;
        image?: { asset: object; alt?: string };
        order?: number;
      }[]
    >(PORTFOLIO_ITEMS_QUERY),
  ]);

  const d = dict.portfolio;
  const base = {
    label: cmsText(lang, pageRaw?.labelSk, pageRaw?.labelEn, d.label),
    title: cmsText(lang, pageRaw?.titleSk, pageRaw?.titleEn, d.title),
    subtitle: cmsText(lang, pageRaw?.subtitleSk, pageRaw?.subtitleEn, d.subtitle),
    contactText: cmsText(lang, pageRaw?.contactTextSk, pageRaw?.contactTextEn, d.contactText),
    contactLink: cmsText(lang, pageRaw?.contactLinkSk, pageRaw?.contactLinkEn, d.contactLink),
    photoSoon: cmsText(lang, pageRaw?.photoSoonSk, pageRaw?.photoSoonEn, d.photoSoon),
    prevLabel: cmsText(lang, pageRaw?.prevLabelSk, pageRaw?.prevLabelEn, d.prevLabel),
    nextLabel: cmsText(lang, pageRaw?.nextLabelSk, pageRaw?.nextLabelEn, d.nextLabel),
    itemLabel: cmsText(lang, pageRaw?.itemLabelSk, pageRaw?.itemLabelEn, d.itemLabel),
  };

  const items: PortfolioItemView[] =
    itemsRaw && itemsRaw.length > 0
      ? itemsRaw.map((item, index) => ({
          id: index + 1,
          category: cmsText(lang, item.categorySk, item.categoryEn, item.categorySk),
          label: cmsText(lang, item.labelSk, item.labelEn, item.labelSk),
          imageUrl: item.image?.asset
            ? urlFor(item.image).width(800).height(600).fit("crop").url()
            : undefined,
          imageAlt: item.image?.alt,
        }))
      : d.items;

  return { ...base, items };
}

export async function getAboutContent(
  lang: string,
  dict: Dictionary
): Promise<Dictionary["about"]> {
  const raw = await fetchSanity<{
    labelSk?: string;
    labelEn?: string;
    titleSk?: string;
    titleEn?: string;
    subtitleSk?: string;
    subtitleEn?: string;
    prevLabelSk?: string;
    prevLabelEn?: string;
    nextLabelSk?: string;
    nextLabelEn?: string;
    values?: { titleSk: string; titleEn?: string; textSk?: string; textEn?: string }[];
  }>(ABOUT_PAGE_QUERY);

  const d = dict.about;
  return {
    label: cmsText(lang, raw?.labelSk, raw?.labelEn, d.label),
    title: cmsText(lang, raw?.titleSk, raw?.titleEn, d.title),
    subtitle: cmsText(lang, raw?.subtitleSk, raw?.subtitleEn, d.subtitle),
    prevLabel: cmsText(lang, raw?.prevLabelSk, raw?.prevLabelEn, d.prevLabel),
    nextLabel: cmsText(lang, raw?.nextLabelSk, raw?.nextLabelEn, d.nextLabel),
    founders: d.founders,
    values:
      raw?.values && raw.values.length > 0
        ? raw.values.map((v) => ({
            title: cmsText(lang, v.titleSk, v.titleEn, v.titleSk),
            text: cmsText(lang, v.textSk, v.textEn, ""),
          }))
        : d.values,
  };
}

export async function getContactContent(
  lang: string,
  dict: Dictionary
): Promise<Dictionary["contact"]> {
  const raw = await fetchSanity<Record<string, unknown>>(CONTACT_PAGE_QUERY);
  if (!raw) return dict.contact;

  const d = dict.contact;
  const segmentsSk = raw.formSegmentsSk as string[] | undefined;
  const segmentsEn = raw.formSegmentsEn as string[] | undefined;
  const packagesSk = raw.formPackagesSk as string[] | undefined;
  const packagesEn = raw.formPackagesEn as string[] | undefined;

  return {
    label: cmsText(lang, raw.labelSk as string, raw.labelEn as string, d.label),
    title: cmsText(lang, raw.titleSk as string, raw.titleEn as string, d.title),
    subtitle: cmsText(lang, raw.subtitleSk as string, raw.subtitleEn as string, d.subtitle),
    sent: cmsText(lang, raw.sentSk as string, raw.sentEn as string, d.sent),
    form: {
      name: cmsText(lang, raw.formNameSk as string, raw.formNameEn as string, d.form.name),
      email: cmsText(lang, raw.formEmailSk as string, raw.formEmailEn as string, d.form.email),
      phone: cmsText(lang, raw.formPhoneSk as string, raw.formPhoneEn as string, d.form.phone),
      eventType: cmsText(lang, raw.formEventTypeSk as string, raw.formEventTypeEn as string, d.form.eventType),
      package: cmsText(lang, raw.formPackageSk as string, raw.formPackageEn as string, d.form.package),
      message: cmsText(lang, raw.formMessageSk as string, raw.formMessageEn as string, d.form.message),
      namePlaceholder: cmsText(
        lang,
        raw.formNamePlaceholderSk as string,
        raw.formNamePlaceholderEn as string,
        d.form.namePlaceholder
      ),
      emailPlaceholder: cmsText(
        lang,
        raw.formEmailPlaceholderSk as string,
        raw.formEmailPlaceholderEn as string,
        d.form.emailPlaceholder
      ),
      phonePlaceholder: cmsText(
        lang,
        raw.formPhonePlaceholderSk as string,
        raw.formPhonePlaceholderEn as string,
        d.form.phonePlaceholder
      ),
      messagePlaceholder: cmsText(
        lang,
        raw.formMessagePlaceholderSk as string,
        raw.formMessagePlaceholderEn as string,
        d.form.messagePlaceholder
      ),
      submit: cmsText(lang, raw.formSubmitSk as string, raw.formSubmitEn as string, d.form.submit),
      submitting: cmsText(
        lang,
        raw.formSubmittingSk as string,
        raw.formSubmittingEn as string,
        d.form.submitting
      ),
      segments:
        lang === "sk"
          ? segmentsSk?.length
            ? segmentsSk
            : d.form.segments
          : segmentsEn?.length
            ? segmentsEn
            : d.form.segments,
      packages:
        lang === "sk"
          ? packagesSk?.length
            ? packagesSk
            : d.form.packages
          : packagesEn?.length
            ? packagesEn
            : d.form.packages,
    },
  };
}

export async function getCookieContent(
  lang: string,
  dict: Dictionary
): Promise<Dictionary["cookie"]> {
  const raw = await fetchSanity<Record<string, string | undefined>>(COOKIE_CONSENT_QUERY);
  if (!raw) return dict.cookie;

  return {
    text: cmsText(lang, raw.textSk, raw.textEn, dict.cookie.text),
    privacyLink: cmsText(lang, raw.privacyLinkSk, raw.privacyLinkEn, dict.cookie.privacyLink),
    accept: cmsText(lang, raw.acceptSk, raw.acceptEn, dict.cookie.accept),
    decline: cmsText(lang, raw.declineSk, raw.declineEn, dict.cookie.decline),
  };
}

export async function getPrivacyContent(
  lang: string,
  dict: Dictionary
): Promise<Dictionary["privacy"]> {
  const raw = await fetchSanity<{
    breadcrumbSk?: string;
    breadcrumbEn?: string;
    titleSk?: string;
    titleEn?: string;
    sinceSk?: string;
    sinceEn?: string;
    sections?: {
      headingSk: string;
      headingEn?: string;
      introSk?: string;
      introEn?: string;
      contentSk?: string;
      contentEn?: string;
      contactSk?: string;
      contactEn?: string;
      listSk?: string[];
      listEn?: string[];
    }[];
  }>(PRIVACY_POLICY_QUERY);

  if (!raw?.sections?.length) return dict.privacy;

  return {
    breadcrumb: cmsText(lang, raw.breadcrumbSk, raw.breadcrumbEn, dict.privacy.breadcrumb),
    title: cmsText(lang, raw.titleSk, raw.titleEn, dict.privacy.title),
    since: cmsText(lang, raw.sinceSk, raw.sinceEn, dict.privacy.since),
    sections: raw.sections.map((section) => {
      const heading = cmsText(lang, section.headingSk, section.headingEn, section.headingSk);
      const intro = cmsText(lang, section.introSk, section.introEn, "");
      const content = cmsText(lang, section.contentSk, section.contentEn, "");
      const contact = cmsText(lang, section.contactSk, section.contactEn, "");
      const list = lang === "sk" ? section.listSk : section.listEn ?? section.listSk;

      if (intro && list?.length && contact) {
        return { heading, intro, list, contact };
      }
      if (intro && list?.length) {
        return { heading, intro, list };
      }
      if (content) {
        return { heading, content };
      }
      return { heading, content: intro || contact || "" };
    }),
  };
}

export type BlogPageContent = {
  label: string;
  title: string;
  subtitle: string;
  empty: string;
  noImage: string;
  readMore: string;
  backToBlog: string;
  allPosts: string;
  emptyContent: string;
};

export async function getBlogPageContent(lang: string): Promise<BlogPageContent> {
  const raw = await fetchSanity<Record<string, string | undefined>>(BLOG_PAGE_QUERY);
  const isSk = lang === "sk";

  return {
    label: cmsText(lang, raw?.labelSk, raw?.labelEn, isSk ? "Blog" : "Blog"),
    title: cmsText(lang, raw?.titleSk, raw?.titleEn, isSk ? "Inšpirácia a tipy" : "Inspiration & tips"),
    subtitle: cmsText(
      lang,
      raw?.subtitleSk,
      raw?.subtitleEn,
      isSk ? "Zákulisie, tipy a inšpirácia z eventového sveta." : "Behind the scenes, tips and inspiration from the events world."
    ),
    empty: cmsText(
      lang,
      raw?.emptySk,
      raw?.emptyEn,
      isSk ? "Zatiaľ žiadne články. Čoskoro tu budú novinky." : "No posts yet. News coming soon."
    ),
    noImage: cmsText(lang, raw?.noImageSk, raw?.noImageEn, isSk ? "Bez obrázka" : "No image"),
    readMore: cmsText(lang, raw?.readMoreSk, raw?.readMoreEn, isSk ? "Čítať ďalej" : "Read more"),
    backToBlog: cmsText(lang, raw?.backToBlogSk, raw?.backToBlogEn, isSk ? "Späť na blog" : "Back to blog"),
    allPosts: cmsText(lang, raw?.allPostsSk, raw?.allPostsEn, isSk ? "Všetky články" : "All posts"),
    emptyContent: cmsText(
      lang,
      raw?.emptyContentSk,
      raw?.emptyContentEn,
      isSk ? "Obsah článku sa pripravuje." : "Article content is being prepared."
    ),
  };
}

export async function getNavigationContent(
  lang: string,
  dict: Dictionary
): Promise<{ footer: Dictionary["footer"]; headerCta: string }> {
  const raw = await fetchSanity<{
    footerDescriptionSk?: string;
    footerDescriptionEn?: string;
    headerCtaSk?: string;
    headerCtaEn?: string;
    segments?: { labelSk: string; labelEn?: string; slug: string }[];
  }>(NAVIGATION_SETTINGS_QUERY);

  if (!raw) {
    return { footer: dict.footer, headerCta: dict.header.cta };
  }

  return {
    headerCta: cmsText(lang, raw.headerCtaSk, raw.headerCtaEn, dict.header.cta),
    footer: {
      ...dict.footer,
      description: cmsText(
        lang,
        raw.footerDescriptionSk,
        raw.footerDescriptionEn,
        dict.footer.description
      ),
      segments:
        raw.segments && raw.segments.length > 0
          ? raw.segments.map((s) => ({
              label: cmsText(lang, s.labelSk, s.labelEn, s.labelSk),
              slug: s.slug,
            }))
          : dict.footer.segments,
    },
  };
}
