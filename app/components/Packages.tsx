"use client";

import { useState } from "react";

type PackageTier = {
  name: string;
  subtitle: string;
  price: string;
  features: string[];
  highlighted?: boolean;
};

type Segment = {
  id: string;
  label: string;
  packages: PackageTier[];
};

const segments: Segment[] = [
  {
    id: "oslavy",
    label: "Súkromné oslavy",
    packages: [
      {
        name: "Basic",
        subtitle: "Koordinácia v deň D",
        price: "150 – 200 €",
        features: [
          "Oboznámenie sa s harmonogramom 1–2 týždne pred akciou",
          "Osobná prítomnosť na mieste (4–6 hodín)",
          "Koordinácia dodávateľov a vítanie hostí",
          "Riešenie nečakaných situácií v deň D",
        ],
      },
      {
        name: "Standard",
        subtitle: "Plánovanie + koordinácia",
        price: "300 – 400 €",
        features: [
          "Všetko z balíka Basic",
          "Kreatívny koncept a detailný harmonogram",
          "Odporúčanie a komunikácia s dodávateľmi",
          "Obhliadka priestorov pred podujatím",
        ],
        highlighted: true,
      },
      {
        name: "Premium",
        subtitle: "Full-service na kľúč",
        price: "od 600 € + dodávatelia",
        features: [
          "Všetko z balíka Standard",
          "Zastrešenie všetkých dodávateľov za vás",
          "Pozvánky, výzdoba, catering — komplet",
          "Transparentné vedenie rozpočtu a fakturácia",
        ],
      },
    ],
  },
  {
    id: "pet",
    label: "Zvieracie oslavy",
    packages: [
      {
        name: "Basic",
        subtitle: "Koordinácia v deň D",
        price: "100 – 120 €",
        features: [
          "Pomoc na mieste počas oslavy",
          "Organizácia zvieracích súťaží",
          "Koordinácia krájania torty a programu",
          "Riešenie situácií v deň D",
        ],
      },
      {
        name: "Standard",
        subtitle: "Plánovanie + koordinácia",
        price: "200 – 250 €",
        features: [
          "Všetko z balíka Basic",
          "Pet-friendly výzdoba na mieru",
          "Zabezpečenie pet pekárne a doplnkov",
          "Pozvánky pre ostatných psíčkarov",
        ],
        highlighted: true,
      },
      {
        name: "Premium",
        subtitle: "Full-service na kľúč",
        price: "od 400 € + dodávatelia",
        features: [
          "Všetko z balíka Standard",
          "Prenájom cvičáku alebo parku",
          "Profi fotograf zvierat a agility prekážky",
          "Darčekové balíčky pre hostí",
        ],
      },
    ],
  },
  {
    id: "teambuilding",
    label: "Teambuildingy",
    packages: [
      {
        name: "Basic",
        subtitle: "Koordinácia v deň D",
        price: "300 – 400 €",
        features: [
          "Realizácia športového alebo zábavného programu",
          "Koordinácia aktivít na mieste",
          "Ideálne ak máte chatu a catering vybavené",
          "Program na niekoľko hodín",
        ],
      },
      {
        name: "Standard",
        subtitle: "Plánovanie + koordinácia",
        price: "20 – 30 € / osoba",
        features: [
          "Všetko z balíka Basic",
          "Minimálne 15–20 účastníkov",
          "Manažment, pomôcky na aktivity a koordinácia",
          "Ubytovanie a strava sa fakturujú zvlášť",
        ],
        highlighted: true,
      },
      {
        name: "Premium",
        subtitle: "Full-service na kľúč",
        price: "45 – 60+ € / osoba",
        features: [
          "Všetko z balíka Standard",
          "Celovíkendový program s ubytovaním",
          "Prenájom rezortu, večerný DJ a branding",
          "Marža 10–15 % na služby dodávateľov",
        ],
      },
    ],
  },
  {
    id: "sport",
    label: "Športové podujatia",
    packages: [
      {
        name: "Basic",
        subtitle: "Koordinácia v deň D",
        price: "400 – 500 €",
        features: [
          "Odriadenie štartu a cieľa na podujatí",
          "Koordinácia na mieste v deň akcie",
          "Ideálne pre existujúce lokálne behy",
          "Osobná prítomnosť nášho tímu",
        ],
      },
      {
        name: "Standard",
        subtitle: "Plánovanie + koordinácia",
        price: "800 – 1 200 €",
        features: [
          "Všetko z balíka Basic",
          "Harmonogram pre turnaj alebo lokálny beh",
          "Zabezpečenie rozhodcov a registrácie",
          "Obhliadka trate a logistická príprava",
        ],
        highlighted: true,
      },
      {
        name: "Premium",
        subtitle: "Full-service na kľúč",
        price: "1 500 – 2 500+ €",
        features: [
          "Všetko z balíka Standard",
          "Marketing, online registrácie a stavba tratí",
          "Záchranná služba, pódium a medaily na mieru",
          "Kompletná administratíva a povolenia",
        ],
      },
    ],
  },
];

export default function Packages() {
  const [activeSegment, setActiveSegment] = useState(segments[0].id);
  const current = segments.find((s) => s.id === activeSegment)!;

  return (
    <section id="baliky" className="border-t border-gold/30 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">
            Cenník
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Balíky služieb
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Vyberte segment a porovnajte tri úrovne starostlivosti. Presná cena
            závisí od rozsahu akcie — radi pripravíme nezáväznú ponuku.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {segments.map((segment) => (
            <button
              key={segment.id}
              type="button"
              onClick={() => setActiveSegment(segment.id)}
              className={`rounded-full border px-4 py-2 text-sm tracking-wide transition ${
                activeSegment === segment.id
                  ? "border-gold bg-gold/25 text-foreground"
                  : "border-gold/40 text-muted hover:border-gold hover:text-foreground"
              }`}
            >
              {segment.label}
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {current.packages.map((pkg) => (
            <article
              key={pkg.name}
              className={`flex flex-col rounded-2xl border p-8 ${
                pkg.highlighted
                  ? "border-gold bg-cream-dark/60 shadow-sm"
                  : "border-gold/40 bg-background"
              }`}
            >
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
                {pkg.name}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold">
                {pkg.subtitle}
              </h3>
              <p className="mt-4 font-display text-2xl font-semibold">
                {pkg.price}
              </p>

              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {pkg.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-2 text-sm leading-relaxed text-muted"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted">
          Všetky ceny sú orientačné. Pri objednávke vystavujeme 50 % zálohu na
          blokovanie termínu.
        </p>
      </div>
    </section>
  );
}
