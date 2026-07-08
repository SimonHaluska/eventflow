import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfólio | Momentum Events",
  description: "Galéria realizovaných eventov — oslavy, teambuildingy a športové podujatia.",
};

const placeholderItems = Array.from({ length: 8 });

export default function PortfolioPage() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">
            Naša práca
          </p>
          <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Portfólio
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Fotky z realizovaných akcií doplníme čoskoro. Sledujte nás na
            sociálnych sieťach, kde zdieľame zákulisie každého eventu.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {placeholderItems.map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-2xl border border-dashed border-gold/30 bg-cream-dark/40"
            />
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-muted">
          Fotky pripravujeme — ozvite sa nám medzitým priamo.{" "}
          <a
            href="/kontakt"
            className="text-foreground underline underline-offset-4 transition hover:text-gold-dark"
          >
            Kontaktovať nás
          </a>
        </p>
      </div>
    </section>
  );
}
