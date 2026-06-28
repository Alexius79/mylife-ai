import { categories } from "@/data/categories";
import type { EntryImportance, LifeEntryAnalysis } from "@/types/lifeEntry";
import { createChatCompletion } from "@/lib/openai";

type AnalyzeLifeEntryWithAIInput = {
  rawText: string;
  sourceCategoryId?: string;
  fallbackAnalysis: LifeEntryAnalysis;
};

type RawAIAnalysis = Partial<LifeEntryAnalysis>;

const allowedImportance: EntryImportance[] = ["low", "medium", "high"];

export async function analyzeLifeEntryWithAI({
  rawText,
  sourceCategoryId,
  fallbackAnalysis,
}: AnalyzeLifeEntryWithAIInput): Promise<LifeEntryAnalysis> {
  try {
    const categoryList = categories
      .filter((category) => category.id !== "neuer-bereich")
      .map((category) => `- ${category.id}: ${category.title}`)
      .join("\n");

    const content = await createChatCompletion({
      messages: [
        {
          role: "system",
          content:
            "Du bist die zentrale Analyse-KI von MyLife. Du wandelst persönliche Rohtexte in kurze, hilfreiche, menschliche Zusammenfassungen um. Du stellst nur Rückfragen, wenn sie wirklich wichtig sind. Antworte ausschließlich als valides JSON ohne Markdown.",
        },
        {
          role: "user",
          content: `
Analysiere diesen MyLife-Eintrag.

Verfügbare Kategorien:
${categoryList}

Vorgegebene Ausgangskategorie:
${sourceCategoryId ?? "keine"}

Eintrag:
${rawText}

Gib exakt dieses JSON-Schema zurück:
{
  "rawText": string,
  "source": "start" | "category",
  "primaryCategoryId": string | null,
  "relatedCategoryIds": string[],
  "summary": string,
  "questions": string[],
  "importance": "low" | "medium" | "high",
  "statusDate": string,
  "eventDate": string | null,
  "shouldUpdateSummary": boolean
}

Regeln:
- summary ist NICHT Wiederholung des Originaltexts.
- summary ist eine kurze, verdichtete Interpretation mit echtem Mehrwert.
- summary maximal 160 Zeichen.
- questions maximal 2 Rückfragen.
- questions nur stellen, wenn wichtige Informationen fehlen.
- Keine Diagnose stellen.
- Bei Gesundheit neutral, vorsichtig und sachlich formulieren.
- primaryCategoryId muss eine verfügbare Kategorie sein oder null.
- relatedCategoryIds dürfen nur verfügbare Kategorien enthalten.
- statusDate im Format YYYY-MM-DD.
- eventDate nur setzen, wenn ein Datum klar erkennbar ist.
          `.trim(),
        },
      ],
    });

    const parsed = JSON.parse(content) as RawAIAnalysis;

    return normalizeAIAnalysis(parsed, fallbackAnalysis);
  } catch {
    return fallbackAnalysis;
  }
}

function normalizeAIAnalysis(
  parsed: RawAIAnalysis,
  fallbackAnalysis: LifeEntryAnalysis
): LifeEntryAnalysis {
  const allowedCategoryIds = categories
    .filter((category) => category.id !== "neuer-bereich")
    .map((category) => category.id);

  const primaryCategoryId =
    typeof parsed.primaryCategoryId === "string" &&
    allowedCategoryIds.includes(parsed.primaryCategoryId)
      ? parsed.primaryCategoryId
      : fallbackAnalysis.primaryCategoryId;

  const relatedCategoryIds = Array.isArray(parsed.relatedCategoryIds)
    ? parsed.relatedCategoryIds.filter(
        (id): id is string =>
          typeof id === "string" &&
          allowedCategoryIds.includes(id) &&
          id !== primaryCategoryId
      )
    : fallbackAnalysis.relatedCategoryIds;

  const importance =
    parsed.importance && allowedImportance.includes(parsed.importance)
      ? parsed.importance
      : fallbackAnalysis.importance;

  return {
    rawText:
      typeof parsed.rawText === "string" && parsed.rawText.trim().length > 0
        ? parsed.rawText.trim()
        : fallbackAnalysis.rawText,
    source:
      parsed.source === "category" || parsed.source === "start"
        ? parsed.source
        : fallbackAnalysis.source,
    primaryCategoryId,
    relatedCategoryIds: Array.from(new Set(relatedCategoryIds)),
    summary:
      typeof parsed.summary === "string" && parsed.summary.trim().length > 0
        ? parsed.summary.trim()
        : fallbackAnalysis.summary,
    questions: Array.isArray(parsed.questions)
      ? parsed.questions
          .filter((question): question is string => typeof question === "string")
          .map((question) => question.trim())
          .filter(Boolean)
          .slice(0, 2)
      : fallbackAnalysis.questions.slice(0, 2),
    importance,
    statusDate:
      typeof parsed.statusDate === "string" && parsed.statusDate.length >= 10
        ? parsed.statusDate.slice(0, 10)
        : fallbackAnalysis.statusDate,
    eventDate:
      typeof parsed.eventDate === "string" && parsed.eventDate.length >= 10
        ? parsed.eventDate.slice(0, 10)
        : fallbackAnalysis.eventDate,
    shouldUpdateSummary:
      typeof parsed.shouldUpdateSummary === "boolean"
        ? parsed.shouldUpdateSummary
        : fallbackAnalysis.shouldUpdateSummary,
  };
}