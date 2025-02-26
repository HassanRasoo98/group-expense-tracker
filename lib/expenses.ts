import { createClient } from "@/utils/supabase/client";

// 🔹 Fetch expenses for a given group
export const fetchExpenses = async (groupId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .eq("group_id", groupId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching expenses:", error);
  }

  return data || [];
};

// 🔹 Create a new expense
export const createExpense = async (
  userId: string,
  groupId: string,
  amount: number,
  category: string,
  description?: string
) => {
  const supabase = createClient();

  const { data, error } = await supabase.from("expenses").insert([
    {
      user_id: userId,
      group_id: groupId,
      amount,
      category,
      description,
    },
  ]);

  if (error) {
    console.error("Error creating expense:", error);
  }

  return data;
};
