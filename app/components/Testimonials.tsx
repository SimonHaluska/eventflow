const testimonials = [
  {
    name: "Meno klienta",
    role: "Firemný klient",
    text: "Tu bude referencie od vášho prvého klienta. Po realizácii prvej akcie ho požiadajte o krátku spätnú väzbu — 2–3 vety stačia.",
    segment: "Teambuilding",
  },
  {
    name: "Meno klienta",
    role: "Súkromná oslava",
    text: "Referencie sú najsilnejší predajný nástroj eventovej agentúry. Klienti chcú vidieť, že ste to už robili a že to funguje.",
    segment: "Súkromná oslava",
  },
  {
    name: "Meno klienta",
    role: "Športové podujatie",
    text: "Aj jedna úprimná referencia je lepšia ako žiadna. Nebojte sa klientov požiadať — väčšina rada pomôže.",
    segment: "Šport",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-background px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold-dark">
            Referencie
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Čo hovoria naši klienti
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Referencie doplníme po realizácii prvých akcií.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {testimonials.map((t, i) => (
            <article
              key={i}
              className="flex flex-col rounded-xl bg-card-bg p-10 opacity-50"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
            >
              <p className="flex-1 text-sm leading-relaxed text-muted">
                <em className="not-italic">„{t.text}"</em>
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-gold/20 pt-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/20 text-xs font-semibold text-gold-dark">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted">{t.segment}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
