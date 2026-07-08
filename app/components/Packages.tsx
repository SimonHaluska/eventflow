"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitContact } from "../actions/contact";
import type { Dictionary } from "../[lang]/dictionaries";
import Reveal from "./Reveal";

type Props = { dict: Dictionary["packages"] };

type Segment = Dictionary["packages"]["segments"][number];
type PackageTier = Segment["packages"][number];

const inputClass =
  "w-full rounded-xl border border-gold/40 bg-background px-4 py-3 text-sm outline-none transition focus:border-gold";

export default function Packages({ dict }: Props) {
  const [activeSegment, setActiveSegment] = useState(dict.segments[0].id);
  const [selectedPkg, setSelectedPkg] = useState<{ segment: string; pkg: string } | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [state, formAction] = useActionState(
    async (_prev: { ok: boolean; message: string } | null, formData: FormData) =>
      submitContact(formData),
    null
  );

  const current = dict.segments.find((s) => s.id === activeSegment)!;

  const handleSelect = (segmentLabel: string, pkgName: string) => {
    setSelectedPkg({ segment: segmentLabel, pkg: pkgName });
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  useEffect(() => {
    if (state?.ok) setSelectedPkg(null);
  }, [state]);

  return (
    <section id="baliky" className="border-t border-gold/30 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-12 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">
            {dict.label}
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {dict.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">{dict.subtitle}</p>
        </Reveal>

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {dict.segments.map((segment) => (
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
          {current.packages.map((pkg: PackageTier, i: number) => (
            <Reveal key={pkg.name} delay={i * 100} direction="up">
              <article
                className={`flex flex-col rounded-2xl border p-8 ${
                  pkg.highlighted
                    ? "border-gold bg-gold/[0.06] shadow-sm"
                    : "border-gold/30 bg-background"
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
                  {pkg.features.map((feature: string) => (
                    <li key={feature} className="flex gap-2 text-sm leading-relaxed text-muted">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => handleSelect(current.label, pkg.name)}
                  className="mt-8 w-full rounded-full border border-gold py-2.5 text-sm font-medium tracking-wide transition hover:bg-gold/15"
                >
                  {dict.interested}
                </button>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted">{dict.note}</p>

        <div
          ref={formRef}
          className={`overflow-hidden transition-all duration-500 ${
            selectedPkg ? "mt-16 max-h-[900px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="rounded-2xl border border-gold/40 p-8">
            <div className="mb-6">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
                {dict.inquiryLabel}
              </p>
              <h3 className="mt-1 font-display text-2xl font-semibold">
                {selectedPkg?.segment} — {dict.inquiryPackage} {selectedPkg?.pkg}
              </h3>
              <p className="mt-2 text-sm text-muted">{dict.inquirySubtitle}</p>
            </div>

            {state?.ok ? (
              <div className="rounded-xl border border-gold bg-gold/[0.05] p-6 text-center">
                <p className="font-display text-lg font-semibold">{dict.sent}</p>
                <p className="mt-2 text-sm text-muted">{state.message}</p>
              </div>
            ) : (
              <form action={formAction} className="space-y-4">
                <input type="hidden" name="segment" value={selectedPkg?.segment ?? ""} />
                <input type="hidden" name="package" value={selectedPkg?.pkg ?? ""} />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="pkg-name" className="mb-2 block text-sm font-medium">
                      {dict.form.name}
                    </label>
                    <input id="pkg-name" name="name" required className={inputClass} placeholder="Ján Novák" />
                  </div>
                  <div>
                    <label htmlFor="pkg-email" className="mb-2 block text-sm font-medium">
                      {dict.form.email}
                    </label>
                    <input id="pkg-email" name="email" type="email" required className={inputClass} placeholder="jan@email.sk" />
                  </div>
                </div>

                <div>
                  <label htmlFor="pkg-phone" className="mb-2 block text-sm font-medium">
                    {dict.form.phone}
                  </label>
                  <input id="pkg-phone" name="phone" type="tel" className={inputClass} placeholder="+421 900 000 000" />
                </div>

                <div>
                  <label htmlFor="pkg-message" className="mb-2 block text-sm font-medium">
                    {dict.form.message}
                  </label>
                  <textarea
                    id="pkg-message"
                    name="message"
                    required
                    rows={4}
                    className={`${inputClass} resize-none`}
                    placeholder={dict.form.messagePlaceholder}
                  />
                </div>

                {state?.ok === false && (
                  <p className="text-sm text-red-500">{state.message}</p>
                )}

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 rounded-full border border-gold bg-gold/10 py-3 text-sm font-medium tracking-wide transition hover:bg-gold/20"
                  >
                    {dict.form.submit}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPkg(null)}
                    className="rounded-full border border-gold/30 px-5 py-3 text-sm text-muted transition hover:border-gold hover:text-foreground"
                  >
                    {dict.form.cancel}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
