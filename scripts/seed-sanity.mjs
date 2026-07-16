#!/usr/bin/env node
/**
 * Seeds Sanity CMS from dictionaries/sk.json + dictionaries/en.json
 *
 * Requires in .env.local:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_WRITE_TOKEN  (Editor permission — sanity.io/manage → API → Tokens)
 *
 * Run: npm run seed:sanity
 */

import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

function loadEnv() {
  const envPath = resolve(root, ".env.local");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnv();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token =
  process.env.SANITY_API_WRITE_TOKEN ||
  process.env.SANITY_API_TOKEN ||
  process.env.SANITY_AUTH_TOKEN;

if (!projectId) {
  console.error("❌ Chýba NEXT_PUBLIC_SANITY_PROJECT_ID v .env.local");
  process.exit(1);
}

if (!token) {
  console.error(
    "❌ Chýba SANITY_API_WRITE_TOKEN v .env.local\n" +
      "   Vytvor token na https://www.sanity.io/manage → projekt → API → Tokens (Editor)\n" +
      "   a pridaj do .env.local:\n" +
      "   SANITY_API_WRITE_TOKEN=skhx1nDVZDnAlG1kgeU0W3dRz1bXL1unXrTLYJ498QrgOFQ2nrEjN78Rt1TLThDcYdYyDwzBcpByLzFvnl2dkUfiZyyCbnsPtO7Xq6xeeYG2mE8Qth86xkBB6Y9sisKG2u487ZtALtIedCzN3e1lp8lkVqYSrSZZ0zdQGdfLU2OsoentAzkt"
  );
  process.exit(1);
}

const sk = JSON.parse(readFileSync(resolve(root, "dictionaries/sk.json"), "utf8"));
const en = JSON.parse(readFileSync(resolve(root, "dictionaries/en.json"), "utf8"));

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-07-08",
  token,
  useCdn: false,
});

const DEFAULT_MAP =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d42399.10226924927!2d17.0699!3d48.1486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476c89360bdf9e79%3A0xa1ccd56258bc25d0!2sBratislava!5e0!3m2!1ssk!2ssk!4v1700000000000";

