"use client";

import { useCallback, useEffect, useState } from "react";

const founders = [
  {
    name: "Šimon Haluska",
    role: "Spoluzakladateľ & konateľ",
    focus: "Športové podujatia a firemné teambuildingy",
    description:
      "Vedie projekty, kde záleží na logistike, športovom programe a koordinácii väčších akcií — od firemných turnajov po charitatívne behy.",
    initials: "ŠH",
    photo: null,
  },
  {
    name: "Andrea Fačkovcová",
    role: "Spoluzakladateľka & konateľka",
    focus: "Súkromné a zvieracie oslavy",
    description:
      "Vedie projekty s osobným príbehom — narodeniny, rodinné oslavy a pet-friendly eventy, kde záleží na každom detaile a atmosfére.",
    initials: "AF",
    photo: null,
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
  const [current, setCurrent] = useState(0);
  const total = founders.length;

  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const founder = founders[current];

  return (
    <section id="o-nas" className="border-t border-gold/30 px-6 py-24">
      <div className="mx-auto max-w-5xl">

        {/* Nadpis */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">
            Kto sme
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Náš tím
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Sme dvaja zakladatelia s odlišným, no navzájom sa dopĺňajúcim
            zameraním. Navonok vystupujeme ako jeden kompaktný tím.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative flex items-center justify-center gap-6">

          {/* Šípka vľavo */}
          <button
            onClick={prev}
            aria-label="Predchádzajúci"
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold/60 transition hover:border-gold hover:text-gold"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Karta */}
          <div
            key={current}
            className="w-full max-w-sm animate-fade-in rounded-2xl border border-gold/30 bg-background p-8 text-center shadow-sm"
          >
            {/* Fotka / placeholder */}
            {founder.photo ? (
              <img
                src={founder.photo}
                alt={founder.name}
                className="mx-auto mb-6 h-32 w-32 rounded-full object-cover"
              />
            ) : (
              <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full border border-gold bg-gold/10 font-display text-3xl font-semibold text-gold">
                {founder.initials}
              </div>
            )}

            <h3 className="font-display text-2xl font-semibold">{founder.name}</h3>
            <p className="mt-1 text-sm tracking-wide text-gold">{founder.role}</p>
            <p className="mt-4 text-sm font-medium text-foreground">{founder.focus}</p>
            <p className="mt-3 leading-relaxed text-muted">{founder.description}</p>
          </div>

          {/* Šípka vpravo */}
          <button
            onClick={next}
            aria-label="Ďalší"
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold/60 transition hover:border-gold hover:text-gold"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Bodky */}
        <div className="mt-6 flex justify-center gap-2">
          {founders.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Prejsť na ${founders[i].name}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-gold" : "w-1.5 bg-gold/30"
              }`}
            />
          ))}
        </div>

        {/* Hodnoty */}
        <div className="mt-20 grid gap-6 sm:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-2xl border border-gold/30 bg-cream-dark p-6"
            >
              <h4 className="font-display text-lg font-semibold">{value.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted">{value.text}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
