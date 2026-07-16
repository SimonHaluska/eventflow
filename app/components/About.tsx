"use client";

import { useCallback, useEffect, useState } from "react";
import type { Dictionary } from "../[lang]/dictionaries";
import type { TeamMemberData } from "../../sanity/types";
import Reveal from "./Reveal";

type Props = {
  dict: Dictionary["about"];
  founders?: TeamMemberData[];
};

type Founder = {
  name: string;
  role: string;
  focus: string;
  description: string;
  initials: string;
};

function FounderCard({
  founder,
  position,
}: {
  founder: Founder;
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
      <div
        className={`mx-auto mb-5 flex items-center justify-center rounded-full border border-gold bg-gold/10 font-display font-semibold text-gold ${
          isCenter ? "h-28 w-28 text-3xl" : "h-20 w-20 text-xl"
        }`}
      >
        {founder.initials}
      </div>

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

export default function About({ dict, founders }: Props) {
  const team: Founder[] =
    founders && founders.length > 0
      ? founders
      : dict.founders.map((f) => ({
          name: f.name,
          role: f.role,
          focus: f.focus,
          description: f.description,
          initials: f.initials,
        }));

  const [current, setCurrent] = useState(0);
  const total = team.length;

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
            {dict.label}
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {dict.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">{dict.subtitle}</p>
        </div>

        <div className="flex items-center justify-center gap-3 sm:gap-5">
          <button
            onClick={prev}
            aria-label={dict.prevLabel}
            className="z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold/50 transition hover:border-gold hover:text-gold"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex items-center justify-center gap-4 overflow-hidden">
            <button onClick={prev} className="focus:outline-none">
              <FounderCard founder={team[leftIdx]} position="left" />
            </button>
            <FounderCard founder={team[current]} position="center" />
            <button onClick={next} className="focus:outline-none">
              <FounderCard founder={team[rightIdx]} position="right" />
            </button>
          </div>

          <button
            onClick={next}
            aria-label={dict.nextLabel}
            className="z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold/50 transition hover:border-gold hover:text-gold"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {team.map((member, i) => (
            <button
              key={member.name}
              onClick={() => setCurrent(i)}
              aria-label={member.name}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-gold" : "w-1.5 bg-gold/30"
              }`}
            />
          ))}
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-3">
          {dict.values.map((value, i) => (
            <Reveal key={value.title} delay={i * 100} direction="up">
              <div className="rounded-2xl border border-gold/30 bg-cream-dark p-6">
                <h4 className="font-display text-lg font-semibold">{value.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">{value.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
