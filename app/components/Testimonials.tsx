import type { HomepageSectionData, TestimonialData } from "../../sanity/types";
import Reveal from "./Reveal";

type Props = {
  section: HomepageSectionData;
  testimonials: TestimonialData[];
};

export default function Testimonials({ section, testimonials }: Props) {
  return (
    <section className="border-t border-gold/30 bg-background px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold-dark">
            {section.label}
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {section.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">{section.subtitle}</p>
        </div>

        {testimonials.length > 0 && (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item, i) => (
              <Reveal key={item._id} delay={i * 80} direction="up">
                <blockquote className="flex h-full flex-col rounded-2xl border border-gold/25 bg-cream-dark/50 p-6">
                  <p className="flex-1 text-sm leading-relaxed text-foreground/90">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <footer className="mt-5 border-t border-gold/15 pt-4">
                    <p className="font-display text-sm font-semibold">{item.authorName}</p>
                    {item.authorRole && (
                      <p className="mt-1 text-xs text-muted">{item.authorRole}</p>
                    )}
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
