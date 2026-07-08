"use client";

import { useCallback, useEffect, useState } from "react";
import type { Dictionary } from "../[lang]/dictionaries";

type Props = { dict: Dictionary["portfolio"] };

type Item = Dictionary["portfolio"]["items"][number];

function CarouselItem({
  item,
  position,
  photoSoon,
}: {
  item: Item;
  position: "left" | "center" | "right";
  photoSoon: string;
}) {
  const isCenter = position === "center";
  return (
    <div
      className={`flex-shrink-0 overflow-hidden rounded-2xl border transition-all duration-500 ${
        isCenter
          ? "w-72 border-gold/40 opacity-100 shadow-lg sm:w-96"
          : "w-48 border-gold/15 opacity-35 sm:w-64"
      }`}
      style={{ transform: isCenter ? "scale(1)" : "scale(0.9)" }}
    >
      <div
        className={`flex items-center justify-center bg-cream-dark transition-all duration-500 ${
          isCenter ? "h-56 sm:h-72" : "h-40 sm:h-52"
        }`}
      >
        <span className="text-sm text-muted/40">{photoSoon}</span>
      </div>
      <div className={`p-4 ${isCenter ? "sm:p-6" : ""}`}>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
          {item.category}
        </p>
        <h3 className={`mt-1 font-display font-semibold ${isCenter ? "text-lg" : "text-sm"}`}>
          {item.label}
        </h3>
      </div>
    </div>
  );
}

export default function PortfolioCarousel({ dict }: Props) {
  const [current, setCurrent] = useState(0);
  const total = dict.items.length;

  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  const leftIdx = (current - 1 + total) % total;
  const rightIdx = (current + 1) % total;

  return (
    <div>
      <div className="flex items-center justify-center gap-3 sm:gap-6">
        <button
          onClick={prev}
          aria-label={dict.prevLabel}
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold/50 transition hover:border-gold hover:text-gold"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex items-center justify-center gap-4 overflow-hidden">
          <button onClick={prev} className="focus:outline-none">
            <CarouselItem item={dict.items[leftIdx]} position="left" photoSoon={dict.photoSoon} />
          </button>
          <CarouselItem item={dict.items[current]} position="center" photoSoon={dict.photoSoon} />
          <button onClick={next} className="focus:outline-none">
            <CarouselItem item={dict.items[rightIdx]} position="right" photoSoon={dict.photoSoon} />
          </button>
        </div>

        <button
          onClick={next}
          aria-label={dict.nextLabel}
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold/50 transition hover:border-gold hover:text-gold"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {dict.items.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`${dict.itemLabel} ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-6 bg-gold" : "w-1.5 bg-gold/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
