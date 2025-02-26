
"use client";

import { groupHandler } from "@/lib/groups";
import { useState } from "react";


export default function GroupForm() {
  const [groupName, setGroupName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError("");

    try {
      await groupHandler(formData); // Call the server function
      setGroupName(""); // Clear input on success
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form action={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        className="border p-2 rounded-md w-full"
        placeholder="Enter group name"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md w-full"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Group"}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}
