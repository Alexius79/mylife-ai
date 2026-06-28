export type EntrySource = "start" | "category";

export type EntryImportance = "low" | "medium" | "high";

export type LifeEntryAnalysis = {
  rawText: string;
  source: EntrySource;
  primaryCategoryId: string | null;
  relatedCategoryIds: string[];
  summary: string;
  questions: string[];
  importance: EntryImportance;
  statusDate: string;
  eventDate: string | null;
  shouldUpdateSummary: boolean;
};