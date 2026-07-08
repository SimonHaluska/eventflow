import type { Dictionary } from "../[lang]/dictionaries";
import Reveal from "./Reveal";

type Props = { dict: Dictionary["howItWorks"] };

export default function HowItWorks({ dict }: Props) {
  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-16 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold">
            {dict.label}
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {dict.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">{dict.subtitle}</p>
        </Reveal>

        <div className="grid gap-px bg-gold/10 sm:grid-cols-2 lg:grid-cols-3">
          {dict.steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 80} direction="up">
              <div className="h-full bg-background p-10 transition hover:bg-cream-dark">
                <p className="font-display text-4xl font-bold text-gold">
                  {step.number}
                </p>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
