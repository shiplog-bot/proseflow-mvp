"use client";
import { useState } from "react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        const d = await res.json();
        setErrorMsg(d.error || "Something went wrong");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center">
        <div className="inline-block bg-green-900/30 border border-green-700 rounded-xl px-6 py-4">
          <p className="text-green-400 font-semibold">✓ You're on the list!</p>
          <p className="text-[#888] text-sm mt-1">Check your inbox — we sent you a confirmation.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        required
        className="flex-1 bg-[#1a1a1a] border border-[#333] rounded-xl px-4 py-3 text-sm text-[#f0f0f0] placeholder-[#555] focus:outline-none focus:border-[#7c8cf8]"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-gradient-to-r from-[#7c8cf8] to-[#a78bfa] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 whitespace-nowrap"
      >
        {status === "loading" ? "Joining..." : "Get notified"}
      </button>
      {status === "error" && <p className="text-red-400 text-sm mt-1 w-full">{errorMsg}</p>}
    </form>
  );
}
