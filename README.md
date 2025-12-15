💰 FinanceApp

FinanceApp je spletna aplikacija za upravljanje osebnih financ, ki omogoča pregledno spremljanje prihodkov, stroškov, kategorij, mesečnih budgetov in grafičnih analiz.
Aplikacija je zasnovana kot dashboard s temno temo, ki poudarja preglednost in uporabniško izkušnjo.

🎯 Namen projekta

Namen projekta je uporabniku omogočiti:

boljši nadzor nad osebnimi financami,

razumevanje porabe po kategorijah,

načrtovanje mesečnih budgetov,

vizualen pregled finančnih podatkov.

Projekt je bil razvit kot šolski projekt, vendar z uporabo sodobnih tehnologij in arhitekturnih pristopov, ki se uporabljajo tudi v realnih produkcijskih aplikacijah.

✨ Glavne funkcionalnosti

🔐 Avtentikacija uporabnikov (Clerk)

💸 Dodajanje prihodkov in stroškov

🗂️ Upravljanje kategorij (dodajanje, urejanje, brisanje)

📊 Grafični prikaz prihodkov in stroškov

📅 Mesečni budgeti s progress barom

⚠️ Vizualni prikaz preseženega budgeta

🌙 Temna tema za boljšo uporabniško izkušnjo

🧱 Tehnologije

Next.js (App Router)

React

TypeScript

Tailwind CSS

Clerk – avtentikacija uporabnikov

Neon (PostgreSQL) – podatkovna baza

Server Actions – delo s podatki na strežniku

Vercel – deployment

🧠 Arhitektura

Aplikacija uporablja server komponente za nalaganje podatkov

Client komponente se uporabljajo za interakcijo (forme, izbor meseca, grafi)

Podatki so vedno vezani na prijavljenega uporabnika (user_id)

Funkcionalnosti so modularno ločene (dashboard, kategorije, budgeti, grafi)

🚀 Zagon projekta (lokalno)

Namesti odvisnosti:

npm install


Nastavi okoljske spremenljivke (.env):

DATABASE_URL=your_database_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key


Zaženi aplikacijo:

npm run dev


👤 Avtor

Projekt je razvil David Bohak .
