"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function AccessClient() {
  const router = useRouter();

  const allowed = useMemo(() => {
    // Keep your existing env name exactly:
    const raw = process.env.NEXT_PUBLIC_KATOKI_RADIO_ACCESS_CODES ?? "";
    return raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }, []);

  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit() {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (!res.ok) {
        setError("Invalid access code.");
        setLoading(false);
        return;
      }

      // Server sets cookie; now go home (radio player page)
      router.replace("/");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-blue-700"
          >
            ← Back to home
          </a>
          <span className="text-xs text-slate-500">Katoki Radio</span>
        </div>

        <h1 className="text-2xl font-bold text-slate-900">Access code</h1>
        <p className="mt-2 text-slate-600">
          Enter your access code to listen to Katoki Radio.
        </p>

        <div className="mt-6 space-y-3">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="e.g., RADIO2024"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
          />

          <button
            onClick={submit}
            disabled={loading}
            className="w-full rounded-2xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Checking..." : "Continue"}
          </button>

          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          {allowed.length === 0 ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              Note: No codes found in{" "}
              <span className="font-mono">
                NEXT_PUBLIC_KATOKI_RADIO_ACCESS_CODES
              </span>
              .
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
