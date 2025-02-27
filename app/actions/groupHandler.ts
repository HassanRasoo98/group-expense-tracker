"use server";

import { revalidatePath } from "next/cache";

export async function groupHandler(formData: FormData, user: any) {
  const name = formData.get("name") as string;

  if (!name) {
    throw new Error("Missing required fields.");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/groups`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.id}`,
    },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to create group.");
  }

  revalidatePath("/groups")
  return await res.json();
}
