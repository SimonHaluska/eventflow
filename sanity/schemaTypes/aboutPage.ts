import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "Stránka — O nás",
  type: "document",
  fields: [
    defineField({ name: "labelSk", title: "Label (SK)", type: "string" }),
    defineField({ name: "labelEn", title: "Label (EN)", type: "string" }),
    defineField({ name: "titleSk", title: "Nadpis (SK)", type: "string" }),
    defineField({ name: "titleEn", title: "Title (EN)", type: "string" }),
    defineField({ name: "subtitleSk", title: "Podnadpis (SK)", type: "text", rows: 2 }),
    defineField({ name: "subtitleEn", title: "Subtitle (EN)", type: "text", rows: 2 }),
    defineField({ name: "prevLabelSk", title: "Predchádzajúci (SK)", type: "string" }),
    defineField({ name: "prevLabelEn", title: "Previous (EN)", type: "string" }),
    defineField({ name: "nextLabelSk", title: "Ďalší (SK)", type: "string" }),
    defineField({ name: "nextLabelEn", title: "Next (EN)", type: "string" }),
    defineField({
      name: "values",
      title: "Hodnoty",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "titleSk", title: "Nadpis (SK)", type: "string", validation: (r) => r.required() }),
            defineField({ name: "titleEn", title: "Title (EN)", type: "string" }),
            defineField({ name: "textSk", title: "Text (SK)", type: "text", rows: 3 }),
            defineField({ name: "textEn", title: "Text (EN)", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "titleSk" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "O nás" }) },
});
