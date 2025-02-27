// import { createClient } from "@/utils/supabase/server";

// export async function GET(
//   request: Request,
//   { params }: { params: { group_id: string } }
// ) {
//   try {
//     const { group_id } = await params;

import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const groupId = searchParams.get("group_id");

    // console.log("Group Id : ", groupId)

    if (!groupId) {
      return new Response(JSON.stringify({ error: "Missing group ID" }), { status: 400 });
    }
    const supabase = await createClient();

    // Extract Authorization header
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized: Missing token" }), { status: 401 });
    }

    // Extract user ID from token
    const userId = authHeader.replace("Bearer ", "").trim();

    // Fetch expenses for the authenticated user
    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .eq("user_id", userId)
      .eq("group_id", groupId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching expenses:", error);
      return new Response(JSON.stringify({ error: "Failed to fetch expenses" }), { status: 500 });
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
    const { groupId, amount, category, description } = await request.json();

    if (!groupId || !amount || !category) {
      return new Response(JSON.stringify({ error: "Missing required fields." }), { status: 400 });
    }

    const supabase = await createClient();

    // Extract Authorization header
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized: Missing token" }), { status: 401 });
    }

    // Extract user ID from the token
    const userId = authHeader.replace("Bearer ", "").trim();

    // Create expense in Supabase
    const { data, error } = await supabase
      .from("expenses")
      .insert([{ group_id: groupId, user_id: userId, amount, category, description }])
      .select();

    if (error) {
      console.error("Error creating expense:", error);
      return new Response(JSON.stringify({ error: "Failed to create expense" }), { status: 500 });
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
