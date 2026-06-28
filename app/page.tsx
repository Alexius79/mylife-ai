import AppLayout from "@/components/AppLayout";
import BottomNavigation from "@/components/BottomNavigation";
import Header from "@/components/Header";
import MoodSelector from "@/components/MoodSelector";
import VoiceButton from "@/components/VoiceButton";

export default function Home() {
  return (
    <AppLayout>
      <Header />

      <section className="flex h-full flex-col px-7 pb-[104px] pt-[92px]">
        <div className="pt-6">
          <h1 className="text-[21px] font-semibold leading-tight tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
            Hallo <span className="text-emerald-400">Alex</span>,
            <br />
            was hast du auf dem Herzen?
          </h1>

          <p className="mt-2 text-[12px] leading-snug text-zinc-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            Dein Raum. Deine Gedanken. Deine Entwicklung.
          </p>
        </div>

        <div className="flex flex-1 items-center">
          <VoiceButton />
        </div>

        <div className="mb-4">
          <MoodSelector />
        </div>
      </section>

      <BottomNavigation active="start" />
    </AppLayout>
  );
}