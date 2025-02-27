import ExpenseForm from "@/components/expenseForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Expenses({ params }: { params: { id: string } }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { id } =  await params;

  // Fetch expenses from our API
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/expenses?group_id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.id}`, // Send user ID as a token
    },
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Error fetching expenses");
    return <p className="text-red-500">Failed to load expenses</p>;
  }

  const expenses = await res.json();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Expenses</h2>
      <ul className="bg-black shadow-md rounded-lg p-4">
        {expenses.length > 0 ? (
          expenses.map((expense: any) => (
            <li key={expense.id} className="p-2 border-b">
              <strong>{expense.category}</strong> - ${expense.amount}
              {expense.description && <p className="text-gray-500">{expense.description}</p>}
            </li>
          ))
        ) : (
          <p className="text-gray-500">No expenses added in this group yet.</p>
        )}
      </ul>

      {/* Passing groupId and user to ExpenseForm */}
      <ExpenseForm groupId={id} user={user} />
    </div>
  );
}
