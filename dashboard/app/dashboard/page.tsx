import { auth } from "@clerk/nextjs/server";
import { sql } from "@/lib/db";
import DashboardHeader from "./DashboardHeader";


import {
  addTransaction,
  getCategories,
  createCategory,
} from "./actions";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) return <div>Nisi prijavljen</div>;

  const categories = await getCategories();

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
    SELECT
      t.id,
      t.type,
      t.amount,
      t.description,
      t.created_at,
      c.name as category_name,
      c.icon as category_icon
    FROM transactions t
    LEFT JOIN categories c ON t.category_id = c.id
    WHERE t.user_id = ${userId}
    ORDER BY t.created_at DESC
    LIMIT 5;
  `;

  return (
    <div className="p-8 space-y-8">

      

      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Stat label="Skupaj" value={balance.toFixed(2) + " €"} />
<Stat label="Prihodki" value={stats[0].income + " €"} positive />
<Stat label="Stroški" value={stats[0].expense + " €"} negative />
<Stat label="Transakcije" value={stats[0].count} />
      </div>

      

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {["income", "expense"].map((type) => (
          <form
            key={type}
            action={addTransaction}
            className="p-4 bg-white rounded shadow space-y-3"
          >
            <h3
              className={`font-semibold ${
                type === "income"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              Dodaj {type === "income" ? "prihodek" : "strošek"}
            </h3>

            <input type="hidden" name="type" value={type} />

            <input
              name="amount"
              type="number"
              step="0.01"
              placeholder="Znesek (€)"
              required
              className="w-full border rounded px-3 py-2"
            />

            <select
              name="categoryId"
              required
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Izberi kategorijo</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>

            <input
              name="description"
              placeholder="Opis"
              className="w-full border rounded px-3 py-2"
            />

            <button
              className={`w-full text-white py-2 rounded ${
                type === "income"
                  ? "bg-green-600"
                  : "bg-red-600"
              }`}
            >
              Shrani
            </button>
          </form>
        ))}
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
                    {t.category_icon} {t.category_name}
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

/* =========================
   STAT
========================= */

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
    <div className="bg-[#161a22] border border-[#262b36] rounded-xl p-4">
      <p className="text-sm text-[#9aa1ad]">{label}</p>
      <p
        className={`text-2xl font-semibold ${
          positive
            ? "text-green-400"
            : negative
            ? "text-red-400"
            : "text-[#e6e8eb]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}


