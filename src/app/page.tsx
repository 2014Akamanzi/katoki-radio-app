import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-10">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <header className="rounded-3xl border border-slate-200 bg-white/90 backdrop-blur shadow-lg p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                Katoki Radio
              </p>
              <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                A Touch of Ubuntu — bringing warmth, wisdom, and connection
              </h1>
              <p className="mt-2 text-slate-600">
                Music, Ubuntu messages, education, counselling, mentorship — in English and Swahili.
              </p>
            </div>

            <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              Live
            </span>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href="https://servidor30.brlogic.com:7036/live"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 text-white font-semibold shadow-md hover:bg-blue-700 transition"
            >
              Listen now
            </a>

            <Link
              href="/schedule"
              className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 text-white font-semibold shadow-md hover:bg-blue-700 transition"
            >
              View schedule
            </Link>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-sm text-slate-700">
              Contact:{" "}
              <a
                className="font-semibold text-blue-700 hover:underline"
                href="mailto:info.radio@katokifoundation.org"
              >
                info.radio@katokifoundation.org
              </a>
            </p>
          </div>
        </header>

        {/* Simple content */}
        <section className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">What you’ll hear</h2>
            <p className="mt-2 text-slate-600">
              Plenty of music blocks, plus short Ubuntu messages and learning segments scheduled at predictable times.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Languages</h2>
            <p className="mt-2 text-slate-600">
              English and Swahili programmes run at different times so listeners can plan easily.
            </p>
          </div>
        </section>

        <footer className="mt-10 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Katoki Foundation · Katoki Radio
        </footer>
      </div>
    </main>
  );
}
