import { defineField, defineType } from "sanity";

export const faqPage = defineType({
  name: "faqPage",
  title: "Stránka — FAQ",
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
      title: "Otázky",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "questionSk", title: "Otázka (SK)", type: "string", validation: (r) => r.required() }),
            defineField({ name: "questionEn", title: "Question (EN)", type: "string" }),
            defineField({ name: "answerSk", title: "Odpoveď (SK)", type: "text", rows: 4, validation: (r) => r.required() }),
            defineField({ name: "answerEn", title: "Answer (EN)", type: "text", rows: 4 }),
          ],
          preview: { select: { title: "questionSk" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "FAQ" }) },
});
