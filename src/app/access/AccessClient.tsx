"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

export default function AccessClient() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const cleaned = useMemo(() => code.trim(), [code]);

  async function submit(e?: React.FormEvent) {
    e?.preventDefault();
    setErr(null);

    if (!cleaned) {
      setErr("Please enter an access code.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: cleaned }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setErr(data?.error || "Invalid access code.");
        setLoading(false);
        return;
      }

      window.location.href = "/";
    } catch {
      setErr("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setErr(null);
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-blue-700"
            aria-label="Back to home"
          >
            ← Back
          </Link>
          <span className="text-xs font-semibold text-slate-400">Katoki Radio</span>
        </div>

        <h1 className="mt-4 text-2xl font-bold text-slate-900">Enter access code</h1>
        <p className="mt-2 text-slate-600">
          Please enter your Katoki Radio access code to continue.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-3">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="e.g. RADIO2024"
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-600"
          />

          {err ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {err}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Checking..." : "Unlock radio"}
          </button>
        </form>

        <div className="mt-6 text-sm text-slate-600">
          Need a code? Email{" "}
          <a className="font-semibold text-blue-700" href="mailto:info.radio@katokifoundation.org">
            info.radio@katokifoundation.org
          </a>
          .
        </div>
      </div>
    </main>
  );
}
