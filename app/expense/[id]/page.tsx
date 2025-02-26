import { fetchExpenses } from "@/lib/expenses"
import ExpenseForm from "@/components/expenseForm"
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Expneses({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {

    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (!user) {
      console.log(user);
  
      return redirect("/sign-in");
    }
    
    const id = (await params).id

    const expenseData = await fetchExpenses(id);


    return (
      <>
        <ul>
          {expenseData.length > 0 ? (
            expenseData.map((expense) => (
              <li key={expense.id} className="p-2 border-b">
                <strong>{expense.category}</strong> - ${expense.amount}  
                {expense.description && <p className="text-gray-500">{expense.description}</p>}
              </li>
            ))
          ) : (
            <p>No Expenses Added in this group yet</p>
          )}
        </ul>

        <ExpenseForm groupId={id} />
      </>
    );

  }

