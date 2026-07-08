import type { Dictionary } from "../[lang]/dictionaries";
import Reveal from "./Reveal";

type Props = { dict: Dictionary["services"] };

export default function Services({ dict }: Props) {
  return (
    <section id="sluzby" className="border-t border-gold/30 bg-background px-6 py-24">
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

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {dict.items.map((service, i) => (
            <Reveal key={service.id} delay={i * 100} direction="up">
              <article
                className="card-hover h-full rounded-2xl border border-gold/30 bg-card-bg p-8 hover:border-gold"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
              >
                <h3 className="font-display text-2xl font-semibold">
                  {service.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">
                  {service.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
