import Link from "next/link";

type Slot = { time: string; title: string; lang: "EN" | "SW" | "MIX"; notes?: string };

const schedule: Record<string, Slot[]> = {
  Monday: [
    { time: "06:00–09:00", title: "Morning Music Drive", lang: "MIX" },
    { time: "09:00–09:15", title: "Ubuntu Message (English)", lang: "EN" },
    { time: "09:15–12:00", title: "Mid-Morning Music", lang: "MIX" },
    { time: "12:00–12:15", title: "Ubuntu Message (Swahili)", lang: "SW" },
    { time: "12:15–17:00", title: "Afternoon Music", lang: "MIX" },
    { time: "17:00–18:00", title: "Learning Hour (English)", lang: "EN", notes: "Education / counselling / mentorship (as available)" },
    { time: "18:00–22:00", title: "Evening Music", lang: "MIX" },
  ],
  Tuesday: [
    { time: "06:00–09:00", title: "Morning Music Drive", lang: "MIX" },
    { time: "09:00–09:15", title: "Ubuntu Message (Swahili)", lang: "SW" },
    { time: "09:15–12:00", title: "Mid-Morning Music", lang: "MIX" },
    { time: "12:00–12:15", title: "Ubuntu Message (English)", lang: "EN" },
    { time: "12:15–17:00", title: "Afternoon Music", lang: "MIX" },
    { time: "17:00–18:00", title: "Learning Hour (Swahili)", lang: "SW" },
    { time: "18:00–22:00", title: "Evening Music", lang: "MIX" },
  ],
  Wednesday: [
    { time: "06:00–22:00", title: "Music + Short Ubuntu Spots (EN/SW)", lang: "MIX", notes: "Light day (testing)" },
  ],
  Thursday: [
    { time: "06:00–09:00", title: "Morning Music Drive", lang: "MIX" },
    { time: "09:00–09:15", title: "Ubuntu Message (English)", lang: "EN" },
    { time: "09:15–12:00", title: "Mid-Morning Music", lang: "MIX" },
    { time: "12:00–12:15", title: "Ubuntu Message (Swahili)", lang: "SW" },
    { time: "12:15–17:00", title: "Afternoon Music", lang: "MIX" },
    { time: "17:00–18:00", title: "Learning Hour (English)", lang: "EN" },
    { time: "18:00–22:00", title: "Evening Music", lang: "MIX" },
  ],
  Friday: [
    { time: "06:00–22:00", title: "Music + Weekend Warm-Up", lang: "MIX", notes: "More music, fewer talk segments" },
  ],
  Saturday: [
    { time: "08:00–22:00", title: "Weekend Music Mix", lang: "MIX" },
    { time: "12:00–12:15", title: "Ubuntu Message (Swahili)", lang: "SW" },
    { time: "18:00–18:15", title: "Ubuntu Message (English)", lang: "EN" },
  ],
  Sunday: [
    { time: "08:00–22:00", title: "Calm Sunday Music", lang: "MIX" },
    { time: "10:00–10:20", title: "Ubuntu Reflection (English)", lang: "EN" },
    { time: "16:00–16:20", title: "Ubuntu Reflection (Swahili)", lang: "SW" },
  ],
};

export default function SchedulePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold text-blue-700 hover:underline">
            ← Back to home
          </Link>
          <a
            href="https://servidor30.brlogic.com:7036/live"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-2.5 text-white font-semibold shadow-md hover:bg-blue-700 transition"
          >
            Listen now
          </a>
        </div>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-white/90 backdrop-blur shadow-lg p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Weekly Schedule (Draft)
          </h1>
          <p className="mt-2 text-slate-600">
            Light and predictable: mostly music, with short Ubuntu messages and one learning hour on selected days.
          </p>

          <div className="mt-8 space-y-8">
            {Object.entries(schedule).map(([day, slots]) => (
              <section key={day} className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
                <h2 className="text-lg font-bold text-slate-900">{day}</h2>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-slate-600">
                        <th className="py-2 pr-3">Time</th>
                        <th className="py-2 pr-3">Programme</th>
                        <th className="py-2 pr-3">Lang</th>
                        <th className="py-2">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-800">
                      {slots.map((s, i) => (
                        <tr key={i} className="border-t border-slate-100">
                          <td className="py-2 pr-3 whitespace-nowrap">{s.time}</td>
                          <td className="py-2 pr-3">{s.title}</td>
                          <td className="py-2 pr-3 font-semibold">{s.lang}</td>
                          <td className="py-2">{s.notes ?? ""}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
