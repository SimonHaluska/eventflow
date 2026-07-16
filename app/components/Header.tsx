"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Dictionary } from "../[lang]/dictionaries";

type Props = { dict: Dictionary["header"]; cta?: string };

const navSlugs = [
  { key: "home" as const, slug: "" },
  { key: "services" as const, slug: "/nase-sluzby" },
  { key: "pricing" as const, slug: "/sluzby", accordion: true },
  { key: "portfolio" as const, slug: "/portfolio" },
  { key: "howItWorks" as const, slug: "/ako-to-funguje" },
  { key: "about" as const, slug: "/o-nas" },
  { key: "blog" as const, slug: "/blog" },
  { key: "contact" as const, slug: "/kontakt" },
] as const;

export default function Header({ dict, cta }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [pricingOpen, setPricingOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const segments = pathname.split("/");
  const lang = segments[1] ?? "sk";
  const pathWithoutLang = "/" + segments.slice(2).join("/");
  const otherLang = lang === "sk" ? "en" : "sk";
  const switchHref = `/${otherLang}${pathWithoutLang === "/" ? "" : pathWithoutLang}`;

  const pricingSubItems = [
    {
      segment: "oslavy",
      label: lang === "sk" ? "Súkromné oslavy" : "Private Parties",
    },
    {
      segment: "pet",
      label: lang === "sk" ? "Narodeninové oslavy" : "Birthday Parties",
    },
    {
      segment: "teambuilding",
      label: lang === "sk" ? "Teambuildingy" : "Team Buildings",
    },
    {
      segment: "sport",
      label: lang === "sk" ? "Športové podujatia" : "Sports Events",
    },
  ];

  // Zatvoriť pri zmene stránky
  useEffect(() => {
    setOpen(false);
    setPricingOpen(false);
  }, [pathname]);

  // Push page content
  useEffect(() => {
    const wrapper = document.getElementById("page-wrapper");
    const panelWidth = Math.min(window.innerWidth * 0.85, 360);
    const shift = Math.round(panelWidth * 0.6);
    if (wrapper) {
      wrapper.style.transform = open ? `translateX(-${shift}px)` : "";
    }
    document.body.style.overflowX = open ? "hidden" : "";
    return () => {
      document.body.style.overflowX = "";
    };
  }, [open]);

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  // Focus prvého odkazu pri otvorení
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;
    const first = panel.querySelector<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    first?.focus();
  }, [open]);

  // Focus trap
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const getFocusable = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const els = getFocusable();
      if (!els.length) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [open]);

  function isActive(slug: string) {
    const href = `/${lang}${slug}`;
    if (slug === "") return pathname === `/${lang}` || pathname === `/${lang}/`;
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gold/30 bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href={`/${lang}`} className="flex shrink-0 items-center sm:-ml-[180px]">
          <Image
            src="/logo.png"
            alt={dict.logoAlt}
            width={543}
            height={460}
            className="h-auto w-[100px]"
            priority
          />
        </Link>

        {/* Konzultácia + menu */}
        <div className="flex items-center gap-2 sm:gap-3 sm:-mr-[150px]">
          <Link
            href={`/${lang}/kontakt`}
            className="rounded-full bg-charcoal px-4 py-2 text-xs font-medium tracking-wide text-background transition hover:bg-charcoal/80 sm:px-5 sm:text-sm"
          >
            {cta ?? dict.cta}
          </Link>
        {/* Menu tlačidlo — skryté keď je panel otvorený */}
        <button
          type="button"
          aria-label={dict.menuOpen}
          aria-expanded={open}
          aria-controls="nav-panel"
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-full border border-gold/40 px-4 py-2 text-sm text-muted transition hover:border-gold hover:text-foreground"
          style={{ opacity: open ? 0 : 1, pointerEvents: open ? "none" : "auto" }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="h-4 w-4 shrink-0"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span className="hidden sm:block text-sm font-medium">Menu</span>
        </button>
        </div>
      </div>

      {mounted && createPortal(
        <>
        {/* Overlay */}
        <div
          aria-hidden="true"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[60] bg-white/10 transition-opacity duration-300"
          style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
        />

        {/* Slide-in panel */}
        <div
        id="nav-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={lang === "sk" ? "Navigácia" : "Navigation"}
        className="fixed top-0 right-0 z-[70] flex h-full flex-col transition-transform duration-300 ease-in-out"
        style={{
          width: "min(85vw, 360px)",
          backgroundColor: "var(--background)",
          boxShadow: "-4px 0 30px rgba(0,0,0,0.10)",
          transform: open ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* Horný odstup — len mobile (na desktope bez X) */}
        <div className="flex shrink-0 px-[30px] pt-14 pb-2 sm:hidden" aria-hidden="true" />

        {/* Logo — centrované */}
        <div className="shrink-0 flex flex-col items-center px-[30px] -mb-6 mt-2 sm:mt-0 sm:pt-10">
          <Link href={`/${lang}`} onClick={() => setOpen(false)}>
            <Image
              src="/logo.png"
              alt={dict.logoAlt}
              width={543}
              height={460}
              className="h-auto w-28 sm:w-32"
            />
          </Link>
        </div>

        {/* Hlavné nav položky — veľké, vzdušné, bez bordérov */}
        <nav
          className="flex flex-1 flex-col justify-center overflow-y-auto px-[30px] pt-0 pb-4"
          aria-label={lang === "sk" ? "Hlavná navigácia" : "Main navigation"}
        >
          {navSlugs.map(({ key, slug }) => {
            const href = `/${lang}${slug}`;
            const active = isActive(slug);

            if (key === "pricing") {
              return (
                <div key={key}>
                  <div className="flex items-center">
                    <Link
                      href={href}
                      className={`font-display flex-1 py-3 text-lg sm:text-2xl font-medium tracking-tight transition-colors ${
                        active ? "text-foreground" : "text-muted hover:text-foreground"
                      }`}
                    >
                      {dict.nav[key]}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setPricingOpen((v) => !v)}
                      aria-expanded={pricingOpen}
                      aria-label={pricingOpen ? "Zbaliť" : "Rozbaliť"}
                      className="p-2 text-muted transition-colors hover:text-foreground"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        className="h-4 w-4 transition-transform duration-200"
                        style={{ transform: pricingOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  {/* Sub-položky */}
                  <div
                    className="overflow-hidden transition-all duration-200"
                    style={{ maxHeight: pricingOpen ? "240px" : "0px" }}
                  >
                    <div className="mb-2 flex flex-col gap-1 pl-3">
                      {pricingSubItems.map(({ segment, label }) => (
                        <Link
                          key={segment}
                          href={`/${lang}/sluzby?segment=${segment}`}
                          className="py-1.5 text-[15px] text-muted transition-colors hover:text-foreground"
                        >
                          {label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={key}
                href={href}
                className={`font-display py-3 text-lg sm:text-2xl font-medium tracking-tight transition-colors ${
                  active ? "text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {dict.nav[key]}
              </Link>
            );
          })}
        </nav>

        {/* Spodok panelu */}
        <div className="shrink-0 px-[30px] pt-5 pb-12 -mt-10" style={{ borderTop: "1px solid color-mix(in srgb, var(--gold) 15%, transparent)" }}>
          <Link
            href={switchHref}
            onClick={() => setOpen(false)}
            aria-label={otherLang === "en" ? "Switch to English" : "Prepnúť na slovenčinu"}
            className="flex items-center justify-center gap-2 rounded-full py-2.5 text-sm text-muted transition hover:text-foreground"
            style={{ border: "1px solid color-mix(in srgb, var(--gold) 35%, transparent)" }}
          >
            <span className="text-lg leading-none">
              {otherLang === "en" ? "🇬🇧" : "🇸🇰"}
            </span>
            {otherLang === "en" ? "English" : "Slovenčina"}
          </Link>
        </div>
        </div>
        </>,
        document.body
      )}
    </header>
  );
}
