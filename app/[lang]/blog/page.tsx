import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "../../components/Reveal";
import { getDictionary, hasLocale } from "../dictionaries";
import { client } from "../../../sanity/client";
import { isSanityConfigured } from "../../../sanity/env";
import { POSTS_QUERY } from "../../../sanity/queries";
import { urlFor } from "../../../sanity/imageUrl";

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

type Post = {
  _id: string;
  titleSk: string;
  titleEn?: string;
  slug: { current: string };
  publishedAt: string;
  category: string;
  excerptSk?: string;
  excerptEn?: string;
  mainImage?: { asset: object; alt?: string };
};

const categoryLabels: Record<string, { sk: string; en: string }> = {
  teambuilding: { sk: "Teambuildingy", en: "Team Buildings" },
  private: { sk: "Súkromné oslavy", en: "Private Parties" },
  pet: { sk: "Zvieracie oslavy", en: "Pet Celebrations" },
  sports: { sk: "Športové podujatia", en: "Sports Events" },
  tips: { sk: "Tipy", en: "Tips" },
};

function formatDate(dateStr: string, lang: string) {
  return new Date(dateStr).toLocaleDateString(
    lang === "sk" ? "sk-SK" : "en-GB",
    { day: "numeric", month: "long", year: "numeric" }
  );
}

async function getPosts(): Promise<Post[]> {
  if (!isSanityConfigured) return [];
  try {
    return await client.fetch<Post[]>(POSTS_QUERY, {}, { next: { revalidate: 60 } });
  } catch {
    return [];
  }
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
  const posts = await getPosts();

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
              ? "Tipy, inšpirácia a zákulisie z eventového sveta."
              : "Tips, inspiration and behind the scenes from the events world."}
          </p>
        </Reveal>

        {posts.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post._id} delay={i * 100} direction="up">
                <Link
                  href={`/${lang}/blog/${post.slug.current}`}
                  className="group flex flex-col rounded-2xl border border-gold/30 bg-background transition hover:border-gold hover:shadow-sm"
                >
                  <div className="relative flex h-48 items-center justify-center overflow-hidden rounded-t-2xl bg-cream-dark">
                    {post.mainImage?.asset ? (
                      <Image
                        src={urlFor(post.mainImage).width(600).height(400).url()}
                        alt={post.mainImage.alt ?? post.titleSk}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <span className="text-xs text-muted/40">
                        {isSk ? "Bez obrázka" : "No image"}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <span className="text-xs font-medium uppercase tracking-[0.15em] text-gold">
                        {categoryLabels[post.category]?.[isSk ? "sk" : "en"] ?? post.category}
                      </span>
                      <span className="text-xs text-muted/60">
                        {formatDate(post.publishedAt, lang)}
                      </span>
                    </div>

                    <h2 className="font-display text-lg font-semibold leading-snug transition group-hover:text-gold-dark">
                      {isSk ? post.titleSk : (post.titleEn ?? post.titleSk)}
                    </h2>

                    {(isSk ? post.excerptSk : post.excerptEn) && (
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                        {isSk ? post.excerptSk : post.excerptEn}
                      </p>
                    )}

                    <div className="mt-5 flex items-center gap-1 text-sm font-medium text-gold transition group-hover:gap-2">
                      {isSk ? "Čítať ďalej" : "Read more"}
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="h-4 w-4"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="rounded-2xl border border-dashed border-gold/40 bg-cream-dark/50 p-12 text-center">
            <p className="font-display text-lg font-semibold">
              {isSk ? "Čoskoro prvé články" : "First articles coming soon"}
            </p>
            <p className="mt-2 text-muted">
              {isSk
                ? "Blog je pripravený — čakáme na prvý obsah v Sanity CMS."
                : "The blog is ready — waiting for the first content in Sanity CMS."}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
