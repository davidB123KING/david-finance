import { auth } from "@clerk/nextjs/server";
import { sql } from "@/lib/db";
import { addTransaction } from "./actions";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) return <div>Nisi prijavljen</div>;

  // stats
  const stats = await sql`
    SELECT
      COUNT(*) as count,
      COALESCE(SUM(CASE WHEN type = 'income' THEN amount END), 0) as income,
      COALESCE(SUM(CASE WHEN type = 'expense' THEN amount END), 0) as expense
    FROM transactions
    WHERE user_id = ${userId};
  `;

  const balance =
    Number(stats[0].income) - Number(stats[0].expense);

  // last transactions
  const transactions = await sql`
    SELECT id, type, amount, category, description, created_at
    FROM transactions
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
    LIMIT 5;
  `;

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Stat label="Skupaj" value={`${balance.toFixed(2)} €`} />
        <Stat label="Prihodki" value={`${stats[0].income} €`} positive />
        <Stat label="Stroški" value={`${stats[0].expense} €`} negative />
        <Stat label="Transakcije" value={stats[0].count} />
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Prihodek */}
  <form
    action={addTransaction}
    className="p-4 bg-white rounded shadow space-y-3"
  >
    <h3 className="font-semibold text-green-600">
      Dodaj prihodek
    </h3>

    <input type="hidden" name="type" value="income" />

    <input
      name="amount"
      type="number"
      step="0.01"
      placeholder="Znesek (€)"
      required
      className="w-full border rounded px-3 py-2"
    />

    <input
      name="category"
      placeholder="Kategorija (npr. Plača)"
      className="w-full border rounded px-3 py-2"
    />

    <input
      name="description"
      placeholder="Opis"
      className="w-full border rounded px-3 py-2"
    />

    <button className="w-full bg-green-600 text-white py-2 rounded">
      Shrani prihodek
    </button>
  </form>

  {/* Strošek */}
  <form
    action={addTransaction}
    className="p-4 bg-white rounded shadow space-y-3"
  >
    <h3 className="font-semibold text-red-600">
      Dodaj strošek
    </h3>

    <input type="hidden" name="type" value="expense" />

    <input
      name="amount"
      type="number"
      step="0.01"
      placeholder="Znesek (€)"
      required
      className="w-full border rounded px-3 py-2"
    />

    <input
      name="category"
      placeholder="Kategorija (npr. Hrana)"
      className="w-full border rounded px-3 py-2"
    />

    <input
      name="description"
      placeholder="Opis"
      className="w-full border rounded px-3 py-2"
    />

    <button className="w-full bg-red-600 text-white py-2 rounded">
      Shrani strošek
    </button>
  </form>
</div>


      {/* Transactions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Zadnje transakcije
        </h2>

        {transactions.length === 0 ? (
          <p className="text-gray-500">
            Ni še transakcij.
          </p>
        ) : (
          <ul className="space-y-2">
            {transactions.map((t) => (
              <li
                key={t.id}
                className="flex justify-between p-3 bg-white rounded shadow"
              >
                <div>
                  <p className="font-medium">
                    {t.description || "Brez opisa"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {t.category || "Brez kategorije"}
                  </p>
                </div>

                <span
                  className={
                    t.type === "income"
                      ? "text-green-600 font-semibold"
                      : "text-red-600 font-semibold"
                  }
                >
                  {t.type === "income" ? "+" : "-"}
                  {t.amount} €
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  positive,
  negative,
}: {
  label: string;
  value: string | number;
  positive?: boolean;
  negative?: boolean;
}) {
  return (
    <div className="p-4 bg-white rounded shadow">
      <p className="text-sm text-gray-500">{label}</p>
      <p
        className={`text-2xl font-bold ${
          positive
            ? "text-green-600"
            : negative
            ? "text-red-600"
            : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}
