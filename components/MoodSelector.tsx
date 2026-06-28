const moods = [
  { label: "Schlecht", color: "bg-red-500", border: "border-red-500/70" },
  { label: "Geht so", color: "bg-orange-400", border: "border-orange-400/70" },
  { label: "Gut", color: "bg-yellow-300", border: "border-yellow-300/70" },
  { label: "Sehr gut", color: "bg-emerald-400", border: "border-emerald-400/70" },
];

export default function MoodSelector() {
  return (
    <div className="mt-6">
      <h2 className="text-[21px] font-bold text-emerald-400">
        Wie fühlst du dich gerade?
      </h2>

      <div className="mt-3 grid grid-cols-4 gap-2">
        {moods.map((mood) => (
          <button
            key={mood.label}
            className={`h-[68px] rounded-2xl border ${mood.border} bg-white/[0.03]`}
          >
            <div className="flex h-full flex-col items-center justify-center">
              <div className={`h-6 w-6 rounded-full ${mood.color}`} />
              <div className="mt-2 text-[11px] font-semibold text-white">
                {mood.label}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}