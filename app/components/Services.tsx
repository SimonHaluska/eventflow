import Reveal from "./Reveal";

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
    <section id="sluzby" className="border-t border-gold/30 bg-background px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-12 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">
            Čo robíme
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Naše služby
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Štyri segmenty, tri balíky v každom. Vyberte si úroveň, ktorá vám
            sedí — od koordinácie v deň D po full-service na kľúč.
          </p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 100} direction="up">
              <article
                className="card-hover h-full rounded-2xl border border-gold/30 bg-card-bg p-8 hover:border-gold"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
              >
                <h3 className="font-display text-2xl font-semibold">
                  {service.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">
                  {service.description}
                </p>
                <p className="mt-6 text-sm font-medium tracking-wide text-gold">
                  od {service.priceFrom}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