function slugify(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function buildPricingSegments() {
  return sk.packages.segments.map((segSk, i) => {
    const segEn = en.packages.segments[i];
    return {
      _key: segSk.id,
      segmentId: segSk.id,
      labelSk: segSk.label,
      labelEn: segEn.label,
      packages: segSk.packages.map((pkgSk, j) => {
        const pkgEn = segEn.packages[j];
        return {
          _key: `${segSk.id}-${pkgSk.name.toLowerCase()}`,
          name: pkgSk.name,
          subtitleSk: pkgSk.subtitle,
          subtitleEn: pkgEn.subtitle,
          price: pkgSk.price,
          highlighted: pkgSk.highlighted ?? false,
          featuresSk: pkgSk.features,
          featuresEn: pkgEn.features,
        };
      }),
    };
  });
}

function buildPrivacySections() {
  return sk.privacy.sections.map((secSk, i) => {
    const secEn = en.privacy.sections[i];
    const doc = {
      _key: `section-${i + 1}`,
      headingSk: secSk.heading,
      headingEn: secEn.heading,
    };
    if (secSk.intro) {
      doc.introSk = secSk.intro;
      doc.introEn = secEn.intro;
    }
    if (secSk.content) {
      doc.contentSk = secSk.content;
      doc.contentEn = secEn.content;
    }
    if (secSk.contact) {
      doc.contactSk = secSk.contact;
      doc.contactEn = secEn.contact;
    }
    if (secSk.list) {
      doc.listSk = secSk.list;
      doc.listEn = secEn.list;
    }
    return doc;
  });
}

const documents = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    email: "info@momentumevents.sk",
    phone: "+421 900 000 000",
    addressSk: "Bratislava, Slovensko",
    addressEn: "Bratislava, Slovakia",
    openingHoursSk: "Po–Pi: 9:00–17:00\nSo–Ne: zatvorené",
    openingHoursEn: "Mon–Fri: 9:00–17:00\nSat–Sun: closed",
    instagramUrl: "https://www.instagram.com/momentumevents.sk",
    facebookUrl: "https://www.facebook.com/momentumevents.sk",
    linkedinUrl: "https://www.linkedin.com/company/momentum-events-sk",
    tiktokUrl: "https://www.tiktok.com/@momentumevents.sk",
    mapEmbedUrl: DEFAULT_MAP,
  },
  {
    _id: "pageSeo",
    _type: "pageSeo",
    homeTitleSk: sk.meta.home.title,
    homeTitleEn: en.meta.home.title,
    homeDescSk: sk.meta.home.description,
    homeDescEn: en.meta.home.description,
    contactTitleSk: sk.meta.contact.title,
    contactTitleEn: en.meta.contact.title,
    contactDescSk: sk.meta.contact.description,
    contactDescEn: en.meta.contact.description,
    aboutTitleSk: sk.meta.about.title,
    aboutTitleEn: en.meta.about.title,
    aboutDescSk: sk.meta.about.description,
    aboutDescEn: en.meta.about.description,
    pricingTitleSk: sk.meta.pricing.title,
    pricingTitleEn: en.meta.pricing.title,
    pricingDescSk: sk.meta.pricing.description,
    pricingDescEn: en.meta.pricing.description,
    servicesTitleSk: sk.meta.services.title,
    servicesTitleEn: en.meta.services.title,
    servicesDescSk: sk.meta.services.description,
    servicesDescEn: en.meta.services.description,
    portfolioTitleSk: sk.meta.portfolio.title,
    portfolioTitleEn: en.meta.portfolio.title,
    portfolioDescSk: sk.meta.portfolio.description,
    portfolioDescEn: en.meta.portfolio.description,
    howItWorksTitleSk: sk.meta.howItWorks.title,
    howItWorksTitleEn: en.meta.howItWorks.title,
    howItWorksDescSk: sk.meta.howItWorks.description,
    howItWorksDescEn: en.meta.howItWorks.description,
    privacyTitleSk: sk.meta.privacy.title,
    privacyTitleEn: en.meta.privacy.title,
    privacyDescSk: sk.meta.privacy.description,
    privacyDescEn: en.meta.privacy.description,
    blogTitleSk: "Blog | Momentum Events",
    blogTitleEn: "Blog | Momentum Events",
    blogDescSk: "Tipy, inšpirácia a zákulisie z eventového sveta.",
    blogDescEn: "Tips, inspiration and behind the scenes from the events world.",
  },
  {
    _id: "navigationSettings",
    _type: "navigationSettings",
    footerDescriptionSk: sk.footer.description,
    footerDescriptionEn: en.footer.description,
    headerCtaSk: sk.header.cta,
    headerCtaEn: en.header.cta,
    segments: sk.footer.segments.map((s, i) => ({
      _key: `seg-${i}`,
      labelSk: s.label,
      labelEn: en.footer.segments[i].label,
      slug: s.slug,
    })),
  },
  {
    _id: "homepage",
    _type: "homepage",
    heroTitleSk: sk.home.heroTitle,
    heroTitleHighlightSk: sk.home.heroTitleHighlight,
    heroTitleEn: en.home.heroTitle,
    heroTitleHighlightEn: en.home.heroTitleHighlight,
    partnersLabelSk: sk.partners.label,
    partnersTitleSk: sk.partners.title,
    partnersSubtitleSk: sk.partners.subtitle,
    partnersLabelEn: en.partners.label,
    partnersTitleEn: en.partners.title,
    partnersSubtitleEn: en.partners.subtitle,
    testimonialsLabelSk: sk.testimonials.label,
    testimonialsTitleSk: sk.testimonials.title,
    testimonialsSubtitleSk: sk.testimonials.subtitle,
    testimonialsLabelEn: en.testimonials.label,
    testimonialsTitleEn: en.testimonials.title,
    testimonialsSubtitleEn: en.testimonials.subtitle,
  },
  {
    _id: "hero-banner-logo",
    _type: "heroBanner",
    title: "Logo animácia (predvolená)",
    active: true,
    order: 0,
    duration: 10,
    type: "logoAnimation",
    heroTitleSk: sk.home.heroTitle,
    heroTitleHighlightSk: sk.home.heroTitleHighlight,
    heroTitleEn: en.home.heroTitle,
    heroTitleHighlightEn: en.home.heroTitleHighlight,
  },
  {
    _id: "servicesPage",
    _type: "servicesPage",
    labelSk: sk.services.label,
    labelEn: en.services.label,
    titleSk: sk.services.title,
    titleEn: en.services.title,
    subtitleSk: sk.services.subtitle,
    subtitleEn: en.services.subtitle,
    items: sk.services.items.map((item, i) => ({
      _key: item.id,
      id: item.id,
      titleSk: item.title,
      titleEn: en.services.items[i].title,
      descriptionSk: item.description,
      descriptionEn: en.services.items[i].description,
    })),
  },
  {
    _id: "pricingPage",
    _type: "pricingPage",
    labelSk: sk.packages.label,
    labelEn: en.packages.label,
    titleSk: sk.packages.title,
    titleEn: en.packages.title,
    subtitleSk: sk.packages.subtitle,
    subtitleEn: en.packages.subtitle,
    noteSk: sk.packages.note,
    noteEn: en.packages.note,
    interestedSk: sk.packages.interested,
    interestedEn: en.packages.interested,
    inquiryLabelSk: sk.packages.inquiryLabel,
    inquiryLabelEn: en.packages.inquiryLabel,
    inquiryPackageSk: sk.packages.inquiryPackage,
    inquiryPackageEn: en.packages.inquiryPackage,
    inquirySubtitleSk: sk.packages.inquirySubtitle,
    inquirySubtitleEn: en.packages.inquirySubtitle,
    sentSk: sk.packages.sent,
    sentEn: en.packages.sent,
    formNameSk: sk.packages.form.name,
    formNameEn: en.packages.form.name,
    formEmailSk: sk.packages.form.email,
    formEmailEn: en.packages.form.email,
    formPhoneSk: sk.packages.form.phone,
    formPhoneEn: en.packages.form.phone,
    formMessageSk: sk.packages.form.message,
    formMessageEn: en.packages.form.message,
    formMessagePlaceholderSk: sk.packages.form.messagePlaceholder,
    formMessagePlaceholderEn: en.packages.form.messagePlaceholder,
    formSubmitSk: sk.packages.form.submit,
    formSubmitEn: en.packages.form.submit,
    formCancelSk: sk.packages.form.cancel,
    formCancelEn: en.packages.form.cancel,
    segments: buildPricingSegments(),
  },
  {
    _id: "faqPage",
    _type: "faqPage",
    labelSk: sk.faq.label,
    labelEn: en.faq.label,
    titleSk: sk.faq.title,
    titleEn: en.faq.title,
    subtitleSk: sk.faq.subtitle,
    subtitleEn: en.faq.subtitle,
    items: sk.faq.items.map((item, i) => ({
      _key: `faq-${i}`,
      questionSk: item.question,
      questionEn: en.faq.items[i].question,
      answerSk: item.answer,
      answerEn: en.faq.items[i].answer,
    })),
  },
  {
    _id: "howItWorksPage",
    _type: "howItWorksPage",
    labelSk: sk.howItWorks.label,
    labelEn: en.howItWorks.label,
    titleSk: sk.howItWorks.title,
    titleEn: en.howItWorks.title,
    subtitleSk: sk.howItWorks.subtitle,
    subtitleEn: en.howItWorks.subtitle,
    steps: sk.howItWorks.steps.map((step, i) => ({
      _key: `step-${step.number}`,
      number: step.number,
      titleSk: step.title,
      titleEn: en.howItWorks.steps[i].title,
      descriptionSk: step.description,
      descriptionEn: en.howItWorks.steps[i].description,
    })),
  },
  {
    _id: "portfolioPage",
    _type: "portfolioPage",
    labelSk: sk.portfolio.label,
    labelEn: en.portfolio.label,
    titleSk: sk.portfolio.title,
    titleEn: en.portfolio.title,
    subtitleSk: sk.portfolio.subtitle,
    subtitleEn: en.portfolio.subtitle,
    contactTextSk: sk.portfolio.contactText,
    contactTextEn: en.portfolio.contactText,
    contactLinkSk: sk.portfolio.contactLink,
    contactLinkEn: en.portfolio.contactLink,
    photoSoonSk: sk.portfolio.photoSoon,
    photoSoonEn: en.portfolio.photoSoon,
    prevLabelSk: sk.portfolio.prevLabel,
    prevLabelEn: en.portfolio.prevLabel,
    nextLabelSk: sk.portfolio.nextLabel,
    nextLabelEn: en.portfolio.nextLabel,
    itemLabelSk: sk.portfolio.itemLabel,
    itemLabelEn: en.portfolio.itemLabel,
  },
  {
    _id: "aboutPage",
    _type: "aboutPage",
    labelSk: sk.about.label,
    labelEn: en.about.label,
    titleSk: sk.about.title,
    titleEn: en.about.title,
    subtitleSk: sk.about.subtitle,
    subtitleEn: en.about.subtitle,
    prevLabelSk: sk.about.prevLabel,
    prevLabelEn: en.about.prevLabel,
    nextLabelSk: sk.about.nextLabel,
    nextLabelEn: en.about.nextLabel,
    values: sk.about.values.map((v, i) => ({
      _key: `value-${i}`,
      titleSk: v.title,
      titleEn: en.about.values[i].title,
      textSk: v.text,
      textEn: en.about.values[i].text,
    })),
  },
  {
    _id: "contactPage",
    _type: "contactPage",
    labelSk: sk.contact.label,
    labelEn: en.contact.label,
    titleSk: sk.contact.title,
    titleEn: en.contact.title,
    subtitleSk: sk.contact.subtitle,
    subtitleEn: en.contact.subtitle,
    sentSk: sk.contact.sent,
    sentEn: en.contact.sent,
    formNameSk: sk.contact.form.name,
    formNameEn: en.contact.form.name,
    formEmailSk: sk.contact.form.email,
    formEmailEn: en.contact.form.email,
    formPhoneSk: sk.contact.form.phone,
    formPhoneEn: en.contact.form.phone,
    formEventTypeSk: sk.contact.form.eventType,
    formEventTypeEn: en.contact.form.eventType,
    formPackageSk: sk.contact.form.package,
    formPackageEn: en.contact.form.package,
    formMessageSk: sk.contact.form.message,
    formMessageEn: en.contact.form.message,
    formNamePlaceholderSk: sk.contact.form.namePlaceholder,
    formNamePlaceholderEn: en.contact.form.namePlaceholder,
    formEmailPlaceholderSk: sk.contact.form.emailPlaceholder,
    formEmailPlaceholderEn: en.contact.form.emailPlaceholder,
    formPhonePlaceholderSk: sk.contact.form.phonePlaceholder,
    formPhonePlaceholderEn: en.contact.form.phonePlaceholder,
    formMessagePlaceholderSk: sk.contact.form.messagePlaceholder,
    formMessagePlaceholderEn: en.contact.form.messagePlaceholder,
    formSubmitSk: sk.contact.form.submit,
    formSubmitEn: en.contact.form.submit,
    formSubmittingSk: sk.contact.form.submitting,
    formSubmittingEn: en.contact.form.submitting,
    formSegmentsSk: sk.contact.form.segments,
    formSegmentsEn: en.contact.form.segments,
    formPackagesSk: sk.contact.form.packages,
    formPackagesEn: en.contact.form.packages,
  },
  {
    _id: "cookieConsent",
    _type: "cookieConsent",
    textSk: sk.cookie.text,
    textEn: en.cookie.text,
    privacyLinkSk: sk.cookie.privacyLink,
    privacyLinkEn: en.cookie.privacyLink,
    acceptSk: sk.cookie.accept,
    acceptEn: en.cookie.accept,
    declineSk: sk.cookie.decline,
    declineEn: en.cookie.decline,
  },
  {
    _id: "privacyPolicy",
    _type: "privacyPolicy",
    breadcrumbSk: sk.privacy.breadcrumb,
    breadcrumbEn: en.privacy.breadcrumb,
    titleSk: sk.privacy.title,
    titleEn: en.privacy.title,
    sinceSk: sk.privacy.since,
    sinceEn: en.privacy.since,
    sections: buildPrivacySections(),
  },
  {
    _id: "blogPage",
    _type: "blogPage",
    labelSk: "Zákulisie & tipy",
    labelEn: "Behind the scenes & tips",
    titleSk: "Blog",
    titleEn: "Blog",
    subtitleSk: "Tipy, inšpirácia a zákulisie z eventového sveta.",
    subtitleEn: "Tips, inspiration and behind the scenes from the events world.",
    emptySk: "Čoskoro prvé články",
    emptyEn: "First articles coming soon",
    noImageSk: "Bez obrázka",
    noImageEn: "No image",
    readMoreSk: "Čítať ďalej",
    readMoreEn: "Read more",
    backToBlogSk: "Späť na blog",
    backToBlogEn: "Back to blog",
    allPostsSk: "Všetky články",
    allPostsEn: "All articles",
    emptyContentSk: "Obsah článku čoskoro.",
    emptyContentEn: "Article content coming soon.",
  },
  ...sk.about.founders.map((founder, i) => {
    const fEn = en.about.founders[i];
    return {
      _id: `team-${slugify(founder.name)}`,
      _type: "teamMember",
      name: founder.name,
      initials: founder.initials,
      roleSk: founder.role,
      roleEn: fEn.role,
      focusSk: founder.focus,
      focusEn: fEn.focus,
      descriptionSk: founder.description,
      descriptionEn: fEn.description,
      order: i,
    };
  }),
  ...sk.portfolio.items.map((item, i) => {
    const itemEn = en.portfolio.items[i];
    return {
      _id: `portfolio-item-${i + 1}`,
      _type: "portfolioItem",
      categorySk: item.category,
      categoryEn: itemEn.category,
      labelSk: item.label,
      labelEn: itemEn.label,
      order: i,
    };
  }),
];

async function seed() {
  console.log(`🌱 Seeding Sanity project ${projectId} / ${dataset}...`);
  console.log(`   ${documents.length} documents\n`);

  const transaction = client.transaction();
  for (const doc of documents) {
    transaction.createOrReplace(doc);
  }

  await transaction.commit();
  console.log("✅ Hotovo! Obsah je v Sanity CMS.");
  console.log("   Otvor Studio: http://localhost:3000/studio");
}

seed().catch((err) => {
  console.error("❌ Seed zlyhal:", err.message || err);
  process.exit(1);
});
