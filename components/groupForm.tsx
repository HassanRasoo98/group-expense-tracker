"use client";

import { useState } from "react";
import { groupHandler } from "@/app/actions/groupHandler";

export default function GroupForm({ user }: { user: any }) {
  const [groupName, setGroupName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await groupHandler(formData, user);
      setSuccess("Group created successfully!");
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
        name="name"
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
      {success && <p className="text-green-500 text-sm">{success}</p>}
    </form>
  );
}
