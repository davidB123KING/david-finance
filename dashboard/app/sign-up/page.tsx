//import { SignUp } from "@clerk/nextjs";

export default function Page() {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return <div>Clerk ni nastavljen</div>;
  }
  return <SignUp />;
}
