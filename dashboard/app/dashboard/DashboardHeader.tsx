import Link from "next/link";

export default function DashboardHeader() {
  return (
    <header className="flex items-center justify-between bg-white p-4 rounded shadow">
      {/* Left */}
      <h1 className="text-2xl font-bold">
        Osebne finance
      </h1>

      {/* Right actions */}
      <div className="flex gap-2">
        <Link
          href="/dashboard?modal=category"
          className="px-4 py-2 rounded bg-black text-white"
        >
          ➕ Kategorija
        </Link>

        <Link
          href="/dashboard/graphs"
          className="px-4 py-2 rounded bg-blue-600 text-white"
        >
          📊 Grafi
        </Link>

        <button className="px-4 py-2 rounded bg-gray-200">
          ⚙️ Več
        </button>
      </div>
    </header>
  );
}
