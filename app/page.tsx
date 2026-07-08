import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center sm:py-32">
      <Image
        src="/logo.png"
        alt="Logo agentúry"
        width={160}
        height={160}
        priority
        className="mb-10"
      />

      <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-gold-dark">
        Eventová agentúra
      </p>

      <h1 className="font-serif max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
        Od konceptu po posledného hosťa
      </h1>

      <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
        Športové podujatia, firemné teambuildingy a súkromné oslavy — vrátane
        pet-friendly eventov.
      </p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
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
  );
}
