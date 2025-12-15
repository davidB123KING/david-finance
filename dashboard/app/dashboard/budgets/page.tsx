import { auth } from "@clerk/nextjs/server";
import { sql } from "@/lib/db";
import { upsertBudget } from "./actions";

export default async function BudgetsPage() {
  const { userId } = await auth();
  if (!userId) return null;

  // ✅ NAJPREJ
  const currentMonth = new Date().toISOString().slice(0, 7);

  // potem queryji
  const categories = await sql`
    SELECT id, name
    FROM categories
    WHERE user_id = ${userId}
    ORDER BY name;
  `;

  const budgets = await sql`
    SELECT
      b.id,
      b.amount,
      b.month,
      c.name as category_name,
      c.id as category_id,
      COALESCE(SUM(t.amount), 0) as spent
    FROM budgets b
    JOIN categories c ON b.category_id = c.id
    LEFT JOIN transactions t
      ON t.category_id = c.id
      AND t.user_id = ${userId}
      AND t.type = 'expense'
      AND to_char(t.created_at, 'YYYY-MM') = b.month
    WHERE b.user_id = ${userId}
      AND b.month = ${currentMonth}
    GROUP BY b.id, c.name, c.id
    ORDER BY c.name;
  `;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">
        Budgeti
      </h1>

      {/* Dodaj budget */}
      <form
        action={upsertBudget}
        className="bg-[#161a22] border border-[#262b36] rounded-xl p-4 space-y-4 max-w-md"
      >
        <div>
          <label className="block text-sm mb-1">
            Kategorija
          </label>
          <select
            name="categoryId"
            required
            className="w-full bg-[#0f1115] border border-[#262b36] rounded px-3 py-2"
          >
            <option value="">
              Izberi kategorijo
            </option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">
            Budget (€)
          </label>
          <input
            name="amount"
            type="number"
            step="0.01"
            required
            className="w-full bg-[#0f1115] border border-[#262b36] rounded px-3 py-2"
          />
        </div>

        <input
          type="hidden"
          name="month"
          value={currentMonth}
        />

        <button className="w-full bg-blue-600 hover:bg-blue-500 py-2 rounded">
          Shrani budget
        </button>
      </form>
      {/* Prikaz budgetov */}
<div className="space-y-4">
  {budgets.length === 0 ? (
    <p className="text-[#9aa1ad]">
      Za ta mesec še ni nastavljenih budgetov.
    </p>
  ) : (
    budgets.map((b) => {
      const percent =
        Number(b.spent) / Number(b.amount);

      let barColor = "bg-green-500";
      if (percent >= 1) barColor = "bg-red-500";
      else if (percent >= 0.8)
        barColor = "bg-yellow-500";

      return (
        <div
          key={b.id}
          className="bg-[#161a22] border border-[#262b36] rounded-xl p-4"
        >
          <div className="flex justify-between mb-2">
            <span className="font-medium">
              {b.category_name}
            </span>
            <span className="text-sm text-[#9aa1ad]">
              {Number(b.spent).toFixed(2)} € /{" "}
              {Number(b.amount).toFixed(2)} €
            </span>
          </div>

          <div className="w-full h-2 bg-[#262b36] rounded">
            <div
              className={`h-2 rounded ${barColor}`}
              style={{
                width: `${Math.min(
                  percent * 100,
                  100
                )}%`,
              }}
            />
          </div>
        </div>
      );
    })
  )}
</div>

    </div>
  );
}
