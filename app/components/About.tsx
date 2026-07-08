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

function FounderCard({ founder, position }: {
  founder: typeof founders[0];
  position: "left" | "center" | "right";
}) {
  const isCenter = position === "center";
  return (
    <div
      className={`flex-shrink-0 rounded-2xl border bg-background p-6 text-center transition-all duration-500 ${
        isCenter
          ? "w-72 border-gold/50 opacity-100 shadow-lg sm:w-80"
          : "w-52 border-gold/15 opacity-35 sm:w-60"
      }`}
      style={{ transform: isCenter ? "scale(1)" : "scale(0.92)" }}
    >
      {founder.photo ? (
        <img
          src={founder.photo}
          alt={founder.name}
          className={`mx-auto mb-5 rounded-full object-cover ${isCenter ? "h-28 w-28" : "h-20 w-20"}`}
        />
      ) : (
        <div
          className={`mx-auto mb-5 flex items-center justify-center rounded-full border border-gold bg-gold/10 font-display font-semibold text-gold ${
            isCenter ? "h-28 w-28 text-3xl" : "h-20 w-20 text-xl"
          }`}
        >
          {founder.initials}
        </div>
      )}

      <h3 className={`font-display font-semibold ${isCenter ? "text-xl" : "text-base"}`}>
        {founder.name}
      </h3>
      <p className="mt-1 text-xs tracking-wide text-gold">{founder.role}</p>
      <p className={`mt-3 font-medium ${isCenter ? "text-sm text-foreground" : "text-xs text-muted"}`}>
        {founder.focus}
      </p>
      <p className={`mt-2 leading-relaxed text-muted ${isCenter ? "text-sm" : "text-xs"}`}>
        {founder.description}
      </p>
    </div>
  );
}

export default function About() {
  const [current, setCurrent] = useState(0);
  const total = founders.length;

  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const leftIdx = (current - 1 + total) % total;
  const rightIdx = (current + 1) % total;

  return (
    <section id="o-nas" className="border-t border-gold/30 px-6 py-24">
      <div className="mx-auto max-w-5xl">

        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">
            Kto sme
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Náš tím
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Sme tím s odlišným, no navzájom sa dopĺňajúcim zameraním.
            Navonok vystupujeme ako jeden kompaktný tím.
          </p>
        </div>

        {/* Carousel */}
        <div className="flex items-center justify-center gap-3 sm:gap-5">
          <button
            onClick={prev}
            aria-label="Predchádzajúci"
            className="z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold/50 transition hover:border-gold hover:text-gold"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex items-center justify-center gap-4 overflow-hidden">
            <button onClick={prev} className="focus:outline-none">
              <FounderCard founder={founders[leftIdx]} position="left" />
            </button>
            <FounderCard founder={founders[current]} position="center" />
            <button onClick={next} className="focus:outline-none">
              <FounderCard founder={founders[rightIdx]} position="right" />
            </button>
          </div>

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
