import { defineField, defineType } from "sanity";

export const navigationSettings = defineType({
  name: "navigationSettings",
  title: "Navigácia a footer",
  type: "document",
  fields: [
    defineField({ name: "footerDescriptionSk", title: "Footer popis (SK)", type: "text", rows: 2 }),
    defineField({ name: "footerDescriptionEn", title: "Footer description (EN)", type: "text", rows: 2 }),
    defineField({ name: "headerCtaSk", title: "Header CTA (SK)", type: "string" }),
    defineField({ name: "headerCtaEn", title: "Header CTA (EN)", type: "string" }),
    defineField({
      name: "segments",
      title: "Segmenty vo footeri",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "labelSk", title: "Názov (SK)", type: "string", validation: (r) => r.required() }),
            defineField({ name: "labelEn", title: "Label (EN)", type: "string" }),
            defineField({ name: "slug", title: "Odkaz", type: "string", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "labelSk", subtitle: "slug" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Navigácia a footer" }) },
});
