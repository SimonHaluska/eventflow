import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "../[lang]/dictionaries";
import type { HomepageSectionData, PartnerData } from "../../sanity/types";
import Reveal from "./Reveal";

type Props = {
  section: HomepageSectionData;
  partners: PartnerData[];
};

export default function Partners({ section, partners }: Props) {
  return (
    <section className="border-t border-gold/30 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-12 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">
            {section.label}
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {section.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">{section.subtitle}</p>
        </Reveal>

        {partners.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {partners.map((partner, i) => (
              <Reveal key={partner._id} delay={i * 60} direction="up">
                {partner.url ? (
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-20 items-center justify-center rounded-xl border border-gold/20 bg-cream-dark p-4 transition hover:border-gold/60"
                  >
                    <Image
                      src={partner.logoUrl}
                      alt={partner.logoAlt}
                      width={160}
                      height={80}
                      className="max-h-12 w-auto object-contain"
                    />
                  </a>
                ) : (
                  <div className="flex h-20 items-center justify-center rounded-xl border border-gold/20 bg-cream-dark p-4">
                    <Image
                      src={partner.logoUrl}
                      alt={partner.logoAlt}
                      width={160}
                      height={80}
                      className="max-h-12 w-auto object-contain"
                    />
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Reveal key={i} delay={i * 60} direction="up">
                <div className="flex h-20 items-center justify-center rounded-xl border border-dashed border-gold/30 bg-cream-dark transition hover:border-gold/60">
                  <span className="text-xs text-muted/40">Logo</span>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
