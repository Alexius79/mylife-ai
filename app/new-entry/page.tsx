import AppLayout from "@/components/AppLayout";
import BackButton from "@/components/BackButton";
import BottomNavigation from "@/components/BottomNavigation";
import Header from "@/components/Header";
import AnalysisPreview from "@/components/AnalysisPreview";
import { categories } from "@/data/categories";
import { analyzeLifeEntry } from "@/lib/lifeMemoryEngine";

type NewEntryPageProps = {
  searchParams: Promise<{
    category?: string;
    text?: string;
  }>;
};

export default async function NewEntryPage({ searchParams }: NewEntryPageProps) {
  const { category, text } = await searchParams;

  const currentCategory = categories.find((item) => item.id === category);

  const analysis =
    text && text.trim().length > 0
      ? analyzeLifeEntry({
          rawText: text,
          sourceCategoryId: currentCategory?.id,
        })
      : null;

  const backHref = currentCategory ? `/mylife/${currentCategory.id}` : "/";

  return (
    <AppLayout>
      <Header />

      <section className="h-full overflow-y-auto px-7 pb-[120px] pt-[96px]">
        <BackButton href={backHref} />

        <h1 className="text-[32px] font-bold tracking-tight">
          Neuer <span className="text-emerald-400">Eintrag</span>
        </h1>

        <p className="mt-3 text-[16px] leading-snug text-zinc-300">
          {currentCategory
            ? `Dieser Eintrag wird zuerst der Schublade „${currentCategory.title}“ zugeordnet.`
            : "Erzähle frei. MyLife ordnet den Eintrag später den passenden Schubladen zu."}
        </p>

        <form className="mt-7 rounded-3xl bg-white/[0.06] p-5">
          <label className="text-lg font-semibold text-emerald-400">
            Was möchtest du festhalten?
          </label>

          <textarea
            name="text"
            defaultValue={text ?? ""}
            className="mt-4 h-44 w-full resize-none rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-emerald-400"
            placeholder="Schreibe oder diktiere hier, was passiert ist, was du erlebt hast oder was wichtig ist..."
          />

          {currentCategory && (
            <input type="hidden" name="category" value={currentCategory.id} />
          )}

          <button
            type="submit"
            className="mt-5 w-full rounded-2xl bg-emerald-400 px-6 py-4 font-semibold text-black"
          >
            Analysieren
          </button>
        </form>

        {analysis ? (
          <>
            <AnalysisPreview analysis={analysis} />

            <button className="mt-6 w-full rounded-2xl bg-white px-6 py-4 font-semibold text-black">
              Speichern
            </button>
          </>
        ) : (
          <div className="mt-6 rounded-3xl bg-white/[0.06] p-5">
            <h2 className="text-xl font-semibold text-emerald-400">
              Vorschau
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-zinc-300">
              Nach dem Analysieren zeigt MyLife hier die erkannte Schublade,
              mögliche Verknüpfungen, eine Kurz-Zusammenfassung und gezielte
              Rückfragen.
            </p>
          </div>
        )}
      </section>

      <BottomNavigation active="mylife" />
    </AppLayout>
  );
}