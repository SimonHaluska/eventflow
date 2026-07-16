import { defineField, defineType } from "sanity";

export const heroBanner = defineType({
  name: "heroBanner",
  title: "Hero banner",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Interný názov",
      type: "string",
      validation: (rule) => rule.required(),
      description: "Len pre vás v CMS, na webe sa nezobrazuje",
    }),
    defineField({
      name: "active",
      title: "Aktívny",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Poradie",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "duration",
      title: "Trvanie (sekundy)",
      type: "number",
      initialValue: 10,
      validation: (rule) => rule.min(3).max(60),
    }),
    defineField({
      name: "type",
      title: "Typ banneru",
      type: "string",
      options: {
        list: [
          { title: "Logo animácia", value: "logoAnimation" },
          { title: "Plagát (obrázok)", value: "image" },
          { title: "Video", value: "video" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroTitleSk",
      title: "Nadpis (SK)",
      type: "string",
      hidden: ({ parent }) => parent?.type === "image" || parent?.type === "video",
    }),
    defineField({
      name: "heroTitleHighlightSk",
      title: "Zvýraznenie (SK)",
      type: "string",
      hidden: ({ parent }) => parent?.type === "image" || parent?.type === "video",
    }),
    defineField({
      name: "heroTitleEn",
      title: "Title (EN)",
      type: "string",
      hidden: ({ parent }) => parent?.type === "image" || parent?.type === "video",
    }),
    defineField({
      name: "heroTitleHighlightEn",
      title: "Highlight (EN)",
      type: "string",
      hidden: ({ parent }) => parent?.type === "image" || parent?.type === "video",
    }),
    defineField({
      name: "image",
      title: "Plagát / obrázok",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.type !== "image",
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "string" }),
      ],
    }),
    defineField({
      name: "overlayTitleSk",
      title: "Text na plagáte (SK)",
      type: "string",
      hidden: ({ parent }) => parent?.type !== "image",
    }),
    defineField({
      name: "overlayTitleEn",
      title: "Overlay text (EN)",
      type: "string",
      hidden: ({ parent }) => parent?.type !== "image",
    }),
    defineField({
      name: "videoFile",
      title: "Video súbor (MP4)",
      type: "file",
      options: { accept: "video/*" },
      hidden: ({ parent }) => parent?.type !== "video",
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL (YouTube / Vimeo / priamy odkaz)",
      type: "url",
      hidden: ({ parent }) => parent?.type !== "video",
      description: "Ak nahráte súbor aj URL, použije sa súbor z CMS",
    }),
    defineField({
      name: "ctaLabelSk",
      title: "Tlačidlo — text (SK)",
      type: "string",
    }),
    defineField({
      name: "ctaLabelEn",
      title: "Button label (EN)",
      type: "string",
    }),
    defineField({
      name: "ctaHref",
      title: "Tlačidlo — odkaz",
      type: "string",
      description: "Napr. /sk/nase-sluzby alebo https://...",
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
    select: { title: "title", type: "type", media: "image", active: "active" },
    prepare({ title, type, media, active }) {
      const typeLabels: Record<string, string> = {
        logoAnimation: "Logo animácia",
        image: "Plagát",
        video: "Video",
      };
      return {
        title: `${active ? "✓ " : ""}${title}`,
        subtitle: typeLabels[type as string] ?? type,
        media,
      };
    },
  },
});
