import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
    title: dict.meta.privacy.title,
    description: dict.meta.privacy.description,
  };
}

export default async function OchranaUdajovPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const d = dict.privacy;

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold-dark">
          {d.breadcrumb}
        </p>
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {d.title}
        </h1>
        <p className="mt-3 text-sm text-muted">{d.since}</p>

        <div className="prose prose-sm mt-10 max-w-none text-foreground [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:text-muted [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:text-muted [&_ul]:leading-relaxed [&_ul]:mb-4 [&_li]:mb-1">
          {d.sections.map((section) => (
            <div key={section.heading}>
              <h2>{section.heading}</h2>
              {"intro" in section && section.intro && <p>{section.intro}</p>}
              {"list" in section && section.list && (
                <ul>
                  {section.list.map((item: string) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {"content" in section && section.content && <p>{section.content}</p>}
              {"contact" in section && section.contact && <p>{section.contact}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
