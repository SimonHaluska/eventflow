import { defineField, defineType } from "sanity";

export const blogPage = defineType({
  name: "blogPage",
  title: "Stránka — Blog",
  type: "document",
  fields: [
    defineField({ name: "labelSk", title: "Label (SK)", type: "string" }),
    defineField({ name: "labelEn", title: "Label (EN)", type: "string" }),
    defineField({ name: "titleSk", title: "Nadpis (SK)", type: "string" }),
    defineField({ name: "titleEn", title: "Title (EN)", type: "string" }),
    defineField({ name: "subtitleSk", title: "Podnadpis (SK)", type: "text", rows: 2 }),
    defineField({ name: "subtitleEn", title: "Subtitle (EN)", type: "text", rows: 2 }),
    defineField({ name: "emptySk", title: "Prázdny stav (SK)", type: "string" }),
    defineField({ name: "emptyEn", title: "Empty state (EN)", type: "string" }),
    defineField({ name: "noImageSk", title: "Bez obrázka (SK)", type: "string" }),
    defineField({ name: "noImageEn", title: "No image (EN)", type: "string" }),
    defineField({ name: "readMoreSk", title: "Čítať ďalej (SK)", type: "string" }),
    defineField({ name: "readMoreEn", title: "Read more (EN)", type: "string" }),
    defineField({ name: "backToBlogSk", title: "Späť na blog (SK)", type: "string" }),
    defineField({ name: "backToBlogEn", title: "Back to blog (EN)", type: "string" }),
    defineField({ name: "allPostsSk", title: "Všetky články (SK)", type: "string" }),
    defineField({ name: "allPostsEn", title: "All posts (EN)", type: "string" }),
    defineField({ name: "emptyContentSk", title: "Prázdny obsah článku (SK)", type: "string" }),
    defineField({ name: "emptyContentEn", title: "Empty article content (EN)", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Blog" }) },
});
