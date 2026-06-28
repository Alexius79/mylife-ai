export type Category = {
  id: string;
  title: string;
  description: string;
};

export const categories: Category[] = [
  {
    id: "aktuelle-lebenslage",
    title: "Aktuelle Lebenslage",
    description: "Wo stehe ich gerade? Was passiert aktuell?",
  },
  {
    id: "gesundheit",
    title: "Gesundheit",
    description: "Körper, Psyche, Klinik, Blutwerte und Verlauf.",
  },
  {
    id: "beruf",
    title: "Beruf",
    description: "Arbeit, Projekte, Bewerbungen und Stärken.",
  },
  {
    id: "beziehungen",
    title: "Beziehungen",
    description: "Familie, Partner, Freunde und wichtige Menschen.",
  },
  {
    id: "recht",
    title: "Recht",
    description: "Verfahren, Bescheide, Verträge und Fristen.",
  },
  {
    id: "finanzen",
    title: "Finanzen",
    description: "Einnahmen, Ausgaben, Schulden und Planung.",
  },
  {
    id: "ausbildung",
    title: "Ausbildung",
    description: "Schule, Studium, Zertifikate und Fähigkeiten.",
  },
  {
    id: "interessen",
    title: "Interessen",
    description: "Hobbys, Themen, Leidenschaften und Inspiration.",
  },
  {
    id: "dokumente",
    title: "Dokumente",
    description: "Alle wichtigen Unterlagen und Nachweise.",
  },
  {
    id: "neuer-bereich",
    title: "+ Neuer Bereich",
    description: "Eigenen Themenbereich hinzufügen.",
  },
];