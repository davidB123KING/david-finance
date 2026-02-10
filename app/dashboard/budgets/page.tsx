export const dynamic = "force-dynamic";

import { auth } from "@clerk/nextjs/server";
import { sql } from "@/lib/db";
import { upsertBudget, deleteBudget } from "./actions";
import BudgetsList from "./BudgetsList";
import MonthSelector from "./MonthSelector";

type BudgetItem = {
  id: string;
  category_id: string;
  category_name: string;
  amount: number;
  spent: number;
  month: string;
};

export default async function BudgetsPage() {
  const { userId } = await auth();
  if (!userId) return null;

  // samo za prikaz – logika ni več odvisna od tega
  const currentMonth = new Date().toISOString().slice(0, 7);

  type Category = {
    id: string;
    name: string;
  };

  const categories = (await sql`
    SELECT id, name
    FROM categories
    WHERE user_id = ${userId}
    ORDER BY name;
  `) as Category[];

  const budgets = (await sql`
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
    WHERE b.user_id = ${userId}
      AND b.month = ${currentMonth}
    GROUP BY b.id, c.name, c.id
    ORDER BY c.name;
  `) as BudgetItem[];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Budgeti</h1>

      {/* FORM */}
      <form
        action={upsertBudget}
        className="bg-[#161a22] border border-[#262b36] rounded-xl p-4 space-y-4 max-w-md"
      >
        {/* ⬇️ TU JE MESEC – CLIENT SIDE */}
        <MonthSelector initialMonth={currentMonth} />

        <div>
          <label className="block text-sm mb-1">Kategorija</label>
          <select
            name="categoryId"
            required
            className="w-full bg-[#0f1115] border border-[#262b36] rounded px-3 py-2"
          >
            <option value="">Izberi kategorijo</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Budget (€)</label>
          <input
            name="amount"
            type="number"
            step="0.01"
            required
            className="w-full bg-[#0f1115] border border-[#262b36] rounded px-3 py-2"
          />
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-500 py-2 rounded">
          Shrani budget
        </button>
      </form>

      {/* SEZNAM BUDGETOV */}
      <BudgetsList
        budgets={budgets}
        onUpdate={upsertBudget}
        onDelete={deleteBudget}
      />
    </div>
  );
}
