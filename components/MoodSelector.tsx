const moods = [
  {
    label: "Schlecht",
    color: "border-red-400 text-red-300",
    dot: "bg-red-500",
    delay: "2.55s",
  },
  {
    label: "Geht so",
    color: "border-orange-400 text-orange-300",
    dot: "bg-orange-400",
    delay: "2.7s",
  },
  {
    label: "Gut",
    color: "border-yellow-300 text-yellow-200",
    dot: "bg-yellow-300",
    delay: "2.85s",
  },
  {
    label: "Sehr gut",
    color: "border-emerald-400 text-emerald-300",
    dot: "bg-emerald-400",
    delay: "3s",
  },
];

export default function MoodSelector() {
  return (
    <div className="w-full">
      <h2 className="animate-[fadeMood_0.65s_ease-out_2.35s_both] text-[21px] font-semibold leading-tight text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.45)]">
        Wie fühlst du dich gerade?
      </h2>

      <div className="mt-4 grid grid-cols-4 gap-3">
        {moods.map((mood) => (
          <button
            key={mood.label}
            className={`flex h-[78px] animate-[moodIn_0.45s_ease-out_both] flex-col items-center justify-center rounded-[18px] border bg-black/10 backdrop-blur-[1px] ${mood.color}`}
            style={{ animationDelay: mood.delay }}
          >
            <span className={`h-7 w-7 rounded-full ${mood.dot}`} />
            <span className="mt-3 text-[12px] font-semibold text-white">
              {mood.label}
            </span>
          </button>
        ))}
      </div>

      <style>{`
        @keyframes fadeMood {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes moodIn {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.92);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}