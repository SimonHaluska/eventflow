import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PortfolioCarousel from "../../components/PortfolioCarousel";
import Reveal from "../../components/Reveal";
import { getPageMeta, getPortfolioContent } from "../../../sanity/content";
import { getDictionary, hasLocale } from "../dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return getPageMeta("portfolio", lang, dict);
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const portfolio = await getPortfolioContent(lang, dict);

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-14 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">
            {portfolio.label}
          </p>
          <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {portfolio.title}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted">{portfolio.subtitle}</p>
        </Reveal>

        <Reveal delay={150}>
          <PortfolioCarousel dict={portfolio} />
        </Reveal>

        <Reveal delay={300} className="mt-14 text-center text-sm text-muted">
          {portfolio.contactText}{" "}
          <Link
            href={`/${lang}/kontakt`}
            className="text-foreground underline underline-offset-4 transition hover:text-gold-dark"
          >
            {portfolio.contactLink}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
