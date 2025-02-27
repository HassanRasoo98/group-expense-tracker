import { createGroup } from "@/lib/groups";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
    try {
      const supabase = await createClient();
  
      // Extract Authorization header
      const authHeader = request.headers.get("Authorization");
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return new Response(JSON.stringify({ error: "Unauthorized: Missing token" }), { status: 401 });
      }
  
      // Extract user ID from the token
      const userId = authHeader.replace("Bearer ", "").trim();
      console.log("Extracted User ID:", userId);
  
      // Fetch groups for the authenticated user
      const { data, error } = await supabase
        .from("groups")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
  
      if (error) {
        console.error("Error fetching groups:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch groups" }), { status: 500 });
      }
  
      return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
  
    } catch (error) {
      console.error("Unexpected error:", error);
      return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
  }

export async function POST(request: Request) {
  try {
    const { name, user } = await request.json();

    const supabase = await createClient();

    // Verify the user is authenticated with Supabase
    const { data: authUser, error } = await supabase.auth.getUser();

    if (error) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
    }

    // Create group in Supabase
    const newGroup = await createGroup(user.id, name);

    return new Response(JSON.stringify(newGroup), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error creating group:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
