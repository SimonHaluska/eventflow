import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HeroBanner from "../components/HeroBanner";
import Partners from "../components/Partners";
import Testimonials from "../components/Testimonials";
import { getPageMeta } from "../../sanity/content";
import {
  getHeroBanners,
  getHomepageContent,
  getPartners,
  getTestimonials,
} from "../../sanity/fetch";
import { getDictionary, hasLocale } from "./dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return getPageMeta("home", lang, dict);
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const [homepage, banners, partners, testimonials] = await Promise.all([
    getHomepageContent(lang, dict),
    getHeroBanners(lang),
    getPartners(),
    getTestimonials(lang),
  ]);

  return (
    <>
      <HeroBanner
        banners={banners}
        fallbackTitle={homepage.heroTitle}
        fallbackTitleHighlight={homepage.heroTitleHighlight}
        lang={lang}
      />

      <Partners section={homepage.partners} partners={partners} />
      <Testimonials section={homepage.testimonials} testimonials={testimonials} />
    </>
  );
}
