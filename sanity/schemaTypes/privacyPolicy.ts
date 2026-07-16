import { defineField, defineType } from "sanity";

export const privacyPolicy = defineType({
  name: "privacyPolicy",
  title: "Ochrana osobných údajov",
  type: "document",
  fields: [
    defineField({ name: "breadcrumbSk", title: "Breadcrumb (SK)", type: "string" }),
    defineField({ name: "breadcrumbEn", title: "Breadcrumb (EN)", type: "string" }),
    defineField({ name: "titleSk", title: "Nadpis (SK)", type: "string" }),
    defineField({ name: "titleEn", title: "Title (EN)", type: "string" }),
    defineField({ name: "sinceSk", title: "Platné od (SK)", type: "string" }),
    defineField({ name: "sinceEn", title: "Effective since (EN)", type: "string" }),
    defineField({
      name: "sections",
      title: "Sekcie",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "headingSk", title: "Nadpis (SK)", type: "string", validation: (r) => r.required() }),
            defineField({ name: "headingEn", title: "Heading (EN)", type: "string" }),
            defineField({ name: "introSk", title: "Úvod (SK)", type: "text", rows: 2 }),
            defineField({ name: "introEn", title: "Intro (EN)", type: "text", rows: 2 }),
            defineField({ name: "contentSk", title: "Obsah (SK)", type: "text", rows: 4 }),
            defineField({ name: "contentEn", title: "Content (EN)", type: "text", rows: 4 }),
            defineField({ name: "contactSk", title: "Kontakt text (SK)", type: "text", rows: 2 }),
            defineField({ name: "contactEn", title: "Contact text (EN)", type: "text", rows: 2 }),
            defineField({ name: "listSk", title: "Zoznam (SK)", type: "array", of: [{ type: "string" }] }),
            defineField({ name: "listEn", title: "List (EN)", type: "array", of: [{ type: "string" }] }),
          ],
          preview: { select: { title: "headingSk" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Ochrana osobných údajov" }) },
});
