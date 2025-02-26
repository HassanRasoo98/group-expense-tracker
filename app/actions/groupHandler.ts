import { createGroup } from "@/lib/groups";
import { createClient } from "@/utils/supabase/client";

// Create New Group Helper
export const groupHandler = async (formData: FormData) => {
    const supabase = createClient();
  
    // Get authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (!user) {
      throw new Error("User not authenticated");
    }
  
    const name = formData.get("title") as string; // Assuming "title" is the group name
  
    if (!name || name.trim() === "") {
      throw new Error("Group name is required");
    }
  
    // Create group in Supabase
    const newGroup = await createGroup(user.id, name);
  
    return newGroup;
  };
  