import { defineField, defineType } from "sanity";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "heroTitleSk",
      title: "Hero nadpis (SK)",
      type: "string",
    }),
    defineField({
      name: "heroTitleHighlightSk",
      title: "Hero zvýraznenie (SK)",
      type: "string",
    }),
    defineField({
      name: "heroTitleEn",
      title: "Hero title (EN)",
      type: "string",
    }),
    defineField({
      name: "heroTitleHighlightEn",
      title: "Hero highlight (EN)",
      type: "string",
    }),
    defineField({
      name: "partnersLabelSk",
      title: "Partneri — label (SK)",
      type: "string",
    }),
    defineField({
      name: "partnersTitleSk",
      title: "Partneri — nadpis (SK)",
      type: "string",
    }),
    defineField({
      name: "partnersSubtitleSk",
      title: "Partneri — podnadpis (SK)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "partnersLabelEn",
      title: "Partners — label (EN)",
      type: "string",
    }),
    defineField({
      name: "partnersTitleEn",
      title: "Partners — title (EN)",
      type: "string",
    }),
    defineField({
      name: "partnersSubtitleEn",
      title: "Partners — subtitle (EN)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "testimonialsLabelSk",
      title: "Referencie — label (SK)",
      type: "string",
    }),
    defineField({
      name: "testimonialsTitleSk",
      title: "Referencie — nadpis (SK)",
      type: "string",
    }),
    defineField({
      name: "testimonialsSubtitleSk",
      title: "Referencie — podnadpis (SK)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "testimonialsLabelEn",
      title: "Testimonials — label (EN)",
      type: "string",
    }),
    defineField({
      name: "testimonialsTitleEn",
      title: "Testimonials — title (EN)",
      type: "string",
    }),
    defineField({
      name: "testimonialsSubtitleEn",
      title: "Testimonials — subtitle (EN)",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    prepare: () => ({ title: "Homepage" }),
  },
});
