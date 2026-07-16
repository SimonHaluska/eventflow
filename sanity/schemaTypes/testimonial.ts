import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Referencia",
  type: "document",
  fields: [
    defineField({
      name: "quoteSk",
      title: "Citát (SK)",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "quoteEn",
      title: "Quote (EN)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "authorName",
      title: "Meno autora",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "authorRoleSk",
      title: "Pozícia / firma (SK)",
      type: "string",
    }),
    defineField({
      name: "authorRoleEn",
      title: "Role / company (EN)",
      type: "string",
    }),
    defineField({
      name: "order",
      title: "Poradie",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Poradie",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "authorName", subtitle: "quoteSk" },
  },
});
