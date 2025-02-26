import { createClient } from "@/utils/supabase/client";

// Fetch groups for the logged-in user
export const fetchGroups = async (userId: string) => {

  const supabase = await createClient()

  const { data, error } = await supabase
    .from("groups")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching groups:", error);
  }

  console.log(data);
  return data || [];
};

// Create a new group
export const createGroup = async (userId: string, name: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase.from("groups").insert([{ user_id: userId, name }]);

  if (error) {
    console.error("Error creating group:", error);
  }
  return data;
};