"use client";

import { useState } from "react";
import { expenseHandler } from "@/app/actions/expenseHandler";

export default function ExpenseForm({ groupId }: { groupId: string }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError("");

    try {
      formData.append("groupId", groupId); // Attach group ID
      await expenseHandler(formData);
      setAmount("");
      setCategory("");
      setDescription("");
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form action={handleSubmit} className="space-y-4">
      <input type="hidden" name="groupId" value={groupId} />
      <input
        type="number"
        name="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 rounded-md w-full"
        placeholder="Amount"
        required
      />
      <input
        type="text"
        name="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 rounded-md w-full"
        placeholder="Category (e.g. Food, Travel)"
        required
      />
      <input
        type="text"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 rounded-md w-full"
        placeholder="Optional Description"
      />
      <button
        type="submit"
        className="bg-green-500 text-white p-2 rounded-md w-full"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Expense"}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}
