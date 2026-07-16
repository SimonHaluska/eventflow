import type { Metadata } from "next";
import CookieBanner from "../components/CookieBanner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SplashScreen from "../components/SplashScreen";
import { getCookieContent, getNavigationContent, getPageMeta } from "../../sanity/content";
import { getSiteSettings } from "../../sanity/fetch";
import { getDictionary, hasLocale, locales } from "./dictionaries";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

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

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const [siteSettings, navigation, cookie] = await Promise.all([
    getSiteSettings(lang),
    getNavigationContent(lang, dict),
    getCookieContent(lang, dict),
  ]);

  return (
    <div id="page-wrapper" className="flex min-h-full flex-col" style={{ transition: "transform 300ms ease-in-out" }}>
      <SplashScreen />
      <Header dict={dict.header} cta={navigation.headerCta} />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer dict={navigation.footer} lang={lang} siteSettings={siteSettings} />
      <CookieBanner dict={cookie} lang={lang} />
    </div>
  );
}
