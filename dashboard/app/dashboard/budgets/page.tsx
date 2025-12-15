import { auth } from "@clerk/nextjs/server";
import { sql } from "@/lib/db";
import { upsertBudget, deleteBudget } from "./actions";
import BudgetsList from "./BudgetsList";

export default async function BudgetsPage() {
  const { userId } = await auth();
  if (!userId) return null;

  const currentMonth = new Date().toISOString().slice(0, 7);

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
      AND t.created_at >= date_trunc('month', now())
      AND t.created_at < date_trunc('month', now()) + interval '1 month'
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
    className="bg-[#161a22] border border-[#262b36] rounded-xl p-4 space-y-3"
  >
    <div className="flex justify-between mb-2">
      <span className="font-medium">{b.category_name}</span>
      <span className="text-sm text-[#9aa1ad]">
        {Number(b.spent).toFixed(2)} € / {Number(b.amount).toFixed(2)} €
      </span>
    </div>

    <div className="w-full h-2 bg-[#262b36] rounded">
      <div
        className={`h-2 rounded ${barColor}`}
        style={{
          width: `${Math.min(percent * 100, 100)}%`,
        }}
      />
    </div>

    {/* Edit + Delete */}
    <div className="flex gap-2 pt-2">
      {/* EDIT: update amount */}
      <form action={upsertBudget} className="flex gap-2 flex-1">
        <input type="hidden" name="categoryId" value={b.category_id} />
        <input type="hidden" name="month" value={b.month} />

        <input
          name="amount"
          type="number"
          step="0.01"
          defaultValue={Number(b.amount)}
          className="flex-1 bg-[#0f1115] border border-[#262b36] rounded px-3 py-2"
        />

        <button className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500">
          Shrani
        </button>
      </form>

      {/* DELETE */}
      <form action={deleteBudget}>
        <input type="hidden" name="budgetId" value={b.id} />
        <button className="px-4 py-2 rounded bg-red-600 hover:bg-red-500">
          Izbriši
        </button>
      </form>
    </div>
  </div>
);

    })
  )}
</div>

    </div>
  );
}
