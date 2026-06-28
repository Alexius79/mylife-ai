"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import AppLayout from "@/components/AppLayout";
import BackButton from "@/components/BackButton";
import BottomNavigation from "@/components/BottomNavigation";
import Header from "@/components/Header";
import AnalysisPreview from "@/components/AnalysisPreview";
import { categories } from "@/data/categories";
import type { LifeEntryAnalysis } from "@/types/lifeEntry";

export default function NewEntryPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const currentCategory = useMemo(
    () => categories.find((item) => item.id === category),
    [category]
  );

  const [text, setText] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [analysis, setAnalysis] = useState<LifeEntryAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const backHref = currentCategory ? `/mylife/${currentCategory.id}` : "/";

  async function handleAnalyze(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanedText = text.trim();

    if (!cleanedText) {
      setErrorMessage("Bitte zuerst einen Eintrag schreiben oder diktieren.");
      return;
    }

    setIsAnalyzing(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rawText: cleanedText,
          sourceCategoryId: currentCategory?.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Analyse fehlgeschlagen.");
      }

      const data = (await response.json()) as LifeEntryAnalysis;
      setAnalysis(data);
    } catch {
      setErrorMessage("Die Analyse konnte nicht gestartet werden.");
    } finally {
      setIsAnalyzing(false);
    }
  }

  return (
    <AppLayout>
      <Header />

      <section className="h-full overflow-y-auto px-7 pb-[120px] pt-[150px]">
        {/* Header */}
        <BackButton href={backHref} />

        <h1 className="mt-6 text-[32px] font-bold tracking-tight">
          Neuer <span className="text-emerald-400">Eintrag</span>
        </h1>

        <p className="mt-3 text-[16px] leading-snug text-zinc-300">
          {currentCategory
            ? `Dieser Eintrag wird zuerst der Schublade „${currentCategory.title}“ zugeordnet.`
            : "Erzähle frei. MyLife ordnet den Eintrag später den passenden Schubladen zu."}
        </p>

        {/* Entry Form */}
        <form
          onSubmit={handleAnalyze}
          className="mt-7 rounded-[32px] border border-white/10 bg-white/[0.08] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl"
        >
          <label className="text-lg font-semibold text-emerald-300">
            Was möchtest du festhalten?
          </label>

          <textarea
            name="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            className="mt-4 h-44 w-full resize-none rounded-2xl border border-white/10 bg-black/40 p-4 text-sm leading-relaxed text-white outline-none placeholder:text-zinc-500 focus:border-emerald-400"
            placeholder="Schreibe oder diktiere hier, was passiert ist, was du erlebt hast oder was wichtig ist..."
          />

          {errorMessage && (
            <p className="mt-3 text-sm text-red-300">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={isAnalyzing}
            className="mt-5 w-full rounded-2xl bg-emerald-400 px-6 py-4 font-semibold text-black shadow-[0_0_26px_rgba(52,211,153,0.35)] disabled:opacity-60"
          >
            {isAnalyzing ? "Analysiere..." : "Analysieren"}
          </button>
        </form>

        {/* Analysis */}
        {analysis ? (
          <>
            <AnalysisPreview analysis={analysis} />

            {analysis.questions.length > 0 && (
              <div className="mt-5 rounded-[32px] border border-white/10 bg-white/[0.08] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl">
                <label className="text-lg font-semibold text-emerald-300">
                  Antwort ergänzen
                </label>

                <textarea
                  value={answerText}
                  onChange={(event) => setAnswerText(event.target.value)}
                  className="mt-4 h-28 w-full resize-none rounded-2xl border border-white/10 bg-black/40 p-4 text-sm leading-relaxed text-white outline-none placeholder:text-zinc-500 focus:border-emerald-400"
                  placeholder="Optional: Beantworte die Rückfrage hier oder speichere direkt."
                />
              </div>
            )}

            <button className="mt-6 w-full rounded-2xl bg-white px-6 py-4 font-semibold text-black shadow-[0_18px_50px_rgba(255,255,255,0.16)]">
              Speichern
            </button>
          </>
        ) : (
          <div className="mt-6 rounded-[32px] border border-white/10 bg-white/[0.08] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl">
            <h2 className="text-xl font-semibold text-emerald-300">
              Vorschau
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-zinc-300">
              Nach dem Analysieren zeigt MyLife hier, was die AI verstanden hat.
              Falls wichtige Informationen fehlen, stellt sie gezielte
              Rückfragen.
            </p>
          </div>
        )}
      </section>

      <BottomNavigation active="mylife" />
    </AppLayout>
  );
}