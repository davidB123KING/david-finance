import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dobrodošel v FinanceApp!</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Kaj lahko narediš:</h2>
        <ul className="list-disc list-inside">
          <li>Dostop do svojih računov in prihrankov</li>
          <li>Spremljanje transakcij in zgodovine</li>
          <li>Upravljanje mesečnega budgeta</li>
          <li>Vizualizacije finančnih podatkov</li>
        </ul>
      </section>

      <SignedOut>
        <SignInButton>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Prijava / Registracija</button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <Link href="/dashboard" className="bg-green-600 text-white px-4 py-2 rounded">
          Pojdi na svoj Dashboard
        </Link>
      </SignedIn>
    </main>
  );
}
