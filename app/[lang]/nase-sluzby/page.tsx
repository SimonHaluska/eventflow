import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Services from "../../components/Services";
import { getPageMeta, getServicesContent } from "../../../sanity/content";
import { getDictionary, hasLocale } from "../dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return getPageMeta("services", lang, dict);
}

export default async function NaseSluzbyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const services = await getServicesContent(lang, dict);
  return <Services dict={services} />;
}
