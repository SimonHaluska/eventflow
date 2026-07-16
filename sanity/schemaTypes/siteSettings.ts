import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Nastavenia webu",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "E-mail",
      type: "string",
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: "phone",
      title: "Telefón",
      type: "string",
    }),
    defineField({
      name: "addressSk",
      title: "Adresa (SK)",
      type: "string",
    }),
    defineField({
      name: "addressEn",
      title: "Address (EN)",
      type: "string",
    }),
    defineField({
      name: "openingHoursSk",
      title: "Otváracie hodiny (SK)",
      type: "text",
      rows: 4,
      description: "Napr. Po–Pi: 9:00–17:00",
    }),
    defineField({
      name: "openingHoursEn",
      title: "Opening hours (EN)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
    }),
    defineField({
      name: "facebookUrl",
      title: "Facebook URL",
      type: "url",
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn URL",
      type: "url",
    }),
    defineField({
      name: "tiktokUrl",
      title: "TikTok URL",
      type: "url",
    }),
    defineField({
      name: "mapEmbedUrl",
      title: "Google Maps embed URL",
      type: "url",
      description: "Celá URL z Google Maps → Zdieľať → Vložiť mapu",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Nastavenia webu" }),
  },
});
