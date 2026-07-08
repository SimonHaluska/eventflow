import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Contact from "../../components/Contact";
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
    title: dict.meta.contact.title,
    description: dict.meta.contact.description,
  };
}

export default async function KontaktPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return <Contact dict={dict.contact} />;
}
