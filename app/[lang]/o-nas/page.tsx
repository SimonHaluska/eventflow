import type { Metadata } from "next";
import { notFound } from "next/navigation";
import About from "../../components/About";
import Services from "../../components/Services";
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
    title: dict.meta.about.title,
    description: dict.meta.about.description,
  };
}

export default async function ONasPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return (
    <>
      <About dict={dict.about} />
      <Services dict={dict.services} />
    </>
  );
}
