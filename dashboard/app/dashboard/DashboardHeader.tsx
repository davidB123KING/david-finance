import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function DashboardHeader() {
  return (
    <header className="bg-white border-b">
      <div className="bg-[#161a22] border border-[#262b36] rounded-xl p-4">
        <nav className="flex gap-4">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/dashboard/categories">Kategorije</Link>
          <Link href="/dashboard/graphs">Grafi</Link>
          <Link
  href="/dashboard/budgets"
  className="hover:text-white"
>
  Budgeti
</Link>
        </nav>

        <UserButton />
      </div>
    </header>
  );
}
