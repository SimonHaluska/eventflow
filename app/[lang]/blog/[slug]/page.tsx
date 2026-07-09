import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { hasLocale } from "../../dictionaries";
import { client } from "../../../../sanity/client";
import { isSanityConfigured } from "../../../../sanity/env";
import { POST_QUERY, POST_SLUGS_QUERY } from "../../../../sanity/queries";
import { urlFor } from "../../../../sanity/imageUrl";

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contentSk?: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contentEn?: any[];
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

export async function generateStaticParams() {
  if (!isSanityConfigured) return [];
  try {
    const slugs = await client.fetch<{ slug: string }[]>(POST_SLUGS_QUERY);
    return slugs.flatMap(({ slug }) =>
      ["sk", "en"].map((lang) => ({ lang, slug }))
    );
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  if (!isSanityConfigured) return {};
  try {
    const post = await client.fetch<Post>(POST_QUERY, { slug });
    if (!post) return {};
    const isSk = lang === "sk";
    const title = isSk ? post.titleSk : (post.titleEn ?? post.titleSk);
    const description = isSk ? post.excerptSk : post.excerptEn;
    return {
      title: `${title} | Blog | Momentum Events`,
      description,
    };
  } catch {
    return {};
  }
}

const portableTextComponents = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-display mt-10 mb-4 text-2xl font-semibold">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-display mt-8 mb-3 text-xl font-semibold">{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="my-6 border-l-4 border-gold pl-5 italic text-muted">
        {children}
      </blockquote>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-5 leading-relaxed">{children}</p>
    ),
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  let post: Post | null = null;
  if (isSanityConfigured) {
    try {
      post = await client.fetch<Post>(POST_QUERY, { slug }, { next: { revalidate: 60 } });
    } catch {
      notFound();
    }
  }

  if (!post) notFound();

  const isSk = lang === "sk";
  const title = isSk ? post.titleSk : (post.titleEn ?? post.titleSk);
  const excerpt = isSk ? post.excerptSk : post.excerptEn;
  const content = isSk ? post.contentSk : (post.contentEn ?? post.contentSk);
  const categoryLabel =
    categoryLabels[post.category]?.[isSk ? "sk" : "en"] ?? post.category;

  return (
    <article className="px-6 py-24">
      <div className="mx-auto max-w-2xl">
        {/* Back link */}
        <Link
          href={`/${lang}/blog`}
          className="mb-10 inline-flex items-center gap-1 text-sm text-muted transition hover:text-foreground"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          {isSk ? "Späť na blog" : "Back to blog"}
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
              {categoryLabel}
            </span>
            <span className="text-muted/40">·</span>
            <span className="text-xs text-muted/60">
              {formatDate(post.publishedAt, lang)}
            </span>
          </div>

          <h1 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            {title}
          </h1>

          {excerpt && (
            <p className="mt-4 text-lg leading-relaxed text-muted">{excerpt}</p>
          )}
        </header>

        {/* Main image */}
        {post.mainImage?.asset && (
          <div className="relative mb-10 h-72 w-full overflow-hidden rounded-2xl sm:h-96">
            <Image
              src={urlFor(post.mainImage).width(1200).height(800).url()}
              alt={post.mainImage.alt ?? title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}

        {/* Content */}
        {content && content.length > 0 ? (
          <div className="prose-gold">
            <PortableText value={content} components={portableTextComponents} />
          </div>
        ) : (
          <p className="text-muted italic">
            {isSk ? "Obsah článku čoskoro." : "Article content coming soon."}
          </p>
        )}

        {/* Back to blog */}
        <div className="mt-16 border-t border-gold/20 pt-8">
          <Link
            href={`/${lang}/blog`}
            className="inline-flex items-center gap-2 text-sm font-medium text-gold transition hover:text-gold-dark"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {isSk ? "Všetky články" : "All articles"}
          </Link>
        </div>
      </div>
    </article>
  );
}
