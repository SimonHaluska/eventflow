# Haka — eventová agentúra

Next.js 16.2.10 projekt (App Router, TypeScript, Tailwind CSS v4).

## Spustenie

```bash
npm install
npm run dev
```

Web beží na http://localhost:3000

## Štruktúra

```
app/
├── page.tsx              # Úvod
├── sluzby/page.tsx       # Služby + balíky + FAQ
├── o-nas/page.tsx        # O nás
├── kontakt/page.tsx      # Kontakt
├── portfolio/page.tsx    # Portfólio
├── ochrana-udajov/       # GDPR
├── components/           # Zdieľané komponenty
├── actions/contact.ts    # Server action — kontaktný formulár
├── globals.css           # Farby, fonty, animácie
└── layout.tsx            # Root layout (header, footer, cookie banner)
```

## Príkazy

| Príkaz | Účel |
|--------|------|
| `npm run dev` | Vývojový server s hot reload |
| `npm run build` | Produkčný build |
| `npm run lint` | ESLint kontrola |
