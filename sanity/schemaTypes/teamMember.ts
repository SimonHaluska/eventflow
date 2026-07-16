import { defineField, defineType } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Člen tímu",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Meno",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "initials",
      title: "Iniciály",
      type: "string",
      validation: (rule) => rule.required().max(3),
    }),
    defineField({
      name: "roleSk",
      title: "Pozícia (SK)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "roleEn",
      title: "Role (EN)",
      type: "string",
    }),
    defineField({
      name: "focusSk",
      title: "Zameranie (SK)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "focusEn",
      title: "Focus (EN)",
      type: "string",
    }),
    defineField({
      name: "descriptionSk",
      title: "Popis (SK)",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "descriptionEn",
      title: "Description (EN)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "photo",
      title: "Fotografia",
      type: "image",
      options: { hotspot: true },
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
    select: { title: "name", subtitle: "roleSk", media: "photo" },
  },
});
