This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Lokale PostgreSQL-Datenbank

PostgreSQL 18 läuft lokal über Homebrew. Die Datenbank `cocoach` gehört dem
Anwendungsbenutzer `cocoach_app`. Das erzeugte Passwort und die Verbindungsadresse
stehen in `.env.local`; diese Datei wird von Git ignoriert. `.env.example` enthält
nur eine Vorlage. Die Datenbank ist zunächst leer; fachliche Tabellen können
anschließend passend zur Anwendung ergänzt werden.

```bash
brew services start postgresql@18
npm run db:check
npm run dev
```

Nach Änderungen an `.env.local` den Next.js-Entwicklungsserver neu starten.
Für einen anderen Rechner PostgreSQL bereitstellen, eine eigene Datenbank und
einen Benutzer anlegen und `.env.example` als `.env.local` mit eigenen Zugangsdaten
konfigurieren. Die lokale Datenbank wird nicht mit dem Repository veröffentlicht.

Server Components, Server Actions und Route Handlers mit Node.js-Runtime können
über den Pool in `lib/db.ts` zugreifen:

```ts
import { getDb } from "@/lib/db";

const result = await getDb().query("SELECT $1::text AS message", ["Hallo CoCoach"]);
```

Werte immer als SQL-Parameter übergeben. Der Datenbankzugriff ist serverseitig;
`DATABASE_URL` darf keinen `NEXT_PUBLIC_`-Präfix erhalten.

Verbindungspooling: https://node-postgres.com/features/pooling
