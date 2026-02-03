"use server";

import { auth } from "@clerk/nextjs/server";
import { sql } from "@/lib/db";
import { revalidatePath } from "next/cache";

/* =========================
   TRANSACTIONS
========================= */

export async function addTransaction(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  const type = formData.get("type") as "income" | "expense";
  const amountRaw = formData.get("amount");
  const amount = Number(amountRaw);
  const categoryId = formData.get("categoryId") as string;
  const description = formData.get("description") as string;

  // 🛑 VALIDACIJA ZNESKA
  if (isNaN(amount)) {
    throw new Error("Amount must be a number");
  }

  if (amount <= 0) {
    throw new Error(
      type === "income"
        ? "Income amount must be greater than 0"
        : "Expense amount must be greater than 0"
    );
  }

  await sql`
    INSERT INTO transactions (
      user_id,
      type,
      amount,
      category_id,
      description
    )
    VALUES (
      ${userId},
      ${type},
      ${amount},
      ${categoryId},
      ${description}
    )
  `;

  revalidatePath("/dashboard");
}


/* =========================
   CATEGORIES
========================= */

export async function getCategories() {
  const { userId } = await auth();
  if (!userId) return [];

  type Category = {
    id: string;
    name: string;
    color: string;
    icon: string | null;
  };

  let categories = (await sql`
    SELECT id, name, color, icon
    FROM categories
    WHERE user_id = ${userId}
    ORDER BY created_at ASC
  `) as Category[];

  // če uporabnik še nima kategorij → ustvari default
  if (categories.length === 0) {
    await sql`
      INSERT INTO categories (user_id, name, color, icon)
      VALUES
        (${userId}, 'Plača', '#16a34a', ''),
        (${userId}, 'Dolg', '#dc2626', ''),
        (${userId}, 'Loterija', '#eab308', '')
    `;

    categories = (await sql`
      SELECT id, name, color, icon
      FROM categories
      WHERE user_id = ${userId}
      ORDER BY created_at ASC
    `) as Category[];
  }

  return categories;
}

export async function createCategory(formData: FormData) {
  const { userId } =  await auth();
  if (!userId) throw new Error("Not authenticated");

  const name = formData.get("name") as string;
  const color = formData.get("color") as string;
  const icon = formData.get("icon") as string;

  if (!name || name.trim().length === 0) {
    throw new Error("Category name required");
  }

  await sql`
    INSERT INTO categories (user_id, name, color, icon)
    VALUES (${userId}, ${name}, ${color}, ${icon})
  `;

  revalidatePath("/dashboard");
}
