import Image from "next/image";
import Link from "next/link";
import Partners from "./components/Partners";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <>
      <section className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center sm:py-32">
        <div className="animate-fade-in relative mb-12 flex items-center justify-center">
          <span className="animate-spin-slow absolute inset-0 rounded-full border border-dashed border-gold/50" />
          <span className="animate-spin-reverse absolute inset-[-16px] rounded-full border border-dotted border-gold/25" />
          <span className="animate-pulse-ring absolute inset-[-32px] rounded-full border border-gold/15" />

          <div className="relative z-10 p-4">
            <Image
              src="/logo.png"
              alt="Logo Momentum Events"
              width={160}
              height={160}
              priority
            />
          </div>
        </div>

        <h1 className="animate-fade-up delay-300 font-display max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
          Od konceptu po posledného hosťa
        </h1>

        <p className="animate-fade-up delay-500 mt-6 max-w-xl text-lg leading-relaxed text-muted">
          Športové podujatia, firemné teambuildingy a súkromné oslavy — vrátane
          pet-friendly eventov.
        </p>

        <div className="animate-fade-up delay-700 mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/sluzby"
            className="rounded-full border border-gold px-8 py-3 text-sm font-medium tracking-wide transition hover:border-gold-dark hover:bg-gold/20"
          >
            Naše služby
          </Link>
          <Link
            href="/kontakt"
            className="rounded-full border border-gold/40 px-8 py-3 text-sm font-medium tracking-wide text-muted transition hover:border-gold hover:text-foreground"
          >
            Kontaktujte nás
          </Link>
        </div>
      </section>

      <Partners />
      <Testimonials />
    </>
  );
}
