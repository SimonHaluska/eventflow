const founders = [
  {
    name: "Šimon Haluska",
    role: "Spoluzakladateľ & konateľ",
    focus: "Športové podujatia a firemné teambuildingy",
    description:
      "Vedie projekty, kde záleží na logistike, športovom programe a koordinácii väčších akcií — od firemných turnajov po charitatívne behy.",
    initials: "ŠH",
  },
  {
    name: "Andrea Fačkovcová",
    role: "Spoluzakladateľka & konateľka",
    focus: "Súkromné a zvieracie oslavy",
    description:
      "Vedie projekty s osobným príbehom — narodeniny, rodinné oslavy a pet-friendly eventy, kde záleží na každom detaile a atmosfére.",
    initials: "AF",
  },
];

const values = [
  {
    title: "Jeden tím, jeden brand",
    text: "Na kľúčové stretnutia s klientmi chodíme vždy spolu. Vidíte celé zázemie agentúry od prvej chvíle.",
  },
  {
    title: "Dve expertízy, jeden cieľ",
    text: "Šport a oslavy sa dopĺňajú. Každú zákazku interne vedie ten, kto má v danom segmente hlbšiu skúsenosť.",
  },
  {
    title: "Plán B pre každého dodávateľa",
    text: "Pre kľúčové pozície máme vždy záložného partnera. Minimalizujeme riziko, že niečo pokazí váš deň.",
  },
];

export default function About() {
  return (
    <section
      id="o-nas"
      className="border-t border-gold/30 bg-cream-dark/50 px-6 py-24"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">
            Kto sme
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            O nás
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Sme dvaja zakladatelia s odlišným, no navzájom sa dopĺňajúcim
            zameraním. Navonok vystupujeme ako jeden kompaktný tím — pretože
            váš event si zaslúži obe naše expertízy.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {founders.map((founder) => (
            <article
              key={founder.name}
              className="rounded-2xl border border-gold/40 bg-background p-8"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold bg-cream-dark/60 font-display text-xl font-semibold text-gold">
                {founder.initials}
              </div>

              <h3 className="font-display text-2xl font-semibold">
                {founder.name}
              </h3>
              <p className="mt-1 text-sm tracking-wide text-gold">
                {founder.role}
              </p>
              <p className="mt-4 text-sm font-medium">{founder.focus}</p>
              <p className="mt-2 leading-relaxed text-muted">
                {founder.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-2xl border border-gold/30 bg-background/60 p-6"
            >
              <h4 className="font-display text-lg font-semibold">{value.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {value.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
