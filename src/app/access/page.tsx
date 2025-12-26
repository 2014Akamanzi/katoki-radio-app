"use client";

import { useState } from "react";
import Link from "next/link";

export default function AccessPage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      const res = await fetch("/api/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErr(data?.error || "Invalid access code.");
        setLoading(false);
        return;
      }

      // Cookie is set by the API route. Now go to home.
      window.location.href = "/";
    } catch {
      setErr("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto w-full max-w-xl">
        <div className="mb-6">
          <Link href="/" className="text-sm text-blue-700 hover:underline">
            ← Back to Home
          </Link>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Enter Access Code</h1>
          <p className="mt-2 text-slate-600">
            Katoki Radio is currently in pilot. Please enter your access code to continue.
          </p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700">
                Access code
              </label>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g., KATOKI-RADIO-0001"
                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-600"
                autoComplete="off"
              />
              {err ? <p className="mt-2 text-sm text-red-600">{err}</p> : null}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Checking..." : "Unlock Radio"}
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-600">
            Need a code? Email{" "}
            <span className="font-semibold">info.radio@katokifoundation.org</span>.
          </p>
        </div>
      </div>
    </main>
  );
}
