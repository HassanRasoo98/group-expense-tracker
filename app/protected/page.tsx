
import { createGroup, fetchGroups } from "@/lib/groups";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import GroupForm from "../ui/form";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const groups = await fetchGroups(user.id);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Groups</h2>
      <ul className="bg-black shadow-md rounded-lg p-4">
        {groups.length > 0 ? (
          groups.map((group) => (
            <li key={group.id} className="p-2 border-b last:border-none">
              {group.name}
            </li>
          ))
        ) : (
          <p className="text-gray-500">No groups created yet.</p>
        )}
      </ul>

        <GroupForm />

      {/* <button onClick={groupHandler}>Create New Group</button> */}
    </div>

  );
}
