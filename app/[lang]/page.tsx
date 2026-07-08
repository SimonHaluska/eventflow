import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Partners from "../components/Partners";
import Reveal from "../components/Reveal";
import Testimonials from "../components/Testimonials";
import { getDictionary, hasLocale } from "./dictionaries";

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

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const d = dict.home;

  return (
    <>
      <section className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center sm:py-32">
        <Reveal className="relative mb-12 flex items-center justify-center">
          <span className="animate-spin-slow absolute inset-0 rounded-full border border-dashed border-gold/50" />
          <span className="animate-spin-reverse absolute inset-[-16px] rounded-full border border-dotted border-gold/25" />
          <span className="animate-pulse-ring absolute inset-[-32px] rounded-full border border-gold/15" />
          <div className="relative z-10 p-4">
            <Image
              src="/logo.png"
              alt="Momentum Events"
              width={160}
              height={160}
              priority
            />
          </div>
        </Reveal>

        <h1 className="animate-fade-up delay-300 font-display max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
          {d.heroTitle}{" "}
          <span className="text-gold-gradient">{d.heroTitleHighlight}</span>
        </h1>

        <p className="animate-fade-up delay-500 mt-6 max-w-xl text-lg leading-relaxed text-muted">
          {d.heroSubtitle}
        </p>

        <div className="animate-fade-up delay-700 mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href={`/${lang}/sluzby`}
            className="rounded-full border border-gold px-8 py-3 text-sm font-medium tracking-wide transition hover:border-gold-dark hover:bg-gold/20"
          >
            {d.heroCta}
          </Link>
          <Link
            href={`/${lang}/kontakt`}
            className="rounded-full border border-gold/40 px-8 py-3 text-sm font-medium tracking-wide text-muted transition hover:border-gold hover:text-foreground"
          >
            {d.heroCtaSecondary}
          </Link>
        </div>
      </section>

      <Partners dict={dict.partners} />
      <Testimonials dict={dict.testimonials} />
    </>
  );
}
