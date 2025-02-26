"use server";

import { createExpense } from "@/lib/expenses";
import { createClient } from "@/utils/supabase/server";

export const expenseHandler = async (formData: FormData) => {
  const supabase = await createClient();

    // Get authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (!user) {
      console.log(user);

      throw new Error("User not authenticated");
    }

  const groupId = formData.get("groupId") as string;
  const amount = parseFloat(formData.get("amount") as string);
  const category = formData.get("category") as string;
  const description = formData.get("description") as string | undefined;

  if (!groupId) throw new Error("Group ID is required");
  if (isNaN(amount) || amount <= 0) throw new Error("Amount must be a positive number");
  if (!category) throw new Error("Category is required");

  // Create expense in Supabase
  return await createExpense(user.id, groupId, amount, category, description);
};
