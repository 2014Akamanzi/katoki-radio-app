"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function AccessPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const canSubmit = useMemo(() => code.trim().length >= 4, [code]);

  async function submit() {
    setMsg(null);
    setLoading(true);

    try {
      const res = await fetch("/api/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim() }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.ok) {
        setMsg(data?.message || "Invalid access code.");
        setLoading(false);
        return;
      }

      // Go to home (radio page)
      router.push("/");
      router.refresh();
    } catch {
      setMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-12">
      <div className="mx-auto w-full max-w-xl rounded-3xl bg-white/90 backdrop-blur border border-slate-200 shadow-xl p-8">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
            Katoki Radio
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
            Enter Access Code
          </h1>
          <p className="mt-3 text-slate-600">
            Please enter your access code to listen to Katoki Radio.
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Need a code? Email{" "}
            <span className="font-semibold">info.radio@katokifoundation.org</span>
          </p>
        </div>

        <div className="mt-8 space-y-3">
          <label className="text-sm font-semibold text-slate-700">
            Access code
          </label>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="e.g., LISTENER001"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-blue-400"
          />

          {msg ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {msg}
            </div>
          ) : null}

          <button
            onClick={submit}
            disabled={!canSubmit || loading}
            className="w-full inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 text-white font-semibold shadow-md hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Checking..." : "Continue"}
          </button>
        </div>
      </div>
    </main>
  );
}
