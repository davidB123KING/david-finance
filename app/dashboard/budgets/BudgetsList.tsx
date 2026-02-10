"use client";

import { useState } from "react";
import BudgetActions from "./BudgetActions";

type BudgetItem = {
  id: string;
  category_id: string;
  category_name: string;
  amount: number;
  spent: number;
  month: string;
};

type BudgetsListProps = {
  budgets: BudgetItem[];
  onUpdate: (formData: FormData) => void;
  onDelete: (formData: FormData) => void;
};

export default function BudgetsList({
  budgets,
  onUpdate,
  onDelete,
}: BudgetsListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {budgets.length === 0 ? (
        <p className="text-[#9aa1ad]">
          Za ta mesec še ni nastavljenih budgetov.
        </p>
      ) : (
        budgets.map((b) => {
          const percent = Number(b.spent) / Number(b.amount);

          let barColor = "bg-green-500";
          if (percent >= 1) barColor = "bg-red-500";
          else if (percent >= 0.8) barColor = "bg-yellow-500";

          return (
            <div
              key={b.id}
              className="bg-[#161a22] border border-[#262b36] rounded-xl p-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">
                    {b.category_name}
                  </div>
                  <div className="text-sm text-[#9aa1ad]">
                    {Number(b.spent).toFixed(2)} € /{" "}
                    {Number(b.amount).toFixed(2)} €
                  </div>
                </div>

                <BudgetActions
                  onEdit={() => setEditingId(b.id)}
                  onDelete={() => setDeleteId(b.id)}
                />
              </div>

              <div className="w-full h-2 bg-[#262b36] rounded mt-3">
                <div
                  className={`h-2 rounded ${barColor}`}
                  style={{
                    width: `${Math.min(percent * 100, 100)}%`,
                  }}
                />
              </div>

              {/* EDIT */}
              {editingId === b.id && (
                <form
                  action={onUpdate}
                  className="flex gap-2 mt-3"
                >
                  <input
                    type="hidden"
                    name="categoryId"
                    value={b.category_id}
                  />
                  <input
                    type="hidden"
                    name="month"
                    value={b.month}
                  />
                  <input
                    name="amount"
                    type="number"
                    defaultValue={b.amount}
                    className="flex-1 bg-[#0f1115] border border-[#262b36] rounded px-3 py-2"
                  />
                  <button className="bg-blue-600 px-4 rounded">
                    Shrani
                  </button>
                </form>
              )}

              {/* DELETE (server action pravilno) */}
              {deleteId === b.id && (
                <form action={onDelete} className="mt-3">
                  <input
                    type="hidden"
                    name="budgetId"
                    value={b.id}
                  />
                  <button className="text-red-400 hover:text-red-300">
                    Potrdi brisanje
                  </button>
                </form>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
