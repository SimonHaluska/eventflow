import { defineField, defineType } from "sanity";

export const portfolioPage = defineType({
  name: "portfolioPage",
  title: "Stránka — Portfólio",
  type: "document",
  fields: [
    defineField({ name: "labelSk", title: "Label (SK)", type: "string" }),
    defineField({ name: "labelEn", title: "Label (EN)", type: "string" }),
    defineField({ name: "titleSk", title: "Nadpis (SK)", type: "string" }),
    defineField({ name: "titleEn", title: "Title (EN)", type: "string" }),
    defineField({ name: "subtitleSk", title: "Podnadpis (SK)", type: "text", rows: 2 }),
    defineField({ name: "subtitleEn", title: "Subtitle (EN)", type: "text", rows: 2 }),
    defineField({ name: "contactTextSk", title: "Kontakt text (SK)", type: "string" }),
    defineField({ name: "contactTextEn", title: "Contact text (EN)", type: "string" }),
    defineField({ name: "contactLinkSk", title: "Kontakt odkaz (SK)", type: "string" }),
    defineField({ name: "contactLinkEn", title: "Contact link (EN)", type: "string" }),
    defineField({ name: "photoSoonSk", title: "Fotka čoskoro (SK)", type: "string" }),
    defineField({ name: "photoSoonEn", title: "Photo soon (EN)", type: "string" }),
    defineField({ name: "prevLabelSk", title: "Predchádzajúci (SK)", type: "string" }),
    defineField({ name: "prevLabelEn", title: "Previous (EN)", type: "string" }),
    defineField({ name: "nextLabelSk", title: "Ďalší (SK)", type: "string" }),
    defineField({ name: "nextLabelEn", title: "Next (EN)", type: "string" }),
    defineField({ name: "itemLabelSk", title: "Položka (SK)", type: "string" }),
    defineField({ name: "itemLabelEn", title: "Item (EN)", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Portfólio" }) },
});

export const portfolioItem = defineType({
  name: "portfolioItem",
  title: "Portfólio položka",
  type: "document",
  fields: [
    defineField({ name: "categorySk", title: "Kategória (SK)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "categoryEn", title: "Category (EN)", type: "string" }),
    defineField({ name: "labelSk", title: "Názov (SK)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "labelEn", title: "Label (EN)", type: "string" }),
    defineField({
      name: "image",
      title: "Fotografia",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({ name: "order", title: "Poradie", type: "number", initialValue: 0 }),
  ],
  orderings: [{ title: "Poradie", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "labelSk", subtitle: "categorySk", media: "image" } },
});
