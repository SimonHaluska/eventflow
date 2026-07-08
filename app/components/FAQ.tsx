"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Ako prebieha platba a záloha?",
    answer:
      "Po podpise zmluvy vystavíme zálohovú faktúru vo výške 50 % z celkovej ceny. Zvyšok (doplatok) fakturujeme po úspešnej realizácii eventu so splatnosťou 7–14 dní. Pri väčších projektoch nad 5 000 € používame trojfázový model: 40 % pri podpise, 40 % mesiac pred akciou, 20 % po realizácii.",
  },
  {
    question: "Čo je zahrnuté v cene balíka a čo sa účtuje zvlášť?",
    answer:
      "Cena balíka pokrýva agentúrnu odmenu (náš čas, koordináciu a manažment). Zvlášť sa účtujú: náklady na dodávateľov (catering, technika, priestory), cestovné nad rámec sídla (0,40–0,50 €/km), ubytovanie personálu pri akciách nad 100 km, a agentúrna provízia 10–15 % pri balíkoch Standard a Premium.",
  },
  {
    question: "Aké sú storno podmienky?",
    answer:
      "Viac ako 30 dní pred akciou: vraciame celú zálohu (okrem nevratných platieb dodávateľom). 15–30 dní: záloha prepadá na pokrytie doterajšej práce. 8–14 dní: storno poplatok 75 % z celkovej ceny. 7 a menej dní: 100 % z celkovej ceny — v tomto čase máme všetko nakúpené a personál zarezervovaný.",
  },
  {
    question: "Čo ak príde zlé počasie pri outdoor akcii?",
    answer:
      "V zmluve pre outdoor akcie vždy definujeme postup: alternatívny interiérový variant alebo posun termínu za vopred dohodnutý administratívny príplatok. Nikdy nenecháme klienta bez riešenia.",
  },
  {
    question: "Koľko ľudí potrebujem na teambuilding?",
    answer:
      "Balík Standard pre teambuildingy je nastavený na minimálne 15–20 účastníkov. Pre menšie skupiny odporúčame balík Basic, kde realizujete program na niekoľko hodín. Maximálny počet účastníkov nie je obmedzený.",
  },
  {
    question: "Môžete organizovať akcie mimo Bratislavy?",
    answer:
      "Áno, organizujeme akcie po celom Slovensku. Pri výjazdoch mimo sídla účtujeme cestovné 0,40–0,50 €/km. Pri akciách nad 100 km od sídla alebo s neskorým programom hradí klient aj ubytovanie a stravné pre náš tím.",
  },
  {
    question: "Ako rýchlo sa mi ozvete po odoslaní dopytu?",
    answer:
      "Do 24 hodín v pracovných dňoch. Na kľúčové úvodné stretnutia chodíme vždy spoločne — Šimon aj Andrea — aby ste od prvej chvíle videli celé zázemie agentúry.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="border-t border-gold/30 bg-cream-dark/50 px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">
            Časté otázky
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            FAQ
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Odpovede na otázky, ktoré dostávame najčastejšie.
          </p>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gold/30 bg-background"
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-medium">{faq.question}</span>
                <span
                  className={`shrink-0 text-gold transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </span>
              </button>

              {open === i && (
                <p className="border-t border-gold/20 px-6 py-5 text-sm leading-relaxed text-muted">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
