import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/sluzby", label: "Služby" },
  { href: "/o-nas", label: "O nás" },
  { href: "/kontakt", label: "Kontakt" },
];

const segments = [
  { href: "/sluzby", label: "Súkromné oslavy" },
  { href: "/sluzby", label: "Zvieracie oslavy" },
  { href: "/sluzby", label: "Teambuildingy" },
  { href: "/sluzby", label: "Športové podujatia" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gold/30 bg-cream-dark/50 px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-12 sm:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Logo Haka"
                width={40}
                height={40}
                className="logo-blend"
              />
              <span className="font-serif text-lg font-semibold tracking-wide">
                Haka
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Eventová agentúra so zameraním na šport, teambuildingy a súkromné
              oslavy. Od konceptu po posledného hosťa.
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-gold-dark">
              Navigácia
            </p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-gold-dark">
              Segmenty
            </p>
            <ul className="space-y-2">
              {segments.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="text-sm text-muted transition hover:text-foreground"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gold/20 pt-8 sm:flex-row">
          <p className="text-xs text-muted">
            © {year} Haka. Všetky práva vyhradené.
          </p>
          <p className="text-xs text-muted">
            <a
              href="mailto:info@haka.sk"
              className="transition hover:text-foreground"
            >
              info@haka.sk
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
