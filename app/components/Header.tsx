"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dictionary } from "../[lang]/dictionaries";

type Props = { dict: Dictionary["header"] };

const navSlugs = [
  { key: "pricing" as const, slug: "/sluzby" },
  { key: "howItWorks" as const, slug: "/ako-to-funguje" },
  { key: "portfolio" as const, slug: "/portfolio" },
  { key: "about" as const, slug: "/o-nas" },
  { key: "contact" as const, slug: "/kontakt" },
];

export default function Header({ dict }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Extract current lang and the path without the lang prefix
  const segments = pathname.split("/");
  const lang = segments[1] ?? "sk";
  const pathWithoutLang = "/" + segments.slice(2).join("/");

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const otherLang = lang === "sk" ? "en" : "sk";
  const switchHref = `/${otherLang}${pathWithoutLang === "/" ? "" : pathWithoutLang}`;

  return (
    <header className="sticky top-0 z-50 border-b border-gold/30 bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href={`/${lang}`} className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt={dict.logoAlt}
            width={44}
            height={44}
            priority
          />
          <span className="font-display text-lg font-semibold tracking-wide">
            Momentum Events
          </span>
        </Link>

        <nav className="hidden items-center gap-8 sm:flex">
          {navSlugs.map(({ key, slug }) => {
            const href = `/${lang}${slug}`;
            const isActive = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={key}
                href={href}
                className={`text-sm tracking-wide transition ${
                  isActive
                    ? "font-medium text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {dict.nav[key]}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {/* Language switcher */}
          <Link
            href={switchHref}
            className="hidden rounded-full border border-gold/40 px-3 py-1.5 text-xs font-medium tracking-widest text-muted transition hover:border-gold hover:text-foreground sm:block"
          >
            {otherLang.toUpperCase()}
          </Link>

          <Link
            href={`/${lang}/kontakt`}
            className="hidden rounded-full bg-charcoal px-5 py-2 text-sm font-medium tracking-wide text-background transition hover:bg-charcoal/80 sm:block"
          >
            {dict.cta}
          </Link>

          <button
            type="button"
            aria-label={open ? dict.menuClose : dict.menuOpen}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 sm:hidden"
          >
            <span className={`h-px w-5 bg-foreground transition-all duration-300 ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-px w-5 bg-foreground transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`h-px w-5 bg-foreground transition-all duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-gold/30 bg-background px-6 py-8 sm:hidden">
          <nav className="flex flex-col gap-6">
            {navSlugs.map(({ key, slug }) => {
              const href = `/${lang}${slug}`;
              const isActive = pathname === href;
              return (
                <Link
                  key={key}
                  href={href}
                  className={`font-display text-2xl tracking-wide transition ${
                    isActive
                      ? "font-semibold text-foreground"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {dict.nav[key]}
                </Link>
              );
            })}
          </nav>
          <div className="mt-8 flex gap-3">
            <Link
              href={`/${lang}/kontakt`}
              className="flex-1 rounded-full border border-gold px-6 py-3 text-center text-sm font-medium tracking-wide transition hover:border-gold-dark hover:bg-gold/20"
            >
              {dict.cta}
            </Link>
            <Link
              href={switchHref}
              className="rounded-full border border-gold/40 px-4 py-3 text-sm font-medium tracking-widest text-muted transition hover:border-gold hover:text-foreground"
            >
              {otherLang.toUpperCase()}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
