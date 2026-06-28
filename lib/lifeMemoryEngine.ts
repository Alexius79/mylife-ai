import { categories } from "@/data/categories";
import type { LifeEntryAnalysis } from "@/types/lifeEntry";

type AnalyzeLifeEntryInput = {
  rawText: string;
  sourceCategoryId?: string;
};

const categoryKeywords: Record<string, string[]> = {
  "aktuelle-lebenslage": [
    "aktuell",
    "gerade",
    "momentan",
    "heute",
    "zurzeit",
    "lage",
    "baustelle",
    "nächste schritte",
  ],
  gesundheit: [
    "arzt",
    "klinik",
    "therapie",
    "diagnose",
    "medikament",
    "blutwerte",
    "schmerzen",
    "krank",
    "entzug",
    "alkohol",
    "depression",
    "psychisch",
    "operation",
    "op",
  ],
  beruf: [
    "arbeit",
    "job",
    "firma",
    "chef",
    "bewerbung",
    "lebenslauf",
    "projekt",
    "kunde",
    "gewerbe",
    "selbstständig",
    "karriere",
  ],
  beziehungen: [
    "frau",
    "mann",
    "partner",
    "partnerin",
    "freund",
    "freundin",
    "familie",
    "mutter",
    "vater",
    "bruder",
    "schwester",
    "kind",
    "sohn",
    "tochter",
    "beziehung",
  ],
  recht: [
    "gericht",
    "anwalt",
    "verfahren",
    "bescheid",
    "frist",
    "strafe",
    "polizei",
    "vertrag",
    "insolvenz",
    "jobcenter",
    "amt",
  ],
  finanzen: [
    "geld",
    "kosten",
    "rechnung",
    "schulden",
    "einnahmen",
    "ausgaben",
    "konto",
    "budget",
    "steuer",
    "miete",
    "zahlung",
  ],
  ausbildung: [
    "schule",
    "studium",
    "uni",
    "abschluss",
    "zertifikat",
    "kurs",
    "weiterbildung",
    "prüfung",
    "diplom",
  ],
  interessen: [
    "hobby",
    "formel 1",
    "musik",
    "ki",
    "sport",
    "reise",
    "film",
    "buch",
    "projektidee",
    "startup",
  ],
  dokumente: [
    "pdf",
    "dokument",
    "bericht",
    "nachweis",
    "zeugnis",
    "vertrag",
    "rechnung",
    "bescheinigung",
    "foto",
  ],
};

export function analyzeLifeEntry({
  rawText,
  sourceCategoryId,
}: AnalyzeLifeEntryInput): LifeEntryAnalysis {
  const cleanedText = rawText.trim();
  const lowerText = cleanedText.toLowerCase();

  const statusDate = new Date().toISOString().slice(0, 10);

  const scores = categories
    .filter((category) => category.id !== "neuer-bereich")
    .map((category) => {
      const keywords = categoryKeywords[category.id] ?? [];
      const score = keywords.reduce((sum, keyword) => {
        return lowerText.includes(keyword) ? sum + 1 : sum;
      }, 0);

      return {
        id: category.id,
        score,
      };
    });

  const matchedCategories = scores
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.id);

  const primaryCategoryId =
    sourceCategoryId ??
    matchedCategories[0] ??
    "aktuelle-lebenslage";

  const relatedCategoryIds = Array.from(
    new Set(
      [
        ...matchedCategories,
        primaryCategoryId !== "aktuelle-lebenslage"
          ? "aktuelle-lebenslage"
          : null,
      ].filter(Boolean) as string[]
    )
  ).filter((id) => id !== primaryCategoryId);

  const questions = buildQuestions(cleanedText, primaryCategoryId);

  return {
    rawText: cleanedText,
    source: sourceCategoryId ? "category" : "start",
    primaryCategoryId,
    relatedCategoryIds,
    summary: buildSummary(cleanedText),
    questions,
    importance: determineImportance(lowerText),
    statusDate,
    eventDate: detectEventDate(lowerText, statusDate),
    shouldUpdateSummary: true,
  };
}

function buildSummary(text: string) {
  if (!text) {
    return "Noch kein Inhalt vorhanden.";
  }

  if (text.length <= 180) {
    return text;
  }

  return `${text.slice(0, 177).trim()}...`;
}

function determineImportance(text: string) {
  const highWords = [
    "kündigung",
    "gericht",
    "klinik",
    "operation",
    "tod",
    "rückfall",
    "insolvenz",
    "diagnose",
    "polizei",
  ];

  const mediumWords = [
    "arzt",
    "bewerbung",
    "rechnung",
    "vertrag",
    "streit",
    "job",
    "therapie",
  ];

  if (highWords.some((word) => text.includes(word))) {
    return "high";
  }

  if (mediumWords.some((word) => text.includes(word))) {
    return "medium";
  }

  return "low";
}

function detectEventDate(text: string, today: string) {
  if (text.includes("heute")) {
    return today;
  }

  if (text.includes("gestern")) {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date.toISOString().slice(0, 10);
  }

  return null;
}

function buildQuestions(text: string, categoryId: string) {
  const questions: string[] = [];

  if (!text.includes("heute") && !text.includes("gestern")) {
    questions.push("Wann ist das ungefähr passiert?");
  }

  if (categoryId === "gesundheit") {
    questions.push("Ist das Thema abgeschlossen oder läuft es noch?");
    questions.push("Gibt es dazu einen Arztbericht, Blutwerte oder ein anderes Dokument?");
  }

  if (categoryId === "beruf") {
    questions.push("Geht es um eine aktuelle Tätigkeit, eine Bewerbung oder ein früheres Ereignis?");
    questions.push("Gibt es dazu einen Zeitraum, Arbeitgeber oder ein Projekt?");
  }

  if (categoryId === "beziehungen") {
    questions.push("Welche Person oder Beziehung ist hier zentral?");
    questions.push("Ist diese Beziehung aktuell aktiv, beendet oder unklar?");
  }

  if (categoryId === "recht") {
    questions.push("Gibt es eine Frist, ein Aktenzeichen oder ein offizielles Schreiben dazu?");
  }

  if (categoryId === "finanzen") {
    questions.push("Geht es um Einnahmen, Ausgaben, Schulden oder eine konkrete Zahlung?");
  }

  return questions.slice(0, 3);
}