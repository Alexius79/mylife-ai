import { Suspense } from "react";
import NewEntryClient from "./NewEntryClient";

export default function NewEntryPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-black text-zinc-400">
          Lade...
        </div>
      }
    >
      <NewEntryClient />
    </Suspense>
  );
}