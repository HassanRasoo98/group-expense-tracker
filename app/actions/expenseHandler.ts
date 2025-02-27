"use server";

import { revalidatePath } from "next/cache";

export async function expenseHandler(formData: FormData, user: any) {
  const groupId = formData.get("groupId") as string;
  const amount = formData.get("amount") as string;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string || "";

  if (!groupId || !amount || !category) {
    throw new Error("Missing required fields.");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.id}`,
    },
    body: JSON.stringify({ groupId, amount, category, description }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to add expense.");
  }

  revalidatePath("expenses")
  return await res.json();
}
