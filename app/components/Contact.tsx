"use client";

import { useActionState } from "react";
import { submitContact } from "../actions/contact";
import type { Dictionary } from "../[lang]/dictionaries";
import Reveal from "./Reveal";

type Props = { dict: Dictionary["contact"] };

const inputClass =
  "w-full rounded-xl border border-gold/40 bg-background px-4 py-3 text-sm outline-none transition focus:border-gold";

export default function Contact({ dict }: Props) {
  const [state, formAction, pending] = useActionState(
    async (_prev: { ok: boolean; message: string } | null, formData: FormData) =>
      submitContact(formData),
    null
  );

  return (
    <section id="kontakt" className="border-t border-gold/30 px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <Reveal className="mb-12 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">
            {dict.label}
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {dict.title}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted">{dict.subtitle}</p>
        </Reveal>
        <Reveal delay={150}>
          {state?.ok ? (
            <div className="rounded-2xl border border-gold bg-gold/[0.05] p-8 text-center">
              <p className="font-display text-xl font-semibold">{dict.sent}</p>
              <p className="mt-3 leading-relaxed text-muted">{state.message}</p>
            </div>
          ) : (
            <form action={formAction} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium">
                    {dict.form.name}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className={inputClass}
                    placeholder={dict.form.namePlaceholder}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium">
                    {dict.form.email}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className={inputClass}
                    placeholder={dict.form.emailPlaceholder}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                  {dict.form.phone}
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className={inputClass}
                  placeholder={dict.form.phonePlaceholder}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="segment" className="mb-2 block text-sm font-medium">
                    {dict.form.eventType}
                  </label>
                  <select id="segment" name="segment" className={inputClass}>
                    {dict.form.segments.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="package" className="mb-2 block text-sm font-medium">
                    {dict.form.package}
                  </label>
                  <select id="package" name="package" className={inputClass}>
                    {dict.form.packages.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium">
                  {dict.form.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className={`${inputClass} resize-none`}
                  placeholder={dict.form.messagePlaceholder}
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
                {pending ? dict.form.submitting : dict.form.submit}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
