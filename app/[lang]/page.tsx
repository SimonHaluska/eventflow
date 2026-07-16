import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HeroLogoAnimation from "../components/HeroLogoAnimation";
import Partners from "../components/Partners";
import Testimonials from "../components/Testimonials";
import { getDictionary, hasLocale } from "./dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.home.title,
    description: dict.meta.home.description,
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const d = dict.home;

  return (
    <>
      <HeroLogoAnimation
        title={d.heroTitle}
        titleHighlight={d.heroTitleHighlight}
      />

      <Partners dict={dict.partners} />
      <Testimonials dict={dict.testimonials} />
    </>
  );
}
