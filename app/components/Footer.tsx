import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "../[lang]/dictionaries";

type Props = {
  dict: Dictionary["footer"];
  lang: string;
};

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/momentumevents.sk",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/momentumevents.sk",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.791-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/momentum-events-sk",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@momentumevents.sk",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
];

const navSlugs = [
  { key: "pricing" as const, slug: "/sluzby" },
  { key: "howItWorks" as const, slug: "/ako-to-funguje" },
  { key: "portfolio" as const, slug: "/portfolio" },
  { key: "about" as const, slug: "/o-nas" },
  { key: "contact" as const, slug: "/kontakt" },
];

export default function Footer({ dict, lang }: Props) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal px-6 py-16 text-background">
      <div className="mx-auto max-w-5xl space-y-10">

        <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-4">

          {/* Logo + popis + sociálne siete */}
          <div className="self-start">
            <Link href={`/${lang}`} className="flex items-start gap-3">
              <Image
                src="/logo.png"
                alt={dict.description}
                width={40}
                height={40}
                priority
                className="brightness-0 invert"
              />
              <span className="font-display text-lg font-semibold tracking-wide text-background">
                Momentum Events
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-background/60">
              {dict.description}
            </p>

            <p className="mt-10 hidden text-xs font-medium uppercase tracking-[0.2em] text-gold sm:block">
              {dict.followUs}
            </p>
            <div className="mt-3 hidden flex-wrap gap-2 sm:flex">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-background/20 text-background/60 transition hover:border-gold hover:text-gold"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigácia */}
          <div className="self-start sm:pl-[50px] sm:pt-[6px]">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-gold">
              {dict.navTitle}
            </p>
            <ul className="space-y-2">
              {navSlugs.map(({ key, slug }) => (
                <li key={key}>
                  <Link
                    href={`/${lang}${slug}`}
                    className="text-sm text-background/60 transition hover:text-background"
                  >
                    {dict.nav[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Segmenty */}
          <div className="self-start sm:pl-[10px] sm:pt-[6px]">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-gold">
              {dict.segmentsTitle}
            </p>
            <ul className="space-y-2">
              {dict.segments.map((s) => (
                <li key={s.label}>
                  <Link
                    href={`/${lang}${s.slug}`}
                    className="text-sm text-background/60 transition hover:text-background"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mapa + sociálne siete (mobile) */}
          <div className="flex flex-col gap-4 self-start sm:pt-[6px]">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
              {dict.locationTitle}
            </p>
            <div className="w-full overflow-hidden rounded-xl border border-background/10">
              <div className="relative h-40 w-full sm:aspect-square sm:h-auto">
                <iframe
                  title="Momentum Events – poloha"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d42399.10226924927!2d17.0699!3d48.1486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476c89360bdf9e79%3A0xa1ccd56258bc25d0!2sBratislava!5e0!3m2!1ssk!2ssk!4v1700000000000"
                  className="absolute inset-0 h-full w-full"
                  style={{
                    border: 0,
                    filter: "grayscale(1) invert(0.85) sepia(0.1) opacity(0.7)",
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 sm:hidden">
              <p className="mb-1 w-full text-xs font-medium uppercase tracking-[0.2em] text-gold">
                {dict.followUs}
              </p>
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-background/20 text-background/60 transition hover:border-gold hover:text-gold"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Spodná lišta */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-background/10 pt-8 sm:flex-row">
          <p className="text-xs text-background/40">
            © {year} {dict.copyright}
          </p>
          <Link
            href={`/${lang}/ochrana-udajov`}
            className="text-xs text-background/40 transition hover:text-background/70"
          >
            {lang === "sk" ? "Ochrana osobných údajov" : "Privacy Policy"}
          </Link>
          <p className="text-xs text-background/40">info@momentumevents.sk</p>
        </div>
      </div>
    </footer>
  );
}
