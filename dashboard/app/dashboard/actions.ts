"use server";

import { auth } from "@clerk/nextjs/server";
import { sql } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addTransaction(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  const type = formData.get("type") as "income" | "expense";
  const amount = Number(formData.get("amount"));
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;

  if (!amount || amount <= 0) {
    throw new Error("Invalid amount");
  }

  await sql`
    INSERT INTO transactions (user_id, type, amount, category, description)
    VALUES (${userId}, ${type}, ${amount}, ${category}, ${description})
  `;

  // osveži dashboard
  revalidatePath("/dashboard");
}
