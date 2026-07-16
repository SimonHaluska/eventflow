import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FAQ from "../../components/FAQ";
import Packages from "../../components/Packages";
import { getFaqContent, getPageMeta, getPricingContent } from "../../../sanity/content";
import { getDictionary, hasLocale } from "../dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return getPageMeta("pricing", lang, dict);
}

export default async function SluzbyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const [packages, faq] = await Promise.all([
    getPricingContent(lang, dict),
    getFaqContent(lang, dict),
  ]);

  return (
    <>
      <Packages dict={packages} />
      <FAQ dict={faq} />
    </>
  );
}
