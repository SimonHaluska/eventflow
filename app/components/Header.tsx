"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/sluzby", label: "Služby" },
  { href: "/o-nas", label: "O nás" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-gold/30 bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Logo Haka"
            width={44}
            height={44}
            priority
            className="logo-blend"
          />
          <span className="font-serif text-lg font-semibold tracking-wide">
            Haka
          </span>
        </Link>

        <nav className="hidden items-center gap-8 sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-wide transition ${
                pathname === link.href
                  ? "font-medium text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/kontakt"
          className="rounded-full border border-gold px-4 py-2 text-xs font-medium tracking-wide transition hover:border-gold-dark hover:bg-gold/20 sm:px-5 sm:text-sm"
        >
          Konzultácia
        </Link>
      </div>
    </header>
  );
}
