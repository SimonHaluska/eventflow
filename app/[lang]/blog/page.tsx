import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "../../components/Reveal";
import { getDictionary, hasLocale } from "../dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const isSk = lang === "sk";
  return {
    title: isSk ? "Blog | Momentum Events" : "Blog | Momentum Events",
    description: isSk
      ? "Tipy, inšpirácia a zákulisie z eventového sveta."
      : "Tips, inspiration and behind the scenes from the events world.",
  };
}

// Placeholder posts — nahradíš reálnymi dátami z CMS
const placeholderPosts = [
  {
    slug: "ako-zorganizovat-dokonaly-teambuilding",
    date: "2026-06-15",
    category: { sk: "Teambuildingy", en: "Team Buildings" },
    title: {
      sk: "Ako zorganizovať dokonalý teambuilding v 5 krokoch",
      en: "How to organise the perfect team building in 5 steps",
    },
    excerpt: {
      sk: "Firemný teambuilding nemusí byť nuda. Prezradíme vám, ako vybrať správny formát, motivovať tím a vyhnúť sa najčastejším chybám.",
      en: "Corporate team building doesn't have to be boring. We share how to choose the right format, motivate your team and avoid common mistakes.",
    },
  },
  {
    slug: "pet-friendly-oslava-ako-na-to",
    date: "2026-05-28",
    category: { sk: "Zvieracie oslavy", en: "Pet Celebrations" },
    title: {
      sk: "Pet-friendly oslava: ako na to, aby si si ju užil aj ty aj tvoj pes",
      en: "Pet-friendly party: how to enjoy it — both you and your dog",
    },
    excerpt: {
      sk: "Oslavy so psami sú trendom, ktorý rastie. Čo všetko treba zabezpečiť, aké aktivity fungujú a kde nájsť pet pekárne na Slovensku.",
      en: "Dog parties are a growing trend. What you need to prepare, which activities work best and where to find pet bakeries in Slovakia.",
    },
  },
  {
    slug: "sportove-podujatie-bez-stresu",
    date: "2026-05-10",
    category: { sk: "Športové podujatia", en: "Sports Events" },
    title: {
      sk: "Firemný športový deň bez stresu: checklist pre organizátorov",
      en: "Corporate sports day without the stress: organiser's checklist",
    },
    excerpt: {
      sk: "Od výberu lokality po záchranku — praktický checklist, vďaka ktorému nezabudnete na nič podstatné pri plánovaní firemného športového dňa.",
      en: "From venue selection to medical cover — a practical checklist so you don't miss anything important when planning a corporate sports day.",
    },
  },
];

function formatDate(dateStr: string, lang: string) {
  return new Date(dateStr).toLocaleDateString(lang === "sk" ? "sk-SK" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  await getDictionary(lang);

  const isSk = lang === "sk";

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-14 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">
            {isSk ? "Zákulisie & tipy" : "Behind the scenes & tips"}
          </p>
          <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Blog
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            {isSk
              ? "Tipy, inšpirácia a zákulisie z eventového sveta. Nové články čoskoro."
              : "Tips, inspiration and behind the scenes from the events world. New articles coming soon."}
          </p>
        </Reveal>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {placeholderPosts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 100} direction="up">
              <article className="group flex flex-col rounded-2xl border border-gold/30 bg-background transition hover:border-gold hover:shadow-sm">
                {/* Placeholder obrázok */}
                <div className="flex h-48 items-center justify-center rounded-t-2xl bg-cream-dark">
                  <span className="text-xs text-muted/40">
                    {isSk ? "Obrázok čoskoro" : "Image coming soon"}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="text-xs font-medium uppercase tracking-[0.15em] text-gold">
                      {isSk ? post.category.sk : post.category.en}
                    </span>
                    <span className="text-xs text-muted/60">
                      {formatDate(post.date, lang)}
                    </span>
                  </div>

                  <h2 className="font-display text-lg font-semibold leading-snug group-hover:text-gold-dark transition">
                    {isSk ? post.title.sk : post.title.en}
                  </h2>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {isSk ? post.excerpt.sk : post.excerpt.en}
                  </p>

                  <div className="mt-5 flex items-center gap-1 text-sm font-medium text-gold transition group-hover:gap-2">
                    {isSk ? "Čítať ďalej" : "Read more"}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={400} className="mt-16 rounded-2xl border border-dashed border-gold/40 bg-cream-dark/50 p-8 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
            {isSk ? "Pripravujeme" : "Coming soon"}
          </p>
          <p className="mt-2 text-muted">
            {isSk
              ? "Blog bude napojený na CMS — nové články budete môcť pridávať bez zásahu do kódu."
              : "The blog will be connected to a CMS — new articles can be added without touching the code."}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
