import Reveal from "./Reveal";

export default function Partners() {
  return (
    <section className="border-t border-gold/30 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-12 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">
            Spolupráce
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Firmy, s ktorými sme spolupracovali
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Logá partnerov a klientov doplníme po realizácii prvých projektov.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Reveal key={i} delay={i * 60} direction="up">
            <div
              key={i}
              className="flex h-20 items-center justify-center rounded-xl border border-dashed border-gold/30 bg-cream-dark transition hover:border-gold/60"
            >
              <span className="text-xs text-muted/40">Logo</span>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
