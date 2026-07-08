const services = [
  {
    id: "oslavy",
    title: "Súkromné oslavy",
    description:
      "Narodeniny, výročia a rodinné oslavy. Od jednoduchej koordinácie po kompletnú realizáciu na kľúč.",
    priceFrom: "150 €",
  },
  {
    id: "pet",
    title: "Zvieracie oslavy",
    description:
      "Pet-friendly oslavy pre vaše štvornohé priateľe. Agility, pet pekárne a zábava pre celú psíčiu partiu.",
    priceFrom: "100 €",
  },
  {
    id: "teambuilding",
    title: "Teambuildingy",
    description:
      "Firemné akcie, športové programy a víkendové eventy. Posilnite tím zážitkom, nie prezentáciou.",
    priceFrom: "300 €",
  },
  {
    id: "sport",
    title: "Športové podujatia",
    description:
      "Behy, turnaje, firemné športové dni a charitatívne akcie. Od štartu po cieľ — my to odriadime.",
    priceFrom: "400 €",
  },
];

export default function Services() {
  return (
    <section id="sluzby" className="border-t border-gold/30 bg-cream-dark/50 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold-dark">
            Čo robíme
          </p>
          <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Naše služby
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Štyri segmenty, tri balíky v každom. Vyberte si úroveň, ktorá vám
            sedí — od koordinácie v deň D po full-service na kľúč.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.id}
              className="group rounded-2xl border border-gold/40 bg-background p-8 transition hover:border-gold hover:shadow-sm"
            >
              <h3 className="font-serif text-2xl font-semibold">
                {service.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted">
                {service.description}
              </p>
              <p className="mt-6 text-sm font-medium tracking-wide text-gold-dark">
                od {service.priceFrom}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
