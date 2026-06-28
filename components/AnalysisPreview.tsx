import type { LifeEntryAnalysis } from "@/types/lifeEntry";

type AnalysisPreviewProps = {
  analysis: LifeEntryAnalysis;
};

export default function AnalysisPreview({ analysis }: AnalysisPreviewProps) {
  return (
    <div className="mt-6 space-y-5">
      {/* AI Summary */}
      <div className="rounded-[32px] border border-white/10 bg-white/[0.08] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl">
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-black shadow-[0_0_22px_rgba(52,211,153,0.45)]">
            <span className="text-sm font-bold">AI</span>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-emerald-300">
              Ich habe verstanden
            </h2>

            <p className="mt-4 text-[15px] leading-relaxed text-white">
              {analysis.summary}
            </p>
          </div>
        </div>
      </div>

      {/* AI Questions */}
      {analysis.questions.length > 0 && (
        <div className="rounded-[32px] border border-white/10 bg-white/[0.08] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl">
          <div className="flex items-start gap-3">
            <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-black shadow-[0_0_22px_rgba(52,211,153,0.45)]">
              <span className="text-sm font-bold">AI</span>
            </div>

            <div className="w-full">
              <h2 className="text-xl font-semibold text-emerald-300">
                Eine Frage dazu
              </h2>

              <div className="mt-4 space-y-3">
                {analysis.questions.map((question) => (
                  <div
                    key={question}
                    className="rounded-2xl bg-black/35 px-4 py-3 text-[15px] leading-relaxed text-zinc-100"
                  >
                    {question}
                  </div>
                ))}
              </div>

              <p className="mt-4 text-xs leading-relaxed text-zinc-400">
                Du kannst die Fragen beantworten oder den Eintrag direkt
                speichern.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}