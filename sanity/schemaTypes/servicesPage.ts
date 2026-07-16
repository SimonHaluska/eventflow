import { defineField, defineType } from "sanity";

export const servicesPage = defineType({
  name: "servicesPage",
  title: "Stránka — Naše služby",
  type: "document",
  fields: [
    defineField({ name: "labelSk", title: "Label (SK)", type: "string" }),
    defineField({ name: "labelEn", title: "Label (EN)", type: "string" }),
    defineField({ name: "titleSk", title: "Nadpis (SK)", type: "string" }),
    defineField({ name: "titleEn", title: "Title (EN)", type: "string" }),
    defineField({ name: "subtitleSk", title: "Podnadpis (SK)", type: "text", rows: 2 }),
    defineField({ name: "subtitleEn", title: "Subtitle (EN)", type: "text", rows: 2 }),
    defineField({
      name: "items",
      title: "Segmenty služieb",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "id", title: "ID", type: "string", validation: (r) => r.required() }),
            defineField({ name: "titleSk", title: "Nadpis (SK)", type: "string", validation: (r) => r.required() }),
            defineField({ name: "titleEn", title: "Title (EN)", type: "string" }),
            defineField({ name: "descriptionSk", title: "Popis (SK)", type: "text", rows: 3 }),
            defineField({ name: "descriptionEn", title: "Description (EN)", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "titleSk", subtitle: "id" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Naše služby" }) },
});
