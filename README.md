# David Finance — testing branch

To je testing branch za Next.js aplikacijo osebnih financ. Tukaj so zbrani testi in hitri ukazi, da se hitro orientiras.

## Hiter zagon
```bash
npm install
npm run dev
```

## Testi (Jest)
- `npm test` / `npm run test:unit`: osnovni unit testi
- `npm run test:watch`: watch mode
- `npm run test:coverage`: pokritost

Kaj pokrivajo:
- `HomePage`: preveri, da se na zacetni strani izpise naslov aplikacije.
- `SignInPage` in `SignUpPage`: preveri, da se rendera Clerk komponenta ali fallback, ce Clerk ni nastavljen.
- `DashboardPage`: preveri, da se pokaze obvestilo za neprijavljene in da se osnovni dashboard elementi izrisejo.
- `Graphs`: preveri render grafov in fallback, ko ni podatkov.

## E2E (Playwright)
- `npm run test:e2e`: E2E testi v Playwrightu

Kaj pokrivajo:
- `Auth`: odpiranje strani za prijavo in registracijo (z ali brez Clerk nastavitev).
- `Dashboard`: prikaz sporocila, ce uporabnik ni prijavljen.
- `Graphs`: dostop do grafov brez prijave ne prikaze vsebine.
