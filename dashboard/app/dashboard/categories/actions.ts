"use server";

import { auth } from "@clerk/nextjs/server";
import { sql } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateCategory(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;

  if (!id || !name) throw new Error("Invalid data");

  await sql`
    UPDATE categories
    SET name = ${name}
    WHERE id = ${id}
      AND user_id = ${userId}
  `;

  revalidatePath("/dashboard/categories");
}

export async function deleteCategory(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  const id = formData.get("id") as string;
  if (!id) throw new Error("Missing id");

  await sql`
    DELETE FROM categories
    WHERE id = ${id}
      AND user_id = ${userId}
  `;

  revalidatePath("/dashboard/categories");
}