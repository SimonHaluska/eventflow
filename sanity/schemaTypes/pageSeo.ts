import { defineField, defineType } from "sanity";

const metaPair = (page: string, titleSk: string, titleEn: string) => [
  defineField({ name: `${page}TitleSk`, title: `${titleSk} — titulok (SK)`, type: "string" }),
  defineField({ name: `${page}TitleEn`, title: `${titleEn} — title (EN)`, type: "string" }),
  defineField({ name: `${page}DescSk`, title: `${titleSk} — popis (SK)`, type: "text", rows: 2 }),
  defineField({ name: `${page}DescEn`, title: `${titleEn} — description (EN)`, type: "text", rows: 2 }),
];

export const pageSeo = defineType({
  name: "pageSeo",
  title: "SEO / Meta",
  type: "document",
  fields: [
    ...metaPair("home", "Úvod", "Home"),
    ...metaPair("contact", "Kontakt", "Contact"),
    ...metaPair("about", "O nás", "About"),
    ...metaPair("pricing", "Cenník", "Pricing"),
    ...metaPair("services", "Naše služby", "Services"),
    ...metaPair("portfolio", "Portfólio", "Portfolio"),
    ...metaPair("howItWorks", "Ako to funguje", "How it works"),
    ...metaPair("privacy", "Ochrana údajov", "Privacy"),
    ...metaPair("blog", "Blog", "Blog"),
  ],
  preview: { prepare: () => ({ title: "SEO / Meta" }) },
});
