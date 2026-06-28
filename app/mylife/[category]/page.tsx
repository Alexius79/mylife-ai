import Link from "next/link";
import AppLayout from "@/components/AppLayout";
import BackButton from "@/components/BackButton";
import BottomNavigation from "@/components/BottomNavigation";
import Header from "@/components/Header";
import { categories } from "@/data/categories";
import { notFound } from "next/navigation";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  const currentCategory = categories.find((item) => item.id === category);

  if (!currentCategory) {
    notFound();
  }

  return (
    <AppLayout>
      <Header />

      <section className="h-full overflow-y-auto px-7 pb-[120px] pt-[96px]">
        <BackButton href="/mylife" />

        <h1 className="text-[34px] font-bold tracking-tight">
          {currentCategory.title}
        </h1>

        <p className="mt-3 text-[16px] leading-snug text-zinc-300">
          {currentCategory.description}
        </p>

        <div className="mt-8 rounded-3xl bg-white/[0.06] p-6">
          <h2 className="text-xl font-semibold text-emerald-400">
            Zusammenfassung
          </h2>

          <p className="mt-4 text-zinc-300">
            Für diesen Bereich sind aktuell noch keine Informationen vorhanden.
          </p>
        </div>

        <div className="mt-6 rounded-3xl bg-white/[0.06] p-6">
          <h2 className="text-xl font-semibold text-emerald-400">
            Dokumente
          </h2>

          <p className="mt-4 text-zinc-300">
            Noch keine Dokumente vorhanden.
          </p>
        </div>

        <Link
          href={`/new-entry?category=${currentCategory.id}`}
          className="mt-6 block w-full rounded-2xl bg-emerald-400 px-6 py-3 text-center font-semibold text-black"
        >
          Neuer Voice-Eintrag
        </Link>
      </section>

      <BottomNavigation active="mylife" />
    </AppLayout>
  );
}