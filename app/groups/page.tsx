import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import GroupForm from "@/components/groupForm";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.log(user);
    return redirect("/sign-in");
  }

  // Fetch groups from our API instead of calling fetchGroups directly
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/groups`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.id}`, // Optional: Send user ID in headers if needed
    },
    cache: "no-store", // Ensures fresh data on every request
  });

  const groups = res.ok ? await res.json() : [];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Groups</h2>
      <ul className="bg-black shadow-md rounded-lg p-4">
        {groups.length > 0 ? (
          groups.map((group: { id: string; name: string }) => (
            <Link key={group.id} href={`/expense/${group.id}`} className="block">
              <li>{group.name}</li>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">No groups created yet.</p>
        )}
      </ul>
      <GroupForm user={user} />
    </div>
  );
}
