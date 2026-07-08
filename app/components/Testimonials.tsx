import type { Dictionary } from "../[lang]/dictionaries";

type Props = { dict: Dictionary["testimonials"] };

export default function Testimonials({ dict }: Props) {
  return (
    <section className="border-t border-gold/30 bg-background px-6 py-28">
      <div className="mx-auto max-w-5xl text-center">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold-dark">
          {dict.label}
        </p>
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {dict.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">{dict.subtitle}</p>
      </div>
    </section>
  );
}
