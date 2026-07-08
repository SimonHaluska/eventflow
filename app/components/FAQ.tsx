"use client";

import { useState } from "react";
import type { Dictionary } from "../[lang]/dictionaries";

type Props = { dict: Dictionary["faq"] };

export default function FAQ({ dict }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="border-t border-gold/30 bg-cream-dark/50 px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">
            {dict.label}
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {dict.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">{dict.subtitle}</p>
        </div>

        <div className="space-y-2">
          {dict.items.map((faq, i) => (
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
