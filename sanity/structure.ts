import type { StructureResolver } from "sanity/structure";

const singleton = (S: Parameters<StructureResolver>[0], type: string, title: string) =>
  S.listItem()
    .title(title)
    .id(type)
    .child(S.document().schemaType(type).documentId(type));

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Obsah")
    .items([
      S.listItem()
        .title("Globálne")
        .child(
          S.list()
            .title("Globálne")
            .items([
              singleton(S, "siteSettings", "Nastavenia webu"),
              singleton(S, "pageSeo", "SEO / Meta"),
              singleton(S, "navigationSettings", "Navigácia a footer"),
              singleton(S, "cookieConsent", "Cookie banner"),
              singleton(S, "privacyPolicy", "Ochrana údajov"),
            ])
        ),
      S.listItem()
        .title("Homepage")
        .child(
          S.list()
            .title("Homepage")
            .items([
              singleton(S, "homepage", "Texty homepage"),
              S.documentTypeListItem("heroBanner").title("Hero bannery"),
              S.documentTypeListItem("partner").title("Partneri"),
              S.documentTypeListItem("testimonial").title("Referencie"),
            ])
        ),
      S.listItem()
        .title("Stránky")
        .child(
          S.list()
            .title("Stránky")
            .items([
              singleton(S, "servicesPage", "Naše služby"),
              singleton(S, "pricingPage", "Cenník"),
              singleton(S, "faqPage", "FAQ"),
              singleton(S, "howItWorksPage", "Ako to funguje"),
              singleton(S, "portfolioPage", "Portfólio — texty"),
              S.documentTypeListItem("portfolioItem").title("Portfólio — položky"),
              singleton(S, "aboutPage", "O nás — texty"),
              S.documentTypeListItem("teamMember").title("Tím"),
              singleton(S, "contactPage", "Kontakt"),
              singleton(S, "blogPage", "Blog — texty"),
              S.documentTypeListItem("blogPost").title("Blog — články"),
            ])
        ),
    ]);
