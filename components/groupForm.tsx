"use client";

import { useState } from "react";

export default function GroupForm({ user }: { user: any }) {
  const [groupName, setGroupName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: groupName, user: user }), // Send group name
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create group");
      }

      setSuccess("Group created successfully!");
      setGroupName(""); // Clear input on success

    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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


