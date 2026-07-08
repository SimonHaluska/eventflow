import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FAQ from "../../components/FAQ";
import Packages from "../../components/Packages";
import { getDictionary, hasLocale } from "../dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.pricing.title,
    description: dict.meta.pricing.description,
  };
}

export default async function SluzbyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return (
    <>
      <Packages dict={dict.packages} />
      <FAQ dict={dict.faq} />
    </>
  );
}
