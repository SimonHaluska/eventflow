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
    photo: null as string | null,
  },
  {
    name: "Andrea Fačkovcová",
    role: "Spoluzakladateľka & konateľka",
    focus: "Súkromné a zvieracie oslavy",
    description:
      "Vedie projekty s osobným príbehom — narodeniny, rodinné oslavy a pet-friendly eventy, kde záleží na každom detaile a atmosfére.",
    initials: "AF",
    photo: null as string | null,
  },
  {
    name: "Veronika Tóthová",
    role: "Spoluzakladateľka & konateľka",
    focus: "Súkromné a zvieracie oslavy",
    description:
      "Vedie projekty s osobným príbehom — narodeniny, rodinné oslavy a pet-friendly eventy, kde záleží na každom detaile a atmosfére.",
    initials: "VT",
    photo: null as string | null,
  },
  {
    name: "Lucia Pazderová",
    role: "Spoluzakladateľka & konateľka",
    focus: "Súkromné a zvieracie oslavy",
    description:
      "Vedie projekty s osobným príbehom — narodeniny, rodinné oslavy a pet-friendly eventy, kde záleží na každom detaile a atmosfére.",
    initials: "LP",
    photo: null as string | null,
  },
  {
    name: "Petra Filipovičová",
    role: "Spoluzakladateľka & konateľka",
    focus: "Súkromné a zvieracie oslavy",
    description:
      "Vedie projekty s osobným príbehom — narodeniny, rodinné oslavy a pet-friendly eventy, kde záleží na každom detaile a atmosfére.",
    initials: "PF",
    photo: null as string | null,
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
        <div className="relative flex items-center justify-center gap-4 sm:gap-8">

          {/* Šípka vľavo */}
          <button
            onClick={prev}
            aria-label="Predchádzajúci"
            className="z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold/50 transition hover:border-gold hover:text-gold"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Karty */}
          <div className="flex w-full items-center justify-center gap-4 overflow-hidden">
            {founders.map((founder, i) => {
              const isActive = i === current;
              return (
                <div
                  key={founder.name}
                  onClick={() => setCurrent(i)}
                  className={`flex-shrink-0 cursor-pointer rounded-2xl border bg-background p-6 text-center transition-all duration-500 sm:p-8 ${
                    isActive
                      ? "w-72 border-gold/50 shadow-lg opacity-100 scale-100 sm:w-80"
                      : "w-52 border-gold/20 opacity-40 scale-95 sm:w-60"
                  }`}
                >
                  {/* Fotka / placeholder */}
                  {founder.photo ? (
                    <img
                      src={founder.photo}
                      alt={founder.name}
                      className={`mx-auto rounded-full object-cover transition-all duration-500 ${
                        isActive ? "mb-5 h-28 w-28" : "mb-4 h-20 w-20"
                      }`}
                    />
                  ) : (
                    <div
                      className={`mx-auto flex items-center justify-center rounded-full border border-gold bg-gold/10 font-display font-semibold text-gold transition-all duration-500 ${
                        isActive ? "mb-5 h-28 w-28 text-3xl" : "mb-4 h-20 w-20 text-xl"
                      }`}
                    >
                      {founder.initials}
                    </div>
                  )}

                  <h3
                    className={`font-display font-semibold transition-all duration-500 ${
                      isActive ? "text-xl" : "text-base"
                    }`}
                  >
                    {founder.name}
                  </h3>
                  <p className="mt-1 text-xs tracking-wide text-gold">{founder.role}</p>

                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      isActive ? "mt-4 max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-sm font-medium text-foreground">{founder.focus}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{founder.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Šípka vpravo */}
          <button
            onClick={next}
            aria-label="Ďalší"
            className="z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold/50 transition hover:border-gold hover:text-gold"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
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
