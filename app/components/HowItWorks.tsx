const steps = [
  {
    number: "01",
    title: "Dopyt a konzultácia",
    description:
      "Napíšte nám alebo zavolajte. Prvá konzultácia je vždy zadarmo a nezáväzná. Spoločne zistíme, čo váš event potrebuje.",
  },
  {
    number: "02",
    title: "Výber balíka a zmluva",
    description:
      "Na základe vašich predstáv a rozpočtu navrhneme vhodný balík. Po odsúhlasení podpíšeme zmluvu s jasnými podmienkami.",
  },
  {
    number: "03",
    title: "Záloha a blokácia termínu",
    description:
      "Po podpise zmluvy vystavíme zálohovú faktúru (50 % z ceny). Tým si záväzne blokujete termín a my začíname prípravy.",
  },
  {
    number: "04",
    title: "Príprava a koordinácia",
    description:
      "Zabezpečíme priestory, dodávateľov, harmonogram a všetku logistiku. Vy ste informovaní, no nemusíte riešiť detaily.",
  },
  {
    number: "05",
    title: "Deň D — realizácia",
    description:
      "Náš tím je osobne prítomný počas celého eventu. Riadime program, koordinujeme dodávateľov a riešime všetko za vás.",
  },
  {
    number: "06",
    title: "Doplatok a vyhodnotenie",
    description:
      "Po úspešnej akcii vystavíme doplatkovú faktúru. Radi si vypočujeme váš feedback — každý event nás posúva ďalej.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-charcoal px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">
            Proces
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-background sm:text-4xl">
            Ako to funguje
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-background/60">
            Od prvého kontaktu po posledného hosťa — šesť krokov, ktoré nás
            spájajú.
          </p>
        </div>

        <div className="grid gap-px bg-background/10 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-charcoal p-10 transition hover:bg-white/5"
            >
              <p className="font-display text-4xl font-bold text-gold">
                {step.number}
              </p>
              <h3 className="mt-4 font-display text-lg font-semibold text-background">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-background/60">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
