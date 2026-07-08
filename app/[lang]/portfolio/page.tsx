import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PortfolioCarousel from "../../components/PortfolioCarousel";
import Reveal from "../../components/Reveal";
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
    title: dict.meta.portfolio.title,
    description: dict.meta.portfolio.description,
  };
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const d = dict.portfolio;

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-14 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">
            {d.label}
          </p>
          <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {d.title}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted">{d.subtitle}</p>
        </Reveal>

        <Reveal delay={150}>
          <PortfolioCarousel dict={d} />
        </Reveal>

        <Reveal delay={300} className="mt-14 text-center text-sm text-muted">
          {d.contactText}{" "}
          <Link
            href={`/${lang}/kontakt`}
            className="text-foreground underline underline-offset-4 transition hover:text-gold-dark"
          >
            {d.contactLink}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
