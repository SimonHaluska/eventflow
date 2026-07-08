import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HowItWorks from "../../components/HowItWorks";
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
    title: dict.meta.howItWorks.title,
    description: dict.meta.howItWorks.description,
  };
}

export default async function AkoToFunguiePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return <HowItWorks dict={dict.howItWorks} />;
}
