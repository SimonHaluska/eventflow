import type { Metadata } from "next";
import CookieBanner from "../components/CookieBanner";
import Footer from "../components/Footer";
import Header from "../components/Header";
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
  return {
    title: dict.meta.home.title,
    description: dict.meta.home.description,
  };
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

  return (
    <>
      <Header dict={dict.header} />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer dict={dict.footer} lang={lang} />
      <CookieBanner dict={dict.cookie} lang={lang} />
    </>
  );
}
