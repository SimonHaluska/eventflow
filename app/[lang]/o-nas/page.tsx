import type { Metadata } from "next";
import { notFound } from "next/navigation";
import About from "../../components/About";
import { getAboutContent, getPageMeta } from "../../../sanity/content";
import { getTeamMembers } from "../../../sanity/fetch";
import { getDictionary, hasLocale } from "../dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return getPageMeta("about", lang, dict);
}

export default async function ONasPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const [about, founders] = await Promise.all([
    getAboutContent(lang, dict),
    getTeamMembers(lang),
  ]);
  return <About dict={about} founders={founders} />;
}
