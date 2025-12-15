"use server";

import { auth } from "@clerk/nextjs/server";
import { sql } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function upsertBudget(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  const categoryId = formData.get("categoryId") as string;
  const amount = Number(formData.get("amount"));
  const month = formData.get("month") as string;

  if (!categoryId || !amount || !month) {
    throw new Error("Invalid data");
  }

  await sql`
    INSERT INTO budgets (user_id, category_id, amount, month)
    VALUES (${userId}, ${categoryId}, ${amount}, ${month})
    ON CONFLICT (user_id, category_id, month)
    DO UPDATE SET amount = EXCLUDED.amount
  `;

  revalidatePath("/dashboard/budgets");
}

export async function deleteBudget(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  const budgetId = formData.get("budgetId") as string;
  if (!budgetId) throw new Error("Missing budgetId");

  // varnost: brišemo samo svoj budget
  await sql`
    DELETE FROM budgets
    WHERE id = ${budgetId}
      AND user_id = ${userId}
  `;

  revalidatePath("/dashboard/budgets");
}
