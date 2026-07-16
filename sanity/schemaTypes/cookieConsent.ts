import { defineField, defineType } from "sanity";

export const cookieConsent = defineType({
  name: "cookieConsent",
  title: "Cookie banner",
  type: "document",
  fields: [
    defineField({ name: "textSk", title: "Text (SK)", type: "text", rows: 2 }),
    defineField({ name: "textEn", title: "Text (EN)", type: "text", rows: 2 }),
    defineField({ name: "privacyLinkSk", title: "Odkaz na GDPR (SK)", type: "string" }),
    defineField({ name: "privacyLinkEn", title: "Privacy link (EN)", type: "string" }),
    defineField({ name: "acceptSk", title: "Prijať (SK)", type: "string" }),
    defineField({ name: "acceptEn", title: "Accept (EN)", type: "string" }),
    defineField({ name: "declineSk", title: "Odmietnuť (SK)", type: "string" }),
    defineField({ name: "declineEn", title: "Decline (EN)", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Cookie banner" }) },
});
