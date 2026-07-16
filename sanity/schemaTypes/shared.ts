import { defineField } from "sanity";

export const packageTierFields = [
  defineField({ name: "name", title: "Názov balíka", type: "string", validation: (r) => r.required() }),
  defineField({ name: "subtitleSk", title: "Podnadpis (SK)", type: "string" }),
  defineField({ name: "subtitleEn", title: "Subtitle (EN)", type: "string" }),
  defineField({ name: "price", title: "Cena", type: "string", validation: (r) => r.required() }),
  defineField({ name: "highlighted", title: "Zvýraznený", type: "boolean", initialValue: false }),
  defineField({
    name: "featuresSk",
    title: "Funkcie (SK)",
    type: "array",
    of: [{ type: "string" }],
  }),
  defineField({
    name: "featuresEn",
    title: "Features (EN)",
    type: "array",
    of: [{ type: "string" }],
  }),
];

export const pricingSegmentFields = [
  defineField({
    name: "segmentId",
    title: "ID segmentu",
    type: "string",
    description: "oslavy | pet | teambuilding | sport",
    validation: (r) => r.required(),
  }),
  defineField({ name: "labelSk", title: "Názov (SK)", type: "string", validation: (r) => r.required() }),
  defineField({ name: "labelEn", title: "Label (EN)", type: "string" }),
  defineField({
    name: "packages",
    title: "Balíky",
    type: "array",
    of: [{ type: "object", fields: packageTierFields }],
  }),
];
