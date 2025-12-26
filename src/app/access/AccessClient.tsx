"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function AccessClient() {
  const router = useRouter();

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const hint = useMemo(() => {
    return "Enter your access code to continue.";
  }, []);

  async function submit() {
    setError("");
    const trimmed = code.trim();

    if (!trimmed) {
      setError("Please enter an access code.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: trimmed }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error || "Invalid access code.");
        return;
      }

      // success: middleware cookie should now allow entry
      router.push("/");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-slate-900">Katoki Radio Access</h1>
          <p className="text-sm text-slate-600">{hint}</p>
        </div>

        <div className="mt-6 space-y-3">
          <label className="block text-sm font-semibold text-slate-700">
            Access code
          </label>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit();
            }}
            placeholder="e.g., RADIO2024"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-blue-200"
            autoFocus
          />

          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <button
            type="button"
            onClick={submit}
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Checking..." : "Continue"}
          </button>

          <p className="pt-2 text-xs text-slate-500">
            Need an access code? Email: <span className="font-semibold">info.radio@katokifoundation.org</span>
          </p>
        </div>
      </div>
    </main>
  );
}
