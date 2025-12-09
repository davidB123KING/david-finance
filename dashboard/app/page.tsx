import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="p-10">
      <SignedIn>
        <h1>Dobrodošel! 🎉</h1>
        <UserButton />
      </SignedIn>

      <SignedOut>
        <p>Nisi prijavljen.</p>
        <a href="/sign-in" className="text-blue-500">
          Prijava
        </a>
      </SignedOut>
    </main>
  );
}
