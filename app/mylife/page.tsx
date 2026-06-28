import AppLayout from "@/components/AppLayout";
import BottomNavigation from "@/components/BottomNavigation";
import CategoryCard from "@/components/CategoryCard";
import Header from "@/components/Header";
import { categories } from "@/data/categories";

export default function MyLifePage() {
  return (
    <AppLayout>
      <Header />

      <section className="h-full overflow-y-auto px-7 pb-[120px] pt-[96px]">
        <h1 className="text-[34px] font-bold tracking-tight">
          My <span className="text-emerald-400">Life</span>
        </h1>

        <p className="mt-3 text-[16px] leading-snug text-zinc-300">
          Deine Lebensbereiche. Deine Schubladen. Dein persönlicher Überblick.
        </p>

        <div className="mt-7 space-y-3">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.title}
              description={category.description}
              href={`/mylife/${category.id}`}
            />
          ))}
        </div>
      </section>

      <BottomNavigation active="mylife" />
    </AppLayout>
  );
}