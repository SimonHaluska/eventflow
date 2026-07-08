import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ochrana osobných údajov | Momentum Events",
  description: "Zásady ochrany osobných údajov agentúry Momentum Events.",
};

export default function OchranaUdajovPage() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gold-dark">
          Právne informácie
        </p>
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Ochrana osobných údajov
        </h1>
        <p className="mt-3 text-sm text-muted">Platné od: 2026</p>

        <div className="prose prose-sm mt-10 max-w-none text-foreground [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:text-muted [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:text-muted [&_ul]:leading-relaxed [&_ul]:mb-4 [&_li]:mb-1">

          <h2>1. Prevádzkovateľ</h2>
          <p>
            Prevádzkovateľom osobných údajov je spoločnosť Momentum Events, s.r.o. (ďalej
            len „Momentum Events" alebo „my"). Kontakt: info@momentumevents.sk
          </p>

          <h2>2. Aké údaje zbierame</h2>
          <p>
            Prostredníctvom kontaktného formulára na tejto stránke zbierame:
          </p>
          <ul>
            <li>Meno a priezvisko</li>
            <li>E-mailová adresa</li>
            <li>Telefónne číslo (voliteľné)</li>
            <li>Typ požadovaného eventu a správa</li>
          </ul>

          <h2>3. Účel spracovania</h2>
          <p>
            Vaše údaje spracúvame výhradne za účelom odpovede na váš dopyt a
            prípadnej prípravy ponuky. Bez vášho súhlasu vám nebudeme zasielať
            marketingové materiály.
          </p>

          <h2>4. Cookies</h2>
          <p>
            Táto stránka používa technické cookies nevyhnutné pre fungovanie
            webu. Analytické cookies (napr. Google Analytics) používame len s
            vaším súhlasom, ktorý môžete udeliť alebo odmietnuť v banneri pri
            prvej návšteve.
          </p>

          <h2>5. Zdieľanie údajov</h2>
          <p>
            Vaše osobné údaje nepredávame ani neposkytujeme tretím stranám na
            marketingové účely. Môžeme ich zdieľať s dodávateľmi, ktorých
            priamo oslovíme v súvislosti s vaším dopytom — vždy len v nevyhnutnom
            rozsahu.
          </p>

          <h2>6. Doba uchovávania</h2>
          <p>
            Osobné údaje uchovávame po dobu nevyhnutnú na vybavenie dopytu,
            prípadne po dobu plnenia zmluvy a zákonných povinností (max. 5
            rokov).
          </p>

          <h2>7. Vaše práva</h2>
          <p>Máte právo na:</p>
          <ul>
            <li>Prístup k vašim osobným údajom</li>
            <li>Opravu nesprávnych údajov</li>
            <li>Vymazanie údajov (právo na zabudnutie)</li>
            <li>Obmedzenie spracovania</li>
            <li>Prenositeľnosť údajov</li>
            <li>Podanie sťažnosti na Úrad na ochranu osobných údajov SR</li>
          </ul>
          <p>
            Pre uplatnenie práv nás kontaktujte na info@haka.sk.
          </p>

          <h2>8. Zmeny dokumentu</h2>
          <p>
            Tieto zásady môžeme priebežne aktualizovať. O podstatných zmenách
            vás informujeme prostredníctvom webu.
          </p>
        </div>
      </div>
    </section>
  );
}
