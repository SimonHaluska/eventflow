"use client";

import { useActionState } from "react";
import { submitContact } from "../actions/contact";

const segments = [
  "Súkromné oslavy",
  "Zvieracie oslavy",
  "Teambuildingy",
  "Športové podujatia",
  "Neviem / chcem poradiť",
];

const packages = ["Basic", "Standard", "Premium", "Neviem"];

const inputClass =
  "w-full rounded-xl border border-gold/40 bg-background px-4 py-3 text-sm outline-none transition focus:border-gold";

export default function Contact() {
  const [state, formAction, pending] = useActionState(
    async (_prev: { ok: boolean; message: string } | null, formData: FormData) =>
      submitContact(formData),
    null
  );

  return (
    <section id="kontakt" className="border-t border-gold/30 px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">
            Kontakt
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Napíšte nám
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted">
            Vyplňte formulár a ozveme sa vám do 2 pracovných dní. Nezáväzná
            konzultácia je vždy zadarmo.
          </p>
        </div>

        {state?.ok ? (
          <div className="rounded-2xl border border-gold bg-gold/[0.05] p-8 text-center">
            <p className="font-display text-xl font-semibold">Dopyt odoslaný</p>
            <p className="mt-3 leading-relaxed text-muted">{state.message}</p>
          </div>
        ) : (
          <form action={formAction} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                  Meno *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className={inputClass}
                  placeholder="Vaše meno"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium">
                  E-mail *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={inputClass}
                  placeholder="vas@email.sk"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                Telefón
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className={inputClass}
                placeholder="+421 ..."
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="segment"
                  className="mb-2 block text-sm font-medium"
                >
                  Typ eventu
                </label>
                <select id="segment" name="segment" className={inputClass}>
                  {segments.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="package"
                  className="mb-2 block text-sm font-medium"
                >
                  Balík
                </label>
                <select id="package" name="package" className={inputClass}>
                  {packages.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium">
                Správa *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className={`${inputClass} resize-none`}
                placeholder="Popíšte váš event — dátum, počet hostí, predstavy..."
              />
            </div>

            {state && !state.ok && (
              <p className="text-sm text-red-700">{state.message}</p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-full border border-gold bg-transparent py-3 text-sm font-medium tracking-wide transition hover:border-gold hover:bg-gold/15 disabled:opacity-50"
            >
              {pending ? "Odosielam..." : "Odoslať dopyt"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
