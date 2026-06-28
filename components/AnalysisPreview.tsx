import { categories } from "@/data/categories";
import type { LifeEntryAnalysis } from "@/types/lifeEntry";

type AnalysisPreviewProps = {
  analysis: LifeEntryAnalysis;
};

function getCategoryTitle(id: string | null) {
  if (!id) return "Keine Schublade erkannt";
  return categories.find((category) => category.id === id)?.title ?? id;
}

export default function AnalysisPreview({ analysis }: AnalysisPreviewProps) {
  return (
    <div className="mt-6 space-y-4">
      <div className="rounded-3xl bg-white/[0.06] p-5">
        <h2 className="text-xl font-semibold text-emerald-400">
          Erkannte Zuordnung
        </h2>

        <div className="mt-4 text-sm text-zinc-300">
          Haupt-Schublade:
          <span className="ml-2 font-semibold text-white">
            {getCategoryTitle(analysis.primaryCategoryId)}
          </span>
        </div>

        {analysis.relatedCategoryIds.length > 0 && (
          <div className="mt-3 text-sm text-zinc-300">
            Weitere Verknüpfungen:
            <div className="mt-2 flex flex-wrap gap-2">
              {analysis.relatedCategoryIds.map((id) => (
                <span
                  key={id}
                  className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300"
                >
                  {getCategoryTitle(id)}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="rounded-3xl bg-white/[0.06] p-5">
        <h2 className="text-xl font-semibold text-emerald-400">
          Kurz-Zusammenfassung
        </h2>

        <p className="mt-4 text-sm leading-relaxed text-zinc-300">
          {analysis.summary}
        </p>
      </div>

      <div className="rounded-3xl bg-white/[0.06] p-5">
        <h2 className="text-xl font-semibold text-emerald-400">
          Rückfragen
        </h2>

        {analysis.questions.length > 0 ? (
          <ul className="mt-4 space-y-2 text-sm text-zinc-300">
            {analysis.questions.map((question) => (
              <li key={question}>• {question}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-zinc-300">
            Aktuell keine Rückfragen.
          </p>
        )}
      </div>

      <div className="rounded-3xl bg-white/[0.06] p-5">
        <h2 className="text-xl font-semibold text-emerald-400">
          Metadaten
        </h2>

        <div className="mt-4 space-y-2 text-sm text-zinc-300">
          <div>Status vom: {analysis.statusDate}</div>
          <div>Relevanz: {analysis.importance}</div>
          <div>
            Ereignisdatum: {analysis.eventDate ?? "noch offen / unklar"}
          </div>
        </div>
      </div>
    </div>
  );
}