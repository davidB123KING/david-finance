"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Kategorije", href: "/dashboard/categories" },
  { label: "Grafi", href: "/dashboard/graphs" },
  { label: "Budgeti", href: "/dashboard/budgets" },
];

export default function DashboardHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-[#0f1115]/90 backdrop-blur border-b border-[#262b36]">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-8">
          <span className="font-semibold tracking-tight text-lg">
            BohakFinancePro
          </span>

          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-md text-sm transition-colors
                    ${
                      active
                        ? "bg-[#262b36] text-white"
                        : "text-[#9aa1ad] hover:text-white hover:bg-[#1b1f2a]"
                    }
                  `}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: User */}
        <div className="flex items-center">
          <UserButton
            appearance={{
              elements: {
                avatarBox:
                  "w-8 h-8 ring-1 ring-[#262b36]",
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}
