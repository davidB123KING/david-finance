import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0f1115]">
      <div className="max-w-xl w-full px-6 text-center space-y-8">
        
        {/* Logo / Title */}
        <div className="space-y-2">
          <h1 className="text-4xl font-semibold tracking-tight">
            FinanceApp
          </h1>
          <p className="text-[#9aa1ad]">
            Pregleden nadzor nad osebnimi financami.
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#262b36]" />

        {/* Description */}
        <p className="text-sm text-[#9aa1ad] leading-relaxed">
          FinanceApp je osebni finančni dashboard, ki ti omogoča
          spremljanje prihodkov, stroškov in mesečnih budgetov
          na enostaven in pregleden način.
        </p>

        {/* CTA */}
        <div className="pt-4">
          <SignedOut>
            <SignInButton>
              <button className="w-full bg-blue-600 hover:bg-blue-500 transition-colors text-white py-2.5 rounded-lg">
                Prijava / Registracija
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Link
              href="/dashboard"
              className="block w-full bg-green-600 hover:bg-green-500 transition-colors text-white py-2.5 rounded-lg"
            >
              Nadaljuj na Dashboard
            </Link>
          </SignedIn>
        </div>

        {/* Footer note */}
        
      </div>
    </main>
  );
}
